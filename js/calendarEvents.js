function eventCallBack(foo){
	//Up to you what you want in the event callback, you don't even need any variable if not needed
	//jQuery.post(){
		//iterate the JSON object and create an array of event objects in format below
	//}
};
//self invoke, need to be implemented
/**	event format {title: 'Business Lunch',
					start: '2015-03-03'}
*/
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
		events: [
		]
	});
	
});