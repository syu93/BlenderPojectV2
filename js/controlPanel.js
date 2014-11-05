$(document).ready(function(){

	$('#objects_list').click(function(event){
	    var clicked_obj;
	    var selected_id = $(event.target).text();
	    if(!isNaN(parseInt(selected_id))) {		    
	    	clicked_obj = window.scene.getObjectById(parseInt(selected_id));

		   	if(typeof(clicked_obj)!=="undefined") {
				if(typeof(clicked_obj.userData.group) === 'undefined'){
					library.proto.selection(clicked_obj, true);
				}
				else{
					library.proto.selection(clicked_obj, false);
				}
			}
			else if(typeof(clicked_obj)==="undefined"){
				for(key in groups){
					clicked_obj = groups[key].getObjectById(parseInt(selected_id));
					if(typeof(clicked_obj)!=="undefined"){
						library.proto.selection(clicked_obj, false);
						return;
					}
				}
			}
		}
	});

	$('#objects_list').click(function(event){
	    var selected_id = parseInt($(event.target).attr("id"));
	    if( !isNaN(selected_id) ) {
	    	display_ojects(selected_id);
		}
		else{
			for(key in groups){
				if(typeof(clicked_obj)!=="undefined"){
					clicked_obj = groups[key].getObjectById(parseInt(selected_id));
					library.proto.selection(clicked_obj, true);
					display_ojects(selected_id);
					return;
				}
			}
		}
	});
});

// IN_APP_GUI
function display_ojects(id){
	if( typeof(window.scene.getObjectById(id)) !== "undefined"){
		var obj_toggle = window.scene.getObjectById(id);

		if(obj_toggle.visible === true){
			obj_toggle.visible=false
			obj_toggle.scale.x=obj_toggle.scale.x/100000;
			obj_toggle.scale.y=obj_toggle.scale.y/100000;
			obj_toggle.scale.z=obj_toggle.scale.z/100000;
			window.delete_obj=true;
			if(typeof(obj_toggle.userData.group) === 'undefined'){
				unselected_object(obj_toggle, controls_object, true);
			}
			else{
				unselected_object(obj_toggle, controls_object, false);
			}
			// $('#obj_'+obj_toggle.id).removeClass("list_object_seleted");
			window.delete_obj=false;
		}
		else{
			obj_toggle.visible=true;
			obj_toggle.scale.x=obj_toggle.scale.x*100000;
			obj_toggle.scale.y=obj_toggle.scale.y*100000;
			obj_toggle.scale.z=obj_toggle.scale.z*100000;
			if(typeof(obj_toggle.userData.group) === 'undefined'){
				library.proto.selection(obj_toggle, true);
			}
			else{
				library.proto.selection(obj_toggle, false);
			}
		}
	}
	else{
		for(key in groups){
			if(typeof(window.groups[key].getObjectById(id) ) !=="undefined"){
				var obj_toggle = window.groups[key].getObjectById(id);

				if(obj_toggle.visible === true){
					obj_toggle.visible=false
					obj_toggle.scale.x=obj_toggle.scale.x/100000;
					obj_toggle.scale.y=obj_toggle.scale.y/100000;
					obj_toggle.scale.z=obj_toggle.scale.z/100000;
					window.delete_obj=true;
					unselected_object(obj_toggle, controls_object, false);
					$('#obj_'+obj_toggle.id).removeClass("list_object_seleted");
					window.delete_obj=false;
				}
				else{
					obj_toggle.visible=true;
					obj_toggle.scale.x=obj_toggle.scale.x*100000;
					obj_toggle.scale.y=obj_toggle.scale.y*100000;
					obj_toggle.scale.z=obj_toggle.scale.z*100000;
					library.proto.selection(obj_toggle, false);
				}

				return;
			}
		}
	}
}

function objects_list_info(objects){
	if( objects_list != objects.length || groups_list != groups.length ){
		var checked_obj = "";
		var checked_grp = "";
		$("#objects_list").html("");
		for(key in objects){
			if(objects[key].visible === true){checked_obj="checked";}
			
			$("#objects_list").append("<tr><td class='row_title'>"+objects[key].name+"</td><td id='obj_"+objects[key].id+"' class='row_title select_obj'>"+objects[key].id+"</td><td><input id='"+objects[key].id+"' class='visible_obj' type='checkbox' name='visible' "+checked_obj+"></td></tr>");
			// ctr_panel_active();
		}
		for(key in groups){
			if(groups[key].visible === true){checked_grp="checked";}

			$("#objects_list").append("<tr><td class='row_title_grp'>"+groups[key].name+"</td><td id='obj_"+groups[key].id+"' class='row_title select_obj'>"+groups[key].id+"</td><td><input id='"+groups[key].id+"' class='visible_obj' type='checkbox' name='visible' "+checked_grp+"></td></tr>");
			// ctr_panel_active();
		}

		objects_list = objects.length;
		groups_list = groups.length;
	}
}

function ctr_panel_active(SELECTED){
	// var selected_id = window.SELECTED.id;
	if(SELECTED){
		var selected_id = SELECTED.id;
		if(typeof(INTERSECTED) !== 'undefined'){
			var old_selected_id = window.INTERSECTED.id;
			$('#obj_'+old_selected_id).removeClass("list_object_seleted");
		}
		$('#obj_'+selected_id).addClass("list_object_seleted");
	}
}

function selected_info(SELECTED){
	if(SELECTED){
		document.getElementById("object_id").innerHTML=(SELECTED.id);
		document.getElementById("object_uuid").innerHTML=(SELECTED.uuid);
		document.getElementById("object_type").innerHTML=(SELECTED.name);
		document.getElementById("object_gp").innerHTML=(SELECTED.userData.group);
		var z_x = SELECTED.position.x;
		var z_y = SELECTED.position.y;
		var z_z = SELECTED.position.z;
		document.getElementById("object_pos_x").innerHTML=(z_x);
		document.getElementById("object_pos_y").innerHTML=(z_y);
		document.getElementById("object_pos_z").innerHTML=(z_z);
		var r_x = SELECTED.rotation.x;
		var r_y = SELECTED.rotation.y;
		var r_z = SELECTED.rotation.z;
		document.getElementById("object_rot_x").innerHTML=(r_x);
		document.getElementById("object_rot_y").innerHTML=(r_y);
		document.getElementById("object_rot_z").innerHTML=(r_z);
		var s_x = SELECTED.scale.x;
		var s_y = SELECTED.scale.y;
		var s_z = SELECTED.scale.z;
		document.getElementById("object_scl_x").innerHTML=(s_x);
		document.getElementById("object_scl_y").innerHTML=(s_y);
		document.getElementById("object_scl_z").innerHTML=(s_z);
	}
	else{
		document.getElementById("object_id").innerHTML=("");	
		document.getElementById("object_uuid").innerHTML=("");
		document.getElementById("object_type").innerHTML=("");
		document.getElementById("object_gp").innerHTML=("");
		document.getElementById("object_pos_x").innerHTML=("");
		document.getElementById("object_pos_y").innerHTML=("");
		document.getElementById("object_pos_z").innerHTML=("");

		document.getElementById("object_rot_x").innerHTML=("");
		document.getElementById("object_rot_y").innerHTML=("");
		document.getElementById("object_rot_z").innerHTML=("");
		
		document.getElementById("object_scl_x").innerHTML=("");
		document.getElementById("object_scl_y").innerHTML=("");
		document.getElementById("object_scl_z").innerHTML=("");

	}
}