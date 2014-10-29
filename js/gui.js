$( document ).ready(function(){
// prevent all
	$('canvas').click(function(){
		addEventListener("keydown", enablePreventDefault);
		addEventListener("keydown", obj_control_mode);
	});

// IN_PANEL_GUI
	// File
	// Level2
	$('#n_new').click(function(){
		menubar.File.doNew();
	});

	// Add
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

	// Controle Panel
	if($('#poject_name').is(':focus')){
		removeEventListener("keydown", enablePreventDefault);
		removeEventListener("keydown", obj_control_mode);
	}

	$('#objects_list').hover(function(){
			$('#objects_list tr:hover td:nth-child(2n)').click(function(event) {
			    var selected_id = $(event.target).text();
			    var clicked_obj = window.scene.getObjectById(parseInt(selected_id));
			    console.log("clicked_obj");
			    library.proto.selection(clicked_obj);
			});
		}
	);

});

// IN_APP_GUI
function objects_list_info(objects){
	if(objects_list != objects.length){
		$("#objects_list").html("");
		for(key in objects){
			$("#objects_list").append("<tr><td class='row_title'>"+objects[key].name+"</td><td class='row_title'>"+objects[key].id+"</td><td><input type='checkbox' name='visible' checked></td></tr>");
		}
		objects_list = objects.length;
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