database = 'stats_db'
martname = 'SearchLogs'

metrics = {
        'Searches' : {
            'real_name' : 'e6',
            'aggregation_options': ['STANDARD','COUNT'],
            }
        }

dimensions = {
'typeoftravel':'e11',
'class':'e15',
'roundtrip':'e16',
'sector':'e6',
'flavor':'e7',
'journey_after':'j_t_diff',
'roundtrip_duration':'r_diff',
}

timeseries = ['loggingtime','traveldate']
