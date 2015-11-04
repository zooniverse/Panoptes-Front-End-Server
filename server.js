import React from 'react';
import webpack from 'webpack';
import path from 'path';
import routes from './lib/routes';
import express from 'express';
import morgan from 'morgan';
import ReactDOMServer from 'react-dom/server';
import Mounter from './lib/mounter';

const PORT = process.env.PORT || 3737;

webpack({
  entry: {
    browser: path.resolve('lib', 'browser'),
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    }],
  },
}, (error, stats) => {
  if (error) {
    console.error(error);
  } else {
    console.log(stats.toString());
  }
});

const app = express();

app.use(morgan('dev'));

app.use('/js', express.static(path.resolve('dist')));

Object.keys(routes).forEach((route) => {
  app.get(route, (req, res) => {
    const {component, reducer} = routes[route];

    let awaitState = {};
    if (component.loadData) {
      awaitState = component.loadData(req.params, req.query);
    }

    Promise.resolve(awaitState).then((state) => {
      try {
        const output = ReactDOMServer.renderToString(
          <Mounter component={component} reducer={reducer} state={state} />
        );
        res.send(`
          <!doctype html>
          <html>
            <head>
              <meta charset="utf-8" />
              <title>Zooniverse</title>
            </head>
            <body>
              <div id="application-container">${output}</div>
              <script>
                window.APPLICATION_ROUTE = ${JSON.stringify(route, null, 2)};
                window.APPLICATION_STATE = ${JSON.stringify(state, null, 2)};
                window.APPLICATION_CONTAINER = document.getElementById('application-container');
              </script>
              <script src="./js/browser.js"></script>
            </body>
          </html>
        `);
      } catch (renderError) {
        res.status(500).send(renderError.toString());
      }
    });
  });
});

app.listen(PORT, () => {
  console.log('Ready on', PORT);
});
