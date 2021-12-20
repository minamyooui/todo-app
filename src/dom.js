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

function openToDoForm() {
  const form = document.querySelector('.form');
  form.classList.toggle('hideform');
}

