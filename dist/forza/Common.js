/* Any JavaScript here will be loaded for all users on every page load. */
// ============================================================
// LinkPreview
// ============================================================
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/forzamotorsport/images/c/c9/Forza_Placeholder_MissingCar.jpg/revision/latest?cb=20160917205621';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/forzamotorsport/images/c/c9/Forza_Placeholder_MissingCar.jpg/revision/latest?cb=20160917205621';
window.pPreview.RegExp.iimages = [/Icon_Game_ForzaHorizon5\.png/, /Icon_Game_ForzaHorizon4\.png/, /Icon_Game_ForzaCustoms\.png/, /Icon_Game_ForzaHorizon1\.png/, /Icon_Game_ForzaHorizon2\.png/, /Icon_Game_ForzaHorizon2PresentsFastAndFurious\.png/, /Icon_Game_ForzaHorizon3\.png/, /Icon_Game_ForzaHorizon6\.png/, /Icon_Game_ForzaMotorsport1\.png/, /Icon_Game_ForzaMotorsport2\.png/, /Icon_Game_ForzaMotorsport202X\.png/, /Icon_Game_ForzaMotorsport3\.png/, /Icon_Game_ForzaMotorsport4\.png/, /Icon_Game_ForzaMotorsport5\.png/, /Icon_Game_ForzaMotorsport6\.png/, /Icon_Game_ForzaMotorsport6Apex\.png/, /Icon_Game_ForzaMotorsport7\.png/, /Icon_Game_ForzaStreet\.png/, /Trophy Bronze\.png/, /Trophy Silver\.png/, /Trophy Gold\.png/, /Trophy Platinum\.png/, /GamerScore\.png/, /Icon_Infobox_ElectricEngine\.png/];
window.pPreview.RegExp.noinclude = ['div.notice.quote', 'div.notice.stub', 'div.notice.cleanup', 'div.notice.new'];