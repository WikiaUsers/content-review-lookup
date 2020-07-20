/* Any JavaScript here will be loaded for all users on every page load. */


function toggleMySpoiler () {
  if (this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display != '') {
    this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display = '';
    this.innerHTML = 'hide';
  } else {
    this.parentNode.parentNode.getElementsByTagName('div')[1].getElementsByTagName('div')[0].style.display = 'none';
    this.innerHTML = 'show';
  }
}