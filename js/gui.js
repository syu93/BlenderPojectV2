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
		camera.position.z-=100;
		$('#scale').html(camera.position.z);		
	});

	$('#t_dezoom').click(function(){
		$("#s_tools").attr('data', 'dezoom');
		scope.zoomIn();
		$('#scale').html(camera.position.z);
		
	});

	$('#save').click(function(){
		send_scene(objects);
	});
});