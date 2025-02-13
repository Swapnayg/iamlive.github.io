import connection from "../config/connectDB";
import jwt from 'jsonwebtoken'
import md5 from "md5";
// import e from "express";

const homePage = async (req, res) => {
    const [settings] = await connection.query('SELECT `app` FROM admin');
    let app = settings[0].app;
    let auth = req.cookies.lang;
    console.log(auth);
    return res.render("home/index.ejs", { app  });
}



const activityPage = async (req, res) => {
    return res.render("checkIn/activity.ejs");
}

const rebatePage = async (req, res) => {
    return res.render("checkIn/rebate.ejs");
}

const vipPage = async (req, res) => {
    let auth = req.cookies.auth;
    const [userinfo] = await connection.query('SELECT `name_user` FROM users WHERE `token` = ? ', [auth]);
    let userid = userinfo[0].name_user;
    return res.render("checkIn/vip.ejs", {  UserName : userid });
}

const jackpotPage = async (req, res) => {
    return res.render("checkIn/jackpot.ejs");
}

const dailytaskPage = async (req, res) => {
    return res.render("checkIn/dailytask.ejs");
}

const invibonusPage = async (req, res) => {
    return res.render("checkIn/invibonus.ejs");
}

const checkInPage = async (req, res) => {
    return res.render("checkIn/checkIn.ejs");
}

const checkDes = async (req, res) => {
    return res.render("checkIn/checkDes.ejs");
}

const checkRecord = async (req, res) => {
    return res.render("checkIn/checkRecord.ejs");
}

const addBank = async (req, res) => {
    return res.render("wallet/addbank.ejs");
}

// promotion
const promotionPage = async (req, res) => {
    return res.render("promotion/promotion.ejs");
}

const promotion1Page = async (req, res) => {
    return res.render("promotion/promotion1.ejs");
}

const promotionmyTeamPage = async (req, res) => {
    return res.render("promotion/myTeam.ejs");
}

const promotionDesPage = async (req, res) => {
    return res.render("promotion/promotionDes.ejs");
}

const comhistoryPage = async (req, res) => {
    return res.render("promotion/comhistory.ejs");
}

const mybethistoryPage = async (req, res) => {
    return res.render("promotion/mybethistory.ejs");
}


const tutorialPage = async (req, res) => {
    return res.render("promotion/tutorial.ejs");
}

const bonusRecordPage = async (req, res) => {
    return res.render("promotion/bonusrecord.ejs");
}

// wallet


const transactionhistoryPage = async (req, res) => {
    return res.render("wallet/transactionhistory.ejs");
}


const walletPage = async (req, res) => {
    return res.render("wallet/index.ejs");
}

const rechargePage = async (req, res) => {
    return res.render("wallet/recharge.ejs", {
        MinimumMoney: process.env.MINIMUM_MONEY
    });
}

const rechargerecordPage = async (req, res) => {
    return res.render("wallet/rechargerecord.ejs");
}

const withdrawalPage = async (req, res) => {
    return res.render("wallet/withdrawal.ejs");
}

const withdrawalrecordPage = async (req, res) => {
    return res.render("wallet/withdrawalrecord.ejs");
}
const transfer = async (req, res) => {
    return res.render("wallet/transfer.ejs");
}

// member page
const mianPage = async (req, res) => {
    let auth = req.cookies.auth;
    const [user] = await connection.query('SELECT `level` FROM users WHERE `token` = ? ', [auth]);
    const [settings] = await connection.query('SELECT `cskh` FROM admin');
    let cskh = settings[0].cskh;
    let level = user[0].level;
    console.log(req.cookies.lang);
    return res.render("member/index.ejs", { level, cskh });
}

const languegePage = async (req, res) => {
    let lang = req.cookies.lang;
    console.log(lang);
    return res.render("member/language.ejs",{lang});
}

const d_get_betting = async (req, res) => {
    let auth = req.cookies.auth;
    const [user] = await connection.query('SELECT `phone` FROM users WHERE `token` = ? ', [auth]);
    let phone = user[0].phone;
    let gameJoin = req.body.gameJoin;
    var betting_list = '';
    if( gameJoin == "WinGo")
    {
        [betting_list] = await connection.query('SELECT * FROM minutes_1 WHERE `phone` = ? AND status NOT IN ( 0 )  ORDER BY `id` DESC', [phone]);
    }
    else if(gameJoin == "5D")
    {
        [betting_list] = await connection.query('SELECT * FROM result_5d WHERE `phone` = ? AND status NOT IN ( 0 )  ORDER BY `id` DESC ', [phone]);
    }
    else if(gameJoin == "K3")
    {
        [betting_list] = await connection.query('SELECT * FROM result_k3 WHERE `phone` = ? AND status NOT IN ( 0 )  ORDER BY `id` DESC ', [phone]);     
    }
    else if(gameJoin == "Trx Wingo")
        {
            [betting_list] = await connection.query('SELECT * FROM trx_wingo_bets WHERE `phone` = ? AND status NOT IN ( 0 )  ORDER BY `id` DESC ', [phone]);     
        }
    return res.status(200).json({
        message: 'Success',
        status: true,
        datas: betting_list,
    });
}
const aboutPage = async (req, res) => {
    return res.render("member/about/index.ejs");
}

const notificationPage = async (req, res) => {
    return res.render("member/notification.ejs");
}

const wingochat = async (req, res) => {
    const [winGo1] = await connection.execute('SELECT * FROM `wingo` WHERE `game` = "wingo" ORDER BY `id` DESC LIMIT 2 ', []);
    const period = winGo1[1].period;
    const amount = winGo1[1].amount;
    var f_api= process.env.Firebase_Apikey;
    var f_authdomain= process.env.Firebase_AuthDomain;
    var f_dburl= process.env.Firebase_Dburl;
    var f_projid= process.env.Firebase_ProjId;
    var f_stobck= process.env.Firebase_StorageBucket;
    var f_messId= process.env.Firebase_MessageSenId;
    var f_appid= process.env.Firebase_AppId;
    var f_mesuareId= process.env.Firebase_MeasurementId;
    return res.render("member/wingochat.ejs", { d_period: period, d_amount :amount,d_f_api: f_api, d_f_authdomain :f_authdomain,d_f_dburl:f_dburl,d_f_projid:f_projid,d_f_stobck:f_stobck,d_f_messId:f_messId,d_f_appid:f_appid,d_f_mesuareId:f_mesuareId});
}

const k3chat = async (req, res) => {
    const [k31] = await connection.execute('SELECT * FROM `k3` WHERE `game` = "1" ORDER BY `id` DESC LIMIT 2 ', []);
    const k_period = k31[1].period;
    const k_amount = k31[1].result;
    var f_api= process.env.Firebase_Apikey;
    var f_authdomain= process.env.Firebase_AuthDomain;
    var f_dburl= process.env.Firebase_Dburl;
    var f_projid= process.env.Firebase_ProjId;
    var f_stobck= process.env.Firebase_StorageBucket;
    var f_messId= process.env.Firebase_MessageSenId;
    var f_appid= process.env.Firebase_AppId;
    var f_mesuareId= process.env.Firebase_MeasurementId;
    return res.render("member/k3chat.ejs", { kd_period: k_period, kd_amount :k_amount,d_f_api: f_api, d_f_authdomain :f_authdomain,d_f_dburl:f_dburl,d_f_projid:f_projid,d_f_stobck:f_stobck,d_f_messId:f_messId,d_f_appid:f_appid,d_f_mesuareId:f_mesuareId});
}

const d5chat = async (req, res) => {
    const [d51] = await connection.execute('SELECT * FROM `d5` WHERE `game` = "1" ORDER BY `id` DESC LIMIT 2 ', []);
    const d5_period = d51[1].period;
    const d5_amount = d51[1].result;
    var f_api= process.env.Firebase_Apikey;
    var f_authdomain= process.env.Firebase_AuthDomain;
    var f_dburl= process.env.Firebase_Dburl;
    var f_projid= process.env.Firebase_ProjId;
    var f_stobck= process.env.Firebase_StorageBucket;
    var f_messId= process.env.Firebase_MessageSenId;
    var f_appid= process.env.Firebase_AppId;
    var f_mesuareId= process.env.Firebase_MeasurementId;
    return res.render("member/d5chat.ejs", { d5_period: d5_period, d5_amount :d5_amount , d_f_api: f_api, d_f_authdomain :f_authdomain,d_f_dburl:f_dburl,d_f_projid:f_projid,d_f_stobck:f_stobck,d_f_messId:f_messId,d_f_appid:f_appid,d_f_mesuareId:f_mesuareId});
}

const recordsalary = async (req, res) => {
    return res.render("member/about/recordsalary.ejs");
}

const privacyPolicy = async (req, res) => {
    return res.render("member/about/privacyPolicy.ejs");
}

const newtutorial = async (req, res) => {
    return res.render("member/newtutorial.ejs");
}

const forgot = async (req, res) => {
    let auth = req.cookies.auth;
    const [user] = await connection.query('SELECT `time_otp` FROM users WHERE token = ? ', [auth]);
    let time = user[0].time_otp;
    return res.render("member/forgot.ejs", { time });
}

const redenvelopes = async (req, res) => {
    return res.render("member/redenvelopes.ejs");
}

const riskAgreement = async (req, res) => {
    return res.render("member/about/riskAgreement.ejs");
}

const myProfilePage = async (req, res) => {
    return res.render("member/myProfile.ejs");
}


const getSalaryRecord = async (req, res) => {
    const auth = req.cookies.auth;

    const [rows] = await connection.query(`SELECT * FROM users WHERE token = ?`, [auth]);
    let rowstr = rows[0];
    if (!rows) {
        return res.status(200).json({
            message: 'Failed',
            status: false,

        });
    }
    const [getPhone] = await connection.query(
        `SELECT * FROM salary WHERE phone = ? ORDER BY time DESC`,
        [rowstr.phone]
    );


    console.log("asdasdasd : " + [rows.phone])
    return res.status(200).json({
        message: 'Success',
        status: true,
        data: {

        },
        rows: getPhone,
    })
}
module.exports = {
    languegePage,
    homePage,
    checkInPage,
    d5chat,
    invibonusPage,
    rebatePage,
    jackpotPage,
    k3chat,
    vipPage,
    activityPage,
    dailytaskPage,
    promotionPage,
    promotion1Page,
    walletPage,
	wingochat,
    mianPage,
    myProfilePage,
    promotionmyTeamPage,
    promotionDesPage,
    comhistoryPage,
    mybethistoryPage,
    tutorialPage,
    bonusRecordPage,
    rechargePage,
    rechargerecordPage,
    withdrawalPage,
    withdrawalrecordPage,
    aboutPage,
    privacyPolicy,
    notificationPage,
    riskAgreement,
    newtutorial,
    redenvelopes,
    forgot,
    checkDes,
    checkRecord,
    addBank,
    transfer,
    recordsalary,
    getSalaryRecord,
    transactionhistoryPage,
    d_get_betting,
}