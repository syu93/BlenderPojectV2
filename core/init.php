<?php
	session_start();
	$_SESSION['scene']=null;
	if(isset($_POST['scene']))
	{
		$_SESSION['scene'] = $_POST['scene'];
		return "plop";
	}
?>