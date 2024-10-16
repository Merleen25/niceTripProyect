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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `cliente` */

insert  into `cliente`(`idCliente`,`nomber`,`apellido`,`numeroTelefono`,`correoElectronico`,`clave`,`direccion`) values 
(1,'Merleen','Guardado',41942578,'merleen@gmail.com','123','1ra. calle zona 2 Boca Del Monte Guatemala.'),
(2,'Vivi','Ruano',50665090,'vivi@gmail.com','123','8va, calle zona 1 9-20 Qetzaltenango.'),
(3,'Ashby','Guardado',51356632,'ashby@yahoo.com','123','3ra. Avenida 8-99 zona 3, Peten ');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tienda` */

insert  into `tienda`(`idTienda`,`direccion`,`telefono`) values 
(1,'9na. Avenida 5-22 Zona 10 Guatemala',56123),
(2,'1 calle Zona 3, Quetzaltenango',54162386),
(3,'6 Avenida 1-33 Zona 2, Chimaltenango',49853162),
(4,'8va. Avenida Zona 3, Peten',55131623),
(5,'4ta. calle 1-33 Zona 15 Guatemala',85426135);

/*Table structure for table `vehiculo` */

DROP TABLE IF EXISTS `vehiculo`;

CREATE TABLE `vehiculo` (
  `idVehiculo` int(11) NOT NULL AUTO_INCREMENT,
  `modelo` year(4) DEFAULT NULL,
  `marca` char(20) DEFAULT NULL,
  `linea` char(50) DEFAULT NULL,
  `idTienda` int(11) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `precio` decimal(20,0) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `imagen` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idVehiculo`),
  KEY `idTienda` (`idTienda`),
  CONSTRAINT `vehiculo_ibfk_1` FOREIGN KEY (`idTienda`) REFERENCES `tienda` (`idTienda`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `vehiculo` */

insert  into `vehiculo`(`idVehiculo`,`modelo`,`marca`,`linea`,`idTienda`,`estado`,`precio`,`descripcion`,`imagen`) values 
(1,2024,'2024','Mirage',1,1,150,'Si busca ahorrar gasolonina, este vehiculo 10 km por galon, cuatro puertas, dos bolasas de aire, disponieble automatico y mecanico, aire acondicionado y caben 4 personas. Economico.','https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/ECAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1714589682126.png'),
(2,2023,'Nissan','Versa',2,1,200,'Este vehiculo hace 8 km por galon, cuatro puertas, cuatro bolasas de aire, disponieble automatico y mecanico, aire acondicionado y caben 4 personas. Compacto.','https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/CCAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1714590227456.png'),
(3,2024,'Toyota','Corola',2,1,225,'Este vehiculo hace 8 km por galon, cuatro puertas, cuatro bolasas de aire, disponieble automatico y mecanico, aire acondicionado y caben 5 personas, Bluetooth. mediano.','https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/ICAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1714578379698.png'),
(4,2025,'Ford','Mustang',3,1,450,'Este vehiculo hace 5 km por galon, cuatro puertas, dos bolasas de aire, disponieble automatico y mecanico, aire acondicionado y caben 5 personas, Bluetooth. Convertible.','https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/STAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1727199981315.png'),
(5,2024,'Nissan','Rogue',4,1,500,'Este vehiculo hace 6 km por galon, cuatro puertas, cuatro bolasas de aire, disponieble automatico y mecanico, aire acondicionado y caben 5 personas, Bluetooth. SUV Intermedia.','https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/SUVS/IFAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1714578511986.png'),
(6,2024,'Chevrolet','Equinox',1,1,550,'Este vehiculo hace 5 km por galon, cuatro puertas, cinco bolasas de aire, disponieble automatico y mecanico, aire acondicionado y caben 5 personas, Bluetooth. SUV Estandar.','https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/SUVS/SFAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1722271524866.png'),
(7,2024,'Ford','Expedition',5,1,600,'Este vehiculo hace 5 km por galon, cuatro puertas, cinco bolasas de aire, disponieble automatico y mecanico, aire acondicionado y caben 5 personas, Bluetooth. SUV Full-Size.','https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/SUVS/FFAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1722269564773.png'),
(9,2024,'Chrysler','Pacifica',2,1,650,'Este vehiculo hace 8 km por galon, cuatro puertas, cinco bolasas de aire, disponieble automatico, aire acondicionado y caben 7 personas, AM/FM Radio Estereo. 7 pasajeros Minivan.','https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/VANS/MVAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1618263096675.png'),
(10,2025,'Toyota','Sienna',3,0,700,'Este vehiculo hace 7 km por galon, cuatro puertas, cinco bolasas de aire, disponieble automatico, aire acondicionado y caben 8 personas, AM/FM Radio Estereo. 8 pasajeros Minivan.','https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/VANS/SVAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1714584597484.png'),
(11,2023,'Ford','Transit',4,0,750,'Este vehiculo hace 6.5 km por galon, cuatro puertas, 9 bolasas de aire, disponieble automatico, aire acondicionado y caben 15 personas, AM/FM Radio Estereo. 15 pasajeros van.','https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/VANS/FVAR.doi.768.high.imageSmallThreeQuarterNodePath.png/1714590124481.png');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;



DELIMITER //
CREATE PROCEDURE crearReserva (IdCliente int, IdVehiculo int, FechaInicio date, FechaFin date, TotalPago decimal, Autorizacion int)
   BEGIN
	   START TRANSACTION;
	   INSERT INTO reservacion (fechaInicio, fechaEntrega, total, idCliente, idEstadoRenta, idVehiculo)
	   VALUES (FechaInicio, FechaFin, TotalPago, IdCliente, 1, IdVehiculo);
	   INSERT INTO pago (monto, fechaPago, noAutorizacion, idReservacion)
	   VALUES (TotalPago, CURRENT_DATE(), Autorizacion, LAST_INSERT_ID());
	   -- UPDATE vehiculo SET estado = 0 WHERE idVehiculo = IdVehiculo;
	   COMMIT;
   END//
DELIMITER ;

