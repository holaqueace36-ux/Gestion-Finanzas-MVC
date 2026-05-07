-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-05-2026 a las 06:07:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_finanzas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_personalizadas`
--

CREATE TABLE `categorias_personalizadas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `presupuesto_asignado` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias_personalizadas`
--

INSERT INTO `categorias_personalizadas` (`id`, `usuario_id`, `nombre`, `presupuesto_asignado`) VALUES
(1, 1, 'transporte', 0.00),
(2, 1, 'comida', 0.00),
(3, 27, 'trasporte', 0.00),
(4, 27, 'comida ', 100.00),
(8, 27, 'viaje', 0.00),
(9, 27, 'viajes 23', 0.00),
(10, 27, 'Transporte', 0.00),
(11, 27, 'trabajo', 0.00),
(12, 27, 'Comida del Mes ', 500.00),
(13, 27, 'sopa', 39.00),
(14, 27, 'tyt', 600.00),
(15, 27, 'comidi', 450.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gastos`
--

INSERT INTO `gastos` (`id`, `usuario_id`, `descripcion`, `monto`, `fecha`) VALUES
(1, 1, 'cancer', 10000.00, '2026-05-06 02:16:56'),
(2, 27, '50', 0.00, '2026-05-06 03:27:35'),
(3, 27, 'gato', 50.00, '2026-05-06 03:28:10'),
(4, 27, 'trasporte', 20.00, '2026-05-06 07:15:11'),
(5, 27, 'recibo agua ', 250000.00, '2026-05-06 08:15:55'),
(6, 27, 'arroz', 2.00, '2026-05-06 08:16:11'),
(7, 27, 'arroz2', 2.00, '2026-05-06 08:16:24'),
(8, 27, 'comida', 4000.00, '2026-05-06 09:05:27'),
(9, 27, 'restaurante caro', 250.00, '2026-05-06 09:33:06'),
(10, 27, 'motilada', 20.00, '2026-05-06 09:42:56'),
(11, 27, 'casa', 2000000.00, '2026-05-06 09:58:24'),
(12, 28, 'si', 20.00, '2026-05-06 10:01:47'),
(13, 27, 'comida ', 35000000.00, '2026-05-06 11:05:40'),
(14, 27, 'sisa', 35.00, '2026-05-06 11:12:21'),
(15, 27, 'album del mundial', 1000000.00, '2026-05-06 11:46:58'),
(16, 27, 'chocorramo con yogurt', 10000.00, '2026-05-06 23:37:15'),
(17, 27, 'pe', 1.00, '2026-05-06 23:38:13'),
(18, 27, 'pe causa ', 4000.00, '2026-05-06 23:38:28'),
(19, 27, 'caja fichas ', 800000.00, '2026-05-06 23:39:04'),
(20, 27, 'arroba papa', 20000.00, '2026-05-06 23:39:23'),
(21, 27, 'pe2', 2.00, '2026-05-07 01:35:39'),
(22, 27, 'peck', 100.00, '2026-05-07 01:41:21'),
(23, 27, 'f', 2.00, '2026-05-07 01:41:31'),
(24, 27, 'fuo', 400.00, '2026-05-07 02:48:56'),
(25, 27, 'eree', 123.00, '2026-05-07 03:15:02'),
(26, 27, 'gup', 100.00, '2026-05-07 03:35:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metas`
--

CREATE TABLE `metas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `nombre_meta` varchar(100) DEFAULT NULL,
  `monto_objetivo` decimal(10,2) DEFAULT NULL,
  `monto_actual` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metas`
--

INSERT INTO `metas` (`id`, `usuario_id`, `nombre_meta`, `monto_objetivo`, `monto_actual`) VALUES
(1, 1, 'moto', 300.00, 0.00),
(2, 1, 'empanada', 300.00, 0.00),
(3, 1, 'moto2', 450.00, 0.00),
(4, 1, 'carro 3', 2.00, 0.00),
(5, 1, 'poto', 10000.00, 0.00),
(6, 1, 'si', 2000.00, 0.00),
(7, 1, 'carro6', 4000000.00, 0.00),
(8, 1, 'perro', 30.00, 0.00),
(9, 27, 'viaje', 15000.00, 0.00),
(10, 27, 'compar moto', 3500.00, 0.00),
(11, 27, 'chocorramo y bonyurt', 350.00, 0.00),
(31, 27, 'vieja japan', 10.00, 0.00),
(32, 27, 'ahoror mes', 123.00, 0.00),
(33, 27, 'sisa', 2000.00, 0.00),
(34, 27, 'Meta', 34.00, 0.00),
(35, 27, 'Meta', 30.00, 0.00),
(36, 27, 'pito', 3500.00, 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones`
--

CREATE TABLE `transacciones` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `monto` decimal(10,2) NOT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `tipo` enum('ingreso','gasto') DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transacciones`
--

INSERT INTO `transacciones` (`id`, `user_id`, `monto`, `categoria`, `tipo`, `fecha`) VALUES
(19, 28, 50.00, 'pago', 'ingreso', '2026-05-05'),
(20, 27, 55.00, 'venta', 'ingreso', '2026-05-06'),
(21, 27, 67.00, 'sueldo', 'ingreso', '2026-05-06'),
(22, 27, 34.00, 'sueldo 2', 'ingreso', '2026-05-06'),
(23, 27, 0.00, '15000000', 'ingreso', '2026-05-06'),
(24, 27, 15000000.00, 'sueldo fin', 'ingreso', '2026-05-06'),
(25, 27, 20000.00, 'venta perros', 'ingreso', '2026-05-06'),
(26, 27, 24000000.00, 'venta moto', 'ingreso', '2026-05-06'),
(27, 27, 5000.00, 'trasporte', 'ingreso', '2026-05-06'),
(28, 27, 500.00, 'finde', 'ingreso', '2026-05-06'),
(29, 27, 20.00, 'motilada', 'ingreso', '2026-05-06'),
(30, 27, 300.00, 'venta 2', 'ingreso', '2026-05-06'),
(31, 27, 0.00, '200', 'ingreso', '2026-05-06'),
(32, 27, 20.00, 'moti', 'ingreso', '2026-05-06'),
(33, 27, 20.00, 'moti', 'ingreso', '2026-05-06'),
(34, 27, 52000.00, 'venta carro', 'ingreso', '2026-05-06'),
(35, 27, 2.00, 'sueldo', 'ingreso', '2026-05-06'),
(36, 27, 300.00, 'sualdo fin', 'ingreso', '2026-05-06'),
(37, 27, 26.00, 'si', 'ingreso', '2026-05-06'),
(38, 28, 35.00, 'turno noche', 'ingreso', '2026-05-06'),
(39, 27, 20.00, 'sueldo', 'ingreso', '2026-05-06'),
(40, 27, 25.00, 'perro', 'ingreso', '2026-05-06'),
(41, 27, 20.00, 'pimpi', 'ingreso', '2026-05-06'),
(42, 27, 5.00, 'si', 'ingreso', '2026-05-06'),
(43, 27, 5.00, 'sa', 'ingreso', '2026-05-06'),
(44, 27, 34.00, 'turno1', 'ingreso', '2026-05-06'),
(45, 28, 35.00, 'turno', 'ingreso', '2026-05-06'),
(46, 27, 2.00, 'com', 'ingreso', '2026-05-06'),
(47, 31, 10000.00, 'venta', 'ingreso', '2026-05-06'),
(48, 27, 45.00, 'figura de messi', 'ingreso', '2026-05-06'),
(49, 27, 100000.00, 'sueldo', 'ingreso', '2026-05-06'),
(50, 27, 1000.00, 'venta2', 'ingreso', '2026-05-06'),
(51, 27, 1.00, 're', 'ingreso', '2026-05-06'),
(52, 27, 3.00, 'erd', 'ingreso', '2026-05-06'),
(53, 27, 220.00, 'turno', 'ingreso', '2026-05-06'),
(54, 27, 100.00, 'pick', 'ingreso', '2026-05-06'),
(55, 27, 67.00, 'six', 'ingreso', '2026-05-06'),
(56, 27, 1.00, 'o', 'ingreso', '2026-05-06'),
(57, 27, 100.00, 'ferro', 'ingreso', '2026-05-06'),
(58, 27, 100.00, 'ere', 'ingreso', '2026-05-06'),
(59, 27, 12.00, 'gu', 'ingreso', '2026-05-06'),
(60, 27, 3.00, 'g', 'ingreso', '2026-05-06'),
(61, 27, 123.00, 'guv', 'ingreso', '2026-05-06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(10) DEFAULT 'user',
  `estado` varchar(10) DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `rol`, `estado`) VALUES
(1, 'Admin Proyect', 'admin@test.com', '123456', 'admin', 'activo'),
(17, 'carlos ortiz', 'holaqueace36@gmail.com', '12345678', 'user', 'activo'),
(27, 'alejandro penago', 'alepena@gmail.com', '1234', 'user', 'activo'),
(28, 'Juan prieto', 'juanda@gmail.com', '12345', 'user', 'activo'),
(29, 'camilo', 'camiloeme@gmail.com', '123456', 'user', 'activo'),
(30, 'carlos', 'carlos2@gmail.com', '12', 'user', 'activo'),
(31, 'cachirri', 'cachi@gmail.com', '123', 'user', 'activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias_personalizadas`
--
ALTER TABLE `categorias_personalizadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `metas`
--
ALTER TABLE `metas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias_personalizadas`
--
ALTER TABLE `categorias_personalizadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `metas`
--
ALTER TABLE `metas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categorias_personalizadas`
--
ALTER TABLE `categorias_personalizadas`
  ADD CONSTRAINT `categorias_personalizadas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD CONSTRAINT `gastos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `metas`
--
ALTER TABLE `metas`
  ADD CONSTRAINT `metas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
