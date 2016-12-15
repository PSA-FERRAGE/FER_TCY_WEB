<?php

class Database
{
    private $_connection;
    private $_dsn;
    private $_user;
    private $_pwd;


    function __construct($dsn, $user, $pwd)
    {
        $this->_dsn = $dsn;
        $this->_user = $user;
        $this->_pwd = $pwd;
    }


    function __destruct()
    {
        if (isset($this->_connection)) {
            $this->_connection = null;
        }
    }


    public function connect()
    {
        try {
            if (!isset($this->_connection)) {
                $this->_connection = new PDO($this->_dsn, $this->_user, $this->_pwd);
                $this->_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->_connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            }
        } catch (PDOException $e) {
            die("Pripojenie na databázu zlyhalo na chybe: " . $e->getMessage());
        }

        return $this->_connection;
    }


    public function selectQuery($sqlQuery = false)
    {
        $connection = $this->connect();

        $stmt = $connection->prepare($sqlQuery);
        $stmt->execute();
        $result = $stmt->fetchAll();

        return $result;
    }
}
