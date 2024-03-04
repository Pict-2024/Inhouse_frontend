-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2024 at 01:21 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inhouse_hod`
--

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `ID` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Role` int(11) NOT NULL,
  `DateTime` date NOT NULL DEFAULT current_timestamp(),
  `Receiver` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`ID`, `Username`, `Title`, `Description`, `Role`, `DateTime`, `Receiver`) VALUES
(1, 'sspande@pict.edu', 'PDA Notice', 'PDA committee to be announced soon', 1, '2024-01-19', NULL),
(2, 'adminasg@gmail.com', 'Shri Ram Janmabhoomi Mahotsav', 'Holiday is provided on 22-01-2024 on account of Shri Ram Janmabhoomi mahotsav', 0, '2024-01-19', NULL),
(3, 'adminasg@gmail.com', 'Shri Ram Janmabhoomi Mahotsav', 'Holiday is provided on 22-01-2024 on account of Shri Ram Janmabhoomi mahotsav', 0, '2024-01-19', NULL),
(4, 'sspande@pict.edu', 'welcome to pict', 'Hiiii', 1, '2024-01-20', NULL),
(5, 'adminasg@gmail.com', 'Holiday on Monday 22 Jan 2024', 'National Holiday for an auspicious moment', 0, '2024-01-21', NULL),
(6, 'sspande@pict.edu', 'Request for a leave on 25 Jan 2024', 'I want a leave on the above mentioned date', 1, '2024-01-21', NULL),
(7, 'adminasg@gmail.com', 'Tomorrow is Holiday 22-01-2024', 'Ram', 0, '2024-01-21', NULL),
(8, 'sspande@pict.edu', 'Tommorow leave', 'bye', 1, '2024-01-22', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
