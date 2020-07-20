/* Adds buttons for one-click deletions with delete summary included
 * See w:c:dev:FastDelete for info & attribution 
 */

importScriptPage('FastDelete/code.js', 'dev');
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'Vandalism',
  'label': 'V'};
fdButtons[fdButtons.length] = {
  'summary': 'Housekeeping',
  'label': 'H'};