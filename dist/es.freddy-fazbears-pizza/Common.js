/* LinkPreview (Agradecimientos a King Mememes por explicar el proceso) */
window.pPreview = {
  noimage: 'https://vignette.wikia.nocookie.net/freddy-fazbears-pizza/images/4/4f/FNaF_AR_-_Identidad_no_confirmada_%28Icono_-_Mapa%29.png/revision/latest?cb=20200515170737&path-prefix=es',
  RegExp: {
    ilinks: [/catego.*?:.*?/gim] // Ignorar categorías
  }
};
/* Para que los ProfileTags funcionen correctamente */
window.dev = window.dev || {};
window.dev.profileTags = {
  noHideTags: true
};