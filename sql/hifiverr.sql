DROP DATABASE IF EXISTS hifiverr;

CREATE DATABASE hifiverr;

USE hifiverr;

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `firstname` varchar(150),
  `lastname` varchar(150),
  `email` varchar(150) UNIQUE NOT NULL,
  `password` varchar(255) UNIQUE NOT NULL,
  `skills` varchar(255),
  `location` varchar(150),
  `primary_language` varchar(150),
  `profile_image` varchar(500),
  `about_me` varchar(1500)
);

CREATE TABLE `events` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `link` varchar(255),
  `event_title` varchar(200),
  `event_date` datetime,
  `event_content` varchar(1000),
  `community_id` int,
  `event_image` varchar(500)
);

CREATE TABLE `user_events` (
  `user_id` int,
  `event_id` int
);

CREATE TABLE `community` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(200),
  `image` varchar(500)
);

CREATE TABLE `community_users` (
  `user_id` int,
  `community_id` int
);

CREATE TABLE `posts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `community_id` int,
  `post_content` varchar(5000),
  `created_at` timestamp
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `post_id` int,
  `comment` varchar(350),
  `created_at` timestamp
);

ALTER TABLE `community_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `community_users` ADD FOREIGN KEY (`community_id`) REFERENCES `community` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `posts` ADD FOREIGN KEY (`community_id`) REFERENCES `community` (`id`);

ALTER TABLE `events` ADD FOREIGN KEY (`community_id`) REFERENCES `community` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_events` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `user_events` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);
