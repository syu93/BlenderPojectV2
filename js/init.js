	var scene, camera, renderer, projector;
	var mouse = new THREE.Vector2(),
	offset = new THREE.Vector3(),
	INTERSECTED, SELECTED;
	var objects = [], plane;
	
	function init(){
	// Initiate the canvas scene
		//Create the maine scene
		scene = new THREE.Scene();
		scene.name="main scene";
		
		renderer = new THREE.WebGLRenderer({ alpha: true });		
		renderer.setClearColor( 0x1d1d1d, 1);
		renderer.setSize(window.innerWidth-100 , window.innerHeight-100);
		
		//create the maine camera
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
		camera.name="main camera";
		
		camera.position.set(200,180,525);
		// camera.lookAt(scene.position);
		
		scene.add(camera);
	
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		
		plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } ) );
		plane.visible = false;
		scene.add( plane );
		
		//Buld the 3D axis
		axis();
		
		//origin
		origin();
		
		//Floor
		grid();
		
		//Projector for the camera
		projector = new THREE.Projector();

		// scene.add( new THREE.AxisHelper(50 * 1.5) );
		//FIXME:identify the better container to use (body or HTML element)
		container = $('body');
		container.append(renderer.domElement);
		
		//--------
		//--------
		renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
	}
	
	function axis(){
		// Create the 3D axis
		var axes = buildAxes(window.innerWidth );
		scene.add(axes);
	}

	function render() {
	// Make the render for the view
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		controls.update();
	}

//***************************************************************//
//***************************************************************//
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
			selected_object(SELECTED, scene, camera);

			var intersects = raycaster.intersectObject( plane );
			offset.copy( intersects[ 0 ].point ).sub( plane.position );
			
			$(this).css( "cursor", "move" );
		}
		else
		{
			// alert('plop');
		}
	}

	function onDocumentMouseUp( event ) {

		event.preventDefault();

		controls.enabled = true;

		if ( INTERSECTED ) {

			plane.position.copy( INTERSECTED.position );

			SELECTED = null;

		}

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
	pointLight.position.x = 50;
	pointLight.position.y = 50;
	pointLight.position.z = 130;
	//***************************************************************//
	//***************************************************************//
	// scene.add(pointLight);
	scene.add(sphere);
	objects.push( sphere );
	
	render();
}

function new_cube(){
	var geometry = new THREE.BoxGeometry(64,64,64);
	// var material = new THREE.MeshBasicMaterial({color:0x555555});		
	var material = new THREE.MeshBasicMaterial({
		color: 0x0000ff,
		transparent: true,
		opacity: 1,
		blending: THREE.NoBlending
	});
	var cube = new THREE.Mesh(geometry, material);
	cube.name="cube";
	
	//***************************************************************//
	//***************************************************************//
	// scene.add(pointLight);
	var axs = obj_axes(cube);
	cube.add(axs);
	
	//***************************************************************//
	//***************************************************************//
	var hex = 0xff0000;
	var bbox = new THREE.BoundingBoxHelper( cube, hex ); 
	bbox.update();
	
	cube.add( bbox );

	//***************************************************************//
	//***************************************************************//
	scene.add(cube);
	objects.push( cube );
	
	render();	
}

function new_cube_save() {
	var recovery_object;
	
	if(window.sessionStorage){
	var save = window.sessionStorage;
		console.log(save);
			for(key in save)
			{
				var attr_obj = JSON.parse(save[key]);
				console.log(attr_obj);
				if(attr_obj.type.name == "cube")
				{
					var geometry = new THREE.BoxGeometry(64,64,64);
					var material = new THREE.MeshBasicMaterial({color:0x555555});		
					var recovery_object = new THREE.Mesh(geometry, material);

					recovery_object.position.x = attr_obj.position.x;
					recovery_object.position.y = attr_obj.position.y;
					recovery_object.position.z = attr_obj.position.z;
				
					recovery_object.id = attr_obj.id;
					recovery_object.name = attr_obj.type.name;
				}
					//***************************************************************//
					//***************************************************************//
					var pointLight = new THREE.PointLight(0xFFFFFF);
					pointLight.position.x = 10;
					pointLight.position.y = 50;
					pointLight.position.z = 130;
					
					//***************************************************************//
					//***************************************************************//				
					scene.add( pointLight );
					scene.add( recovery_object );
					objects.push( recovery_object );
					render();
			}
	}
}

/**********************************************************************************************************************************************/
/**********************************************************************************************************************************************/
/**********************************************************************************************************************************************/
/**********************************************************************************************************************************************/

$( document ).ready(function(){
	init();
	new_cube_save();
	render();
});