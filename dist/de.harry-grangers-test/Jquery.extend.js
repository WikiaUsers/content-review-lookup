$.extend({
    //Thanks to: https://css-tricks.com/snippets/jquery/get-query-params-object/
    getQueryParameters : function(str) {
        return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){
            return n = n.split("="),this[n[0]] = n[1],this
        }.bind({}))[0];
    },
    getTOML: function(page,callback,json) {
        $.get('/wiki/' + page + '?action=raw', function(data) {
            if(!callback) {
                console.log(data);
            }
            parsed = topl.parse(data);
            if(json) {
                parsed = JSON.stringify(data);
            }
            if(callback) {
                return callback(parsed);
            }
            else {
                return console.log(parsed);
            }
        });
    }
});