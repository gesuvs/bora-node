import { app } from "./server";

console.log(process.env.PAY_PORT);
app.listen(process.env.PAY_PORT, process.env.HOST);
