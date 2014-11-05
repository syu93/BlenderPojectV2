$( document ).ready(function(){
// Type and editing scene
	$('canvas').click(function(){
		addEventListener("keydown", enablePreventDefault);
		addEventListener("keydown", obj_control_mode);
		addEventListener("keydown", group_select);
	});

	$('input').click(function(){
		objects_list_info(objects);
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

	// Level2
	$('#d_grid').click(function(){
		display_grid();
	});

	// Level1
	$('#delete').click(function(){
		menubar.Add.addDelete();
	});
});