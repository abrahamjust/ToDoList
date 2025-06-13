export { addTaskButton }
import { createTask } from './dataHandler.js';

let addTaskButton = document.querySelector(".addTask");
let close = document.getElementById("addTaskClose");
let form = document.getElementById('addTaskForm');

let dialog = document.querySelector("#addTaskDialog");
addTaskButton.addEventListener('click', () => {
    dialog.showModal();
});

close.addEventListener('click', () => {
    dialog.close();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    let currentProject = JSON.parse(localStorage.getItem("currentProject") || "0");
    createTask(currentProject, formData.get("task_name"), formData.get("description"), formData.get("addTaskRadio"), formData.get("addTaskDate")); 
    
    dialog.close();
    form.reset();
});