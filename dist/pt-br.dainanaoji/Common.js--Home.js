/* Códigos JavaScript aqui colocados serão carregados para a página principal */

// Botão toggle on/off para mudar a imagem de preto/branco para colorido //
var infoboxElement = document.createElement("div");
infoboxElement.innerHTML = `
     <div class="wrapper-toggle">
      <input type="checkbox" id="hide-checkbox">
      <label for="hide-checkbox" class="toggle">
        <span class="toggle-button">
          <span class="crater crater-1"></span>
          <span class="crater crater-2"></span>
          <span class="crater crater-3"></span>   
          <span class="crater crater-4"></span>
          <span class="crater crater-5"></span>
          <span class="crater crater-6"></span>
          <span class="crater crater-7"></span>
        </span>
        <span class="star star-1"></span>
        <span class="star star-2"></span>
        <span class="star star-3"></span>
        <span class="star star-4"></span>
        <span class="star star-5"></span>
        <span class="star star-6"></span>
        <span class="star star-7"></span>
        <span class="star star-8"></span>
      </label>
    </div>
`;

document.querySelector(".pi-panel:has(div.pi-image-collection.wds-tabber[data-source='Fourth Gallery']), .pi-panel:has(.pi-item.pi-image[data-source='Fourth Gallery'])").style.display = "none";
document.body.querySelector("h2.pi-item.pi-item-spacing.pi-title.pi-secondary-background").after(infoboxElement);
infoboxElement.style.position = "absolute";
infoboxElement.style.right = "-35px";
infoboxElement.style.top = "500px";
var btnSwitch = document.getElementById("hide-checkbox");
var imageElement2 = document.querySelector(".pi-panel:has(div.pi-image-collection.wds-tabber[data-source='First Gallery']), .pi-panel:has(.pi-item.pi-image[data-source='First Gallery'])");
btnSwitch.addEventListener('click', () => {
  if (btnSwitch.checked) {
    document.querySelector(".pi-panel:has(div.pi-image-collection.wds-tabber[data-source='Fourth Gallery']), .pi-panel:has(.pi-item.pi-image[data-source='Fourth Gallery'])").style.display = "block";
    imageElement2.style.display = 'none';
  } else {
    document.querySelector(".pi-panel:has(div.pi-image-collection.wds-tabber[data-source='Fourth Gallery']), .pi-panel:has(.pi-item.pi-image[data-source='Fourth Gallery'])").style.display = "none"; // Retorna à original
    imageElement2.style.display = ''; // Retorna à original
  }
});

// Seleciona todos os elementos que têm o atributo kkoi
document.querySelector(".page-footer").style.backgroundColor = "blue";