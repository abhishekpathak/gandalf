import pico
import ast
import settings
import sys
sys.path.append(settings.ROOT_DIR+"engine/")
from engine.dashboard import Dashboard
import pdb

def get_details(mart,metric1,metric2,timeseries1,timeseries2,comparisonFlag,timerange1,timerange2,dimensions,persistantfilter_list,viewfilter,summarize_number):
    # chuck out the hyphens (-) from timeranges
    timerange1 = map(lambda item:item.replace('-',''),timerange1)
    if comparisonFlag == 1:
        timerange2 = map(lambda item:item.replace('-',''),timerange2)
    summarize_number = int(summarize_number)
    #Convert persistantfilter from list to dict before sending to engine
    persistantfilter_dict = convert(ast.literal_eval(persistantfilter_list),"list","dictionary")
    dictionary1,viewfilter1 = call_engine(mart,metric1,timeseries1,timerange1,dimensions,persistantfilter_dict,viewfilter,None)
    if str(comparisonFlag) == '1':
        dictionary2,viewfilter2 = call_engine(mart,metric2,timeseries2,timerange2,dimensions,persistantfilter_dict,viewfilter,None)
    else:
        dictionary2 = None
    dictionary = prepare_to_render(dictionary1,dictionary2,timerange1[0],summarize_number)

    # merge persistantfilter_dict and viewfilter_dict.But before that,remove the _id. tag that we get from the raw viewfilter.
    persistantfilter_dict = ast.literal_eval(str(viewfilter1).replace('_id.','')) 
    # Convert persistantfilter from dict to list before sending to javascript
    persistantfilter_list = convert(persistantfilter_dict,"dictionary","list")

    return [dictionary,str(persistantfilter_list)]

def convert(dataStructure,typeFrom,typeTo):
    if typeFrom == "list" and typeTo == "dictionary":
        d = {}
        for item in dataStructure:
            d[item[0]] = item[1]
        return d

    elif typeFrom == "dictionary" and typeTo == "list":
        return map(lambda item:[item,dataStructure[item]],dataStructure)


def call_engine(mart,metric,timeseries,timerange,dimensions,persistantfilter_dict,viewfilter,summarize_number):
    mydashboard = Dashboard(mart =mart, metric = metric, timeseries = timeseries, timerange = timerange, dimensions = dimensions,persistant_filters = persistantfilter_dict,summarize_number = summarize_number)
    if not viewfilter == 'nofilter':
        mydashboard.updatefilter(viewfilter)
    mydashboard.process()
    return mydashboard.results,mydashboard.viewfilter
    
def prepare_to_render(d1,d2,frequency,summarize_number):
    dnew = dict()
    for dimension,dimensionDetails in d1.iteritems():
        listoflists = list()
        if d2:
            s1,s2 = convert(d1[dimension],"list","dictionary"),convert(d2[dimension],"list","dictionary")
            domain = list(set(s1.keys()+s2.keys()))
            for item in domain:
                if dimension == "timestamp":
                    l = [item,s1.get(item,None),s2.get(item,None)]
                else:
                    l = [item,s1.get(item,0),s2.get(item,0)]
                listoflists.append(l)
        else:
            s1 = convert(d1[dimension],"list","dictionary")
            domain = list(set(s1.keys()))
            for item in domain:
                if dimension == "timestamp":
                    l = [item,s1.get(item,None)]
                else:
                    l = [item,s1.get(item,0)]
                listoflists.append(l)
        #sort listoflists
        if dimension == "timestamp" and frequency == "dayofweek" :
            listoflists_sorted = sorted(listoflists,key = lambda item:settings.weekmap[item[0]],reverse=False)
        elif dimension == "timestamp":
            listoflists_sorted = sorted(listoflists,key = lambda item:item[0],reverse=False)
        else:
            listoflists_sorted = sorted(listoflists,key = lambda item:item[1],reverse=True)[:summarize_number] # list slicing - [start:stop:step]
        dnew[dimension] = listoflists_sorted
    return dnew
