export {showButtonForAddProject, closeButtonForAddProject, setupProjectDialogs}

const AddProjectdialog = document.getElementById("addProjectDialog");
const showButtonForAddProject = document.getElementById("addProject");
const closeButtonForAddProject = document.querySelector("#addProjectDialog button");

// "Show the dialog" button opens the dialog modally
showButtonForAddProject.addEventListener("click", () => {
  AddProjectdialog.showModal();
});

// "Close" button closes the dialog
closeButtonForAddProject.addEventListener("click", () => {
  AddProjectdialog.close();
});

function setupProjectDialogs() {
  const projectDivs = document.getElementsByClassName("Project");

  for (let projectDiv of projectDivs) {
    const dialog = projectDiv.querySelector("dialog");
    const closeButton = dialog.querySelector("button");

    // Open on clicking the Project div (excluding clicks on the dialog or button)
    projectDiv.addEventListener("click", (event) => {
      // Prevent re-triggering if click is inside the dialog or button
      // since the dialog is inside the div, if i dont have the check, it is like clicking on the div, so it opens again (the event bubbles up)
      // basically stops the event (opening event) from happening inside the dialog or on the close button
      if (event.target.tagName.toLowerCase() === "button" || dialog.contains(event.target)) return;

      dialog.showModal();
    });

    closeButton.addEventListener("click", () => {
      dialog.close();
    });
  }
}
