<?php

require 'Database.php';

// $result = array('success' => false);
$localDB = new Database('mysql:host=localhost;dbname=fer_db;charset=utf8', 'root', '');

if (isset($_GET['type'])) {
    switch ($_GET['type']) {
        case 'tcy':
            $query = "SELECT lokalizacia_id AS id, parent_id, nazov, bo_id FROM lokalizacia;";
            echo json_encode($localDB->selectQuery($query));
            return;
        case 'cnv':
            $query = "SELECT dopravnik_id AS id, parent_id, nazov, bo_loc_id AS bo_id FROM dopravnik;";
            echo json_encode($localDB->selectQuery($query));
            return;
        case 'par':
            $query = "SELECT pareto_id AS id, parent_id, nazov, bo_loc_id AS bo_id FROM pareto;";
            echo json_encode($localDB->selectQuery($query));
            return;
        default:
            return;
    }
}