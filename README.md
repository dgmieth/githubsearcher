# githubsearcher
------------------------------------------------------------------------
------------------------------------------------------------------------
INSTALAÇÃO
Aplicação roda em um container docker
Aplicacação rodando em http://ec2-18-230-123-107.sa-east-1.compute.amazonaws.com/

------------------------------------------------------------------------
Necessário ter instalado e rodando docker docker compose,nodejs e npm

Para instalação em servidor linux Ubuntu
  apt-get docker.io docker-compose
Crie um diretório no servidor para receber a aplicação. Clone-a ou faça download do .zip e aloque-a nessa pasta (https://github.com/dgmieth/githubsearcher.git)

------------------------------------------------------------------------
------------------------------------------------------------------------
CONFIGURANDO A APLICAÇÃO
  VARIÁVEIS DE CONFIGURAÇÃO
    Criar arquivo .env.deployment no root da aplicação
      Alterar os valores de [user],[password],[database]
      Criar um github token acessando https://github.com >> account >> settings >> Developer Settings >> Personal access tokens >> Generate new token e colar o valor em [gitHubToken]
      
-------------------------------------------------------------------------------
.env.deployment
-------------------------------------------------------------------------------
    APP_ENV=deployment
    #=====================================================================
    #=====================================================================
    #                       DATABASE CREDENTIALS
    DB_USER=[user]
    DB_PASSWORD=[password]
    DB_DATABASE=[database]
    DB_HOST=localhost

    DB_QUEUELIMIT=0
    DB_CONNECTIONLIMIT=100
    #=====================================================================
    #=====================================================================
    #                       GITHUB CREDENTIALS
    GITHUB_TOKEN=[gitHubToken]
    GITHUB_USER=[gitUser]
-------------------------------------------------------------------------------
.env.test
-------------------------------------------------------------------------------
    APP_ENV=test
    #=====================================================================
    #=====================================================================
    #                       DATABASE CREDENTIALS
    DB_USER=githubSearcherTest
    DB_PASSWORD=githubSearcherTest
    DB_DATABASE=githubSearcherTest
    DB_HOST=localhost

    DB_QUEUELIMIT=0
    DB_CONNECTIONLIMIT=100
    #=====================================================================
    #=====================================================================
    #                       GITHUB CREDENTIALS
    GITHUB_TOKEN=[gitHubToken]
    GITHUB_USER=[gitUser]
    
CONFIGURANDO MYSQL DATABASE
  INICIAL
    executar o comando npm install
    executar o comando docker-compose up

  CONFIGURANDO BASE DE DADOS
    Configuração do MySQL
      MYSQL_HOST -> [localhost ou ip do host ou dns do host]
      MYSQL_PORT -> 3306
      MYSQL_USER= root e 
      MYSQL_PASSWORD = (por padrão: root. Para alterar, acessar docker-compose.yml >> db >> environment >>  MYSQL_ROOT_PASSWORD=[newPassword]

    Abra o mysql em algum gerenciador de base de dados para criar a base da aplicação usando os sql scripts
      BASE NORMAL (alterar DB_USER, DB_PASSWORD, DB_DATABASE para os mesmos valores usados no .evn.deployment >> DATABASE CREDENTIALS)
        DROP DATABASE IF EXISTS [DB_DATABASE];
        DROP USER IF EXISTS [DB_USER];
        /*CREATING DATABASE*/
        CREATE DATABASE IF NOT EXISTS [DB_DATABASE];
        /*database user creation*/
        CREATE USER '[DB_USER]'@'%' IDENTIFIED BY '[DB_PASSWORD]';
        GRANT ALL PRIVILEGES ON [DB_DATABASE].* To '[DB_USER]'@'%';
        /*SELECTING DATABASE*/
        USE [DB_DATABASE];
        /*searchGroup table holds the data and languages for the executed search*/
        CREATE TABLE IF NOT EXISTS `searchGroup` (
          `id` bigint(11) NOT NULL AUTO_INCREMENT,
          `searchDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          `languages` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
          `reposPerPage` int(11) NOT NULL DEFAULT '0',
          UNIQUE KEY `searchDate_ID` (`id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
        /*searcResults holds the single results*/
        CREATE TABLE IF NOT EXISTS `searchResults` (
          `resultId` bigint(11) NOT NULL AUTO_INCREMENT,
          `id` bigint(22) NOT NULL,
          `name` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
          `fullName` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
          `ownerId` bigint(22) DEFAULT NULL,
          `onwerName` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
          `ownerAvatar` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
          `onwerHomeUrl` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
          `onwerType` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
          `repoUrl` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
          `createdAt` timestamp NULL DEFAULT NULL,
          `updatedAt` timestamp NULL DEFAULT NULL,
          `gitUrl` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
          `homePage` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
          `watchers` bigint(22) DEFAULT NULL,
          `language` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
          `openIssues` bigint(11) DEFAULT NULL,
          `description` text COLLATE utf8_unicode_ci,
          PRIMARY KEY (`resultId`) USING BTREE
        ) ENGINE=InnoDB AUTO_INCREMENT=322 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
        /*searchDate and searchResults table that links searchGroup to searcResults*/
        CREATE TABLE IF NOT EXISTS `searchDate_searchResults` (
          `searchGroup_id` bigint(11) NOT NULL,
          `searchResults_ID` bigint(11) NOT NULL,
          KEY `searchDate_searchResults_FK_1` (`searchResults_ID`),
          KEY `searchDate_searchResults_FK` (`searchGroup_id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
        
        
      BASE TEST (valores padrão para DB_USER, DB_PASSWORD, DB_DATABASE = githubSearcherTest)
        DROP DATABASE IF EXISTS githubSearcherTest;
        DROP USER IF EXISTS githubSearcherTest;
        /*CREATE TEST DATABASE*/
        CREATE DATABASE githubSearcherTest;
        /*searchGroup table holds the data and languages for the executed search*/
        USE githubSearcherTest;
        /*database user creation*/
        CREATE USER 'githubSearcherTest'@'%' IDENTIFIED BY 'githubSearcherTest';
        GRANT ALL PRIVILEGES ON githubSearcherTest.* To 'githubSearcherTest'@'%';
        CREATE TABLE IF NOT EXISTS `searchGroup` (
          `id` bigint(11) NOT NULL AUTO_INCREMENT,
          `searchDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          `languages` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
          `reposPerPage` int(11) NOT NULL DEFAULT '0',
          UNIQUE KEY `searchDate_ID` (`id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
        /*searcResults holds the single results*/
        CREATE TABLE IF NOT EXISTS `searchResults` (
          `resultId` bigint(11) NOT NULL AUTO_INCREMENT,
          `id` bigint(22) NOT NULL,
          `name` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
          `fullName` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
          `ownerId` bigint(22) DEFAULT NULL,
          `onwerName` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
          `ownerAvatar` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
          `onwerHomeUrl` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
          `onwerType` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
          `repoUrl` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
          `createdAt` timestamp NULL DEFAULT NULL,
          `updatedAt` timestamp NULL DEFAULT NULL,
          `gitUrl` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
          `homePage` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
          `watchers` bigint(22) DEFAULT NULL,
          `language` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
          `openIssues` bigint(11) DEFAULT NULL,
          `description` text COLLATE utf8_unicode_ci,
          PRIMARY KEY (`resultId`) USING BTREE
        ) ENGINE=InnoDB AUTO_INCREMENT=322 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
        /*searchDate and searchResults table that links searchGroup to searcResults*/
        CREATE TABLE IF NOT EXISTS `searchDate_searchResults` (
          `searchGroup_id` bigint(11) NOT NULL,
          `searchResults_ID` bigint(11) NOT NULL,
          KEY `searchDate_searchResults_FK_1` (`searchResults_ID`),
          KEY `searchDate_searchResults_FK` (`searchGroup_id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
        /*INSERT DATA INTO DATABASE*/
        /*searchResults*/
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(106976253,'Test -> XiaoMi-Pro-Hackintosh','undefined',18546540,'undefined','https://avatars.githubusercontent.com/u/18546540?v=4','https://github.com/daliansky','User','https://github.com/daliansky/XiaoMi-Pro-Hackintosh','2017-10-15 01:55:09','2021-07-06 06:42:05','git://github.com/daliansky/XiaoMi-Pro-Hackintosh.git','',2274,'ASL',84,'XiaoMi NoteBook Pro Hackintosh');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(35952971,'Test -> pgdoc-cn','undefined',12530370,'undefined','https://avatars.githubusercontent.com/u/12530370?v=4','https://github.com/postgres-cn','Organization','https://github.com/postgres-cn/pgdoc-cn','2015-05-20 14:26:26','2021-07-06 01:23:51','git://github.com/postgres-cn/pgdoc-cn.git','http://www.postgres.cn/docs',1333,'ASL',8,'PostgreSQL manual Chinese translation by China PostgreSQL Users Group');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(193953429,'Test -> HaC-Mini','undefined',50960678,'undefined','https://avatars.githubusercontent.com/u/50960678?v=4','https://github.com/osy','User','https://github.com/osy/HaC-Mini','2019-06-26 17:55:50','2021-07-06 06:47:16','git://github.com/osy/HaC-Mini.git','null',930,'ASL',28,'Intel NUC Hades Canyon Hackintosh support');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(197141423,'Test -> OC-little','undefined',18546540,'undefined','https://avatars.githubusercontent.com/u/18546540?v=4','https://github.com/daliansky','User','https://github.com/daliansky/OC-little','2019-07-16 07:17:13','2021-07-06 09:23:16','git://github.com/daliansky/OC-little.git','',1199,'ASL',6,'ACPI Hotpatch Samples for the OpenCore Bootloader');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(266800505,'Test -> edk2-sdm845','undefined',63859504,'undefined','https://avatars.githubusercontent.com/u/63859504?v=4','https://github.com/edk2-porting','Organization','https://github.com/edk2-porting/edk2-sdm845','2020-05-25 14:29:01','2021-07-07 06:45:11','git://github.com/edk2-porting/edk2-sdm845.git','',482,'ASL',3,'(Maybe) Generic edk2 port for sdm845');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(66211214,'Test -> DellXPS15-9550-OSX','undefined',441389,'undefined','https://avatars.githubusercontent.com/u/441389?v=4','https://github.com/wmchris','User','https://github.com/wmchris/DellXPS15-9550-OSX','2016-08-21 17:24:06','2021-07-06 07:04:47','git://github.com/wmchris/DellXPS15-9550-OSX.git','http://www.insanelymac.com/forum/topic/319764-dell-xps-15-9550-installation-tutorial/',433,'ASL',5,'Tutorial for a full working Mac OS (10.11 up to 11.0) enviroment on the Dell XPS 15 (9550)');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(67724755,'Test -> gps','undefined',7767877,'undefined','https://avatars.githubusercontent.com/u/7767877?v=4','https://github.com/AdaCore','Organization','https://github.com/AdaCore/gps','2016-09-08 17:22:47','2021-07-07 03:43:10','git://github.com/AdaCore/gps.git','',219,'Ada',37,'GNAT Studio is a powerful and lightweight IDE for Ada and SPARK.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(66867667,'Test -> spark2014','undefined',7767877,'undefined','https://avatars.githubusercontent.com/u/7767877?v=4','https://github.com/AdaCore','Organization','https://github.com/AdaCore/spark2014','2016-08-29 18:04:04','2021-07-06 23:57:23','git://github.com/AdaCore/spark2014.git','null',129,'Ada',0,'SPARK 2014 is the new version of SPARK, a software development technology specifically designed for engineering high-reliability applications.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(37367962,'Test -> whitakers-words','undefined',923403,'undefined','https://avatars.githubusercontent.com/u/923403?v=4','https://github.com/mk270','User','https://github.com/mk270/whitakers-words','2015-06-13 10:49:01','2021-07-03 16:59:17','git://github.com/mk270/whitakers-words.git','http://mk270.github.io/whitakers-words/',163,'Ada',46,'William Whitaker s WORDS, a Latin dictionary');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(7952676,'Test -> AdaDoom3','undefined',3445599,'undefined','https://avatars.githubusercontent.com/u/3445599?v=4','https://github.com/AdaDoom3','User','https://github.com/AdaDoom3/AdaDoom3','2013-02-01 05:55:22','2021-06-07 21:54:42','git://github.com/AdaDoom3/AdaDoom3.git','',215,'Ada',8,'Id Software s Id-tech-4-BFG in the Ada programming language. ');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(47921222,'Test -> synth','undefined',1125622,'undefined','https://avatars.githubusercontent.com/u/1125622?v=4','https://github.com/jrmarino','User','https://github.com/jrmarino/synth','2015-12-13 13:54:58','2021-06-28 20:29:39','git://github.com/jrmarino/synth.git','null',224,'Ada',26,'Next D/Ports build tool for live systems (Alternative for Portmaster and Portupgrade tools)');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(66300413,'Test -> win-10-virtual-desktop-enhancer','undefined',1726977,'undefined','https://avatars.githubusercontent.com/u/1726977?v=4','https://github.com/sdias','User','https://github.com/sdias/win-10-virtual-desktop-enhancer','2016-08-22 19:06:20','2021-07-03 20:17:22','git://github.com/sdias/win-10-virtual-desktop-enhancer.git','',1599,'AutoHotkey',68,'An application that enhances the Windows 10 multiple desktops feature by adding additional keyboard shortcuts and support for multiple wallpapers.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(43378137,'Test -> Ada_Drivers_Library','undefined',7767877,'undefined','https://avatars.githubusercontent.com/u/7767877?v=4','https://github.com/AdaCore','Organization','https://github.com/AdaCore/Ada_Drivers_Library','2015-09-29 16:00:11','2021-06-29 08:52:02','git://github.com/AdaCore/Ada_Drivers_Library.git','null',173,'Ada',10,'Ada source code and complete sample GNAT projects for selected bare-board platforms supported by GNAT.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(10030222,'Test -> PuloversMacroCreator','undefined',4416483,'undefined','https://avatars.githubusercontent.com/u/4416483?v=4','https://github.com/Pulover','User','https://github.com/Pulover/PuloversMacroCreator','2013-05-13 11:28:51','2021-07-06 20:50:43','git://github.com/Pulover/PuloversMacroCreator.git','http://www.macrocreator.com',880,'AutoHotkey',15,'Automation Utility - Recorder & Script Generator');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(2097941,'Test -> Starling-Framework','undefined',1333064,'undefined','https://avatars.githubusercontent.com/u/1333064?v=4','https://github.com/Gamua','Organization','https://github.com/Gamua/Starling-Framework','2011-07-24 20:11:22','2021-07-03 02:43:40','git://github.com/Gamua/Starling-Framework.git','http://www.starling-framework.org',2288,'ActionScript',84,'The Cross Platform Game Engine');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(51282144,'Test -> windows-desktop-switcher','undefined',3607064,'undefined','https://avatars.githubusercontent.com/u/3607064?v=4','https://github.com/pmb6tz','User','https://github.com/pmb6tz/windows-desktop-switcher','2016-02-08 06:13:18','2021-07-06 20:05:56','git://github.com/pmb6tz/windows-desktop-switcher.git','null',608,'AutoHotkey',11,'An AutoHotKey script for Windows that lets a user change virtual desktops by pressing CapsLock + <num>. ');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(803270,'Test -> as3corelib','undefined',37918,'undefined','https://avatars.githubusercontent.com/u/37918?v=4','https://github.com/mikechambers','User','https://github.com/mikechambers/as3corelib','2010-07-28 17:05:33','2021-06-28 23:17:17','git://github.com/mikechambers/as3corelib.git','',1484,'ActionScript',121,' An ActionScript 3 Library that contains a number of classes and utilities for working with ActionScript? 3. These include classes for MD5 and SHA 1 hashing, Image encoders, and JSON serialization as well as general String, Number and Date APIs.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(17386571,'Test -> bug.n','undefined',1643722,'undefined','https://avatars.githubusercontent.com/u/1643722?v=4','https://github.com/fuhsjr00','User','https://github.com/fuhsjr00/bug.n','2014-03-04 01:34:45','2021-07-06 15:20:33','git://github.com/fuhsjr00/bug.n.git','null',2703,'AutoHotkey',110,'Tiling Window Manager for Windows');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(17383170,'Test -> webcamjs','undefined',700765,'undefined','https://avatars.githubusercontent.com/u/700765?v=4','https://github.com/jhuckaby','User','https://github.com/jhuckaby/webcamjs','2014-03-03 22:59:43','2021-07-03 03:50:37','git://github.com/jhuckaby/webcamjs.git','',2324,'ActionScript',155,'HTML5 Webcam Image Capture Library with Flash Fallback');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(19706194,'Test -> scratch-flash','undefined',3420800,'undefined','https://avatars.githubusercontent.com/u/3420800?v=4','https://github.com/LLK','Organization','https://github.com/LLK/scratch-flash','2014-05-12 16:23:25','2021-06-23 23:55:42','git://github.com/LLK/scratch-flash.git','https://scratch.mit.edu',1313,'ActionScript',0,'Open source version of the Scratch 2.0 project editor.  This is the basis for the online and offline versions of Scratch found on the website.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(55115675,'Test -> 2nd-keyboard','undefined',16040799,'undefined','https://avatars.githubusercontent.com/u/16040799?v=4','https://github.com/TaranVH','User','https://github.com/TaranVH/2nd-keyboard','2016-03-31 03:02:01','2021-07-07 03:13:32','git://github.com/TaranVH/2nd-keyboard.git','https://www.youtube.com/watch?v=O6ERELse_QY',1283,'AutoHotkey',63,'ALL of Taran s scripts - not just for the 2nd keyboard.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(98460473,'Test -> open-source-flash','undefined',30782086,'undefined','https://avatars.githubusercontent.com/u/30782086?v=4','https://github.com/open-source-flash','Organization','https://github.com/open-source-flash/open-source-flash','2017-07-26 19:52:07','2021-07-06 15:05:42','git://github.com/open-source-flash/open-source-flash.git','',7351,'ActionScript',33,'Petition to open source Flash and Shockwave spec');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(44403028,'Test -> VVVVVV','undefined',2874150,'undefined','https://avatars.githubusercontent.com/u/2874150?v=4','https://github.com/TerryCavanagh','User','https://github.com/TerryCavanagh/VVVVVV','2015-10-16 18:17:22','2021-07-06 13:42:38','git://github.com/TerryCavanagh/VVVVVV.git','',6206,'ActionScript',28,'The source code to VVVVVV! http://thelettervsixtim.es/');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(18408635,'Test -> Apollo-11','undefined',2200898,'undefined','https://avatars.githubusercontent.com/u/2200898?v=4','https://github.com/chrislgarry','User','https://github.com/chrislgarry/Apollo-11','2014-04-03 15:45:02','2021-07-07 01:07:26','git://github.com/chrislgarry/Apollo-11.git','',51040,'Assembly',107,'Original Apollo 11 Guidance Computer (AGC) source code for the command and lunar modules.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(18079664,'Test -> mal','undefined',70127,'undefined','https://avatars.githubusercontent.com/u/70127?v=4','https://github.com/kanaka','User','https://github.com/kanaka/mal','2014-03-24 21:33:23','2021-07-07 02:59:29','git://github.com/kanaka/mal.git','',7947,'Assembly',37,'mal - Make a Lisp');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(4047080,'Test -> Prince-of-Persia-Apple-II','undefined',1650049,'undefined','https://avatars.githubusercontent.com/u/1650049?v=4','https://github.com/jmechner','User','https://github.com/jmechner/Prince-of-Persia-Apple-II','2012-04-16 23:40:34','2021-07-07 01:34:00','git://github.com/jmechner/Prince-of-Persia-Apple-II.git','http://jordanmechner.com/ebook',5554,'Assembly',0,'A running-jumping-swordfighting game I made on the Apple II from 1985-89');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(138634298,'Test -> MS-DOS','undefined',6154722,'undefined','https://avatars.githubusercontent.com/u/6154722?v=4','https://github.com/microsoft','Organization','https://github.com/microsoft/MS-DOS','2018-06-25 18:26:02','2021-07-06 23:10:32','git://github.com/microsoft/MS-DOS.git','null',15953,'Assembly',252,'The original sources of MS-DOS 1.25 and 2.0, for reference purposes');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(302800491,'Test -> MalwareSourceCode','undefined',57078196,'undefined','https://avatars.githubusercontent.com/u/57078196?v=4','https://github.com/vxunderground','User','https://github.com/vxunderground/MalwareSourceCode','2020-10-10 02:48:57','2021-07-07 04:58:04','git://github.com/vxunderground/MalwareSourceCode.git','https://vx-underground.org',6351,'Assembly',1,'Collection of malware source code for a variety of platforms in an array of different programming languages.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(34096,'Test -> hello-world','undefined',4377,'undefined','https://avatars.githubusercontent.com/u/4377?v=4','https://github.com/leachim6','User','https://github.com/leachim6/hello-world','2008-07-15 00:15:08','2021-07-07 05:51:03','git://github.com/leachim6/hello-world.git','http://github.com/leachim6/hello-world/wikis',6886,'Assembly',28,'Hello world in every computer language.  Thanks to everyone who contributes to this, make sure to see CONTRIBUTING.md for contribution instructions!');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(1481305,'Test -> python-guide','undefined',5448020,'undefined','https://avatars.githubusercontent.com/u/5448020?v=4','https://github.com/realpython','Organization','https://github.com/realpython/python-guide','2011-03-15 03:24:20','2021-07-07 06:47:43','git://github.com/realpython/python-guide.git','https://docs.python-guide.org',23243,'Batchfile',98,'Python best practices guidebook, written for humans. ');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(380026512,'Test -> WhyNotWin11','undefined',716581,'undefined','https://avatars.githubusercontent.com/u/716581?v=4','https://github.com/rcmaehl','User','https://github.com/rcmaehl/WhyNotWin11','2021-06-24 19:08:22','2021-07-07 06:34:43','git://github.com/rcmaehl/WhyNotWin11.git','',4248,'AutoIt',31,'Detection Script to help identify why your PC isn t Windows 11  Release Ready');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(98460473,'Test -> open-source-flash','undefined',30782086,'undefined','https://avatars.githubusercontent.com/u/30782086?v=4','https://github.com/open-source-flash','Organization','https://github.com/open-source-flash/open-source-flash','2017-07-26 19:52:07','2021-07-06 15:05:42','git://github.com/open-source-flash/open-source-flash.git','',7351,'ActionScript',33,'Petition to open source Flash and Shockwave spec');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(18408635,'Test -> Apollo-11','undefined',2200898,'undefined','https://avatars.githubusercontent.com/u/2200898?v=4','https://github.com/chrislgarry','User','https://github.com/chrislgarry/Apollo-11','2014-04-03 15:45:02','2021-07-07 01:07:26','git://github.com/chrislgarry/Apollo-11.git','',51040,'Assembly',107,'Original Apollo 11 Guidance Computer (AGC) source code for the command and lunar modules.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(17386571,'Test -> bug.n','undefined',1643722,'undefined','https://avatars.githubusercontent.com/u/1643722?v=4','https://github.com/fuhsjr00','User','https://github.com/fuhsjr00/bug.n','2014-03-04 01:34:45','2021-07-06 15:20:33','git://github.com/fuhsjr00/bug.n.git','null',2703,'AutoHotkey',110,'Tiling Window Manager for Windows');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(67724755,'Test -> gps','undefined',7767877,'undefined','https://avatars.githubusercontent.com/u/7767877?v=4','https://github.com/AdaCore','Organization','https://github.com/AdaCore/gps','2016-09-08 17:22:47','2021-07-07 03:43:10','git://github.com/AdaCore/gps.git','',219,'Ada',37,'GNAT Studio is a powerful and lightweight IDE for Ada and SPARK.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(47921222,'Test -> synth','undefined',1125622,'undefined','https://avatars.githubusercontent.com/u/1125622?v=4','https://github.com/jrmarino','User','https://github.com/jrmarino/synth','2015-12-13 13:54:58','2021-06-28 20:29:39','git://github.com/jrmarino/synth.git','null',224,'Ada',26,'Next D/Ports build tool for live systems (Alternative for Portmaster and Portupgrade tools)');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(7952676,'Test -> AdaDoom3','undefined',3445599,'undefined','https://avatars.githubusercontent.com/u/3445599?v=4','https://github.com/AdaDoom3','User','https://github.com/AdaDoom3/AdaDoom3','2013-02-01 05:55:22','2021-06-07 21:54:42','git://github.com/AdaDoom3/AdaDoom3.git','',215,'Ada',8,'Id Software s Id-tech-4-BFG in the Ada programming language. ');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(35952971,'Test -> pgdoc-cn','undefined',12530370,'undefined','https://avatars.githubusercontent.com/u/12530370?v=4','https://github.com/postgres-cn','Organization','https://github.com/postgres-cn/pgdoc-cn','2015-05-20 14:26:26','2021-07-06 01:23:51','git://github.com/postgres-cn/pgdoc-cn.git','http://www.postgres.cn/docs',1333,'ASL',8,'PostgreSQL manual Chinese translation by China PostgreSQL Users Group');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(106976253,'Test -> XiaoMi-Pro-Hackintosh','undefined',18546540,'undefined','https://avatars.githubusercontent.com/u/18546540?v=4','https://github.com/daliansky','User','https://github.com/daliansky/XiaoMi-Pro-Hackintosh','2017-10-15 01:55:09','2021-07-06 06:42:05','git://github.com/daliansky/XiaoMi-Pro-Hackintosh.git','',2274,'ASL',84,'XiaoMi NoteBook Pro Hackintosh');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(197141423,'Test -> OC-little','undefined',18546540,'undefined','https://avatars.githubusercontent.com/u/18546540?v=4','https://github.com/daliansky','User','https://github.com/daliansky/OC-little','2019-07-16 07:17:13','2021-07-06 09:23:16','git://github.com/daliansky/OC-little.git','',1199,'ASL',6,'ACPI Hotpatch Samples for the OpenCore Bootloader');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(138634298,'Test -> MS-DOS','undefined',6154722,'undefined','https://avatars.githubusercontent.com/u/6154722?v=4','https://github.com/microsoft','Organization','https://github.com/microsoft/MS-DOS','2018-06-25 18:26:02','2021-07-06 23:10:32','git://github.com/microsoft/MS-DOS.git','null',15953,'Assembly',252,'The original sources of MS-DOS 1.25 and 2.0, for reference purposes');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(18079664,'Test -> mal','undefined',70127,'undefined','https://avatars.githubusercontent.com/u/70127?v=4','https://github.com/kanaka','User','https://github.com/kanaka/mal','2014-03-24 21:33:23','2021-07-07 02:59:29','git://github.com/kanaka/mal.git','',7947,'Assembly',37,'mal - Make a Lisp');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(18408635,'Test -> Apollo-11','undefined',2200898,'undefined','https://avatars.githubusercontent.com/u/2200898?v=4','https://github.com/chrislgarry','User','https://github.com/chrislgarry/Apollo-11','2014-04-03 15:45:02','2021-07-07 01:07:26','git://github.com/chrislgarry/Apollo-11.git','',51040,'Assembly',107,'Original Apollo 11 Guidance Computer (AGC) source code for the command and lunar modules.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(98460473,'Test -> open-source-flash','undefined',30782086,'undefined','https://avatars.githubusercontent.com/u/30782086?v=4','https://github.com/open-source-flash','Organization','https://github.com/open-source-flash/open-source-flash','2017-07-26 19:52:07','2021-07-06 15:05:42','git://github.com/open-source-flash/open-source-flash.git','',7351,'ActionScript',33,'Petition to open source Flash and Shockwave spec');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(17386571,'Test -> bug.n','undefined',1643722,'undefined','https://avatars.githubusercontent.com/u/1643722?v=4','https://github.com/fuhsjr00','User','https://github.com/fuhsjr00/bug.n','2014-03-04 01:34:45','2021-07-06 15:20:33','git://github.com/fuhsjr00/bug.n.git','null',2703,'AutoHotkey',110,'Tiling Window Manager for Windows');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(17383170,'Test -> webcamjs','undefined',700765,'undefined','https://avatars.githubusercontent.com/u/700765?v=4','https://github.com/jhuckaby','User','https://github.com/jhuckaby/webcamjs','2014-03-03 22:59:43','2021-07-03 03:50:37','git://github.com/jhuckaby/webcamjs.git','',2324,'ActionScript',155,'HTML5 Webcam Image Capture Library with Flash Fallback');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(44403028,'Test -> VVVVVV','undefined',2874150,'undefined','https://avatars.githubusercontent.com/u/2874150?v=4','https://github.com/TerryCavanagh','User','https://github.com/TerryCavanagh/VVVVVV','2015-10-16 18:17:22','2021-07-06 13:42:38','git://github.com/TerryCavanagh/VVVVVV.git','',6206,'ActionScript',28,'The source code to VVVVVV! http://thelettervsixtim.es/');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(55115675,'Test -> 2nd-keyboard','undefined',16040799,'undefined','https://avatars.githubusercontent.com/u/16040799?v=4','https://github.com/TaranVH','User','https://github.com/TaranVH/2nd-keyboard','2016-03-31 03:02:01','2021-07-07 03:13:32','git://github.com/TaranVH/2nd-keyboard.git','https://www.youtube.com/watch?v=O6ERELse_QY',1283,'AutoHotkey',63,'ALL of Taran s scripts - not just for the 2nd keyboard.');
        INSERT INTO githubSearcherTest.searchResults (id,name,fullName,ownerId,onwerName,ownerAvatar,onwerHomeUrl,onwerType,repoUrl,createdAt,updatedAt,gitUrl,homePage,watchers,`language`,openIssues,description) VALUES(66300413,'Test -> win-10-virtual-desktop-enhancer','undefined',1726977,'undefined','https://avatars.githubusercontent.com/u/1726977?v=4','https://github.com/sdias','User','https://github.com/sdias/win-10-virtual-desktop-enhancer','2016-08-22 19:06:20','2021-07-03 20:17:22','git://github.com/sdias/win-10-virtual-desktop-enhancer.git','',1599,'AutoHotkey',68,'An application that enhances the Windows 10 multiple desktops feature by adding additional keyboard shortcuts and support for multiple wallpapers.');
        /*searchDate_searchResults*/
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id ,searchResults_ID) VALUES (52,322);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,330);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,328);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,323);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,326);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,325);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,327);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,324);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,329);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,341);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,331);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,342);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,333);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,349);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,339);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,338);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,332);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,347);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,334);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,340);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,343);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,335);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,337);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,345);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,346);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,350);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,348);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,336);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (52,344);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (53,351);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (53,353);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (53,352);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (53,354);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (53,355);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,356);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,358);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,357);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,359);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,360);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,362);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,361);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,366);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,365);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,364);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,367);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,368);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,370);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,369);
        INSERT INTO githubSearcherTest.searchDate_searchResults (searchGroup_id,searchResults_ID) VALUES (54,363);
        /*searchGroup*/
        INSERT INTO githubSearcherTest.searchGroup (searchDate,languages,reposPerPage) VALUES('2021-07-07 03:47:05','Test -> ActionScript,Ada,ASL,Assembly,AutoHotkey',6);
        INSERT INTO githubSearcherTest.searchGroup (searchDate,languages,reposPerPage) VALUES('2021-07-07 03:50:01','Test -> ActionScript,Assembly,AutoHotkey,AutoIt,Batchfile',1);
        INSERT INTO githubSearcherTest.searchGroup (searchDate,languages,reposPerPage) VALUES('2021-07-07 03:50:16','Test -> ActionScript,Ada,ASL,Assembly,AutoHotkey',3);
        
        
CONFIGURAÇÃO DE EXECUÇÃO
    comando -> deployment -> npm run-script runAPP
    
MODO DEPLOYMENT
  Após o comando docker-compose up e a configuração da base, a aplicação já estará rodando em modo deployment
  Para alterar a applicação novamente para modo deployment, altere o command em docker-compose.yml e CMD em Dockerfile para npm run-scritp runApp

MODO TESTE
  Interromper a execução da applicação no docker
  Alterar o valor de command em command em docker-compose.yml e CMD em Dockerfile para npm run-scritp runApp
  Executar docker-compose up
