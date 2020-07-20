/*******************
 * This is the JavaScript page for the custom
 * text box created by Ultimate Dark Carnage.
 * 
 * This script is made specifically for the HTML & CSS Wiki.
 * Therefore, you must get permission from [[User:Ultimate Dark Carnage|Ultimate Dark Carnage]] before you can use the script.
 ******************/
 
const CreateBox = {
    config: {
        currentPage: wgPageName,
        currentPageURL: '/index.php?title=' + encodeURIComponent(wgPageName)
    },
    error: {
        empty: 'This box cannot be blank.',
        notFound: 'The page that you\'re looking for has not been found.'
    },
    actions: {
        search: function($input){
            var isEmpty = $input.val() === '' ? true : false;
            if (isEmpty === true){
                let $error = $input.parent().siblings('.error');
                $error.text(CreateBox.error.empty);
                throw new Error(CreateBox.error.empty);
            } else {
                let url = '/index.php?title=Special:Search?query=';
                url += encodeURIComponent($input.val);
                window.location.href = url;
            }
        },
        go: function($input){
            
        }
    }
};