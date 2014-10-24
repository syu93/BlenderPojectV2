<?php
	require_once('core/lib.php');
	/**********/
	init_session();
	// debug($_SESSION);
	
?>
<html>
	<head>
		<title>My first Three.js app Blender Project</title>
		<script src="js/libs/jquery-1.11.0.min.js"></script>
		<script src="js/libs/three.min.js"></script>
		
		<script src="js/API/OrbitControls.js"></script>
		<script src="js/API/TransformControls.js"></script>

		<script src="js/axis.js"></script>
		<script src="js/ajax.js"></script>

		<script src="js/init.js"></script>
		<script src="js/lib.js"></script>
		<script src="js/gui.js"></script>
		
		<link rel="stylesheet" href="css/init.css">
		<link rel="stylesheet" href="css/menu.css">
	</head>
	
	<body style="color:#fff; background:#171717;">
		<div id="canvas" style="position: absolute; margin-top:35px;">
			<div id="direction" style="position:absolute; bottom:0px;">
			</div>
		</div>

		<div class="container_control_panel">
			<div id="control_panel" class="control_panel">
				<div class="active_info">
					<table class="active_info_table">
						<tbody>
							<tr>
								<td class="row_title">uuid</td>
								<td id="obect_id">...</td>
							</tr>
							<td class="row_title">uuid</td>
								<td id="obect_uuid">...</td>
							</tr>
							<tr>
								<td class="row_title">type</td>
								<td id="obect_type">...</td>
							</tr>
							<tr>
								<td class="row_title">group</td>
								<td id="obect_gp">...</td>
							</tr>
							<tr>
								<td class="row_title">position</td>
								<td id="obect_pos">...</td>
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

		<div class='menu_bar'>
			<ul class="level1">
				<li tabindex="0"><span>add</span>
					<ul class="level2">
						<li id="n_cube"><span>Cube</span></li>
						<li id="n_sphere"><span>Sphere</span></li>
						<li id="n_circle"><span>Circle</span></li>
						<li id="n_triangle"><span>Triangle</span></li>
						<li id="n_cilinder"><span>Cylinder</span></li>
						<li class="last-child"></li>
					</ul>
				</li>
				<li tabindex="0"><span>clone</span>
					<ul class="level2">
						<li id="n_clone"><span>object</span></li>
						<li id="n_cloneGp"><span>Group</span></li>
						<li class="last-child"></li>
					</ul>
				</li>
				<li tabindex="0" id="save"><span>save</span></li>				
				<li tabindex="0" id="delete"><span>delete</span></li>
				<li tabindex="0" id="start"><span>start</span></li>
			</ul>
			<span id='auto_save_msg' class="auto_save visible_hiden">auto save</span>
		</div>

		<span style='position: absolute; bottom:0;' id="s_tools" data=""></span>
		<span style='position: absolute; bottom:0;left:35px;' id="s_tools2" data=""></span>
		<span id="scale" data=""></span>

	</body>
</html>