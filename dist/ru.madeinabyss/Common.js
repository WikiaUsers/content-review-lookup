/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

mw.loader.implement("ext.popups@1wum5",function($,jQuery,require,module){mw.requestIdleCallback(function(){var isTouchDevice='ontouchstart'in document.documentElement;if(!isTouchDevice){mw.loader.using('ext.popups.main');}});});