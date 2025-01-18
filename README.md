Hi Today i did 5D admin dashboard changes 


for that we have to vist the routes, AdminController and we can find the loader module for our db

Did 5d UI changes in Admin dashboard for that the file will be /manage/5D.ejs

and did changes in the 5d javascript page for that the file will be /public/5d/admin/main.js


Ececute this query in the balance_tasfer table within db to store the instant and manual settings type

ALTER TABLE `balance_transfer` ADD `trabfer_type` VARCHAR(100) NULL DEFAULT NULL AFTER `datetime`;

