const form = document.querySelector('#todo-form');
const todoListUl = document.querySelector('#todo-list');
const taskTitleInput = document.querySelector('#task-title-input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para renderizar as tarefas no HTML
const renderTaskOnHTML = (taskTitle, done) => {
    const li = document.createElement('li');
    
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = done;
    input.addEventListener('change', (event) => {
        const liToToggle = event.target.parentElement;
        const spanToToggle = liToToggle.querySelector('span');

        const done = event.target.checked;
        if (done) {
            spanToToggle.style.textDecoration = 'line-through';
        } else {
            spanToToggle.style.textDecoration = 'none';
        }

        tasks.forEach(t => {
            if (t.title === spanToToggle.textContent) {
                t.done = done; // Atualiza o estado da tarefa no array
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    const span = document.createElement('span');
    span.textContent = taskTitle;
    span.style.textDecoration = done ? 'line-through' : 'none';

    const button = document.createElement('button');
    button.textContent = 'Remover';
    button.addEventListener('click', (event) => {
        const liToRemove = event.target.parentElement;
        const titleToRemove = liToRemove.querySelector('span').textContent; // Pega o título da tarefa

        // Removendo a tarefa do array
        tasks = tasks.filter(t => t.title !== titleToRemove);

        todoListUl.removeChild(liToRemove);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);

    todoListUl.appendChild(li);
};

// Ao carregar a página, renderiza as tarefas do localStorage
window.onload = () => {
  const storedTasks = localStorage.getItem('tasks');

  if (!storedTasks) return;
  
  tasks = JSON.parse(storedTasks);

  tasks.forEach(t => {
    renderTaskOnHTML(t.title, t.done);
  });
};

// Função para adicionar nova tarefa e renderizar no HTML
form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita o comportamento padrão de recarregar a página ao submeter o formulário

    const taskTitle = taskTitleInput.value;

    if (taskTitle.length < 3) {
        alert('Sua tarefa deve ter pelo menos 3 caracteres');
        return;
    }

    // Adicionando a nova tarefa no array de tasks
    tasks.push({
        title: taskTitle,
        done: false,
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Renderizando a nova tarefa no HTML
    renderTaskOnHTML(taskTitle, false);

    taskTitleInput.value = ''; // Limpa o campo de input
});
