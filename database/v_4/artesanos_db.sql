-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 17-06-2025 a las 11:07:11
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `artesanos_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `albumes`
--

DROP TABLE IF EXISTS `albumes`;
CREATE TABLE IF NOT EXISTS `albumes` (
  `id_album` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_album`),
  KEY `usuario_id` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `albumes`
--

INSERT INTO `albumes` (`id_album`, `usuario_id`, `titulo`, `fecha_creacion`) VALUES
(2, 1, 'On the Dune', '2025-06-17 06:39:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amistades`
--

DROP TABLE IF EXISTS `amistades`;
CREATE TABLE IF NOT EXISTS `amistades` (
  `id_amistad` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `amigo_id` int NOT NULL,
  `estado` varchar(20) DEFAULT 'pendiente',
  `fecha_solicitud` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_amistad`),
  KEY `usuario_id` (`usuario_id`),
  KEY `amigo_id` (`amigo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `amistades`
--

INSERT INTO `amistades` (`id_amistad`, `usuario_id`, `amigo_id`, `estado`, `fecha_solicitud`) VALUES
(1, 2, 1, 'aceptado', '2025-06-17 01:02:14'),
(2, 2, 5, 'pendiente', '2025-06-17 01:02:17'),
(3, 2, 1, 'pendiente', '2025-06-17 06:26:53'),
(6, 3, 1, 'pendiente', '2025-06-17 09:44:05'),
(7, 1, 2, 'pendiente', '2025-06-17 10:59:40'),
(8, 1, 2, 'pendiente', '2025-06-17 10:59:44'),
(9, 1, 4, 'pendiente', '2025-06-17 10:59:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id_comentario` int NOT NULL AUTO_INCREMENT,
  `imagen_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `texto` text,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_comentario`),
  KEY `imagen_id` (`imagen_id`),
  KEY `usuario_id` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id_comentario`, `imagen_id`, `usuario_id`, `texto`, `fecha`) VALUES
(2, 2, 1, 'mi imagen favorita', '2025-06-17 07:20:32'),
(3, 2, 4, 'que bien baila', '2025-06-17 09:13:34'),
(4, 2, 4, 'altas zapatillas', '2025-06-17 09:14:58'),
(5, 2, 1, 'tengo unas iguales', '2025-06-17 09:15:24'),
(6, 2, 4, 'soy daltonico, que color es?', '2025-06-17 09:31:41'),
(7, 2, 3, 'es blanco pero de que color lo ves vos?', '2025-06-17 09:44:59'),
(8, 2, 3, 'supongo que celeste no?', '2025-06-17 09:45:17'),
(9, 2, 4, 'no no, es mas un verde', '2025-06-17 10:32:32'),
(10, 2, 4, 'por que no baila el de atras?', '2025-06-17 10:59:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
CREATE TABLE IF NOT EXISTS `imagenes` (
  `id_imagen` int NOT NULL AUTO_INCREMENT,
  `album_id` int NOT NULL,
  `url_imagen` varchar(255) DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `descripcion` text,
  `visibilidad` varchar(20) DEFAULT 'publica',
  PRIMARY KEY (`id_imagen`),
  KEY `album_id` (`album_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id_imagen`, `album_id`, `url_imagen`, `titulo`, `descripcion`, `visibilidad`) VALUES
(2, 2, '/uploads/1750142352250-888863730.jpg', 'star trooper con su amigo darth vader', 'volviendo a sus raices darth vader', 'publica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
CREATE TABLE IF NOT EXISTS `notificaciones` (
  `id_notificacion` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `mensaje` text,
  `leido` int DEFAULT '0',
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `target_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_notificacion`),
  KEY `usuario_id` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id_notificacion`, `usuario_id`, `tipo`, `mensaje`, `leido`, `fecha`, `target_url`) VALUES
(2, 2, 'solicitud', 'Juan te ha enviado una solicitud de amistad.', 0, '2025-06-17 10:59:40', '/requests'),
(3, 2, 'solicitud', 'Juan te ha enviado una solicitud de amistad.', 0, '2025-06-17 10:59:44', '/requests'),
(4, 4, 'solicitud', 'Juan te ha enviado una solicitud de amistad.', 0, '2025-06-17 10:59:57', '/requests');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imagen_perfil` varchar(255) DEFAULT 'default.png',
  `biografia` text,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `email`, `password`, `imagen_perfil`, `biografia`, `fecha_registro`) VALUES
(1, 'Juan', 'Perez', 'juan@gmail.com', '$2b$10$9EzWeHYjdBheuXJRbhAqy.Gvq/hrUL8sWxj25HMO6KnCOBZ69axJS', 'default.png', NULL, '2025-06-17 01:00:07'),
(2, 'Maria', 'Lopez', 'maria@gmail.com', '$2b$10$dLB1aqoNzaCwDz3ZY5PkGOzZeOAIvcXW4xtc/KJj7gGofTdk9Tg1a', 'default.png', NULL, '2025-06-17 01:00:31'),
(3, 'Carlos', 'Pelegrini', 'carlos@gmail.com', '$2b$10$HjGZfNXfLXYbaZQD9jf/1en6fnQBt.DU1LOfzm72RTGytGBx1zCuu', 'default.png', NULL, '2025-06-17 01:01:02'),
(4, 'Lucia', 'Gimenez', 'lucia@gmail.com', '$2b$10$t6ZCBlLVAZKKJxStnQNyoOKBBAhUxdGmQP60rug7iaGSQnleb8xOC', 'default.png', NULL, '2025-06-17 01:01:33'),
(5, 'julian', 'Torres', 'julian@gmail.com', '$2b$10$fcTj4E/DZ1ayfvNpw/aGmeXevtPqoMtzye2vVqce2/P1eHV4Nfs.i', 'default.png', NULL, '2025-06-17 01:02:02');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `albumes`
--
ALTER TABLE `albumes`
  ADD CONSTRAINT `albumes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `amistades`
--
ALTER TABLE `amistades`
  ADD CONSTRAINT `amistades_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `amistades_ibfk_2` FOREIGN KEY (`amigo_id`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`imagen_id`) REFERENCES `imagenes` (`id_imagen`) ON DELETE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albumes` (`id_album`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
