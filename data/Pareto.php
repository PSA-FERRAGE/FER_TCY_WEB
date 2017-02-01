<?php

class Pareto
{
    function __construct()
    {

    }


    public static function getQuery($queryType, $isCharacterized)
    {
        $query = "";

        if ($queryType == 'cnt') {
            if ($isCharacterized == true) {
                $query = <<<SQL
                    SELECT pocet, event
                    FROM
                    ( SELECT
                        count(t3.DES_EVT40) as pocet,
                        t3.DES_EVT40 AS event
                    FROM
                        SSC99_M1.SSCQT03 t3
                    WHERE ( 
                        t3.ID_LOC IN (
                            SELECT
                                t122.ID_LOC AS "Localisation"   
                            FROM
                                SSC99_M1.SSCQT12 t122
                            CONNECT BY PRIOR t122.ID_LOC = t122.QT1_ID_LOC START WITH t122.ID_LOC = ?
                        ) 
                        AND t3.DEB_EVT >= to_date(?,'DD/MM/YYYY HH24:MI:SS')
                        AND t3.DEB_EVT <= to_date(?,'DD/MM/YYYY HH24:MI:SS')
                        AND t3.CARACTERISATION = 'O'
                    )
                    GROUP BY t3.DES_EVT40
                    ORDER BY 1 DESC
                    )
                    WHERE ROWNUM <= 10
                    ORDER BY 1 ASC
SQL;
            } else {
                $query = <<<SQL
                    SELECT pocet, event
                    FROM
                    ( SELECT
                        count(t3.DES_EVT40) as pocet,
                        t3.DES_EVT40 AS event
                    FROM
                        SSC99_M1.SSCQT03 t3
                    WHERE ( 
                        t3.ID_LOC IN (
                            SELECT
                                t122.ID_LOC AS "Localisation"   
                            FROM
                                SSC99_M1.SSCQT12 t122
                            CONNECT BY PRIOR t122.ID_LOC = t122.QT1_ID_LOC START WITH t122.ID_LOC = ?
                        ) 
                        AND t3.DEB_EVT >= to_date(?,'DD/MM/YYYY HH24:MI:SS')
                        AND t3.DEB_EVT <= to_date(?,'DD/MM/YYYY HH24:MI:SS')
                        AND t3.CARACTERISATION <> 'O'
                    )
                    GROUP BY t3.DES_EVT40
                    ORDER BY 1 DESC
                    )
                    WHERE ROWNUM <= 10
                    ORDER BY 1 ASC
SQL;
            }
        } else {
            if ($isCharacterized == true) {
                $query = <<<SQL
                    SELECT duration, event
                    FROM
                    ( SELECT
                        SUM(ROUND((t3.FIN_EVT - t3.DEB_EVT)*86400)) AS duration,
                        t3.DES_EVT40 AS event
                    FROM
                        SSC99_M1.SSCQT03 t3
                    WHERE (
                        t3.ID_LOC  IN  (
                        SELECT
                            t122.ID_LOC AS "Localisation"   
                        FROM
                            SSC99_M1.SSCQT12 t122
                        CONNECT BY PRIOR t122.ID_LOC = t122.QT1_ID_LOC START WITH t122.ID_LOC = ?
                        )
                        AND t3.DEB_EVT >= to_date(?, 'DD/MM/YYYY HH24:MI:SS')
                        AND t3.DEB_EVT <= to_date(?, 'DD/MM/YYYY HH24:MI:SS')
                        AND t3.CARACTERISATION = 'O' )
                    GROUP BY t3.DES_EVT40
                    ORDER BY 1 DESC )
                    WHERE ROWNUM <= 10
                    ORDER BY 1 ASC
SQL;
            } else {
                $query = <<<SQL
                    SELECT duration, event
                    FROM
                    ( SELECT
                        SUM(ROUND((t3.FIN_EVT - t3.DEB_EVT)*86400)) AS duration,
                        t3.DES_EVT40 AS event
                    FROM
                        SSC99_M1.SSCQT03 t3
                    WHERE (
                        t3.ID_LOC  IN  (
                        SELECT
                            t122.ID_LOC AS "Localisation"   
                        FROM
                            SSC99_M1.SSCQT12 t122
                        CONNECT BY PRIOR t122.ID_LOC = t122.QT1_ID_LOC START WITH t122.ID_LOC = ?
                        )
                        AND t3.DEB_EVT >= to_date(?, 'DD/MM/YYYY HH24:MI:SS')
                        AND t3.DEB_EVT <= to_date(?, 'DD/MM/YYYY HH24:MI:SS') )
                    GROUP BY t3.DES_EVT40
                    ORDER BY 1 DESC )
                    WHERE ROWNUM <= 10
                    ORDER BY 1 ASC
SQL;
            }
        }

        return $query;
    }
}
