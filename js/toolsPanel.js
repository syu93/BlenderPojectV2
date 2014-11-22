<<<<<<< HEAD
=======
$(document).ready(function(){
	default_tool();
	$('#t_camera').click(function(){
		default_tool();
	});

	$('#t_move').click(function(){
		window.selected_tool='t_move';
		$('canvas').mousemove(function(){
			toolpanel.tool.selected_tool(window.selected_tool);
		});
	});


	$('#t_scale').click(function(){
		window.selected_tool='t_scale';
		$('canvas').mousemove(function(){
			toolpanel.tool.selected_tool(window.selected_tool);
		});
	});

	$('#t_rotate').click(function(){
		window.selected_tool='t_rotate';
		$('canvas').mousemove(function(){
			toolpanel.tool.selected_tool(window.selected_tool);
		});
	});

});

function default_tool(){
	window.selected_tool='t_camera';
	$('canvas').mousedown(function(){
		if(selected_tool=='t_camera'){
			window.delete_obj=true;
			unselected_object(window.SELECTED, window.controls_object, false);
		}
		$('canvas').mousemove(function(){
			toolpanel.tool.selected_tool(window.selected_tool);
		});
	});
	$('canvas').mouseup(function(){
		$('canvas').css( 'cursor', 'auto' );
		$('canvas').mousemove(function(){
			$('canvas').css( 'cursor', 'auto' );
		});
	});
}
>>>>>>> parent of 16f0377... revert tool control
