CREATE DATABASE  IF NOT EXISTS `syncoder_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `syncoder_db`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: syncoder_db
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` varchar(20) NOT NULL,
  `admin_name` varchar(45) NOT NULL,
  `admin_email` varchar(45) NOT NULL,
  `admin_password` varchar(45) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attempt_test_case`
--

DROP TABLE IF EXISTS `attempt_test_case`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attempt_test_case` (
  `attempt_id` varchar(20) NOT NULL,
  `test_case_id` varchar(20) NOT NULL,
  `is_passed` bit(1) NOT NULL DEFAULT b'0',
  `coding_question_id` varchar(20) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  PRIMARY KEY (`attempt_id`,`test_case_id`,`coding_question_id`,`user_id`),
  KEY `test_case_atmpt_id_idx` (`test_case_id`),
  CONSTRAINT `atmpt_test_id` FOREIGN KEY (`attempt_id`) REFERENCES `attempts` (`attempt_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `test_case_atmpt_id` FOREIGN KEY (`test_case_id`) REFERENCES `test_cases` (`test_case_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attempt_test_case`
--

LOCK TABLES `attempt_test_case` WRITE;
/*!40000 ALTER TABLE `attempt_test_case` DISABLE KEYS */;
/*!40000 ALTER TABLE `attempt_test_case` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attempts`
--

DROP TABLE IF EXISTS `attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attempts` (
  `attempt_id` varchar(20) NOT NULL,
  `user_answer` longtext NOT NULL,
  `try_count` int NOT NULL DEFAULT '0',
  `is_solved` bit(1) NOT NULL DEFAULT b'0',
  `user_id` varchar(20) NOT NULL,
  `question_id` varchar(20) NOT NULL,
  `programming_language` varchar(45) NOT NULL,
  PRIMARY KEY (`attempt_id`,`user_id`,`question_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `question_id_idx` (`question_id`),
  CONSTRAINT `q_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `u_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attempts`
--

LOCK TABLES `attempts` WRITE;
/*!40000 ALTER TABLE `attempts` DISABLE KEYS */;
/*!40000 ALTER TABLE `attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `choices`
--

DROP TABLE IF EXISTS `choices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `choices` (
  `choice_description` varchar(300) NOT NULL,
  `is_correct` bit(1) NOT NULL,
  `non_coding_question_id` varchar(20) NOT NULL,
  PRIMARY KEY (`choice_description`),
  KEY `non_coding_question_id_idx` (`non_coding_question_id`),
  CONSTRAINT `nqd_id` FOREIGN KEY (`non_coding_question_id`) REFERENCES `non_coding_questions` (`non_coding_question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choices`
--

LOCK TABLES `choices` WRITE;
/*!40000 ALTER TABLE `choices` DISABLE KEYS */;
/*!40000 ALTER TABLE `choices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coding_questions`
--

DROP TABLE IF EXISTS `coding_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coding_questions` (
  `coding_question_id` varchar(20) NOT NULL,
  `video_link` varchar(500) DEFAULT NULL,
  `video_request_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`coding_question_id`),
  CONSTRAINT `question_id` FOREIGN KEY (`coding_question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coding_questions`
--

LOCK TABLES `coding_questions` WRITE;
/*!40000 ALTER TABLE `coding_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `coding_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `company_id` varchar(20) NOT NULL,
  `company_name` varchar(45) NOT NULL,
  `company_photo` varchar(1000) DEFAULT NULL,
  `company_address` varchar(300) DEFAULT NULL,
  `company_phone` varchar(300) DEFAULT NULL,
  `company_email` varchar(45) NOT NULL,
  `company_password` varchar(45) NOT NULL,
  `is_approved` bit(1) NOT NULL DEFAULT b'0',
  `admin_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `company_email_UNIQUE` (`company_email`),
  KEY `admin_id_idx` (`admin_id`),
  CONSTRAINT `admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_contest`
--

DROP TABLE IF EXISTS `company_contest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_contest` (
  `company_id` varchar(20) NOT NULL,
  `contest_id` varchar(20) NOT NULL,
  `money` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`company_id`,`contest_id`),
  KEY `contest_com_id_idx` (`contest_id`),
  CONSTRAINT `company_con_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contest_com_id` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_contest`
--

LOCK TABLES `company_contest` WRITE;
/*!40000 ALTER TABLE `company_contest` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_contest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contests`
--

DROP TABLE IF EXISTS `contests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contests` (
  `contest_id` varchar(20) NOT NULL,
  `contest_name` varchar(45) NOT NULL,
  `contest_photo` varchar(300) DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `prize` varchar(500) DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contest_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contests`
--

LOCK TABLES `contests` WRITE;
/*!40000 ALTER TABLE `contests` DISABLE KEYS */;
/*!40000 ALTER TABLE `contests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editor_contest`
--

DROP TABLE IF EXISTS `editor_contest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `editor_contest` (
  `editor_id` varchar(20) NOT NULL,
  `contest_id` varchar(20) NOT NULL,
  PRIMARY KEY (`editor_id`,`contest_id`),
  KEY `contest_editor_id_idx` (`contest_id`),
  CONSTRAINT `contest_editor_id` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `editor_contest_id` FOREIGN KEY (`editor_id`) REFERENCES `editors` (`editor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editor_contest`
--

LOCK TABLES `editor_contest` WRITE;
/*!40000 ALTER TABLE `editor_contest` DISABLE KEYS */;
/*!40000 ALTER TABLE `editor_contest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editors`
--

DROP TABLE IF EXISTS `editors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `editors` (
  `editor_id` varchar(20) NOT NULL,
  `experience_level` varchar(45) NOT NULL,
  `salary` int NOT NULL DEFAULT '0',
  `admin_id` varchar(20) DEFAULT NULL,
  `cv` longtext NOT NULL,
  `is_approved` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`editor_id`),
  KEY `admin-id_idx` (`admin_id`),
  CONSTRAINT `admin-id` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `person-id` FOREIGN KEY (`editor_id`) REFERENCES `people` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editors`
--

LOCK TABLES `editors` WRITE;
/*!40000 ALTER TABLE `editors` DISABLE KEYS */;
/*!40000 ALTER TABLE `editors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview_question`
--

DROP TABLE IF EXISTS `interview_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interview_question` (
  `interview_id` varchar(20) NOT NULL,
  `question_id` varchar(20) NOT NULL,
  PRIMARY KEY (`interview_id`,`question_id`),
  KEY `question_i_id_idx` (`question_id`),
  CONSTRAINT `interview_q_id` FOREIGN KEY (`interview_id`) REFERENCES `interviews` (`interview_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_i_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview_question`
--

LOCK TABLES `interview_question` WRITE;
/*!40000 ALTER TABLE `interview_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `interview_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interviews`
--

DROP TABLE IF EXISTS `interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interviews` (
  `interview_id` varchar(20) NOT NULL,
  `interview_name` varchar(45) NOT NULL,
  `interview_date` datetime NOT NULL,
  `interview_duration` int NOT NULL DEFAULT '0',
  `company_id` varchar(20) NOT NULL,
  PRIMARY KEY (`interview_id`),
  KEY `comp_id_idx` (`company_id`),
  CONSTRAINT `comp_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interviews`
--

LOCK TABLES `interviews` WRITE;
/*!40000 ALTER TABLE `interviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `interviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `non_coding_questions`
--

DROP TABLE IF EXISTS `non_coding_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `non_coding_questions` (
  `non_coding_question_id` varchar(20) NOT NULL,
  `type_description` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`non_coding_question_id`),
  CONSTRAINT `non_coding_question_id` FOREIGN KEY (`non_coding_question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `non_coding_questions`
--

LOCK TABLES `non_coding_questions` WRITE;
/*!40000 ALTER TABLE `non_coding_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `non_coding_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `people` (
  `person_id` varchar(20) NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `photo` varchar(250) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `is_confirmed` bit(1) NOT NULL DEFAULT b'0',
  `reg_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `birth_date` datetime DEFAULT NULL,
  PRIMARY KEY (`person_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  KEY `nickname_index` (`nickname`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insertUser` AFTER INSERT ON `people` FOR EACH ROW BEGIN
IF (NEW.person_id IS NOT NULL AND  NEW.person_id LIKE 'U%') THEN
INSERT INTO users(user_id) VALUES(NEW.person_id); 
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insertEditor` AFTER INSERT ON `people` FOR EACH ROW BEGIN
IF (NEW.person_id IS NOT NULL AND  NEW.person_id LIKE 'E%') THEN
INSERT INTO editors(editor_id) VALUES(NEW.person_id); 
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `question_category`
--

DROP TABLE IF EXISTS `question_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_category` (
  `question_id` varchar(20) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`question_id`,`category_name`),
  KEY `c_q_id_idx` (`category_name`),
  CONSTRAINT `c_q_id` FOREIGN KEY (`category_name`) REFERENCES `categories` (`category_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `q_c_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_category`
--

LOCK TABLES `question_category` WRITE;
/*!40000 ALTER TABLE `question_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `question_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_contest`
--

DROP TABLE IF EXISTS `question_contest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_contest` (
  `question_id` varchar(20) NOT NULL,
  `contest_id` varchar(20) NOT NULL,
  PRIMARY KEY (`question_id`,`contest_id`),
  KEY `contest_quest_id_idx` (`contest_id`),
  CONSTRAINT `contest_quest_id` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_con_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_contest`
--

LOCK TABLES `question_contest` WRITE;
/*!40000 ALTER TABLE `question_contest` DISABLE KEYS */;
/*!40000 ALTER TABLE `question_contest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `question_id` varchar(20) NOT NULL,
  `title` varchar(45) NOT NULL,
  `explanation` varchar(5000) NOT NULL,
  `question_duration` int NOT NULL DEFAULT '0',
  `difficulty` varchar(45) NOT NULL,
  `question_point` int NOT NULL DEFAULT '0',
  `solution` longtext,
  `max_try` int NOT NULL DEFAULT '0',
  `is_contest` bit(1) NOT NULL DEFAULT b'0',
  `like_count` int NOT NULL DEFAULT '0',
  `dislike_count` int NOT NULL DEFAULT '0',
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `editor_id` varchar(20) DEFAULT NULL,
  `company_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `editor_id_idx` (`editor_id`),
  KEY `company_id_idx` (`company_id`),
  KEY `title_index` (`title`) USING BTREE,
  CONSTRAINT `company_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `editor_id` FOREIGN KEY (`editor_id`) REFERENCES `editors` (`editor_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insertCodingQuestion` AFTER INSERT ON `questions` FOR EACH ROW BEGIN
IF (NEW.question_id IS NOT NULL AND  NEW.question_id LIKE 'CQ%') THEN
INSERT INTO coding_questions(coding_question_id) VALUES(NEW.question_id); 
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insertNonCodingQuestion` AFTER INSERT ON `questions` FOR EACH ROW BEGIN
IF (NEW.question_id IS NOT NULL AND  NEW.question_id LIKE 'NCQ%') THEN
INSERT INTO non_coding_questions(non_coding_question_id) VALUES(NEW.question_id); 
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `statusbar`
--

DROP TABLE IF EXISTS `statusbar`;
/*!50001 DROP VIEW IF EXISTS `statusbar`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `statusbar` AS SELECT 
 1 AS `nickname`,
 1 AS `difficulty`,
 1 AS `total`,
 1 AS `corrects`,
 1 AS `Name_exp_5`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `test_cases`
--

DROP TABLE IF EXISTS `test_cases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_cases` (
  `example_input` longtext NOT NULL,
  `example_output` longtext NOT NULL,
  `test_case_id` varchar(20) NOT NULL,
  `is_locked` bit(1) NOT NULL,
  `coding_question_id` varchar(20) NOT NULL,
  PRIMARY KEY (`test_case_id`,`coding_question_id`),
  KEY `coding_q_id_idx` (`coding_question_id`),
  CONSTRAINT `coding_q_id` FOREIGN KEY (`coding_question_id`) REFERENCES `coding_questions` (`coding_question_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_cases`
--

LOCK TABLES `test_cases` WRITE;
/*!40000 ALTER TABLE `test_cases` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_cases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_contest`
--

DROP TABLE IF EXISTS `user_contest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_contest` (
  `user_id` varchar(20) NOT NULL,
  `contest_id` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`,`contest_id`),
  KEY `cont_user_id_idx` (`contest_id`),
  CONSTRAINT `cont_user_id` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_cont_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_contest`
--

LOCK TABLES `user_contest` WRITE;
/*!40000 ALTER TABLE `user_contest` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_contest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_interview`
--

DROP TABLE IF EXISTS `user_interview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_interview` (
  `user_id` varchar(20) NOT NULL,
  `interview_id` varchar(20) NOT NULL,
  `is_passed` bit(1) NOT NULL,
  PRIMARY KEY (`user_id`,`interview_id`),
  KEY `inter_user_id_idx` (`interview_id`),
  CONSTRAINT `inter_user_id` FOREIGN KEY (`interview_id`) REFERENCES `interviews` (`interview_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_inter_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_interview`
--

LOCK TABLES `user_interview` WRITE;
/*!40000 ALTER TABLE `user_interview` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_interview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_question`
--

DROP TABLE IF EXISTS `user_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_question` (
  `user_id` varchar(20) NOT NULL,
  `coding_question_id` varchar(20) NOT NULL,
  `is_resolved` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`user_id`,`coding_question_id`),
  KEY `q_user_id_idx` (`coding_question_id`),
  CONSTRAINT `q_user_id` FOREIGN KEY (`coding_question_id`) REFERENCES `coding_questions` (`coding_question_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_q_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_question`
--

LOCK TABLES `user_question` WRITE;
/*!40000 ALTER TABLE `user_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(20) NOT NULL,
  `school` varchar(45) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  `cur_company` varchar(45) DEFAULT NULL,
  `success_rate` int DEFAULT '0',
  `user_point` int DEFAULT '0',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `person_id` FOREIGN KEY (`user_id`) REFERENCES `people` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'syncoder_db'
--

--
-- Dumping routines for database 'syncoder_db'
--

--
-- Final view structure for view `statusbar`
--

/*!50001 DROP VIEW IF EXISTS `statusbar`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `statusbar` AS select `p`.`nickname` AS `nickname`,`q`.`difficulty` AS `difficulty`,count(`a`.`question_id`) AS `total`,sum((case when (`a`.`is_solved` = 1) then 1 else 0 end)) AS `corrects`,((sum((case when (`a`.`is_solved` = 1) then 1 else 0 end)) / count(`a`.`question_id`)) * 100) AS `Name_exp_5` from ((`attempts` `a` join `questions` `q`) join `people` `p`) where ((`a`.`user_id` = `p`.`person_id`) and (`q`.`question_id` = `a`.`question_id`) and `a`.`try_count` >= all (select `a2`.`try_count` from `attempts` `a2` where (`a`.`question_id` = `a2`.`question_id`))) group by `p`.`nickname`,`q`.`difficulty` order by `q`.`difficulty` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-17 17:03:38
CREATE OR REPLACE VIEW statusBar AS
SELECT
       p.nickname,
       q.difficulty,
       COUNT(a.question_id) as total,
       SUM(CASE WHEN is_solved = 1 THEN 1 ELSE 0 END) AS corrects,
       SUM(CASE WHEN is_solved = 1 THEN 1 ELSE 0 END) / COUNT(a.question_id) * 100
FROM attempts a, questions q, people p
WHERE a.user_id = p.person_id AND q.question_id = a.question_id AND a.try_count >= ALL(SELECT try_count FROM attempts a2 WHERE a.question_id = a2.question_id)
GROUP BY p.nickname, q.difficulty
ORDER BY q.difficulty;
CREATE INDEX nickname_index USING BTREE ON people(nickname);
CREATE INDEX title_index USING BTREE ON questions(title);
