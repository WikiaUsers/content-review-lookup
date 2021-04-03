/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('ShowHide/code.js', 'dev');

window.MassCategorizationGroups = ['sysop', 'content-moderator'];

window.ArticleRating = {
  title: 'How Likely Is This Cryptid to Exist?',
  values: ['Definitely Not', 'Probably Not', 'Maybe', 'Probably', 'Likely'],
  starSize: [24, 24],
  starColor: ['#ccc', '#ffba01'],
  starStroke: '#000',
  excludeCats: ['Category:Not cryptids'],
  location: 'top-rail'
}