$( document ).ready(function(){
	var scene, camera, renderer, projector;
	var mouse = new THREE.Vector2(),
	offset = new THREE.Vector3(),
	INTERSECTED, SELECTED;
	var objects = [], plane;
	
	init();
	render();
	
	// function getCam()
	// {
		// var cam = camera;
		// return cam;
	// }
	
	function init(){
		// Initiate the canvas scene
		//***************************************************************//
		//***************************************************************//
		renderer = new THREE.WebGLRenderer({ alpha: true });			
		renderer.setClearColor( 0xdcdcdc, 1);
		
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
		
		scene = new THREE.Scene();
		
		scene.add(camera);
		
		camera.position.z = 300; //FIXME : Can we make it move
		renderer.setSize(window.innerWidth-100 , window.innerHeight-100);
		
		container = $('body');
		container.append(renderer.domElement);
	
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		
		plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } ) );
		plane.visible = false;
		scene.add( plane );
		//****************************************************************//
		// axes();
		var axes = buildAxes(window.innerWidth );
		scene.add(axes);
		buildAxis(
			new THREE.Vector3( 0, 0, 0 ),
			new THREE.Vector3( length, 0, 0 ),
			0xFF0000,
			false
		);
		
		buildAxis(
			new THREE.Vector3( 0, 0, 0 ),
			new THREE.Vector3( -length, 0, 0 ), // notice the minus sign?
			0xFF0000,
			true // ... and true because we want this axis to be dashed
		);
		// scene.add(axis);
		projector = new THREE.Projector();
		
		renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
	}
	

	function render() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		controls.update();	
	}

//***************************************************************//
//***************************************************************//
	
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
		camera.position.z+=100;
		$('#scale').html(camera.position.z);
		
	});
	
//***************************************************************//
//***************************************************************//
	function onDocumentMouseMove( event ) {

		event.preventDefault();

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		//

		var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
		projector.unprojectVector( vector, camera );

		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );


		if ( SELECTED ) {

			var intersects = raycaster.intersectObject( plane );
			SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
			return;

		}

		var intersects = raycaster.intersectObjects( objects );

		if ( intersects.length > 0 ) {

			if ( INTERSECTED != intersects[ 0 ].object ) {

				if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

				INTERSECTED = intersects[ 0 ].object;
				INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

				plane.position.copy( INTERSECTED.position );
				plane.lookAt( camera.position );

			}

			// container.style.cursor = 'pointer';
			container.css( "cursor", "pointer" );

		} else {

			if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );

			INTERSECTED = null;

			// container.style.cursor = 'auto';
			container.css( "cursor", "auto" );

		}

	}
	
	function onDocumentMouseDown( event ) {

		event.preventDefault();

		var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
		projector.unprojectVector( vector, camera );

		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

		var intersects = raycaster.intersectObjects( objects );

		if ( intersects.length > 0 ) {

			controls.enabled = false;

			SELECTED = intersects[ 0 ].object;

			var intersects = raycaster.intersectObject( plane );
			offset.copy( intersects[ 0 ].point ).sub( plane.position );

			// container.style.cursor = 'move';
			// container.css( "cursor", "move" );
			$(this).css( "cursor", "move" );

		}

	}

	function onDocumentMouseUp( event ) {

		event.preventDefault();

		controls.enabled = true;

		if ( INTERSECTED ) {

			plane.position.copy( INTERSECTED.position );

			SELECTED = null;

		}

		// container.style.cursor = 'auto';.
		// container.css( "cursor", "auto" );
		$(this).css( "cursor", "auto" );

	}
//***************************************************************//
//***************************************************************//

function new_sphere(){
	var geometry = new THREE.SphereGeometry(50,16,16);
	var material = new THREE.MeshLambertMaterial({color:0x666666});	
	var sphere = new THREE.Mesh(geometry, material);
	//***************************************************************//
	//***************************************************************//
	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
	//***************************************************************//
	//***************************************************************//
	scene.add(pointLight);
	scene.add(sphere);
	objects.push( sphere );
	
	render();
}

function new_cube(){
	var geometry = new THREE.CubeGeometry(64,64,64);
	var material = new THREE.MeshBasicMaterial({color:0x666666});			
	var cube = new THREE.Mesh(geometry, material);
	//***************************************************************//
	//***************************************************************//
	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
	//***************************************************************//
	//***************************************************************//
	scene.add(pointLight);
	scene.add(cube);
	objects.push( cube );
	
	render();
}

function clear_scene(){
	var obj, i;
	for ( i = scene.children.length - 1; i >= 0 ; i -- ) 
	{
		obj = scene.children[ i ];
		if (obj !== camera) {
			scene.remove(obj);
			// axes();
		}
	}
}

});