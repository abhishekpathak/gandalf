import pico
import ast
import settings
import sys
import datetime
sys.path.append(settings.ROOT_DIR+"engine/")
from engine.dashboard import Dashboard
import pdb

def get_details(params):
    set1 = params['set1']
    set2 = params.get('set2',{})
    dimensions = params.get('dimensions',[])
    persistantfilter = params.get('persistantfilter',{})
    viewfilter = params.get('viewfilter','nofilter')
    summarize_number = params.get('summarize_number',1)

    if set2 != {}:
        compare = True
    else:
        compare = False
    # chuck out the hyphens (-) from timeranges
    set1['timerange'] = map(lambda item:item.replace('-',''),set1['timerange'])

    dictionary1,viewfilter1 = call_engine(set1['mart'],set1['metric'],set1['timeseries'],set1['timerange'],dimensions,persistantfilter,viewfilter,None)
    if compare:
        set2['timerange'] = map(lambda item:item.replace('-',''),set2['timerange'])
        dictionary2,viewfilter2 = call_engine(set2['mart'],set2['metric'],set2['timeseries'],set2['timerange'],dimensions,persistantfilter,viewfilter,None)
    else:
        dictionary2 = None
    dictionary = prepare_to_render(dictionary1,dictionary2,set1['timerange'],summarize_number)

    # merge persistantfilter_dict and viewfilter_dict.But before that,remove the _id. tag that we get from the raw viewfilter.
    persistantfilter = ast.literal_eval(str(viewfilter1).replace('_id.','')) 

    return {'results':dictionary,'filter':persistantfilter}

def get_totals(martslist,timerange):
    # chuck out the hyphens (-) from timeranges
    timerange = map(lambda item:item.replace('-',''),timerange)
    return Landing(martslist,timerange).process()

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

