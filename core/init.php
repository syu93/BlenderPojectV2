<?php
	require_once('lib.php');
	
	if(isset($_POST['object']))
	{
			session_start();
			array_push($_SESSION['object'], $_POST['object']);
			
		var_dump($_POST['object']);
		return;
	}
	
	
?>