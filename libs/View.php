<?php

class View
{
    function __construct()
    {

    }


    public function render($name, $noInclude = false)
    {
        if ($noInclude == true) {
            require 'views/' . $name;
        } else {
            require 'views/header.html';
            require 'views/' . $name;
            require 'views/footer.html';
        }
    }
}