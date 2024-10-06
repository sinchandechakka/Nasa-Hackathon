const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');

  if (e.target.matches('.next')) {

    slider.append(items[0]);
  }

  if (e.target.matches('.prev')) {

    slider.prepend(items[items.length - 1]);
  }
}

document.querySelector('.nav').addEventListener('click', activate);

var dropDown = function() {
  document.querySelector('.menu-dropdown').addEventListener('click', function() {
    const content = document.querySelector('.menu-content');
    const con = document.querySelector('.con');

    con.classList.toggle('menu-active');
    this.classList.toggle('menu-active');

    content.classList.toggle('hidden');

    setTimeout(function() {
      content.style.opacity = content.style.opacity === '1' ? '0' : '1';
    }, 300);  
  });
}

dropDown();