import ToDo from "./todo"
import './style.css';
import './dom.js';
import {render, displayProjects} from "./dom.js";

const toDoArr = [];
const projects = {};
projects['main'] = Project();
displayProjects(projects);
let currentProject = projects['main'];
const submit = document.querySelector('#submit');
submit.addEventListener('click', addToDo);
const newProjectButton = document.querySelector('#newP');
newProjectButton.addEventListener('click', newProject)

function addToDo() {
  const title = document.querySelector('#title').value;
  const notes = document.querySelector('#notes').value;
  const date = document.querySelector('#date').value;
  const priority = document.querySelector('#priority').value;
  currentProject.addToDo(title, notes, date, priority);
}

function Project() {
  const toDoArr = [];
  const addToDo = (title, notes, date, priority) => {
    toDoArr.push(ToDo(title, notes, date, priority));
    console.log(toDoArr);
    render(currentProject);
  }
  const getToDoArr = () => toDoArr;
  return {addToDo, getToDoArr}
}

function newProject() {
  const name = prompt('Enter project name:', 'unnamed');
  projects[name] = Project();
  currentProject = projects[name];
  displayProjects(projects);
}

function switchProject() {

}

