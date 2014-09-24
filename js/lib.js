//Global variable
var selected_object, selected_group, nb_group, panel=false;
var group = new THREE.Object3D();
var subGroup_1, subGroup_2, subGroup_3, subGroup_4, subGroup_5, subGroup_6, subGroup_7, subGroup_8,subGroup_9;
//-------------------
var library = function(){
	var controls_object, selectionBox, multi_box, multi_control;
	// window.scene.add(group);
}

library.proto = {

	object_control : function object_control(){
		controls_object =  new THREE.TransformControls( camera, renderer.domElement );
		// controls_object.addEventListener( 'change', render ); // lag ?
		controls_object.name="object_controller";
		
					window.addEventListener( 'keydown', function ( event ) {
					//console.log(event.which);
					switch ( event.keyCode ) {
					  case 17: //Ctrl
						break;
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
	
	selection : function selection(object){
	
			if(INTERSECTED)
			{
				// //Old object
				INTERSECTED=SELECTED;
				INTERSECTED.material.color.setHex("0x"+SELECTED.oldMaterial);
				INTERSECTED.material.opacity=1;
				INTERSECTED.material.blending=THREE.NoBlending;
			}
			else 
			{
				//Old object
				INTERSECTED = object;
				controls_object.detach(INTERSECTED);
			}
				//Current object
				SELECTED = object;
				SELECTED.oldMaterial = SELECTED.material.color.getHex().toString(16);
				controls_object.attach( SELECTED );
				selected_object(SELECTED, controls_object);window.onCtrl=true;
	
	},
		
	muti_selection : function muti_selection(){
		addEventListener("keydown", function(event){
			event.preventDefault();
			if(event.keyCode == 16 ){ // Shift
				addEventListener("keydown", group_assign);
			}
			else{
				addEventListener("keydown", group_select);
			}
		});
	},
	
	muti_move : function muti_move(){
		addEventListener("keydown", function(event){
			switch ( event.keyCode ) {
				case 17: // Ctrl			
					//---
					if(typeof (selected_group) != "undefined"){
						controls_object.attach(selected_group);
						for(var i=0; i<selected_group.children.length; i++)
						{
						var bx = "multi_box_"+i;
							var bx = library.proto.box_selection(); bx.name="selectionBox_"+i; window.scene.add(bx);
							
							window.scene.getObjectByName("selectionBox_"+i).position.copy(selected_group.children[i].position);
							window.scene.getObjectByName("selectionBox_"+i).update( selected_group.children[i] );
							window.scene.getObjectByName("selectionBox_"+i).visible=true;
							window.scene.getObjectByName("selectionBox_"+i).material.color.r=0;
							window.scene.getObjectByName("selectionBox_"+i).material.color.g=1;
							window.scene.getObjectByName("selectionBox_"+i).material.color.b=0;
							console.log(window.scene.getObjectByName("selectionBox_"+i).material.color.r);
						}
					}
			break;
			}	
		});
		addEventListener("keyup", function(event){
			switch ( event.keyCode ) {
				case 17: // Ctrl			
					//---
					if((typeof (selected_group) != "undefined"))
					{
						controls_object.attach(SELECTED);
						for(var i=0; i<selected_group.children.length; i++)
						{
						var bx = "multi_box_"+i;
							var bx = library.proto.box_selection(); bx.name="selectionBox_"+i; window.scene.add(bx);
							
							window.scene.getObjectByName("selectionBox_"+i).position.copy(selected_group.children[i].position);
							window.scene.getObjectByName("selectionBox_"+i).update( selected_group.children[i] );
							window.scene.getObjectByName("selectionBox_"+i).visible=false;
						}
					}
			break;
			}	
		});
	},
	
	save_scene : function save_scene(){
		// if(typeof window.sessionStorage.save=="undefined"){
		window.sessionStorage.clear();
			var save = {};			
				// Get the camera
				save.camera = {position:window.camera.position};

				//get objects
				var objs = [];
				for(key in objects) {
					var properties = {};
					properties.id = {id:objects[key].id};
					properties.uuid = {id:objects[key].uuid};
					properties.name = {name:objects[key].name};
					properties.position = {position:objects[key].position};
					properties.scale = {scale:objects[key].scale};
					properties.rotation = {rotation:objects[key].rotation};
					properties.group = {group:objects[key].userData.group};

					//push properties into objs
					objs.push(properties);
					// console.log(objs);
				};
				save.objects = objs;




			// save into session storage
			var g_save = JSON.stringify(save);

			window.sessionStorage.save = g_save;
			console.log(window.sessionStorage.save);
		// }
		// else if(typeof window.sessionStorage.save!="undefined"){

		// }
	},

	load_scene : function load_scene(){
		if(typeof window.sessionStorage.save!="undefined"){
			var g_save = window.sessionStorage.save;

			var save = JSON.parse(g_save);
			console.log(save);

			// Retrieve camera
			window.camera.position.copy(save.camera.position);

			// Retrieve object
			for(key in save.objects) {
				console.log(save.objects[key].position);
				//Creat the object
				switch ( save.objects[key].name.name ) {
					case "cube":
						var created_obj = menubar.Add.addCube();
					break;

					case "sphere":
						var created_obj = menubar.Add.addSphere();
					break;

					case "circle":
						var created_obj = menubar.Add.addCircle();
					break;

					case "cylinder":
						var created_obj = menubar.Add.addCylinder();
					break;
				}
				// Set objects properties
				created_obj.id = save.objects[key].id.id;
				created_obj.uuid = save.objects[key].uuid.uuid;
				created_obj.position.copy(save.objects[key].position.position);
				created_obj.scale.copy(save.objects[key].scale.scale);
				created_obj.rotation.copy(save.objects[key].rotation.rotation);
				created_obj.userData.group = save.objects[key].group.group;
			}
		}
	}
}

var menubar = function() {};

menubar.Add = {

	addCube : function(){
		var width = 100;
		var height = 100;
		var depth = 100;

		var widthSegments = 1;
		var heightSegments = 1;
		var depthSegments = 1;
			
		var geometry = new THREE.BoxGeometry( width, height, depth, widthSegments, heightSegments, depthSegments );
		var cube = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );

		cube.name='cube';
		cube.userData = {group:""};
			// cube.position.x = Math.random() * 1000 - 250;
		scene.add(cube);
		objects.push( cube );
		library.proto.selection(cube);
		
		return cube;
	},
	
	addSphere : function(){
		var radius = 75;
		var widthSegments = 32;
		var heightSegments = 16;

		var geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
		var sphere = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		sphere.name = 'sphere';
		sphere.userData = {group:"none"};
		
		scene.add(sphere);
		objects.push( sphere );
		library.proto.selection(sphere);
		
		return sphere;
	},
	
	addCircle : function(){
		var radius = 20;
		var segments = 8;

		var geometry = new THREE.CircleGeometry( radius, segments );
		var circle = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		circle.name = 'circle';
		circle.userData = {group:"none"};
		
		scene.add(circle);
		objects.push( circle );		
		library.proto.selection(circle);
		
		return circle;
	},
	
	addCylinder : function(){
		var radiusTop = 20;
		var radiusBottom = 20;
		var height = 100;
		var radiusSegments = 8;
		var heightSegments = 1;
		var openEnded = false;

		var geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded );
		var cylinder = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		mesh.name = 'cylinder';
		cylinder.userData = {group:"none"};
		
		scene.add(cylinder);
		objects.push( cylinder );		
		library.proto.selection(cylinder);

		return cylinder;
	},
	
	
	
	addClone : function(){
		if( window.onCtrl ) {
		var clone = SELECTED.clone();
			window.scene.add(clone);
			window.objects.push(clone);
		// add Group
			if(SELECTED.userData.group != "none"){
				var grp = scene.getObjectByName(clone.userData.group);
				grp.add(clone);
			}
		}
	},
	
	addCloneGp : function(){
		// if( window.onCtrl ) {
		// var clone = selected_group.clone();
		// 	for(var i=0; i< clone.children.length;i++){
		// 		window.scene.add(clone.children[i]);
		// 		window.objects.push(clone.children[i]);
		// 	}
		// }
	},

	addDelete : function(){
		SELECTED
	}
}

//---

function group_assign(event){
		event.preventDefault();
			switch ( event.keyCode ) {
				// case	17 : // Ctrl
				case  	49 : // 1
				case  	97 : // numpad 1
				nb_group = 1;
					if(typeof subGroup_1 == "undefined") {
					subGroup_1 = new THREE.Object3D(); subGroup_1.name="subGroup_1"; window.scene.add(subGroup_1); selected_group = subGroup_1; }
					else{selected_group = subGroup_1;
					removeEventListener("keydown", group_assign);
					}
					var num = true;
				break;
				
				// case	17 : // Ctrl
				case  	50 : // 2
				case  	98 : // numpad 2
				nb_group = 2;
					if(typeof subGroup_2 == "undefined") {
					subGroup_2 = new THREE.Object3D(); subGroup_2.name="subGroup_2"; window.scene.add(subGroup_2); selected_group = subGroup_2;}
					else{selected_group = subGroup_2;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;
				
				// case	17 : // Ctrl
				case  	51 : // 3
				case  	99 : // numpad 3
				nb_group = 3;
					if(typeof subGroup_3 == "undefined") {
					subGroup_3 = new THREE.Object3D(); subGroup_3.name="subGroup_3"; window.scene.add(subGroup_3); selected_group = subGroup_3;}
					else{selected_group = subGroup_3;};
					removeEventListener("keydown", group_assign);
					var num = true;
				break;	

				// case	17 : // Ctrl				
				case  	52 : // 4
				case  	100 : // numpad 4
				nb_group = 4;
					if(typeof subGroup_4 == "undefined") {
					subGroup_4 = new THREE.Object3D(); subGroup_4.name="subGroup_4"; window.scene.add(subGroup_4); selected_group = subGroup_4;}
					else{selected_group = subGroup_4;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;

				// case	17 : // Ctrl
				case  	53 : // 5
				case  	101 : // numpad 5
				nb_group = 5;
					if(typeof subGroup_5 == "undefined") {
					subGroup_5 = new THREE.Object3D(); subGroup_5.name="subGroup_5"; window.scene.add(subGroup_5); selected_group = subGroup_5;}
					else{selected_group = subGroup_5;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;

				// case	17 : // Ctrl
				case  	54 : // 6
				case  	102 : // numpad 6
				nb_group = 6;
					if(typeof subGroup_6 == "undefined") {
					subGroup_6 = new THREE.Object3D(); subGroup_6.name="subGroup_6"; window.scene.add(subGroup_6); selected_group = subGroup_6;}
					else{selected_group = subGroup_6;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;	

				// case	17 : // Ctrl
				case  	55 : // 7
				case  	103 : // numpad 7
				nb_group = 7;
					if(typeof subGroup_7 == "undefined") {
					subGroup_7 = new THREE.Object3D(); subGroup_7.name="subGroup_7"; window.scene.add(subGroup_7); selected_group = subGroup_7;}
					else{selected_group = subGroup_7;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;	

				// case	17 : // Ctrl
				case  	56 : // 8
				case  	104 : // numpad 8
				nb_group = 8;
					if(typeof subGroup_8 == "undefined") {
					subGroup_8 = new THREE.Object3D(); subGroup_8.name="subGroup_8"; window.scene.add(subGroup_8); selected_group = subGroup_8;}
					else{selected_group = subGroup_8;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;	

				// case	17 : // Ctrl
				case  	57 : // 9
				case  	105 : // numpad 9
				nb_group = 9;
					if(typeof subGroup_9 == "undefined") {
					subGroup_9 = new THREE.Object3D(); subGroup_9.name="subGroup_9"; window.scene.add(subGroup_9); selected_group = subGroup_9;}
					else{selected_group = subGroup_9;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;

				default :
				var num = false;
				break;
			}
			// put objet in the selected group
			if(SELECTED && num == true){
				if( window.onCtrl == true){
				console.log( selected_group );
				console.log(selected_group.name);

					var obj_scene_pos = new THREE.Vector3();
					var grp_scene_pos = new THREE.Vector3();

					obj_scene_pos.copy(SELECTED.position);
					grp_scene_pos.copy(selected_group.position);
						// console.log(obj_scene_pos);
						// console.log(grp_scene_pos);

					selected_group.add(SELECTED);
					// World matrix - Absolute position
					// if(grp_scene_pos.x == 0 && grp_scene_pos.y == 0 && grp_scene_pos.z == 0){
					// 	console.log("grp objs at 0,0,0");
					// 	SELECTED.position.set(
					// 		obj_scene_pos.x,
					// 		obj_scene_pos.y,
					// 		obj_scene_pos.z
					// 	);
					// }
					// else if( SELECTED.userData.group != selected_group.name ){
					// 	console.log("grp objs not at 0,0,0");
					// 	SELECTED.position.set(
					// 		obj_scene_pos.x-grp_scene_pos.x,
					// 		obj_scene_pos.y-grp_scene_pos.y,
					// 		obj_scene_pos.z-grp_scene_pos.z
					// 	);
					// }

					SELECTED.userData.group = selected_group.name;
				}
			}
}

function group_select(event){
	event.preventDefault();
			switch ( event.keyCode ) {
				case  	49 : // 1
				case  	97 : // numpad 1
				nb_group = 1;
				selected_group = subGroup_1;
				removeEventListener("keydown", group_select);
				break;
				
				case  	50 : // 2
				case  	98 : // numpad 2
				nb_group = 2;
				selected_group = subGroup_2;
				removeEventListener("keydown", group_select);
				break;
				
				case  	51 : // 3
				case  	99 : // numpad 3
				nb_group = 3;
				selected_group = subGroup_3;
				removeEventListener("keydown", group_select);
				break;	

				case  	52 : // 4
				case  	100 : // numpad 4
				nb_group = 4;
				selected_group = subGroup_4;
				removeEventListener("keydown", group_select);
				break;

				case  	53 : // 5
				case  	101 : // numpad 5
				nb_group = 5;
				selected_group = subGroup_5;
				removeEventListener("keydown", group_select);
				break;

				case  	54 : // 6
				case  	102 : // numpad 6
				nb_group = 6;
				selected_group = subGroup_6;
				removeEventListener("keydown", group_select);
				break;	

				case  	55 : // 7
				case  	103 : // numpad 7
				nb_group = 7;
				selected_group = subGroup_7;
				removeEventListener("keydown", group_select);
				break;	

				case  	56 : // 8
				case  	104 : // numpad 8
				nb_group = 8;
				selected_group = subGroup_8;
				removeEventListener("keydown", group_select);
				break;	

				case  	57 : // 9
				case  	105 : // numpad 9
				nb_group = 9;
				selected_group = subGroup_9;
				removeEventListener("keydown", group_select);
				break;
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

function unselected_object(object, controls_object){
	if (onMouseDownPosition.distanceTo( onMouseUpPosition ) == 0){
		window.onCtrl=false;
		controls_object.detach(SELECTED);
		SELECTED.material.color.setHex("0x"+SELECTED.oldMaterial);
		SELECTED.material.opacity=1;
		SELECTED.material.blending=THREE.NoBlending;
		scene.getObjectByName("selectionBox").visible=false;
		// ----
		// for(var i=0; i<window.scene.children[4].children.length; i++)
		// {
		// 	scene.getObjectByName("selectionBox_"+i).visible=false;
		// }
	}
}