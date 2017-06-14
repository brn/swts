/**
 * @fileoverview
 * @author Taketoshi Aono
 */


const fs = require('fs');
const express = require('express');
const serveStatic = require('serve-static');
const spdy = require('spdy');
const tlsContexts = require('localhost.daplie.me-certificates').getAllSecureContexts({});

const app = express();
app.use(serveStatic('./'));

const options = {
  key: tlsContexts['localhost.daplie.me'].key,
  cert: tlsContexts['localhost.daplie.me'].cert,
  SNICallback(servername, cb) {
    if (tlsContexts[servername]) {
      cb(null, tlsContexts[servername]);
      return;
    }
    cb(null, tlsContexts['localhost.daplie.me']);
  }
};


spdy.createServer(options, app).listen(8686, (e) => e? console.error(e): console.log('Listen 8686...'));
