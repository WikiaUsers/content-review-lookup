/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('AlertBar/Source', 'dev');
 
ItemsToAdd = [
  {
    'Name': 'General Improvement',
    'Page': 'Category:General_Improvement',
    'Description': 'These articles need some cleanup work done on them.',
    'Override': true
  },
  {
    'Name': 'Grammatical Cleanup',
    'Page': 'Category:Grammar_Improvement',
    'Description': 'These articles need to be checked for grammar mistakes.',
    'Override': true
  },
  {
    'Name': 'Pages that need Citations',
    'Page': 'Category:Grammar_Improvement',
    'Description': 'These articles appear to lack citations.',
    'Override': true
  },
  {
    'Name': 'Pages that need Clarification',
    'Page': 'Category:Grammar_Improvement',
    'Description': 'These articles appear to need some clarification.'
  },
  {
    'Name': 'Bias Cleanup',
    'Page': 'Category:Bias',
    'Description': 'These articles appear to need bias cleaned out of them.'
  },
  {
    'Name': 'Stubs',
    'Page': 'Category:Stubs',
    'Description': 'These articles appear to be a bit short or lacking of information.',
  },
  {
    'Name': 'Candidates for deletion',
    'Page': 'Category:Candidates_for_deletion',
    'Description': 'Someone thinks these articles should be deleted. Maybe you can fix their errors and remove the tag.',
    'Override': true
  },
];
AffectsSidebar = false;
importScriptPage('MediaWiki:AddInsights.js', 'dev');