-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: portfolio_db
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `status` enum('draft','published') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `published_at` timestamp NULL DEFAULT NULL,
  `read_time` int NOT NULL DEFAULT '5',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blogs_slug_unique` (`slug`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'Advanced Laravel Performance Optimization Techniques','advanced-laravel-performance-optimization','Discover powerful methods to boost your Laravel application\'s performance, from database optimization to caching strategies.','<p>Optimizing Laravel application performance is crucial for user experience and scalability.</p><h2>Database Optimization</h2><p>Database queries are often the bottleneck. Ensure you are:</p><ul><li>Using proper indexing on frequently queried columns.</li><li>Eager loading relationships to avoid N+1 query problems.</li><li>Batching inserts and updates when dealing with large datasets.</li></ul><h2>Caching Strategies</h2><p>Caching can drastically reduce the load on your database and server. Consider using Redis or Memcached for application-level caching.</p>','http://localhost:8000/storage/blogs/1772705846_uDMF4UcJRE.png','[\"Laravel\", \"PHP\", \"Performance\"]','published','2026-02-28 03:22:34',8,'2026-03-05 03:22:34','2026-03-05 04:47:29'),(2,'Building Scalable RESTful APIs with PHP','building-scalable-restful-apis-with-php','Learn best practices for creating robust and scalable APIs that can handle thousands of requests efficiently.','<p>A well-designed RESTful API is the backbone of modern web and mobile applications.</p><h2>API Design Principles</h2><p>Follow REST conventions: use proper HTTP methods, status codes, and resource naming.</p><h2>Authentication</h2><p>Use Laravel Sanctum or Passport for token-based API authentication.</p>','http://localhost:8000/storage/blogs/1772705861_lIaV8s4Pol.png','[\"APIs\", \"PHP\", \"Laravel\"]','published','2026-02-23 03:22:34',12,'2026-03-05 03:22:34','2026-03-05 04:47:43'),(3,'MySQL Query Optimization: From Slow to Lightning Fast','mysql-query-optimization','Transform your slow database queries into high-performance operations with these proven optimization strategies.','<p>Slow MySQL queries can cripple your application\'s performance.</p><h2>Indexing</h2><p>Add indexes to columns used in WHERE, JOIN, and ORDER BY clauses.</p><h2>Query Analysis</h2><p>Use EXPLAIN to understand how MySQL executes your queries and identify bottlenecks.</p>','http://localhost:8000/storage/blogs/1772705873_13u6d1YT6C.png','[\"Database\", \"MySQL\", \"Performance\"]','published','2026-02-18 03:22:34',10,'2026-03-05 03:22:34','2026-03-05 04:47:55'),(4,'PHP 8.3 New Features Every Developer Should Know','php-83-new-features','Explore the latest PHP 8.4 features including readonly classes, new array functions, and performance improvements.','<p>PHP 8.4 brings several exciting improvements to the language.</p><h2>Typed Class Constants</h2><p>You can now declare typed constants in classes, interfaces, and traits.</p><h2>Override Attribute</h2><p>The new #[Override] attribute helps detect mistakes when overriding parent methods.</p>','http://localhost:8000/storage/blogs/1772705886_ziuU6mk9qU.png','[\"PHP\", \"Tips & Tricks\"]','published','2026-02-13 03:22:34',6,'2026-03-05 03:22:34','2026-03-05 04:48:14'),(5,'Top 10 PHP Security Best Practices for 2025','php-security-best-practices-2025','Essential security practices every PHP developer must implement to protect their applications from common vulnerabilities.','<p>Security should never be an afterthought in PHP development.</p><h2>SQL Injection Prevention</h2><p>Always use prepared statements and parameterized queries.</p><h2>XSS Prevention</h2><p>Sanitize all user input and use htmlspecialchars() when outputting data.</p>','http://localhost:8000/storage/blogs/1772705905_QiJhndzNWX.png','[\"PHP\", \"Security\", \"Tips & Tricks\"]','published','2026-02-08 03:22:34',9,'2026-03-05 03:22:34','2026-03-05 04:48:28');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `educations`
--

DROP TABLE IF EXISTS `educations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institution` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `degree` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `field_of_study` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_year` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `grade` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educations`
--

LOCK TABLES `educations` WRITE;
/*!40000 ALTER TABLE `educations` DISABLE KEYS */;
INSERT INTO `educations` VALUES (1,'Rajasthan Technical University, Kota','B.Tech','Information Technology','2008','2012',NULL,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(2,'D.B.N. School, Ajmer','Senior Secondary','Science and Mathematics','2006','2008',NULL,'2026-03-05 03:22:34','2026-03-05 03:22:34');
/*!40000 ALTER TABLE `educations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiences`
--

DROP TABLE IF EXISTS `experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiences` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT '0',
  `technologies` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiences`
--

LOCK TABLES `experiences` WRITE;
/*!40000 ALTER TABLE `experiences` DISABLE KEYS */;
INSERT INTO `experiences` VALUES (1,'RG InfoTech (Recursive Global InfoTech Pvt. Ltd.), Jaipur','Sr PHP Developer','Designed, developed, and maintained 6-7 scalable web applications using PHP and Laravel framework, ensuring 100% alignment with client requirements and technical specifications. Led full-stack backend development efforts across multiple concurrent projects while maintaining strict code quality standards and documentation. Engineered and deployed RESTful APIs for seamless third-party service and payment gateway integrations, enhancing system interoperability. Conducted comprehensive code reviews and mentored junior developers on Laravel best practices, design patterns, and system architecture. Implemented coding standards and best practices across team, resulting in improved code maintainability and reduced technical debt. Identified and executed process improvements that increased team productivity by optimizing development workflows and CI/CD practices.','Jan 2024','Mar 2025',0,'[\"PHP\", \"Laravel\", \"MySQL\", \"RESTful APIs\", \"Payment Gateway\", \"CI/CD\"]','2026-03-05 03:22:34','2026-03-05 03:22:34'),(2,'SimplifyVMS, Noida','Senior Software Engineer','Served as key backend engineer for large-scale Vendor Management System (VMS) handling complex business logic and high transaction volumes. Engineered optimized backend services emphasizing high performance, scalability, security, and fault tolerance for enterprise-level operations. Architected database schemas and optimized queries to improve system performance by 30%, supporting millions of vendor records. Collaborated with cross-functional teams (frontend, QA, DevOps) to integrate backend systems with user-facing applications and ensure seamless functionality. Provided technical guidance, code reviews, and mentorship to development team members on architecture and implementation strategies. Managed multiple projects simultaneously while maintaining strict deadlines and delivering consistently high-quality code. Conducted comprehensive testing, debugging, and troubleshooting across production systems, ensuring 99.5% uptime.','Jun 2022','Dec 2023',0,'[\"PHP\", \"Laravel\", \"MySQL\", \"RESTful APIs\", \"Agile\", \"DevOps\"]','2026-03-05 03:22:34','2026-03-05 03:22:34'),(3,'Matellio Inc., Jaipur','Software Engineer III','Functioned as key backend developer contributing to development and maintenance of mission-critical client projects using PHP and related technologies. Developed and integrated RESTful APIs for seamless data exchange between client systems and third-party platforms. Actively participated in code reviews, technical design discussions, and agile ceremonies while adhering to strict development methodologies. Consistently met aggressive project deadlines through effective time management, prioritization, and proactive communication. Analyzed complex technical requirements and proposed optimized solutions aligned with business objectives and technical constraints.','Nov 2021','Jun 2022',0,'[\"PHP\", \"Laravel\", \"MySQL\", \"RESTful APIs\", \"Agile\"]','2026-03-05 03:22:34','2026-03-05 03:22:34'),(4,'Appinop Technologies, Jaipur','Sr. Web Developer','Developed custom modules, features, and extensions for diverse web applications utilizing PHP frameworks across multiple industry verticals. Contributed to database design and optimization initiatives resulting in improved application performance and reduced load times. Enhanced website security by identifying and addressing vulnerabilities, implementing encryption protocols, and following secure coding practices. Collaborated with project managers and clients to understand requirements and translate them into scalable technical solutions.','Apr 2021','Nov 2021',0,'[\"PHP\", \"MySQL\", \"Security\", \"Database Optimization\"]','2026-03-05 03:22:34','2026-03-05 03:22:34'),(5,'The NineHertz, Jaipur','PHP Developer','Developed responsive web applications primarily using Yii 1 framework with practical exposure to CakePHP, MongoDB, WordPress, and Lumen. Contributed to both frontend and backend development across diverse projects, demonstrating full-stack capabilities. Implemented responsive web design and optimization techniques, improving user experience metrics and page load performance. Coded using HTML5, CSS3, JavaScript, jQuery, and Bootstrap to create dynamic, user-friendly interfaces.','May 2019','Nov 2020',0,'[\"PHP\", \"Yii\", \"CakePHP\", \"MongoDB\", \"WordPress\", \"Lumen\", \"JavaScript\", \"Bootstrap\"]','2026-03-05 03:22:34','2026-03-05 03:22:34'),(6,'Yellow Objects Solutions Pvt. Ltd., Jaipur','PHP Developer','Developed and maintained multiple PHP-based web applications according to project requirements and client specifications. Optimized server-side code and database queries to enhance application performance and system efficiency. Wrote clean, well-documented server-side and client-side code using PHP, HTML5, CSS3, and JavaScript.','Feb 2018','Mar 2019',0,'[\"PHP\", \"MySQL\", \"HTML5\", \"CSS3\", \"JavaScript\"]','2026-03-05 03:22:34','2026-03-05 03:22:34'),(7,'Blueberry Softech Private Limited, Ajmer','Associate Web Developer','Developed web-based applications using PHP, MySQL, AJAX, and CodeIgniter framework. Created intuitive user interfaces using HTML5, CSS3, and Bootstrap framework. Assisted senior developers in development tasks, debugging, and testing, gaining experience across full development lifecycle. Mentored junior developers, fostering collaborative learning environment and knowledge sharing within the development team.','Sep 2015','Sep 2017',0,'[\"PHP\", \"MySQL\", \"CodeIgniter\", \"AJAX\", \"HTML5\", \"CSS3\", \"Bootstrap\"]','2026-03-05 03:22:34','2026-03-05 03:22:34');
/*!40000 ALTER TABLE `experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_02_28_064153_create_personal_access_tokens_table',1),(5,'2026_02_28_064818_create_profiles_table',1),(6,'2026_02_28_064827_create_skills_table',1),(7,'2026_02_28_064839_create_experiences_table',1),(8,'2026_02_28_064851_create_educations_table',1),(9,'2026_02_28_064900_create_projects_table',1),(10,'2026_02_28_064909_create_blogs_table',1),(11,'2026_02_28_064916_create_contacts_table',1),(12,'2026_02_28_064924_create_settings_table',1),(13,'2026_03_05_053341_add_role_to_users_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'admin-token','061b13e2fef3ea6ba6d9779712612560e4ac2d31744c86f5d57f609afad1471a','[\"*\"]','2026-03-05 04:58:57',NULL,'2026-03-05 03:26:31','2026-03-05 04:58:57');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `github_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linkedin_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'Aadhar Gaur','Senior PHP Developer | Backend Specialist | Laravel & Yii Expert','Results-driven developer with 10+ years of experience in backend development, specializing in scalable web applications and RESTful API development.','aadhar41@gmail.com','+91-7737138843','Jaipur, Rajasthan, India','https://github.com/aadhar41','https://www.linkedin.com/in/aadhar-gaur-php','/img/AboutAadhar.jpg','2026-03-05 03:22:34','2026-03-05 03:22:34');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `long_description` longtext COLLATE utf8mb4_unicode_ci,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `live_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `github_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `technologies` json NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'00001 Mern Stack The Complete Full Stack Javascript','00001 - MERN Stack - The Complete Full-Stack Javascript Course!','00001 - MERN Stack - The Complete Full-Stack Javascript Course!','https://raw.githubusercontent.com/aadhar41/00001-mern-stack-the-complete-full-stack-javascript/master/public/00001-mern-stack-the-complete-full-stack-javascript.png',NULL,'https://github.com/aadhar41/00001-mern-stack-the-complete-full-stack-javascript','[\"JavaScript\"]','web',0,1,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(2,'Aadhar Gaur Portfolio React','My personal portfolio website ReactJs','My personal portfolio website ReactJs','https://raw.githubusercontent.com/aadhar41/aadhar-gaur-portfolio-react/master/public/aadhar-gaur-portfolio-react.png',NULL,'https://github.com/aadhar41/aadhar-gaur-portfolio-react','[\"TypeScript\"]','web',0,2,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(3,'Aadhar Portfolio Laravel Breeze Reactjs','Aadhar Portfolio Laravel Breeze Reactjs','Aadhar Portfolio Laravel Breeze Reactjs','https://raw.githubusercontent.com/aadhar41/aadhar-portfolio-laravel-breeze-reactjs/master/public/aadhar-portfolio-laravel-breeze-reactjs.png',NULL,'https://github.com/aadhar41/aadhar-portfolio-laravel-breeze-reactjs','[\"HTML\"]','web',0,3,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(4,'Aadhar41.github.io','Code that\'ll help you kickstart a personal website that showcases your work as a software developer.','Code that\'ll help you kickstart a personal website that showcases your work as a software developer.','https://raw.githubusercontent.com/aadhar41/aadhar41.github.io/master/public/aadhar41.github.io.png','https://github.dev','https://github.com/aadhar41/aadhar41.github.io','[\"HTML\"]','web',0,4,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(5,'Accordion','A React component that displays a list of questions and answers in an accordion style, allowing users to toggle visibility.','A React component that displays a list of questions and answers in an accordion style, allowing users to toggle visibility.','https://raw.githubusercontent.com/aadhar41/accordion/master/public/accordion.png',NULL,'https://github.com/aadhar41/accordion','[\"HTML5\", \"CSS3\", \"ReactJs\"]','web',1,5,'2026-03-05 03:22:34','2026-03-05 04:57:38'),(6,'BirdSquawk Service','Building Microservices with Node, React and Mongo','Building Microservices with Node, React and Mongo','https://raw.githubusercontent.com/aadhar41/BirdSquawk-Service/master/public/BirdSquawk-Service.png',NULL,'https://github.com/aadhar41/BirdSquawk-Service','[\"JavaScript\"]','web',0,6,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(7,'Birthday Reminder','A simple React application to manage and view daily birthday reminders.','A simple React application to manage and view daily birthday reminders.','https://raw.githubusercontent.com/aadhar41/birthday-reminder/master/public/birthday-reminder.png','https://birthday-reminder-app-reactjs.netlify.app/','https://github.com/aadhar41/birthday-reminder','[\"css3\", \"git\", \"github\", \"html5\", \"nodejs\", \"npm\", \"react\", \"reactjs\"]','web',1,7,'2026-03-05 03:22:34','2026-03-05 04:58:50'),(8,'Blurry Loading','06 Day 5 - Blurry Loading','06 Day 5 - Blurry Loading','https://raw.githubusercontent.com/aadhar41/blurry-loading/master/public/blurry-loading.png',NULL,'https://github.com/aadhar41/blurry-loading','[\"CSS\"]','web',0,8,'2026-03-05 03:22:34','2026-03-05 03:27:36'),(9,'Book Reviews','This is a Laravel-based web application designed for managing and reading book reviews. It allows users to browse through a collection of books, read detailed reviews, and share their own perspectives. The application aims to provide a clean and organized platform for book lovers.','This is a Laravel-based web application designed for managing and reading book reviews. It allows users to browse through a collection of books, read detailed reviews, and share their own perspectives. The application aims to provide a clean and organized platform for book lovers.','https://raw.githubusercontent.com/aadhar41/book-reviews/master/public/book-reviews.png',NULL,'https://github.com/aadhar41/book-reviews','[\"PHP\"]','web',1,9,'2026-03-05 03:22:34','2026-03-05 04:09:50'),(10,'Books React Book Listing Application','A React-based book listing application that displays a curated collection of self-help and motivational books with an interactive user interface.','A React-based book listing application that displays a curated collection of self-help and motivational books with an interactive user interface.','http://localhost:8000/storage/projects/1772701122_aCRISYsCn9.png',NULL,'https://github.com/aadhar41/Books-React-Book-Listing-Application','[\"JavaScript\"]','web',1,10,'2026-03-05 03:22:34','2026-03-05 03:28:44'),(11,'Car Rental','car rental project build in Laravel 8','car rental project build in Laravel 8','http://localhost:8000/storage/projects/1772704083_mnYFiMADgf.png',NULL,'https://github.com/aadhar41/car-rental','[\"Blade\"]','web',0,11,'2026-03-05 03:22:34','2026-03-05 04:18:06'),(12,'Charulekh Prakashan','Charulekh Prakashan is a Jaipur-based publisher and supplier of devotional books, spiritual products, and incense items. With over 34 years of experience, we have built an enviable reputation in the spiritual publishing industry across India.','Charulekh Prakashan is a Jaipur-based publisher and supplier of devotional books, spiritual products, and incense items. With over 34 years of experience, we have built an enviable reputation in the spiritual publishing industry across India.','https://raw.githubusercontent.com/aadhar41/charulekh-prakashan/master/public/charulekh-prakashan.png',NULL,'https://github.com/aadhar41/charulekh-prakashan','[\"HTML\"]','web',0,12,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(13,'Charulekh Prakashan Html','Charulekh Prakashan Website HTML Template','Charulekh Prakashan Website HTML Template','https://raw.githubusercontent.com/aadhar41/charulekh-prakashan-html/master/public/charulekh-prakashan-html.png',NULL,'https://github.com/aadhar41/charulekh-prakashan-html','[\"HTML\"]','web',0,13,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(14,'Chat App','A modern, real-time chat application built with Node.js, Socket.io, and Bootstrap that brings people together through instant messaging.','A modern, real-time chat application built with Node.js, Socket.io, and Bootstrap that brings people together through instant messaging.','http://localhost:8000/storage/projects/1772701007_ddei0jPKjJ.png','https://chat-app-o089.onrender.com/','https://github.com/aadhar41/chat-app','[\"CSS\"]','web',1,14,'2026-03-05 03:22:34','2026-03-05 03:26:50'),(15,'Chatroom Php Mysql Ratchet','General Chat application build in PHP, mysql, ratchet library..http://socketo.me/docs/install','General Chat application build in PHP, mysql, ratchet library..http://socketo.me/docs/install','https://raw.githubusercontent.com/aadhar41/chatroom-php-mysql-ratchet/master/public/chatroom-php-mysql-ratchet.png',NULL,'https://github.com/aadhar41/chatroom-php-mysql-ratchet','[\"PHP\"]','web',0,15,'2026-03-05 03:22:34','2026-03-05 03:29:08'),(16,'Color Generator','A React application that generates tints and shades of a given color. Users can input a hex color code to generate a palette and copy color values to the clipboard with a single click.','A React application that generates tints and shades of a given color. Users can input a hex color code to generate a palette and copy color values to the clipboard with a single click.','https://raw.githubusercontent.com/aadhar41/color-generator/master/public/color-generator.png','https://color-generator-reactjs-app.netlify.app/','https://github.com/aadhar41/color-generator','[\"CSS\"]','web',1,16,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(17,'Css Our Services','Project 2 - Our Services Responsive Grid','Project 2 - Our Services Responsive Grid','https://raw.githubusercontent.com/aadhar41/css-our-services/master/public/css-our-services.png',NULL,'https://github.com/aadhar41/css-our-services','[\"HTML\"]','web',0,17,'2026-03-05 03:22:34','2026-03-05 03:29:38'),(18,'Dark Mode','This is a simple React application that demonstrates how to implement a dark mode feature.','This is a simple React application that demonstrates how to implement a dark mode feature.','http://localhost:8000/storage/projects/1772701257_ibbxXnE7Xb.png','https://dark-mode-reactjs.netlify.app/','https://github.com/aadhar41/dark-mode','[\"JavaScript\"]','web',1,18,'2026-03-05 03:22:34','2026-03-05 03:30:59'),(19,'Day 1','Designing HTML and CSS Collapse Panel / Expending Cards','Designing HTML and CSS Collapse Panel / Expending Cards','https://raw.githubusercontent.com/aadhar41/day-1/master/public/day-1.png',NULL,'https://github.com/aadhar41/day-1','[\"HTML\"]','web',0,19,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(20,'Day 2','03 Day 2 - Progress Steps HTML and CSS','03 Day 2 - Progress Steps HTML and CSS','https://raw.githubusercontent.com/aadhar41/day-2/master/public/day-2.png',NULL,'https://github.com/aadhar41/day-2','[\"JavaScript\"]','web',0,20,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(21,'Events Management App','The Events Management App is a robust web application designed to simplify the organization, scheduling, and management of events. Built with Laravel, this app offers intuitive features for event planners and participants alike, ensuring seamless coordination and hassle-free event management.','The Events Management App is a robust web application designed to simplify the organization, scheduling, and management of events. Built with Laravel, this app offers intuitive features for event planners and participants alike, ensuring seamless coordination and hassle-free event management.','http://localhost:8000/storage/projects/1772701306_fb6gM0dJsb.png',NULL,'https://github.com/aadhar41/events-management-app','[\"PHP\"]','web',1,21,'2026-03-05 03:22:34','2026-03-05 03:31:48'),(22,'Github Users','Github Users','Github Users','https://raw.githubusercontent.com/aadhar41/github-users/master/public/github-users.png',NULL,'https://github.com/aadhar41/github-users','[\"JavaScript\"]','web',1,22,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(23,'Grocery Bud','A sleek and responsive React application designed to help you manage your grocery list efficiently. With built-in local storage persistence, your items remain saved even after a page refresh.','A sleek and responsive React application designed to help you manage your grocery list efficiently. With built-in local storage persistence, your items remain saved even after a page refresh.','http://localhost:8000/storage/projects/1772701356_qvC0GCX1aV.png','https://grocery-budreact.netlify.app/','https://github.com/aadhar41/grocery-bud','[\"CSS\"]','web',1,23,'2026-03-05 03:22:34','2026-03-05 03:32:37'),(24,'Hacker News','A modern React application for searching and browsing Hacker News stories with an intuitive interface. Search for articles, view story details, and navigate through results with smooth pagination.','A modern React application for searching and browsing Hacker News stories with an intuitive interface. Search for articles, view story details, and navigate through results with smooth pagination.','http://localhost:8000/storage/projects/1772701460_vfFii3T71C.png','https://hacker-news-article.netlify.app/','https://github.com/aadhar41/hacker-news','[\"JavaScript\"]','web',1,24,'2026-03-05 03:22:34','2026-03-05 03:34:22'),(25,'Hidden Search Widget','Day 4 - Hidden Search Widget','Day 4 - Hidden Search Widget','https://raw.githubusercontent.com/aadhar41/hidden-search-widget/master/public/hidden-search-widget.png',NULL,'https://github.com/aadhar41/hidden-search-widget','[\"HTML\"]','web',0,25,'2026-03-05 03:22:34','2026-03-05 03:34:59'),(26,'Itemapi','A laravel backend api system.','A laravel backend api system.','https://raw.githubusercontent.com/aadhar41/itemapi/master/public/itemapi.png',NULL,'https://github.com/aadhar41/itemapi','[\"PHP\"]','api',0,26,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(27,'Jsdsa','Javascript DSA','Javascript DSA','https://raw.githubusercontent.com/aadhar41/jsdsa/master/public/jsdsa.png',NULL,'https://github.com/aadhar41/jsdsa','[\"JavaScript\"]','web',0,27,'2026-03-05 03:22:34','2026-03-05 03:35:16'),(28,'Laravel 8 Adminlte','Laravel 8 Adminlte Blank Panel Integrated with, Sanctum For API, telescope For Debugging, Vue Js For Frontend.  Basic Admin Panel Setup for Laravel','Laravel 8 Adminlte Blank Panel Integrated with, Sanctum For API, telescope For Debugging, Vue Js For Frontend.  Basic Admin Panel Setup for Laravel','https://raw.githubusercontent.com/aadhar41/laravel-8-adminlte/master/public/laravel-8-adminlte.png',NULL,'https://github.com/aadhar41/laravel-8-adminlte','[\"Blade\"]','api',0,28,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(29,'Laravel 8 Sanctrum','A Basic Laravel 8 Application for laravel sanctrum API Authuntication.','A Basic Laravel 8 Application for laravel sanctrum API Authuntication.','https://raw.githubusercontent.com/aadhar41/laravel-8-sanctrum/master/public/laravel-8-sanctrum.png',NULL,'https://github.com/aadhar41/laravel-8-sanctrum','[\"PHP\"]','api',0,29,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(30,'Laravel Admin','Admin LTE 3 Implementation in Laravel 8 a basic admin panel setup with most common plugins added time to time.','Admin LTE 3 Implementation in Laravel 8 a basic admin panel setup with most common plugins added time to time.','https://raw.githubusercontent.com/aadhar41/laravel-admin/master/public/laravel-admin.png',NULL,'https://github.com/aadhar41/laravel-admin','[\"Blade\"]','web',0,30,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(31,'Laravel Advance','Advance features / Topics related to Laravel','Advance features / Topics related to Laravel','https://raw.githubusercontent.com/aadhar41/laravel-advance/master/public/laravel-advance.png',NULL,'https://github.com/aadhar41/laravel-advance','[\"PHP\"]','web',0,31,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(32,'Laravel Blog Admin','A basic admin panel build in laravel using AdminLTE 3 & laravel auth ( Journal controller contain image thumbnail code ) & multiple file upload is in ArticleController.php','A basic admin panel build in laravel using AdminLTE 3 & laravel auth ( Journal controller contain image thumbnail code ) & multiple file upload is in ArticleController.php','https://raw.githubusercontent.com/aadhar41/laravel-blog-admin/master/public/laravel-blog-admin.png',NULL,'https://github.com/aadhar41/laravel-blog-admin','[\"HTML\"]','web',0,32,'2026-03-05 03:22:34','2026-03-05 03:33:17'),(33,'Laravel Blog Swagger','Basic Laravel blog with passport authentication and swagger API documentation.','Basic Laravel blog with passport authentication and swagger API documentation.','https://raw.githubusercontent.com/aadhar41/laravel-blog-swagger/master/public/laravel-blog-swagger.png',NULL,'https://github.com/aadhar41/laravel-blog-swagger','[\"PHP\"]','api',0,33,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(34,'Laravel Datatable','The repository contain laravel framework with integrated datatable ( yajra-datatable ) & it uses database custom seeder to seed/insert data into table. i have used a custom database seeder (UserSeeder) to seed data into user table & i have also used faker library for seeding fake data in table. This is just a basic example how you can use yajara-datatable & You can create Your own table seeder to insert fake/dummy data in table.','The repository contain laravel framework with integrated datatable ( yajra-datatable ) & it uses database custom seeder to seed/insert data into table. i have used a custom database seeder (UserSeeder) to seed data into user table & i have also used faker library for seeding fake data in table. This is just a basic example how you can use yajara-datatable & You can create Your own table seeder to insert fake/dummy data in table.','https://raw.githubusercontent.com/aadhar41/laravel-datatable/master/public/laravel-datatable.png',NULL,'https://github.com/aadhar41/laravel-datatable','[\"PHP\"]','web',0,34,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(35,'Laravel Payments','Payment Gateways Implementation With Laravel','Payment Gateways Implementation With Laravel','https://raw.githubusercontent.com/aadhar41/laravel-payments/master/public/laravel-payments.png',NULL,'https://github.com/aadhar41/laravel-payments','[\"PHP\"]','web',0,35,'2026-03-05 03:22:34','2026-03-05 03:35:31'),(36,'Laravel Playground','Projects Includes various Laravel features Currently E-Mail Functionality.','Projects Includes various Laravel features Currently E-Mail Functionality.','https://raw.githubusercontent.com/aadhar41/laravel-playground/master/public/laravel-playground.png',NULL,'https://github.com/aadhar41/laravel-playground','[\"PHP\"]','web',0,36,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(37,'Laravel Qa','Full Stack Laravel QA Application Development Laravel 8 (Stack Overflow Clone)','Full Stack Laravel QA Application Development Laravel 8 (Stack Overflow Clone)','http://localhost:8000/storage/projects/1772704340_lAjl9ZIXhJ.png',NULL,'https://github.com/aadhar41/laravel-qa','[\"PHP\"]','web',1,37,'2026-03-05 03:22:34','2026-03-05 04:22:23'),(38,'Laravel Qa Old','A full-featured Question & Answer application built with Laravel 7, designed for developers who want to create a community-driven Q&A platform similar to Stack Overflow. This project provides a solid foundation for building interactive Q&A websites with user authentication, question management, and answer functionality.','A full-featured Question & Answer application built with Laravel 7, designed for developers who want to create a community-driven Q&A platform similar to Stack Overflow. This project provides a solid foundation for building interactive Q&A websites with user authentication, question management, and answer functionality.','https://raw.githubusercontent.com/aadhar41/laravel-qa-old/master/public/laravel-qa-old.png',NULL,'https://github.com/aadhar41/laravel-qa-old','[\"PHP\"]','web',0,38,'2026-03-05 03:22:34','2026-03-05 03:36:42'),(39,'Laravel Task List','Laravel Task List is a streamlined task management application built using the Laravel framework. It helps users organize, track, and manage their daily tasks efficiently with an intuitive UI and robust backend functionalities.','Laravel Task List is a streamlined task management application built using the Laravel framework. It helps users organize, track, and manage their daily tasks efficiently with an intuitive UI and robust backend functionalities.','http://localhost:8000/storage/projects/1772701592_rfjJTu4lr5.png',NULL,'https://github.com/aadhar41/laravel-task-list','[\"PHP\"]','web',1,39,'2026-03-05 03:22:34','2026-03-05 03:36:34'),(40,'Laravel10 Blog','A comprehensive Laravel 10 practice repository featuring authentication, blog functionality, real-time events, and modern development practices. Perfect for learning Laravel 10 features, implementing best practices, and building production-ready applications. | Laravel 10  Personal Blog','A comprehensive Laravel 10 practice repository featuring authentication, blog functionality, real-time events, and modern development practices. Perfect for learning Laravel 10 features, implementing best practices, and building production-ready applications. | Laravel 10  Personal Blog','http://localhost:8000/storage/projects/1772701659_1U4GjZnLQG.jpg',NULL,'https://github.com/aadhar41/laravel10-Blog','[\"PHP\"]','web',1,40,'2026-03-05 03:22:34','2026-03-05 03:37:41'),(41,'Laravel12','Laravel Event, Listener, Jobs and Queue with Email sending. ','Laravel Event, Listener, Jobs and Queue with Email sending. ','https://raw.githubusercontent.com/aadhar41/laravel12/master/public/laravel12.png',NULL,'https://github.com/aadhar41/laravel12','[\"PHP\"]','web',0,41,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(42,'Laravel12 React','Laravel12 React','Laravel12 React','https://raw.githubusercontent.com/aadhar41/laravel12-react/master/public/laravel12-react.png',NULL,'https://github.com/aadhar41/laravel12-react','[\"JavaScript\"]','web',0,42,'2026-03-05 03:22:34','2026-03-05 03:37:58'),(43,'Livewire Poll App','07 - Project #4 - Livewire Poll App | A real-time polling application built with Laravel and Livewire. This application allows users to create polls and vote on them instantly without page reloads, demonstrating the power of the TALL stack ecosystem (Tailwind, Alpine.js, Laravel, Livewire).','07 - Project #4 - Livewire Poll App | A real-time polling application built with Laravel and Livewire. This application allows users to create polls and vote on them instantly without page reloads, demonstrating the power of the TALL stack ecosystem (Tailwind, Alpine.js, Laravel, Livewire).','https://raw.githubusercontent.com/aadhar41/livewire-poll-app/master/public/livewire-poll-app.png',NULL,'https://github.com/aadhar41/livewire-poll-app','[\"PHP\"]','web',1,43,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(44,'Lorem Ipsum','A React application that generates various types of \"Lorem Ipsum\" text to spice up your placeholders. Instead of the standard boring Latin, choose from a variety of fun and unique text styles including Hipster, Zombie, Cat, and more!','A React application that generates various types of \"Lorem Ipsum\" text to spice up your placeholders. Instead of the standard boring Latin, choose from a variety of fun and unique text styles including Hipster, Zombie, Cat, and more!','http://localhost:8000/storage/projects/1772701803_wUCrDp6c32.png','https://lorem-ipsum-gen-react.netlify.app/','https://github.com/aadhar41/lorem-ipsum','[\"CSS\"]','web',1,44,'2026-03-05 03:22:34','2026-03-05 03:40:06'),(45,'Medical Recruitment','A medical staff recruitment web application build in Laravel 8','A medical staff recruitment web application build in Laravel 8','https://raw.githubusercontent.com/aadhar41/medical-recruitment/master/public/medical-recruitment.png',NULL,'https://github.com/aadhar41/medical-recruitment','[\"Blade\"]','web',1,45,'2026-03-05 03:22:34','2026-03-05 04:25:52'),(46,'MERN Ecommerce Site','ShopIT is a full-featured e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a robust backend API for managing products, users, orders, and authentication, making it a solid foundation for any online store.','ShopIT is a full-featured e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a robust backend API for managing products, users, orders, and authentication, making it a solid foundation for any online store.','https://raw.githubusercontent.com/aadhar41/MERN-Ecommerce-Site/master/public/MERN-Ecommerce-Site.png',NULL,'https://github.com/aadhar41/MERN-Ecommerce-Site','[\"HTML\"]','api',1,46,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(47,'Mern Stack Backend','Backend build in loopback4 for MERN Stack Project.','Backend build in loopback4 for MERN Stack Project.','https://raw.githubusercontent.com/aadhar41/mern-stack-backend/master/public/mern-stack-backend.png',NULL,'https://github.com/aadhar41/mern-stack-backend','[\"TypeScript\"]','web',0,47,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(48,'Moview Db','A modern, responsive React application that allows users to search and explore movies using the OMDB API. Built with React 18, React Router, and Context API for efficient state management.','A modern, responsive React application that allows users to search and explore movies using the OMDB API. Built with React 18, React Router, and Context API for efficient state management.','http://localhost:8000/storage/projects/1772702030_zUhMO0K8WV.png','https://movie-db-listing.netlify.app/','https://github.com/aadhar41/moview-db','[\"JavaScript\"]','api',1,48,'2026-03-05 03:22:34','2026-03-05 03:43:52'),(49,'News Application','MERN Stack News Application with Tailwind CSS','MERN Stack News Application with Tailwind CSS','https://raw.githubusercontent.com/aadhar41/news-application/master/public/news-application.png',NULL,'https://github.com/aadhar41/news-application','[\"JavaScript\"]','web',0,49,'2026-03-05 03:22:34','2026-03-05 03:44:08'),(50,'Nodejs Chat App','Node.js Real-Time Chat Application is a simple yet powerful real-time chat application built using Node.js, Express, and Socket.io. This project demonstrates real-time communication between clients and server using WebSockets, allowing users to chat instantly without page refreshes.','Node.js Real-Time Chat Application is a simple yet powerful real-time chat application built using Node.js, Express, and Socket.io. This project demonstrates real-time communication between clients and server using WebSockets, allowing users to chat instantly without page refreshes.','https://raw.githubusercontent.com/aadhar41/nodejs-chat-app/master/public/nodejs-chat-app.png','https://adg-chat-app.herokuapp.com/','https://github.com/aadhar41/nodejs-chat-app','[\"HTML\"]','web',0,50,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(51,'Object Oriented Programming In Javascript','Object Oriented Programming In Javascript','Object Oriented Programming In Javascript','https://raw.githubusercontent.com/aadhar41/object-oriented-programming-in-javascript/master/public/object-oriented-programming-in-javascript.png',NULL,'https://github.com/aadhar41/object-oriented-programming-in-javascript','[\"HTML\"]','web',0,51,'2026-03-05 03:22:34','2026-03-05 03:44:24'),(52,'Portfolio Website','A comprehensive Content Management System (CMS) based Portfolio Builder built with Laravel. This application allows users to dynamically manage their portfolio website content, including Hero sections, About details, Services, Skills, Portfolio items, and more, all through a secure Admin Dashboard.','A comprehensive Content Management System (CMS) based Portfolio Builder built with Laravel. This application allows users to dynamically manage their portfolio website content, including Hero sections, About details, Services, Skills, Portfolio items, and more, all through a secure Admin Dashboard.','http://localhost:8000/storage/projects/1772702193_pvrz4bUwiH.png',NULL,'https://github.com/aadhar41/portfolio-website','[\"JavaScript\"]','web',1,52,'2026-03-05 03:22:34','2026-03-05 03:46:37'),(53,'Portfolio Website Fundamental','Laravel - Build Complete Portfolio Website','Laravel - Build Complete Portfolio Website','https://raw.githubusercontent.com/aadhar41/portfolio-website-fundamental/master/public/portfolio-website-fundamental.png',NULL,'https://github.com/aadhar41/portfolio-website-fundamental','[\"PHP\"]','web',0,53,'2026-03-05 03:22:34','2026-03-05 03:47:13'),(54,'Quiz','A dynamic and interactive Quiz application built with React, leveraging the Open TDB API to provide a wide range of questions across various categories and difficulty levels.','A dynamic and interactive Quiz application built with React, leveraging the Open TDB API to provide a wide range of questions across various categories and difficulty levels.','http://localhost:8000/storage/projects/1772702266_w8C55sqQGC.png','https://react-quiz-mcq.netlify.app/','https://github.com/aadhar41/quiz','[\"JavaScript\"]','api',1,54,'2026-03-05 03:22:34','2026-03-05 03:47:48'),(55,'Random Person','A dynamic and interactive React application that fetches and displays detailed information about random individuals using the Random User API.','A dynamic and interactive React application that fetches and displays detailed information about random individuals using the Random User API.','http://localhost:8000/storage/projects/1772702300_B3COYodhJW.png','https://random-person-contactcard.netlify.app/','https://github.com/aadhar41/random-person','[\"CSS\"]','api',1,55,'2026-03-05 03:22:34','2026-03-05 03:48:22'),(56,'React Agency Portfolio','A modern, responsive Single Page Application (SPA) built with React.js, based on the classic \"Agency\" theme. This project demonstrates a clean UI architecture with routing, form validation, and component-based structure.','A modern, responsive Single Page Application (SPA) built with React.js, based on the classic \"Agency\" theme. This project demonstrates a clean UI architecture with routing, form validation, and component-based structure.','http://localhost:8000/storage/projects/1772702383_RzrnCaowkr.png',NULL,'https://github.com/aadhar41/React-Agency-Portfolio','[\"CSS\"]','web',1,56,'2026-03-05 03:22:34','2026-03-05 03:49:45'),(57,'React Calc','Basic calculator build in reactJs','Basic calculator build in reactJs','https://raw.githubusercontent.com/aadhar41/react-calc/master/public/react-calc.png',NULL,'https://github.com/aadhar41/react-calc','[\"JavaScript\"]','web',0,57,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(58,'React Cart Usereducer','A dynamic and responsive shopping cart application built using React. This project demonstrates modern front-end development practices, including state management, component-based architecture, and persistent data storage.','A dynamic and responsive shopping cart application built using React. This project demonstrates modern front-end development practices, including state management, component-based architecture, and persistent data storage.','http://localhost:8000/storage/projects/1772702426_WI8ywCRdGJ.png','https://react-shoppingcart-reducer.netlify.app/','https://github.com/aadhar41/react-cart-usereducer','[\"JavaScript\"]','web',1,58,'2026-03-05 03:22:34','2026-03-05 03:50:30'),(59,'React Cocktails','A simple React application that displays a list of cocktails and allows users to search for specific cocktails by name.','A simple React application that displays a list of cocktails and allows users to search for specific cocktails by name.','http://localhost:8000/storage/projects/1772702496_QS57lxTrIZ.png','https://cocktails-listing.netlify.app/','https://github.com/aadhar41/react-cocktails','[\"JavaScript\"]','web',1,59,'2026-03-05 03:22:34','2026-03-05 03:51:38'),(60,'React Markdown Previewer','A simple and efficient React-based web application that allows users to write Markdown text and see the rendered HTML preview in real-time.','A simple and efficient React-based web application that allows users to write Markdown text and see the rendered HTML preview in real-time.','http://localhost:8000/storage/projects/1772702563_LjbECosD0X.png','https://markdown-preview-react.netlify.app/','https://github.com/aadhar41/react-markdown-previewer','[\"CSS\"]','web',1,60,'2026-03-05 03:22:34','2026-03-05 03:52:45'),(61,'React Meal App','A basic meal app using React and public api','A basic meal app using React and public api','https://raw.githubusercontent.com/aadhar41/react-meal-app/master/public/react-meal-app.png',NULL,'https://github.com/aadhar41/react-meal-app','[\"JavaScript\"]','api',0,61,'2026-03-05 03:22:34','2026-03-05 03:53:41'),(62,'React Menu','A React application that displays a food menu with filtering capabilities. Users can filter items by category (e.g., Breakfast, Lunch, Shakes).','A React application that displays a food menu with filtering capabilities. Users can filter items by category (e.g., Breakfast, Lunch, Shakes).','http://localhost:8000/storage/projects/1772702686_AKTt6zfVny.png','https://react-filter-menu.netlify.app/','https://github.com/aadhar41/react-menu','[\"JavaScript\"]','web',1,62,'2026-03-05 03:22:34','2026-03-05 03:54:48'),(63,'React Pagination','A clean and interactive React application demonstrating efficient client-side pagination for large datasets. Features a responsive grid and intuitive navigation.','A clean and interactive React application demonstrating efficient client-side pagination for large datasets. Features a responsive grid and intuitive navigation.','http://localhost:8000/storage/projects/1772702730_BAicmFkrJs.png','https://pagination-react-github.netlify.app/','https://github.com/aadhar41/react-pagination','[\"CSS\"]','web',1,63,'2026-03-05 03:22:34','2026-03-05 03:55:41'),(64,'React Sidebar And Modal','A clean and interactive React application demonstrating advanced state management using the Context API and Custom Hooks. This project features a responsive sidebar and a smooth modal overlay system.','A clean and interactive React application demonstrating advanced state management using the Context API and Custom Hooks. This project features a responsive sidebar and a smooth modal overlay system.','http://localhost:8000/storage/projects/1772702813_CdYUWBcpsH.png',NULL,'https://github.com/aadhar41/react-sidebar-and-modal','[\"CSS\"]','api',1,64,'2026-03-05 03:22:34','2026-03-05 03:56:56'),(65,'React Tour','A React Application that fetches and displays a list of tours from an API, allowing users to remove tours they are not interested in.','A React Application that fetches and displays a list of tours from an API, allowing users to remove tours they are not interested in.','http://localhost:8000/storage/projects/1772702888_7EniuyPTUZ.png','https://react-tourapplication.netlify.app/','https://github.com/aadhar41/react-tour','[\"CSS\"]','api',1,65,'2026-03-05 03:22:34','2026-03-05 03:58:11'),(66,'Reactjs Listing Marketplace Application','ReactJS Listing Marketplace Application. A modern Listing Marketplace Application built with React.js. This application allows users to browse listings, view details, and create new property listings.','ReactJS Listing Marketplace Application. A modern Listing Marketplace Application built with React.js. This application allows users to browse listings, view details, and create new property listings.','http://localhost:8000/storage/projects/1772702966_hHNtAs6K7B.png',NULL,'https://github.com/aadhar41/reactjs-listing-marketplace-application','[\"JavaScript\"]','web',1,66,'2026-03-05 03:22:34','2026-03-05 03:59:28'),(67,'Real Time Single Page App','Real time single page application build in Laravel, Pusher, Vue Js','Real time single page application build in Laravel, Pusher, Vue Js','https://raw.githubusercontent.com/aadhar41/real-time-single-page-app/master/public/real-time-single-page-app.png',NULL,'https://github.com/aadhar41/real-time-single-page-app','[\"PHP\"]','web',0,67,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(68,'Responsive Css3','CSS3 and ReactJs','CSS3 and ReactJs','https://raw.githubusercontent.com/aadhar41/responsive-css3/master/public/responsive-css3.png',NULL,'https://github.com/aadhar41/responsive-css3','[\"CSS\"]','web',0,68,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(69,'Responsive React Navbar','A modern, high-performance, and fully responsive navigation bar component built with **React**. This component provides a seamless user experience across all devices, featuring a dynamic data-driven architecture for easy maintenance and scalability.','A modern, high-performance, and fully responsive navigation bar component built with **React**. This component provides a seamless user experience across all devices, featuring a dynamic data-driven architecture for easy maintenance and scalability.','http://localhost:8000/storage/projects/1772703015_VsspQKozv2.png',NULL,'https://github.com/aadhar41/responsive-react-navbar','[\"CSS\"]','web',1,69,'2026-03-05 03:22:34','2026-03-05 04:00:18'),(70,'Resume','My resume','My resume','https://raw.githubusercontent.com/aadhar41/resume/master/public/resume.png',NULL,'https://github.com/aadhar41/resume','[\"HTML\"]','web',0,70,'2026-03-05 03:22:34','2026-03-05 04:00:37'),(71,'Reviews','A React component that displays a rotating carousel of user reviews.','A React component that displays a rotating carousel of user reviews.','http://localhost:8000/storage/projects/1772703080_ypB8AH1SGV.png','https://reactreviews-application.netlify.app/','https://github.com/aadhar41/reviews','[\"CSS\"]','web',1,71,'2026-03-05 03:22:34','2026-03-05 04:01:22'),(72,'SafeVault Credential Manager','A secure, lightweight, and user-friendly credential management system designed to store and manage sensitive information such as passwords, API keys, and digital certificates.','A secure, lightweight, and user-friendly credential management system designed to store and manage sensitive information such as passwords, API keys, and digital certificates.','http://localhost:8000/storage/projects/1772703127_qOn4FARhpo.jpg',NULL,'https://github.com/aadhar41/safeVault-credential-manager','[\"JavaScript\"]','api',1,72,'2026-03-05 03:22:34','2026-03-05 04:02:09'),(73,'Shop','A core PHP Project of E-Commerce shop','A core PHP Project of E-Commerce shop','https://raw.githubusercontent.com/aadhar41/shop/master/public/shop.png',NULL,'https://github.com/aadhar41/shop','[\"PHP\"]','web',0,73,'2026-03-05 03:22:34','2026-03-05 04:02:45'),(74,'Slider','A React application for displaying user reviews with an automatic slider and manual navigation controls.','A React application for displaying user reviews with an automatic slider and manual navigation controls.','http://localhost:8000/storage/projects/1772703218_A7N9GMAGvU.png',NULL,'https://github.com/aadhar41/slider','[\"CSS\"]','web',1,74,'2026-03-05 03:22:34','2026-03-05 04:03:42'),(75,'Society Accounting','This repository contains the source code for a society services project built with Laravel PHP. The project aims to provide a platform for managing various services within a society or residential complex.','This repository contains the source code for a society services project built with Laravel PHP. The project aims to provide a platform for managing various services within a society or residential complex.','https://raw.githubusercontent.com/aadhar41/society-accounting/master/public/society-accounting.png',NULL,'https://github.com/aadhar41/society-accounting','[\"PHP\"]','web',1,75,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(76,'Stock Photos Infinite','A dynamic stock photo gallery built with React that leverages the Unsplash API to search and browse high-quality images with a seamless infinite scroll experience.','A dynamic stock photo gallery built with React that leverages the Unsplash API to search and browse high-quality images with a seamless infinite scroll experience.','http://localhost:8000/storage/projects/1772703348_yoZelIOSh9.png','https://stock-photos-infinite.netlify.app/','https://github.com/aadhar41/stock-photos-infinite','[\"JavaScript\"]','api',1,76,'2026-03-05 03:22:34','2026-03-05 04:05:50'),(77,'Stripe Menu And Submenu','A high-fidelity recreation of Stripe\'s iconic, fluid navigation menu built with React and modern animation libraries.','A high-fidelity recreation of Stripe\'s iconic, fluid navigation menu built with React and modern animation libraries.','http://localhost:8000/storage/projects/1772703396_Daflw1MPGX.png','https://stripe-menu.netlify.app/','https://github.com/aadhar41/Stripe-Menu-and-Submenu','[\"JavaScript\"]','web',1,77,'2026-03-05 03:22:34','2026-03-05 04:06:38'),(78,'Task Manager','A Task Manager Project Build in NodeJs ( APIs )','A Task Manager Project Build in NodeJs ( APIs )','https://raw.githubusercontent.com/aadhar41/task-manager/master/public/task-manager.png',NULL,'https://github.com/aadhar41/task-manager','[\"JavaScript\"]','api',0,78,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(79,'Url_shortner_jetstream','Robust Laravel URL shortener with SuperAdmin, Admin and Member roles. Features strict viewing and creation permissions, multi-tenancy via Companies, and non-publicly resolvable links.','Robust Laravel URL shortener with SuperAdmin, Admin and Member roles. Features strict viewing and creation permissions, multi-tenancy via Companies, and non-publicly resolvable links.','http://localhost:8000/storage/projects/1772703475_71nM0IGQQ2.png',NULL,'https://github.com/aadhar41/url_shortner_jetstream','[\"Blade\"]','web',1,79,'2026-03-05 03:22:34','2026-03-05 04:07:58');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'text',
  `section` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `group` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `label` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `placeholder` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `options` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `default` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `required` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `visible` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes',
  `editable` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes',
  `deletable` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'no',
  `created_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int NOT NULL DEFAULT '80',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'PHP (5.*+, 7.*+, 8.1+)','Backend Development',95,1,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(2,'Laravel (5–12)','Backend Development',95,2,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(3,'Yii / Yii2','Backend Development',85,3,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(4,'CodeIgniter','Backend Development',82,4,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(5,'CakePHP','Backend Development',78,5,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(6,'Express.js','Backend Development',80,6,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(7,'MySQL','Database Management',87,7,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(8,'MongoDB','Database Management',72,8,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(9,'Redis','Database Management',70,9,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(10,'Memcached','Database Management',71,10,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(11,'Query Optimization','Database Management',88,11,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(12,'Schema Design','Database Management',85,12,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(13,'RESTful APIs','API Development',95,13,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(14,'WebSockets','API Development',85,14,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(15,'Socket.io','API Development',82,15,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(16,'Laravel Sanctum','API Development',88,16,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(17,'JWT Authentication','API Development',85,17,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(18,'Third-party Integration','API Development',90,18,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(19,'Payment Gateway Integration','API Development',85,19,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(20,'SDLC','Software Development',88,20,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(21,'Agile / Scrum','Software Development',85,21,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(22,'MVC Architecture','Software Development',90,22,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(23,'Unit Testing (PHPUnit)','Software Development',82,23,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(24,'System Design','Software Development',82,24,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(25,'Code Review','Software Development',90,25,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(26,'Debugging','Software Development',92,26,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(27,'HTML5','Frontend Technologies',85,27,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(28,'CSS3','Frontend Technologies',80,28,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(29,'JavaScript (ES6+)','Frontend Technologies',82,29,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(30,'React.js','Frontend Technologies',85,30,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(31,'jQuery','Frontend Technologies',80,31,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(32,'Bootstrap 5','Frontend Technologies',85,32,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(33,'Tailwind CSS','Frontend Technologies',88,33,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(34,'Responsive Design','Frontend Technologies',80,34,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(35,'Git','Tools & Platforms',85,35,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(36,'Composer','Tools & Platforms',86,36,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(37,'npm','Tools & Platforms',80,37,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(38,'Vite','Tools & Platforms',79,38,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(39,'Postman','Tools & Platforms',85,39,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(40,'Insomnia','Tools & Platforms',80,40,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(41,'Swagger','Tools & Platforms',82,41,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(42,'CLI','Tools & Platforms',84,42,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(43,'Linux','Tools & Platforms',78,43,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(44,'Apache','Tools & Platforms',75,44,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(45,'Security Implementation','Best Practices',88,45,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(46,'Performance Optimization','Best Practices',90,46,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(47,'Technical Documentation','Best Practices',85,47,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(48,'Team Mentoring','Leadership',85,48,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(49,'Project Management','Leadership',82,49,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(50,'Cross-functional Collaboration','Leadership',85,50,'2026-03-05 03:22:34','2026-03-05 03:22:34'),(51,'Client Communication','Leadership',88,51,'2026-03-05 03:22:34','2026-03-05 03:22:34');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'editor',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Aadhar Admin','admin@aadhar.com','admin',NULL,'$2y$12$jjuGPQ.OGvBRqvDINBt.9eYEuZLkIAu0y3l29Q4KCgiqfjcZPK896',NULL,'2026-03-05 03:22:33','2026-03-05 03:22:33'),(2,'Aadhar Editor','editor@aadhar.com','editor',NULL,'$2y$12$J1O4HNcqgQiCvxvHBZNyCuwzKnax7FnZUNerUnvOHIwe9V.D8juAq',NULL,'2026-03-05 03:22:34','2026-03-05 03:22:34');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'portfolio_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-05 16:02:11
