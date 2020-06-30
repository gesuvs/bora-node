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
    user: "1c8cb5b6c0acc4",
    pass: "f95280eb78df21",
  },
});

transport.sendMail({
  to: "teste@teste.com",
  from: "teste@teste.com",
  subject: "teste",
  html: template(dados),
});
