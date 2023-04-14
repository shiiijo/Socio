const express = require("express");
const app = express();
const logger = require('morgan')
const fs = require('fs');
const rfs = require('rotating-file-stream')
const path = require('path')
const expressLayout = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
const passportJwt = require('./config/passport-jwt-stratergy');
const passportGoogle = require('./config/passport-google-oauth2-stratergy');
var MongoDBStore = require('connect-mongodb-session')(session);
const saasMiddleware = require('node-sass-middleware')
const flash = require('connect-flash');
const port = 8000;
const customMware = require('./config/middleware')

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const chatSockets = require('./config/chat_socket').chatSockets(server)
server.listen(6000, () => {
    console.log('listening on *:6000');
  });



// databse connection firing up
const db = require("./config/mongoose.js");
const morgan = require("morgan");

// it is to facilitate css loading with sass middle ware once server starts
app.use(saasMiddleware({
  src:'./assets/scss',
  dest:'./assets/css',
  debug:true,
  outputStyle:'expanded',
  prefix:'/css'
}));


app.use(express.urlencoded());
app.use(cookieParser());


// it handles loger file partconst logDirectory = path.join(__dirname,'../production_logs');
const logDirectory = path.join(__dirname,'/production_logs');

fs.existsSync(logDirectory || fs.mkdirSync(logDirectory));

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

app.use(morgan('combined',{
    stream:accessLogStream
}))

// looks for assets
app.use(express.static('./assets'));

// make uploads apth available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'))

// it is to add styles tag always in head section for individual style files
app.set('layout extractStyles',true);
// it is to add script tag always in footer section for individual js script files
app.set('layout extractScripts',true);

// setup layout , it should be before routes and views
app.use(expressLayout)

//  set up view engine
app.set("view engine","ejs");
app.set('views','./views');

app.use(session({
    name:'socio',
    secret:'blah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    // mongo store is used to session cookie in DB
    store: new MongoDBStore({
            mongooseConnection : db,
            autoRemove :'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

//  this function is defined by me , for any request comming in this function stores user 
// - info available in locales , locales can be accessed anywhere for views when he is signed in 
app.use(passport.setAuthenticatedUser);

// it is library used to setup flash messages for user , it uses session cookies so it should declared after session()
app.use(flash());
app.use(customMware.setFlash);

// setup routes
app.use("/",require("./routes/index.js"));

app.listen(port,function(err){
    if(err){
        // writing inside `` to sunstitute variable is called interpolation
        console.log(`Error in running server:${err}`)
    }
    console.log(`Server is running on Port:${port}`)

})




// 1.first request comes to app using express which is in the index.js file
// 2.then defined port will be used
// 3.then control goes to the index file of the routes which intially routes to home page '/'
// 4.then any request to home route goes to home controller
// 5.after that router index file looks for other routers, there router defined will be used as prefix for url and described route file will be called by maping both urls
// ex for this router.use('prefix_router_name',require('next_router_file_name')) is used and it will be in index file of routers
//   once described router is called , respective controller will be called

