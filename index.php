<?php
	require_once('core/lib.php');
	/**********/
	init_session();
	// debug($_SESSION);
	
?>
<html>
	<head>
		<title>My first Three.js app Blender Project</title>
		<script src="js/jquery-1.11.0.min.js"></script>
		<script src="js/three.min.js"></script>
		
		<script src="js/OrbitControls.js"></script>
		<script src="js/TrackballControls.js"></script>
		<script src="js/axis.js"></script>
		<script src="js/ajax.js"></script>

		<script src="js/init.js"></script>
		<script src="js/lib.js"></script>
		<script src="js/gui.js"></script>
	</head>
	
	<body style="background:#3D3D3D;">
		<div>
			<input id="n_cube" type="button" value="New Cube">
			<input id="n_sphere" type="button" value="New Sphere">
			<input id="t_clear" type="button" value="Clear Scene">
			<input id="t_zoom" type="button" value="+">	
			<input id="t_dezoom" type="button" value="-">
			<input id="save" type="button" value="Save">
		</div>
		<div>
			<input id="enable_axis" type="button" value="Enisable Axis">
			<input id="disable_axis" type="button" value="Disable Axis">
		</div>
		<div>
			<input id="enable_grid" type="button" value="Enisable Grid">
			<input id="disable_grid" type="button" value="Disable Grid">
		</div>
		<div>
			<input id="side_menu_on" type="button" value="Open side panel">
			<input id="side_menu_off" type="button" value="Close side panel">
		</div>
		<span id="s_tools" data=""></span>
		<span id="scale" data=""></span>
	</body>
</html>