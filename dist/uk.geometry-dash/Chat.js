/***************************/
/** Script Configuration ***/
/***************************/
 
/* ChatStatus */
window.ChatStatus = {
    statuses: {
        shortafk: 'Відійшов ненадовго;',
        longafk: 'Відійшов від клавіатури;',
        waiting: 'В очікуванні;',
        editing: 'Редагує;',
        mobile: 'На телефоні;',
        tablet: 'На планшеті;',
        pc: 'На комп’ютері;',
        sleep: 'Спить;',
        busy: 'Зайнятий;',
        game: 'Грає;',
        happy: 'Щасливий;'
    },
};
 
/*ChatTags*/
var chatags = { images: false, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');