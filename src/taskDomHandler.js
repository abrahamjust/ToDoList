import {completed} from './assets/completed.svg';
import {lowPriority} from './assets/lowPriority.svg';
import {mediumPriority} from './assets/mediumPriority.svg';
import {urgent} from './assets/urgent.svg';

export {createTaskDivs}

function createTaskDivs(name, description, urgency, status, dueDate) {
    let task = document.createElement("div");
    task.className = "Task";
    let exposed = document.createElement("div");
    exposed.className = "Exposed";
    let name = document.createElement("div");
    name.innerHtml = name;
    let img = document.createElement("img");
    if(status == "completed") {
        img.src = completed;
        img.alt = "completed task";
        name.classList.add('Task_title', 'Completed');
    } else if(urgency == "urgent") {
        img.src = urgent;
        img.alt = "urgent task";
        name.classList.add('Task_title', 'Urgent');
    } else if(urgency == "medium") {
        img.src = mediumPriority;
        img.alt = "medium priority task";
        name.classList.add('Task_title', 'Medium');
    } else if(urgency == "low"){
        img.src = lowPriority;
        img.alt = "low priority task";
        name.classList.add('Task_title', 'Low');
    }
    exposed.append(img, name);
    task.appendChild(exposed);
    let hidden = document.createElement("div");
    hidden.className = "Hidden";
    let testpara = document.createElement("p");
    testpara.textContent = description;
    hidden.appendChild(testpara);
    task.appendChild(hidden);
}