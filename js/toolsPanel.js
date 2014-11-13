// $(document).ready(function(){
// 	tool_camera();
// 	$('#t_camera').click(function(){
// 		tool_camera();
// 	});

// 	$('#t_move').click(function(){
// 		tool_move();
// 	});


// 	$('#t_scale').click(function(){
// 		window.selected_tool='t_scale';
// 		$('canvas').mousemove(function(){
// 			toolpanel.tool.selected_tool(window.selected_tool);
// 		});
// 	});

// 	$('#t_rotate').click(function(){
// 		window.selected_tool='t_rotate';
// 		$('canvas').mousemove(function(){
// 			toolpanel.tool.selected_tool(window.selected_tool);
// 		});
// 	});

// });

// function tool_camera(){
// 	window.selected_tool='t_camera';
// 	$('canvas').mousedown(function(){
// 		if(selected_tool=='t_camera'){
// 			window.delete_obj=true;
// 			if(SELECTED){
// 				unselected_object(window.SELECTED, window.controls_object, false);
// 			}
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

// function tool_move(){
// 	window.selected_tool='t_move';
// 	toolpanel.tool.selected_tool(window.selected_tool);
// 	$('canvas').mousedown(function(){
// 		if(selected_tool=='t_move'){
// 			toolpanel.tool.selected_tool(window.selected_tool);
// 		}
// 		$('canvas').mousemove(function(){
// 			toolpanel.tool.selected_tool(window.selected_tool);
// 		});
// 	});
// 	$('canvas').mouseup(function(){
// 		toolpanel.tool.selected_tool(window.selected_tool);
// 		$('canvas').mousemove(function(){
// 			toolpanel.tool.selected_tool(window.selected_tool);
// 		});
// 	});	
// }