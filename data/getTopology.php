<?php

require 'Database.php';

$localDB = new Database('mysql:host=localhost;dbname=fer_db;charset=utf8', 'root', '');
$result = array();

if (isset($_POST['viewType'])) {
    switch ($_POST['viewType']) {
        case 'tcy':
            $query = "SELECT CONVERT(lokalizacia_id, char) AS id, parent_id AS parent, nazov AS text FROM lokalizacia;";
            $result = $localDB->selectQuery($query);
            break;
        case 'cnv':
            $query = "SELECT CONVERT(dopravnik_id, char) AS id, parent_idr AS parent, nazov AS text FROM dopravnik;";
            $result = $localDB->selectQuery($query);
            break;
        case 'par':
            $query = "SELECT CONVERT(pareto_id, char) AS id, parent_id AS parent, nazov AS text FROM pareto;";
            $result = $localDB->selectQuery($query);
            break;
        default:
            break;
    }
}

$localDB = null;

echo json_encode($result);