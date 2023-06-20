let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
// console.log(tasks);
// Empty Array
let arrayOfTasks = [];
// Check If There Is Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// Trigger Get Data From Local Storage
getDataFromLocalStorage();
//Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};
// Click on task element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Element From Local Storage & Page
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  //   Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For the Task
    toggleTaskStatus(e.target.getAttribute("data-id"));
    // Toggle Class (done)
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  //   Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  //   Add Tasks To page
  addElementsToPage(arrayOfTasks);
  //   Add Tasks To Local Storage
  addDataToLocalStorage(arrayOfTasks);
}

function addElementsToPage(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task Is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}
function addDataToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPage(tasks);
  }
}
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorage(arrayOfTasks);
}
function toggleTaskStatus(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorage(arrayOfTasks);
}
// Delete All
document.querySelector(".deleteAll").onclick = function () {
  window.localStorage.removeItem("tasks");
  tasksDiv.innerHTML = "";
};
