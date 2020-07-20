var RedirTrigger = $('#TotalRedirect');
console.log(RedirTrigger);
if (RedirTrigger.length) {
    document.location.href = 'http://' + document.domain + '/wiki/' + RedirTrigger.data('page');
}
console.log('Works!');