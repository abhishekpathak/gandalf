database = 'goibibo'
martname = 'flight_paymentdetails'

metrics = {
    'GMV'  : {
        'real_name' : 'totalfarebeforediscount',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'tickets' : {
        'real_name' : 'ticketscount',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'Gross Margin' : {
        'real_name' : 'totalcommission+promocodediscount+extradiscount+transactionfee+discount+leadamount-0.017*totalfarecharged+gdsfees',
        'aggregation_options' : ['STANDARD','SUM'],
        'extra filters' : {'status':'To Deliver'}
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
    'Earnings from ticket' : {
        'real_name' : 'totalcommission+promocodediscount+extradiscount+discount+leadamount+transactionfee+gdsfees',
        'aggregation_options' : ['STANDARD','SUM'],
        'extra filters' : {'status': 'To Deliver'}
        },
    }


dimensions = {
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


timeseries = ['bookingtime','traveltime']
