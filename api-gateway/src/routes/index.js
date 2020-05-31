import { Router } from "express";
import httpProxy from "express-http-proxy";

const userServiceProxy = httpProxy(`http://${process.env.USER_SERVICE}:3333`);
const eventoServiceProxy = httpProxy(`http://${process.env.EVENTO_SERVICE}:5555`);
const pagamentoServiceProxy = httpProxy(`http://${process.env.PAGAMENTO_SERVICE}:5555`);

const routes = Router();

routes.get("/users/*", (req, res, next) => {
  userServiceProxy(req, res, next);
});

routes.post("/users/*", (req, res, next) => {
  userServiceProxy(req, res, next);
});

routes.get("/eventos/*", (req, res, next) => {
  eventoServiceProxy(req, res, next);
});

routes.post("/eventos/*", (req, res, next) => {
  eventoServiceProxy(req, res, next);
});

routes.get("/pagamentos/*", (req, res, next) => {
  pagamentoServiceProxy(req, res, next);
});

routes.post("/pagamentos/*", (req, res, next) => {
  pagamentoServiceProxy(req, res, next);
});

export default routes;
