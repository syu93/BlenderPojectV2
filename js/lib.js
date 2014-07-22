//Global variable
var selected_object,
	panel=false;
//-------------------
//-------------------
function origin(){
	// direction (normalized), origin, length, color(hex)
	var origin = new THREE.Vector3(50,100,50);
	var terminus  = new THREE.Vector3(0,0,0);
	var direction = new THREE.Vector3().subVectors(terminus, origin).normalize();
	var arrow = new THREE.ArrowHelper(direction, origin, 50, 0x884400);
	window.scene.add(arrow);
}

function grid(){
		var size = 200; var step = 1;
		var gridHelper = new THREE.GridHelper( size, step );
		gridHelper.setColors(0, 0x3d3d3d)
		gridHelper.name="main grid";
		window.scene.add( gridHelper );	
}

function clear_scene(){
	var obj, i;
	for ( i = window.scene.children.length - 1; i >= 0 ; i -- ) 
	{
		obj = scene.children[ i ];
		if (obj !== camera) {
			window.scene.remove(obj);
		}
		axis();
		grid();
		origin();
	}
}

function reduce_frame(){
	if(panel==false)
	{
	panel=true;
	//The future side bare
	// alert("Reduce");
	canvas_w=$('canvas').width();
	canvas_h=$('canvas').height();

	$('canvas').css("width", canvas_w-300);
	$('canvas').css("height", canvas_h-300);

	$('canvas').css(" -webkit-transition", "width 2s", "height 2s");
	$('canvas').css("transition", "width 2s", "height 2s");

	// $('canvas').css(" -webkit-transition", "height 2s");
	// $('canvas').css("transition", "height 2s");
	}
}
function expend_frame(){
	if(panel==true)
	{
	panel=false;
	//The future side bare
	// alert("Expend");
	canvas_w=$('canvas').width();
	canvas_h=$('canvas').height();

	$('canvas').css("width", canvas_w+300);
	$('canvas').css("height", canvas_h+300);	
	
	$('canvas').css(" -webkit-transition", "width 2s", "height 2s");
	$('canvas').css("transition", "width 2s", "height 2s");

	// $('canvas').css(" -webkit-transition", "height 2s");
	// $('canvas').css("transition", "height 2s");
	}
}
function disable_axis(){
	window.scene.children[2].children[0].visible=false;
	window.scene.children[2].children[1].visible=false;
	window.scene.children[2].children[2].visible=false;
	window.scene.children[2].children[3].visible=false;
	window.scene.children[2].children[4].visible=false;
	window.scene.children[2].children[5].visible=false;
	console.log("Axis are disabled");
}

function enable_axis(){
	window.scene.children[2].children[0].visible=true;
	window.scene.children[2].children[1].visible=true;
	window.scene.children[2].children[2].visible=true;
	window.scene.children[2].children[3].visible=true;
	window.scene.children[2].children[4].visible=true;
	window.scene.children[2].children[5].visible=true;
	console.log("Axis are enabled");
}

function enable_grid(){
	window.scene.children[3].visible=true;
	console.log("Grid are enabled");
}function disable_grid(){
	window.scene.children[3].visible=false;
	console.log("Grid are enabled");
}

function selected_object(object, scene, camera){
	console.log(object);
	object.material.color.setHex(0xeeeeee);
	object.material.blending = THREE.SubtractiveBlending;
	
	object.children[1].children[0].visible = true;
	object.children[1].children[1].visible = true;
	object.children[1].children[2].visible = true;
	
	camera.position.copy(object.children[1].children[0].position);

}