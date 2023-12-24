/* Códigos JavaScript aqui colocados serão carregados para a página principal */
var infoboxElement = document.createElement("div");

infoboxElement.innerHTML = `

<div class="btn-toggle">

  <div class="btn r" id="btn-switch">

    <input type="checkbox" class="checkbox" />

    <div class="on"></div>

    <div class="off"></div>

  </div>

</div>

`;

document.body.querySelector("h2.pi-item.pi-item-spacing.pi-title.pi-secondary-background").after(infoboxElement);
const btnSwitch = document.querySelector('#btn-switch .checkbox');

const textElement = document.querySelector('.kkoi');

btnSwitch.addEventListener('click', () => {

  if (btnSwitch.checked) {

    textElement.style.color = 'blue';

  } else {

    textElement.style.color = ''; // Retorna à cor original

  }

});