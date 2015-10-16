CREATE DATABASE  IF NOT EXISTS `canary` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `canary`;
-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: canary
-- ------------------------------------------------------
-- Server version	5.6.25-log

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_article`
--

LOCK TABLES `t_article` WRITE;
/*!40000 ALTER TABLE `t_article` DISABLE KEYS */;
INSERT INTO `t_article` VALUES (1,1,'山村咏怀update','一去二三里，烟村四五家。亭台六七座， 八九十枝花。update','邵康节update','百度百科update','http://baike.baidu.com/view/597973.htm',0,0,0,100,'NotDelete','canary','2015-05-04 17:39:11','canary','2015-05-04 17:32:05'),(2,1,'山村咏怀','一去二三里，烟村四五家。亭台六七座， 八九十枝花。','邵康节','百度百科','http://baike.baidu.com/view/597973.htm',0,0,0,50,'NotDelete','canary','2015-05-04 17:33:51','canary','2015-05-04 17:33:11'),(7,1,'山村咏怀','<div style=\'display:none\'><input type=\'hidden\' name=\'csrfmiddlewaretoken\' value=\'61298da44eba7c4df4caa6d9f94ba8aa\' /></div>','邵康节','百度百科','http://baike.baidu.com/view/597973.htm',0,0,0,50,'NotDelete','canary','2015-05-06 18:15:16','canary','2015-05-06 18:15:16'),(8,1,'山村咏怀','一去二三里，烟村四五家。亭台六七座，八九十枝花。','邵康节','百度百科','http://baike.baidu.com/view/597973.htm',0,0,0,50,'NotDelete','canary','2015-08-26 20:23:17','canary','2015-08-26 20:23:17'),(9,1,'山村咏怀',NULL,'邵康节','百度百科','http://baike.baidu.com/view/597973.htm',0,0,0,50,'NotDelete','canary','2015-08-26 20:23:52','canary','2015-08-26 20:23:52'),(10,1,'山村咏怀','<div class=\"article-content\">                    <p>EDG VS LGD 0:3，EDG VS IG 1:3</p><p>在EDG距离再次统治夏季联赛完成继续连冠的梦想，其实就两场比赛的距离！</p><p>然而，他们却用火星撞地球的速度。在最后两场比赛中，坠落成为众矢之的。</p><p>为什么EDG已经统治了春季赛和夏季赛的常规赛，这么长时间却能在这么短的速度状态起伏这么大呢！首先我们要明确一个东西。不是因为QG和LGD或者IG的状态都这几天都变得神勇了，换一个简单的说法就是变身啦！</p><p>而是因为EDG这两场比赛打的确实是太差了，首先从B/P开始。厂长在遭到IG疯狂针对的时候（6个Ban位5个打野英雄）EDG过度自信，甚至拿出了妖姬+瞎子这种中野组合！</p><p>虽然前期凭借个人实力确实取得了不错的效果，但是优势并不足以拿下比赛。比赛拖到后期，IG就能成功的掌控住比赛了！之所以说到这场比赛是因为这是导致EDG崩盘的一个缩影！</p><img src=\"http://p2.pstatp.com/large/7388/806861885\" img_width=\"600\" img_height=\"400\" alt=\"EDG走向天团模式？ 商业化或将成为电竞悖论!\"  onerror=\"javascript:errorimg.call(this);\" ><p>疑问一：“所谓EDG吧自己演死了”？是不是真的？</p><p>在EDG经手季后赛之前。</p><p>没有人会不认为，EDG轻松过关是会有什么困难的！但是在EDG失败之后出现了一种言论。EDG是在吧LGD演进S5，这样就可以保证中国队在S系列总决赛的竞争力！</p><p>诚然，EDG前几场比赛确实有些因为轻敌而导致了阵容拿的很乱，让人看起来像是在演。不过当最后一局EDG拿出自己拿手阵容的时候，EDG依旧处于被压制的地位。</p><img src=\"http://p2.pstatp.com/large/7388/807168155\" img_width=\"948\" img_height=\"392\" alt=\"EDG走向天团模式？ 商业化或将成为电竞悖论!\"  onerror=\"javascript:errorimg.call(this);\" ><p>Imp的全场打爆Deft不是假的！我更愿意吧EDG的失误归结到，因为轻敌而导致的战术性失败！</p><p>当然这种失败不是技术性的，从个人实力来看，EDG还是无可厚非的强！</p><p>我们再来看，EDG和IG的比赛。</p><p>这个时候，EDG其实已经意识到了自己的问题，和阴沟翻船的严重性。自己是仍然存在理论性可能被淘汰出局的！</p><p>所以战IG变成了非赢不可的战役。</p><p>不过他们没想到，被他们从春季赛一直3：0治到现在的IG，逐渐找到了打EDG的感觉。针对中野做的兼职不能太到位！</p><p>我们都知道厂长是一个从来不使“艾克”的人，当然不是因为他们长得太像了。而是这个英雄不是厂长的风格。IG却用自己的小算计，让厂长第一场不得不拿艾克。</p><img src=\"http://p3.pstatp.com/large/7383/7416298993\" img_width=\"1911\" img_height=\"981\" alt=\"EDG走向天团模式？ 商业化或将成为电竞悖论!\"  onerror=\"javascript:errorimg.call(this);\" ><p>事实证明了，IG的这个动作是有效的！</p><p>厂长全厂都没有找到属于他的屠杀节奏！IG尝到了甜头，于是就发生了上面的那一幕，6个Ban位五个打野，最后厂长不得不选个瞎子，小Pawn拿到了妖姬。后期崩盘也是在情理之中吧！</p><p>疑问二：EDG难道因为成绩走上了浮躁的“天团”老路？</p><p>曾经有一支战队，他是老WE衰落以后，撑起了中国抗韩的大旗。</p><p>他们也曾经引领了一个时代的人，他们被叫做黑暗势力，粉丝们也戏称自己为“59E”。没错，他们就是OMG战队，黑暗天团。</p><p>曾经单纯的OMG战队，每个人都仅仅知道训练，直到他们有了与当时的世界第一SKT战队一战的资本。虽然最终败北，但是OMG第一次赢SKT的时候，所有人还都是很兴奋的！</p><img src=\"http://p2.pstatp.com/large/7383/7417812397\" img_width=\"1024\" img_height=\"683\" alt=\"EDG走向天团模式？ 商业化或将成为电竞悖论!\"  onerror=\"javascript:errorimg.call(this);\" ><p>OMG到了如今的分崩离析的态势，很多人认为都是因为过度的商业运作导致的结果吧！</p><p>大哥状态的起伏首当其冲的肯定是因为版本的不友善，导致不能再长期的霸占上路一哥的位置了。其次更多还是活动过多导致了队员的分心！</p><p>所以OMG才会在那么短的时间内消退。</p><p>那么接下来的一个问题就随之而来了。</p><p>MSI夺冠的EDG战队，是不是也已经走上的天团的老路？</p><img src=\"http://p2.pstatp.com/large/7390/334749846\" img_width=\"1000\" img_height=\"667\" alt=\"EDG走向天团模式？ 商业化或将成为电竞悖论!\"  onerror=\"javascript:errorimg.call(this);\" ><p>EDG和华谊签约已经是众人皆知的了！</p><p>各个队员也会在不同程度上有了在电视和时尚娱乐圈得到曝光的机会！</p><img src=\"http://p2.pstatp.com/large/7388/808371511\" img_width=\"594\" img_height=\"323\" alt=\"EDG走向天团模式？ 商业化或将成为电竞悖论!\"  onerror=\"javascript:errorimg.call(this);\" ><p>这点我一个旁人，不好做出太多评价。</p><p>但是我的一个朋友曾经跟我说过，我喜欢EDG的原因是我认为他们是最踏实的战队！没有那么多乱七八糟的，做好自己的训练。不忘初心！</p><p>疑问三：商业化和好成绩是不是已经成为电竞悖论？</p><p>电子竞技和传统体育，都是一种竞技精神和人类不服输的精神的传承！</p><p>但是电子竞技和传统的电子竞技相同也不同！</p><p>这是一个一天不摸就手生，两天状态就会消退。三天基本上就跟不上节奏的竞技运动！他有着超过的淘汰率和超短的职业生涯黄金期！</p><p>当你在山顶看风景的时候，他所付出的努力和上天对他个人天赋的挑剔。绝对不比任何老牌竞技运动容易！</p><img src=\"http://p7.pstatp.com/large/7386/2658971434\" img_width=\"440\" img_height=\"498\" alt=\"EDG走向天团模式？ 商业化或将成为电竞悖论!\"  onerror=\"javascript:errorimg.call(this);\" ><p>然而，就是这么高强度的训练量！</p><p>职业选手如果在爬上高山取得成绩以后，就这这个电竞蓬勃发展的形式。肯定会有很大程度上的曝光。不管是在电竞媒体还是在电视媒体上！</p><p>注定会因为这些东西耽误训练和比赛之类的活动！</p><p>难道“天团”的模式已经成为一个案例，注定会因为过度的曝光导致选手分心或者心浮气躁。</p><p>最终就是选手的状态起伏和职业战队的衰落。</p><p>电竞与曝光是不是成为一个行业悖论？这才是值得我们深思的一个最大的问题！！！</p><p>不管怎样还是希望EDG能够更加稳定的走下去！毕竟厂长也放出过言论。如果他们在季后赛一帆风顺那么，S5夺冠将没那么容易！如果在季后赛折戟，那么夺冠将很有可能！</p><p>有的时候一句不经意的话，却有可能变成现实！</p><p>秀爽游戏（http:// www.xiushuang.com）欢迎下载秀爽App，各个市场关键词搜索“秀爽”</p><p>秀爽新浪微博：@秀爽游戏</p><p>秀爽微信：igameshow </p>                </div>','邵康节','百度百科','http://baike.baidu.com/view/597973.htm',0,0,0,50,'NotDelete','canary','2015-08-26 20:26:18','canary','2015-08-26 20:26:18');
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COMMENT='文章标签关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_article_tag_relation`
--

LOCK TABLES `t_article_tag_relation` WRITE;
/*!40000 ALTER TABLE `t_article_tag_relation` DISABLE KEYS */;
INSERT INTO `t_article_tag_relation` VALUES (1,'1',1,'Delete','canary','2015-05-04 17:34:17','canary','2015-05-04 17:32:05'),(2,'1',2,'Delete','canary','2015-05-04 17:34:17','canary','2015-05-04 17:32:05'),(3,'1',3,'Delete','canary','2015-05-04 17:34:17','canary','2015-05-04 17:32:05'),(4,'2',1,'NotDelete','canary','2015-05-04 17:33:11','canary','2015-05-04 17:33:11'),(5,'2',2,'NotDelete','canary','2015-05-04 17:33:12','canary','2015-05-04 17:33:12'),(6,'2',3,'NotDelete','canary','2015-05-04 17:33:12','canary','2015-05-04 17:33:12'),(11,'1',1,'NotDelete','canary','2015-05-04 17:39:20','canary','2015-05-04 17:39:20'),(12,'1',2,'NotDelete','canary','2015-05-04 17:39:20','canary','2015-05-04 17:39:20'),(13,'1',3,'NotDelete','canary','2015-05-04 17:39:20','canary','2015-05-04 17:39:20'),(14,'1',4,'NotDelete','canary','2015-05-04 17:39:20','canary','2015-05-04 17:39:20'),(21,'7',1,'NotDelete','canary','2015-05-06 18:15:20','canary','2015-05-06 18:15:20'),(22,'7',2,'NotDelete','canary','2015-05-06 18:15:20','canary','2015-05-06 18:15:20'),(23,'7',3,'NotDelete','canary','2015-05-06 18:15:20','canary','2015-05-06 18:15:20'),(24,'8',1,'NotDelete','canary','2015-08-26 20:23:17','canary','2015-08-26 20:23:17'),(25,'8',2,'NotDelete','canary','2015-08-26 20:23:17','canary','2015-08-26 20:23:17'),(26,'8',3,'NotDelete','canary','2015-08-26 20:23:17','canary','2015-08-26 20:23:17'),(27,'9',1,'NotDelete','canary','2015-08-26 20:23:52','canary','2015-08-26 20:23:52'),(28,'9',2,'NotDelete','canary','2015-08-26 20:23:52','canary','2015-08-26 20:23:52'),(29,'9',3,'NotDelete','canary','2015-08-26 20:23:52','canary','2015-08-26 20:23:52'),(30,'10',1,'NotDelete','canary','2015-08-26 20:26:18','canary','2015-08-26 20:26:18'),(31,'10',2,'NotDelete','canary','2015-08-26 20:26:18','canary','2015-08-26 20:26:18'),(32,'10',3,'NotDelete','canary','2015-08-26 20:26:18','canary','2015-08-26 20:26:18');
/*!40000 ALTER TABLE `t_article_tag_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_comment`
--

DROP TABLE IF EXISTS `t_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `article_id` int(11) DEFAULT NULL COMMENT '文章主键',
  `username` varchar(128) DEFAULT NULL COMMENT '用户名',
  `content` varchar(128) DEFAULT NULL COMMENT '评论内容，过滤广告，不能包含.com .cn .net .so http:// https:// www 等字符串',
  `anonymous` varchar(128) DEFAULT NULL COMMENT '是否匿名',
  `location` varchar(128) DEFAULT NULL COMMENT '地址',
  `ip` varchar(128) DEFAULT NULL COMMENT '网络地址',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章评论表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_comment`
--

LOCK TABLES `t_comment` WRITE;
/*!40000 ALTER TABLE `t_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_comment` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8 COMMENT='日志';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_log`
--

LOCK TABLES `t_log` WRITE;
/*!40000 ALTER TABLE `t_log` DISABLE KEYS */;
INSERT INTO `t_log` VALUES (1,'canary','canary','您自己的姓名是','canary','登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-13 23:40:48','system','2015-06-13 23:40:48'),(2,'canary','canary','您自己的姓名是','canary','登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-13 23:41:55','system','2015-06-13 23:41:55'),(3,'canary','canary','您自己的姓名是','canary','登陆失败','','','NotDelete','system','2015-06-13 23:42:06','system','2015-06-13 23:42:06'),(4,'canary','canary','您自己的姓名是','canary','登陆失败','','','NotDelete','system','2015-06-13 23:42:12','system','2015-06-13 23:42:12'),(5,'canary','canary','您自己的姓名是','canary','登陆失败','','','NotDelete','system','2015-06-13 23:42:13','system','2015-06-13 23:42:13'),(6,'canary','canary','您自己的姓名是','canary','登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-13 23:42:14','system','2015-06-13 23:42:14'),(7,'canary','canary','您自己的姓名是','canary','登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-13 23:42:15','system','2015-06-13 23:42:15'),(8,'canary','canary','您自己的姓名是','canary','登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-13 23:42:15','system','2015-06-13 23:42:15'),(9,'canary','canary','您自己的姓名是','canary','登陆失败','','127.0.0.1','NotDelete','system','2015-06-13 23:42:16','system','2015-06-13 23:42:16'),(10,'canary','canary','您自己的姓名是','canary','登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-13 23:42:32','system','2015-06-13 23:42:32'),(11,'canary','canary','您自己的姓名是','canary','登陆失败','','127.0.0.1','NotDelete','system','2015-06-13 23:42:56','system','2015-06-13 23:42:56'),(12,'canary','canary','您自己的姓名是','canary','登陆失败','','127.0.0.1','NotDelete','system','2015-06-13 23:43:26','system','2015-06-13 23:43:26'),(13,'canary','canary','您自己的姓名是','canary','登陆失败','','','NotDelete','system','2015-06-13 23:43:30','system','2015-06-13 23:43:30'),(14,'canary','canary','您自己的姓名是','canary','登陆失败','','','NotDelete','system','2015-06-13 23:44:17','system','2015-06-13 23:44:17'),(15,'canary','canary','您自己的姓名是','canary','登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-13 23:44:44','system','2015-06-13 23:44:44'),(16,'canary','canary','您自己的姓名是','canary','登陆失败','','','NotDelete','system','2015-06-13 23:46:01','system','2015-06-13 23:46:01'),(17,'canary','canary','您自己的姓名是','canary','登陆失败','','','NotDelete','system','2015-06-13 23:47:05','system','2015-06-13 23:47:05'),(18,'canary','canary','您自己的姓名是','canary','登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-13 23:51:25','system','2015-06-13 23:51:25'),(19,'canary','保密','您自己的姓名是','canary','登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-13 23:52:31','system','2015-06-13 23:52:31'),(20,'canary','保密','您自己的姓名是','canary','登陆成功','','127.0.0.1','NotDelete','system','2015-06-14 00:12:15','system','2015-06-14 00:12:15'),(21,'canary','保密','您自己的姓名是','canary','登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-14 00:19:30','system','2015-06-14 00:19:30'),(22,'canary','保密','您自己的姓名是','canary','登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-14 00:26:26','system','2015-06-14 00:26:26'),(23,'canary','保密','您自己的姓名是','canary','登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-14 00:29:20','system','2015-06-14 00:29:20'),(24,'canary','保密','您自己的姓名是','canary','登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-06-14 00:36:10','system','2015-06-14 00:36:10'),(25,'xiaozhi','xiaozhi',NULL,NULL,'登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-23 17:44:33','system','2015-07-23 17:44:33'),(26,'xiaozhi','xiaozhi',NULL,NULL,'登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-23 17:46:42','system','2015-07-23 17:46:42'),(27,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-23 17:47:09','system','2015-07-23 17:47:09'),(28,'canary','保密','您自己的姓名是','canary','登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-23 17:53:53','system','2015-07-23 17:53:53'),(29,'canary','canary',NULL,NULL,'登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-23 18:12:14','system','2015-07-23 18:12:14'),(30,'canary','canary',NULL,NULL,'登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-23 18:13:49','system','2015-07-23 18:13:49'),(31,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-23 18:24:30','system','2015-07-23 18:24:30'),(32,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 10:45:22','system','2015-07-24 10:45:22'),(33,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 10:55:42','system','2015-07-24 10:55:42'),(34,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 11:00:45','system','2015-07-24 11:00:45'),(35,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 11:04:23','system','2015-07-24 11:04:23'),(36,'canary','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 11:08:40','system','2015-07-24 11:08:40'),(37,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 11:18:32','system','2015-07-24 11:18:32'),(38,'canary','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 11:18:52','system','2015-07-24 11:18:52'),(39,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 14:50:39','system','2015-07-24 14:50:39'),(40,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 14:53:16','system','2015-07-24 14:53:16'),(41,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 14:55:31','system','2015-07-24 14:55:31'),(42,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 14:58:34','system','2015-07-24 14:58:34'),(43,'xiaozhi','xiaozhi',NULL,NULL,'登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:08:18','system','2015-07-24 15:08:18'),(44,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:10:26','system','2015-07-24 15:10:26'),(45,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:10:42','system','2015-07-24 15:10:42'),(46,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:13:35','system','2015-07-24 15:13:35'),(47,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:19:13','system','2015-07-24 15:19:13'),(48,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:27:52','system','2015-07-24 15:27:52'),(49,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:30:55','system','2015-07-24 15:30:55'),(50,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:31:20','system','2015-07-24 15:31:20'),(51,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:31:48','system','2015-07-24 15:31:48'),(52,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:33:00','system','2015-07-24 15:33:00'),(53,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:35:08','system','2015-07-24 15:35:08'),(54,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:35:38','system','2015-07-24 15:35:38'),(55,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:37:25','system','2015-07-24 15:37:25'),(56,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:37:25','system','2015-07-24 15:37:25'),(57,'xiaozhi','保密',NULL,NULL,'登陆成功','','127.0.0.1','NotDelete','system','2015-07-24 15:38:17','system','2015-07-24 15:38:17'),(58,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:43:48','system','2015-07-24 15:43:48'),(59,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 15:44:57','system','2015-07-24 15:44:57'),(60,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 17:03:42','system','2015-07-24 17:03:42'),(61,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 17:55:28','system','2015-07-24 17:55:28'),(62,'canary','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 17:55:44','system','2015-07-24 17:55:44'),(63,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 18:55:24','system','2015-07-24 18:55:24'),(64,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 19:03:45','system','2015-07-24 19:03:45'),(65,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 19:22:40','system','2015-07-24 19:22:40'),(66,'dsdad','dasdas',NULL,NULL,'登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 19:26:12','system','2015-07-24 19:26:12'),(67,'dsada','dasdas',NULL,NULL,'登陆失败','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 19:26:17','system','2015-07-24 19:26:17'),(68,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 19:26:25','system','2015-07-24 19:26:25'),(69,'canary','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-24 19:26:32','system','2015-07-24 19:26:32'),(70,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-27 10:55:01','system','2015-07-27 10:55:01'),(71,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-27 10:57:16','system','2015-07-27 10:57:16'),(72,'canary','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-27 10:57:40','system','2015-07-27 10:57:40'),(73,'xiaozhi','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-27 16:25:14','system','2015-07-27 16:25:14'),(74,'china','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-07-27 16:25:46','system','2015-07-27 16:25:46'),(75,'canary','保密',NULL,NULL,'登陆成功','未分配或者内网IP####','127.0.0.1','NotDelete','system','2015-08-19 10:28:45','system','2015-08-19 10:28:45');
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
INSERT INTO `t_menu` VALUES (1,'头像','头像描述',1,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(2,'网名','网名',2,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(3,'签名','签名',3,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(4,'分组','分组',4,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(5,'说说','说说',5,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(6,'美文','美文',6,'NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(7,'测试菜单','测试菜单',20,'Delete','system','2015-04-30 10:01:20','system','2015-04-30 10:01:20');
/*!40000 ALTER TABLE `t_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_notice`
--

DROP TABLE IF EXISTS `t_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(128) DEFAULT NULL COMMENT '通知标题',
  `notice` varchar(1024) DEFAULT NULL COMMENT '通知内容',
  `description` varchar(1024) DEFAULT NULL COMMENT '描述信息，新增此公告的原因',
  `rank` int(11) DEFAULT NULL COMMENT '新加的数据默认rank为0，即排序等级最高',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公告表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_notice`
--

LOCK TABLES `t_notice` WRITE;
/*!40000 ALTER TABLE `t_notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_suggestion`
--

DROP TABLE IF EXISTS `t_suggestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_suggestion` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `suggestion` varchar(1024) DEFAULT NULL COMMENT '建议',
  `qq` varchar(128) DEFAULT NULL COMMENT 'qq',
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(128) DEFAULT NULL COMMENT '手机',
  `reply_status` varchar(128) DEFAULT NULL COMMENT '是否回复',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='建议表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_suggestion`
--

LOCK TABLES `t_suggestion` WRITE;
/*!40000 ALTER TABLE `t_suggestion` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_suggestion` ENABLE KEYS */;
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
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `nickname` varchar(128) DEFAULT NULL COMMENT '昵称，用户QQ登录后设置的昵称',
  `username` varchar(128) DEFAULT NULL COMMENT '用户名，只能是字母加数字',
  `password` varchar(128) DEFAULT NULL COMMENT '密码',
  `question` varchar(128) DEFAULT NULL COMMENT '密保问题',
  `answer` varchar(128) DEFAULT NULL COMMENT '密保答案',
  `role` varchar(128) DEFAULT NULL COMMENT '角色 User Admin Super',
  `sign` varchar(128) DEFAULT NULL COMMENT '标记或秘钥 ',
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(128) DEFAULT NULL COMMENT '手机',
  `qq` varchar(128) DEFAULT NULL COMMENT 'QQ',
  `sex` varchar(128) DEFAULT NULL COMMENT 'Man,男；Woman女；Other其他；Secret 保密',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `birthday` datetime DEFAULT NULL COMMENT '生日',
  `image` varchar(512) DEFAULT NULL COMMENT '头像',
  `binding_mobile_status` varchar(128) DEFAULT NULL COMMENT '绑定手机，NotBindingMobile未绑定，BindingMobile绑定',
  `binding_email_status` varchar(128) DEFAULT NULL COMMENT '绑定邮箱，UnBound未绑定，Bound绑定',
  `login_fail_times` int(11) DEFAULT NULL COMMENT '登陆失败次数',
  `enable_status` varchar(128) DEFAULT NULL COMMENT '启用状态',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user`
--

LOCK TABLES `t_user` WRITE;
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` VALUES (1,'canary','canary','MsAFxQBLFpXRMFmQBIMuGA==','您自己的姓名是','canary','Super','1234567890','canary@qq.com','18688888888','10000','Man',20,'2000-01-01 00:00:00','/static/image/default.png','UnBound','UnBound',0,'Eanble','NotDelete','canary','2015-08-19 10:28:45','canary','2000-01-01 12:00:00'),(2,'china','china','Vff8xTZFJez8JxiiItGgUA==','您自己的姓名是','china','Admin','180ae910811f46e8a4e160df3b146e9d','china@qq.com','110','10000','Secret',25,'2000-01-01 12:00:00','/static/image/default.png','UnBound','UnBound',0,'Eanble','NotDelete','china','2015-07-27 16:25:46','china','2000-01-01 12:00:00'),(3,'xiaozhi','xiaozhi','CzaH7JWzg0iPMIopLsq1cw==','您自己的姓名是','xiaozhi','User','1234567890','xiaozhi@qq.com','120','20000','Man',20,'2000-01-01 00:00:00','/static/image/default.png','UnBound','UnBound',0,'Eanble','NotDelete','xiaozhi','2015-07-27 16:25:14','xiaozhi','2000-01-01 12:00:00'),(4,'spring','spring','aOqWus/z/IfPsaZyN4E/7Q==','您自己的姓名是','spring','User','52c7bb16f2a742d48cf8abb5490e6703','spring@qq.com','18600000000',NULL,'Secret',NULL,NULL,'/static/image/default.png','UnBound','UnBound',0,'Enable','Delete','canary','2015-06-14 00:37:50','canary','2015-06-14 00:11:04');
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_website`
--

DROP TABLE IF EXISTS `t_website`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_website` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(128) DEFAULT NULL COMMENT '键',
  `value` varchar(128) DEFAULT NULL COMMENT '值',
  `description` varchar(128) DEFAULT NULL COMMENT '描述',
  `delete_status` varchar(128) DEFAULT NULL COMMENT '删除状态',
  `operator` varchar(128) DEFAULT NULL COMMENT '操作人',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='站点基础信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_website`
--

LOCK TABLES `t_website` WRITE;
/*!40000 ALTER TABLE `t_website` DISABLE KEYS */;
INSERT INTO `t_website` VALUES (1,'title','金丝雀','网站标题','NotDelete','canary','2015-07-27 11:17:45','system','2015-04-01 12:00:00'),(2,'description','金丝雀','网站描述','NotDelete','canary','2015-07-27 11:17:45','system','2015-04-01 12:00:00'),(3,'keywords','金丝雀，金雀','网站关键字','NotDelete','canary','2015-07-27 11:17:45','system','2015-04-01 12:00:00'),(4,'url','www.canary.com','网站网址','NotDelete','canary','2015-07-27 11:17:45','system','2015-04-01 12:00:00'),(6,'email','canary@qq.com','网站邮箱','NotDelete','canary','2015-07-27 11:17:45','system','2015-04-01 12:00:00'),(7,'icp','京ICP证030173号','网站备案号','NotDelete','canary','2015-07-27 11:17:45','system','2015-04-01 12:00:00'),(8,'meta','<script>console.log(\'website.script\');</script>','网站统计代码','NotDelete','canary','2015-07-27 11:17:45','system','2015-04-01 12:00:00'),(9,'about','关于我们','关于我们','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(10,'contact','联系我们','联系我们','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(11,'contribution','投稿','投稿','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(12,'copyright','版权声明','版权声明','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(13,'link','友情链接','友情链接','NotDelete','canary','2015-07-27 11:36:05','system','2015-04-01 12:00:00'),(14,'topAd','顶部广告','上部广告','NotDelete','canary','2015-07-27 11:57:19','system','2015-04-01 12:00:00'),(15,'centerAd','</script><script type=\'text/javascript\' src=\'http://images.sohu.com/cs/jsfile/js/c.js\'></script>','中间广告','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(16,'bottomAd','</script><script type=\'text/javascript\' src=\'http://images.sohu.com/cs/jsfile/js/c.js\'></script>','下部广告','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00'),(17,'rightAd','</script><script type=\'text/javascript\' src=\'http://images.sohu.com/cs/jsfile/js/c.js\'></script>','右侧广告','NotDelete','system','2015-04-01 12:00:00','system','2015-04-01 12:00:00');
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

-- Dump completed on 2015-08-29 11:07:40
