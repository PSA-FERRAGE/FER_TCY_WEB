<?php

require "config/config.php";

spl_autoload_register(
    function ($trieda) 
    {
        require "libs/".$trieda.".php";
    }
);


$session = new Session();
$session->init();

$app = new Boot();