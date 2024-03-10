/* Any JavaScript here will be loaded for all users on every page load. */
const todoList = document.getElementById('todoList');

    function createTask(taskName) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.style.display = 'flex';
        taskDiv.style.alignItems = 'center';
        taskDiv.style.marginBottom = '10px';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.style.marginRight = '10px';
        checkbox.style.cursor = 'pointer';

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskName;

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskSpan);

        todoList.appendChild(taskDiv);

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                taskSpan.style.textDecoration = 'line-through';
                taskSpan.style.color = 'green';
            } else {
                taskSpan.style.textDecoration = 'none';
                taskSpan.style.color = 'black';
            }
        });
    }

    // Add initial tasks
    createTask('Task 1');
    createTask('Task 2');
    createTask('Task 3');