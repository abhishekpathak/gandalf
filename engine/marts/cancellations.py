database = 'goibibo'
martname = 'cancellations'


metrics = {
    'Airline C Charges': {
        'real_name' : 'airline_cancellation_charges',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'Ibibo C Charges' : {
        'real_name' : 'ibibo_cancellation_charges',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'Refund Amount': {
        'real_name' : 'refund_amount',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'GMV'  : {
        'real_name' : 'totalfarebeforediscount',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'tickets' : {
        'real_name' : 'ticketscount',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'Gross Margin' : {
        'real_name' : 'totalcommission+promocodediscount+extradiscount+transactionfee+discount+leadamount-0.017*totalfarebeforediscount',
        'aggregation_options' : ['STANDARD','SUM'],
        },        
    'Promocode' : {
        'real_name' : '0-promocodediscount-extradiscount',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'transactions' : {
        'real_name' : 'transactionid',
        'aggregation_options' : ['CUSTOM','gettransactions'],
        },
    'Commission' : {
        'real_name' : 'totalcommission',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    }


dimensions = {
'total' : 'total',
'airline' : 'airline',
'source' : 'src',
'destination' : 'dest',
'sector' : 'sector',
'city' : 'city',
'status' : 'status',
'typeoftravel' : 'typeoftravel',
'discountedroundtrip':'discountedroundtrip',
'roundtrip':'roundtrip',
'promocodename':'promocodename',
'amadeusvendor':'amadeusvendor',
'paymentgateway':'paymentgateway',
'promocodetype':'promocodetype',
'flavor':'flavor',
}


timeseries = ['bookingtime','traveltime','refund_time']
