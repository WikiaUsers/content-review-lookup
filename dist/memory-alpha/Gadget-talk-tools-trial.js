'use strict';
if (mw.config.get('wgUserId') % 2 === 0){
	mw.loader.load('ext.gadget.talk-tools');
}