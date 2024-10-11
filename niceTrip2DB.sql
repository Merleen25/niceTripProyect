/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - nicetrip2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nicetrip2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `nicetrip2`;

/*Table structure for table `cliente` */

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `nomber` char(50) DEFAULT NULL,
  `apellido` char(50) DEFAULT NULL,
  `numeroTelefono` int(11) DEFAULT NULL,
  `correoElectronico` char(50) DEFAULT NULL,
  `clave` char(50) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `cliente` */

/*Table structure for table `estado` */

DROP TABLE IF EXISTS `estado`;

CREATE TABLE `estado` (
  `idEstadoRenta` int(11) NOT NULL AUTO_INCREMENT,
  `estado` char(15) DEFAULT NULL,
  PRIMARY KEY (`idEstadoRenta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `estado` */

insert  into `estado`(`idEstadoRenta`,`estado`) values 
(1,'En Reserva'),
(2,'En Uso'),
(3,'Cancelado'),
(4,'Finalizado');

/*Table structure for table `pago` */

DROP TABLE IF EXISTS `pago`;

CREATE TABLE `pago` (
  `idPago` int(11) NOT NULL AUTO_INCREMENT,
  `monto` decimal(10,0) DEFAULT NULL,
  `fechaPago` date DEFAULT NULL,
  `noAutorizacion` int(11) DEFAULT NULL,
  `idReservacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`idPago`),
  KEY `idReservacion` (`idReservacion`),
  CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`idReservacion`) REFERENCES `reservacion` (`idReservacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pago` */

/*Table structure for table `reservacion` */

DROP TABLE IF EXISTS `reservacion`;

CREATE TABLE `reservacion` (
  `idReservacion` int(11) NOT NULL AUTO_INCREMENT,
  `fechaInicio` date DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `idPago` int(11) DEFAULT NULL,
  `idEstadoRenta` int(11) DEFAULT NULL,
  `idVehiculo` int(11) DEFAULT NULL,
  PRIMARY KEY (`idReservacion`),
  KEY `idVehiculo` (`idVehiculo`),
  KEY `idCliente` (`idCliente`),
  KEY `idEstadoRenta` (`idEstadoRenta`),
  CONSTRAINT `reservacion_ibfk_1` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculo` (`idVehiculo`),
  CONSTRAINT `reservacion_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `reservacion_ibfk_3` FOREIGN KEY (`idEstadoRenta`) REFERENCES `estado` (`idEstadoRenta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `reservacion` */

/*Table structure for table `tienda` */

DROP TABLE IF EXISTS `tienda`;

CREATE TABLE `tienda` (
  `idTienda` int(11) NOT NULL AUTO_INCREMENT,
  `direccion` varchar(200) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTienda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tienda` */

/*Table structure for table `vehiculo` */

DROP TABLE IF EXISTS `vehiculo`;

CREATE TABLE `vehiculo` (
  `idVehiculo` int(11) NOT NULL AUTO_INCREMENT,
  `modelo` year(4) DEFAULT NULL,
  `marca` int(11) DEFAULT NULL,
  `linea` char(50) DEFAULT NULL,
  `idTienda` int(11) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idVehiculo`),
  KEY `idTienda` (`idTienda`),
  CONSTRAINT `vehiculo_ibfk_1` FOREIGN KEY (`idTienda`) REFERENCES `tienda` (`idTienda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `vehiculo` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
