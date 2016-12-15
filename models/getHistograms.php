<?php

require 'Database.php';
require 'Histogram.php';


$localDB = new Database('mysql:host=localhost;dbname=fer_db;charset=utf8', 'root', '');
$sapiaDB = new Database('oci:dbname=ta.fer.sapia.inetpsa.com:1521/ssc01', 'SSC_BO', 'SSCBO099');

$result = array('success' => false, 'msg' => '', 'data' => []);

        // $_POST['localisations'] = array('API_YL01ILOT1', 'API_YL03ILOT1', 'API_YL06ILOT1', 'API_YL08ILOT1');
        // $_POST['startTime'] = '23/11/2016 06:00:00';
        // $_POST['endTime'] = '23/11/2016 14:00:00';

if (!isset($_POST['localisations']) || !isset($_POST['startTime']) || !isset($_POST['endTime'])) {
    $result['msg'] = "Error: getHistogram not all post vars available!";
    echo json_encode($result);
    return;
}

$localisations = "('" . implode("', '", $_POST['localisations']) . "')";
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];


$dbData = $localDB->selectQuery(
    "SELECT bo_id, nazov, counters, bo_table " .
    "FROM countersview WHERE bo_id IN " . $localisations . ";"
);

$histograms = array();

foreach ($dbData as $data) {
    $params = array(
            'loc' => $data['bo_id'],
            'name' => $data['nazov'],
            'cntrs' => explode(';', $data['counters']),
            'table' => $data['bo_table']
    );

    $histograms[] = new Histogram($params, $sapiaDB);
}


$result['success'] = true;
foreach ($histograms as $histogram) {
    $result['data'][] = array(
            'ilotName' => $histogram->getName(),
            'histData' => $histogram->createHistogram($startTime, $endTime)
    );
}

echo json_encode($result);