import { switchProject, deleteProject, markDone, deleteToDo, editToDo } from ".";
import format from "date-fns/format";

const collapsible = (() => {
  const collapse = document.querySelectorAll('.collapsible');

  collapse.forEach(e => e.addEventListener('click', controlCollapse));

  function controlCollapse () {
    const content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  } 
  return { controlCollapse };
})();

const button = document.querySelector('#addTodo');
button.addEventListener('click', () => openToDoForm('#new'));
const closeNew = document.querySelector('#new #close');
closeNew.addEventListener('click', () => closeForm('#new'));
const closeEdit = document.querySelector('#edit #close');
closeEdit.addEventListener('click', () => closeForm('#edit'));

function openToDoForm(id) {
  const form = document.querySelector(id);
  form.classList.toggle('hideform');
}

function closeForm(id) {
  const form = document.querySelector(id);
  form.classList.toggle('hideform');
}

function controlCollapse() {
  const content = this.firstChild.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
}

function render(currentProject) {
  const arr = currentProject.getToDoArr();
  const box = document.querySelector('.todobox');
  const donebox = document.querySelector('.donebox');
  clearToDo();
  arr.forEach((e, i) => {
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const buttons = document.createElement('div');
    const mark = document.createElement('button');
    mark.textContent = 'Mark Done';
    mark.onclick = markDone;
    mark.dataset.i = i;
    const del = document.createElement('button');
    del.onclick = deleteToDo;
    del.textContent = 'Delete';
    del.dataset.i = i;
    const edit = document.createElement('button');
    edit.onclick = editToDo;
    edit.textContent = 'Edit';
    edit.dataset.i = i;
    buttons.appendChild(mark);
    buttons.appendChild(del);
    buttons.appendChild(edit);
    div.addEventListener('click', controlCollapse)
    const title = e.getTitle();
    const notes = e.getNotes();
    const date = e.getDate() == 'Invalid Date' ? '' : format(e.getDate(), 'MM/dd/yyyy');
    const priority = e.getPriority();
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    const collapse = document.createElement('div');
    collapse.style.display = 'none';
    p1.textContent = title;
    p2.textContent = date;
    p3.textContent = notes;
    p4.textContent = priority;
    div2.appendChild(p1);
    div2.appendChild(p2);
    collapse.appendChild(p3);
    collapse.appendChild(p4);
    div.appendChild(div2);
    div.appendChild(collapse);
    div.appendChild(buttons);
    if(e.done) {
      mark.textContent = 'Unmark';
      donebox.appendChild(div);
    } else {
      box.appendChild(div);
    }
  });
}

function displayProjects(obj) {
  clearProjects();
  const projects = document.querySelector('.pContainer');
  for (const key in obj) {
    const div = document.createElement('div');
    div.classList = 'pBox';
    const p = document.createElement('p');
    p.style.margin = '.5em 0px';
    p.textContent = key;
    p.classList = 'project';
    p.id = key;
    p.addEventListener('click', switchProject);
    const del = document.createElement('button');
    del.textContent = 'del';
    del.classList = 'pDel';
    del.addEventListener('click', deleteProject);
    div.appendChild(p);
    div.appendChild(del);
    projects.appendChild(div);
  }
}

function clearProjects() {
  const box = document.querySelector('.pContainer');
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
}

function highlightCurrent(name) {
  const project = document.getElementById(name);
  const projects = document.querySelectorAll('.project');
  projects.forEach(e => e.classList.remove('active'));
  project.classList.toggle('active');
}

function editToDoForm(title, notes, date, priority, i) {
  const editSubmit = document.querySelector('#edit #submit');
  editSubmit.dataset.i = i;
  document.querySelector('#edit #title').value = title;
  document.querySelector('#edit #notes').value = notes;
  document.querySelector('#edit #date').value = date;
  document.querySelector('#edit #priority').value = priority;
  openToDoForm('#edit');
}

function clearToDo() {
  const box = document.querySelector('.todobox');
  const donebox = document.querySelector('.donebox');
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
  while (donebox.firstChild) {
    donebox.removeChild(donebox.firstChild);
  }
}

export {
  render,
  displayProjects,
  highlightCurrent,
  editToDoForm
};