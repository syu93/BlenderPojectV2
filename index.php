<?php

?>
<html>
	<head>
		<title>My first Three.js app Blender Project</title>
		<script src="js/jquery-1.11.0.min.js"></script>
		<script src="js/three.min.js"></script>
		<script src="js/init.js"></script>

		<script src="js/OrbitControls.js"></script>
		<script src="js/TrackballControls.js"></script>
		<script src="js/axis.js"></script>
		<script src="js/ajax.js"></script>
	</head>
	
	<body style="background:#3D3D3D;">
		<input id="n_cube" type="button" value="New Cube">
		<input id="n_sphere" type="button" value="New Sphere">
		<input id="t_clear" type="button" value="Clear Scene">
		<input id="t_zoom" type="button" value="+">	
		<input id="t_dezoom" type="button" value="-">
		
		<span id="s_tools" data=""></span>
		<span id="scale" data=""></span>
	</body>
</html>