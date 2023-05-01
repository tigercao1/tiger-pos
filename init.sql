USE `mysql`;

DROP TABLE IF EXISTS
    `items`;

CREATE TABLE `items` (
      `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      `price` DOUBLE NOT NULL,
      `quantity` INT NOT NULL,
      `name` VARCHAR(255) NOT NULL,
      `barcode` INT NOT NULL
);

INSERT INTO `items` (`barcode`, `name`, `price`, `quantity`)
VALUES(UUID_SHORT()/100, 'Fancy Unicorn', 129.99, 24),(UUID_SHORT()/100, 'Bright T-Shirt',12.99, 600),(UUID_SHORT()/100, 'Deep Bottle', 22.99, 600);
