

const collapsible = (() => {
  const collapse = document.querySelectorAll('.collapsible');

  collapse.forEach(e => e.addEventListener('click', controlCollapse));

  function controlCollapse () {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  } 
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

function render(currentProject) {
  let arr = currentProject.getToDoArr();
  const box = document.querySelector('.todobox');
  clearToDo();
  arr.forEach(e => {
    const div = document.createElement('div');
    const title = e.getTitle();
    const notes = e.getNotes();
    const date = e.getDate();
    const priority = e.getPriority();
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    const p4 = document.createElement('p');
    p1.textContent = title;
    p2.textContent = notes;
    p3.textContent = date;
    p4.textContent = priority;
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    box.appendChild(div);
  });
}

function clearToDo() {
  const box = document.querySelector('.todobox');
  while (box.firstChild) {
    box.removeChild(box.firstChild);
  }
}

export default render;