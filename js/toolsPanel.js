$(document).ready(function(){
	default_tool();

	$('#t_camera').click(function(){
		window.selected_tool = 't_camera';
		tool_camera(selected_tool);
	});

	$('#t_move').click(function(){
		window.selected_tool = 't_move';
		tool_move(selected_tool);
	});


	$('#t_scale').click(function(){
		window.selected_tool = 't_scale';
		tool_scale(selected_tool);
	});

	$('#t_rotate').click(function(){
		window.selected_tool = 't_rotate';
	});

});

function default_tool(){
	window.selected_tool = 't_camera';
	tool_camera(selected_tool);
}

function tool_camera(selected_tool){
	$('canvas').unbind('mouseup');
	$('canvas').unbind('mousedown');
	$('canvas').unbind('mousemove');
	
	$('canvas').mousedown( function(){
		if(SELECTED){
			window.delete_obj=true;
			unselected_object(window.SELECTED, window.controls_object, false);
		}
		$('canvas').mousemove( function(){
			toolpanel.tool.select_tool(selected_tool);
		});
	});
	$('canvas').mouseup( function(){
		$('canvas').unbind('mousemove');
		$('canvas').css( 'cursor', 'default' );
		window.delete_obj=false;
		if(INTERSECTED){
			library.proto.selection(INTERSECTED, false);
		}
	});
}

function tool_move(selected_tool){
	$('canvas').unbind('mouseup');
	$('canvas').unbind('mousedown');
	$('canvas').unbind('mousemove');

	window.controls_object.setMode( "translate" );
	toolpanel.tool.select_tool(selected_tool);
}

function tool_scale(selected_tool){
	$('canvas').unbind('mouseup');
	$('canvas').unbind('mousedown');
	$('canvas').unbind('mousemove');

	window.controls_object.setMode( "scale" );
	toolpanel.tool.select_tool(selected_tool);
}