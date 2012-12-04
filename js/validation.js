
    var template =
    [
                ["Flights",
                    ['tickets','GMV','Gross Margin','Promocode','Commission'],
                    ['bookingtime','traveltime'],
					['airline','sector','city','typeoftravel','roundtrip','discountedroundtrip','promocodename','paymentgateway','promocodetype','flavor'],

                ],
                ["Flights(intl)",
                    ['tickets', 'GMV','Promocode'],
                    ['bookingtime','traveltime'],
					['airline','sector','city','typeoftravel','roundtrip','discountedroundtrip','promocodename','paymentgateway','promocodetype','flavor'],
                ],
                ["Hotels",
                    ['Room Nights','Rooms','GMV','Promocode','refundamount'],
                    ['bookingtime','checkin','checkout'],
					['hotelname','hotelcity','customercity','status','promocodename','category'],
                ],
                /*
                ["Holidays",
                    ['users count','flight tickets','bus tickets','hotel rooms','hotel roomnight','flight transactions','bus transactions','hotel transactions'],
                    ['last_login','date_joined'],
                ],
                */
                ["Bus",
                    ['tickets', 'GMV','Gross Margin','Promocode'],
                    ['timeoftransaction'],
					['source','destination','status'],
                ],
                /*
                ["Taxi",
                     ['visitors','visits','bounces','all goal completions','goal 1 completions','goal 2 completions','goal 4 completions','goal 7 completions'],
                     ['visitdate'],
                ],
                */
                ['Users',
                     ['users count','flight tickets','bus tickets','hotel rooms','hotel roomnight','flight transactions','bus transactions','hotel transactions'],
                     ['last_login','date_joined'],
					 ['active','staff','superuser','channel'],
                ],
                ['Cancellations',
                    ['tickets','Airline C Charges','Ibibo C Charges','Refund Amount','GMV','Gross Margin','Promocode','transactions','Commission'],
                    ['refund_time','bookingtime','traveltime'],
					['airline','source','destination','sector','city','status','typeoftravel','roundtrip','discountedroundtrip','promocodename','amadeusvendor','paymentgateway','promocodetype','flavor'],
                ],
                /*
                [
                'flightsearch',
                    ['searches'],
                    ['loggingtime'],
                ],
                */
                ['Traffic',
                    ['visitors','visits','bounces','all goal completions','goal 1 completions','goal 2 completions','goal 4 completions','goal 7 completions'],
                    ['visitdate'],
					['category','medium','source','visitortype'],
                ],

     ];


// Draw chart
function drawChart(listoflists, charttype, elId,op){
    chart = new google.visualization[charttype](document.getElementById(elId));
    google.visualization.events.addListener(chart, 'ready',function(){});
	$(elId).html('');
    chart.draw(google.visualization.arrayToDataTable(listoflists), op);
}

google.load('visualization', '1', {packages: ['corechart']});
var chart = null;
var color1 = '#489823';
var color2 ='#CC3333';
var options = {

curveType:'function',
animation:{
duration: 1000,
easing: 'out',
},
colors :[color1,color2],
hAxis:{
},
lineWidth:2,
pointSize:2,
chartArea:{left:'auto',top:25,width:"90%",height:'70%'},
legend : {
    position:'top',
},
hAxis : {
    minTextSpacing:50, 
    slantedText:false,
},
interpolateNulls:true,
};

    params = {};
	details = {};
    graphkey = 'Flights';
    today_date = '2012-11-16';
    yesterday_date = '2012-11-15';
    t1= ['hour',today_date,today_date];
    t2 = ['hour',yesterday_date,yesterday_date];
	init_params();

function init_params(){
    params['Flights'] = {
            'set1' : {'mart':'flight_paymentdetails','metric':'tickets','timeseries':'bookingtime','timerange':t1},
            'persistantfilter' : {'typeoftravel':'Domestic'},
             };
    params['Flights(intl)'] = {
            'set1' : {'mart':'flight_paymentdetails','metric':'tickets','timeseries':'bookingtime','timerange':t1},
            'persistantfilter' : {'typeoftravel':'International'},
            };
    params['Bus'] = {
            'set1' : {'mart':'bus_paymentdetails','metric':'tickets','timeseries':'timeoftransaction','timerange':t1},
            };
    params['Hotels'] = {
            'set1' : {'mart':'hotel_paymentdetails','metric':'Room Nights','timeseries':'bookingtime','timerange':t1},
             };
    params['Users'] = {
            'set1' : {'mart':'users','metric':'users count','timeseries':'last_login','timerange':t1},
             };
    params['Cancellations'] = {
            'set1' : {'mart':'cancellations','metric':'tickets','timeseries':'refund_time','timerange':t1},
            };
    params['Traffic'] = {
            'set1' : {'mart':'traffic','metric':'visitors','timeseries':'visitdate','timerange':t1},
            }; 
}   
 
  function draw_top_box(){
    for (var key in params){
        if (params.hasOwnProperty(key)) process(key);
    }
  }

  function load_overview(mart){
        details = {};
        p = params[mart];
        for (var i = 0;i < template.length;i++){
            if (template[i][0] == mart)
                metricslist = template[i][1];    
        }
        for (var i = 0;i < metricslist.length;i++){
            metric = metricslist[i];
            p.set1.metric = metric;
            process_overview(p,metric);
			
        }
  }   

  function process_overview(params,key){
        // get t1
        handler.get_details(params).done(function(response){
            details[key] = {};
            details[key]['t1'] = response; 			
            $('.ov_Report li').each(function(){
				if($(this).find('h4').text() == key)$(this).append('<em>'+details[key]['t1'].results.total[0][1]+'<em>');});
            // get t2
            handler.get_details(params).done(function(response){
                details[key]['t2'] = response;
                // get perc
                perc = Math.round((details[key]['t1'].results.total[0][1] - details[key]['t2'].results.total[0][1])*100/(details[key]['t2'].results.total[0][1]));
                $('.ov_Report li').each(function(){if($(this).find('h4').text() == key) $(this).append('<small>'+perc+'%<small>');});
                if (perc <= 0)
                    $('.ov_Report li').each(function(){if($(this).find('h4').text() == key) $(this).find('small').attr('class','dec');});
					//if(key == $('#metrics').val())

            });
        });
  }  

 function load_graph(mart){
        key = mart;
        metric = $('#metrics').val();
        params[key].set1.metric = metric;
        handler.get_details(params[key]).done(function(response){
            details[key] = {};
            details[key]['t1'] = response;
            // get t2
            params[key].set1.timerange = t2;
            handler.get_details(params[key]).done(function(response){
                details[key]['t2'] = response;
                // draw the chart
			    listoflists = details[key].t1.results.timestamp;
			    // append header to this listoflists
			    listoflists.unshift([params[key].set1.timerange[0],params[key].set1.metric]);
                 drawChart(listoflists, 'LineChart','line_chart',options);
            });
        });
  }


function changeparams(mart){
    key = mart;
    metric = $('#metrics').val();	
    frequency = $('#ov_TimeSeries a.active').attr('id');    
	dateStr1 =  $('#date-range-field_1 p').last().text();
	dateIndex = dateStr1.indexOf('/');
	sdate = dateStr1.slice(0,dateIndex);	
	edate = dateStr1.slice(dateIndex+1);	
    timeseries =  $('#timeSeries').val();
    params[key].set1.metric = metric;
    params[key].set1.timeseries = timeseries;
    params[key].set1.timerange = [frequency,sdate,edate];
    if (compare == 1){
        metric = $('#metrics_2').val();
		dateStr2 =  $('#date-range-field_2 p').last().text();
		dateIndex = dateStr2.indexOf('/');
		sdate = dateStr2.slice(0,dateIndex);		
		edate = dateStr2.slice(dateIndex+1);		
        frequency = $('#ov_TimeSeries a').find('.active').attr('id');       
        timeseries = $('timeSeries_2').val();
        params[key].set2.mart = params[key].set1.mart;
        params[key].set2.metric = metric;
        params[key].set2.timeseries = timeseries;
        params[key].set2.timerange = [frequency,sdate,edate];
    }
    load_overview(mart);
    load_graph(mart);
    draw_extra_flights();
}

  

  function process(key){
    // get t1
    handler.get_details(params[key]).done(function(response){
        details[key] = {};
        details[key]['t1'] = response;		
        $('#bookingResults li').each(function(){if($(this).find('h3').text() == key) $(this).find('em').text(details[key]['t1'].results.total[0][1])});	
		// get t2
        params[key].set1.timerange = t2;
        handler.get_details(params[key]).done(function(response){
            details[key]['t2'] = response;
            // get perc
            perc = Math.round((details[key]['t1'].results.total[0][1] - details[key]['t2'].results.total[0][1])*100/(details[key]['t2'].results.total[0][1]));
            $('#bookingResults li').each(function(){if($(this).find('h3').text() == key) $(this).find('small').text(perc+'%');});
            if (perc <= 0)
                $('#bookingResults li').each(function(){if($(this).find('h3').text() == key) $(this).find('small').attr('class','dec');});
            console.log(details);
            if (key == graphkey) {				
			    // draw the chart
			    listoflists = details[key].t1.results.timestamp;
			    // append header to this listoflists
			    listoflists.unshift([params[key].set1.timerange[0],params[key].set1.metric]);
                drawChart(listoflists, 'LineChart','line_chart',options);
            }
        });
    });
  }            

  function draw_extra_flights(){
    init_params();
    p = params['Flights'];
    var dim = $('#ByTravelStat_1').val();
    p.dimensions = [dim];
    p.summarize_number = 7;
    // draw tickets pie chart
    handler.get_details(params[key]).done(function(response){
        listoflists = response.results[dim];
        console.log(listoflists);		
		drawChart(listoflists, 'PieChart', 'pie_chart',{});
		$('#ByTravelStat_2').children().remove();
		for(i=0; i < listoflists.length; i++)
		{
			var list = listoflists[i][0];
			$('#ByTravelStat_2').append('<option value='+list+'>'+list+'</option>');
			$('#ByTravelStat_2').change(function(){				
				var selectVal = $(this).val();				
				$(this).children().removeAttr("selected");
				$('option[value='+selectVal+']', this).attr("selected","selected");
			});
		}
    });
    // draw Avg ticket value bar chart
    
    // draw GMV pie chart
    p.set1.metric = 'GMV';
     handler.get_details(params[key]).done(function(response){
        listoflists = response.results[dim];
        console.log(listoflists);
		drawChart(listoflists, 'PieChart', 'pie_chart1',{});
    });
    // draw revenue less tickets bar chart

  }

