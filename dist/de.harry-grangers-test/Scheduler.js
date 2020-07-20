/**
* Cronjobs
* 
* Copyright (c) Agent Zuri, 2017
*
* 1 2 3 4 5
* 1 = Minute (0-59)
* 2 = Stunde (0-23)
* 3 = Tag (0-31)
* 4 = Monat (1-12)
* 5 = Wochentag (0-7, Sonntag ist 0 oder 7)
*
* * = Ausführung immer (zu jeder…)
* *\/n = Ausführung aller n
* n,x,y = Ausführung um/am n, x und y
*/

$.getJSON('/wiki/MediaWiki:Schedule.js?action=raw', function(data) {
    console.log('schedule',data);
    date = new Date();
    key = date.getFullYear() + '-' + date.getMonth();
    if(!data.map(function(item) {
        return item.hasOwnProperty(key);
    }).length) {
        data.push({[key]: 'successful'});
        console.log('schedule',data);
        postData = {
            action: 'edit',
            title: 'MediaWiki:Schedule.js',
            summary: 'executed job',
            basetimestamp: date.toISOString(),
            token: mw.user.tokens.get('editToken'),
            text: JSON.stringify(data),
            format: 'json'
        };
        $.post('/api.php',postData, function(res) {
            console.log(res);
        },'json')
        .fail(function(e) {
            console.log(e);
        });
    }
    else {
        console.log('This month\'s task',data.map(function(item) {
            return item.hasOwnProperty(key);
        })[0]);
    }
});

function Scheduler() {
    this.status = 'not-initialized';
    if(this.init) {
        this.init();
    }
}
Scheduler.prototype.scheduleURL = 'MediaWiki:Schedule.js';
Scheduler.prototype.init = function() {
    if(this.status == 'not-initialized') {
        var _scheduler = this;
        $.getJSON('/wiki/' + this.scheduleURL + '?action=raw', function(data) {
            _scheduler.status = 'initialized';
            _scheduler.schedule = data;
        }).fail(function(e) {
            _scheduler.status = 'error';
            _scheduler.error = e;
        });
    }
    else {
        console.log('init error',this,this.status);
        throw 'Scheduler already initialized: ' + this.status;
    }
}
Scheduler.prototype.setTask = function() {
    this.schedule.push(new Task(arguments[0]));
}
Scheduler.prototype.run() {
    this.schedule.forEach(function(item) {
        var 
        if() {
            this.callback();
        }
    });
}

function Task() {
    if(this.init) {
        this.init(arguments[0]);
    }
}
Task.prototype.init = function(args) {
    _.defaults(this,args);
    _.defaults(this,{
        description: 'task',
        cronmatrix: 'x x x x x x',
        callback: function() {

        },
        log: []
    });
}