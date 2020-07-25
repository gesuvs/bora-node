import { app } from './server';

app.listen(process.env.USER_PORT, process.env.HOST);
