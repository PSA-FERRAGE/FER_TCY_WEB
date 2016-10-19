<?php

class Database
{
    private static $_connection;

    /**
     * @var Singleton The reference to *Singleton* instance of this class
     */
    private static $_instance;


    private function __construct()
    {
        try {
            static::$_connection = new PDO('mysql:host=localhost;dbname=fer_db;charset=utf8mb4', 'root_remote', '123456');
            static::$_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            static::$_connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch(PDOException $e) {
            die('Connection failed: ' . $e->getMessage());
        }
    }


    /**
     * @return Asociativne pole s vysledkom, alebo NULL ak nic nebolo najdene
     */
    public static function SelectSqlQuery($sqlQuery=false)
    {
        if (static::$_instance === null) {
            static::$_instance = new static();
        }
    }


    /**
     * @return TRUE ak bol insert vykonany uspesne, FALSE v opacnom pripade
     */
    public static function InsertSqlQuery($sqlQuery=false)
    {
        if (static::$_instance === null) {
            static::$_instance = new static();
        }
    }


    /**
     * @return TRUE ak bol update vykonany uspesne, FALSE v opacnom pripade
     */
    public static function UpdateSqlQuery($sqlQuery=false)
    {
        if (static::$_instance === null) {
            static::$_instance = new static();
        }
    }


    /**
     * Private clone method to prevent cloning of the instance of the
     * *Singleton* instance.
     *
     * @return void
     */
    private function __clone()
    {
    }

    /**
     * Private unserialize method to prevent unserializing of the *Singleton*
     * instance.
     *
     * @return void
     */
    private function __wakeup()
    {
    }
}