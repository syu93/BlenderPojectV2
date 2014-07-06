var cookie;
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
		}
			
		if(window.sessionStorage){
			for(idx in scene) {
			var obj = scene[idx];
			obj = JSON.stringify(obj);
			window.sessionStorage.setItem( idx, obj );
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

$( document ).ready(function(){
});