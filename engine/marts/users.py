database = 'goibibo'
martname = 'users'

metrics = {
        'users count':{
            'real_name' : 'username',
            'aggregation_options' : ['STANDARD','COUNT']
        },
        'flight tickets' : {
            'real_name' : 'bookings.flight.tickets',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'bus tickets' : {
            'real_name' : 'bookings.bus.tickets',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'hotel rooms' : {
            'real_name' : 'bookings.hotels.rooms',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'hotel roomnights' : {
            'real_name' : 'bookings.hotels.roomnight',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'flight transactions' : {
            'real_name' : 'bookings.flight.transactions',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'bus transactions' : {
            'real_name' : 'bookings.bus.transactions',
            'aggregation_options' : ['STANDARD','SUM']
        },
         'hotel transactions' : {
            'real_name' : 'bookings.hotels.transactions',
            'aggregation_options' : ['STANDARD','SUM']
        },
    }

dimensions = {
    'total' : 'total',
    'active':'is_active',
    'staff':'is_staff',
    'superuser':'is_superuser',
    'channel':'channel',
    } 

timeseries = ['last_login','date_joined']
