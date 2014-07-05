<?php
	require_once('lib.php');
	
	if(isset($_POST['scene']))
	{
		$obj = json_decode($_POST['scene']);
		
		session_start();
		foreach($obj as $object):
			array_push($_SESSION['scene'], $object);
		endforeach;
		
		var_dump($obj);
		return;
	}
	
	
?>