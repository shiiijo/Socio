const fs = require('fs');
const rfs = require('rotating-file-stream')
const path = require('path')

const logDirectory = path.join(__dirname,'../production_logs');


fs.existsSync(logDirectory || fs.mkdirSync(logDirectory));

const accessLogStream = rfs('access.log',{
    interval:'1d',
    path:logDirectory
});


const development = {

    name : "development",
    asset_path: "",
    session_cookie_key: "",
    db_name : "",
    smtp : "",
    g_client_id :"",
    g_client_secret : "",
    g_call_back_url : "",
    jwt_secret : "",

}


const production = {

    name : "production",
    asset_path: "",
    session_cookie_key: "",
    db_name : "",
    smtp : "",
    g_client_id :"",
    g_client_secret : "",
    g_call_back_url : "",
    jwt_secret : "",



}