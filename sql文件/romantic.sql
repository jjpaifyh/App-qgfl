/*
Navicat MySQL Data Transfer

Source Server         : asda
Source Server Version : 50735
Source Host           : localhost:3306
Source Database       : romantic

Target Server Type    : MYSQL
Target Server Version : 50735
File Encoding         : 65001

Date: 2022-06-09 09:33:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `isDefault` varchar(255) DEFAULT NULL,
  `userId` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', '张珊', '18975648569', '河北省-张家口市-下花园区', '26号院', '1', '32');
INSERT INTO `address` VALUES ('2', '囧事', '18975648569', '广西省-桂林市-全州县', '凤凰仙', '0', '32');
INSERT INTO `address` VALUES ('3', '张嘉佳', '12654785412', '北京省-桂林市-泉州县', '巴黎改', '1', '33');
INSERT INTO `address` VALUES ('4', '将军金甲夜不脱', '15478956585', '广州-深圳-广交会', '12号楼', '0', '35');
INSERT INTO `address` VALUES ('15', '爱你', '15795623659', '山西省-太原市-小店区', '爱你楼', '0', '32');

-- ----------------------------
-- Table structure for goods_cart
-- ----------------------------
DROP TABLE IF EXISTS `goods_cart`;
CREATE TABLE `goods_cart` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uId` int(10) DEFAULT NULL,
  `goods_id` int(10) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `pprice` varchar(225) DEFAULT NULL,
  `num` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_cart
-- ----------------------------
INSERT INTO `goods_cart` VALUES ('1', '35', '1', '好看的衣服，美丽的人生，爆款8456', '../../static/img/commodity1.jpg', '299', '1');
INSERT INTO `goods_cart` VALUES ('2', '35', '2', '花瓶是你吗', '../../static/img/commodity2.jpg', '2200', '2');

-- ----------------------------
-- Table structure for goods_search
-- ----------------------------
DROP TABLE IF EXISTS `goods_search`;
CREATE TABLE `goods_search` (
  `id` int(10) NOT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `pprice` varchar(255) DEFAULT NULL,
  `oprice` varchar(255) DEFAULT NULL,
  `discount` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_search
-- ----------------------------
INSERT INTO `goods_search` VALUES ('1', '../../static/img/commodity1.jpg', '好看的衣服，美丽的人生，爆款8456', '299', '659', '5.6');
INSERT INTO `goods_search` VALUES ('2', '../../static/img/commodity2.jpg', '花瓶是你吗', '2200', '1340', '5.9');
INSERT INTO `goods_search` VALUES ('3', '../../static/img/commodity3.jpg', '爱的魔力花瓶', '299', '659', '5.6');
INSERT INTO `goods_search` VALUES ('4', '../../static/img/commodity4.jpg', '加油加油，不加油难道进厂打工？', '2200', '1340', '5.9');
INSERT INTO `goods_search` VALUES ('5', '../../static/img/commodity4.jpg', '爱国不可耻', '2200', '1340', '5.9');
INSERT INTO `goods_search` VALUES ('6', '../../static/img/commodity1.jpg', '爱国不可耻', '2200', '1340', '5.9');
INSERT INTO `goods_search` VALUES ('7', '../../static/img/commodity2.jpg', '爱国不可耻', '2200', '1340', '5.9');
INSERT INTO `goods_search` VALUES ('8', '../../static/img/commodity3.jpg', '爱学习的穿山甲', '2200', '1340', '5.9');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `userPwd` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `nickName` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('32', '', 'undefined', 'F2', 'http://qzapp.qlogo.cn/qzapp/1104455702/F2DC6937BDACB96819E4D3E32CB34463/30', '清风怡旋', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRjIiLCJpYXQiOjE2NTQ1ODY4Mjl9.JFj92cx4cIhqymJMWrBkVggmQvdO1mgSxsAqth1SXPc', 'qq', 'F2DC6937BDACB96819E4D3E32CB34463');
INSERT INTO `user` VALUES ('33', '', 'undefined', '41', 'http://qzapp.qlogo.cn/qzapp/1104455702/41BFD535CC9D1D7BB61ADBCF2B6743F5/30', '三岁的你', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiNDEiLCJpYXQiOjE2NTQ1ODkxNDl9.5ZX3Z-P2ZGYj-ACB0JXRbJKDPOz8sZVgmU8eHhqsRxU', 'qq', '41BFD535CC9D1D7BB61ADBCF2B6743F5');
INSERT INTO `user` VALUES ('35', '', '18378083282', '18378083282', '../../static/img/hot1.jpg', '默认昵称', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTgzNzgwODMyODIiLCJpYXQiOjE2NTQ2MDIzMzJ9.GIHctGqNcWSTmEBFzakiYZdMTsk4c8bOs5QjdfUFdqY', 'undefined', 'undefined');
