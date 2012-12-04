import pymongo
import settings
import pdb

class Dashboard(object):
    """ 
    The  Dashboard Engine which can slice and dice data.
    Data is contained in several marts (equivalent to tables in a database)
    Each mart has individual dimensions and metrics,defined in marts/[name-of-mart].py
    Global dashboard settings are defined in both dashboard-settings.py (for non-Django environments) and Django's settings.py (for Django-backed environments,this is amore optimal place)
    """
    def __init__(self, mart, metric, timeseries, timerange,dimensions,persistant_filters=dict(),summarize_number=10):
        self.conn = pymongo.Connection(settings.MONGO_HOST,settings.MONGO_PORT)
        self.mart = __import__("marts."+mart,globals(), locals(), [str(mart)], -1)
        self.db = self.conn[self.mart.database]
        self.martname = self.mart.martname
        self.metricname = str(metric).replace('_',' ')
        self.metric = self.mart.metrics[self.metricname]
        self.aggregationtype = self.metric['aggregation_options'][0]
        self.aggregation = self.metric['aggregation_options'][1]
        self.timeseries = str(timeseries)
        self.collectionname = '%s__%s__%s' % (self.martname.replace(' ','_'),self.timeseries.replace(' ','_'),self.metricname.replace(' ','_'))
        self.collection = getattr(self.conn['summaries'],self.collectionname)
        # timerange should be in the format : (frequency,sdate,edate) where frequency in ['hour','dayofweek','date','month'] and sdate and edate are both integers of the YYYYMMDD format
        self.timerange = timerange
        self.time_frequency = timerange[0]
        self.viewfilter = self.gettimefilter()
        #self.viewfilter = dict(self.viewfilter,**(self.metric.get('extra filters',dict())))
        self.viewfilter = dict(self.viewfilter,**persistant_filters)
        self.dimensions = map(str,dimensions)
        self.summarize_number = summarize_number

    def updatefilter(self,newViewFilter=None):
        """
        update the viewfilter.The viewfilter specifies the view on the data.
        """
        if not newViewFilter:
            newViewFilter = raw_input('please enter the viewfilter to be used: for example airline,indigo or REMOVE,airline :')
        newViewFilter = str(newViewFilter).split(',')
        try:
            newViewFilter[1] = int(newViewFilter[1]) # if viewfilter contains a number,convert it to an int from string
        except (IndexError,ValueError):
            pass
        if newViewFilter[0] == 'REMOVE': # remove an existing viewfilter from the viewfilters
            del self.viewfilter[newViewFilter[1]]
        else : # update viewfilters to add new viewfilter as well
            self.viewfilter[newViewFilter[0]] = newViewFilter[1]



    def gettimefilter(self):
        timefilter = {'summary_range': {'sdate':int(self.timerange[1]),'edate':int(self.timerange[2])}}
        data = self.collection.find_one(timefilter)
        if not data:
            timefilter = {'summary_range':{'$gte': {'sdate':int(self.timerange[1]),'edate':int(self.timerange[1])},'$lte': {'sdate':int(self.timerange[2]),'edate':int(self.timerange[2])}}}
        return timefilter
        #db.flight_paymentdetails__bookingtime__Commission.find({'_id.summary_range':{'$gte': {'sdate':20121101,'edate':20121101},'$lte': {'sdate':20121105,'edate':20121105}}})

    def process(self):
        #self.viewfilter = {'_id.'+key : value for key,value in self.viewfilter.iteritems()}
        # compatibility with python < 2.7
        self.tmpfilter = dict()
        for key,value in self.viewfilter.iteritems():
            self.tmpfilter['_id.'+key] = value
        self.viewfilter = self.tmpfilter
        # The <main> method
        self.results = self.summarize(summarize_number=self.summarize_number)
        self.results['timestamp'] = self.results['timestamp.'+self.time_frequency]
        del self.results['timestamp.'+self.time_frequency]
        del self.viewfilter['_id.summary_range']

    def summarize(self,summarize_number,allowRoundoff=1):
        dictionary = {}
        for dimension in (self.dimensions+['total','timestamp.'+self.time_frequency]):

            # calculating the aggregate based on this key
            dictionary[dimension] = []
            results = self.collection.aggregate([
                        {'$match': self.viewfilter},
                        {'$project': { dimension:1,'value':1}},
                        {'$group' : { '_id': '$_id.'+dimension,'value': {'$sum':'$value'}}},
                        {'$project': {'_id':0,'name':'$_id','value':'$value'}}
            ])
            results = results['result']
            
            # sorting and giving top n results
            if summarize_number:
                if dimension == "timestamp" and self.time_frequency == "dayofweek" :
                    results = sorted(results,key = lambda item:settings.weekmap[item[0]],reverse=False)
                elif dimension == "timestamp":
                    results = sorted(results,key = lambda item:item[0],reverse=False)
                else:
                    results = sorted(results,key = lambda item:item[1],reverse=True)[:summarize_number] # list slicing - [start:stop:step]

            # rounding off
            if allowRoundoff == 1 :
                for element in results:
                    dictionary[dimension].append([element['name'],round(element['value'])])
            else:
                for element in results:
                    dictionary[dimension].append([element['name'],round(element['value'],2)])
        return dictionary
