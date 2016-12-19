<?php

require 'Database.php';
require 'Conveyor.php';

// $_POST['startTime'] = '15/12/2016 06:00:00';
// $_POST['endTime'] = '14/12/2016 06:00:00';
// $_POST['localisations'] = array('LIA_SFER'); //bo_mnemo

        // $_POST['localisations'] = array('API_LIA5'); //bo_loc_id
        // $_POST['startTime'] = '23/11/2016 06:00:00';
        // $_POST['endTime'] = '23/11/2016 14:00:00';


$localDB = new Database('mysql:host=localhost;dbname=fer_db;charset=utf8', 'root', '');
$sapiaDB = new Database('oci:dbname=ta.fer.sapia.inetpsa.com:1521/ssc01', 'SSC_BO', 'SSCBO099');

$result = array(
    'success' => false,
    'msg' => '',
    'data' => []
);


if (!isset($_POST['localisations']) || !isset($_POST['startTime']) || !isset($_POST['endTime'])) {
    $result['msg'] = "Error: getConveyors not all post vars available!";
    echo json_encode($result);
    return;
}


$localisations = "('" . implode("', '", $_POST['localisations']) . "')";
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];


$dbData = $localDB->selectQuery("SELECT bo_mnemo FROM dopravnik WHERE bo_loc_id IN " . $localisations . ";");
$conveyors = array();

$params = array(
        'startTime' => $startTime,
        'endTime' => $endTime,
        'mnemo' => ''
);


foreach ($dbData as $data) {
    $tmpCovneyors = explode(';', $data['bo_mnemo']);

    foreach ($tmpCovneyors as $conveyor) {
        $params['mnemo'] = $conveyor;
        $conveyors[] = new Conveyor($params, $sapiaDB);    
    }
}


$result['success'] = true;
foreach ($conveyors as $conveyor) {
    $result['data'][] = array(
            'ilotName' => $conveyor->getName(),
            'chartData' => $conveyor->createConveyor()
        );
}

echo json_encode($result);