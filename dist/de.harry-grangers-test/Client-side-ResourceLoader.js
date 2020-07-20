if(!window.hasOwnProperty('dev')) {
    window.dev = {};
}
window.dev.ResourceLoader = function() {
    this.req = {
        url: mw.util.wikiScript('api'),
        data: {
            action: 'query',
            prop: 'revisions',
            rvprop: 'content',
            format: 'json',
            indexpageids: true
        }
    }
    this.prepare = function(page, success, err, dataType) {
        var req = Object.assign({}, this.req);
        req.dataType = dataType;
        req.success = success;
        if (arguments.length === 3 && typeof err == 'function') {
            req.error = err;
        }
        req.data.titles = page;
        return req;
    }
    this.getScript = function(page, success, err) {
        req = this.prepare(page, success, err, 'script');
        req.dataFilter = function(rawData, type) {
            var res = JSON.parse(rawData);
            return res.query.pages[res.query.pageids[0]].revisions[0]['*'];
        }
 
        return $.ajax(req);
    }
 
    this.getJSON = function(page, success, err) {
        req = this.prepare(page, success, err, 'json');
        req.dataFilter = function(rawData, type) {
            var res = JSON.parse(rawData);
            console.log(res);
            console.log(JSON.parse(res.query.pages[res.query.pageids[0]].revisions[0]['*']));
            return res.query.pages[res.query.pageids[0]].revisions[0]['*'];
        }
 
        return $.ajax(req);
    }
    
    this.parseJSON = function(json) {
        var masks = {
            date: [
                '(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-3][0-9])',
                '(0[1-9]|[1-3][0-9]).(0[1-9]|1[0-2]).(\\d{4})'
            ]
        }
        var res = JSON.parse(json, function(key,val) {
            if(new RegExp(masks.date.join('|')).test(val)) {
                val = new Date(val);
            }
            return val;
        });
        
        return res;
    }
 
    return this;
}