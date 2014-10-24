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
		// clear_scene();		
	});

	$('#save').click(function(){
		library.proto.save_scene();
	});

	$('#delete').click(function(){
		menubar.Add.addDelete();
	});
	$('#start').click(function(){
		clock.stop();
		// clock.start();
	});
});

function selected_info(SELECTED){
	if(SELECTED){
		document.getElementById("obect_id").innerHTML=(SELECTED.id);
		document.getElementById("obect_uuid").innerHTML=(SELECTED.uuid);
		document.getElementById("obect_type").innerHTML=(SELECTED.name);
		document.getElementById("obect_gp").innerHTML=(SELECTED.userData.group);
		var x = SELECTED.position.x;
		var y = SELECTED.position.y;
		var z = SELECTED.position.z;
		document.getElementById("obect_pos").innerHTML=("X="+x+",\r\n Y="+y+",\r\n Z="+z);
	}
	else{
		document.getElementById("obect_id").innerHTML=("");	
		document.getElementById("obect_uuid").innerHTML=("");
		document.getElementById("obect_type").innerHTML=("");
		document.getElementById("obect_gp").innerHTML=("");
		document.getElementById("obect_pos").innerHTML=("X=,\r\n Y=,\r\n Z=");
	}
}