import { Router } from "express";
import httpProxy from "express-http-proxy";

const userServiceProxy = httpProxy(
  `http://${process.env.USER_SERVICE}:${process.env.USER_PORT}`
);
const eventoServiceProxy = httpProxy(
  `http://${process.env.EVENTO_SERVICE}:${process.env.EVENTO_PORT}`
);
const paymentServiceProxy = httpProxy(
  `http://${process.env.PAYMENT_SERVICE}:${process.env.PAYMENT_PORT}`
);

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

routes.get("/payment/*", (req, res, next) => {
  paymentServiceProxy(req, res, next);
});

routes.post("/payment/*", (req, res, next) => {
  paymentServiceProxy(req, res, next);
});

export default routes;
