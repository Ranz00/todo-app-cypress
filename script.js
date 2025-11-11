function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  tasks.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.text} (${t.category})`;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.classList.add('delete-btn');
    btn.onclick = () => deleteTask(t.text);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('new-task');
  const category = document.getElementById('category').value;
  const task = input.value.trim();
  if (!task) return alert('Task cannot be empty');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: task, category });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  input.value = '';
  loadTasks();
}

function deleteTask(text) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t.text !== text);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

document.getElementById('add-btn').addEventListener('click', addTask);
window.onload = loadTasks;
