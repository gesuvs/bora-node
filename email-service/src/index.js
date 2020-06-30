import nodemailer from "nodemailer";
import { compile } from "handlebars";
import { newUser, resendAcces } from "./enum";

let template;

const dados = {
  to: "wil@wil.com",
  action: "new-user",
  username: "wil",
};

switch (dados.action) {
  case "resend-access":
    template = compile(resendAcces);
    break;
  case "new-user":
    template = compile(newUser);
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
  to: "teste@teste.com",
  from: "teste@teste.com",
  subject: "teste",
  html: template(dados),
});
