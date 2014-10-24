$( document ).ready(function(){
//GUI
	$('#n_cube').click(function(){
		$("#s_tools").attr('data', 'sphere');
		menubar.Add.addCube();			
		// plop();
	});
	
	$('#n_sphere').click(function(){
		// $("#s_tools").attr('data', 'sphere');
		menubar.Add.addSphere();
	});

	$('#n_circle').click(function(){
		// $("#s_tools").attr('data', 'sphere');
		menubar.Add.addCircle();
	});

	$('#n_triangle').click(function(){
		// $("#s_tools").attr('data', 'sphere');
		menubar.Add.addTriangle();
	});

	$('#n_cilinder').click(function(){
		// $("#s_tools").attr('data', 'sphere');
		menubar.Add.addCylinder();
	});

	$('#n_clone').click(function(){
		menubar.Add.addClone();
	});	

	$('#n_cloneGp').click(function(){
		menubar.Add.addCloneGp();
	});	

	$('#t_clear').click(function(){
		$("#s_tools").attr('data', 'clear');
		// clear_scene();		
	});

	$('#save').click(function(){
		library.proto.save_scene();
	});

	$('#delete').click(function(){
		menubar.Add.addDelete();
	});

});