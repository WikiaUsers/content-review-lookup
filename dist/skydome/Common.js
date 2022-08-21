/* Any JavaScript here will be loaded for all users on every page load. */

const checkIDLucy = document.querySelector('#LucyKuranSKYDOME');
const findContainer = document.querySelector('.headline');
const newGroupLucy = '<ul class="grouptags"><li><a href="/wiki/wiki/Special:ListUsers?group=bureaucrat" title="Bureaucrat, Admin">Wiki Goddess</a></li></ul>';
const hideGroups = document.querySelector('.grouptags');
const replaceGroups = function () {
	hideGroups.classList.add('hide');
    findContainer.insertAdjacentHTML('beforeend', newGroupLucy);
};

if (checkIDLucy) {
    replaceGroups();
}