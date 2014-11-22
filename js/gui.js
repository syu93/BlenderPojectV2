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

function obj_control_mode( event ) {
//console.log(event.which);
switch ( event.keyCode ) {
  case 17: //Ctrl
	break;
  case 81: // Q
	window.controls_object.setSpace( controls_object.space == "local" ? "world" : "local" );
	break;
  case 87: // W
	window.selected_tool = "t_move";
	toolpanel.tool.select_tool(selected_tool);
	window.controls_object.setMode( "translate" );
	break;
  case 69: // E
	window.selected_tool = "t_rotate";
	toolpanel.tool.select_tool(selected_tool);
	window.controls_object.setMode( "rotate" );
	break;
  case 82: // R
	window.selected_tool = "t_sale";
	toolpanel.tool.select_tool(selected_tool);
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