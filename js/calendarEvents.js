//var data = localStorage.data;
//var garbageDates = new Array();
//for (date in data.date.day){
//	var garbage = data.garbage.pop();
//	var month = data.month.pop();
//	for (colour in garbage){
//		if (colour === 'X'){
//			var binColour = 'grey';
//		}
//		else if (colour === 'G'){
//			var binColour = 'green';
//		}
//		else{
//			var binColour = 'blue';
//		}
//		var garbageEvent = {
//			title : binColour,
//			start: '2015-' + month + '-' + date,
//			color: binColour
//		}
//		garbageDates.push(garbageEvent);
//	}
//}
//
////garbage -->date, colour date.day date.month
////holidays
//$(document).ready(function() {
//
//	$('#calendar').fullCalendar({
//		theme: true,
//		header: {
//			left: 'prev,next today',
//			center: 'title',
//			right: 'month,agendaWeek,agendaDay'
//		},
//		editable: true,
//		eventLimit: true, // allow "more" link when too many events
//		events: garbageDates
//	});
//
//});