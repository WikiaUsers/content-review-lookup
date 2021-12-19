/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
// Кастом модуль
window.AddRailModule = ['Template:NewPagesModule'];

// "развернуть/свернуть" для Шаблон:Работа
var coll = document.getElementsByClassName("vcw-collapsible-panel__header");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}