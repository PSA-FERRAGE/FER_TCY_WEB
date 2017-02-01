<?php

require 'Database.php';

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


$sapiaDB = new Database('oci:dbname=ta.fer.sapia.inetpsa.com:1521/ssc01', 'SSC_BO', 'SSCBO099');
$localDB = new Database('mysql:host=localhost;dbname=fer_db;charset=utf8', 'root', '');

$localisations = "('" . implode("', '", $_POST['localisations']) . "')";
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];

$conveyors = array();
$dbData = $localDB->selectQuery("SELECT bo_mnemo FROM dopravnik WHERE dopravnik_id IN " . $localisations . ";");

foreach ($dbData as $data) {
    $tmpCovneyors = explode(';', $data['bo_mnemo']);

    foreach ($tmpCovneyors as $conveyor) {
        $conveyors[] = array(
            'bo_mnemo' => $conveyor,
            'startTime' => $startTime,
            'endTime' => $endTime
        );    
    }
}

foreach ($conveyors as $conveyor) {
    $data = array();
    $query = <<<SQL
                    SELECT
                        to_char(tab.DEB_EVT, 'DD/MM/YYYY HH24:MI:SS') AS cas,
                        tab.VAL_CPT as val
                    FROM
                        SSC99_M1.SSCQT09 tab
                    WHERE ( 
                        tab.DEB_EVT  >=  to_date(?,'DD/MM/YYYY HH24:MI:SS')
                        AND  tab.DEB_EVT  <=  to_date(?,'DD/MM/YYYY HH24:MI:SS')
                        AND tab.ID_MNEMO  = ?
                    )
SQL;

    $connection = $sapiaDB->connect();
    $qryParams = array($startTime, $endTime, $conveyor['bo_mnemo']);

    $stmt = $connection->prepare($query);
    if ($stmt->execute($qryParams)) {
        while ($row = $stmt->fetch()) {
            $data[] = array($row['CAS'], intval($row['VAL']));
        }
    }

    $result['data'][] = array(
            'ilotName' => $conveyor['bo_mnemo'],
            'chartData' => $data
        );
}

$sapiaDB = null;
$localDB = null;

$result['success'] = true;

echo json_encode($result);