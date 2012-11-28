database = 'goibibo'
martname = 'ga_visitors'

metrics = {
        'visitors':{
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
         'goal 1 completions' : {
            'real_name' : 'goal_completions_1',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'goal 2 completions' : {
            'real_name' : 'goal_completions_2',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'goal 4 completions' : {
            'real_name' : 'goal_completions_4',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'goal 7 completions' : {
            'real_name' : 'goal_completions_7',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'all goal completions' : {
            'real_name' : 'goal_completions_all',
            'aggregation_options' : ['STANDARD','SUM']
        },
    }

dimensions = {
    'total' : 'total',
    'category':'category',
    'medium':'medium',
    'source':'source',
    'visitortype':'visitortype',
    } 

timeseries = ['visitdate']
