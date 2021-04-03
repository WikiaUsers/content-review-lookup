document.querySelectorAll('#template_item_list_nav .nav ul')
  .forEach(e => e.addEventListener('click', _ => itemnav_change(e.dataset.id)))


function itemnav_change(n) {
  let panels = document.querySelectorAll('#template_item_list_nav .content > div')
  let nav_buttons = document.querySelectorAll('#template_item_list_nav .nav ul')
  panels.forEach(p => p.classList.remove('active'))
  nav_buttons.forEach(p => p.classList.remove('active'))
  panels[n - 1].classList.add('active')
  nav_buttons[n - 1].classList.add('active')
}