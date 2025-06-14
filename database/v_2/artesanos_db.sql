-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 14-06-2025 a las 23:05:45
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
  KEY `fk_album_usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amistades`
--

DROP TABLE IF EXISTS `amistades`;
CREATE TABLE IF NOT EXISTS `amistades` (
  `id_amistad` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `amigo_id` int NOT NULL,
  `estado` varchar(25) DEFAULT 'pendiente',
  `fecha_solicitud` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_amistad`),
  KEY `fk_amistad_usuario` (`usuario_id`),
  KEY `fk_amistad_amigo` (`amigo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `amistades`
--

INSERT INTO `amistades` (`id_amistad`, `usuario_id`, `amigo_id`, `estado`, `fecha_solicitud`) VALUES
(3, 1, 2, 'pendiente', '2025-06-14 21:47:14');

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
  KEY `fk_comentario_imagen` (`imagen_id`),
  KEY `fk_comentario_usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  KEY `fk_imagen_album` (`album_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  PRIMARY KEY (`id_notificacion`),
  KEY `fk_notificacion_usuario` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `email`, `password`, `imagen_perfil`, `biografia`, `fecha_registro`) VALUES
(1, 'Juan', 'Pérez', 'juan@gmail.com', '$2b$10$rooTg7OF2Or8kMZz8HeQcuwYX6cmJLDlRdsUXRBd8eIX1o.Ivwzsq', 'default.png', NULL, '2025-06-14 19:52:03'),
(2, 'María', 'López', 'maria@gmail.com', '$2b$10$rooTg7OF2Or8kMZz8HeQcuwYX6cmJLDlRdsUXRBd8eIX1o.Ivwzsq', 'default.png', NULL, '2025-06-14 19:52:03'),
(3, 'Carlos', 'Torres', 'carlos@gmail.com', '$2b$10$rooTg7OF2Or8kMZz8HeQcuwYX6cmJLDlRdsUXRBd8eIX1o.Ivwzsq', 'default.png', NULL, '2025-06-14 20:28:03'),
(4, 'Lucia', 'Navarro', 'lucia@gmail.com', '$2b$10$rooTg7OF2Or8kMZz8HeQcuwYX6cmJLDlRdsUXRBd8eIX1o.Ivwzsq', 'default.png', NULL, '2025-06-14 20:28:03'),
(5, 'julian', 'gomez', 'julian@gmail.com', '$2b$10$OhX/oYfmVcVxyrchPq.q3./lVVbdRr9OgFvorQJSg1G8xxSV1QA6S', 'default.png', NULL, '2025-06-14 21:48:11');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `albumes`
--
ALTER TABLE `albumes`
  ADD CONSTRAINT `fk_album_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `amistades`
--
ALTER TABLE `amistades`
  ADD CONSTRAINT `fk_amistad_amigo` FOREIGN KEY (`amigo_id`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `fk_amistad_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `fk_comentario_imagen` FOREIGN KEY (`imagen_id`) REFERENCES `imagenes` (`id_imagen`),
  ADD CONSTRAINT `fk_comentario_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `fk_imagen_album` FOREIGN KEY (`album_id`) REFERENCES `albumes` (`id_album`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `fk_notificacion_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
