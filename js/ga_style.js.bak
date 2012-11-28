$(function(){	
	var data = [
				["Flights",
					['tickets','GMV','Gross Margin','Promocode','Commission'],
					['bookingtime','traveltime'],
				],
				["Flights(Intl)",
					['tickets', 'GMV','Gross Margin','Promocode'],
					['timeoftransaction'],
				],
				["Hotels",
					['Room Nights','Rooms','GMV','Promocode','transactions','refundamount'],
					['bookingtime','checkin','checkout'],
				],
				["Holidays",
					['users count','flight tickets','bus tickets','hotel rooms','hotel roomnight','flight transactions','bus transactions','hotel transactions'],
					['last_login','date_joined'],
				],
				["Bus",
					['tickets', 'GMV','Gross Margin','Promocode'],
					['refund_time','bookingtime','traveltime'],
				],
				["Taxi",
					 ['visitors','visits','bounces','all goal completions','goal 1 completions','goal 2 completions','goal 4 completions','goal 7 completions'],
					 ['visitdate'],
				]
	];
// tabs view
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

//mart
	$('.mainNav li').click(function(){
		$('.mainNav li').removeClass('active');
		$(this).addClass('active');
		var currentVal = $(this).children().text();	
		var martlen = $('.mainNav li').length;
		for(var i = 0; i < data.length; i++) {
            if (data[i][0] == currentVal){ 
				$('#metrics, #metrics_2').children().remove();
				//metrics selectbox
				for(var j = 0; j <= (data[i][1].length)-1; j++)
				{			
					var str = data[i][1][j];
					var valStr = str.replace(/\s+/g, '');// remove space for value
					loadSelectBox('#metrics');
					loadSelectBox('#metrics_2');		
				}
				//timeSeries selectbox
				$('#timeSeries, #timeSeries_2').children().remove();
				for(var t=0; t <=(data[i][2].length)-1; t++)
				{
					var str = data[i][2][t];
					var valStr = str.replace(/\s+/g, '');
					loadSelectBox('#timeSeries');	
					loadSelectBox('#timeSeries_2');
				}
				
			}
			
		}
		// loading list in the selectbox
		function loadSelectBox(id)
		{  
			$(id).append('<option value='+valStr+'>'+str+'</option>');
			$(id).change(function(){				
				var selectVal = $(id).val();				
				$(this).children().removeAttr("selected");
				$('option[value='+selectVal+']', this).attr("selected","selected");
			});
		}	
			
	});

// segments
$('#compare').attr('checked',false);
$('#segments_2').hide();
$('#compare').click(function(){
	$('#segments_2').toggle();
	/*if($(this).is(':checked'))
	{
		var cloned = $("#segments_1").clone(true, true);
		var id = 2;
		cloned.id = "segments_" + id ;    
		cloned.attr('id', cloned.id);
		cloned.find('#compare').parent().remove();
		$(cloned).insertBefore('#overview');
		eleId = $(cloned).children().attr('id');
		$(cloned).children().attr('id', eleId +id);
		cloned.find('#metrics').attr('id', 'metrics_2');
		cloned.find('#timeSeries').attr('id', 'timeSeries_2');
		cloned.find('#date-range').attr('id', 'date-range_2');				
		cloned.find('.date-range-field').attr('id', 'date-range-field_2');
		cloned.find('#datepicker-calendar').attr('id', 'datepicker-calendar_2');
		$(cloned).find('ul').append('<li><a href="" id="go">Go</a></li>');
	} else
	{
		$("#segments_2").detach();
		
	}*/
	
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
      $(this).parent().prev().find('span').text(dates[0].getDate()+' '+dates[0].getMonthName(true)+', '+dates[0].getFullYear()+' - '+
                                        dates[1].getDate()+' '+dates[1].getMonthName(true)+', '+dates[1].getFullYear());	    
	 }
	 
   });
   $('#date-range-field_1 span, #date-range-field_2 span').text('select Date'); 
  
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
     }
     return false;
   
		
   }); 
   function showCalender(calender)
	{
		 $(calender).toggle();
	}  
   
   $('html').click(function() {
     if($('#datepicker-calendar, #datepicker-calendar_2').is(":visible")) {
       $('#datepicker-calendar, #datepicker-calendar_2').hide();
       $('.date-range-field a, .date-range-field_2 a').html('&#9660;');
       $('.date-range-field, .date-range-field_2').css({borderBottomLeftRadius:5, borderBottomRightRadius:5});
       $('.date-range-field a, .date-range-field_2 a').css({borderBottomRightRadius:5});
     }
   });   
   
   $('#datepicker-calendar, #datepicker-calendar_2').click(function(event){
     event.stopPropagation();
   });
   

});