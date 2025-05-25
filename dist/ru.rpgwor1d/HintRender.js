document.querySelectorAll('.dropdown').forEach(dropdown => {
  dropdown.addEventListener('click', () => {
    const arrow = dropdown.querySelector('.arrow');
    const description = dropdown.parentElement.nextElementSibling || dropdown.parentElement.querySelector('.description');
    const hint = dropdown.parentElement.parentElement;
    // Если description находится внутри того же контейнера
    // В вашем коде description - это следующий sibling внутри одного div, поэтому ищем его через parentElement

    // Переключаем класс для стрелки
    arrow.classList.toggle('rotated');

    // Переключаем стили description
    if (description.style.height === 'unset' || description.style.height === '') {
      description.style.height = '0px';
      description.style.margin = '0px';
      hint.style.width = '400px';
      hint.style.margin = '5px';
      hint.style.marginTop = '5px';
      hint.style.marginBottom = '5px';
      
    } else {
      description.style.height = 'unset';
      description.style.margin = '10px';
      hint.style.width = '100%';
      hint.style.margin = '0px';
      hint.style.marginTop = '5px';
      hint.style.marginBottom = '5px';
    }
  });
});