<?php

require 'Database.php';

$sapiaDB = new Database('oci:dbname=ta.fer.sapia.inetpsa.com:1521/ssc01', 'SSC_BO', 'SSCBO099');
$localDB = new Database('mysql:host=localhost;dbname=fer_db;charset=utf8', 'root', '');

$result = array();
if (isset($_POST['viewType'])) {
    switch ($_POST['viewType']) {
        case 'op':
            $query = "SELECT CONVERT(id, char) AS id, parent_id AS parent, nazov AS text FROM operator_lokalizacia;";
            $result = $localDB->selectQuery($query);
            break;
        case 'tcy':
            $query = "SELECT CONVERT(lokalizacia_id, char) AS id, parent_id AS parent, nazov AS text FROM lokalizacia;";
            $result = $localDB->selectQuery($query);
            break;
        case 'tab':
            $query = <<<SQL
                SELECT
                    SSC99_M1.SSCQT12.ID_LOC "id",
                    REPLACE(SSC99_M1.SSCQT12.QT1_ID_LOC, '00000000000000000000', 'USINE') "parent",
                    TRIM(SSC99_M1.SSCQT12.DES_LOC) "text"
                FROM 
                    SSC99_M1.SSCQT12
                CONNECT BY PRIOR SSC99_M1.SSCQT12.ID_LOC = SSC99_M1.SSCQT12.QT1_ID_LOC START WITH SSC99_M1.SSCQT12.ID_LOC = '00000000000000000000'
                ORDER BY LEVEL
SQL;
            $result = $sapiaDB->selectQuery($query);
            $result[0]['id'] = 'USINE';
            $result[0]['parent'] = '#';
            break;
        case 'cnv':
            $query = "SELECT CONVERT(dopravnik_id, char) AS id, parent_id AS parent, nazov AS text FROM dopravnik;";
            $result = $localDB->selectQuery($query);
            break;
        case 'par':
            $query = <<<SQL
                SELECT
                    SSC99_M1.SSCQT12.ID_LOC "id",
                    REPLACE(SSC99_M1.SSCQT12.QT1_ID_LOC, '00000000000000000000', 'USINE') "parent",
                    TRIM(SSC99_M1.SSCQT12.DES_LOC) "text"
                FROM 
                    SSC99_M1.SSCQT12
                CONNECT BY PRIOR SSC99_M1.SSCQT12.ID_LOC = SSC99_M1.SSCQT12.QT1_ID_LOC START WITH SSC99_M1.SSCQT12.ID_LOC = '00000000000000000000'
                ORDER BY LEVEL
SQL;
            $result = $sapiaDB->selectQuery($query);
            $result[0]['id'] = 'USINE';
            $result[0]['parent'] = '#';
            break;
        default:
            break;
    }
}

$localDB = null;

echo json_encode($result);
