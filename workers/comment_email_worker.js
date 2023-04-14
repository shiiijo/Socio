const queue = require('../config/kue')

const commentsMailer = require('../mailers/comments_mailer');

queue.process('emailWorker',function(job,done){
    commentsMailer.newComment(job.data.comment,job.data.user_name,job.data.user_email);
    done();
})