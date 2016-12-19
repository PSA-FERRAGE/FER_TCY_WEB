<?php

class Conveyor
{
    private $_conveyorParams;
    private $_sapiaDB;


    function __construct($params, $sapiaDB)
    {
        $this->_conveyorParams = $params;
        $this->_sapiaDB = $sapiaDB;
    }


    public function getName()
    {
        return $this->_conveyorParams['mnemo'];
    }


    public function createConveyor()
    {
        $result = array();
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

        $connection = $this->_sapiaDB->connect();

        $qryParams = array(
            $this->_conveyorParams['startTime'],
            $this->_conveyorParams['endTime'],
            $this->_conveyorParams['mnemo']
        );


        $stmt = $connection->prepare($query);
        if ($stmt->execute($qryParams)) {
            while ($row = $stmt->fetch()) {
                $result[] = array($row['CAS'], intval($row['VAL']));
            }
        }

        return $result;
    }

}