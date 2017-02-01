<?php


class TCY
{
    function __construct()
    {

    }


    public static function removeOutliers($data)
    {
        sort($data, SORT_NUMERIC);

        $median = self::getMedian($data);
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


    public static function getMedian($array)
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
}