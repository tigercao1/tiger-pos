USE `Store`;

DROP TABLE IF EXISTS
    `items`;

CREATE TABLE `items` (
      `price` DOUBLE NOT NULL,
      `quantity` INT NOT NULL,
      `name` VARCHAR(255) NOT NULL,
      `barcode` BIGINT NOT NULL UNIQUE PRIMARY KEY
);

INSERT INTO `items` (`barcode`, `name`, `price`, `quantity`)
VALUES(UUID_SHORT()%10000000000, 'Fancy Unicorn', 129.99, 24),(UUID_SHORT()%10000000000, 'Bright T-Shirt',12.99, 600),(UUID_SHORT()%10000000000, 'Deep Bottle', 22.99, 600);
