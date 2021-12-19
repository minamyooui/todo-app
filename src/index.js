import toDo from "./todo"
import './style.css';

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