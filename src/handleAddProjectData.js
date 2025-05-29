export {AddProjectform};

const AddProjectform = document.getElementById("addProjectForm");
const dialog = document.getElementById("addProjectDialog");

AddProjectform.addEventListener('submit', function(event) {
    // to prevent the submit button from looking for a server by default
    event.preventDefault();

    let projectName = document.getElementById("project_name").value;
    console.log(projectName);

    dialog.close();

    event.target.reset();
});