<?php
	require_once('core/lib.php');
	/**********/
	init_session();
	// debug($_SESSION);
	
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>My first Three.js app Blender Project</title>
		<meta name="description" content="">
		<script src="js/libs/jquery-1.11.0.min.js"></script>
		<script src="js/libs/jquery-ui.min.js"></script>
		<script src="js/libs/three.min.js"></script>
		
		<script src="js/API/OrbitControls.js"></script>
		<script src="js/API/TransformControls.js"></script>

		<script src="js/axis.js"></script>
		<script src="js/ajax.js"></script>

		<script src="js/init.js"></script>
		<script src="js/lib.js"></script>
		<script src="js/gui.js"></script>
		<script src="js/controlPanel.js"></script>
		<script src="js/toolsPanel.js"></script>
		<script src="js/prompt.js"></script>
		<script src="js/drag.js"></script>
		
		<link rel="stylesheet" href="css/init.css">
		<link rel="stylesheet" href="css/menu.css">
		<link rel="stylesheet" href="css/control_panel.css">
		<link rel="stylesheet" href="css/tool_panel.css">

		<!-- Font-icone -->
		<link href="css/tool-panel-icone/css/tool-panel-icone.css" rel="stylesheet">
		<link href="css/tool-panel-icone/css/animation.css" rel="stylesheet">
	</head>
	
	<body style="color:#fff; background:#171717;">
	<!--|| MENU_BAR ||-->
		<div class='menu_bar'>
			<ul class="level1">
				<li tabindex="0" id=""><span>file</span>
					<ul class="level2">
						<li tabindex="0" id="n_new"><span>new</span></li>
						<li tabindex="0" id=""><span>open project</span></li>
						<li tabindex="0" id="save"><span>save</span></li>
						<li tabindex="0" id="t_clear"><span>clear scence</span></li>
						<li class="last-child"></li>
					</ul>
				</li>
				<li tabindex="0"><span>add</span>
					<ul class="level2">
						<li id="n_cube"><span>cube</span></li>
						<li id="n_sphere"><span>sphere</span></li>
						<li id="n_circle"><span>circle</span></li>
						<li id="n_triangle"><span>triangle</span></li>
						<li id="n_cilinder"><span>cylinder</span></li>
						<li class="last-child"></li>
					</ul>
				</li>
				<li tabindex="0"><span>object</span>
					<ul class="level2">
						<li id="n_clone"><span>clone object</span></li>
						<li id="n_cloneGp"><span>clone group</span></li>
						<li class="last-child"></li>
					</ul>
				</li>
				<li tabindex="0"><span>view</span>
					<ul class="level2">
						<li id="d_grid"><span>display grid</span></li>
						<li class="last-child"></li>
					</ul>
				</li>
				<li tabindex="0" id="delete"><span>delete</span></li>
			</ul>
		</div>
	<!--|| MENU_BAR ||-->

	<!--|| CANVAS_AREA ||-->
		<div id="canvas">
			<span id='auto_save_msg' class="auto_save visible_hiden">saving the scene...</span>
			<div id="direction" style="position:absolute; bottom:0px;">
			</div>
		</div>
	<!--|| CANVAS_AREA ||-->

	<!--|| TOOL_BAR ||-->
	<div class="aside-tool-bar">
		<aside id="dragme" draggable="true">
			<div class="container_tool_panel">
				<div id="tool_panel" class="tool_panel">
					<div id="dropable">-</div>
					<hr>
					<ul class="tool">
						<li id="t_camera" class="icone"><i class="icon-eye"></i></li>
						<li id="t_move" class="icone"><i class="icon-move-1"></i></li>
						<li id="t_scale" class="icone"><i class="icon-resize-full"></i></li>
						<li id="t_rotate" class="icone"><i class="icon-arrows-cw"></i></li>
					</ul>
				</div>
			</div>
		</aside>
	</div>
	<!--|| TOOL_BAR ||-->

	<!--|| CONTROL_PANEL ||-->
		<div class="container_control_panel">
			<div id="control_panel" class="control_panel">
				<div class="poject_name">
					<input class="text_feild" id="poject_name" value="my project" type="text" name="pj_name" placeholder="Project name">
				</div>
				<div class="active_info">
					<table class="active_info_table">
						<tbody id="objects_list">

						</tody>
					</table>
				</div>
				<div class="active_info">
					<table class="active_info_table">
						<tbody>
							<tr>
								<td class="row_title">id</td>
								<td id="object_id">...</td>
							</tr>
							<td class="row_title">uuid</td>
								<td id="object_uuid">...</td>
							</tr>
							<tr>
								<td class="row_title">type</td>
								<td id="object_type">...</td>
							</tr>
							<tr>
								<td class="row_title">group</td>
								<td id="object_gp">...</td>
							</tr>
							<tr>
								<td class="row_title">position</td>
								<td id="">
									<span>X=</span><span id="object_pos_x"></span><br>
									<span>Y=</span><span id="object_pos_y"></span><br>
									<span>Z=</span><span id="object_pos_z"></span>
								</td>
							</tr>
							<tr>
								<td class="row_title">rotation</td>
								<td id="">
									<span>X=</span><span id="object_rot_x"></span><br>
									<span>Y=</span><span id="object_rot_y"></span><br>
									<span>Z=</span><span id="object_rot_z"></span>
								</td>
							</tr>
							<tr>
								<td class="row_title">scale</td>
								<td id="">
									<span>X=</span><span id="object_scl_x"></span><br>
									<span>Y=</span><span id="object_scl_y"></span><br>
									<span>Z=</span><span id="object_scl_z"></span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="control_info">
				<span>info :</span>
				<br>
				<span>info :</span>
			</div>
		</div>
	<!--|| CONTROL_PANEL ||-->

		<span style='position: absolute; bottom:0;' id="s_tools" data=""></span>
		<span style='position: absolute; bottom:0;left:35px;' id="s_tools2" data=""></span>
		<span id="scale" data=""></span>

	</body>
</html>