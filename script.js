let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (currentFilter === "active" && task.completed) ||
      (currentFilter === "completed" && !task.completed)
    ) {
      return;
    }

    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div onclick="toggleComplete(${index})" style="flex:1; cursor:pointer;">
        <strong>${task.text}</strong><br>
        <small>Priority: ${task.priority} | Due: ${task.dueDate || 'N/A'}</small>
      </div>
      <div class="actions">
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const priority = document.getElementById("prioritySelect").value;
  const dueDate = document.getElementById("dueDate").value;

  if (text === "") return;

  tasks.push({ text, priority, dueDate, completed: false });
  saveTasks();
  renderTasks();
  document.getElementById("taskInput").value = "";
  document.getElementById("dueDate").value = "";
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();

  const buttons = document.querySelectorAll(".filter-section button");
  buttons.forEach(btn => btn.classList.remove("active-filter"));

  const activeBtn = [...buttons].find(btn =>
    btn.textContent.toLowerCase() === filter
  );

  if (activeBtn) activeBtn.classList.add("active-filter");
}

// Initial load
renderTasks();
