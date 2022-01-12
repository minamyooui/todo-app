import ToDo from "./todo"
import './style.css';
import './dom.js';
import {render, displayProjects, highlightCurrent} from "./dom.js";
import { compareAsc } from "date-fns";

const projects = {};
projects['main'] = Project();
displayProjects(projects);
let currentProject = projects['main'];
highlightCurrent('main');
const submit = document.querySelector('#submit');
submit.addEventListener('click', addToDo);
const newProjectButton = document.querySelector('#newP');
newProjectButton.addEventListener('click', newProject)

for (let i = 0; i < 3; i++) {
  currentProject.addToDo('test', 'test', '2022-01-01', 1);
}

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
    toDoArr.sort((a, b) => compareAsc(a.getDate(), b.getDate()));
    render(currentProject);
  }
  const getToDoArr = () => toDoArr;
  return {addToDo, getToDoArr}
}

function newProject() {
  const name = prompt('Enter project name:', 'unnamed');
  projects[name] = Project();
  currentProject = projects[name];
  render(currentProject);
  displayProjects(projects);
  highlightCurrent(name);
}

function switchProject() {
  currentProject = projects[this.id];
  render(currentProject);
  highlightCurrent(this.id);
}

export {switchProject};