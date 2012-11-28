database = 'goibibo'
martname = 'bus_paymentdetails'

metrics = {
    'GMV'  : {
        'real_name' : 'ticketfare',
        'aggregation_options' : ['STANDARD','SUM'],
        'extra filters' : {'transactiontype' : 'to deliver'}
        },
    'tickets' : {
        'real_name' : 'Seats',
        'aggregation_options' : ['STANDARD','SUM'],
        'extra filters' : {'transactiontype' : 'to deliver'}
        },
    'Gross Margin' : {
        'real_name' : '0.06*ticketfare',
        'aggregation_options' : ['STANDARD','SUM'],
        'extra filters' : {'transactiontype' : 'to deliver'} 
        },        
    'Promocode' : {
        'real_name' : 'Promocode',
        'aggregation_options' : ['STANDARD','SUM'],
        'extra filters' : {'transactiontype' : 'to deliver'}
        }
    }

dimensions = {
'source' : 'src',
'destination' : 'dest',
'status' : 'transactiontype',
}


timeseries = ['timeoftransaction']
