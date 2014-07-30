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
		renderer.setSize(window.innerWidth-200 , window.innerHeight-200);
		
		//create the maine camera
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
		camera.name="main camera";
		
		camera.position.set(16,13,39);
		
		scene.add(camera);
	
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		
		/**********************************************************************************************/
		controls_object =  new THREE.TransformControls( camera, renderer.domElement );
		controls_object.addEventListener( 'change', render );
		// scene.add( controls_object );
		
					window.addEventListener( 'keydown', function ( event ) {
		            //console.log(event.which);
		            switch ( event.keyCode ) {
		              case 81: // Q
		                controls_object.setSpace( controls_object.space == "local" ? "world" : "local" );
		                break;
		              case 87: // W
		                controls_object.setMode( "translate" );
		                break;
		              case 69: // E
		                controls_object.setMode( "rotate" );
		                break;
		              case 82: // R
		                controls_object.setMode( "scale" );
		                break;
					case 187:
					case 107: // +,=,num+
						controls_object.setSize( controls_object.size + 0.1 );
						break;
					case 189:
					case 10: // -,_,num-
						controls_object.setSize( Math.max(controls_object.size - 0.1, 0.1 ) );
						break;
		            }           
        		});
		/**********************************************************************************************/
		renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		/**********************************************************************************************/
		// plane = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } ) );
		// plane.visible = false;
		// scene.add( plane );
		/**********************************************************************************************/
		//Buld the 3D axis
		// axis();
		
		//origin
		// origin();
		
		//Floor
		// grid();
		
		//Projector for the camera
		projector = new THREE.Projector();

		// scene.add( new THREE.AxisHelper(50 * 1.5) );
		container = $('#canvas');
		container.append(renderer.domElement);
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
		console.log(SELECTED);
		// selected_object(SELECTED, scene, camera);
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
	var geometry = new THREE.BoxGeometry(8,8,8);
	// var material = new THREE.MeshBasicMaterial({color:0x555555});		
	var material = new THREE.MeshBasicMaterial({
		color: 0x0000ff,
		transparent: true,
		opacity: 1,
		blending: THREE.NoBlending
	});
	var cube = new THREE.Mesh(geometry, material);
	cube.name="cube";
	cube.visible=false
	//***************************************************************//
	//***************************************************************//
	var hex = 0xff0000;
	var bbox = new THREE.BoundingBoxHelper( cube, hex );
	bbox.name="bbox";
	bbox.update();
	
	cube.add( bbox );
	//***************************************************************//
	controls_object.attach( cube );
	scene.add( controls_object );
	//***************************************************************//
	var axs = obj_axes(cube);
	cube.add(axs);
	//***************************************************************//
	// cube.position.set(100,0,0);
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