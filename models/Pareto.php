<?php

class Pareto
{
    private $_paretoParams;
    private $_sapiaDB;


    function __construct($params, $sapiaDB)
    {
        $this->_paretoParams = $params;
        $this->_sapiaDB = $sapiaDB;
    }


    public function getName()
    {
        return $this->_paretoParams['name'];
    }


    public function createPareto($startTime, $endTime)
    {
        $queryCnt = $this->getCntParetoQry($this->_paretoParams['equipments']);
        $queryTime = $this->getTimeParetoQry($this->_paretoParams['equipments']);
        $qryParams = array_merge(array($startTime, $endTime), $this->_paretoParams['equipments']);

        $connection = $this->_sapiaDB->connect();

        $result = array();

        $result['cntPareto'] = $this->getChartVals($connection, $queryCnt, $qryParams);
        $result['timePareto'] = $this->getChartVals($connection, $queryTime, $qryParams);

        return $result;
    }


    private function getChartVals($connection, $query, $queryParams)
    {
        $result = array();

        $stmt = $connection->prepare($query);
        if ($stmt->execute($queryParams)) {
            while ($row = $stmt->fetch()) {
                $result[] = array($row[0], $row[1]);
            }
        }

        return $result;
    }


    private function getCntParetoQry($localisations)
    {
        $clause = implode(',', array_fill(0, count($localisations), '?'));
        
        $query = <<<SQL
            SELECT pocet, event
            FROM
            ( SELECT
                count(SSC99_M1.SSCQT03.DES_EVT40) as pocet,
                SSC99_M1.SSCQT03.DES_EVT40 AS event
              FROM
                SSC99_M1.SSCQT03
              WHERE ( 
                SSC99_M1.SSCQT03.DEB_EVT >= to_date(?,'DD/MM/YYYY HH24:MI:SS')
                AND  SSC99_M1.SSCQT03.FIN_EVT <= to_date(?,'DD/MM/YYYY HH24:MI:SS')
                AND  SSC99_M1.SSCQT03.ID_LOC IN (${clause})
              )
              GROUP BY SSC99_M1.SSCQT03.DES_EVT40
              ORDER BY 1 DESC
            )
            WHERE ROWNUM <= 10
            ORDER BY 1 ASC
SQL;

        return $query;
    }


    private function getTimeParetoQry($localisations)
    {
        $clause = implode(',', array_fill(0, count($localisations), '?'));

        $query = <<<SQL
            SELECT duration, event
            FROM
            ( SELECT
                ROUND((SSC99_M1.SSCQT03.FIN_EVT - SSC99_M1.SSCQT03.DEB_EVT)*86400) AS duration,
                SSC99_M1.SSCQT03.DES_EVT40 as event
            FROM
                SSC99_M1.SSCQT03
            WHERE
            ( SSC99_M1.SSCQT03.DEB_EVT >= to_date(?,'DD/MM/YYYY HH24:MI:SS')
              AND  SSC99_M1.SSCQT03.FIN_EVT <= to_date(?,'DD/MM/YYYY HH24:MI:SS')
              AND  SSC99_M1.SSCQT03.ID_LOC  IN  (${clause}) )
            ORDER BY 1 DESC )
            WHERE ROWNUM <= 10
            ORDER BY 1 ASC
SQL;

        return $query;
    }
}