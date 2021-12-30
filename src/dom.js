import { switchProject } from ".";

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
button.addEventListener('click', openToDoForm);
const closeButton = document.querySelector('#close');
closeButton.addEventListener('click', closeForm);

function openToDoForm() {
  const form = document.querySelector('.form');
  form.classList.toggle('hideform');
}

function closeForm() {
  const form = document.querySelector('.form');
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
  let arr = currentProject.getToDoArr();
  const box = document.querySelector('.todobox');
  clearToDo();
  arr.forEach(e => {
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    div.addEventListener('click', controlCollapse)
    const title = e.getTitle();
    const notes = e.getNotes();
    const date = e.getDate();
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
    box.appendChild(div);
  });
}

function displayProjects(obj) {
  clearProjects();
  const projects = document.querySelector('.projects');
  for (const key in obj) {
    const p = document.createElement('p');
    p.textContent = key;
    p.id = key;
    p.addEventListener('click', switchProject)
    projects.appendChild(p);
  }
}

function clearProjects() {
  const box = document.querySelector('.projects');
  while (box.childNodes[2]) {
    box.removeChild(box.childNodes[2]);
  }
}

function clearToDo() {
  const box = document.querySelector('.todobox');
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
}



export {
  render,
  displayProjects
};