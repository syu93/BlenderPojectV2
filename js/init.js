	var scene, camera, renderer, projector, width, height, intersects;
	var scene2, camera2, renderer2, projector2, width, height, intersects;
	var objects = [];
	var mouse = new THREE.Vector2(),
	offset = new THREE.Vector3(),
	INTERSECTED, SELECTED,rect;
	
	var object_control, selectionBox, control_active=false;
	
	var unit={x:100,y:100,z:100};
	
	function init(){
		width = window.innerWidth-200;
		height = window.innerHeight-60;
		// main scene
		scene = new THREE.Scene();
		scene.name="main scene";
		// main camera
		camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
		camera.name="main camera";		
		camera.position.set(0,0,300);
		camera.lookAt(scene.position);
		scene.add(camera);
		// Projector for the camera
		projector = new THREE.Projector();
		//Axis
		// axis();
		// disable_axis();
		//origin
		// origin();
		//Floor
		grid();
		
		// renderer = new THREE.CanvasRenderer();		
		renderer = new THREE.WebGLRenderer({ alpha: true });		
		renderer.setSize(width , height);
		renderer.setClearColor( 0xcccccc, 1);
		container = $('#canvas');
		container.append(renderer.domElement);		
		rect = container[0];
		// console.log(rect.clientHeight);
		
		/***********************************************/
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		
		object_control = library.proto.object_control(); scene.add(object_control);
		selectionBox = library.proto.box_selection(); scene.add(selectionBox);
		
		renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
	}

	function init2(){
		width2 = window.innerWidth/12;
		height2 = window.innerHeight/12;
		scene2 = new THREE.Scene();
		camera2 = new THREE.PerspectiveCamera(50, width2 / height2, 1, 5000);
		camera2.lookAt(scene.position);
		scene2.add(camera2);
		projector2 = new THREE.Projector();			
		var axisHelper = new THREE.AxisHelper( 125 );
		scene2.add( axisHelper );
		
		renderer2 = new THREE.CanvasRenderer();		
		renderer2.setSize(width2 , height2);
		renderer2.setClearColor( 0xa9a9a9, 1);
		container2 = $('#direction');
		container2.append(renderer2.domElement);
		controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
	}
	
	function render() {
	// Make the render for the view
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		controls.update();
		controls_object.update();
	}

	function render2() {
	// Make the render for the view
		requestAnimationFrame(render2);		
		camera2.position.copy(camera.position);		
		renderer2.render(scene2, camera2);
		controls2.update();
	}
	
	function axis(){
		// Create the 3D axis
		var axes = buildAxes(width );
		axes.name="main axis";
		scene.add(axes);
	}

//***************************************************************//
//***************************************************************//
//***************************************************************//
//***************************************************************//
	function onDocumentMouseMove( event ) {

		event.preventDefault();

		mouse.x = (( event.clientX ) / rect.clientWidth)* 2 - 1;
		mouse.y = -(( event.clientY - 35) / rect.clientHeight) * 2 + 1;
		
		var vector = new THREE.Vector3( mouse.x, mouse.y,1);
		projector.unprojectVector( vector, camera );
		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
		var intersects = raycaster.intersectObjects( objects );

		if ( intersects.length > 0 ) {
			$('canvas').css("cursor", "move");
		}
		else
		{
			$('canvas').css("cursor", "auto");
		}
	}
	function onDocumentMouseDown( event ) {
		event.preventDefault();

		var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
		projector.unprojectVector( vector, camera );
		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
		var intersects = raycaster.intersectObjects( objects );

		if ( intersects.length > 0 ) {
			if(INTERSECTED)
			{
				// //Old object
				INTERSECTED=SELECTED;
				INTERSECTED.material.color.setHex("0x"+SELECTED.oldMaterial);
				INTERSECTED.material.opacity=1;
				INTERSECTED.material.blending=THREE.NoBlending;
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
		}
		else
		{
			if(SELECTED){ //If an object is selected			
				if ( ! window.control_active ){
					controls_object.detach(SELECTED);
					SELECTED.material.color.setHex("0x"+SELECTED.oldMaterial);
					SELECTED.material.opacity=1;
					SELECTED.material.blending=THREE.NoBlending;
					scene.getObjectByName("selectionBox").visible=false;
				}
			}
		}
	}
	
	function onDocumentMouseUp( event ) {

		event.preventDefault();

		controls.enabled = true;

		if ( INTERSECTED ) {

		}
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
	var width = 100;
	var height = 100;
	var depth = 100;

	var widthSegments = 1;
	var heightSegments = 1;
	var depthSegments = 1;
		
	var geometry = new THREE.BoxGeometry( width, height, depth, widthSegments, heightSegments, depthSegments );
	var cube = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );

	cube.name="cube";
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
					var x = attr_obj.scale.x;
					var y = attr_obj.scale.y;
					var z = attr_obj.scale.z;
					
					var geometry = new THREE.BoxGeometry((unit.x*x),(unit.x*y),(unit.z*z));
					var material = new THREE.MeshBasicMaterial({color:0xDDDDDD});		
					var recovery_object = new THREE.Mesh(geometry, material);
					
					recovery_object.position.x = attr_obj.position.x;
					recovery_object.position.y = attr_obj.position.y;
					recovery_object.position.z = attr_obj.position.z;
				
					recovery_object.id = attr_obj.id;
					recovery_object.name = attr_obj.type.name;
					
					//***************************************************************//
					
					var hex = 0xEEFF00;
					var bbox = new THREE.BoundingBoxHelper( recovery_object, hex );
					bbox.name="bbox";
					bbox.update();
					bbox.visible = false;
					recovery_object.add(bbox);
				}					
					//***************************************************************//				
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
	render();
	new_cube_save();
	init2();
	render2();
});