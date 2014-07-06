<?php
	function debug($var) {
	$debug = debug_backtrace();
	echo '</br>';
	echo '<p><a href="#"><strong>'.$debug[0]['file'].'</strong> | ligne:'.$debug[0]['line'].'</a></p>';
	echo '<ol>';
	foreach ($debug as $key => $value) {
	if ($key > 0 && isset($value['file'])) {
	echo '<li><strong>'.$value['file'].'</strong> | ligne:'.$value['line'].'</li>';
	}
	}
	echo '</ol>';
	echo '<pre>';
	print_r($var);
	echo '</pre>';
	}
	
	function init_session()
	{
		if(empty($_SESSION))
		{
			session_start();
			
			if(empty($_SESSION['object']))
			{
				$_SESSION['object']=[];
			}
		}
	}
	
	function init_cookie($scene)
	{
		if(empty($_COOKIE['SCENE']))
		{
			setcookie("SCENE", $scene, 0 ,"/");
		}
		else
		{
			// setcookie("SCENE", $scene, 0 ,"/");
		}
	}
?>