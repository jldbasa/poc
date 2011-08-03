const http = require('http'),
      xml2js = require('xml2js');

module.exports = (function () {

  return {
    getFeeds: function (req, res, next) {
      http.get({
        host: 'query.yahooapis.com',
        path: '/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Frss.thepiratebay.org%2F200%22&format=json&callback='
      },
      function (hr) {
        var data = '';
        hr.on('data', function (chunk) {
          data += chunk;
        });
        hr.on('end', function () {
          var o = JSON.parse(data);
          if (o.query.count == 0) {
            res.write('[]');
          } else {
            res.write(JSON.stringify(o.query.results.item));
          }
          res.end();
        });
      });
    },

    getFavorites: function (req, res, next) {
    },

    addFavorite: function (req, res, next) {
    }
  };

})();
