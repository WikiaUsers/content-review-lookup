document.getElementById("button").addEventListener("click", cambiarImagen);

function cambiarImagen() {
  var x = document.getElementById("imagen1");
  var y = document.getElementById("imagen2");
  if (x.style.display === "inline-block") {
    x.style.display = "none";
    y.style.display = "inline-block";
  } else {
    x.style.display = "inline-block";
    y.style.display = "none";
  }
}