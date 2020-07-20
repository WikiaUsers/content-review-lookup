/* Any JavaScript here will be loaded for all users on every page load. */
/* lock blog comments for blogs that haven't been commented on for more than 14 days.
   original by: [[User:Joeyaa|Joey Ahmadi]]
*/

window.LockOldBlogs = {
    expiryDays: 14,
    expiryMessage: 'This blog post is locked from further comments as it hasn\'t been commented on for over <expiryDays> days.',
};