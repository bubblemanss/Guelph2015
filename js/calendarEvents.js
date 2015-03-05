var data = JSON.parse(localStorage.getItem('data'));
var garbageDates = new Array();
data.dates.day.forEach(function(day){
	var bins = data.garbage.colours.shift();
	var month = data.dates.month.shift();
	bins.forEach(function(colour){
		if (colour === 'X'){
			var binColour = 'grey';
		}
		else if (colour === 'G'){
			var binColour = 'green';
		}
		else{
			var binColour = 'blue';
		}
		var garbageEvent = {
			title : binColour,
			start: '2015-' + month + '-' + day,
			color: binColour
		}
		garbageDates.push(garbageEvent);
		console.log(garbageEvent);
	});
});
//
////garbage -->date, colour date.day date.month
////holidays
$(document).ready(function() {

	$('#calendar').fullCalendar({
		theme: true,
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: garbageDates
	});

});