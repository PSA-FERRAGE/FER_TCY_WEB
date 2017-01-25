<?php

require 'Database.php';


$sapiaDB = new Database('oci:dbname=ta.fer.sapia.inetpsa.com:1521/ssc01', 'SSC_BO', 'SSCBO099');
$result = array('success' => false, 'data' => array());


if (empty($_GET['localisation']) || empty($_GET['startTime']) || empty($_GET['endTime'])) {
    echo json_encode($result);
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
            t3.CARACTERISATION = 'O' AND
            ( t3.FIN_EVT >= to_date(?, 'DD/MM/YYYY HH24:MI:SS') AND
            t3.FIN_EVT <= to_date(?, 'DD/MM/YYYY HH24:MI:SS') )
        ORDER BY t3.DEB_EVT DESC
SQL;

    $qryParams = array($_GET['localisation'], $_GET['startTime'], $_GET['endTime']);

    $connection = $sapiaDB->connect();

    $stmt = $connection->prepare($sqlQry);
    if ($stmt->execute($qryParams)) {
        $result['data'] = $stmt->fetchAll(PDO::FETCH_NUM);
        $result['success'] = true;
    }


    $stmt->closeCursor();
    $stmt = null; 

    echo json_encode($result);
}