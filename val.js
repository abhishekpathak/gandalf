
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

var pieOpt = {
				'legend':{'position':'none'},
				'pieSliceText':'label',
			    'chartArea':{'width':"90%",'height':'90%'},
			 }


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

	details = {};
    graphkey = 'Flights';
	var d = new Date();
	var today_date = d.getFullYear()+'-'+getFormattedDate((d.getMonth()+1))+'-'+getFormattedDate(d.getDate());	
	d.setDate(d.getDate()-1);
    yesterday_date = d.getFullYear()+'-'+getFormattedDate((d.getMonth()+1))+'-'+getFormattedDate(d.getDate());	
    t1= ['hour',today_date,today_date];
    t2 = ['hour',yesterday_date,yesterday_date];
	params = init_params();


function getFormattedDate(FDate)
{
    if (FDate<10)
        return "0"+FDate;
    return FDate;
}
	
function init_params(){
    p = {};

    p['Flights'] = {
            'set1' : {'mart':'flight_paymentdetails','metric':'tickets','timeseries':'bookingtime','timerange':t1},
            'persistantfilter' : {'typeoftravel':'Domestic'},
             };
    p['Flights(intl)'] = {
            'set1' : {'mart':'flight_paymentdetails','metric':'tickets','timeseries':'bookingtime','timerange':t1},
            'persistantfilter' : {'typeoftravel':'International'},
            };
    p['Bus'] = {
            'set1' : {'mart':'bus_paymentdetails','metric':'tickets','timeseries':'timeoftransaction','timerange':t1},
            };
    p['Hotels'] = {
            'set1' : {'mart':'hotel_paymentdetails','metric':'Room Nights','timeseries':'bookingtime','timerange':t1},
             };
    p['Users'] = {
            'set1' : {'mart':'users','metric':'users count','timeseries':'last_login','timerange':t1},
             };
    p['Cancellations'] = {
            'set1' : {'mart':'cancellations','metric':'tickets','timeseries':'refund_time','timerange':t1},
            };
    p['Traffic'] = {
            'set1' : {'mart':'traffic','metric':'visitors','timeseries':'visitdate','timerange':t1},
            }; 
    return p;
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
            if ( p.set2 != null ) p.set2.metric = metric;
            process_overview(p,metric);
        }
  }   

  function process_overview(params,key){
        // get t1
        handler.get_details(params).done(function(response){
            details[key] = response; 			
                // get perc
                perc = details[key].results.total[0][2];
                //perc = Math.round((details[key].results.total[0][1] - details[key].results.total[0][2])*100/(details[key].results.total[0][2]));
                $('.ov_Report li').each(function(){
					if($(this).find('h4').text() == key)
					{	
						$(this).find('em').text(details[key].results.total[0][1]);
						$(this).find('small').text(perc+'%').addClass('inc');
						//$(this).append('<em>'+details[key].results.total[0][1]+'</em>');
						//$(this).append('<small class=\'inc\'>'+perc+'%</small>');					
					}
				});
                if (perc <= 0)
                    $('.ov_Report li').each(function(){
					if($(this).find('h4').text() == key)$(this).find('small').attr('class','dec');
					});
        });
  }  

 function load_graph(mart){	
        key = mart;
        metric = $('#metrics').val();
        params[key].set1.metric = metric;
        handler.get_details(params[key]).done(function(response){
            details[key] = response;
                // prepare listoflists from response
			    listoflists = details[key].results.timestamp;
                if(!$('#compare').is(':checked'))
                {
                    tmp = [];
                    for(i=0 ; i < listoflists.length ; i++)
                        {
                            tmp[i] = [listoflists[i][0],listoflists[i][1]];           
                        }
                    listoflists = tmp;
			        listoflists.unshift([params[key].set1.timerange[0],params[key].set1.metric]);
                }
                else
                {
			        listoflists.unshift([params[key].set1.timerange[0],'set1','set2']);
                }
                 drawChart(listoflists, 'AreaChart','line_chart',options);
        });
  }

extra = {
        'Flights':          {
                            'e1': {'metric':'tickets','charttype':'PieChart'},
                            'e2': {'metric':'GMV','charttype':'PieChart'},
                            },
        'Flights(intl)' :   {
                            'e1': {'metric':'tickets','charttype':'PieChart'},
                            'e2': {'metric':'GMV','charttype':'PieChart'},
                            },
        'Hotels':           {
                            'e1': {'metric':'Room Nights','charttype':'PieChart'},
                            'e2': {'metric':'GMV','charttype':'PieChart'},
                            },
        'Bus':              {
                            'e1': {'metric':'tickets','charttype':'PieChart'},
                            'e2': {'metric':'GMV','charttype':'PieChart'},
                            },
        'Users':            {
                            'e1': {'metric':'flight transactions','charttype':'PieChart'},
                            'e2': {'metric':'bus transactions','charttype':'PieChart'},
                            'e3': {'metric':'hotel transactions','charttype':'PieChart'},
                            },
        'Cancellations':    {
                            'e1': {'metric':'tickets','charttype':'PieChart'},
                            'e2': {'metric':'GMV','charttype':'PieChart'},
                            },                            
        'Traffic' :         {
                            'e1': {'metric':'visitors','charttype':'PieChart'},
                            'e2': {'metric':'visits','charttype':'PieChart'},
                            'e3': {'metric':'bounces','charttype':'PieChart'},
                            },
        };

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
	var dim = $('#ByTravelStat_1').val();
    var dim_value = $('#ByTravelStat_2').val();
    if ((dim_value != null) && (dim_value[0] != "All")){
        for (i = 0 ; i < dim_value.length ; i++) 
            dim_value[i] = dim_value[i].replace('_',' ');
        if (dim_value.length > 1) 
            params[key].persistantfilter[dim] = {'$in' : dim_value} 
        else 
            params[key].persistantfilter[dim] = dim_value[0]
    }
    else{
        params[key].persistantfilter = init_params()[key].persistantfilter;
    }   
    if ($('#compare').is(':checked')){
        metric = $('#metrics_2').val();
		dateStr2 =  $('#date-range-field_2 p').last().text();		
		dateIndex = dateStr2.indexOf('/');
		sdate = dateStr2.slice(0,dateIndex);		
		edate = dateStr2.slice(dateIndex+1);		
        timeseries = $('#timeSeries_2').val();
        params[key].set2 = {};
        params[key].set2.mart = params[key].set1.mart;
        params[key].set2.metric = metric;
        params[key].set2.timeseries = timeseries;
        params[key].set2.timerange = [frequency,sdate,edate];
    }
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

  
  function load_extra(mart){
    p = params[mart];
    var dim = $('#ByTravelStat_1').val();
    p.dimensions = [dim];
    p.summarize_number = 7;
	$('#ov_chart li').remove();
    for (var e in extra[mart]) {
        p.set1.metric = extra[mart][e].metric;
        handler.get_details(p,e).done(function(response){
            listoflists = response.results[dim];
			console.log(response);
	        listoflists.unshift([dim,params[key].set1.metric,'sometext']);
			id = 'pie_chart'+response.extra;
			$('#ov_chart').append('<li><div id='+id+'></div></li>');
			drawChart(listoflists, extra[mart][response.extra].charttype, id, pieOpt);
        });    
    }
}
 /* 
  function extra(mart)
  {
	p = params[mart];
    var dim = $('#ByTravelStat_1').val();
    p.dimensions = [dim];
    p.summarize_number = 7;
    // draw tickets pie chart
    p.set1.metric = 'tickets';
    handler.get_details(params[key]).done(function(response){
        listoflists = response.results[dim];
	    listoflists.unshift([dim,params[key].set1.metric,'sometext']);		
		drawChart(listoflists, 'PieChart', 'pie_chart',pieOpt);	
    });
    // draw Avg ticket value bar chart
    
    // draw GMV pie chart
    p.set1.metric = 'GMV';
     handler.get_details(params[key]).done(function(response){
        listoflists = response.results[dim];
	    listoflists.unshift([dim,params[key].set1.metric,'sometext']);
		drawChart(listoflists, 'PieChart', 'pie_chart1',pieOpt);
    });
    p.set1.metric = $('#metrics').val();	
    // draw revenue less tickets bar chart
  }
*/
// load data in the list box
function get_list_box(mart){
    p = init_params()[mart]
    p.set1.metric = $('#metrics').val();
    var dim = $('#ByTravelStat_1').val();
    p.dimensions = [dim];
    p.summarize_number = 20;
    handler.get_details(p).done(function(response){
            listoflists = response.results[dim];
            list_box_arr = [];
            for  (i = 0 ; i < listoflists.length ; i++){
                list_box_arr.push(listoflists[i][0]);						
            } 
			$('#ByTravelStat_2').children().remove();
			//$('#ByTravelStat_2').prepend('<option value=\'Choose ...\'>Choose ...</option>');
			list_box_arr.unshift('All');
			for(i = 0 ; i < list_box_arr.length ; i++){
				var list = list_box_arr[i];
				liststr = list.replace(" ","_");
				$('#ByTravelStat_2').append('<option value='+liststr+'>'+list+'</option>');
			}
    });
}
