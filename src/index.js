import ToDo from "./todo"
import './style.css';
import './dom.js';
import render from "./dom.js";

const toDoArr = [];
const projects = {};
const main = Project();
projects['main'] = main;
let currentProject = projects['main'];
const submit = document.querySelector('#submit');
submit.addEventListener('click', addToDo);

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
  return {name, addToDo, getToDoArr}
}



function switchProject() {

}

