const fs = require('fs'),
      qs = require('querystring'),
      path = require('path');

module.exports = function (app) {

  function addRoute(ns, method, route, cb) {
    method = method.toLowerCase();
    if (['get', 'post', 'put', 'delete'].indexOf(method) >= 0) {
      app[method](path.normalize(['/', ns, '/', route].join('')), cb);
    }
  }

  function loadComponents(path) {
    fs.readFile(path, function (err, data) {
      if (err) throw err;
      JSON.parse(data).forEach(function (c) {
        var o = {},
            m = require('./registry/components/' + c.name),
            r = null;
        for (var k in c.routes) {
          r = c.routes[k];
          addRoute(c.name, r.method, k, m[r.api]);
        }
      });
    });
  }

  loadComponents('./registry/components.json');
};
