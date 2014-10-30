$( document ).ready(function(){
// Type and editing scene
	$('canvas').click(function(){
		addEventListener("keydown", enablePreventDefault);
		addEventListener("keydown", obj_control_mode);
	});
	$('#poject_name').click(function(event){
		removeEventListener("keydown", enablePreventDefault);
		removeEventListener("keydown", obj_control_mode);
	});

// IN_PANEL_GUI
// File menu
	// Level2
	$('#n_new').click(function(){
		menubar.File.doNew();
	});

// Add menu
	// Level2
	$('#n_cube').click(function(){
		menubar.Add.addCube();
	});
	
	// Level2
	$('#n_sphere').click(function(){
		menubar.Add.addSphere();
	});

	// Level2
	$('#n_circle').click(function(){
		menubar.Add.addCircle();
	});

	// Level2
	$('#n_triangle').click(function(){
		menubar.Add.addTriangle();
	});

	// Level2
	$('#n_cilinder').click(function(){
		menubar.Add.addCylinder();
	});

	// Level2
	$('#n_clone').click(function(){
		menubar.Add.addClone();
	});	

	// Level2
	$('#n_cloneGp').click(function(){
		menubar.Add.addCloneGp();
	});	

	// Level2
	$('#t_clear').click(function(){
		clear_scene();
	});

	// Level1
	$('#save').click(function(){
		window.save_state = "on";
		library.proto.save_scene();
	});

	// Level1
	$('#delete').click(function(){
		menubar.Add.addDelete();
	});


	$('#objects_list').click(function(event){ // FIXME:Need to check if the object belong to scene or groups
	    var selected_id = $(event.target).text();
	    if(!isNaN(parseInt(selected_id))) {
		    var clicked_obj = window.scene.getObjectById(parseInt(selected_id));

		    if(clicked_obj!="undefined"){
		    	library.proto.selection(clicked_obj);
			}
		}
	});

	$('#objects_list').click(function(event){ // FIXME:Need to check if the object belong to scene or groups
	    var selected_id = parseInt($(event.target).attr("id"));
	    if( !isNaN(selected_id) ) {
	    	display_ojects(selected_id);
		}
	});


});

// IN_APP_GUI

function display_ojects(id){
	// console.log(id);
	var obj_toggle = window.scene.getObjectById(id);
	// console.log(obj_toggle);

		if(obj_toggle.visible === true){
			obj_toggle.visible=false
			obj_toggle.scale.x=obj_toggle.scale.x/100000;
			obj_toggle.scale.y=obj_toggle.scale.y/100000;
			obj_toggle.scale.z=obj_toggle.scale.z/100000;
		}
		else{
			obj_toggle.visible=true;
			obj_toggle.scale.x=obj_toggle.scale.x*100000;
			obj_toggle.scale.y=obj_toggle.scale.y*100000;
			obj_toggle.scale.z=obj_toggle.scale.z*100000;
		}
}

function objects_list_info(objects){
	if( objects_list != objects.length || groups_list != groups.length ){
		$("#objects_list").html("");
		for(key in objects){
			$("#objects_list").append("<tr><td class='row_title'>"+objects[key].name+"</td><td class='row_title select_obj'>"+objects[key].id+"</td><td><input id='"+objects[key].id+"' class='visible_obj' type='checkbox' name='visible' checked></td></tr>");
		}
		for(key in groups){
			$("#objects_list").append("<tr><td class='row_title_grp'>"+groups[key].name+"</td><td class='row_title select_obj'>"+groups[key].id+"</td><td><input id='"+groups[key].id+"' class='visible_obj' type='checkbox' name='visible' checked></td></tr>");
		}

		objects_list = objects.length;
		groups_list = groups.length;
	}
}

function selected_info(SELECTED){
	if(SELECTED){
		document.getElementById("object_id").innerHTML=(SELECTED.id);
		document.getElementById("object_uuid").innerHTML=(SELECTED.uuid);
		document.getElementById("object_type").innerHTML=(SELECTED.name);
		document.getElementById("object_gp").innerHTML=(SELECTED.userData.group);
		var z_x = SELECTED.position.x;
		var z_y = SELECTED.position.y;
		var z_z = SELECTED.position.z;
		document.getElementById("object_pos_x").innerHTML=(z_x);
		document.getElementById("object_pos_y").innerHTML=(z_y);
		document.getElementById("object_pos_z").innerHTML=(z_z);
		var r_x = SELECTED.rotation.x;
		var r_y = SELECTED.rotation.y;
		var r_z = SELECTED.rotation.z;
		document.getElementById("object_rot_x").innerHTML=(r_x);
		document.getElementById("object_rot_y").innerHTML=(r_y);
		document.getElementById("object_rot_z").innerHTML=(r_z);
		var s_x = SELECTED.scale.x;
		var s_y = SELECTED.scale.y;
		var s_z = SELECTED.scale.z;
		document.getElementById("object_scl_x").innerHTML=(s_x);
		document.getElementById("object_scl_y").innerHTML=(s_y);
		document.getElementById("object_scl_z").innerHTML=(s_z);
	}
	else{
		document.getElementById("object_id").innerHTML=("");	
		document.getElementById("object_uuid").innerHTML=("");
		document.getElementById("object_type").innerHTML=("");
		document.getElementById("object_gp").innerHTML=("");
		document.getElementById("object_pos_x").innerHTML=("");
		document.getElementById("object_pos_y").innerHTML=("");
		document.getElementById("object_pos_z").innerHTML=("");

		document.getElementById("object_rot_x").innerHTML=("");
		document.getElementById("object_rot_y").innerHTML=("");
		document.getElementById("object_rot_z").innerHTML=("");
		
		document.getElementById("object_scl_x").innerHTML=("");
		document.getElementById("object_scl_y").innerHTML=("");
		document.getElementById("object_scl_z").innerHTML=("");

	}
}