const nodemailer = require('nodemailer');

async function main (){
    const transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        service: '',
        port: 2525,
        secure: false,
        auth:{
        user: '1c8cb5b6c0acc4',
        pass: 'f95280eb78df21' }
    });


    let email = {
        from: 'sancheswillian2008@gmail.com',
        to: 'sancheswillian2008@gmail.com',
        subject: 'Teste',
        text: 'Estou te enviando este email com node.js',

    };

    transport.sendMail(email , (err , info)=>{
        console.log(info);
    });

}

main().catch(console.error);