const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "hello.shrinidhijoshi@gmail.com", //from which mail , mails should to go
      pass:"fqympppxzckkuabl", //mail app password
    },
  });

  let renderTemplate = function(comment,commenter_name,relativePath){
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),{
          comment:comment,
          commenter_name:commenter_name
        },
        function(err,template){
            if(err){
                console.log('Error in rendering template ...',err)
            }
            mailHTML = template;
        }
    )
    return mailHTML;
  }

  module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
  }