import { app } from './server';

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(process.env.PORT, process.env.HOST);
});
