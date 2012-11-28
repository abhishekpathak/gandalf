database = 'goibibo'
martname = 'hotel_paymentdetails'

metrics = {
    'Room Nights' : {
        'real_name' : 'roomnights',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'Rooms' : {
        'real_name' : 'rooms',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'GMV'  : {
        'real_name' : 'amount',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'Promocode' : {
        'real_name' : '0-promodiscount-discount',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    'transactions' : {
        'real_name' : 'paymentid',
        'aggregation_options' : ['CUSTOM','gettransactions'],
        },
    'refundamount' : {
        'real_name': 'refundamount',
        'aggregation_options' : ['STANDARD','SUM'],
        },
    }


dimensions = {
'total' : 'total',
'hotelname' : 'hotelname',
'hotelcity' : 'hotel_city',
'customercity' : 'customer_city',
'status' : 'status',
'promocodename':'promocode',
'category':'city_category',
}

timeseries = ['bookingtime','checkin','checkout']
