-- categories
INSERT INTO categories (name, description, id) VALUES
('Electronics', 'Devices and gadgets', 1),
('Books', 'Printed and electronic books', 2),
('Clothing', 'Apparel for men, women, and children', 3),
('Home & Kitchen', 'Home appliances and kitchen gadgets', 4),
('Toys & Games', 'Toys and games for children of all ages', 5);

select * from categories;


-- users
INSERT INTO users (id, address, "isAdmin", password, email, username, "fullName" ) VALUES
(2, '123 Main St', FALSE, '$2a$10$WvKZJ4KKrF4v.wDwD948L.eN19hdCgHnewif6zhPghBeNu/weWFkS', 'user1@example.com', 'user1', 'User One'),
(3, '456 Elm St', FALSE, '$2a$10$WvKZJ4KKrF4v.wDwD948L.eN19hdCgHnewif6zhPghBeNu/weWFkS', 'user2@example.com', 'user2', 'User Two'),
(4, '789 Pine St', FALSE, '$2a$10$WvKZJ4KKrF4v.wDwD948L.eN19hdCgHnewif6zhPghBeNu/weWFkS', 'user3@example.com', 'user3', 'User Three'),
(5, '101 Apple Blvd', TRUE, '$2a$10$WvKZJ4KKrF4v.wDwD948L.eN19hdCgHnewif6zhPghBeNu/weWFkS', 'admin@example.com', 'admin', 'Admin User'),
(6, '202 Berry Ln', FALSE, '$2a$10$WvKZJ4KKrF4v.wDwD948L.eN19hdCgHnewif6zhPghBeNu/weWFkS', 'user5@example.com', 'user5', 'User Five');

-- products
INSERT INTO products (name, id, "categoryId", "imageURL", price, description) VALUES
('Smartphone', 1, 1, 'https://example.com/smartphone.jpg', 999.99, 'Latest model smartphone with high specs'),
('Fiction Book', 2, 2, 'https://example.com/fictionbook.jpg', 14.99, 'A bestselling fiction book'),
('Jeans', 3, 3, 'https://example.com/jeans.jpg', 39.99, 'Comfortable and stylish jeans'),
('Blender', 4, 4, 'https://example.com/blender.jpg', 59.99, 'High-powered kitchen blender'),
('Board Game', 5, 5, 'https://example.com/boardgame.jpg', 29.99, 'Fun board game for family and friends');

-- carts
select * from carts;
select * from users;
INSERT INTO carts (status, id, "userId") VALUES
('Delivered', 2, 2),
('Delivered', 3, 3),
('Delivered', 4, 4),
('Delivered', 5, 5);

-- cart_items
INSERT INTO cart_items ("cartId", quantity, id, "productId") VALUES
(1, 2, 1, 1),
(1, 1, 2, 2),
(2, 3, 3, 3),
(2, 1, 4, 4),
(3, 2, 5, 5);

-- chats
INSERT INTO chats ("receiverId", "senderId", id) VALUES
(2, 1, 1),
(3, 1, 2),
(4, 1, 3),
(5, 2, 4),
(3, 4, 5);

-- messages
INSERT INTO messages ("userId", "chatId", id, content, timestamp) VALUES
(1, 1, 1, 'Hello, are you there?', CURRENT_TIMESTAMP),
(2, 1, 2, 'Yes, I am here.', CURRENT_TIMESTAMP),
(1, 2, 3, 'Got a question for you.', CURRENT_TIMESTAMP),
(3, 2, 4, 'Shoot.', CURRENT_TIMESTAMP),
(4, 3, 5, 'Need your advice on something.', CURRENT_TIMESTAMP);


INSERT INTO reviews ("userId", id, rating, comment, "reviewDate", "productId") VALUES
(1, 1, 5, 'Great product, highly recommend!', CURRENT_DATE, 1),
(2, 2, 4, 'Really enjoyed the book.', CURRENT_DATE, 2),
(3, 3, 3, 'The jeans fit well.', CURRENT_DATE, 3),
(4, 4, 2, 'Blender broke after a few uses.', CURRENT_DATE, 4),
(5, 5, 5, 'Fun game for the whole family.', CURRENT_DATE, 5);



update products set "imageURL" = 'https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg';