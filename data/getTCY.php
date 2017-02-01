<?php

require 'Database.php';
require 'TCY.php';

// $_POST['localisations'] = array('API_YR11ILOT1', 'API_YR06ILOT1', 'API_YR08ILOT1');
// $_POST['startTime'] = '01/02/2017 06:00:00';
// $_POST['endTime'] = '02/02/2017 06:00:00';
$result = array('success' => false, 'msg' => '', 'data' => []);

if (!isset($_POST['localisations']) || !isset($_POST['startTime']) || !isset($_POST['endTime'])) {
    $result['msg'] = "Error: getHistogram not all post vars available!";
    echo json_encode($result);
    return;
}

$localisations = "('" . implode("', '", $_POST['localisations']) . "')";
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];

$sapiaDB = new Database('oci:dbname=ta.fer.sapia.inetpsa.com:1521/ssc01', 'SSC_BO', 'SSCBO099');
$localDB = new Database('mysql:host=localhost;dbname=fer_db;charset=utf8', 'root', '');


$dbData = $localDB->selectQuery(
    "SELECT lokalizacia_id, bo_id, nazov, counters, bo_table " .
    "FROM countersview WHERE lokalizacia_id IN " . $localisations . ";"
);


foreach ($dbData as $data) {
    $cntrs = explode(';', $data['counters']);
    $table = $data['bo_table'];
    $clause = implode(',', array_fill(0, count($cntrs), '?'));
    $query = <<<SQL
                SELECT
                    ROUND((t.DEB_EVT - LAG(t.DEB_EVT, 1) OVER (ORDER BY t.DEB_EVT))*144000) AS tcy
                FROM
                    {$table} t
                WHERE (
                    t.DEB_EVT >= to_date(?, 'DD/MM/YYYY HH24:MI:SS') AND
                    t.DEB_EVT <= to_date(?, 'DD/MM/YYYY HH24:MI:SS') AND
                    t.ID_LOC = ? AND
                    t.ID_MNEMO  IN (${clause})
                )
                ORDER BY 1 ASC
SQL;

    $qryParams = array_merge(array($startTime, $endTime, $data['bo_id']), $cntrs);

    $connection = $sapiaDB->connect();

    $tcyVals = array();
    $stmt = $connection->prepare($query);
    if ($stmt->execute($qryParams)) {
        while ($row = $stmt->fetch()) {
            $tcyVals[] = intval($row['TCY']);
        }
    }

    if (count($tcyVals) < 1) {
        $tcyValsFiltered = array('0' => 0);
    } else {
        $tcyValsFiltered = TCY::removeOutliers($tcyVals);
    }

    $result['success'] = true;
    $result['data'][] = array(
        'ilotName' => $data['nazov'],
        'chartData' => $tcyValsFiltered
    );
}

$sapiaDB = null;
$localDB = null;

echo json_encode($result);