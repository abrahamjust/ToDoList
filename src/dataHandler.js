export {getProject, createProject, deleteProject, editProjectName, createTask, editTaskName, editTaskDescription, editTaskDueDate, editTaskStatus, deleteTask, initializeApp};
export {loadCurrentID, saveCurrentID, currentProject}
export { renderAllTasks }
import { format } from "date-fns";

import { createProjectDiv } from "./domHandler.js";
import { createTaskDivs } from "./taskDomHandler.js";

let projList = [];
let projCounter = 0;
let currentProject = 0;

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
        this.taskList.push({name: name, description: description, status: status, dueDate: dueDate, id: this.taskcounter});
        console.log(name, description, status, dueDate);
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

    let text = document.querySelector("#ViewerProjectText");
    text.innerHTML = name;

    projList = loadProjects();
    projCounter = loadCounter();
    console.log(projCounter);
    let project = new Project(name, projCounter);
    createProjectDiv(name, projCounter);
    currentProject = loadCurrentID();
    currentProject = projCounter;
    saveCurrentID();
    projCounter++;
    projList.push(project);
    saveProjects();
    saveCounter();
    deleteTasks();
}

function editProjectName(id, name) {
    getProject(id).name = name;
    saveProjects();
    currentProject = loadCurrentID();
    currentProject = id;
    saveCurrentID();
    renderAllProjects();
    // window.location.reload();
}

function createTask(id, name, description, status, date) {
    date = format(date, "yyyy-MM-dd");
    getProject(id).createTask(name, description, status, date);
    console.log(name, description, status, date);
    saveProjects();
    renderAllTasks(id); 
}

function editTaskDescription(id, taskID, description) {
    getProject(id).editTaskDescription(taskID, description);
    saveProjects();
    renderAllTasks(id);
}

function editTaskName(id, taskID, name) {
    getProject(id).editTaskName(taskID, name);
    saveProjects();
    renderAllTasks(id);
}

function editTaskStatus(id, taskID, status) {
    getProject(id).editTaskStatus(taskID, status);
    saveProjects();
    renderAllTasks(id);
}

function deleteTask(id, taskID) {
    getProject(id).deleteTask(taskID);
    saveProjects();
    renderAllTasks(id);
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
    currentProject = loadCurrentID();
    currentProject = 0;
    saveCurrentID();
    renderAllProjects();
}

function editTaskDueDate(id, taskID, dueDate) {
    dueDate = format(dueDate, "yyyy-MM-dd");
    getProject(id).editTaskDate(taskID, dueDate);
    saveProjects();
    renderAllTasks(id);
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

function saveCurrentID() {
    localStorage.setItem("currentProject", JSON.stringify(currentProject));
}

function loadCurrentID() {
    return JSON.parse(localStorage.getItem("currentProject") || "0");
}

function initializeApp() {
    const initialized = JSON.parse(localStorage.getItem("initialized") || "false");

    if (!initialized) {
        createProject("Default Project"); 
        currentProject = loadCurrentID()
        createTask(currentProject, "default task", "default task", "completed", new Date("2025-06-13"));
        localStorage.setItem("initialized", "true");
    } else {
        renderAllProjects();
    }
}

function renderAllProjects() {
    deleteProjects();
    projList = loadProjects();
    for (let project of projList) {
        createProjectDiv(project.name, project.id);
    }
    currentProject = loadCurrentID();
    let textDiv = document.querySelector("#ViewerProjectText");
    let text = projList[currentProject].name;
    textDiv.innerHTML = text;
    saveCurrentID();
    saveProjects();
    currentProject = loadCurrentID();
    renderAllTasks(currentProject);
    saveCurrentID();
}

function renderAllTasks(projId) {
    deleteTasks();
    let tasks = getProject(projId).taskList;
    for(let task of tasks) {
        createTaskDivs(task.name, task.description, task.status, task.dueDate, task.id);
    }
}

function deleteTasks() {
    document.querySelectorAll(".Task").forEach(task => task.remove());
}

function deleteProjects() {
    document.querySelectorAll(".Project").forEach(project => project.remove());
}