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
	</head>
	
	<body style="color:#fff; background:#171717;">
	plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop plop 
<!-- 		<div id="canvas" style="position: absolute; margin-top:35px;">
			<div id="direction" style="position:absolute; bottom:0px;">
			</div>
		</div> -->

		<div class="container_control_panel">
			<div id="control_panel" class="control_panel">

			</div>
			<div class="control_info">
				<span>info :</span>
				<br>
				<span>info :</span>
			</div>
		</div>

		<div class='menu_bar'>
<!-- 			<input id="n_cube" type="button" value="New Cube">
			<input id="n_sphere" type="button" value="New Sphere">
			<input id="n_circle" type="button" value="New Circle">
			<input id="n_triangle" type="button" value="New Triangle">
			<input id="n_cilinder" type="button" value="New Cylinder">
			<input id="n_clone" type="button" value="Clone">
			<input id="n_cloneGp" type="button" value="Clone Group">
			<input id="t_clear" type="button" value="Clear Scene">
			<input id="save" type="button" value="Save">
			<input id="delete" type="button" value="Delete"> -->
		</div>

		<span style='position: absolute; bottom:0;' id="s_tools" data=""></span>
		<span style='position: absolute; bottom:0;left:35px;' id="s_tools2" data=""></span>
		<span id="scale" data=""></span>

	</body>
</html>