export {createProject, deleteProject, editProjectName, createTask, editTaskName, editTaskDescription, editTaskDueDate, editTaskStatus, editTaskUrgency, deleteTask};

let projList = [];

class Project {

    constructor(name) {
        this.name = name;
        this.taskList = [];
    }

    createTask(name, description, urgency, status, dueDate, index) {
        this.taskList.push({name: name, description: description, urgency: urgency, status: status, dueDate: dueDate});
    }

    deleteTask(index) {
        this.taskList.splice(index, 1);
    }

    editTaskUrgency(index, urgency) {
        this.taskList[index].urgency = urgency;
    }

    editTaskDescription(index, description) {
        this.taskList[index].description = description;
    }

    editTaskName(index, name) {
        this.taskList[index].name = name;
    }

    editTaskStatus(index, status) {
        this.taskList[index].status = status;
    }

    editTaskDueDate(index, dueDate) {
        this.taskList[index].dueDate = dueDate;
    }

}

function createProject(name) {
    // if no project has been created before this, return empty list
    projList = loadProjects();
    let project = new Project(name);
    projList.push(project);
    saveProjects();
}

function editProjectName(index, name) {
    projList = loadProjects();
    projList[index].name = name;
    saveProjects();
}

function createTask(index, name, description, urgency, status, date) {
    projList = loadProjects();
    projList[index].createTask(name, description, urgency, status, date);
    saveProjects();
}

function editTaskUrgency(index, taskIndex, urgency) {
    projList = loadProjects();
    projList[index].editTaskUrgency(taskIndex, urgency);
    saveProjects();
}

function editTaskDescription(index, taskIndex, description) {
    projList = loadProjects();
    projList[index].editTaskDescription(taskIndex, description);
    saveProjects();
}

function editTaskName(index, taskIndex, name) {
    projList = loadProjects();
    projList[index].editTaskName(taskIndex, name);
    saveProjects();
}

function editTaskStatus(index, taskIndex, status) {
    projList = loadProjects();
    projList[index].editTaskStatus(taskIndex, status);
    saveProjects();
}

function deleteTask(index, taskIndex) {
    projList = loadProjects();
    projList[index].deleteTask(taskIndex);
    saveProjects();
}

function deleteProject(index) {
    projList = loadProjects();
    projList.splice(index, 1);
    saveProjects();
}

function editTaskDueDate(index, taskIndex, dueDate) {
    projList = loadProjects();
    projList[index].editTaskDate(taskIndex, dueDate);
    saveProjects();
}

function revive(key, value) {
    if (value && typeof value === 'object' && 'name' in value && 'taskList' in value) {
    let p = new Project(value.name);
    p.taskList = value.taskList;
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