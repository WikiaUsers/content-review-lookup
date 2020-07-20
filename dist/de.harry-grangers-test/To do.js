function ToDoList() {
    if(this.init) {
        this.init();
    }
    this.status = 'not initialized';
    this.list = [];
}

ToDoList.prototype.ToDoListURL = 'ToDoList';
ToDoList.prototype.init = function init() {
    this.get();
}
ToDoList.prototype.add = function add(description) {
    this.list.push(new ToDo(this.list.length,description));
    this.save();
    this.get();
}
ToDoList.prototype.get = function get() {    
    var _todo = this;
    $.getJSON('/wiki/MediaWiki:' + this.ToDoListURL + '.js?action=raw',function(list) {
        _todo.status = 'initialized';
        _todo.list = list;
    }).fail(function(e) {
        _todo.status = 'error';
        _todo.currentMethod = 'get';
        _todo.error = e;
    });
}
ToDoList.prototype.open = function() {
    return this.list.filter(function(item) {
        return !item.completed;
    });
}
ToDoList.prototype.all = function() {
    return this.list;
}
ToDoList.prototype.complete = function complete(id) {
    this.list[id].completed = true;
    this.save();
    this.get();
}
ToDoList.prototype.save = function save() {
    currentMethod = arguments.callee.caller.name;
    console.log('detect caller',arguments);
    postData = {
        action: 'edit',
        title: 'MediaWiki:' + this.ToDoListURL + '.js',
        summary: 'to do ' + currentMethod,
        basetimestamp: (new Date()).toISOString(),
        token: mw.user.tokens.get('editToken'),
        text: JSON.stringify(this.list),
        format: 'json'
    };
    _todo = this;
    $.post('/api.php',postData, function(res) {
        if(res.edit.result = 'Success') {
            _todo.status = 'updated';
        }
        else {
            _todo.status = 'error';
            _todo.currentMethod = currentMethod;
            _todo.error = res;
        }
    },'json')
    .fail(function(e) {
        _todo.status = 'error';
        _todo.currentMethod = currentMethod;
        _todo.error = e;
    });
}

function ToDo() {
    if(this.init) {
        this.init(arguments);
    }
}

ToDo.prototype.init = function(args) {
    this.id = args[0];
    this.description = args[1];
    this.completed = false;
}