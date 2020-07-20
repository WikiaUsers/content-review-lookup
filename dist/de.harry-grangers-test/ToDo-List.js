if(!!$('.todo-list-container[data-list-id]').length) {
    container = $('.todo-list-container');
    tdl = new ToDoList(container.data('listId'));
    ul = $('<ul />').addClass('todo-list');
    outputToDo(ul,tdl,container);
}

function outputToDo(ul,tdl,container) {
    setTimeout(function() {
        if(tdl.status == 'initialized') {
            all = tdl.all();
            if(!!all.length) {
                all.forEach(function(item) {
                    $('<li />').attr('data-id',item.id).append(
                        $('<input />').attr('type','checkbox').prop('checked',item.completed),
                        $('<span />').text(item.description)
                    ).appendTo(ul);
                });
                console.log('tdl',tdl);
                container.append(ul);
            }
        }
        else {
            outputToDo(ul,tdl,container);
        }
    },100);
}