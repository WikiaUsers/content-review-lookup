/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* <nowiki> */

// *******************************************************************************************************
// ******************************** BEGINNING: JavaScript for [[Special:Upload]] *************************
// *******************************************************************************************************

function preloadUploadDesc() {
	document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{Lic-imag\n|Descripcion =\n|Fecha =\n|Origen =\n|Autor =\n|Licencia = {{cc-by-sa}}}}\n[[Categoría: AQUI SE PONE UNA CATEGORIA DE IMAGENES ]]"));

}

if( wgCanonicalNamespace == "Special" ) {
  if(wgCanonicalSpecialPageName == "Upload") {
    addOnloadHook(preloadUploadDesc);
}
}

// *******************************************************************************************************
// ************************************ END: Upload preload **********************************************
// *******************************************************************************************************
/* </nowiki> */