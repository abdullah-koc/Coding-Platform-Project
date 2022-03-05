CREATE DATABASE  IF NOT EXISTS `syncoder_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `syncoder_db`;
-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: syncoder_db
-- ------------------------------------------------------
-- Server version	8.0.27

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
  `admin_id` int NOT NULL AUTO_INCREMENT,
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
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `answer_id` int NOT NULL,
  `user_answer` longtext,
  `try_count` int NOT NULL,
  `is_succeeded` bit(1) NOT NULL,
  `user_id` int NOT NULL,
  `question_id` int NOT NULL,
  `test_case_id` int DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `user_answer_id_idx` (`user_id`),
  KEY `question_answer_id_idx` (`question_id`),
  KEY `test_case_answer_id_idx` (`test_case_id`),
  CONSTRAINT `question_answer_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`),
  CONSTRAINT `test_case_answer_id` FOREIGN KEY (`test_case_id`) REFERENCES `test_cases` (`test_case_id`),
  CONSTRAINT `user_answer_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  PRIMARY KEY (`category_id`)
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
  PRIMARY KEY (`choice_description`)
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
-- Table structure for table `coding_challenge_test_case`
--

DROP TABLE IF EXISTS `coding_challenge_test_case`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coding_challenge_test_case` (
  `coding_challenge_id` int NOT NULL,
  `test_case_id` int NOT NULL,
  PRIMARY KEY (`coding_challenge_id`,`test_case_id`),
  KEY `test_case_id_idx` (`test_case_id`),
  CONSTRAINT `coding_challenge_id` FOREIGN KEY (`coding_challenge_id`) REFERENCES `coding_challenges` (`coding_challenge_id`),
  CONSTRAINT `test_case_id` FOREIGN KEY (`test_case_id`) REFERENCES `test_cases` (`test_case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coding_challenge_test_case`
--

LOCK TABLES `coding_challenge_test_case` WRITE;
/*!40000 ALTER TABLE `coding_challenge_test_case` DISABLE KEYS */;
/*!40000 ALTER TABLE `coding_challenge_test_case` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coding_challenges`
--

DROP TABLE IF EXISTS `coding_challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coding_challenges` (
  `coding_challenge_id` int NOT NULL,
  `programming_language` varchar(45) NOT NULL,
  PRIMARY KEY (`coding_challenge_id`),
  CONSTRAINT `question_coding_id` FOREIGN KEY (`coding_challenge_id`) REFERENCES `questions` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coding_challenges`
--

LOCK TABLES `coding_challenges` WRITE;
/*!40000 ALTER TABLE `coding_challenges` DISABLE KEYS */;
/*!40000 ALTER TABLE `coding_challenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(45) NOT NULL,
  `company_photo_url` varchar(150) DEFAULT NULL,
  `company_address` varchar(150) NOT NULL,
  `company_phone_number` varchar(45) NOT NULL,
  `company_email` varchar(45) NOT NULL,
  `is_approved` bit(1) NOT NULL,
  `password` varchar(45) NOT NULL,
  `admin_id` int NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `company_id_UNIQUE` (`company_id`),
  KEY `admin_id_idx` (`admin_id`),
  CONSTRAINT `comp_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`)
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
  `company_id` int NOT NULL,
  `contest_id` int NOT NULL,
  `money` int NOT NULL,
  PRIMARY KEY (`company_id`,`contest_id`),
  KEY `contest_company_id_idx` (`contest_id`),
  CONSTRAINT `company_contest_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`),
  CONSTRAINT `contest_company_id` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`)
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
  `contest_id` int NOT NULL,
  `contest_name` varchar(45) NOT NULL,
  `contest_photo_url` varchar(150) DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `prize` varchar(150) DEFAULT NULL,
  `creation_date` datetime NOT NULL,
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
  `editor_id` int NOT NULL,
  `contest_id` int NOT NULL,
  PRIMARY KEY (`editor_id`,`contest_id`),
  KEY `contest_editor_id_idx` (`contest_id`),
  CONSTRAINT `contest_editor_id` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`),
  CONSTRAINT `editor_contest_id` FOREIGN KEY (`editor_id`) REFERENCES `editors` (`editor_id`)
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
  `editor_id` int NOT NULL,
  `experience_level` varchar(45) NOT NULL,
  `salary` int NOT NULL,
  `admin_id` int NOT NULL,
  `cv_url` varchar(150) NOT NULL,
  PRIMARY KEY (`editor_id`),
  KEY `admin_id_idx` (`admin_id`),
  CONSTRAINT `admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`),
  CONSTRAINT `person_id` FOREIGN KEY (`editor_id`) REFERENCES `people` (`id`)
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
  `interview_id` int NOT NULL,
  `question_id` int NOT NULL,
  PRIMARY KEY (`interview_id`,`question_id`),
  KEY `questiob_interview_id_idx` (`question_id`),
  CONSTRAINT `interview_question_id` FOREIGN KEY (`interview_id`) REFERENCES `interviews` (`interview_id`),
  CONSTRAINT `questiob_interview_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`)
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
  `interview_id` int NOT NULL AUTO_INCREMENT,
  `interview_name` varchar(45) NOT NULL,
  `interview_date` datetime NOT NULL,
  `duration` int NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`interview_id`),
  KEY `company_id_idx` (`company_id`),
  CONSTRAINT `company_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`)
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
-- Table structure for table `non_coding_question_choice`
--

DROP TABLE IF EXISTS `non_coding_question_choice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `non_coding_question_choice` (
  `non_coding_question_id` int NOT NULL,
  `choice_description` varchar(300) NOT NULL,
  PRIMARY KEY (`non_coding_question_id`,`choice_description`),
  KEY `choice_description_non_coding_question_id_idx` (`choice_description`),
  CONSTRAINT `choice_description_non_coding_question_id` FOREIGN KEY (`choice_description`) REFERENCES `choices` (`choice_description`),
  CONSTRAINT `non_coding_question_choice_id` FOREIGN KEY (`non_coding_question_id`) REFERENCES `non_coding_questions` (`non_coding_question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `non_coding_question_choice`
--

LOCK TABLES `non_coding_question_choice` WRITE;
/*!40000 ALTER TABLE `non_coding_question_choice` DISABLE KEYS */;
/*!40000 ALTER TABLE `non_coding_question_choice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `non_coding_questions`
--

DROP TABLE IF EXISTS `non_coding_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `non_coding_questions` (
  `non_coding_question_id` int NOT NULL,
  `type_description` varchar(1000) NOT NULL,
  PRIMARY KEY (`non_coding_question_id`),
  CONSTRAINT `question_non_coding_id` FOREIGN KEY (`non_coding_question_id`) REFERENCES `questions` (`question_id`)
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
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `photo_url` varchar(150) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `is_confirmed` bit(1) NOT NULL,
  `reg_date` datetime NOT NULL,
  `birth_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `editor_id` FOREIGN KEY (`id`) REFERENCES `editors` (`editor_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_contest`
--

DROP TABLE IF EXISTS `question_contest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_contest` (
  `question_id` int NOT NULL,
  `contest_id` int NOT NULL,
  PRIMARY KEY (`question_id`,`contest_id`),
  KEY `contest_question_id_idx` (`contest_id`),
  CONSTRAINT `contest_question_id` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`),
  CONSTRAINT `question_contest_id` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`)
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
  `question_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `explanation` varchar(5000) NOT NULL,
  `question_duration` int NOT NULL,
  `difficulty` varchar(45) NOT NULL,
  `question_point` int NOT NULL,
  `solution` longtext,
  `max_try` int NOT NULL,
  `like_count` int NOT NULL,
  `dislike_count` int NOT NULL,
  `creation_date` datetime NOT NULL,
  `category_id` int NOT NULL,
  `editor_id` int DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `ccategory_id_idx` (`category_id`),
  KEY `editor_id_idx` (`editor_id`),
  KEY `company_question_id_idx` (`company_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `company_question_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`),
  CONSTRAINT `editor_question_id` FOREIGN KEY (`editor_id`) REFERENCES `editors` (`editor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_cases`
--

DROP TABLE IF EXISTS `test_cases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_cases` (
  `test_case_id` int NOT NULL,
  `example_input` varchar(500) NOT NULL,
  `example_output` varchar(500) NOT NULL,
  PRIMARY KEY (`test_case_id`)
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
  `user_id` int NOT NULL,
  `contest_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`contest_id`),
  KEY `contest_user_id_idx` (`contest_id`),
  CONSTRAINT `contest_user_id` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`),
  CONSTRAINT `user_contest_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `school` varchar(45) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  `cur_company` varchar(45) DEFAULT NULL,
  `success_rate` int DEFAULT NULL,
  `user_point` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `id` FOREIGN KEY (`user_id`) REFERENCES `people` (`id`)
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
-- Table structure for table `users_interview`
--

DROP TABLE IF EXISTS `users_interview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_interview` (
  `user_id` int NOT NULL,
  `interview_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`interview_id`),
  KEY `interview_id_idx` (`interview_id`),
  CONSTRAINT `interview_id` FOREIGN KEY (`interview_id`) REFERENCES `interviews` (`interview_id`),
  CONSTRAINT `user_interview_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_interview`
--

LOCK TABLES `users_interview` WRITE;
/*!40000 ALTER TABLE `users_interview` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_interview` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-05 20:19:14
