import ToDo from "./todo"
import './style.css';
import './dom.js';
import {render, displayProjects, highlightCurrent, editToDoForm} from "./dom.js";
import { compareAsc } from "date-fns";


let projects = {};
loadState();
if(!projects['main']) {
  projects['main'] = Project();
}
let currentProject = projects['main'];
displayProjects(projects);
highlightCurrent('main');
render(currentProject);
const submit = document.querySelector('#new #submit');
submit.addEventListener('click', addToDo);
const newProjectButton = document.querySelector('#newP');
newProjectButton.addEventListener('click', newProject)
const edit = document.querySelector('#edit #submit');
edit.addEventListener('click', sendEdit);

function addToDo() {
  const title = document.querySelector('#new #title').value;
  const notes = document.querySelector('#new #notes').value;
  const date = document.querySelector('#new #date').value;
  const priority = document.querySelector('#new #priority').value;
  currentProject.addToDo(title, notes, date, priority);
  saveState();
}

function Project(toDoArr = []) {
  const addToDo = (title, notes, date, priority) => {
    toDoArr.push(ToDo(title, notes, date, priority));
    toDoArr.sort((a, b) => compareAsc(a.getDate(), b.getDate()));
    render(currentProject);
  }
  const delToDo = (i) => {
    if (i > -1) {
      toDoArr.splice(i, 1);
    }
    render(currentProject);
  }
  const markDone = (i) => {
    if (i > -1) {
      const toDo = toDoArr[i];
      if (toDo.done) {
        toDo.done = false;
      } else {
        toDo.done = true;
      }
    }
  }
  const updateToDo = (title, notes, date, priority, i) => {
    if (i > -1) {
      const done = toDoArr[i].done;
      toDoArr[i] = ToDo(title, notes, date, priority, done);
    }
  }
  const getToDoArr = () => toDoArr;
  return {addToDo, getToDoArr, delToDo, updateToDo, toDoArr, markDone}
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

function sendEdit() {
  const i = this.dataset.i;
  const title = document.querySelector('#edit #title').value;
  const notes = document.querySelector('#edit #notes').value;
  const date = document.querySelector('#edit #date').value;
  const priority = document.querySelector('#edit #priority').value;
  currentProject.updateToDo(title, notes, date, priority, i);
  render(currentProject);
  saveState();
}

function editToDo(e) {
  const i = this.dataset.i;
  const toDo = currentProject.getToDoArr()[i];
  editToDoForm(toDo.title, toDo.notes, toDo.date, toDo.priority, i);
  e.stopPropagation();
}

function deleteToDo(e) {
  const i = this.dataset.i;
  currentProject.delToDo(i);
  e.stopPropagation();
  saveState();
}

// needed to simulate clicking on project to save marked todos

function markDone(e) {
  const switchBut = document.querySelector('.active');
  switchBut.click();
  const i = this.dataset.i;
  currentProject.markDone(i);
  render(currentProject);
  e.stopPropagation();
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
      toDoArr.push(ToDo(e.title, e.notes, e.date, e.priority, e.done));
    });
    projects[key] = Project(toDoArr);
  }
}

export {switchProject, deleteProject, deleteToDo, markDone, editToDo};

//add abilty to edit todos
//clear forms after submit