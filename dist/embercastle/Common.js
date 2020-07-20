/* Make AnchoredRollback flag rollbacks as bot edits */
window.anchoredRollbackBot = true;

/* Add tags to my masthead */
if ($('.UserProfileMasthead h1').text() === 'Sophiedp') {
    var tag = '<span class="tag">Admin</span>&nbsp;<span class="tag">Bureaucrat</span>&nbsp;';
    $('.UserProfileMasthead hgroup').append(tag);
}