import completed from './assets/completed.svg';
import lowPriority from './assets/lowPriority.svg';
import mediumPriority from './assets/mediumPriority.svg';
import urgent from './assets/urgent.svg';

export {createTaskDivs}

function createTaskDivs(name, description, status, dueDate, taskId) {
    let task = document.createElement("div");
    task.className = "Task";
    task.id = taskId;
    let exposed = document.createElement("div");
    exposed.className = "Exposed";
    let Taskname = document.createElement("div");
    Taskname.innerHtml = name;
    let img = document.createElement("img");
    if(status == "completed") {
        img.src = completed;
        img.alt = "completed task";
        Taskname.classList.add('Task_title', 'Completed');
    } else if(status == "urgent") {
        img.src = urgent;
        img.alt = "urgent task";
        Taskname.classList.add('Task_title', 'Urgent');
        let dateDiv = document.createElement("div");
        dateDiv.className = Date;
        dateDiv.textContent = dueDate;
    } else if(status == "medium") {
        img.src = mediumPriority;
        img.alt = "medium priority task";
        Taskname.classList.add('Task_title', 'Medium');
        let dateDiv = document.createElement("div");
        dateDiv.className = Date;
        dateDiv.textContent = dueDate;
    } else if(status == "low"){
        img.src = lowPriority;
        img.alt = "low priority task";
        Taskname.classList.add('Task_title', 'Low');
        let dateDiv = document.createElement("div");
        dateDiv.className = Date;
        dateDiv.textContent = dueDate;
    }
    exposed.append(img, Taskname);
    task.appendChild(exposed);
    let hidden = document.createElement("div");
    hidden.className = "Hidden";
    let taskForm = document.createElement("form");
    taskForm.id = `taskForm-${taskId}`;
    taskForm.action = "#";
    taskForm.method = "get";

    task.appendChild(hidden);

    task.addEventListener('click', () => {
        task.classList.toggle('active');
    })
}