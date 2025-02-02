Hi Today i did 5D admin dashboard changes 


for that we have to vist the routes, AdminController and we can find the loader module for our db

Did 5d UI changes in Admin dashboard for that the file will be /manage/5D.ejs

and did changes in the 5d javascript page for that the file will be /public/5d/admin/main.js


Ececute this query in the balance_tasfer table within db to store the instant and manual settings type

ALTER TABLE `balance_transfer` ADD `trabfer_type` VARCHAR(100) NULL DEFAULT NULL AFTER `datetime`;



excecute this query for the blanace transfer setting on the db side:

"ALTER TABLE `users` ADD `transfer_mode` VARCHAR(200) NULL DEFAULT NULL AFTER `user_level`;"

added two web api for one to store balance_tarnsfer setting another to get balance transfer setting within web.js and within adminController.js

   "router.post('/api/webapi/admin/tranfermode', adminController.middlewareAdminController, adminController.tranfermode); // store transfer mode
    router.get('/api/webapi/admin/gettranfermode', adminController.middlewareAdminController, adminController.gettranfermode); // get transfer mode "


    Added the type field within the withdraw table to identify the separation between the withdrawals and transfers

    "ALTER TABLE `withdraw` ADD `type` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL AFTER `time`;"


    Update UserController, AdminController, for the balance transfer manually and instantly

    /api/webapi/admin/rechargeDuyet
    /api/webapi/admin/withdraw

    /wallet/transfer


    add with_type in withdrawtable :

    "ALTER TABLE `withdraw` ADD `with_type` VARCHAR(200) NULL DEFAULT NULL AFTER `type`;"
    

2 chat page logic for displaying data in proper formats along with timer checks -- half day
adding bet history page with logics of data representation -- 1 day
5d Chart making -- 1 day
Accountant --

VIP image logic for user profile and the vip page

wingo, k3, 5d popup logic

vip table schema within phpmyadmin
