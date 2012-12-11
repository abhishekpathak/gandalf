ga_analytics  = {

//load mart
loadMart : function()
{
	for(var i = 0; i < template.length; i++)
	$('.mainNav').append('<li><a href="#">'+template[i][0]+'</a></li>');
	$('.mainNav li:first').addClass('active');
	this.getSelectBoxData();	
},

loadchangeparams : function()
{	
	$('.ov_Report li').find('em').html('<img src="../images/ajax-loader.gif"/>');	
	$('.ov_Report li').find('small').text('');	
	var mart = $('.mainNav li.active a').text();
	changeparams(mart);
},
getSelectBoxData : function()
{			
	var currentVal = $('.mainNav li.active a').text();
		//main(currentVal);
		
		for(var i = 0; i < template.length; i++) {			
            if (template[i][0] == currentVal){ 
				$('#metrics, #metrics_2').children().remove();
				$('.ov_Report li').detach();
				//metrics selectbox
				var tempMetrics = template[i][1];
				for(var j = 0; j <= (template[i][1].length)-1; j++)
				{						
					var str = template[i][1][j];
					loadSelectBox('#metrics');
					loadSelectBox('#metrics_2');					
					//$('.ov_Report ul').append('<li><h4>'+template[i][1][j]+'</h4><em><img src="../images/ajax-loader.gif"/></em><small></small></li>');
					var ov_Report_template = _.template($('#ov_Report_template').html());	
					var ov_Report_summary = ov_Report_template({'metrics':tempMetrics});
					$('.ov_Report ul').html(ov_Report_summary);
				}
				//timeSeries selectbox
				$('#timeSeries, #timeSeries_2').children().remove();
				for(var t=0; t <=(template[i][2].length)-1; t++)
				{
					var str = template[i][2][t];					
					loadSelectBox('#timeSeries');	
					loadSelectBox('#timeSeries_2');
				}
				//By Travel status selectbox
				$('#ByTravelStat_1').children().remove();				
				for (var b=0; b <=(template[i][3].length)-1; b++ )
				{
					var str = template[i][3][b];					
					loadSelectBox('#ByTravelStat_1');					
				}				
			}			
		}
		function loadSelectBox(id)
		{  
			var valStr = str.replace(" ","_");// replace space with underscore
			$(id).append('<option value='+valStr+'>'+str+'</option>');
			$(id).change(function(){				
				var selectVal = $(id).val();				
				$(this).children().removeAttr("selected");
				$('option[value='+selectVal+']', this).attr("selected","selected");
			});
		}
},
initDoc : function(){
	this.getSelectBoxData();
	this.loadMart();
	var mart = $('.mainNav li.active a').text();
	$('#compare').attr('checked',false);
	$('#segments_2').hide();
	if($('#line_chart').is(':empty'))			
		$('#line_chart').html('<img src="../images/ajax-loader.gif"/>');
	
	//tabs
	$("#tabContent > div").hide();
	$("#tabContent > div:first").show();
	$('.tabs li a:first').addClass('selected');
	$('.tabs li a').click(function(){
		$('.tabs li a').removeClass('selected');
		$(this).addClass('selected');
		$('#tabContent > div').hide();
		var currentTab = $(this).attr('href');		
		$(currentTab).show();		
	});		
	//mainNav
	$('.mainNav li').click(function(){
		params = init_params();
		$('.mainNav li').removeClass('active');
		$(this).addClass('active');
		ga_analytics.getSelectBoxData();		
		ga_analytics.loadchangeparams();
		main(mart);
	});
	$('#ByTravelStat_1').change(function(){	
		$('#ByTravelStat_2').removeAttr('multiple').css('background-color','#efefef');
		get_list_box(mart);		
		load_extra(mart);
	});	
	$('#set').click(function(){				
		var val = $('#ByTravelStat_2').val();
		var items = new Array();
		items.push(val);
		var itemsToString = items.toString();		
		var sitems = itemsToString.split(',');		
		ga_analytics.loadchangeparams();
		load_overview(mart);
        load_graph(mart);
        load_extra(mart);
	});
	$('#metrics').change(function(){
		if(!$('#compare').is(':checked')){			
			changeparams(mart);	
			load_graph(mart);
		}
	});
	$('#timeSeries').change(function(){
		if(!$('#compare').is(':checked')){			
			ga_analytics.loadchangeparams();	
			main(mart);
		}
	});	
	$('#go').click(function(){				
		ga_analytics.loadchangeparams();
		load_overview(mart);
        load_graph(mart);
        load_extra(mart);
	});
	// time frequency
	$('#ov_TimeSeries a').click(function(){
		$('#ov_TimeSeries a').removeClass('active');
		$(this).addClass('active');		
		changeparams(mart);			
		load_graph(mart);
	});	
	// Toggle segment panel
	$('#compare').click(function(){
		$('#segments_2').toggle();	
	});
	//Datepicker
 var to = new Date();
 var from = new Date(to.getTime() - 1000 * 60 * 60 * 24 * 14);
  
  $('.datepicker-calendar').DatePicker({
    inline: true,
    date: [from, to],
    calendars: 2,
    mode: 'range',
    current: new Date(to.getFullYear(), to.getMonth() - 1, 1),
    onChange: function(dates,el) {  
		$(this).parent().prev().find('p').remove();		
		dateRange = dates[0].getDate()+' '+dates[0].getMonthName(true)+', '+dates[0].getFullYear()+' - '+dates[1].getDate()+' '+dates[1].getMonthName(true)+', '+dates[1].getFullYear();
	    $(this).parent().prev().find('span').text(dateRange);		
		$(this).parent().prev().append('<p>'+$.datepicker.formatDate('yy-mm-dd',dates[0])+'/'+$.datepicker.formatDate('yy-mm-dd',dates[1])+'</p>');	
	
	   }	
   });   
   $('#date-range-field_1 span, #date-range-field_2 span').text(to.getDate()+' '+to.getMonthName(true)+', '+to.getFullYear()+' - '+to.getDate()+' '+to.getMonthName(true)+', '+to.getFullYear()); 
   $('#date-range-field_1, #date-range-field_2').append('<p>'+$.datepicker.formatDate('yy-mm-dd',new Date())+'/'+$.datepicker.formatDate('yy-mm-dd',new Date())+'</p>'); 
   //$('#date-range-field_1 span, #date-range-field_2 span').text($.datepicker.formatDate('yy-mm-dd',new Date())+' - '+$.datepicker.formatDate('yy-mm-dd',new Date())); 
    
   $('.date-range-field').bind('click', function(){

	   $(this).next().toggle();		 
	   if($(this).children('a').text().charCodeAt(0) == 9660) {       
       $(this).children('a').html('&#9650;');
       $(this).css({borderBottomLeftRadius:0, borderBottomRightRadius:0});
       $(this).children('a').css({borderBottomRightRadius:0});
     } else {
       // switch to down-arrow
       $(this).children('a').html('&#9660;');
       $(this).css({borderBottomLeftRadius:5, borderBottomRightRadius:5});
       $(this).children('a').css({borderBottomRightRadius:5});
	   //loadchangeparams();
     }
     return false;
   });     
   
   $('html').click(function() {
     if($('#datepicker-calendar, #datepicker-calendar_2').is(":visible")) {
       $('#datepicker-calendar, #datepicker-calendar_2').hide();
       $('.date-range-field a, .date-range-field_2 a').html('&#9660;');
       $('.date-range-field, .date-range-field_2').css({borderBottomLeftRadius:5, borderBottomRightRadius:5});
       $('.date-range-field a, .date-range-field_2 a').css({borderBottomRightRadius:5});
		if(!$('#compare').is(':checked')){		
			mart = $('.mainNav li.active a').text();
			changeparams(mart);					
			main(mart)
		}
     }
	 
   });   
   
   $('#datepicker-calendar, #datepicker-calendar_2').click(function(event){
     event.stopPropagation();
   });	
}
	
}
$(document).ready(function () { ga_analytics.initDoc(); });