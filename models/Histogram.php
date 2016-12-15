<?php

class Histogram
{
    private $_histParams;
    private $_sapiaDB;


    function __construct($params, $sapiaDB)
    {
        $this->_histParams = $params;
        $this->_sapiaDB = $sapiaDB;
    }


    public function getName()
    {
        return $this->_histParams['name'];
    }


    public function createHistogram($startTime, $endTime)
    {
        $tcyVals = $this->getTcy($startTime, $endTime);
        if (count($tcyVals) < 1) {
            return $result;
        }

        $tcyValsFiltered = $this->removeOutliers($tcyVals);

        return $tcyValsFiltered;
    }


    private function getTcy($startTime, $endTime)
    {
        $result = array();
        $query = $this->getCntrsQry($this->_histParams['cntrs'], $this->_histParams['table']);
        $qryParams = array_merge(array($startTime, $endTime, $this->_histParams['loc']), $this->_histParams['cntrs']);

        $connection = $this->_sapiaDB->connect();

        $stmt = $connection->prepare($query);
        if ($stmt->execute($qryParams)) {
            while ($row = $stmt->fetch()) {
                $result[] = intval($row['TCY']);
            }
        }

        return $result;
    }   


    private function removeOutliers($data)
    {
        sort($data, SORT_NUMERIC);

        $median = $this->getMedian($data);
        $l1 = 0.25 * count($data);
        $l3 = 0.75 * count($data);

        if (ctype_digit($l1)) // Whole number check
            $dolnyKvartil = ($data[$l1 - 1] + $data[$l1]) / 2;
        else
            $dolnyKvartil = $data[ceil($l1) - 1];

        if (ctype_digit($l3)) // Whole number check
            $hornyKvartil = ($data[$l3 - 1] + $data[$l3]) / 2;
        else
            $hornyKvartil = $data[ceil($l3) - 1];


        $IQR = $hornyKvartil - $dolnyKvartil;
        $lowOutliers = $dolnyKvartil - (1.5 * $IQR);
        $highOutliers = $hornyKvartil + (1.5 * $IQR);

        return array_filter(
            $data,
            function ($x) use($lowOutliers, $highOutliers) {
                return $x >= $lowOutliers && $x <= $highOutliers; 
            }
        );
    }


    private function getMedian($array)
    {
        $iCount = count($array);
        if ($iCount == 0) {
            return 0;
        }
        
        $middleIndex = floor($iCount / 2);
        sort($array, SORT_NUMERIC);
        $median = $array[$middleIndex]; // assume an odd # of items
        // Handle the even case by averaging the middle 2 items
        if ($iCount % 2 == 0) {
            $median = ($median + $array[$middleIndex - 1]) / 2;
        }

        return $median;
    }


    private function getCntrsQry($params, $table)
    {
        $clause = implode(',', array_fill(0, count($params), '?'));
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

        return $query;
    }
}