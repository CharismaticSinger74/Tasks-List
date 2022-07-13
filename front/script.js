const card = task => {
    return `
    <div class="task">
        <button class="btn task-checkbox isChecked-${task.isChecked} js-check" data-id="${task._id}"><i class="fa-solid fa-check js-check" data-id="${task._id}"></i></button>
        <p class="task-text">${task.text}</p>
        <small class="task-date">${new Date(task.date).toLocaleDateString()}</small>
        <button class="btn task-button-delete js-remove" data-id="${task._id}"><i class="fa-solid fa-trash js-remove" data-id="${task._id}"></i></button>
    </div>
    `
};

let tasks = [];
let headers;
const BASE_URL = '/api/task'

class TaskApi {
    static fetch() {
        return fetch(BASE_URL, {
            method: 'get'
        }).then(res => res.json())
    }

    static create(task) {
        return fetch(BASE_URL, {
            method: 'post',
            body: JSON.stringify(task),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }

    static remove(id) {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'delete'
        }).then(res => res.json())
    }

    static update(id) {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'put'
        }).then(res => res.json());
    }
};

document.addEventListener('DOMContentLoaded', () => {
    TaskApi.fetch().then(backendTasks => {
        tasks = backendTasks.concat();
        renderTasks(tasks);
    })
    document.querySelector('#input').addEventListener("keypress", (event)=> {
        if (event.keyCode === 13) {
            event.preventDefault();
            onCreateTask();
        }
      });
    document.querySelector('#createTask').addEventListener('click', onCreateTask);
    document.querySelector('#tasks').addEventListener('click', onDeleteTask);
    document.querySelector('#tasks').addEventListener('click', onCheckTask);
})

function renderTasks(_tasks = []) {
    const $tasks = document.querySelector('#tasks');

    if (_tasks.length > 0) {
        $tasks.innerHTML = _tasks.map(task => card(task)).join(' ')
    } else {
        $tasks.innerHTML = '';
    } 
}

function onCreateTask() {
    const $text = document.querySelector('#input');
    if ($text.value) {
        const newTask = {
            text: $text.value
        }
        TaskApi.create(newTask).then(task => {
            tasks.push(task);
            renderTasks(tasks);
        })
        $text.value = '';
    }
}

function onDeleteTask(event) {
    if (event.target.classList.contains('js-remove')) {
        const id = event.target.getAttribute('data-id')

        TaskApi.remove(id).then(() => {
            const taskIndex = tasks.findIndex(task => task._id === id)
            tasks.splice(taskIndex, 1)
            renderTasks(tasks)
        })
    }
}

function onCheckTask(event) {
    if (event.target.classList.contains('js-check')) {
        const id = event.target.getAttribute('data-id');
        TaskApi.update(id).then(() => {
            TaskApi.fetch().then(backendTasks => {
                tasks = backendTasks.concat();
                renderTasks(tasks);
            });
        });
    }
}