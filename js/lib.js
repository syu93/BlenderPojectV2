//Global variable
var selected_object, delete_obj, selected_group, nb_group, panel=false;
var subGroup_1, subGroup_2, subGroup_3, subGroup_4, subGroup_5, subGroup_6, subGroup_7, subGroup_8,subGroup_9;
//-------------------
var library = function(){
	var controls_object, selectionBox, multi_box, multi_control;
}

library.proto = {

	object_control : function object_control(){
		controls_object =  new THREE.TransformControls( camera, renderer.domElement );
		// controls_object.addEventListener( 'change', render ); // lag ?
		controls_object.name="object_controller";
		window.addEventListener( 'keydown', obj_control_mode);
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
	
	selection : function selection(object, is_group){
			if(INTERSECTED)
			{
				//Old object
				INTERSECTED = object;
				controls_object.detach(INTERSECTED);
			}
				INTERSECTED = SELECTED;
				//Current object
				SELECTED = object;
				selected_object(SELECTED, controls_object, is_group);
				window.onCtrl=true;
	
	},
		
	muti_selection : function muti_selection(){
		addEventListener("keydown", function(event){
			// event.preventDefault();
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
			if( event.keyCode == 17) {
				if(typeof(selected_group) !== "undefined"){
					controls_object.attach(selected_group);
					for(var i=0; i<selected_group.children.length; i++)
					{
						var bx = library.proto.box_selection(); bx.name="selectionBox_"+i; window.scene.add(bx);
						
						window.scene.getObjectByName("selectionBox_"+i).position.copy(selected_group.children[i].position);
						window.scene.getObjectByName("selectionBox_"+i).update( selected_group.children[i] );
						window.scene.getObjectByName("selectionBox_"+i).visible=true;
						window.scene.getObjectByName("selectionBox_"+i).material.color.r=0;
						window.scene.getObjectByName("selectionBox_"+i).material.color.g=1;
						window.scene.getObjectByName("selectionBox_"+i).material.color.b=0;
						// console.log(window.scene.getObjectByName("selectionBox_"+i).material.color.r);
					}
				}
			}	
		});
		addEventListener("keyup", function(event){
			if( event.keyCode == 17) {
				if((typeof(selected_group) !== "undefined"))
				{
					controls_object.attach(SELECTED);
					for(var i=0; i<selected_group.children.length; i++)
					{
						var bx = window.getElementByName("selectionBox_"+i);
						console.log(bx);
					}
				}
			}	
		});
	},

	groupCreate : function(gp_name){
		subGroup = new THREE.Object3D(); 
		subGroup.name= gp_name;
		groups.push(subGroup);
		return subGroup;
	},
	
	save_scene : function(){
		if ( (Math.round(window.clock.getElapsedTime()) == (window.timer+300)) || window.save_state =="on"){
			window.timer = Math.round(window.clock.getElapsedTime());

			window.sessionStorage.clear();

			var save = {};

				// Get the project name

				// 
				var tools_panel = {left:$('#dragme').css('left'),top:$('#dragme').css('top'), width:$('#tool_panel').css('width'), height:$('#tool_panel').css('height')};
				save.project = {name:$("#poject_name").val(), tools:tools_panel};

				// Get grid config
				var grid_cfg = [];
					var properties = {};
					properties.visible = {visible:grid.visible};
					
					//push properties into grid
					grid_cfg.push(properties);
				save.grid = grid_cfg;

				// Get the camera
				save.camera = {position:window.camera.position};

				//get group elements
				var gprs = [];
				for (key in groups){
					var properties  = {};
					properties.id = {id:groups[key].id};
					properties.uuid = {uuid:groups[key].uuid};
					properties.name = {name:groups[key].name};
					properties.position = {position:groups[key].position};
					properties.scale = {scale:groups[key].scale};
					properties.rotation = {rotation:groups[key].rotation};
					properties.visible = {visible:groups[key].visible};

					//push properties into gprs
					gprs.push(properties);
				}
				save.groups = gprs;

				//get objects
				var objs = [];
				for(key in objects) {
					var properties = {};
					properties.id = {id:objects[key].id};
					properties.uuid = {uuid:objects[key].uuid};
					properties.name = {name:objects[key].name};
					properties.position = {position:objects[key].position};
					properties.scale = {scale:objects[key].scale};
					properties.rotation = {rotation:objects[key].rotation};
					properties.group = {group:objects[key].userData.group};
					properties.visible = {visible:objects[key].visible};

					//push properties into objs
					objs.push(properties);
				}
				save.objects = objs;

			// save into session storage
			var g_save = JSON.stringify(save);

			window.sessionStorage.save = g_save;

			//display save info to user and dev =)
			console.log(window.sessionStorage.save);
			$( '#auto_save_msg' ).toggle('slow', 'linear', function(){
					$( '#auto_save_msg' ).delay(5000).hide(1000);
				});
		window.save_state="off";
		}
	},

	load_scene : function(){
		if(typeof window.sessionStorage.save!="undefined"){
			var g_save = window.sessionStorage.save;

			var save = JSON.parse(g_save);
			// console.log(save);

			// Retrieve project
			$("#poject_name").val(save.project.name);

			// Retrieve tool panel position
			$("#dragme").css('left',save.project.tools.left);
			$("#dragme").css('top',save.project.tools.top);

			$("#tool_panel").css('width',save.project.tools.width);
			$("#tool_panel").css('height',save.project.tools.height);


			// Retrieve grid
			for(key in save.grid){
				window.grid.visible = save.grid[key].visible.visible;
			}

			// Retrieve camera
			window.camera.position.copy(save.camera.position);

			// Retrieve object
			for(key in save.objects) {
				// console.log(save.objects[key].position);
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
					case "triangle":
						var created_obj = menubar.Add.addTriangle();
					break;

				}

				// Set objects properties
				created_obj.id = save.objects[key].id.id;
				created_obj.uuid = save.objects[key].uuid.uuid;
				created_obj.position.copy(save.objects[key].position.position);
				created_obj.scale.copy(save.objects[key].scale.scale);
				created_obj.rotation.copy(save.objects[key].rotation.rotation);
				created_obj.userData.group = save.objects[key].group.group;
				created_obj.visible = save.objects[key].visible.visible;

				for(key in save.groups){
					if( created_obj.userData.group == save.groups[key].name.name ) {

						var created_grp = library.proto.groupCreate(created_obj.userData.group);
							window.scene.add(created_grp);
						created_grp.id = save.groups[key].id.id;
						created_grp.uuid = save.groups[key].uuid.uuid;
						created_grp.position.copy(save.groups[key].position.position);
						created_grp.scale.copy(save.groups[key].scale.scale);
						created_grp.rotation.copy(save.groups[key].rotation.rotation);
						created_grp.visible = save.groups[key].visible.visible;

						// THREE.SceneUtils.attach(created_obj, window.scene, created_grp);
						created_grp.add(created_obj);
					}
				}
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
		cube.userData = {group:"none"};
			// cube.position.x = Math.random() * 1000 - 250;
		scene.add(cube);
		objects.push( cube );
		library.proto.selection(cube, false);
		
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
		library.proto.selection(sphere, false);
		
		return sphere;
	},
	
	addCircle : function(){
		var radius = 20;
		var segments = 100;

		var geometry = new THREE.CircleGeometry( radius, segments );
		var circle = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		circle.name = 'circle';
		circle.userData = {group:"none"};
		
		scene.add(circle);
		objects.push( circle );
		library.proto.selection(circle, false);
		
		return circle;
	},
	
	addCylinder : function(){
		var radiusTop = 20;
		var radiusBottom = 20;
		var height = 100;
		var radiusSegments = 100;
		var heightSegments = 1;
		var openEnded = false;

		var geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded );
		var cylinder = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		cylinder.name = 'cylinder';
		cylinder.userData = {group:"none"};
		scene.add(cylinder);
		objects.push( cylinder );
		library.proto.selection(cylinder, false);

		return cylinder;
	},

	addTriangle : function(){
		var radiusTop = 0;
		var radiusBottom = 20;
		var height = 100;
		var radiusSegments = 100;
		var heightSegments = 1;
		var openEnded = false;

		var geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded );
		var triangle = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		triangle.name = 'triangle';
		triangle.userData = {group:"none"};
		triangle.scale.z=0.00028726221039769107;

		scene.add(triangle);
		objects.push( triangle );
		library.proto.selection(triangle, false);

		return triangle;
	},
	
	
	
	addClone : function(){
		if( window.onCtrl ) {
		var clone = SELECTED.clone();
		window.scene.add(clone);
		objects.push(clone);
		library.proto.selection(clone, false);
		// add Group
		// if(SELECTED.userData.group != "none"){
		// 	var grp = scene.getObjectByName(clone.userData.group);
		// 	grp.add(clone);
		// }
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
		if ( confirm( 'Delete ' + SELECTED.name + ' ?' ) === false ) return;
		delete_obj=true;
		//---
		for(key in objects){
			if (objects[key].uuid == SELECTED.uuid){
				objects.splice(key, 1);
			}
		}
		//---		
		SELECTED.geometry = {};
		SELECTED.geometry = new THREE.Geometry();
		SELECTED.geometry.dispose();
		scene.remove(SELECTED);
		unselected_object(SELECTED, controls_object);
		//---
		render();
		console.log(SELECTED);
		//---
		delete_obj=false;
	}
},

menubar.File = {
	doNew : function(){
		if ( confirm( "Do you want to quite " + $('#poject_name').val() + " ?" ) === false ) return;
		window.sessionStorage.clear();
		$("#poject_name").val("");
		location.reload();
	}
}

var toolpanel = function() {};

toolpanel.tool = {
	select_tool : function (selected_tool){
		switch(selected_tool){
			default:
				$('canvas').css( 'cursor', 'default' );
				break
			case 't_camera':
				$('canvas').css( 'cursor', 'url(css/img/ico-eye.png) 10 5, auto' );
				break;
			case 't_move':
				$('canvas').css( 'cursor', 'url(css/img/ico-drag.png) 10 5, auto' );
				window.controls_object.setMode( "translate" );
				break;
			case 't_scale':
				$('canvas').css( 'cursor', 'url(css/img/ico-scale.png) 10 5, auto' );
				window.controls_object.setMode( "scale" );
				break;
			case 't_rotate':
				$('canvas').css( 'cursor', 'url(css/img/scale-drag.png) 10 5, auto' );
				window.controls_object.setMode( "rotate" );
				break;
		}
	}
}
//---

function group_assign(event){
		// event.preventDefault();
			switch ( event.keyCode ) {
				case  	49 : // 1
				case  	97 : // numpad 1
				nb_group = 1;
					if(typeof subGroup_1 == "undefined") {
						var gp_name = "subGroup_1"; 
						subGroup_1 = library.proto.groupCreate(gp_name);
						window.scene.add(subGroup_1); selected_group = subGroup_1;
					}					
					else{selected_group = subGroup_1;
					removeEventListener("keydown", group_assign);
					}
					var num = true;
				break;
				
				case  	50 : // 2
				case  	98 : // numpad 2
				nb_group = 2;
					if(typeof subGroup_2 == "undefined") {
						var gp_name = "subGroup_2";
						subGroup_2 = library.proto.groupCreate(gp_name);
						window.scene.add(subGroup_2); selected_group = subGroup_2;
					}					
					else{selected_group = subGroup_2;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;
				
				case  	51 : // 3
				case  	99 : // numpad 3
				nb_group = 3;
					if(typeof subGroup_3 == "undefined") {
						var gp_name = "subGroup_3";
						subGroup_3 = library.proto.groupCreate(gp_name);
						window.scene.add(subGroup_3); selected_group = subGroup_3;
					}
					else{selected_group = subGroup_3;};
					removeEventListener("keydown", group_assign);
					var num = true;
				break;	

				case  	52 : // 4
				case  	100 : // numpad 4
				nb_group = 4;
					if(typeof subGroup_4 == "undefined") {
						var gp_name = "subGroup_4";
						subGroup_4 = library.proto.groupCreate(gp_name);
						window.scene.add(subGroup_4); selected_group = subGroup_4;
					}
					else{selected_group = subGroup_4;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;

				case  	53 : // 5
				case  	101 : // numpad 5
				nb_group = 5;
					if(typeof subGroup_5 == "undefined") {
						var gp_name = "subGroup_5";
						subGroup_5 = library.proto.groupCreate(gp_name);
						window.scene.add(subGroup_5); selected_group = subGroup_5;
					}					
					else{selected_group = subGroup_5;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;

				case  	54 : // 6
				case  	102 : // numpad 6
				nb_group = 6;
					if(typeof subGroup_6 == "undefined") {
						var gp_name = "subGroup_6";
						library.proto.groupCreate(gp_name);
						window.scene.add(subGroup_6); selected_group = subGroup_6;
					}					
					else{selected_group = subGroup_6;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;	

				case  	55 : // 7
				case  	103 : // numpad 7
				nb_group = 7;
					if(typeof subGroup_7 == "undefined") {
						var gp_name = "subGroup_7";
						subGroup_7 = library.proto.groupCreate(gp_name);
						window.scene.add(subGroup_7); selected_group = subGroup_7;
					}					
					else{selected_group = subGroup_7;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;	

				case  	56 : // 8
				case  	104 : // numpad 8
				nb_group = 8;
					if(typeof subGroup_8 == "undefined") {
						var gp_name = "subGroup_8";
						library.proto.groupCreate(gp_name);
						window.scene.add(subGroup_8); selected_group = subGroup_8;
					}					
					else{selected_group = subGroup_8;}
					removeEventListener("keydown", group_assign);
					var num = true;
				break;	

				case  	57 : // 9
				case  	105 : // numpad 9
				nb_group = 9;
					if(typeof subGroup_9 == "undefined") {
						var gp_name ="subGroup_9";
						subGroup_9 = library.proto.groupCreate(gp_name);
						window.scene.add(subGroup_9); selected_group = subGroup_9;
					}					
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
					// console.log( selected_group );
					// console.log(selected_group.name);					
					if(SELECTED.userData.group != selected_group.name)
					{
						var old_group = window.scene.getObjectByName(SELECTED.userData.group);
						// console.log(old_group);

						if(SELECTED.userData.group =="none")
						{
							THREE.SceneUtils.attach(SELECTED, window.scene, selected_group);
						}
						else
						{
							THREE.SceneUtils.detach(SELECTED, old_group, window.scene);
							THREE.SceneUtils.attach(SELECTED, window.scene, selected_group);
						}
					}
					SELECTED.userData.group = selected_group.name;
				}
			}
}

function group_select(event){
	// event.preventDefault();
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
		// gridHelper.setColors(0, 0x171717);
		gridHelper.name="main grid";
		window.scene.add( gridHelper );
		return gridHelper;
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

function display_grid(){
	if(grid.visible === true){
		grid.visible=false;
	}
	else{
		grid.visible=true;
	}
	
}

function selected_object(object, controls_object, is_group){

	window.onCtrl=false;

	controls_object.attach(object);
	// ctr_panel_active();
	if(is_group === false){
		window.scene.getObjectByName("selectionBox").position.copy(object.position);
		window.scene.getObjectByName("selectionBox").update( object );
		window.scene.getObjectByName("selectionBox").visible=true;
	}
}

function unselected_object(object, controls_object, is_group){
	if (onMouseDownPosition.distanceTo( onMouseUpPosition ) == 0 || delete_obj === true){
		window.onCtrl=false;

		controls_object.detach(SELECTED);
		$('#obj_'+object.id).removeClass("list_object_seleted");
		if(is_group === false){
				window.scene.getObjectByName("selectionBox").position.copy(scene.position);
				window.scene.getObjectByName("selectionBox").update(window.scene.getObjectByName("main grid"));
				window.scene.getObjectByName("selectionBox").visible=false;
		}

		INTERSECTED=SELECTED;
		SELECTED ="";
		delete_obj=false;
	}
}

function obj_control_mode( event ) {
//console.log(event.which);
switch ( event.keyCode ) {
  case 17: //Ctrl
	break;
  case 81: // Q
	window.controls_object.setSpace( controls_object.space == "local" ? "world" : "local" );
	break;
  case 87: // W
	window.controls_object.setMode( "translate" );
	break;
  case 69: // E
	window.controls_object.setMode( "rotate" );
	break;
  case 82: // R
	window.controls_object.setMode( "scale" );
	break;
case 187:
case 107: // +,=,num+
	window.controls_object.setSize( controls_object.size + 0.1 );
	break;
case 189:
case 10: // -,_,num-
	window.controls_object.setSize( Math.max(controls_object.size - 0.1, 0.1 ) );
	break;
	}
}

function enablePreventDefault(event){
	event.preventDefault();
}