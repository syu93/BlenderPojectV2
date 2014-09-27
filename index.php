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
		<!--<script src="js/TrackballControls.js"></script>-->
		<script src="js/axis.js"></script>
		<script src="js/ajax.js"></script>

		<script src="js/init.js"></script>
		<script src="js/lib.js"></script>
		<script src="js/gui.js"></script>
		
		<link rel="stylesheet" href="css/init.css">
	</head>
	
	<body style="background:#3D3D3D;">
	<div id="canvas" style="position: absolute; margin-top:35px;"><div id="direction" style="position:absolute; bottom:0px;"></div></div>
		<div style="display:block; position:absolute; top:0px;">
			<input id="n_cube" type="button" value="New Cube">
			<input id="n_sphere" type="button" value="New Sphere">
			<input id="n_circle" type="button" value="New Circle">
			<input id="n_cilinder" type="button" value="New Cylinder">
			<input id="n_clone" type="button" value="Clone">
			<input id="n_cloneGp" type="button" value="Clone Group">
			<input id="t_clear" type="button" value="Clear Scene">
			<input id="t_zoom" type="button" value="+">	
			<input id="t_dezoom" type="button" value="-">
			<input id="save" type="button" value="Save">
			<input id="delete" type="button" value="Delete">
		</div>
		<div style="display:none;">
			<input id="enable_axis" type="button" value="Enisable Axis">
			<input id="disable_axis" type="button" value="Disable Axis">
		</div>
		<div style="display:none;">
			<input id="enable_grid" type="button" value="Enisable Grid">
			<input id="disable_grid" type="button" value="Disable Grid">
		</div>
		<div style="display:none;">
			<input id="side_menu_on" type="button" value="Open side panel">
			<input id="side_menu_off" type="button" value="Close side panel">
		</div>
		<span style='position: absolute; bottom:0;' id="s_tools" data=""></span>
		<span style='position: absolute; bottom:0;left:35px;' id="s_tools2" data=""></span>
		<span id="scale" data=""></span>
	</body>
</html>