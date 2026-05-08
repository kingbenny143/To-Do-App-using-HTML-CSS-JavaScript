const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeBtn = document.getElementById("themeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//render tasks
function renderTasks() {

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    const li = document.createElement("li");
    li.classList.add("task-item");

    li.innerHTML = `
      <div class="task-left">

        <input
          type="checkbox"
          ${task.completed ? "checked" : ""}
          onchange="toggleTask(${index})"
        >

        <span class="${task.completed ? "completed" : ""}">
          ${task.text}
        </span>

      </div>

      <div class="task-buttons">

        <button
          class="edit-btn"
          onclick="editTask(${index})"
        >
          Edit
        </button>

        <button
          class="delete-btn"
          onclick="deleteTask(${index})"
        >
          Delete
        </button>

      </div>
    `;

    taskList.appendChild(li);

  });

}

// Add tasks
addBtn.addEventListener("click", () => {

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  taskInput.value = "";

});

// DELETE TASK
function deleteTask(index) {

  tasks.splice(index, 1);

  saveTasks();
  renderTasks();

}

//toggle complete
function toggleTask(index) {

  tasks[index].completed =
    !tasks[index].completed;

  saveTasks();
  renderTasks();

}

//edit tasks
function editTask(index) {

  const newTask = prompt(
    "Edit task:",
    tasks[index].text
  );

  if (newTask !== null && newTask.trim() !== "") {

    tasks[index].text = newTask.trim();

    saveTasks();
    renderTasks();

  }

}

//dark mode
themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

});

//initial render

renderTasks();