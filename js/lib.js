//Global variable
var selected_object, panel=false, milti=false;
//-------------------
var library = function(){
	var controls_object, selectionBox, multi_box;
}

library.proto = {
	object_control : function object_control(){
		controls_object =  new THREE.TransformControls( camera, renderer.domElement );
		// controls_object.addEventListener( 'change', render ); // lag ?
		controls_object.name="object_controller";
		
					window.addEventListener( 'keydown', function ( event ) {
					//console.log(event.which);
					switch ( event.keyCode ) {
					  case 81: // Q
						controls_object.setSpace( controls_object.space == "local" ? "world" : "local" );
						break;
					  case 87: // W
						controls_object.setMode( "translate" );
						break;
					  case 69: // E
						controls_object.setMode( "rotate" );
						break;
					  case 82: // R
						controls_object.setMode( "scale" );
						break;
					case 187:
					case 107: // +,=,num+
						controls_object.setSize( controls_object.size + 0.1 );
						break;
					case 189:
					case 10: // -,_,num-
						controls_object.setSize( Math.max(controls_object.size - 0.1, 0.1 ) );
						break;
						}
				});
		return  controls_object;
	},
	
	box_selection : function box_selection(){
		selectionBox = new THREE.BoxHelper();
		selectionBox.material.depthTest = false;
		selectionBox.material.transparent = true;
		selectionBox.visible = false;
		selectionBox.name="selectionBox";
		return selectionBox;
		},
		
	muti_selection : function muti_selection(){
	var group = new THREE.Object3D(); group.name="group", cloneBox=[];
	window.scene.add(group);
			addEventListener("keydown", function(event){
				switch ( event.keyCode ) {
					case 17: // Ctrl
					group.add(SELECTED);
					console.log(group);
					//---
					if(SELECTED){
						for(var i=0; i<group.children.length; i++)
						{
							cloneBox.push(window.scene.getObjectByName("selectionBox").clone()); scene.add(cloneBox);
							cloneBox[i].name="selectionBox_"+i; console.log( cloneBox[i] );
							
							cloneBox[i].position.copy(SELECTED.position);
							cloneBox[i].update( SELECTED );
							cloneBox[i].visible=true;
						}
					}
					break;
				}
			});
			addEventListener("keyup", function(event){
				
			});
		}
}


function origin(){
	// direction (normalized), origin, length, color(hex)
	var origin = new THREE.Vector3(10,25,0);
	var terminus  = new THREE.Vector3(0,0,0);
	var direction = new THREE.Vector3().subVectors(terminus, origin).normalize();
	var arrow = new THREE.ArrowHelper(direction, origin, 10, 0x884400);
	arrow.name="origin helper";
	window.scene.add(arrow);
}

function grid(){
		var size = 500; var step = 25;
		var gridHelper = new THREE.GridHelper( size, step );
		// gridHelper.setColors(0, 0x5d5d5d)
		gridHelper.name="main grid";
		window.scene.add( gridHelper );
}

function orientation(){
	var axisHelper = new THREE.AxisHelper( 3 );
	axisHelper.position.x=100;
	window.scene.add( axisHelper );
}

function clear_scene(){
	var obj, i;
	for ( i = window.scene.children.length - 1; i >= 0 ; i -- ) 
	{
		obj = scene.children[ i ];
		if (obj !== camera) {
			window.scene.remove(obj);
		}
		object_control();
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
	canvas_w=$('canvas').width();
	canvas_h=$('canvas').height();

	$('canvas').css("width", canvas_w-300);
	$('canvas').css("height", canvas_h-300);

	$('canvas').css(" -webkit-transition", "width 2s", "height 2s");
	$('canvas').css("transition", "width 2s", "height 2s");
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
	}
}
function disable_axis(){
	window.scene.children[1].children[0].visible=false;
	window.scene.children[1].children[1].visible=false;
	window.scene.children[1].children[2].visible=false;
	window.scene.children[1].children[3].visible=false;
	window.scene.children[1].children[4].visible=false;
	window.scene.children[1].children[5].visible=false;
	console.log("Axis are disabled");
}

function enable_axis(){
	window.scene.children[1].children[0].visible=true;
	window.scene.children[1].children[1].visible=true;
	window.scene.children[1].children[2].visible=true;
	window.scene.children[1].children[3].visible=true;
	window.scene.children[1].children[4].visible=true;
	window.scene.children[1].children[5].visible=true;
	console.log("Axis are enabled");
}

function enable_grid(){
	window.scene.children[3].visible=true;
	console.log("Grid are enabled");
}function disable_grid(){
	window.scene.children[3].visible=false;
	console.log("Grid are disable");
}

function selected_object(object, controls_object){
	console.log(object);
	object.material.color.setHex(0x3d3d3d);
	object.material.opacity = 0.3;
	object.material.blending = THREE.SubtractiveBlending;

	controls_object.attach(object);

	window.scene.getObjectByName("selectionBox").position.copy(object.position);
	window.scene.getObjectByName("selectionBox").update( object );
	window.scene.getObjectByName("selectionBox").visible=true;
}