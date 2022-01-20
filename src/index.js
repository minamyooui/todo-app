import ToDo from "./todo"
import './style.css';
import './dom.js';
import {render, displayProjects, highlightCurrent} from "./dom.js";
import { compareAsc } from "date-fns";


let projects = {};
projects['main'] = Project();
let currentProject = projects['main'];
loadState();
displayProjects(projects);
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
  saveState();
}

function Project(toDoArr = []) {
  const addToDo = (title, notes, date, priority) => {
    toDoArr.push(ToDo(title, notes, date, priority));
    toDoArr.sort((a, b) => compareAsc(a.getDate(), b.getDate()));
    render(currentProject);
  }
  const getToDoArr = () => toDoArr;
  return {addToDo, getToDoArr, toDoArr}
}

function newProject() {
  const name = prompt('Enter project name:', 'unnamed');
  projects[name] = Project();
  currentProject = projects[name];
  render(currentProject);
  displayProjects(projects);
  highlightCurrent(name);
  saveState();
}

function switchProject() {
  currentProject = projects[this.id];
  render(currentProject);
  highlightCurrent(this.id);
}

function deleteProject() {
  const key = this.previousElementSibling.id;
  delete projects[key];
  displayProjects(projects);
  console.log(projects);
  saveState();
  
}

function loadState() {
  const retrieved = localStorage.getItem('projects');
  if (retrieved) {
    recreateObjects(JSON.parse(retrieved));
  }
}

function saveState() {
  localStorage.setItem('projects', JSON.stringify(projects));
}



function testStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
  const retrieved = JSON.parse(localStorage.getItem('projects'));
  console.log('projects: ', projects);
  console.log('retrieved: ', retrieved);
  console.log('newProjects: ', recreateObjects(retrieved));
}

function recreateObjects(retrieved) {
  for (const key in retrieved) {
    const toDoArr = [];
    retrieved[key].toDoArr.forEach(e => {
      toDoArr.push(ToDo(e.title, e.notes, e.date, e.priority));
    });
    projects[key] = Project(toDoArr);
  }
}

testStorage();
// changed object returns for project and todo in order to test localStorage
// work on creating a factory for reconstructing retrieved objects with methods
// Object.assign can create new object with methods
//everything works, now to implement and test
// restoring state from local storage now works
//functionality to add: working mark done on todos, abilty to delete projects
// delete projects works, doesnt save
export {switchProject, deleteProject};