/* 
 * Thickbox4MediaWiki v1.8 - Based on Thickbox 3.1 By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2010 Jesús Martínez (User:Ciencia_Al_Poder), Original Thickbox Copyright (c) 2007 Cody Lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/
var Thickbox = {
	version: '1.8',
	// Dimensiones mínimas
	minWidth: 210,
	// Margen entre la imagen y el borde de ThickBox
	imageMarginWidth: 15,
	// Margen mínimo hasta el borde de la ventana. Si se supera la imagen se reducirá
	minMarginWidth: 30,
	minMarginHeight: 15,
	// Internos
	imgPreloader: null,
	galleryData: null,
	galleryIndex: -1,
	width: null,
	height: null,
	getCaption: null,
	xhr: null,
	imgTip: null,
	imgTipTarget: null,
	imgTipVisible: false,
	init: function() {
		// Se podría haber puesto un evento directamente en cada 'a.image', pero esto es mucho más rápido y eficiente (tarda solo el 20% en FF2) que recorrerse todo el DOM
		$('#bodyContent').bind('click.thickbox', Thickbox.triggerEvent).bind('mouseover.thickbox_imgtip', Thickbox.imgTipEvent);
	},
	triggerEvent: function(e) {
		if (e.ctrlKey || e.altKey || e.shiftKey) return true;
		var target = e.target;
		if (Thickbox.isTag(target,'img')) { // Gallery o thumb
			var a = target.parentNode;
			if (!a || !Thickbox.isTag(a,'a') || !Thickbox.isClass(a,'image')) return true;
			if (Thickbox.isClass(target,'thumbimage')) {
				// Es thumb
				a.blur();
				Thickbox.getCaption = Thickbox.getCaptionThumb;
				Thickbox.showImage(a);
				return false;
			}
			// Galería Wikia 2
			if (Thickbox.isClass(a,'lightbox')) {
				target.blur();
				Thickbox.getCaption = Thickbox.getCaptionWikia;
				Thickbox.galleryData = $(target).parents('div.wikia-gallery').children('span.wikia-gallery-item').children('div.thumb').children('div.gallery-image-wrapper').children('a.lightbox');
				if (Thickbox.galleryData.length == 0) {
					Thickbox.galleryData = $(target).parents('div.wikia-gallery').children('div.wikia-gallery-row').children('span.wikia-gallery-item').children('div.thumb').children('div.gallery-image-wrapper').children('a.lightbox');
				}
				if (Thickbox.galleryData.length == 0) {
					return true;
				}
				Thickbox.galleryIndex = Thickbox.galleryData.index(a);
				Thickbox.showImage(a);
				return false;
			}
			var gb = a.parentNode.parentNode.parentNode;
			// MediaWiki gallery
			if (Thickbox.isTag(gb,'div') && Thickbox.isClass(gb,'gallerybox') && Thickbox.isTag(gb.parentNode,'td')) {
				var t = gb.parentNode.parentNode.parentNode.parentNode;
				if (Thickbox.isTag(t,'table') && Thickbox.isClass(t,'gallery')) {
					a.blur();
					Thickbox.getCaption = Thickbox.getCaptionMW;
					Thickbox.galleryData = $(t).find('div.gallerybox').children('div.thumb').find('a.image');
					Thickbox.galleryIndex = Thickbox.galleryData.index(a);
					Thickbox.showImage(a);
					return false;
				}
			}
			// Es thumb genérico
			a.blur();
			Thickbox.getCaption = Thickbox.getCaptionEmpty;
			Thickbox.showImage(a);
			return false;
		} else if (Thickbox.isTag(target,'a')) {
			var sup = target.parentNode;
			if (!Thickbox.isTag(sup,'sup') || !Thickbox.isClass(sup,'reference')) return true;
			target.blur();
			Thickbox.showElement(target);
			return false;
		}
		return true;
	},