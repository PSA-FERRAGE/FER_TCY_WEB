<?php

require 'Database.php';

$sapiaDB = new Database('oci:dbname=ta.fer.sapia.inetpsa.com:1521/ssc01', 'SSC_BO', 'SSCBO099');
$result = array('success' => false, 'data' => array());


if (empty($_POST['localisations']) || empty($_POST['startTime']) ||
    empty($_POST['endTime']) || !isset($_POST['characterized'])) {
    echo json_encode($result);
    return;
}

$localisations = $_POST['localisations'];
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];
$characterized = filter_var($_POST['characterized'], FILTER_VALIDATE_BOOLEAN);


foreach ($localisations as $localisation) {
    if ($characterized == true) {
        $sqlQry = <<<SQL
            SELECT
                t12.DES_LOC AS lokalizacia,
                to_char(t3.DEB_EVT, 'DD/MM/YYYY HH24:MI:SS') AS zaciatok,
                ROUND((t3.FIN_EVT - t3.DEB_EVT)*86400) AS trvanie,
                t3.ID_MNEMO AS mnemonika,
                t10.DES_CLAS AS trieda,
                t3.DES_EVT40 AS popis,
                t3.COMPLEMENTAIRES AS komentar
            FROM
                SSC99_M1.SSCQT03 t3
            INNER JOIN SSC99_M1.SSCQT12 t12 ON t3.ID_LOC = t12.ID_LOC
            INNER JOIN SSC99_M1.SSCQT10 t10 ON t3.ID_CLAS = t10.ID_CLAS
            WHERE
                t3.ID_LOC IN (
                    SELECT
                        t122.ID_LOC AS "Localisation"   
                    FROM
                        SSC99_M1.SSCQT12 t122
                    CONNECT BY PRIOR t122.ID_LOC = t122.QT1_ID_LOC START WITH t122.ID_LOC = ?
                ) AND
                t3.CARACTERISATION = 'O' AND
                ( t3.FIN_EVT >= to_date(?, 'DD/MM/YYYY HH24:MI:SS') AND
                t3.FIN_EVT <= to_date(?, 'DD/MM/YYYY HH24:MI:SS') )
            ORDER BY t3.DEB_EVT DESC
SQL;
    } else {
        $sqlQry = <<<SQL
            SELECT
                t12.DES_LOC AS lokalizacia,
                to_char(t3.DEB_EVT, 'DD/MM/YYYY HH24:MI:SS') AS zaciatok,
                ROUND((t3.FIN_EVT - t3.DEB_EVT)*86400) AS trvanie,
                t3.ID_MNEMO AS mnemonika,
                t10.DES_CLAS AS trieda,
                t3.DES_EVT40 AS popis,
                t3.COMPLEMENTAIRES AS komentar
            FROM
                SSC99_M1.SSCQT03 t3
            INNER JOIN SSC99_M1.SSCQT12 t12 ON t3.ID_LOC = t12.ID_LOC
            INNER JOIN SSC99_M1.SSCQT10 t10 ON t3.ID_CLAS = t10.ID_CLAS
            WHERE
                t3.ID_LOC IN (
                    SELECT
                        t122.ID_LOC AS "Localisation"   
                    FROM
                        SSC99_M1.SSCQT12 t122
                    CONNECT BY PRIOR t122.ID_LOC = t122.QT1_ID_LOC START WITH t122.ID_LOC = ?
                ) AND
                t3.CARACTERISATION <> 'O' AND
                ( t3.FIN_EVT >= to_date(?, 'DD/MM/YYYY HH24:MI:SS') AND
                t3.FIN_EVT <= to_date(?, 'DD/MM/YYYY HH24:MI:SS') )
            ORDER BY t3.DEB_EVT DESC
SQL;
    }
    
    $qryParams = array($localisation, $startTime, $endTime);
    $connection = $sapiaDB->connect();
    $stmt = $connection->prepare($sqlQry);

    if ($stmt->execute($qryParams)) {
        $tmpArray = $stmt->fetchAll(PDO::FETCH_NUM);
        $result['data'] = array_merge($result['data'], $tmpArray);
        // $result['data'] = $stmt->fetchAll(PDO::FETCH_NUM);
        $result['success'] = true;
    }
}

$datum = array();
foreach ($result['data'] as $key => $row) {
    $date = date_create_from_format('d/m/Y H:i:s', $row[1]);
    ;

    $datum[$key] = $date->getTimestamp();
    $result['data'][$key][1] = $date->getTimestamp();
}

array_multisort($datum, SORT_ASC, $result['data']);

echo json_encode($result);
