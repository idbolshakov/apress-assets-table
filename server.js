const http = require('http');
const express = require('express');
const app = express();

(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(__dirname + '/'));
})();

app.post('/upload-images', (req, res) => {
  console.log('---------------------------');
  setTimeout(() => {
    res.json(
      {
        ids: [Math.random() * 100],
      }
    );
  }, 500);
});

app.get('/', function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/tree', (req, res) => {
  setTimeout(() => {
    res.sendFile(__dirname + '/_mock/tree/tree.json');
  }, 500);
});

app.put('/tree/update', (req, res) => {
  setTimeout(() => {
    res.json({ok: 200});
  }, 500);
});

app.post('/table/data', (req, res) => {
  setTimeout(() => {
    res.sendFile(__dirname + '/_mock/table/data.json');
  }, 500);
});

app.put('/table/save', (req, res) => {
  setTimeout(() => {
    res.json({ok: 200, job_id: 123});
  }, 500);
});

app.get('/table/save/123', (req, res) => {
  setTimeout(() => {
    res.json({succeeded: true, payload: [{id: 45572, record_id: 45572}]});
  }, 500);
});

app.get('/help', function root(req, res) {
  res.sendFile(__dirname + '/_mock/help.json');
})

const server = http.createServer(app);
server.listen(process.env.PORT || 8080, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});
