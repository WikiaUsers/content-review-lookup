// Mensajes al cargar
function alertLoad() {
  alert("Hola, visitantes")
  alert("Os estoy jugando un juego")
  alert("Si no os gusta, esperad hasta que se acaben")
  alert("Bien... este es el artículo...")
  alert("En el cual tú no eres parte de")
  alert("Porque no has solicitado al autor")
  alert("Aparecer en ese artículo")
  alert("Venga, te dejaré pasar")
  alert("Pero sólo si dejas volverte a hacerte este juego")
}
addOnloadHook(alertLoad);

// Mensajes al salir
// Ojo que aquí es un formato distinto
// TextoAlSalir += "alert(' TEXTO ');"
function alertUnLoad() {
  AlSalir = "" 
  AlSalir += "alert('Hola de nuevo');"
  AlSalir += "alert('No te vayas aún');"
  AlSalir += "alert('Bien, bien, te dejaré ir. Pero al llegar otra vez volverás a caer en este juego. ¿Vale?');"
  var temp = document.getElementsByTagName("body")[0].getAttribute('onUnload');
  if (temp)
    document.getElementsByTagName("body")[0].setAttribute('onUnload', temp + AlSalir);
  else
    document.getElementsByTagName("body")[0].setAttribute('onUnload', AlSalir);
}
addOnloadHook(alertUnLoad);