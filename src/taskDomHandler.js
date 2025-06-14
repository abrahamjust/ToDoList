import completed from './assets/completed.svg';
import lowPriority from './assets/lowPriority.svg';
import mediumPriority from './assets/mediumPriority.svg';
import urgent from './assets/urgent.svg';
import { editTaskName, editTaskDescription, editTaskDueDate, editTaskStatus, deleteTask } from './dataHandler.js';

export {createTaskDivs}

function createTaskDivs(name, description, status, dueDate, taskId) {
    let task = document.createElement("div");
    task.className = "Task";
    task.id = taskId;
    let exposed = document.createElement("div");
    exposed.className = "Exposed";
    let Taskname = document.createElement("div");
    Taskname.innerHTML = name;
    let img = document.createElement("img");
    if(status == "completed") {
        img.src = completed;
        img.alt = "completed task";
        Taskname.classList.add('Task_title', 'Completed');
    } else if(status == "urgent") {
        img.src = urgent;
        img.alt = "urgent task";
        Taskname.classList.add('Task_title', 'Urgent');
    } else if(status == "medium") {
        img.src = mediumPriority;
        img.alt = "medium priority task";
        Taskname.classList.add('Task_title', 'Medium');
    } else if(status == "low"){
        img.src = lowPriority;
        img.alt = "low priority task";
        Taskname.classList.add('Task_title', 'Low');
    }
    let dueDateDiv = document.createElement("div");
    dueDateDiv.className = Date;
    dueDateDiv.textContent = "Due date: " + dueDate;
    Taskname.appendChild(dueDateDiv);

    exposed.append(img, Taskname);
    task.appendChild(exposed);

    let hidden = document.createElement("div");
    hidden.className = "Hidden";
    let taskForm = document.createElement("form");
    taskForm.id = `taskForm-${taskId}`;
    taskForm.action = "#";
    taskForm.method = "get";

    let hiddenTop = document.createElement("div");
    hiddenTop.className = "hiddenTop";

    let div1 = document.createElement("div");
    let taskLabel = document.createElement("label");
    taskLabel.setAttribute("for", "task_name");
    taskLabel.textContent = "task name: ";
    let taskInput = document.createElement("input");
    taskInput.setAttribute("type", "text");
    taskInput.setAttribute("id", "task_name");
    taskInput.setAttribute("name", "task_name");
    taskInput.value = name;
    div1.appendChild(taskLabel);
    div1.appendChild(document.createElement("br"));
    div1.appendChild(taskInput);

    let radioDiv = document.createElement("div");
    radioDiv.className = "radio";
    let radioValues = ["completed", "urgent", "medium", "low"];
    radioValues.forEach(value => {
        let div = document.createElement("div");
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "radio";
        input.value = value;
        div.appendChild(input);
        div.append(" " + value);
        radioDiv.appendChild(div);
        if(value === status) {
            input.setAttribute("checked", "checked");
        }
    });

    hiddenTop.append(div1, radioDiv);

    let hiddenBottom = document.createElement("div");
    hiddenBottom.className = "hiddenBottom";

    let descDiv = document.createElement("div");
    let descTitle = document.createElement("div");
    descTitle.textContent = "Description";
    let textarea = document.createElement("textarea");
    textarea.setAttribute("name", "description");
    textarea.setAttribute("id", "description");
    textarea.setAttribute("cols", "50");
    textarea.textContent = description;
    descDiv.appendChild(descTitle);
    descDiv.appendChild(textarea);

    let dateDiv = document.createElement("div");
    let dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "dueDate");
    dateLabel.textContent = "Due date:";
    let dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "dueDate");
    dateInput.setAttribute("name", "dueDate");
    dateInput.value = dueDate;

    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(dateInput);

    hiddenBottom.appendChild(descDiv);
    hiddenBottom.appendChild(dateDiv);

    let buttons = document.createElement("div");
    buttons.className = "buttons";
    let taskEditSubmit = document.createElement("input");
    taskEditSubmit.type = "submit";
    taskEditSubmit.name = "editTaskSubmit";
    taskEditSubmit.id = "editTaskSubmit";
    let deleteTaskButton = document.createElement("button");
    deleteTaskButton.type = "button";
    deleteTaskButton.id = "deleteTask";
    deleteTaskButton.innerHTML = "Delete task";

    buttons.append(taskEditSubmit, deleteTaskButton);
    taskForm.append(hiddenTop, hiddenBottom, buttons);
    hidden.appendChild(taskForm);
    task.appendChild(hidden);

    exposed.addEventListener('click', () => {
        task.classList.toggle('active');
        taskInput.value = name;
        textarea.value = description;
        dateInput.value = dueDate;

        let radios = radioDiv.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.checked = (radio.value === status);
        });
    });

    taskEditSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        let currentProject = JSON.parse(localStorage.getItem("currentProject") || "0");
        if(taskInput.value != name) {
            editTaskName(currentProject, taskId, taskInput.value);
        }

        if(textarea.value != description) {
            editTaskDescription(currentProject, taskId, textarea.value);
        }

        if(dateInput.value != dueDate) {
            editTaskDueDate(currentProject, taskId, dateInput.value);
        }
        // only select radios inside the task form. Using document causes errors as entire doc is searched for radio buttons
        let radioCheck = taskForm.querySelector('input[type ="radio"]:checked');
        let newStatus = radioCheck ? radioCheck.value : null;
        if(newStatus != status) {
            editTaskStatus(currentProject, taskId, newStatus);
            console.log(newStatus);
        }
    });

    deleteTaskButton.addEventListener('click', () => {
        let currentProject = JSON.parse(localStorage.getItem("currentProject") || "0");
        deleteTask(currentProject, taskId);
    });

    let viewer = document.querySelector(".Viewer");
    viewer.appendChild(task);
}