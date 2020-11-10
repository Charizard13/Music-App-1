# music_app_backend
CREATE DATABASE  IF NOT EXISTS `music_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `music_app`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: music_app
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `album_id` int NOT NULL AUTO_INCREMENT,
  `artist_id` int NOT NULL,
  `album_name` varchar(255) NOT NULL,
  `cover_img_link` text NOT NULL,
  `created_at` date NOT NULL,
  `upload_at` date DEFAULT NULL,
  `youtube_link` varchar(255) NOT NULL,
  PRIMARY KEY (`album_id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (1,1,'Dark Lane Demo Tapes','https://www.youtube.com/watch?v=LDMTjY-https://www.youtube.com/watch?v=JFm7YDVlqnI','2019-08-09','2019-08-09','https://www.youtube.com/watch?v=LDMTjY-QgD0&list=PLqEwRgo0ltuWL3K6mli2KnYjc4st6aIEf'),(2,2,'Yagos Firsts','https://www.youtube.com/watch?v=ZuvOulBtpyM','2019-08-09','2019-08-09','https://www.youtube.com/watch?v=TLV4_xaYynY'),(3,5,'בר עושה ראפ','https://www.youtube.com/watch?v=UZVQaWQaHcY','2019-08-09','2019-08-09','https://www.youtube.com/watch?v=UZVQaWQaHcY');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `artist_id` int NOT NULL AUTO_INCREMENT,
  `artist_name` varchar(255) NOT NULL,
  `create_at` date NOT NULL,
  `upload_at` date NOT NULL,
  `youtube_link` varchar(255) NOT NULL,
  `cover_img_link` varchar(255) NOT NULL,
  PRIMARY KEY (`artist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'Drake','2009-06-06','2015-03-03','https://www.youtube.com/watch?v=JFm7YDVlqnI','https://img.youtube.com/vi/JFm7YDVlqnI/hqdefault.jpg'),(2,'Yagos','2018-03-22','2018-03-22','https://www.youtube.com/watch?v=ZuvOulBtpyM','https://img.youtube.com/vi/ZuvOulBtpyM/hqdefault.jpg'),(3,'דקל וקנין','2017-10-19','2017-10-19','https://www.youtube.com/watch?v=aU7G36uleOk','https://www.youtube.com/watch?v=aU7G36uleOk'),(4,'Mac Miller ','2009-01-05','2009-01-05','https://www.youtube.com/watch?v=oOuSAchSjpw','https://www.youtube.com/watch?v=oOuSAchSjpw'),(5,'בר עושה ראפ','2019-08-15','2019-08-15','https://www.youtube.com/watch?v=UZVQaWQaHcY','https://www.youtube.com/watch?v=UZVQaWQaHcY');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interactions`
--

DROP TABLE IF EXISTS `interactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interactions` (
  `dummy_data_id` int NOT NULL AUTO_INCREMENT,
  `user_name_id` int NOT NULL,
  `song_id` int NOT NULL,
  `is_liked` tinyint(1) NOT NULL COMMENT 'false as deafualt',
  `play_count` int NOT NULL,
  `created_at` date NOT NULL,
  `playlist_id` int NOT NULL,
  PRIMARY KEY (`dummy_data_id`),
  KEY `user_name_id` (`user_name_id`),
  KEY `playlist_id` (`playlist_id`),
  CONSTRAINT `interactions_ibfk_1` FOREIGN KEY (`user_name_id`) REFERENCES `users` (`user_name_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `interactions_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interactions`
--

LOCK TABLES `interactions` WRITE;
/*!40000 ALTER TABLE `interactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `interactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists` (
  `playlist_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cover_img_link` text NOT NULL,
  `user_name_id` int NOT NULL,
  `upload_at` date NOT NULL,
  PRIMARY KEY (`playlist_id`),
  KEY `user_name_id` (`user_name_id`),
  CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`user_name_id`) REFERENCES `users` (`user_name_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

LOCK TABLES `playlists` WRITE;
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
INSERT INTO `playlists` VALUES (1,'workout','https://www.youtube.com/watch?v=4aUBc2CCpI4',1,'2015-03-03'),(2,'study','https://www.youtube.com/watch?v=SzakaMO9LuQ',1,'2015-03-03');
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists_songs`
--

DROP TABLE IF EXISTS `playlists_songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists_songs` (
  `playlist_id` int NOT NULL,
  `song_id` int NOT NULL,
  PRIMARY KEY (`playlist_id`,`song_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `playlists_songs_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `playlists_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists_songs`
--

LOCK TABLES `playlists_songs` WRITE;
/*!40000 ALTER TABLE `playlists_songs` DISABLE KEYS */;
INSERT INTO `playlists_songs` VALUES (2,1),(1,2),(2,3),(1,4),(1,5),(2,6),(2,7),(2,8),(1,9);
/*!40000 ALTER TABLE `playlists_songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `song_id` int NOT NULL AUTO_INCREMENT,
  `youtube_link` varchar(255) NOT NULL,
  `album_id` int NOT NULL,
  `artist_id` int NOT NULL,
  `song_name` varchar(255) NOT NULL,
  `length` time NOT NULL,
  `track_number` int DEFAULT NULL,
  `lycris` text,
  `created_at` date DEFAULT NULL,
  `upload_at` date DEFAULT NULL,
  `cover_img_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`song_id`),
  KEY `album_id` (`album_id`),
  KEY `songs_ibfk_2` (`artist_id`),
  CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `albums` (`artist_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,'https://www.youtube.com/watch?v=LDMTjY-QgD0',1,1,'Deep Pockets','03:43:00',1,NULL,NULL,NULL,NULL),(2,'https://www.youtube.com/watch?v=0jz0GAFNNIo',1,1,'When To Say When & Chicago Freestyle','04:41:00',2,NULL,NULL,NULL,NULL),(3,'https://www.youtube.com/watch?v=ZX_mvoY_Hg0',1,1,'Not You Too  ft. Chris Brown','04:30:00',3,NULL,NULL,NULL,NULL),(4,'https://www.youtube.com/watch?v=xWggTb45brM',1,1,'Toosie Slide','05:11:00',4,NULL,NULL,NULL,NULL),(5,'https://www.youtube.com/watch?v=nGXCuAHEjYI',1,1,'Desires','03:58:00',5,NULL,NULL,NULL,NULL),(6,'https://www.youtube.com/watch?v=OjgBxXNP3gw',1,1,'Time Flies','03:13:00',6,NULL,NULL,NULL,NULL),(7,'https://www.youtube.com/watch?v=f6c-fg4_wRY',2,2,'A dog named DONNY','00:03:01',1,NULL,NULL,NULL,NULL),(8,'https://www.youtube.com/watch?v=Jq6DkU_kdtw',2,2,'The crying machine','00:04:07',2,NULL,NULL,NULL,NULL),(9,'https://www.youtube.com/watch?v=yB-_9bVv38w',2,2,'Canto de ossanha ','00:04:51',3,NULL,NULL,NULL,NULL),(10,'https://www.youtube.com/watch?v=UZVQaWQaHcY',3,5,'הקוסם מארץ בלוז','00:02:29',1,NULL,NULL,NULL,NULL),(11,'https://www.youtube.com/watch?v=fkXapdkhsz4',3,5,'אתנול וג\'ין','00:04:17',2,NULL,NULL,NULL,NULL),(12,'https://www.youtube.com/watch?v=jqxzunO_jGg',3,5,'דג קטן','00:03:50',3,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_name_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) DEFAULT NULL COMMENT 'defualt false',
  `preferences(JSON)` json DEFAULT NULL,
  `remember_token` tinyint(1) DEFAULT NULL COMMENT 'deafualt false',
  PRIMARY KEY (`user_name_id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'tal','talpivena9@gmail.com','2015-09-09','password',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-22  9:06:25
