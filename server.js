const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
let q = 0;

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

app.get('/get-group-children', (req, res) => {
  setTimeout(() => {
    res.json({
      products_presence: Math.random() < 0.5,
      children_presence: Math.random() < 0.5,
    });
  }, 700);
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
  q = 0;
  setTimeout(() => {
    res.json({ok: 200, job_id: 123});
  }, 500);
});


app.get('/table/save/:jobId', (req, res) => {
  q++;
  console.log('query count ------->', q)
  if (q < 10) {
    setTimeout(() => {
      res.json({
        "enqueued_at":"2017-05-22T09:12:40Z",
        "succeeded":null,
        "progress":{"num":0,"total":1,"percent": 10 * q,"message":null},
        "payload":null
      });
    }, 500);
  } else {
    setTimeout(() => {
      res.json({succeeded: true, payload: [{id: 45572, record_id: 45572}]});
    }, 500);
  }
});

app.delete('/api/v1/companies/:id/empty_product_groups', (req,res) => {
  q = 0;
  console.log('Удалить пустые группы ------', req.params.id);
  res.json({"meta_id":"ff6cd2bf87ad8b908e2b38f2e40f5d4c0bc8c96c"});
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
