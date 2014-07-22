$( document ).ready(function(){
//GUI
	$('#n_sphere').click(function(){
		$("#s_tools").attr('data', 'sphere');
		var new_elem = new_sphere();
	});

	$('#n_cube').click(function(){
		$("#s_tools").attr('data', 'sphere');
		var new_elem = new_cube();
	});
	
	$('#t_clear').click(function(){
		$("#s_tools").attr('data', 'clear');
		clear_scene();		
	});

	$('#t_zoom').click(function(){
		$("#s_tools").attr('data', 'zoom');
		// camera.position.x-=100;
		// camera.position.y-=100;
		// camera.position.z-=100;
		// $('#scale').html(camera.position.z);		
	});

	$('#t_dezoom').click(function(){
		$("#s_tools").attr('data', 'dezoom');
		// camera.position.x+=100;
		// camera.position.y+=100;
		// camera.position.z+=100;
		// $('#scale').html(camera.position.z);	
	});

	$('#save').click(function(){
		send_scene(objects);
	});

	$('#side_menu_on').click(function(){
		reduce_frame();
	});
	
	$('#side_menu_off').click(function(){
		expend_frame();
	});

	$('#enable_axis').click(function(){
		enable_axis();
		$('#side_menu_off').attr('id', 'side_menu_on');
	});

	$('#disable_axis').click(function(){
		disable_axis();
		$('#side_menu_off').attr('id', 'side_menu_on');
	});

	$('#enable_grid').click(function(){
		enable_grid();
		$('#side_menu_off').attr('id', 'side_menu_on');
	});

	$('#disable_grid').click(function(){
		disable_grid();
		$('#side_menu_off').attr('id', 'side_menu_on');
	});
});