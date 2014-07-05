var cookie;
function send_scene(scene){
	alert(scene);
	var send={};
	var seen = [];
	send.scene = 	JSON.stringify(scene, function(key, val) {
	   if (val != null && typeof val == "object") {
			if (seen.indexOf(val) >= 0)
				return
			seen.push(val)
		}
    return val
	});
	// alert(send.scene);
	// console.log(send.scene);
	
	$.ajax({
		type: "POST",
		url: "core/init.php",
		data: send,
		success: function(data){
			alert(data);
		},
		dataType: "text"
	});
}

$( document ).ready(function(){
});