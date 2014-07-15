function new_sphere(scene, objects){
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

function new_cube(scene, objects){
	var geometry = new THREE.BoxGeometry(64,64,64);
	var material = new THREE.MeshBasicMaterial({color:0x555555});		
	var cube = new THREE.Mesh(geometry, material);
	cube.name="cube";
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
		// console.log(objects);
	render();
	
}