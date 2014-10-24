	var scene, camera, renderer, projector, width, height, intersects;
	var scene2, camera2, renderer2, projector2, width, height, intersects;
	var objects = [];
	var mouse = new THREE.Vector2(),
	offset = new THREE.Vector3(),
	INTERSECTED, SELECTED,rect;
	
	var object_control, selectionBox, multi_box, control_active=false, onCtrl=false, grp_ctrl=false;
	
	var onMouseDownPosition = new THREE.Vector2();
	var onMouseUpPosition = new THREE.Vector2();

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
		
		grid();

		renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });		
		renderer.setSize(width , height);
		renderer.setClearColor( 0x373737, 1);
		container = $('#canvas');
		container.append(renderer.domElement);		
		rect = container[0];
		// console.log(rect.clientHeight);
		
		/***********************************************/
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		
		object_control = library.proto.object_control(); scene.add(object_control);
		selectionBox = library.proto.box_selection(); scene.add(selectionBox);
		multi_box = library.proto.muti_selection();
		muti_move = library.proto.muti_move();

		renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
	}

	function init2(){
		width2 = window.innerWidth/12;
		height2 = window.innerHeight/12;
		scene2 = new THREE.Scene();
		camera2 = new THREE.PerspectiveCamera(50, width2 / height2, 1, 5000);

		scene2.add(camera2);
		projector2 = new THREE.Projector();			
		var axisHelper = new THREE.AxisHelper( 125 );
		scene2.add( axisHelper );
		
		renderer2 = new THREE.CanvasRenderer();
		renderer2.setSize(width2 , height2);
		renderer2.setClearColor( 0x373737, 1);
		container2 = $('#direction');
		container2.append(renderer2.domElement);
		controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);
	}
	
	function render() {
	// Make the render for the view
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		controls.update();
		object_control.update();
		
		document.getElementById("s_tools").innerHTML=window.onCtrl;
		document.getElementById("s_tools2").innerHTML=window.nb_group;


		if(SELECTED){
		document.getElementById("obect_id").innerHTML=(SELECTED.uuid);
		document.getElementById("obect_type").innerHTML=(SELECTED.name);
		}
		else{
		document.getElementById("obect_id").innerHTML=("");	
		document.getElementById("obect_type").innerHTML=("");	
		}
	}

	function render2() {
	// Make the render for the view
		requestAnimationFrame(render2);		
		camera2.position.copy(camera.position);
		renderer2.render(scene2, camera2);
		controls2.update();
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
			// console.log(intersects[ 0 ].object);
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

		controls.enabled = true;

		onMouseDownPosition.set(mouse.x, mouse.y);

	}
	function onDocumentMouseUp( event ) {
		event.preventDefault();

		var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
		projector.unprojectVector( vector, camera );
		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
		var intersects = raycaster.intersectObjects( objects )
		onMouseUpPosition.set( mouse.x, mouse.y );

		if ( intersects.length > 0 ) {
			
			library.proto.selection(intersects[ 0 ].object);
		}
		else
		{
			if(SELECTED){ //If an object is selected
				unselected_object(SELECTED, controls_object);
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

	init2();
	render2();

	library.proto.load_scene();

	window.onresize = function(event) {
		// init();
		// render();

		// init2();
		// render2();

		// library.proto.load_scene();
	};
});