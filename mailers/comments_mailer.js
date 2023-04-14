const nodeMailer = require('../config/nodemailer.js');

// it is equivalent to wrting a fun named newComment and exporting it as similar to traditional method 
//  here arrow method is used to reduce number of lines in code
exports.newComment = (comment,commenter_name,commenter_email) => {
let htmlString = nodeMailer.renderTemplate(comment,commenter_name,'/new_comment.ejs')

     nodeMailer.transporter.sendMail({
        from : 'hello.shrinidhijoshi@gmail.com',
        subject: "Your comment is published",
        to: commenter_email,
        html: htmlString
     }, (err,info) => {
        if(err){
            console.log('Error in sending mail',err)
        }
        console.log('Mail sent',info)
        return;
     })
}