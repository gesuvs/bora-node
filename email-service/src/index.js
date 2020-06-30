import nodemailer from "nodemailer";
import { compile } from "handlebars";
import { newUser, resendAcces } from "./enum";

let template;

const sender = "borapp@borapp.com";

const dados = {
  to: "wil@wil.com",
  action: "new-user",
  username: "wil",
  subject: ""
}; 

switch (dados.action) {
  case "resend-access":
    template = compile(resendAcces);
    dados.subject = 'Borapp: Reset de Senha'
    break;
  case "new-user":
    template = compile(newUser);
    dados.subject = 'Borapp: Seja bem vindo ao aplicativo BORA'
  default:
    break;
}

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  service: "",
  port: 2525,
  secure: false,
  auth: {
    user: "24034f027bfd27",
    pass: "91db26ce8579f3",
  },
});

transport.sendMail({
  to: dados.to,
  from: sender,
  subject: dados.subject,
  html: template(dados),
});
