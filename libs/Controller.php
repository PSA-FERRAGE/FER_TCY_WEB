<?php

class Controller
{
    private $_session;


    function __construct()
    {
        $this->_session = new Session();
        $this->_session->init();

        $this->view = new View();
    }


    public function loadModel($name)
    {
        $path = 'models/'.$name.'_model.php';

        if (file_exists($path)) {
            require 'models/'.$name.'_model.php';

            $modelName = $name . '_Model';
            $this->model = new $modelName();
        }
    }


    public function getNotifications()
    {
        echo json_encode(Database::SelectSqlQuery("SELECT * FROM aktualne_notifikacie"));
    }
}