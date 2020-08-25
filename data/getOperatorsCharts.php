<?php

require 'Database.php';

function computeMedian($arr)
{
    if ($arr) {
        $count = count($arr);
        sort($arr);
        $mid = floor(($count-1)/2);
        return ($arr[$mid]+$arr[$mid+1-$count%2])/2;
    }
    return 0;
}

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
$opChecked = $_POST['opChecked'] == 'true' ? true : false;

$posts = array();

if ($opChecked) {
    $dbData = $localDB->selectQuery("SELECT mnemo, ciel_tcy AS ciel, parent_name FROM operator_lokalizacia WHERE id IN " . $localisations . " AND determine_op = 1;");
} else {
    $dbData = $localDB->selectQuery("SELECT mnemo, ciel, parent_name FROM operator_lokalizacia WHERE id IN " . $localisations . ";");
}

foreach ($dbData as $data) {
    $posts[] =  [
        'bo_mnemo' => $data['mnemo'],
        'ciel' => $data['ciel'],
        'parent' => $data['parent_name']
    ];
}

foreach ($posts as $post) {
    $data = array();
    $query = <<<SQL
                    SELECT
                        to_char(DEB_EVT, 'DD/MM/YYYY HH24:MI:SS') AS cas,
                        ROUND((FIN_EVT - DEB_EVT) * 86400, 1) AS val,
                        ? AS ciel,
                        ID_MNEMO
                    FROM
                        SSC99_M1.SSCQT03
                    WHERE
                        (DEB_EVT >= TO_DATE(?, 'DD/MM/YYYY HH24:MI:SS') AND DEB_EVT <= TO_DATE(?, 'DD/MM/YYYY HH24:MI:SS')) AND
                        ID_MNEMO = ?
                    ORDER BY 1 ASC
SQL;

    $connection = $sapiaDB->connect();
    $qryParams = array($post['ciel'], $startTime, $endTime, $post['bo_mnemo']);

    $opArr = [];
    $medArr = [];
    $median = 0.0;
    $stmt = $connection->prepare($query);
    if ($stmt->execute($qryParams)) {
        while ($row = $stmt->fetch()) {
            if ($opChecked) {
                $opArr[] = [$row['CAS'], floatval($row['VAL']), floatval($row['CIEL'])];
            } else {
                $data[] = array($row['CAS'], floatval($row['VAL']), floatval($row['CIEL']));
                $medArr[] = floatval($row['VAL']);
            }
        }

        if ($opChecked) {
            $data[] = array($row['CAS'], 0.0, floatval($opArr[0][2]));
            $ciel = floatval($opArr[0][2]);
            
            for ($i=1; $i < count($opArr); $i++) {
                $dateobj1 = DateTime::createFromFormat("d/m/Y H:i:s", $opArr[$i - 1][0]);
                $dateobj2 = DateTime::createFromFormat("d/m/Y H:i:s", $opArr[$i][0]);

                $timeFirst  = strtotime($dateobj1->format('Y-m-d H:i:s'));
                $timeSecond = strtotime($dateobj2->format('Y-m-d H:i:s'));
                $differenceInSeconds = $timeSecond - $timeFirst;

                $data[] = array($opArr[$i][0], $differenceInSeconds, $ciel);
                $medArr[] = $differenceInSeconds;
            }
        }

        $median = computeMedian($medArr);
    }

    $result['data'][] = array(
            'postName' => $post['bo_mnemo'] . " - [ " . $post['parent'] . " ]",
            'chartData' => $data,
            'median' => $median
        );
}

$sapiaDB = null;
$localDB = null;

$result['success'] = true;

echo json_encode($result);
