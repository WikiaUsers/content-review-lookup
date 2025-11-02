/* Tout code JavaScript placé ici sera chargé avec les pages accédées par les utilisateurs du site mobile */

// Activer les tabbers sur mobile
mw.loader.using(['ext.tabberNeue']).then(() => {
  $('.tabber').tabber();
});