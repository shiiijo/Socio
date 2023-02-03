const express = require("express");
const app = express();
const port = 8000;

app.use("/",require("./routes/index.js"))

app.set("view engine","ejs");
app.set('views','./views');

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

