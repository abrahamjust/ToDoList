export {createProject, deleteProject, editProjectName, createTask, editTaskName, editTaskDescription, editTaskDueDate, editTaskStatus, editTaskUrgency, deleteTask, initializeApp};
import { createProjectDiv } from "./domHandler.js";
import { createTaskDivs } from "./taskDomHandler.js";
import addTaskImg from './assets/addTask.svg';

let projList = [];
let projCounter = 0;

class Project {

    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.taskList = [];
        this.taskcounter = 0;
    }

    getTask(id) {
        for(let task of this.taskList) {
            if(task.id == id) {
                return task;
            }
        }
        return null;
    }

    createTask(name, description, status, dueDate) {
        this.taskList.push({name: name, description: description, status: status, dueDate: dueDate, id: `task-${this.taskcounter}`});
        this.taskcounter++;
    }

    deleteTask(taskID) {
        for(let [index, task] of this.taskList.entries()) {
            if(task.id == taskID) {
                this.taskList.splice(index, 1);
                break;
            }
        }
    }

    editTaskDescription(taskID, description) {
        this.getTask(taskID).description = description;
    }

    editTaskName(taskID, name) {
        this.getTask(taskID).name = name;
    }

    editTaskStatus(taskID, status) {
        this.getTask(taskID).status = status;
    }

    editTaskDate(taskID, dueDate) {
        this.getTask(taskID).dueDate = dueDate;
    }

}

function getProject(id) {
    projList = loadProjects();
    for(let project of projList) {
        if(project.id == id) {
            return project;
        }
    }
    return null;
}

function createProject(name) {
    // if no project has been created before this, return empty list
    projList = loadProjects();
    projCounter = loadCounter();
    console.log(projCounter);
    let project = new Project(name, projCounter);
    createProjectDiv(name, projCounter);
    projCounter++;
    projList.push(project);
    saveProjects();
    saveCounter();
}

function editProjectName(id, name) {
    getProject(id).name = name;
    saveProjects();
    renderAllProjects();
}

function createTask(id, name, description, urgency, status, date) {
    getProject(id).createTask(name, description, urgency, status, date);
    saveProjects();
}

function editTaskUrgency(id, taskID, urgency) {
    getProject(id).editTaskUrgency(taskID, urgency);
    saveProjects();
}

function editTaskDescription(id, taskID, description) {
    getProject(id).editTaskDescription(taskID, description);
    saveProjects();
}

function editTaskName(id, taskID, name) {
    getProject(id).editTaskName(taskID, name);
    saveProjects();
}

function editTaskStatus(id, taskID, status) {
    getProject(id).editTaskStatus(taskID, status);
    saveProjects();
}

function deleteTask(id, taskID) {
    getProject(id).deleteTask(taskID);
    saveProjects();
}

function deleteProject(id) {
    projList = loadProjects();
    for(let [index, project] of projList.entries()) {
        if(project.id == id) {
            projList.splice(index, 1);
            break;
        }
    }
    saveProjects();
    renderAllProjects();
}

function editTaskDueDate(id, taskID, dueDate) {
    getProject(id).editTaskDate(taskID, dueDate);
    saveProjects();
}

function revive(key, value) {
    if (value && typeof value === 'object' && 'name' in value && 'taskList' in value && 'id' in value && 'taskcounter' in value) {
    let p = new Project(value.name, value.id);
    p.taskList = value.taskList;
    p.taskcounter = value.taskcounter;
    return p;
  }
  return value;
}

function loadProjects() {
    return JSON.parse(localStorage.getItem("project") || "[]", revive);
}

function saveProjects() {
    localStorage.setItem("project", JSON.stringify(projList));
}

function saveCounter() {
    localStorage.setItem("projectCounter", JSON.stringify(projCounter));
}

function loadCounter() {
    return JSON.parse(localStorage.getItem("projectCounter") || "0");
}

function initializeApp() {
    const initialized = JSON.parse(localStorage.getItem("initialized") || "false");

    if (!initialized) {
        createProject("Default Project"); 
        localStorage.setItem("initialized", "true");
    } else {
        renderAllProjects();
    }
    projList = loadProjects();
    let id = projList[0].id;
    console.log(id);
    const event = new Event('click');
    const element = document.getElementById(id);
    element.dispatchEvent(event);
    saveProjects();
}

function renderAllProjects() {
    deleteProjects();
    projList = loadProjects();
    for (let project of projList) {
        createProjectDiv(project.name, project.id);
    }
}

function deleteProjects() {
    document.querySelectorAll(".Project").forEach(project => project.remove());
}