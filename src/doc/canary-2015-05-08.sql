CREATE DATABASE  IF NOT EXISTS `canary` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `canary`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: canary
-- ------------------------------------------------------
-- Server version	5.6.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_ad`
--

DROP TABLE IF EXISTS `t_ad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_ad` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `site` varchar(128) DEFAULT NULL COMMENT '位置',
  `script` varchar(1024) DEFAULT NULL COMMENT '广告脚本',
  `enable_status` varchar(128) DEFAULT NULL COMMENT '启用状态',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='广告';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_ad`
--

LOCK TABLES `t_ad` WRITE;
/*!40000 ALTER TABLE `t_ad` DISABLE KEYS */;
INSERT INTO `t_ad` VALUES (1,'top','</script><script type=\'text/javascript\' src=\'http://images.sohu.com/cs/jsfile/js/c.js\'></script>','Disable','NotDelete','canary','2015-05-07 18:45:52','system','2015-04-01 12:00:00'),(2,'center','<script type=\"text/javascript\">var sogou_ad_id=429768;var sogou_ad_height=90;var sogou_ad_width=728;</script><script type=\'text/javascript\' src=\'http://images.sohu.com/cs/jsfile/js/c.js\'></script>','Enable','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(3,'bottom','<script type=\"text/javascript\">var sogou_ad_id=429768;var sogou_ad_height=90;var sogou_ad_width=728;</script><script type=\'text/javascript\' src=\'http://images.sohu.com/cs/jsfile/js/c.js\'></script>','Enable','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(4,'right','<script type=\"text/javascript\">var sogou_ad_id=429768;var sogou_ad_height=90;var sogou_ad_width=728;</script><script type=\'text/javascript\' src=\'http://images.sohu.com/cs/jsfile/js/c.js\'></script>','Enable','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00');
/*!40000 ALTER TABLE `t_ad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_administrator`
--

DROP TABLE IF EXISTS `t_administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_administrator` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(128) DEFAULT NULL COMMENT '用户名',
  `password` varchar(128) DEFAULT NULL COMMENT '密码',
  `question` varchar(128) DEFAULT NULL COMMENT '问题',
  `answer` varchar(128) DEFAULT NULL COMMENT '答案',
  `level` varchar(128) DEFAULT NULL COMMENT '级别 Low Middle High Super',
  `private_key` varchar(128) DEFAULT NULL COMMENT '私钥',
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(128) DEFAULT NULL COMMENT '手机',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='管理员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_administrator`
--

LOCK TABLES `t_administrator` WRITE;
/*!40000 ALTER TABLE `t_administrator` DISABLE KEYS */;
INSERT INTO `t_administrator` VALUES (1,'canary','MsAFxQBLFpXRMFmQBIMuGA==','您自己的姓名是','canary','Super','1234567890','canary@qq.com','110','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(2,'china','ERY51+RSCLmVltr0nMfNPg==','您自己的姓名是','china','Low','805825e4cb57427ea7976f83cd61382c','china123@qq.com','18688888123','NotDelete','canary','2015-05-08 16:18:14','canary','2015-05-08 15:22:35');
/*!40000 ALTER TABLE `t_administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_article`
--

DROP TABLE IF EXISTS `t_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `menu_id` int(11) DEFAULT NULL COMMENT '菜单主键 不能为空',
  `title` varchar(128) DEFAULT NULL COMMENT '文章标题',
  `content` varchar(4096) DEFAULT NULL COMMENT '文章内容',
  `author` varchar(128) DEFAULT NULL COMMENT '作者，可以为空',
  `source_name` varchar(128) DEFAULT NULL COMMENT '来源名称，可以为空',
  `source_url` varchar(1024) DEFAULT NULL COMMENT '来源链接，可以为空',
  `click_count` int(11) DEFAULT NULL COMMENT '阅读数 点击量',
  `up_count` int(11) DEFAULT NULL COMMENT '顶',
  `down_count` int(11) DEFAULT NULL COMMENT '踩',
  `rank` int(11) DEFAULT NULL COMMENT '排序',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_article`
--

LOCK TABLES `t_article` WRITE;
/*!40000 ALTER TABLE `t_article` DISABLE KEYS */;
INSERT INTO `t_article` VALUES (1,1,'山村咏怀update','一去二三里，烟村四五家。亭台六七座， 八九十枝花。update','邵康节update','百度百科update','http://baike.baidu.com/view/597973.htm',0,0,0,100,'NotDelete','canary','2015-05-04 17:39:11','canary','2015-05-04 17:32:05'),(2,1,'山村咏怀','一去二三里，烟村四五家。亭台六七座， 八九十枝花。','邵康节','百度百科','http://baike.baidu.com/view/597973.htm',0,0,0,50,'NotDelete','canary','2015-05-04 17:33:51','canary','2015-05-04 17:33:11'),(7,1,'山村咏怀','一去二三里，烟村四五家。亭台六七座，八九十枝花。','邵康节','百度百科','http://baike.baidu.com/view/597973.htm',0,0,0,50,'NotDelete','canary','2015-05-06 18:15:16','canary','2015-05-06 18:15:16');
/*!40000 ALTER TABLE `t_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_article_tag_relation`
--

DROP TABLE IF EXISTS `t_article_tag_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_article_tag_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `article_id` varchar(128) DEFAULT NULL COMMENT '文章主键',
  `tag_id` int(11) DEFAULT NULL COMMENT '标签主键',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='文章标签关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_article_tag_relation`
--

LOCK TABLES `t_article_tag_relation` WRITE;
/*!40000 ALTER TABLE `t_article_tag_relation` DISABLE KEYS */;
INSERT INTO `t_article_tag_relation` VALUES (1,'1',1,'Delete','canary','2015-05-04 17:34:17','canary','2015-05-04 17:32:05'),(2,'1',2,'Delete','canary','2015-05-04 17:34:17','canary','2015-05-04 17:32:05'),(3,'1',3,'Delete','canary','2015-05-04 17:34:17','canary','2015-05-04 17:32:05'),(4,'2',1,'NotDelete','canary','2015-05-04 17:33:11','canary','2015-05-04 17:33:11'),(5,'2',2,'NotDelete','canary','2015-05-04 17:33:12','canary','2015-05-04 17:33:12'),(6,'2',3,'NotDelete','canary','2015-05-04 17:33:12','canary','2015-05-04 17:33:12'),(11,'1',1,'NotDelete','canary','2015-05-04 17:39:20','canary','2015-05-04 17:39:20'),(12,'1',2,'NotDelete','canary','2015-05-04 17:39:20','canary','2015-05-04 17:39:20'),(13,'1',3,'NotDelete','canary','2015-05-04 17:39:20','canary','2015-05-04 17:39:20'),(14,'1',4,'NotDelete','canary','2015-05-04 17:39:20','canary','2015-05-04 17:39:20'),(21,'7',1,'NotDelete','canary','2015-05-06 18:15:20','canary','2015-05-06 18:15:20'),(22,'7',2,'NotDelete','canary','2015-05-06 18:15:20','canary','2015-05-06 18:15:20'),(23,'7',3,'NotDelete','canary','2015-05-06 18:15:20','canary','2015-05-06 18:15:20');
/*!40000 ALTER TABLE `t_article_tag_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_link`
--

DROP TABLE IF EXISTS `t_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(128) DEFAULT NULL COMMENT '名称',
  `url` varchar(128) DEFAULT NULL COMMENT '链接',
  `description` varchar(128) DEFAULT NULL COMMENT '描述',
  `rank` int(11) DEFAULT NULL COMMENT '排序',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_link`
--

LOCK TABLES `t_link` WRITE;
/*!40000 ALTER TABLE `t_link` DISABLE KEYS */;
INSERT INTO `t_link` VALUES (1,'谷歌','www.google.com','谷歌',50,'NotDelete','canary','2015-04-30 14:42:25','system','2015-04-01 12:00:00'),(2,'谷歌','www.google.com','谷歌搜索',2,'Delete','canary','2015-04-30 14:43:06','system','2015-04-01 12:00:00'),(3,'百度','www.baidu.com','百度首页',50,'NotDelete','canary','2015-04-30 14:40:28','canary','2015-04-30 14:40:28'),(4,'谷歌','www.google.com','谷歌',50,'NotDelete','canary','2015-04-30 14:41:47','canary','2015-04-30 14:41:47');
/*!40000 ALTER TABLE `t_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_log`
--

DROP TABLE IF EXISTS `t_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(128) DEFAULT NULL COMMENT '用户',
  `password` varchar(128) DEFAULT NULL COMMENT '密码',
  `question` varchar(128) DEFAULT NULL COMMENT '问题',
  `answer` varchar(128) DEFAULT NULL COMMENT '答案',
  `result` varchar(128) DEFAULT NULL COMMENT '结果',
  `address` varchar(128) DEFAULT NULL COMMENT '地址',
  `ip` varchar(128) DEFAULT NULL COMMENT '网络地址',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='日志';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_log`
--

LOCK TABLES `t_log` WRITE;
/*!40000 ALTER TABLE `t_log` DISABLE KEYS */;
INSERT INTO `t_log` VALUES (13,'canary','canary123','您自己的姓名是','canary','登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-04-29 12:36:12','system','2015-04-29 12:36:12'),(14,'canary','保密','您自己的姓名是','canary','登陆成功','','','NotDelete','system','2015-04-29 12:36:48','system','2015-04-29 12:36:48'),(15,'canary','保密','您自己的姓名是','canary','登陆成功','','','NotDelete','system','2015-05-08 12:51:17','system','2015-05-08 12:51:17'),(16,'china','保密','您自己的姓名是','china','登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-05-08 15:39:33','system','2015-05-08 15:39:33'),(17,'canary','保密','您自己的姓名是','canary','登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-05-08 15:51:44','system','2015-05-08 15:51:44'),(18,'canary','保密','您自己的姓名是','canary','登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-05-08 16:58:50','system','2015-05-08 16:58:50');
/*!40000 ALTER TABLE `t_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_menu`
--

DROP TABLE IF EXISTS `t_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(128) DEFAULT NULL COMMENT '名称',
  `style` varchar(128) DEFAULT NULL,
  `description` varchar(128) DEFAULT NULL COMMENT '描述',
  `rank` int(11) DEFAULT NULL COMMENT '排序',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='菜单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_menu`
--

LOCK TABLES `t_menu` WRITE;
/*!40000 ALTER TABLE `t_menu` DISABLE KEYS */;
INSERT INTO `t_menu` VALUES (1,'头像','default','头像描述',1,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(2,'网名','default','网名',2,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(3,'签名','default','签名',3,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(4,'分组','default','分组',4,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(5,'说说','default','说说',5,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(6,'美文','default','美文',6,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(7,'测试菜单','default','测试菜单',20,'Delete','system','2015-04-30 10:01:20','system','2015-04-30 10:01:20');
/*!40000 ALTER TABLE `t_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_tag`
--

DROP TABLE IF EXISTS `t_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(128) DEFAULT NULL COMMENT '名称',
  `description` varchar(128) DEFAULT NULL COMMENT '描述',
  `rank` int(11) DEFAULT NULL COMMENT '排序',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='标签';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_tag`
--

LOCK TABLES `t_tag` WRITE;
/*!40000 ALTER TABLE `t_tag` DISABLE KEYS */;
INSERT INTO `t_tag` VALUES (1,'卡通','卡通头像',50,'NotDelete','canary','2015-05-04 14:25:18','canary','2015-04-01 12:00:00'),(2,'卡通','卡通',50,'NotDelete','canary','2015-05-04 14:25:09','canary','2015-05-04 14:24:52');
/*!40000 ALTER TABLE `t_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_website`
--

DROP TABLE IF EXISTS `t_website`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_website` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `property_key` varchar(128) DEFAULT NULL COMMENT '键',
  `property_value` varchar(128) DEFAULT NULL COMMENT '值',
  `description` varchar(128) DEFAULT NULL COMMENT '描述',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='站点配置信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_website`
--

LOCK TABLES `t_website` WRITE;
/*!40000 ALTER TABLE `t_website` DISABLE KEYS */;
INSERT INTO `t_website` VALUES (1,'website_title','金丝雀','网站标题','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(2,'website_description','金丝雀','网站描述','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(3,'website_keywords','金丝雀，金雀','网站关键字','NotDelete',NULL,'2015-04-29 16:47:10','system','2015-04-01 12:00:00'),(4,'website_url','www.canary.com','网站网址','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(6,'website_email','canary@qq.com','网站邮箱','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(7,'website_icp','京ICP证030173号','网站备案号','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(8,'website_script','<script>console.log(\'website.script\');</script>','网站统计代码','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(9,'website_about','关于我们','关于我们','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(10,'website_contact','联系我们','联系我们','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(11,'website_contribution','投稿','投稿','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(12,'website_copyright','版权声明','版权声明','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00');
/*!40000 ALTER TABLE `t_website` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-05-08 17:22:38
