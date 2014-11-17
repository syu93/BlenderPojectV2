$(document).ready(function(){
	default_tool(selected_tool);

	$('#t_camera').click(function(){
		window.selected_tool = 't_camera';
		tool_camera(selected_tool);
	});

	$('#t_move').click(function(){
		window.selected_tool = 't_move';
	});


	$('#t_scale').click(function(){
		window.selected_tool = 't_scale';
	});

	$('#t_rotate').click(function(){
		window.selected_tool = 't_rotate';
	});

});

// function default_tool(){
// 	window.selected_tool='t_camera';
// 	$('canvas').mousedown(function(){
// 		if(selected_tool=='t_camera'){
// 			window.delete_obj=true;
// 			unselected_object(window.SELECTED, window.controls_object, false);
// 		}
// 		$('canvas').mousemove(function(){
// 			toolpanel.tool.selected_tool(window.selected_tool);
// 		});
// 	});
// 	$('canvas').mouseup(function(){
// 		$('canvas').css( 'cursor', 'auto' );
// 		$('canvas').mousemove(function(){
// 			$('canvas').css( 'cursor', 'auto' );
// 		});
// 	});
// }

function default_tool(selected_tool){
	window.selected_tool = 't_camera';
	tool_camera(selected_tool);
}

function tool_camera(selected_tool){
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
	});
}