-- --------------------------------------------------------
-- Hostiteľ:                     127.0.0.1
-- Verze serveru:                10.1.19-MariaDB - mariadb.org binary distribution
-- OS serveru:                   Win32
-- HeidiSQL Verzia:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Exportování struktury databáze pro
CREATE DATABASE IF NOT EXISTS `fer_db` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_slovak_ci */;
USE `fer_db`;

-- Exportování struktury pro tabulka fer_db.counter
CREATE TABLE IF NOT EXISTS `counter` (
  `counter_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `lokalizacia_id` int(11) unsigned NOT NULL,
  `counters` text COLLATE utf8_slovak_ci NOT NULL,
  `bo_table` varchar(256) COLLATE utf8_slovak_ci NOT NULL,
  PRIMARY KEY (`counter_id`),
  UNIQUE KEY `lokalizacia_id` (`lokalizacia_id`),
  CONSTRAINT `FK_LokCnt` FOREIGN KEY (`lokalizacia_id`) REFERENCES `lokalizacia` (`lokalizacia_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8 COLLATE=utf8_slovak_ci;

-- Exportování dat pro tabulku fer_db.counter: ~73 rows (přibližně)
/*!40000 ALTER TABLE `counter` DISABLE KEYS */;
INSERT INTO `counter` (`counter_id`, `lokalizacia_id`, `counters`, `bo_table`) VALUES
	(1, 86, 'P001E1A58;P001E1A7;P001E1A9;P001E2A58;P001E2A7;P001E2A9;P001E3A58;P001E3A7;P001E3A9;P001E4A58;P001E4A7;P001E4A9', 'SSC99_M1.SSCQT09'),
	(2, 88, 'P002E1A58;P002E1A7;P002E1A9;P002E2A58;P002E2A7;P002E2A9;P002E3A58;P002E3A7;P002E3A9;P002E4A58;P002E4A7;P002E4A9', 'SSC99_M1.SSCQT09'),
	(3, 194, 'TPIECE_A90;TPIECE_A91', 'SSC99_M1.SSCQT05'),
	(4, 198, 'TPIECE_A90;TPIECE_A91', 'SSC99_M1.SSCQT05'),
	(5, 202, 'TPIECE_ARG', 'SSC99_M1.SSCQT05'),
	(6, 206, 'TPIECE_ARD', 'SSC99_M1.SSCQT05'),
	(7, 210, 'TPIECE_A9', 'SSC99_M1.SSCQT05'),
	(8, 213, 'TPIECE_VN;TPIECE_VNM;TPIECE_VS;TPIECE_VSM', 'SSC99_M1.SSCQT05'),
	(9, 135, 'TPIECE_A90;TPIECE_A91', 'SSC99_M1.SSCQT05'),
	(10, 137, 'TPIECE_A90;TPIECE_A91', 'SSC99_M1.SSCQT05'),
	(11, 139, 'TPIECE_A90;TPIECE_A91', 'SSC99_M1.SSCQT05'),
	(12, 141, 'TPIECE_A90;TPIECE_A91', 'SSC99_M1.SSCQT05'),
	(13, 125, 'TPIECE_A90;TPIECE_A91', 'SSC99_M1.SSCQT05'),
	(14, 127, 'TPIECE_A90;TPIECE_A91', 'SSC99_M1.SSCQT05'),
	(15, 129, 'TPIECE_A90;TPIECE_A91', 'SSC99_M1.SSCQT05'),
	(16, 131, 'TPIECE_A90;TPIECE_A91', 'SSC99_M1.SSCQT05'),
	(17, 122, 'TPIECE_A90;TPIECE_A91', 'SSC99_M1.SSCQT05'),
	(18, 231, 'P001EAA58;P001EBA58;P001ECA58;P001ETA58', 'SSC99_M1.SSCQT09'),
	(19, 235, 'P001EAA58;P001EBA58;P001ECA58;P001ETA58', 'SSC99_M1.SSCQT09'),
	(20, 241, 'P001EAA58;P001EBA58;P001ECA58;P001ETA58', 'SSC99_M1.SSCQT09'),
	(21, 245, 'P001EAA58;P001EBA58;P001ECA58;P001ETA58', 'SSC99_M1.SSCQT09'),
	(22, 239, 'P001EAA58D;P001EAA58G;P001EBA58D;P001EBA58G;P001ECA58D;P001ECA58G;P001ETA58D;P001ETA58G', 'SSC99_M1.SSCQT09'),
	(23, 233, 'P001EAA58;P001EBA58;P001ECA58;P001ETA58', 'SSC99_M1.SSCQT09'),
	(24, 237, 'P001EAA58;P001EBA58;P001ECA58;P001ETA58', 'SSC99_M1.SSCQT09'),
	(25, 243, 'P001EAA58;P001EBA58;P001ECA58;P001ETA58', 'SSC99_M1.SSCQT09'),
	(26, 247, 'P001EAA58;P001EBA58;P001ECA58;P001ETA58', 'SSC99_M1.SSCQT09'),
	(27, 48, 'P21DE1A7;P21DE1A9;P21DE2A7;P21DE2A9;P21DE3A7;P21DE3A9;P21DE4A7;P21DE4A9', 'SSC99_M1.SSCQT09'),
	(28, 50, 'P21GE1A7;P21GE1A9;P21GE2A7;P21GE2A9;P21GE3A7;P21GE3A9;P21GE4A7;P21GE4A9', 'SSC99_M1.SSCQT09'),
	(29, 75, 'P030E1A58D;P030E1A58G;P030E1A7;P030E2A58D;P030E2A58G;P030E2A7;P030E3A58D;P030E3A58G;P030E3A7;P030E4A58D;P030E4A58G;P030E4A7', 'SSC99_M1.SSCQT09'),
	(30, 79, 'P050E1A58D;P050E1A58G;P050E1A7;P050E2A58D;P050E2A58G;P050E2A7;P050E3A58D;P050E3A58G;P050E3A7;P050E4A58D;P050E4A58G;P050E4A7', 'SSC99_M1.SSCQT09'),
	(31, 159, 'PLIA2EAA7;PLIA2EBA7;PLIA2ECA7;PLIA2ETA7', 'SSC99_M1.SSCQT09'),
	(32, 218, 'P001EAA58;P001EBA58;P001ECA58;P001ETA58', 'SSC99_M1.SSCQT09'),
	(33, 226, 'P001EAA58D;P001EAA58G;P001EBA58D;P001EBA58G;P001ECA58D;P001ECA58G;P001ETA58D;P001ETA58G', 'SSC99_M1.SSCQT09'),
	(34, 224, 'P001EAA58;P001EBA58;P001ECA58;P001ETA58', 'SSC99_M1.SSCQT09'),
	(35, 222, 'P001EAA58;P001EBA58;P001ECA58;P001ETA58', 'SSC99_M1.SSCQT09'),
	(36, 228, 'P001EAA58D;P001EAA58G;P001EBA58D;P001EBA58G;P001ECA58D;P001ECA58G;P001ETA58D;P001ETA58G', 'SSC99_M1.SSCQT09'),
	(37, 220, 'P001EAA58;P001EBA58;P001ECA58;P001EZA58', 'SSC99_M1.SSCQT09'),
	(38, 186, 'P020EAA7;P020EBA7;P020ECA7;P020ETA7', 'SSC99_M1.SSCQT09'),
	(39, 188, 'P050EAA7;P050EBA7;P050ECA7;P050ETA7', 'SSC99_M1.SSCQT09'),
	(40, 190, 'P060EAA7;P060EBA7;P060ECA7;P060ETA7', 'SSC99_M1.SSCQT09'),
	(41, 91, 'P010E1A58D;P010E1A58G;P010E1A7;P010E1A9;P010E2A58D;P010E2A58G;P010E2A7;P010E2A9;P010E3A58D;P010E3A58G;P010E3A7;P010E3A9;P010E4A58D;P010E4A58G;P010E4A7;P010E4A9', 'SSC99_M1.SSCQT09'),
	(42, 93, 'P020E1A58;P020E1A7;P020E1A9;P020E2A58;P020E2A7;P020E2A9;P020E3A58;P020E3A7;P020E3A9;P020E4A58;P020E4A7;P020E4A9', 'SSC99_M1.SSCQT09'),
	(43, 24, 'P001E1A58;P001E1A70;P001E2A58;P001E2A70;P001E3A58;P001E3A70;P001E4A58;P001E4A70', 'SSC99_M1.SSCQT09'),
	(44, 26, 'P001E1A58;P001E1A70;P001E2A58;P001E2A70;P001E3A58;P001E3A70;P001E4A58;P001E4A70', 'SSC99_M1.SSCQT09'),
	(45, 28, 'P001E1A58;P001E1A70;P001E2A58;P001E2A70;P001E3A58;P001E3A70;P001E4A58;P001E4A70', 'SSC99_M1.SSCQT09'),
	(46, 3, 'P008EAA5D;P008EAA5G;P008EAA70;P008EAA71;P008EBA5D;P008EBA5G;P008EBA70;P008EBA71;P008ECA5D;P008ECA5G;P008ECA70;P008ECA71;P008ETA5D;P008ETA5G;P008ETA71', 'SSC99_M1.SSCQT09'),
	(47, 5, 'P014EAA5D;P014EAA5G;P014EAA70;P014EAA71;P014EBA5D;P014EBA5G;P014EBA70;P014EBA71;P014ECA5D;P014ECA5G;P014ECA70;P014ECA71;P014ETA5D;P014ETA5G;P014ETA701', 'SSC99_M1.SSCQT09'),
	(48, 7, 'P015EAA5D;P015EAA5G;P015EAA70;P015EAA71;P015EBA5D;P015EBA5G;P015EBA70;P015EBA71;P015ECA5D;P015ECA5G;P015ECA70;P015ECA71;P015ETA5D;P015ETA5G;P015ETA701', 'SSC99_M1.SSCQT09'),
	(49, 11, 'P023EAA5D;P023EAA5G;P023EAA70;P023EAA71;P023EBA5D;P023EBA5G;P023EBA70;P023EBA71;P023ECA5D;P023ECA5G;P023ECA70;P023ECA71;P023ETA5D;P023ETA5G;P023ETA701', 'SSC99_M1.SSCQT09'),
	(50, 13, 'P026EAA5D;P026EAA5G;P026EAA70;P026EAA71;P026EBA5D;P026EBA5G;P026EBA70;P026EBA71;P026ECA5D;P026ECA5G;P026ECA70;P026ECA71;P026ETA5D;P026ETA5G;P026ETA701', 'SSC99_M1.SSCQT09'),
	(51, 15, 'P038EAA5D;P038EAA5G;P038EAA70;P038EAA71;P038EBA5D;P038EBA5G;P038EBA70;P038EBA71;P038ECA5D;P038ECA5G;P038ECA70;P038ECA71;P038ETA5D;P038ETA5G;P038ETA701', 'SSC99_M1.SSCQT09'),
	(52, 18, 'P042EAA5D;P042EAA5G;P042EAA70;P042EAA71;P042EBA5D;P042EBA5G;P042EBA70;P042EBA71;P042ECA5D;P042ECA5G;P042ECA70;P042ECA71;P042ETA5D;P042ETA5G;P042ETA701', 'SSC99_M1.SSCQT09'),
	(53, 20, 'P052EAA5D;P052EAA5G;P052EAA70;P052EAA71;P052EBA5D;P052EBA5G;P052EBA70;P052EBA71;P052ECA5D;P052ECA5G;P052ECA70;P052ECA71;P052ETA5D;P052ETA5G;P052ETA701', 'SSC99_M1.SSCQT09'),
	(54, 22, 'P058EAA5D;P058EAA5G;P058EAA70;P058EAA71;P058EBA5D;P058EBA5G;P058EBA70;P058EBA71;P058ECA5D;P058ECA5G;P058ECA70;P058ECA71;P058ETA5D;P058ETA5G;P058ETA701', 'SSC99_M1.SSCQT09'),
	(55, 106, 'P001E1D;P001E1G;P001E2D;P001E2G;P001E3D;P001E3G;P001E4D;P001E4G', 'SSC99_M1.SSCQT09'),
	(56, 100, 'P010E1A58D;P010E1A58G;P010E1A9AE;P010E1A9D;P010E1A9G;P010E2A58D;P010E2A58G;P010E2A9AE;P010E2A9D;P010E2A9G;P010E3A58D;P010E3A58G;P010E3A9AE;P010E3A9D;P010E3A9G;P010E4A58D;P010E4A58G;P010E4A9AE;P010E4A9D;P010E4A9G', 'SSC99_M1.SSCQT09'),
	(57, 163, 'STO1EAA7;STO1EBA7;STO1ECA7;STO1ETA7', 'SSC99_M1.SSCQT09'),
	(58, 164, 'STO3EAA7;STO3EBA7;STO3ECA7;STO3ETA7', 'SSC99_M1.SSCQT09'),
	(59, 32, 'P11AE1A7;P11AE1A9;P11AE2A7;P11AE2A9;P11AE3A7;P11AE3A9;P11AE4A7;P11AE4A9', 'SSC99_M1.SSCQT09'),
	(60, 33, 'P11BE1A7;P11BE1A9;P11BE2A7;P11BE2A9;P11BE3A7;P11BE3A9;P11BE4A7;P11BE4A9', 'SSC99_M1.SSCQT09'),
	(61, 35, 'P12AE1A7;P12AE1A9;P12AE2A7;P12AE2A9;P12AE3A7;P12AE3A9;P12AE4A7;P12AE4A9', 'SSC99_M1.SSCQT09'),
	(62, 36, 'P12BE1A7;P12BE1A9;P12BE2A7;P12BE2A9;P12BE3A7;P12BE3A9;P12BE4A7;P12BE4A9', 'SSC99_M1.SSCQT09'),
	(63, 38, 'P041E1A7;P041E1A9;P041E2A7;P041E2A9;P041E3A7;P041E3A9;P041E4A7;P041E4A9', 'SSC99_M1.SSCQT09'),
	(64, 40, 'P051E1A7;P051E1A9;P051E2A7;P051E2A9;P051E3A7;P051E3A9;P051E4A7;P051E4A9', 'SSC99_M1.SSCQT09'),
	(65, 42, 'P071E1A7;P071E1A9;P071E2A7;P071E2A9;P071E3A7;P071E3A9;P071E4A7;P071E4A9', 'SSC99_M1.SSCQT09'),
	(66, 44, 'P81AE1A7;P81AE1A9;P81AE2A7;P81AE2A9;P81AE3A7;P81AE3A9;P81AE4A7;P81AE4A9', 'SSC99_M1.SSCQT09'),
	(67, 45, 'P81BE1A7;P81BE1A9;P81BE2A7;P81BE2A9;P81BE3A7;P81BE3A9;P81BE4A7;P81BE4A9', 'SSC99_M1.SSCQT09'),
	(68, 52, 'P040E1A58;P040E1A7;P040E1A9;P040E2A58;P040E2A7;P040E2A9;P040E3A58;P040E3A7;P040E3A9;P040E4A58;P040E4A7;P040E4A9', 'SSC99_M1.SSCQT09'),
	(69, 54, 'P045E1A58;P045E1A7;P045E1A9;P045E2A58;P045E2A7;P045E2A9;P045E3A58;P045E3A7;P045E3A9;P045E4A58;P045E4A7;P045E4A9', 'SSC99_M1.SSCQT09'),
	(70, 58, 'P50AE1A58;P50AE1A7;P50AE1A9;P50AE2A58;P50AE2A7;P50AE2A9;P50AE3A58;P50AE3A7;P50AE3A9;P50AE4A58;P50AE4A7;P50AE4A9', 'SSC99_M1.SSCQT09'),
	(71, 59, 'P50AE1B9;P50AE2B9;P50AE3B9;P50AE4B9;P50BE1A58;P50BE1A7;P50BE1A9;P50BE2A58;P50BE2A7;P50BE2A9;P50BE3A58;P50BE3A7;P50BE3A9;P50BE4A58;P50BE4A7;P50BE4A9', 'SSC99_M1.SSCQT09'),
	(72, 61, 'P60AE1A58;P60AE1A7;P60AE1A9;P60AE2A58;P60AE2A7;P60AE2A9;P60AE3A58;P60AE3A7;P60AE3A9;P60AE4A58;P60AE4A7;P60AE4A9', 'SSC99_M1.SSCQT09'),
	(73, 62, 'P60BE1A58;P60BE1A7;P60BE1A9;P60BE2A58;P60BE2A7;P60BE2A9;P60BE3A58;P60BE3A7;P60BE3A9;P60BE4A58;P60BE4A7;P60BE4A9', 'SSC99_M1.SSCQT09');
/*!40000 ALTER TABLE `counter` ENABLE KEYS */;

-- Exportování struktury pro pohled fer_db.countersview
-- Vytváření dočasné tabulky Pohledu pro omezení dopadu chyb
CREATE TABLE `countersview` (
	`bo_id` VARCHAR(45) NOT NULL COLLATE 'utf8_slovak_ci',
	`nazov` VARCHAR(45) NOT NULL COLLATE 'utf8_slovak_ci',
	`typ` VARCHAR(45) NOT NULL COLLATE 'utf8_slovak_ci',
	`counters` TEXT NOT NULL COLLATE 'utf8_slovak_ci',
	`bo_table` VARCHAR(256) NOT NULL COLLATE 'utf8_slovak_ci'
) ENGINE=MyISAM;

-- Exportování struktury pro tabulka fer_db.dopravnik
CREATE TABLE IF NOT EXISTS `dopravnik` (
  `dopravnik_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) NOT NULL,
  `bo_loc_id` varchar(128) COLLATE utf8_slovak_ci DEFAULT NULL,
  `bo_mnemo` varchar(128) COLLATE utf8_slovak_ci DEFAULT NULL,
  `nazov` varchar(255) COLLATE utf8_slovak_ci NOT NULL,
  PRIMARY KEY (`dopravnik_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_slovak_ci;

-- Exportování dat pro tabulku fer_db.dopravnik: ~33 rows (přibližně)
/*!40000 ALTER TABLE `dopravnik` DISABLE KEYS */;
INSERT INTO `dopravnik` (`dopravnik_id`, `parent_id`, `bo_loc_id`, `bo_mnemo`, `nazov`) VALUES
	(1, 0, NULL, NULL, 'FER'),
	(2, 1, 'API_STO', 'STOCKFER;ENC_VISG', 'STOCK'),
	(3, 1, 'API_LIA5', 'LIA_SFER', 'API_LIA(4 et 5)'),
	(4, 1, NULL, NULL, 'CDC'),
	(5, 4, 'API_YL01ILOT1', 'ENC_HABG', 'ILOT 1 YL01'),
	(6, 4, 'API_YL03ILOT1', 'ENC_ANNG', 'ILOT 1 YL03'),
	(7, 4, 'API_YL06ILOT1', 'ENC_DDAG', 'ILOT 1 YL06'),
	(8, 4, 'API_YL08ILOT2', 'ENC_FICG', 'ILOT 2 YL08'),
	(9, 4, 'API_YR01ILOT1', 'ENC_HABD', 'ILOT 1 YR01'),
	(10, 4, 'API_YR03ILOT1', 'ENC_ANND', 'ILOT 1 YR03'),
	(11, 4, 'API_YR06ILOT1', 'ENC_DDAD', 'ILOT 1 YR06'),
	(12, 4, 'API_YR08ILOT2', 'ENC_FICD', 'ILOT 2 YR08'),
	(13, 4, 'API_YR11ILOT1', 'ENC_APCC;ENC_TCCC', 'ILOT 1 YR11'),
	(14, 1, NULL, NULL, 'BR'),
	(15, 14, NULL, NULL, 'UA'),
	(16, 15, 'API_UA11', 'ENC_BRCG', 'API_UA11'),
	(17, 15, 'API_UA12', 'ENC_BRCD', 'API_UA12'),
	(18, 15, 'API_UA41', 'ENC_PLAN', 'API_UA41'),
	(19, 15, 'API_UA51', 'LIP_PRMA', 'API_UA51'),
	(20, 15, 'API_UA71', 'ENC_PFUV', 'API_UA71'),
	(21, 15, 'API_UA81', 'LIP_UVPL', 'API_UA81'),
	(22, 14, NULL, NULL, 'UR'),
	(23, 22, 'API_UR45', 'LIP_ARPU', 'API_UR45'),
	(24, 22, 'API_UR50', 'ENC_PRUR', 'API_UR50'),
	(25, 22, 'API_UR60', 'ENC_FIUR;LIP_URPL', 'API_UR60'),
	(26, 22, 'APIDUR21', 'ENC_LGND;LIP_LDMA', 'APIDUR21'),
	(27, 22, 'APIGUR21', 'ENC_LGNG;LIP_LGMA', 'APIGUR21'),
	(28, 14, NULL, NULL, 'TC'),
	(29, 28, 'API_TK10API', 'ENC_TA2A;LIP_TAST', 'API_TK10'),
	(30, 14, NULL, NULL, 'PF'),
	(31, 30, 'API_PF10', 'LIP_PLST', 'API_PF10'),
	(32, 30, 'API_PF20', 'ENC_LONI', 'API_PF20'),
	(33, 30, 'API_AA02', 'LIP_DAST', 'API_AA02 Doublure aile gauche');
/*!40000 ALTER TABLE `dopravnik` ENABLE KEYS */;

-- Exportování struktury pro tabulka fer_db.lokalizacia
CREATE TABLE IF NOT EXISTS `lokalizacia` (
  `lokalizacia_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) unsigned NOT NULL,
  `nazov` varchar(45) COLLATE utf8_slovak_ci NOT NULL,
  `bo_id` varchar(45) COLLATE utf8_slovak_ci NOT NULL,
  `typ` varchar(45) COLLATE utf8_slovak_ci NOT NULL,
  PRIMARY KEY (`lokalizacia_id`),
  UNIQUE KEY `bo_id_UNIQUE` (`bo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=248 DEFAULT CHARSET=utf8 COLLATE=utf8_slovak_ci;

-- Exportování dat pro tabulku fer_db.lokalizacia: ~247 rows (přibližně)
/*!40000 ALTER TABLE `lokalizacia` DISABLE KEYS */;
INSERT INTO `lokalizacia` (`lokalizacia_id`, `parent_id`, `nazov`, `bo_id`, `typ`) VALUES
	(1, 0, 'ARMATURE', 'SB', 'SECTOR'),
	(2, 1, 'API_SB08', 'API_SB08', 'AUTOMAT'),
	(3, 2, 'SB08', 'SBA08I08', 'ILOT'),
	(4, 1, 'API_SB14', 'API_SB14', 'AUTOMAT'),
	(5, 4, 'SB14', 'SBA14I14', 'ILOT'),
	(6, 1, 'API_SB15', 'API_SB15', 'AUTOMAT'),
	(7, 6, 'SB15', 'SBA15I15', 'ILOT'),
	(8, 6, 'SB93', 'SBA15I93', 'ILOT'),
	(9, 6, 'SB95', 'SBA15I95', 'ILOT'),
	(10, 1, 'API_SB23', 'API_SB23', 'AUTOMAT'),
	(11, 10, 'SB23', 'SBA23I23', 'ILOT'),
	(12, 1, 'API_SB26', 'API_SB26', 'AUTOMAT'),
	(13, 12, 'SB26', 'SBA26I26', 'ILOT'),
	(14, 1, 'API_SB38', 'API_SB38', 'AUTOMAT'),
	(15, 14, 'SB38', 'SBA38I38', 'ILOT'),
	(16, 14, 'SB97', 'SBA38I97', 'ILOT'),
	(17, 1, 'API_SB42', 'API_SB42', 'AUTOMAT'),
	(18, 17, 'SB42', 'SBA42I42', 'ILOT'),
	(19, 1, 'API_SB52', 'API_SB52', 'AUTOMAT'),
	(20, 19, 'SB52', 'SBA52I52', 'ILOT'),
	(21, 1, 'API_SB58', 'API_SB58', 'AUTOMAT'),
	(22, 21, 'SB58', 'SBA58I58', 'ILOT'),
	(23, 1, 'API_SB90', 'API_SB90', 'AUTOMAT'),
	(24, 23, 'SB90', 'SB90I1', 'ILOT'),
	(25, 1, 'API_SB92', 'API_SB92', 'AUTOMAT'),
	(26, 25, 'SB92', 'SB92I1', 'ILOT'),
	(27, 1, 'API_SB96', 'API_SB96', 'AUTOMAT'),
	(28, 27, 'SB96', 'SB96I1', 'ILOT'),
	(29, 0, 'BASE ROULANTE', 'BR', 'SECTOR'),
	(30, 29, 'UNIT AVANT', 'UA', 'SECTOR'),
	(31, 30, 'API_UA11', 'API_UA11', 'AUTOMAT'),
	(32, 31, 'UA11A', 'UAA11I11A', 'ILOT'),
	(33, 31, 'UA11B', 'UAA11I11B', 'ILOT'),
	(34, 30, 'API_UA12', 'API_UA12', 'AUTOMAT'),
	(35, 34, 'UA12A', 'UAA12I12A', 'ILOT'),
	(36, 34, 'UA12B', 'UAA12I12B', 'ILOT'),
	(37, 30, 'API_UA41', 'API_UA41', 'AUTOMAT'),
	(38, 37, 'UA41', 'UAA41I41', 'ILOT'),
	(39, 30, 'API_UA51', 'API_UA51', 'AUTOMAT'),
	(40, 39, 'UA51', 'UAA51I51', 'ILOT'),
	(41, 30, 'API_UA71', 'API_UA71', 'AUTOMAT'),
	(42, 41, 'UA71', 'UAA71I71', 'ILOT'),
	(43, 30, 'API_UA81', 'API_UA81', 'AUTOMAT'),
	(44, 43, 'UA81A', 'UAA81I81A', 'ILOT'),
	(45, 43, 'UA81B', 'UAA81I81B', 'ILOT'),
	(46, 29, 'UNITE ARRIERE', 'UR', 'SECTOR'),
	(47, 46, 'APIDUR21', 'APIDUR21', 'AUTOMAT'),
	(48, 47, 'ILOT_DUR21', 'DUR21ID21', 'ILOT'),
	(49, 46, 'APIGUR21', 'APIGUR21', 'AUTOMAT'),
	(50, 49, 'ILOT_GUR21', 'GUR21IG21', 'ILOT'),
	(51, 46, 'API_UR40', 'API_UR40', 'AUTOMAT'),
	(52, 51, 'ILOT UR40', 'URA40I40', 'ILOT'),
	(53, 46, 'API_UR45', 'API_UR45', 'AUTOMAT'),
	(54, 53, 'ILOT UR45', 'URA45I45', 'ILOT'),
	(55, 46, 'API_UR48', 'API_UR48', 'AUTOMAT'),
	(56, 55, 'ILOT UR48', 'URA48I48', 'ILOT'),
	(57, 46, 'API_UR50', 'API_UR50', 'AUTOMAT'),
	(58, 57, 'ILOT UR50A', 'URA50I50A', 'ILOT'),
	(59, 57, 'ILOT UR50B', 'URA50I50B', 'ILOT'),
	(60, 46, 'API_UR60', 'API_UR60', 'AUTOMAT'),
	(61, 60, 'ILOT UR60A', 'URA60I60A', 'ILOT'),
	(62, 60, 'ILOT UR60B', 'URA60I60B', 'ILOT'),
	(63, 29, 'TABLIER COLLECTEUR', 'TC', 'SECTOR'),
	(64, 63, 'API_TC10', 'API_TC10', 'AUTOMAT'),
	(65, 64, 'TC10', 'ILOT_TC10', 'ILOT'),
	(66, 63, 'API_TC11', 'API_TC11', 'AUTOMAT'),
	(67, 66, 'TC11', 'ILOT_TC11', 'ILOT'),
	(68, 63, 'API_TC20', 'API_TC20', 'AUTOMAT'),
	(69, 68, 'TC20', 'ILOT_TC20', 'ILOT'),
	(70, 63, 'API_TC21', 'API_TC21', 'AUTOMAT'),
	(71, 70, 'TC21', 'ILOT_TC21', 'ILOT'),
	(72, 63, 'API_TC22', 'API_TC22', 'AUTOMAT'),
	(73, 72, 'TC22', 'ILOT_TC22', 'ILOT'),
	(74, 63, 'API_TC30', 'API_TC30', 'AUTOMAT'),
	(75, 74, 'TC30', 'ILOT_TC30', 'ILOT'),
	(76, 63, 'API_TC31', 'API_TC31', 'AUTOMAT'),
	(77, 76, 'TC31', 'ILOT_TC31', 'ILOT'),
	(78, 63, 'API_TC50', 'API_TC50', 'AUTOMAT'),
	(79, 78, 'TC50', 'ILOT_TC50', 'ILOT'),
	(80, 29, 'TABLIER COLLECTEUR A9', 'TACOA9', 'SECTOR'),
	(81, 80, 'API_TK10', 'API_TK10API', 'AUTOMAT'),
	(82, 81, 'ILOT 1 TK10', 'API_TK10ILOT1', 'ILOT'),
	(83, 81, 'ILOT 2 TK10', 'API_TK10ILOT2', 'ILOT'),
	(84, 29, 'PLATEFORME', 'PF', 'SECTOR'),
	(85, 84, 'API_AA01 Doublure aile droite', 'API_AA01', 'AUTOMAT'),
	(86, 85, 'ILOT AA01', 'AAA01I01', 'ILOT'),
	(87, 84, 'API_AA02 Doublure aile gauche', 'API_AA02', 'AUTOMAT'),
	(88, 87, 'ILOT AA02', 'AAA02I02', 'ILOT'),
	(89, 87, 'ILOT AA03', 'AAA03I03', 'ILOT'),
	(90, 84, 'API_PF10', 'API_PF10', 'AUTOMAT'),
	(91, 90, 'ILOT PF10', 'PFA10I01', 'ILOT'),
	(92, 84, 'API_PF20', 'API_PF20', 'AUTOMAT'),
	(93, 92, 'ILOT PF20', 'PFA20I01', 'ILOT'),
	(94, 84, 'API_PF24', 'API_PF24', 'AUTOMAT'),
	(95, 94, 'ILOT PF24', 'PFA24I01', 'ILOT'),
	(96, 84, 'API_PF25', 'APIPF25', 'AUTOMAT'),
	(97, 96, 'ILOT PF25', 'PFA25I01', 'ILOT'),
	(98, 29, 'STYLE', 'ST', 'SECTOR'),
	(99, 98, 'API_ST10', 'API_ST10', 'AUTOMAT'),
	(100, 99, 'ILOT 1 ST10', 'STA10I10', 'ILOT'),
	(101, 98, 'API_ST20', 'API_ST20', 'AUTOMAT'),
	(102, 101, 'ILOT 1 ST20', 'STA20I20', 'ILOT'),
	(103, 98, 'API_ST21', 'API_ST21', 'AUTOMAT'),
	(104, 103, 'ILOT 1 ST21', 'STA21I21', 'ILOT'),
	(105, 98, 'API_ST30', 'API_ST30', 'AUTOMAT'),
	(106, 105, 'ILOT ST30', 'ST30I30', 'ILOT'),
	(107, 98, 'API_ST40', 'API_ST40', 'AUTOMAT'),
	(108, 107, 'ILOT 1 ST40', 'STA40I40', 'ILOT'),
	(109, 98, 'API_ST41', 'API_ST41', 'AUTOMAT'),
	(110, 109, 'ILOT 1 ST41', 'STA41I41', 'ILOT'),
	(111, 98, 'API_ST42', 'API_ST42', 'AUTOMAT'),
	(112, 111, 'ILOT 1 ST42', 'STA42I42', 'ILOT'),
	(113, 98, 'API_ST43', 'API_ST43', 'AUTOMAT'),
	(114, 113, 'ILOT 1 ST43', 'STA43I43', 'ILOT'),
	(115, 98, 'API_ST46', 'API_ST46', 'AUTOMAT'),
	(116, 115, 'ILOT 1 ST46', 'STA46I46', 'ILOT'),
	(117, 98, 'API_ST47', 'API_ST47', 'AUTOMAT'),
	(118, 117, 'ILOT 1 ST47', 'STA47I47', 'ILOT'),
	(119, 0, 'COTE DE CAISSE A9/B6', 'CDCA9', 'SECTOR'),
	(120, 119, 'Cote de Caisse A9 Commun', 'CDCA9C', 'SECTOR'),
	(121, 120, 'API_YR11', 'API_YR11API', 'AUTOMAT'),
	(122, 121, 'ILOT 1 YR11', 'API_YR11ILOT1', 'ILOT'),
	(123, 119, 'Cote de Caisse A9 Droite', 'CDCA9D', 'SECTOR'),
	(124, 123, 'API_YR01', 'API_YR01API', 'AUTOMAT'),
	(125, 124, 'ILOT 1 YR01', 'API_YR01ILOT1', 'ILOT'),
	(126, 123, 'API_YR03', 'API_YR03API', 'AUTOMAT'),
	(127, 126, 'ILOT 1 YR03', 'API_YR03ILOT1', 'ILOT'),
	(128, 123, 'API_YR06', 'API_YR06API', 'AUTOMAT'),
	(129, 128, 'ILOT 1 YR06', 'API_YR06ILOT1', 'ILOT'),
	(130, 123, 'API_YR08', 'API_YR08API', 'AUTOMAT'),
	(131, 130, 'ILOT 1 YR08', 'API_YR08ILOT1', 'ILOT'),
	(132, 130, 'ILOT 2 YR08', 'API_YR08ILOT2', 'ILOT'),
	(133, 119, 'Cote de Caisse A9 Gauche', 'CDCA9G', 'SECTOR'),
	(134, 133, 'API_YL01', 'API_YL01API', 'AUTOMAT'),
	(135, 134, 'ILOT 1 YL01', 'API_YL01ILOT1', 'ILOT'),
	(136, 133, 'API_YL03', 'API_YL03API', 'AUTOMAT'),
	(137, 136, 'ILOT 1 YL03', 'API_YL03ILOT1', 'ILOT'),
	(138, 133, 'API_YL06', 'API_YL06API', 'AUTOMAT'),
	(139, 138, 'ILOT 1 YL06', 'API_YL06ILOT1', 'ILOT'),
	(140, 133, 'API_YL08', 'API_YL08API', 'AUTOMAT'),
	(141, 140, 'ILOT 1 YL08', 'API_YL08ILOT1', 'ILOT'),
	(142, 140, 'ILOT 2 YL08', 'API_YL08ILOT2', 'ILOT'),
	(143, 0, 'MEF', 'ME', 'SECTOR'),
	(144, 143, 'API_LIA(4 et 5)', 'API_LIA5', 'AUTOMAT'),
	(145, 144, 'ILOT LIA4 Entree Peinture', 'LIA4I1', 'ILOT'),
	(146, 144, 'ILOT LIA5 Sortie MEF', 'LIA5I1', 'ILOT'),
	(147, 144, 'ILOT MEF2 ANDON', 'MEF2I12', 'ILOT'),
	(148, 143, 'AUTOMATE Process A7', 'API_ME20', 'AUTOMAT'),
	(149, 148, 'ILOT1 ME20', 'ME20I1', 'ILOT'),
	(150, 143, 'API_MEF1 Montage MEF', 'API_MEF1', 'AUTOMAT'),
	(151, 150, 'ILOT1 MEF1', 'MEF1I1', 'ILOT'),
	(152, 143, 'API_MEF2 Retouche MEF', 'API_MEF2', 'AUTOMAT'),
	(153, 152, 'ILOT1 MEF2', 'MEF2I1', 'ILOT'),
	(154, 0, 'MANUTENTION', 'MA', 'SECTOR'),
	(155, 154, 'LIAISON INTER ATELIER', 'LA', 'SECTOR'),
	(156, 155, 'AUTOMATE API_LIA1 Sortie Armature', 'API_LIA1', 'AUTOMAT'),
	(157, 156, 'ILOT 1 LIA1 Sortie Armature', 'LIA1I1', 'ILOT'),
	(158, 155, 'AUTOMATE API_LIA2 Entree Parachevement', 'API_LIA2', 'AUTOMAT'),
	(159, 158, 'ILOT 1 LIA2 Entree Parachevement', 'LIA2I1', 'ILOT'),
	(160, 155, 'AUTOMATE API_LIA3 Retour Peinture', 'API_LIA3', 'AUTOMAT'),
	(161, 160, 'ILOT1 LIA3 Retour Peinture', 'LIA3I1', 'ILOT'),
	(162, 155, 'AUTOMATE API_STO (1', ' 3 et CG Magelan)', 'API_STO'),
	(163, 162, 'ILOT API_STO1 Entree Stock Magelan', 'STOI1', 'ILOT'),
	(164, 162, 'ILOT API_STO3 Sortie Stock Magelan', 'STOI3', 'ILOT'),
	(165, 162, 'ILOT API_STOCG Magelan', 'STOICG', 'ILOT'),
	(166, 154, 'LIAISON INTER PROCES', 'LP', 'SECTOR'),
	(167, 166, 'AUTOMATE API_LIP1 Chargement Style', 'API_LIP1', 'AUTOMAT'),
	(168, 167, 'ILOT 1 LIP1', 'LIP1I1', 'ILOT'),
	(169, 166, 'AUTOMATE API_LIP2 Dechargement Armature', 'API_LIP2', 'AUTOMAT'),
	(170, 169, 'ILOT 1 LIP2', 'LIP2I1', 'ILOT'),
	(171, 166, 'AUTOMATE API_LIP3 CC', 'API_LIP3', 'AUTOMAT'),
	(172, 171, 'ILOT 1 LIP3', 'LIP3I1', 'ILOT'),
	(173, 166, 'AUTOMATE API_LIP4', 'API_LIP4', 'AUTOMAT'),
	(174, 173, 'ILOT 1 LIP4', 'LIP4I1', 'ILOT'),
	(175, 166, 'AUTOMATE API_LIP5', 'API_LIP5', 'AUTOMAT'),
	(176, 175, 'ILOT 1 LIP5', 'LIP5I1', 'ILOT'),
	(177, 175, 'ILOT 2 LIP5', 'LIP5I2', 'ILOT'),
	(178, 175, 'ILOT 3 LIP5', 'LIP5I3', 'ILOT'),
	(179, 166, 'API_LIP5DI_01', 'API_LIP5DI_01', 'AUTOMAT'),
	(180, 166, 'API_LIP5DI_02', 'API_LIP5DI_02', 'AUTOMAT'),
	(181, 166, 'API_LIP5DI_03', 'API_LIP5DI_03', 'AUTOMAT'),
	(182, 166, 'AUTOMATE API_LIP6', 'API_LIP6', 'AUTOMAT'),
	(183, 182, 'ILOT 1 LIP6', 'LIP6I1', 'ILOT'),
	(184, 0, 'PARACHEVEMENT', 'PA', 'SECTOR'),
	(185, 184, 'AUTOMATE API_PA20 Retouche', 'API_PA20', 'AUTOMAT'),
	(186, 185, 'ILOT 1 PA20', 'PAA20I1', 'ILOT'),
	(187, 184, 'AUTOMATE API_PA50 MIG-MAG', 'API_PA50', 'AUTOMAT'),
	(188, 187, 'ILOT 1 PA50', 'PAA50I1', 'ILOT'),
	(189, 184, 'AUTOMATE API_PA60 Laser', 'API_PA60', 'AUTOMAT'),
	(190, 189, 'ILOT 1 PA60 Laser', 'PAA60I1', 'ILOT'),
	(191, 0, 'OUVRANTS A9', 'OUVRANTSA9', 'SECTOR'),
	(192, 191, 'Portes AVG A9 API_HL10', 'API_HL10_1W', 'SECTOR'),
	(193, 192, 'AUTOMATE API_HL10', 'API_HL10API', 'AUTOMAT'),
	(194, 193, 'ILOT 1 HL10', 'API_HL10ILOT1', 'ILOT'),
	(195, 193, 'ILOT 2 HL10', 'API_HL10ILOT2', 'ILOT'),
	(196, 191, 'Portes AVD A9 API_HR10', 'API_HR10_1W', 'SECTOR'),
	(197, 196, 'AUTOMATE API_HR10', 'API_HR10API', 'AUTOMAT'),
	(198, 197, 'ILOT 1 HR10', 'API_HR10ILOT1', 'ILOT'),
	(199, 197, 'ILOT 2 HR10', 'API_HR10ILOT2', 'ILOT'),
	(200, 191, 'Portes ARG A9 API_JL10', 'API_JL10_1W', 'SECTOR'),
	(201, 200, 'AUTOMATE API_JL10', 'API_JL10API', 'AUTOMAT'),
	(202, 201, 'ILOT 1 JL10', 'API_JL10ILOT1', 'ILOT'),
	(203, 201, 'ILOT 2 JL10', 'API_JL10ILOT2', 'ILOT'),
	(204, 191, 'Portes ARD A9 API_JR10', 'API_JR10_1W', 'SECTOR'),
	(205, 204, 'AUTOMATE API_JR10', 'API_JR10API', 'AUTOMAT'),
	(206, 205, 'ILOT 1 JR10', 'API_JR10ILOT1', 'ILOT'),
	(207, 205, 'ILOT 2 JR10', 'API_JR10ILOT2', 'ILOT'),
	(208, 191, 'Capot A9 API_KP10', 'API_KP10_6W', 'SECTOR'),
	(209, 208, 'AUTOMATE API_KP10', 'API_KP10API', 'AUTOMAT'),
	(210, 209, 'ILOT 1 KP10', 'API_KP10ILOT1', 'ILOT'),
	(211, 191, 'Volet A9 API_VL10', 'API_VL10_5W', 'SECTOR'),
	(212, 211, 'AUTOMATE API_VL10', 'API_VL10API', 'AUTOMAT'),
	(213, 212, 'ILOT 1 VL10', 'API_VL10ILOT1', 'ILOT'),
	(214, 212, 'ILOT 2 VL10', 'API_VL10ILOT2', 'ILOT'),
	(215, 212, 'ILOT 3 VL10', 'API_VL10ILOT3', 'ILOT'),
	(216, 0, 'OUVRANTS A58', 'OUVRANTS A58', 'SECTOR'),
	(217, 216, 'AUTOMATE API_CH10 Capots', 'API_CH10', 'AUTOMAT'),
	(218, 217, 'ILOT CH10', 'OUCH10I10', 'ILOT'),
	(219, 216, 'AUTOMATE API_VH10 Volets', 'API_VH10', 'AUTOMAT'),
	(220, 219, 'ILOT VH10', 'OUVH10I10', 'ILOT'),
	(221, 216, 'AUTOMATE API_DG10 Prepa portes AVG', 'API_DG10', 'AUTOMAT'),
	(222, 221, 'ILOT DG10', 'OUDG10I10', 'ILOT'),
	(223, 216, 'AUTOMATE API_DD10 Prepa portes AVD', 'API_DD10', 'AUTOMAT'),
	(224, 223, 'ILOT DD10', 'OUDD10I10', 'ILOT'),
	(225, 216, 'AUTOMATE API_DC20 Portes AV', 'API_DC20', 'AUTOMAT'),
	(226, 225, 'ILOT DC20', 'OUDC20I20', 'ILOT'),
	(227, 216, 'AUTOMATE API_EC10 Portes AR', 'API_EC10', 'AUTOMAT'),
	(228, 227, 'ILOT EC10', 'OUEC10I10', 'ILOT'),
	(229, 0, 'COTE DE CAISSE A58', 'CCA58', 'SECTOR'),
	(230, 229, 'AUTOMATE API_FD10 Prepa anneau AV D', 'API_FD10', 'AUTOMAT'),
	(231, 230, 'ILOT FD10', 'CCFD10I10', 'ILOT'),
	(232, 229, 'AUTOMATE API_FG10 Prepa anneau AV G', 'API_FG10', 'AUTOMAT'),
	(233, 232, 'ILOT FG10', 'CCFG10I10', 'ILOT'),
	(234, 229, 'AUTOMATE API_FD20 Prepa custode AR D', 'API_FD20', 'AUTOMAT'),
	(235, 234, 'ILOT FD20', 'CCFD20I20', 'ILOT'),
	(236, 229, 'AUTOMATE API_FG20 Prepa custode AR G', 'API_FG20', 'AUTOMAT'),
	(237, 236, 'ILOT FG20', 'CCFG20I20', 'ILOT'),
	(238, 229, 'AUTOMATE API_FF30 Prepa fermeture AV', 'API_FF30', 'AUTOMAT'),
	(239, 238, 'ILOT FF30', 'CCFF30I30', 'ILOT'),
	(240, 229, 'AUTOMATE API_FD40 Finition CdC Droite', 'API_FD40', 'AUTOMAT'),
	(241, 240, 'ILOT FD40', 'CCFD40I40', 'ILOT'),
	(242, 229, 'AUTOMATE API_FG40 Finition CdC Gauche', 'API_FG40', 'AUTOMAT'),
	(243, 242, 'ILOT FG40', 'CCFG40I40', 'ILOT'),
	(244, 229, 'AUTOMATE API_FD50 Finition MIG CdC D', 'API_FD50', 'AUTOMAT'),
	(245, 244, 'ILOT FD50', 'CCFD50I50', 'ILOT'),
	(246, 229, 'AUTOMATE API_FG50 Finition MIG CdC G', 'API_FG50', 'AUTOMAT'),
	(247, 246, 'ILOT FG50', 'CCFG50I50', 'ILOT');
/*!40000 ALTER TABLE `lokalizacia` ENABLE KEYS */;

-- Exportování struktury pro pohled fer_db.countersview
-- Odebírání dočasné tabulky a vytváření struktury Pohledu
DROP TABLE IF EXISTS `countersview`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` VIEW `countersview` AS SELECT
	lokalizacia.bo_id,
	lokalizacia.nazov,
	lokalizacia.typ,
	counter.counters,
	counter.bo_table
FROM
	lokalizacia
INNER JOIN counter ON lokalizacia.lokalizacia_id = counter.lokalizacia_id ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;