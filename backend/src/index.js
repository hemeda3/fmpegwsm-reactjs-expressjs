import express from 'express';

import SERVER_CONFIGS from './constants/server';
import path from 'path';

import configureServer from './server';
import configureRoutes from './routes';

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header('Cross-Origin-Opener-Policy', 'same-origin');
  // res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.use(express.static(path.join(__dirname, '../../frontend/build/static')));
app.use(express.static(path.join(__dirname, '../../frontend-payment/build')));
app.use(express.static(path.join(__dirname, '../../frontend-payment/build/static')));

configureServer(app);
configureRoutes(app);

app.get('/ffmpeg', async (req, res) => {
   res.header('Cross-Origin-Opener-Policy', 'same-origin');
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  res.sendFile(path.join(__dirname, '../build-all/ffmpeg/build/index.html'));
});

app.get('/payment', async (req, res) => {

  res.sendFile(path.join(__dirname, '../build-all/payment/build/index.html'));
});
app.get('/app', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname, '../../frontend-payment/build/index.html'));
});
app.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error;
  console.log('Server running on port: ' + SERVER_CONFIGS.PORT);
});
