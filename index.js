function loadResource() {
    localStorage.setItem("tasks", JSON.stringify([]));
}
  
const addNewTaskToList = () => {
const taskName = document.getElementById("text").value;
if (taskName === "") {
    alert("Cannot create task without any title");
    return;
}
const tasklist = JSON.parse(localStorage.getItem("tasks"));
const newTask = {
    id: create_UUID(),
    taskName: taskName,
    subTask: [],
};
tasklist.push(newTask);
localStorage.setItem("tasks", JSON.stringify(tasklist));
addtaskonscreen(newTask.id);
document.getElementById("text").value = "";
};

const addNewSubTask = () => {
const taskId = document.getElementById("task-id").value;
const subTaskName = document.getElementById("subtask-text").value;
let newSubTask;
let tasklist = JSON.parse(localStorage.getItem("tasks"));
tasklist = tasklist.filter((taskObject) => {
    if (taskObject.id === taskId) {
    newSubTask = {
        id: create_UUID(),
        subTaskName: subTaskName,
        done: false,
    };
    taskObject.subTask.push(newSubTask);
    }
    return taskObject;
});
localStorage.setItem("tasks", JSON.stringify(tasklist));
updateTaskCardUI(taskId, newSubTask.id);
hideSubTaskPopUp();
};
  
const removeTask = (uuid) => {
const taskCard = document.getElementById(uuid);
let tasklist = JSON.parse(localStorage.getItem("tasks"));
tasklist = tasklist.filter((taskObject) => {
    if (taskObject.id !== uuid) {
    return taskObject;
    }
});
taskCard.parentElement.remove();
localStorage.setItem("tasks", JSON.stringify(tasklist));
};

function create_UUID() {
var dt = new Date().getTime();
var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
);
return uuid;
}
  
function addtaskonscreen(uuid) {
const tasklist = JSON.parse(localStorage.getItem("tasks"));
const element = document.createElement("div");
element.setAttribute("class", "boxes");
const elementone = document.createElement("div");
elementone.setAttribute("class", "header");
const elementtwo = document.createElement("div");
elementtwo.setAttribute("class", "content");
elementtwo.setAttribute("id", uuid);

const elementthree = document.createElement("div");
elementthree.setAttribute("class", "buttons");
const elementfour = document.createElement("div");
elementfour.innerHTML = `<i class="far fa-plus-circle add-subtask" onclick='showSubTaskPopUp("${uuid}")'></i>`;
elementfour.setAttribute("class", "buttonbottomone");
const elementfive = document.createElement("div");

elementfive.innerHTML = `<i class="far fa-trash-alt remove-subtask" onclick='removeTask("${uuid}")'></i>`;
elementfive.setAttribute("class", "buttonbottomtwo");

const task = tasklist.find((task) => {
    if (task.id === uuid) {
    return task;
    }
});

elementone.innerText = task.taskName;

element.appendChild(elementone);
element.appendChild(elementtwo);
element.appendChild(elementthree);
elementthree.appendChild(elementfour);
elementthree.appendChild(elementfive);

const existingelement = document.getElementById("parent-container");
existingelement.appendChild(element);

hidePopUp();
}
  
function processTaskCardUI(uuid, suuid) {
const tasklist = JSON.parse(localStorage.getItem("tasks"));
const taskCard = document.getElementById(uuid);
const subTaskElement = document.createElement("div");
subTaskElement.classList.add("sub-task-element");
const subTaskCompleteButton = document.createElement("div");
subTaskCompleteButton.classList.add("subtask-done-button");
subTaskCompleteButton.setAttribute("onclick", `markSubTaskDone("${uuid}")`);
subTaskCompleteButton.innerText = "Mark Done";

const taskObject = tasklist.find((taskObject) => {
    if (taskObject.id === uuid) {
    return taskObject;
    }
});
const subTaskObject = taskObject.subTask.filter((subTask) => {
    if (subTask.id === suuid) {
    return subTask;
    }
});

subTaskCompleteButton.setAttribute(
    "onclick",
    `markSubTaskDone("${uuid}:${subTaskObject.id}")`
);
subTaskElement.innerHTML = subTaskObject.subTaskName;
subTaskElement.setAttribute("id", subTaskObject.id);
subTaskElement.appendChild(subTaskCompleteButton);
taskCard.appendChild(subTaskElement);
}
  
function updateTaskCardUI(uuid, suuid) {
const tasklist = JSON.parse(localStorage.getItem("tasks"));
const taskCard = document.getElementById(uuid);
const subTaskElement = document.createElement("div");
subTaskElement.classList.add("sub-task-element");
const subTaskCompleteButton = document.createElement("div");
subTaskCompleteButton.classList.add("subtask-done-button");
subTaskCompleteButton.setAttribute("onclick", `markSubTaskDone("${uuid}")`);
subTaskCompleteButton.innerText = "Mark Done";

const taskObject = tasklist.find((taskObject) => {
    if (taskObject.id === uuid) {
    return taskObject;
    }
});
const subTaskObject = taskObject.subTask.filter((subTask) => {
    if (subTask.id === suuid) {
    return subTask;
    }
});
subTaskCompleteButton.setAttribute(
    "onclick",
    `markSubTaskDone("${uuid}:${suuid}")`
);
subTaskElement.innerHTML = subTaskObject[0].subTaskName;
subTaskElement.setAttribute("id", suuid);
subTaskElement.appendChild(subTaskCompleteButton);
taskCard.appendChild(subTaskElement);
}
  
function processDoneTasks(uuid) {
let tasklist = JSON.parse(localStorage.getItem("tasks"));
const subTaskElement = document.getElementById(uuid);
const subTaskValue = subTaskElement.childNodes[0];

subTaskElement.removeChild(subTaskElement.childNodes[1]);

subTaskElement.style.textDecoration = "line-through";
subTaskElement.innerText = subTaskValue.textContent;
}
  
function markSubTaskDone(uuid) {
let tasklist = JSON.parse(localStorage.getItem("tasks"));
const taskUUID = uuid.split(":")[0];
const subTaskUUID = uuid.split(":")[1];
  
    
  
tasklist = tasklist.filter((taskObject) => {
    if (taskObject.id === taskUUID) {
    taskObject.subTask = taskObject.subTask.filter((subTaskObject) => {
        if (subTaskObject.id === subTaskUUID) {
        subTaskObject.done = true;
        }
        return subTaskObject;
    });
    }
    localStorage.setItem("tasks", JSON.stringify(tasklist));
    return taskObject;
});

localStorage.setItem("tasks", JSON.stringify(tasklist));
processDoneTasks(subTaskUUID);
}

function showPopUp() {
const popUp = document.getElementById("popup");
popUp.classList.remove("popup-hidden");
}
  
function showSubTaskPopUp(uuid) {
const popUp = document.getElementById("subtask-popup");
const taskId = document.getElementById("task-id");
taskId.setAttribute("value", uuid);
popUp.classList.remove("popup-hidden");
}
  
function hidePopUp() {
const popUp = document.getElementById("popup");
popUp.classList.add("popup-hidden");
}
  
function hideSubTaskPopUp(){
    const popUp = document.getElementById("subtask-popup");
    popUp.classList.add("popup-hidden");
}