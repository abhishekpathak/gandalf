database = 'goibibo'
martname = 'ga_visitors'

metrics = {
        'unique visitors':{
            'real_name' : 'visitors',
            'aggregation_options' : ['STANDARD','SUM']
        },
        'visits' : {
            'real_name' : 'visits',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'bounces' : {
            'real_name' : 'bounces',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'conversions' : {
            'real_name' : 'goal_completions_all',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'new visitors': {
             'real_name': 'visitors',
             'aggregation_options' : ['STANDARD','SUM'],
             'persistantfilter' : {'visitortype':'new_visitor'}
        }
    }

dimensions = {
    'total' : 'total',
    'category':'category',
    'medium':'medium',
    'source':'source',
    'visitortype':'visitortype',
    } 

timeseries = ['visitdate']
