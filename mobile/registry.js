var Registry = (function () {

  var _map = {};

  function createEndPoint(name, uri) {
    return function (obj, callback) {
      // create ajax call, setting callback as the handler
    };
  }

  return {
    define: function (conf) {
      var o = {},
          d = conf.definition,
          n = conf.name;
      if (typeof _map[n] == 'undefined') {
        for (var k in d) {
          o[k] = createEndPoint(k, d[k]);
        }
        _map[n] = o;
      }
      return _map[n];
    },
    componentFor: function (name) {
      return _map[name];
    }
  };
})();

Registry.define({
  name: 'tpb',
  definition: {
    getFeeds: {
      method: 'get',
			params: [id, category],
      uri: '/feeds'
    },
    addFavorite: {
      method: 'post',
      uri: '/favorites'
    }
  }
});

var c = Registry.componentFor('tpb');

c.getFeeds({ some: 'data' }, function (resp) {
  // do something with the JSON response here
});

c.addFavorite({ some: 'request', params: 'here' }, function (resp) {
  // do something with the JSON response here
});
