var cookie;
var x,y,z;
function send_scene(scene){
	// alert(scene);
	var send={};
	var seen = [];
	// send.scene = 	JSON.stringify(scene, function(key, val) {
	   // if (val != null && typeof val == "object") {
			// if (seen.indexOf(val) >= 0)
				// return
			// seen.push(val)
		// }
    // return val
	// });
	// alert(send.scene);
		
		for(key in scene) {
			console.log(scene[key]);
			x=scene[key].position.x; console.log("X : "+scene[key].position.x);
			y=scene[key].position.y; console.log("Y : "+scene[key].position.y);
			z=scene[key].position.z; console.log("Z : "+scene[key].position.z);
			new_cube_save(x,y,z); //Transform this function in recovery function and check the type of object with the name attr

			if(window.sessionStorage){
				var obj_table = {};
				obj_table.position={x:scene[key].position.x,y:scene[key].position.y, z:scene[key].position.z};				
				obj = JSON.stringify(obj_table);
				
				console.log(obj_table);
				window.sessionStorage.setItem( key, obj );
			}
		}
			
	// else{
		// for(key in scene) {
			// window.sessionStorage.setItem(key, JSON.stringify(scene[key]));
		// }
	// }
	
	// console.log(send.scene);
	
	
	// $.ajax({
		// type: "POST",
		// url: "core/init.php",
		// data: send,
		// success: function(data){
			// alert(data);
		// },
		// dataType: "text"
	// });
}

// function new_cube(x,y,z){
	// var geometry = new THREE.BoxGeometry(64,64,64);
	// var material = new THREE.MeshBasicMaterial({color:0x666666});		
	// var cube = new THREE.Mesh(geometry, material);
	// cube.name="cube";
	// ***************************************************************//
	// ***************************************************************//
	// var pointLight = new THREE.PointLight(0xFFFFFF);
	// pointLight.position.x = 10;
	// pointLight.position.y = 50;
	// pointLight.position.z = 130;
	// ***************************************************************//
	// cube.position.x=x;
	// cube.position.y=y;
	// cube.position.z=z;
	// ***************************************************************//
	// scene.add(pointLight);
	// scene.add(cube);
		// objects.push( cube );
		// send_scene(objects);
	// render();
// }

$( document ).ready(function(){
});