import "./styles.css";
import { Task } from "./taskExpandibles.js";
import { showButtonForAddProject, closeButtonForAddProject, setupProjectDialogs} from "./handleDialog.js";

import { addProjectDiv } from "./domHandler.js";

addProjectDiv();
setupProjectDialogs();