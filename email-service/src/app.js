const nodemailer = require('nodemailer');
const userAction = require("./enum/index");
const userTemplate = require("./templates/index");

const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    service: '',
    port: 2525,
    secure: false,
    auth:{
    user: '24034f027bfd27',
    pass: '91db26ce8579f3' }
});

const receptedEmail = {
    username: 'willzera',
    email: 'sancheswillian2008@gmail.com',
    userAction: 'signUp'
}

function loadMailTemplate (receptedEmail){
    let template;
    if(receptedEmail.userAction === userAction.signUp ){
        template = userTemplate.signUp;
        return template;
    }else if(receptedEmail.userAction === userAction.rememberPass){
        template = userTemplate.rememberPass;
        return template;
    }
}

async function main (){

    const sender = 'chilenopago1000reaisemfonequebrado@borapp.com'
    let template = loadMailTemplate(receptedEmail);

    let emailSend = {
        from: sender,
        to: receptedEmail.email,
        subject: template.subject,
        text: template.text,
        html : { path: template.path }
    }

    console.log(emailSend)

    transport.sendMail(emailSend , (err , info)=>{
        console.log(info);
    });
}

main().catch(console.error);