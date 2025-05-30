export {addProjectDiv};
import projectImg from './assets/project.svg';

function addProjectDiv() {
    let project = document.createElement("div");
    project.className = "Project";
    let img = document.createElement("img");
    img.src = projectImg;
    img.alt = "Project";
    let heading = document.createElement("p");
    heading.className = "Project-title";
    heading.textContent = "Default Project";
    let modify = document.createElement("dialog");
    modify.id = "modifyProjectDialog";
    let close = document.createElement("button");
    close.autofocus = true;
    close.id = "closeModifyProject";
    close.innerHTML = "Close";

    modify.appendChild(close);

    let form = document.createElement("form");
    form.id = "newProjectNameForm";
    form.action = "#";
    form.method = "get";

    const label = document.createElement('label');
    label.setAttribute('for', 'new_project_name');
    label.innerText = 'Enter new project name: ';

    const br = document.createElement('br');

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'new_project_name';
    input.name = 'new_project_name';

    const button = document.createElement('button');
    button.id = 'new_ProjectName';
    button.type = 'submit';
    button.innerText = 'submit';

    form.append(label, br, input, button);
    modify.appendChild(form);

    const deleteButton = document.createElement('button');
    deleteButton.id = 'deleteProject';
    deleteButton.innerText = 'Delete project';

    modify.appendChild(deleteButton);
    project.append(img, heading, modify);

    const sidebar = document.querySelector(".Sidebar");
    sidebar.appendChild(project);
}