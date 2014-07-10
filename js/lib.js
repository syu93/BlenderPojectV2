function reduce_frame(){
	//The future side bare
	alert("Reduce");
	$('canvas').css("width", window.innerWidth-300);
	$('canvas').css(" -webkit-transition", "width 2s");
	$('canvas').css("transition", "width 2s");
}
function expend_frame(){
	//The future side bare
	alert("Expend");
	$('canvas').css("width", window.innerWidth+300);
	$('canvas').css(" -webkit-transition", "width 2s");
	$('canvas').css("transition", "width 2s");
}