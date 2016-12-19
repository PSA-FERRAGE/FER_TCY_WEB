<?php

require 'Database.php';
require 'Pareto.php';

$localDB = new Database('mysql:host=localhost;dbname=fer_db;charset=utf8', 'root', '');
$sapiaDB = new Database('oci:dbname=ta.fer.sapia.inetpsa.com:1521/ssc01', 'SSC_BO', 'SSCBO099');

$result = array('success' => false, 'msg' => '', 'data' => []);


if (!isset($_POST['localisations']) || !isset($_POST['startTime']) || !isset($_POST['endTime'])) {
    $result['msg'] = "Error: getHistogram not all post vars available!";
    echo json_encode($result);
    return;
}


$localisations = "('" . implode("', '", $_POST['localisations']) . "')";
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];


$dbData = $localDB->selectQuery(
    "SELECT nazov, equipments FROM pareto WHERE bo_loc_id IN " . $localisations . ";"
);


foreach ($dbData as $data) {
    $params = array(
            'name' => $data['nazov'],
            'equipments' => explode(';', $data['equipments'])
    );

    $pareto = new Pareto($params, $sapiaDB);
    $result['data'][] = array(
            'ilotName' => $pareto->getName(),
            'chartData' => $pareto->createPareto($startTime, $endTime)
    );

    $result['success'] = true;
}


echo json_encode($result);