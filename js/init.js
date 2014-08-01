	var scene, camera, renderer, projector;
	var mouse = new THREE.Vector2(),
	offset = new THREE.Vector3(),
	INTERSECTED, SELECTED;
	var objects = [], plane, controls_object;
	
	function init(){
	// Initiate the canvas scene
		//Create the maine scene
		scene = new THREE.Scene();
		scene.name="main scene";
		
		renderer = new THREE.WebGLRenderer({ alpha: true });		
		renderer.setClearColor( 0x1d1d1d, 1);
		renderer.setSize(window.innerWidth-200 , window.innerHeight-200);
		
		//create the maine camera
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
		camera.name="main camera";
		
		camera.position.set(30,15,20);
		scene.add(camera);
		
		//Projector for the camera
		projector = new THREE.Projector();
	
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		
		/**********************************************************************************************/
		object_control();

		//Buld the 3D axis
		axis();
		disable_axis();
		//origin
		origin();
		
		//Floor
		grid();

		orientation();
		/**********************************************************************************************/
		renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
		
		container = $('#canvas');
		container.append(renderer.domElement);
	}
	
	function axis(){
		// Create the 3D axis
		var axes = buildAxes(window.innerWidth );
		axes.name="main axis";
		scene.add(axes);
	}

	function render() {
	// Make the render for the view
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		controls.update();
		controls_object.update();
	}

//***************************************************************//
//***************************************************************//
//***************************************************************//
//***************************************************************//
	function onDocumentMouseMove( event ) {

		event.preventDefault();

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		
	}
	function onDocumentMouseDown( event ) {

		event.preventDefault();
		// console.log(mouse);

		var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
		projector.unprojectVector( vector, camera );

		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

		var intersects = raycaster.intersectObjects( objects );

		if ( intersects.length > 0 ) {
			controls.enabled = false;
			if(INTERSECTED)
			{
				//Old object
				INTERSECTED=SELECTED;
				INTERSECTED.material.color.setHex("0x"+SELECTED.oldMaterial);
				INTERSECTED.material.opacity=1;
				INTERSECTED.material.blending=THREE.NoBlending;
				
				INTERSECTED.children[0].visible=false;
			}
			else 
			{
				//Old object
				INTERSECTED = intersects[ 0 ].object;
				controls_object.detach(INTERSECTED);
			}
			//Current object
			SELECTED = intersects[ 0 ].object;
			SELECTED.oldMaterial = SELECTED.material.color.getHex().toString(16);
			controls_object.attach( SELECTED );
			selected_object(SELECTED, controls_object);
		
			if(SELECTED.id != INTERSECTED.id)
			{
			console.log("-------------------");
			console.log("Old selected object : "+INTERSECTED.id);
			console.log("Current selected object : "+SELECTED.id);
			console.log("-------------------");
			}
		}
		else
		{
			// if(SELECTED){
				// controls_object.detach(SELECTED);
				// SELECTED.material.color.setHex("0x"+SELECTED.oldMaterial);
				// SELECTED.material.opacity=1;
				// SELECTED.material.blending=THREE.NoBlending;
				
				// SELECTED.children[0].visible=false;
			// }
		}
	}
	function onDocumentMouseUp( event ) {

		event.preventDefault();

		controls.enabled = true;

		if ( INTERSECTED ) {

			// plane.position.copy( INTERSECTED.position );

			// SELECTED = null;

		}

		// $(this).css( "cursor", "auto" );

	}
//***************************************************************//
//***************************************************************//
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
	var geometry = new THREE.BoxGeometry(8,8,8);
	// var material = new THREE.MeshBasicMaterial({color:0x555555});		
	var material = new THREE.MeshBasicMaterial({
		color: 0x808080,
		transparent: true,
		opacity: 1,
		blending: THREE.NoBlending
	});
	var cube = new THREE.Mesh(geometry, material);
	cube.name="cube";
	//***************************************************************//
	var hex = 0xEEFF00;
	var bbox = new THREE.BoundingBoxHelper( cube, hex );
	bbox.name="bbox";
	bbox.update();
	bbox.visible = false;
	cube.add(bbox);
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
					// scene.add( pointLight );
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