database = 'goibibo'
martname = 'helpdesk_details'

metrics = {
    'requests' : {
        'real_name' : 'id',
        'aggregation_options' : ['STANDARD','COUNT'],
        },
    }

dimensions = {
'status' : 'status',
'subcategory':'subcategory',
'assignedto' : 'assignedTo',
'escalation' : 'is_escalation',
'queue' : 'queue',
'lob' : 'lob',
'category' : 'category',
'type':'type',
'priority':'priority'
}

timeseries = ['recieved','assigned_time','closed_time','resolved_time','lastupdated']
