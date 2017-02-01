<?php

require 'Database.php';
require 'Pareto.php';


$result = array('success' => false, 'msg' => '', 'data' => []);

if (!isset($_POST['localisations']) || !isset($_POST['startTime']) ||
    !isset($_POST['endTime']) || !isset($_POST['characterized'])) {
    $result['msg'] = "Error: getHistogram not all post vars available!";
    echo json_encode($result);
    return;
}

$localisations = $_POST['localisations'];
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];
$characterized = filter_var($_POST['characterized'], FILTER_VALIDATE_BOOLEAN);

$sapiaDB = new Database('oci:dbname=ta.fer.sapia.inetpsa.com:1521/ssc01', 'SSC_BO', 'SSCBO099');
$connection = $sapiaDB->connect();

$cntQry = Pareto::getQuery('cnt', $characterized);
$timeQry = Pareto::getQuery('time', $characterized);


foreach ($localisations as $localisation) {
    $cntData = array();
    $timeData = array();
    $queryParams = array($localisation, $startTime, $endTime,);

    $stmt = $connection->prepare($cntQry);
    if ($stmt->execute($queryParams)) {
        while ($row = $stmt->fetch(PDO::FETCH_NUM)) {
            $cntData[] = array($row[0], trim(preg_replace('/\s\s+/', ' ', str_replace("\n", " ", $row[1]))));
        }
    }

    $stmt = $connection->prepare($timeQry);
    if ($stmt->execute($queryParams)) {
        while ($row = $stmt->fetch(PDO::FETCH_NUM)) {
            $timeData[] = array($row[0], trim(preg_replace('/\s\s+/', ' ', str_replace("\n", " ", $row[1]))));
        }
    }

    $result['data'][] = array(
        'ilotName' => $localisation,
        'chartData' => array(
            'cntPareto' => $cntData,
            'timePareto' => $timeData
        )
    );

    $result['success'] = true;
}

echo json_encode($result);
