-- categories
INSERT INTO categories (name, description)
VALUES ('Телефони', 'Телефони'),
       ('Лаптопи', 'Лаптопи'),
       ('Галантерија', 'Галантерија'),
       ('Персонални компјутери', 'Персонални компјутери'),
       ('Тастатури', 'Тастатури'),
       ('Глувчиња', 'Глувчиња');

-- products
INSERT INTO products (name, "categoryId", "imageURL", price, description)
VALUES ('Iphone X', 1, 'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-x/iphone-x-space-gray.jpg',
        799.99, 'Iphone X'),
       ('Iphone 11', 1, 'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-11/iphone-11-purple.jpg',
        849.99, 'Iphone 11'),
       ('Iphone 12', 1, 'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-12/iphone-12-red.jpg', 899.99,
        'Iphone 12'),
       ('Iphone 13', 1, 'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-13/iphone-13-pink.jpg', 949.99,
        'Iphone 13'),
       ('Iphone 14', 1, 'https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-14/iphone-14-starlight.jpg',
        999.99, 'Iphone 14'),
       ('Samsung Galaxy S23', 1,
        'https://media.wired.com/photos/63ee8e4fcde6e0e4f71293ef/2:3/w_1200,h_1800,c_limit/Samsung-Galaxy-S23-SOURCE-Samsung.jpg',
        899.99, 'Samsung Galaxy S23'),
       ('Samsung Galaxy S24', 1,
        'https://cdn.dxomark.com/wp-content/uploads/medias/post-165758/Samsung-Galaxy-S24_-featured-image-packshot-review-Recovered-Recovered.jpg',
        949.99, 'Samsung Galaxy S24'),
       ('Samsung Galaxy S24 Ultra', 1,
        'https://www.att.com/scmsassets/global/devices/phones/samsung/samsung-galaxy-s24-ultra/carousel/titanium-violet-1.png',
        999.99, 'Samsung Galaxy S24 Ultra'),

       ('Dell Inspiron', 2,
        'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3530-intel/media-gallery/silver-plastic/notebook-inspiron-15-3530-nt-plastic-usbc-silver-gallery-4.psd?fmt=pjpg&pscan=auto&scl=1&wid=4582&hei=2810&qlt=100,1&resMode=sharp2&size=4582,2810&chrss=full&imwidth=5000',
        1499.99, 'Dell Laptop'),
       ('Dell Vostro', 2, 'https://setra.mk/wp-content/uploads/2023/09/Dell-Vostro-3535-1.jpg', 1599.99, 'Dell Laptop'),
       ('Dell Latitude', 2,
        'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/latitude-14-3440-laptop/media-gallery/notebook-latitude-14-3440-nt-uma-gray-gallery-1.psd?fmt=pjpg&pscan=auto&scl=1&wid=3300&hei=1999&qlt=100,1&resMode=sharp2&size=3300,1999&chrss=full&imwidth=5000',
        1699.99, 'Dell Laptop'),
       ('Dell XPS', 2, 'https://www.dell.com/wp-uploads/2024/01/XPS-9640-laptops-back-to-back-1280x800-1.jpg', 1999.99,
        'Dell Laptop'),
       ('MacBook Air', 2,
        'https://www.apple.com/newsroom/images/product/mac/standard/Apple_new-macbookair-wallpaper-screen_11102020_big.jpg.large.jpg',
        2999.99, 'MacBook Laptop'),
       ('MacBook Pro', 2,
        'https://istyle.mk/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/m/a/macbook_pro_13_in_space_gray_pdp_image_position-2__wwen_3.jpg',
        3999.99, 'MacBook Laptop'),


       ('Маска за Iphone X', 3,
        'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MR6F2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1511994831672',
        7.99, 'Маска за Iphone X'),
       ('Маска за Iphone 11', 3, 'https://m.media-amazon.com/images/I/51zluf96qiL.jpg', 8.49, 'Маска за Iphone 11'),
       ('Маска за Iphone 12', 3,
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHL63?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1623349246000',
        8.99, 'Маска за Iphone 12'),
       ('Маска за Iphone 13', 3,
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MM2A3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1629924876000',
        9.49, 'Маска за Iphone 13'),
       ('Маска за Iphone 14', 3,
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MPU13?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1678830662081',
        9.99, 'Маска за Iphone 14'),
       ('Маска за Samsung Galaxy S23', 3, 'https://m.media-amazon.com/images/I/61jiIyNk2tL._AC_UF894,1000_QL80_.jpg',
        8.99, 'Маска за Samsung Galaxy S23'),
       ('Маска за Samsung Galaxy S24', 3,
        'https://image-us.samsung.com/us/smartphones/galaxy-s24/acc-assets/all-gallery/EF-PS921_001_Front_Violet-1600x1200.jpg?$product-details-jpg$',
        9.49, 'Маска за Samsung Galaxy S24'),
       ('Маска за Samsung Galaxy S24 Ultra', 3,
        'https://image-us.samsung.com/us/smartphones/galaxy-s24/acc-assets/all-gallery/EF-ZS928_002_Back_Black-1600x1200.jpg?$product-details-jpg$',
        9.99, 'Маска за Samsung Galaxy S24 Ultra'),

       ('Dell PC Vostro', 4, 'https://www.ssbkompjuteri.com/image/cache/catalog/kompjuteri/vostro-3470-1-650x650.jpg',
        1699.99, 'Dell PC'),
       ('Dell PC XPS', 4,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-HyhrVFbwX21emQeEoHTpy8FEtM6qBO1uEfwQ9mFghg&s', 1799.99,
        'Dell PC'),
       ('Dell PC Precision', 4,
        'https://i.dell.com/sites/csimages/Banner_Imagery/all/prod-359261-workstation-desktop-precision-3660-5860-t7960-1920x1440[1].png',
        1899.99, 'Dell PC'),
       ('Apple iMac', 4,
        'https://www.apple.com/newsroom/images/product/imac/standard/Apple_imac-magickeyboardnum-magicmouse2-macos-wallpaper_08042020.jpg.landing-big_2x.jpg',
        1999.99, 'Apple iMac'),

       ('Тастатура GENIUS', 5, 'https://genius-me.com/cartoons/productline/old/KB-110/BK.png', 29.99,
        'Тастатура GENIUS'),
       ('Тастатура ACME', 5, 'https://media.veli.store/media/product/Acme_KS06_Standard_Wired_Numeric_Keyboard_1.png',
        39.99, 'Тастатура ACME'),
       ('Тастатура LOGITECH', 5, 'https://m.media-amazon.com/images/I/51nKw8Bv9+L._AC_UF1000,1000_QL80_.jpg', 49.99,
        'Тастатура LOGITECH'),
       ('Тастатура HP', 5, 'https://www.hp.com/gb-en/shop/Html/Merch/Images/c07584948_1750x1285.jpg', 59.99,
        'Тастатура HP'),
       ('Тастатура ASUS', 5, 'https://m.media-amazon.com/images/I/61KF+Pu-BWL._AC_UF894,1000_QL80_.jpg', 69.99,
        'Тастатура ASUS'),

       ('Глувче GENIUS', 6, 'https://lining.com.mk/wp-content/uploads/2021/08/2-2-14-1.jpg', 24.99, 'Глувче GENIUS'),
       ('Глувче ACME', 6, 'https://zotebros.com.mk/wp-content/uploads/2020/09/03443.jpg', 34.99, 'Глувче ACME'),
       ('Глувче LOGITECH', 6,
        'https://resource.logitech.com/content/dam/logitech/en/products/mice/m171/gallery/m171-mouse-top-view-grey.png',
        44.99, 'Глувче LOGITECH'),
       ('Глувче HP', 6, 'https://www.hp.com/ch-de/shop/Html/Merch/Images/c06444258_1750x1285.jpg', 54.99, 'Глувче HP'),
       ('Глувче ASUS', 6, 'https://i.ebayimg.com/images/g/~ZcAAOSwrG1g3a28/s-l1200.webp', 64.99, 'Глувче ASUS');

-- pw Test123@
insert into users (username, email, password, "fullName", address, "isAdmin")
VALUES ('testuser1', 'testuser1@gmail.com', '$2a$10$W8Yn.i3fEzM9FmS5q38Plums.yvGEiJfKCMGd.EY6g1xieQahm0em',
        'Test User 1',
        'Test Address 1', false),
       ('testuser2', 'testuser2@gmail.com', '$2a$10$W8Yn.i3fEzM9FmS5q38Plums.yvGEiJfKCMGd.EY6g1xieQahm0em',
        'Test User 2',
        'Test Address 2', false),
       ('testuser3', 'testuser3@gmail.com', '$2a$10$W8Yn.i3fEzM9FmS5q38Plums.yvGEiJfKCMGd.EY6g1xieQahm0em',
        'Test User 3',
        'Test Address 3', false),
       ('testuser4', 'testuser4@gmail.com', '$2a$10$W8Yn.i3fEzM9FmS5q38Plums.yvGEiJfKCMGd.EY6g1xieQahm0em',
        'Test User 4',
        'Test Address 4', false);

-- add admin
insert into users (username, email, password, "fullName", address, "isAdmin")
VALUES ('testadmin1', 'testadmin1@gmail.com', '$2a$10$W8Yn.i3fEzM9FmS5q38Plums.yvGEiJfKCMGd.EY6g1xieQahm0em',
        'Test Admin 1',
        'Test Address 1', true);
-- insert carts
insert into carts ("userId")
VALUES (1),
       (2),
       (3),
       (4);

--insert html_templates
insert into html_templates ("eventClassName", subject, body, context)
VALUES ('ProductCreatedEvent', 'New product added', 'New product: {{event.name}}', 'In App Notification'),
       ('ProductCreatedEvent', 'New product added', 'New product: {{event.name}}', 'Email Notification'),
       ('ProductUpdatedEvent', 'Updated product', 'Product: {{event.name}} has been updated', 'In App Notification'),
       ('ProductUpdatedEvent', 'Updated product', 'Product: {{event.name}} has been updated', 'Email Notification')



drop view if exists v_system_analytics;
create or replace view v_system_analytics as
(
select
    (select count(*) from products where "createdAt"::date >= current_date - interval '1' month) as products_added_in_the_last_month,
    (select count(*) from carts where status = 'Delivered' and "dateOrdered"::date >= current_date - interval '1' month) as orders_in_the_last_month,
    (select count(*) from products where "numberInStock" = 0) as products_that_need_restocking,
    (select count(*) from wishlist) as products_in_users_wishlists
        );

select * from v_system_analytics