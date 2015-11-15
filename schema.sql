-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema utilities
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema utilities
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `utilities` DEFAULT CHARACTER SET utf8 ;
USE `utilities` ;

-- -----------------------------------------------------
-- Table `utilities`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `utilities`.`user` (
  `id_user` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(240) NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `middle_name` VARCHAR(50) NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `address` VARCHAR(100) NULL,
  `city` VARCHAR(30) NULL,
  `postcode` VARCHAR(5) NULL,
  `phone` VARCHAR(13) NULL,
  `contract` VARCHAR(10) NULL,
  `manager` TINYINT(1) NULL,
  `create_time` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utilities`.`type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `utilities`.`type` (
  `id_type` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(155) NOT NULL,
  PRIMARY KEY (`id_type`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utilities`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `utilities`.`order` (
  `id_order` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user` INT UNSIGNED NOT NULL,
  `type` INT UNSIGNED NULL,
  `content` VARCHAR(255) NOT NULL,
  `create_time` DATETIME NULL DEFAULT NOW(),
  `complete_time` DATETIME NULL,
  PRIMARY KEY (`id_order`),
  INDEX `fk_order_user_idx` (`user` ASC),
  INDEX `fk_order_type_idx` (`type` ASC),
  CONSTRAINT `fk_order_user`
    FOREIGN KEY (`user`)
    REFERENCES `utilities`.`user` (`id_user`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_order_type`
    FOREIGN KEY (`type`)
    REFERENCES `utilities`.`type` (`id_type`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `utilities`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `utilities`.`message` (
  `id_message` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order` INT UNSIGNED NOT NULL,
  `user` INT UNSIGNED NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  INDEX `fk_message_order1_idx` (`order` ASC),
  PRIMARY KEY (`id_message`),
  INDEX `fk_message_user1_idx` (`user` ASC),
  CONSTRAINT `fk_message_order`
    FOREIGN KEY (`order`)
    REFERENCES `utilities`.`order` (`id_order`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_message_user`
    FOREIGN KEY (`user`)
    REFERENCES `utilities`.`user` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
