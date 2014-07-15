//Global variable
var selected_object;
//-------------------
//-------------------

function reduce_frame(){
	//The future side bare
	// alert("Reduce");
	$('canvas').css("width", window.innerWidth-300);
	$('canvas').css("height", window.innerHeight-300);

	$('canvas').css(" -webkit-transition", "width 2s");
	$('canvas').css("transition", "width 2s");
}
function expend_frame(){
	//The future side bare
	// alert("Expend");
	$('canvas').css("width", window.innerWidth+300);
	$('canvas').css("height", window.innerHeight+100);	
	
	$('canvas').css(" -webkit-transition", "width 2s");
	$('canvas').css("transition", "width 2s");
}

function selected_object(object, scene, camera){
	console.log(object);
	object.material.color.setHex(0xeeeeee);
	object.material.blending = THREE.SubtractiveBlending;
	
	object.add(camera);
	
	object.children[0].children[0].visible = true;
	object.children[0].children[1].visible = true;
	object.children[0].children[2].visible = true;
}