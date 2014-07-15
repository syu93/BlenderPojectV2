function send_scene(scene) {
	var obj_table;
	window.sessionStorage = [];
	for(key in scene) {
		// x=scene[key].position.x; 
			console.log("X : "+scene[key].position.x);
		// y=scene[key].position.y; 
			console.log("Y : "+scene[key].position.y);
		// z=scene[key].position.z; 
			console.log("Z : "+scene[key].position.z);

		console.log(scene[key].id);
		console.log(scene[key].name);
		
			obj_table = {};
			obj_table={id:scene[key].id};
			obj_table.type={name:scene[key].name};
			obj_table.position={x:scene[key].position.x,y:scene[key].position.y, z:scene[key].position.z};			
			obj = JSON.stringify(obj_table);
			
			console.log(obj_table);
			window.sessionStorage[key] = obj;
	}	
}

$( document ).ready(function(){
});