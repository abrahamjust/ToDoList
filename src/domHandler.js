export {createProjectDiv};
import projectImg from './assets/project.svg';
import { getProject } from './dataHandler.js';
import {createProject, editProjectName, deleteProject, renderAllTasks} from './dataHandler.js';

function createProjectDiv(name, id) {
    let project = document.createElement("div");
    project.className = "Project";
    project.id = id;

    let img = document.createElement("img");
    img.src = projectImg;
    img.alt = "Project";

    let heading = document.createElement("p");
    heading.className = "Project-title";
    heading.textContent = name;

    let dialog = document.createElement("dialog");
    dialog.id = `dialog-${id}`;
    
    let closeButton = document.createElement("button");
    closeButton.autofocus = true;
    closeButton.id = `closeButton-${id}`;
    closeButton.innerHTML = "Close";

    dialog.appendChild(closeButton);

    let form = document.createElement("form");
    form.id = `form-${id}`;
    form.action = "#";
    form.method = "get";

    const label = document.createElement('label');
    label.setAttribute('for', `input-${id}`);
    label.innerText = 'Enter new project name: ';

    const br = document.createElement('br');

    const input = document.createElement('input');
    input.type = 'text';
    input.id = `input-${id}`;
    input.name = `input-${id}`;

    const Submitbutton = document.createElement('button');
    Submitbutton.id = `submitButton-${id}`;
    Submitbutton.type = 'submit';
    Submitbutton.innerText = 'submit';

    form.append(label, br, input, Submitbutton);
    dialog.appendChild(form);

    const deleteButton = document.createElement('button');
    deleteButton.id = `deleteButton-${id}`;
    deleteButton.innerText = 'Delete project';

    dialog.appendChild(deleteButton);
    project.append(img, heading, dialog);

    const sidebar = document.querySelector(".Sidebar");
    sidebar.appendChild(project);

    // event listener to open dialog
    project.addEventListener("dblclick", () => {
        dialog.showModal();
    });

    // event listener to pull up tasks on the viewer side
    project.addEventListener("click", () => {

        // the below doesnt work because of closure. The name, even after changing remains the same so we have to update the name here.
        // let text = document.querySelector("#ViewerProjectText");
        // text.innerHTML = name;

        // gets the updated name and hence, changes.
        let updatedProject = getProject(id);
        if(updatedProject) { // if the project is deleted, do nothing.
            let text = document.querySelector("#ViewerProjectText");
            text.innerHTML = updatedProject.name;
            localStorage.setItem("currentProject", JSON.stringify(id));
        }
        let currentProject = JSON.parse(localStorage.getItem("currentProject") || "0");
        renderAllTasks(currentProject);
    });

    // even listener to close dialog
    closeButton.addEventListener("click", () => {
        dialog.close()
    })

    Submitbutton.addEventListener("click", (event) => {
        event.preventDefault();
        let userInput = input.value;
        let projectID = deleteButton.closest("div").id;
        editProjectName(projectID, userInput);
        form.reset();
        dialog.close(); 
    })

    deleteButton.addEventListener("click", () => {
        console.log("project deleted");
        let projectID = deleteButton.closest("div").id;
        deleteProject(projectID);
        dialog.close();
    })
}

let addProject = document.getElementById("addProject");
let addProjectDialog = document.getElementById("addProjectDialog");
addProject.addEventListener("click", () => {
    addProjectDialog.showModal();
});

let addProjectForm = document.getElementById("addProjectForm");
let addProjectSubmit = document.getElementById("addProjectSubmit");
addProjectSubmit.addEventListener("click", () => {
    let projName = document.getElementById("project_name").value;
    if(projName != '') {
        createProject(projName);
    }
    addProjectForm.reset();
    addProjectDialog.close();
})

let addProjectClose = document.getElementById("addProjectClose");
addProjectClose.addEventListener("click", () => {
    addProjectDialog.close();
})



