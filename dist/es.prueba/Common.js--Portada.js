var fco = document.getElementById('WR-POfwr-vem-vid'),
    fco_vid = document.createElement('iframe');
fco.replaceChild(fco_vid, fco.children[0]);
fco_vid.contentWindow.location.replace('https://www.youtube.com/embed/jkU9U5BKlg4?hl=es&fs=0&rel=0');

/* Slider en subsección «Anteriores» (entradas destacadas) */
/*
$('.WR-PRent-ant').each(function() {
 var fls = this.getElementsByClassName('WR-PRent-ant-flc');
 var slider = this.getElementsByTagName('ul')[0].getElementsByTagName('li')[0];
 var mgs = 0;
 fls[0].addEventListener('click', function() {
  if (mgs != 0) {
   mgs += 35;
   slider.style.marginLeft = mgs + '%';
   if (mgs == 0) {
    this.classList.add('WR-PRent-ant-flc-dhb');
   };
   fls[1].classList.remove('WR-PRent-ant-flc-dhb');
  };
 });
 fls[1].addEventListener('click', function() {
  if (mgs != -105) {
   mgs -= 35;
   slider.style.marginLeft = mgs + '%';
   if (mgs == -105) {
    this.classList.add('WR-PRent-ant-flc-dhb');
   };
   fls[0].classList.remove('WR-PRent-ant-flc-dhb');
  }
 });
});
*/

/* Wiki Radios Informa */
/*var wri_twi = document.getElementById('WR-PRwri').children[1];
wri_twi.textContent = '';
wri_twi.className = 'twitter-timeline loading';
wri_twi.setAttribute('data-widget-id', '552660695029137408');

! function(d, s, id) {
 var js, fjs = d.getElementsByTagName(s)[0],
  p = /^http:/.test(d.location) ? 'http' : 'https';
 if (!d.getElementById(id)) {
  js = d.createElement(s);
  js.id = id;
  js.src = p + "://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 }
}(document, "script", "twitter-wjs");
*/