function designSystemAPI(product,id,lang,element) {
    return new Promise(function(resolve,reject) {
        wikia_url = `http://www.wikia.com/api/v1/design-system/${product}/${id}/${lang}/${element}`;
        $.ajax({
          url      : "https://query.yahooapis.com/v1/public/yql",
          data     : { q: "select * from json where url='" + encodeURI(wikia_url) + "'", format : "json" },
          success  : function(data) {
              if(data.query.count >= 1) {
                  if(!data.query.results.json.hasOwnProperty('exception')) {
                      resolve(data.query.results.json);
                  }
                  else {
                      reject(data.query.results.json.exception);
                  }
              }
              else {
                  reject({message: 'No record count'});
              }
          },
          fail: function(e,f,g) {
              reject({code: e, message: g});
          }
        });
    });
}