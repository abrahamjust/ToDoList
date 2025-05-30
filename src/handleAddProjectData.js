import {createProject, deleteProject, editProjectName, createTask, editTaskName, editTaskDescription, editTaskDueDate, editTaskStatus, editTaskUrgency, deleteTask} from "./storeDeleteData.js";
export {AddProjectform};

const AddProjectform = document.getElementById("addProjectForm");
const Adddialog = document.getElementById("addProjectDialog");
const newProjectNameForm = document.getElementById("newProjectNameForm");
const renameProjectDialog = document.getElementById("modifyProjectDialog");

AddProjectform.addEventListener('submit', function(event) {
    // to prevent the submit button from looking for a server by default
    event.preventDefault();
    let projectName = document.getElementById("project_name").value;
    createProject(projectName);
    Adddialog.close();
    event.target.reset();
});

newProjectNameForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let newProjectName = document.getElementById("new_project_name").value;
    editProjectName(0, newProjectName);
    renameProjectDialog.close();
    event.target.reset();
});