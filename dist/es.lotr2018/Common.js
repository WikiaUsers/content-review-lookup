/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
switch (mw.config.get('wgPageName')) {
    case 'Los_Adoradores_del_Fuego':
        $('head').append('<meta name="twitter:image" content="https://vignette.wikia.nocookie.net/lotr2018/images/d/d9/Splendor_of_moria_by_annewipf-dajgoq7.jpg/revision/latest?cb=20180326111855&path-prefix=es" />');
	//Adding the Twitter Card image meta <meta name="twitter:image" content="https://vignette.wikia.nocookie.net/lotr2018/images/d/d9/Splendor_of_moria_by_annewipf-dajgoq7.jpg/revision/latest?cb=20180326111855&path-prefix=es">
	//var metatwitter=document.createElement('meta');
	//metatwitter.setAttribute('name','twitter:image');
	//metatwitter.setAttribute('content','https://vignette.wikia.nocookie.net/lotr2018/images/d/d9/Splendor_of_moria_by_annewipf-dajgoq7.jpg/revision/latest?cb=20180326111855&path-prefix=es');
	//metatwitter.name = 'twitter:image';
	//metatwitter.content = 'https://vignette.wikia.nocookie.net/lotr2018/images/d/d9/Splendor_of_moria_by_annewipf-dajgoq7.jpg/revision/latest?cb=20180326111855&path-prefix=es';
	//document.getElementsByTagName("head")[0].appendChild(metatwitter);
        break;
}