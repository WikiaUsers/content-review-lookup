/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */

var tabsStory = document.querySelectorAll('.story-tab');
var contentsStory = document.querySelectorAll('.story-content');

tabsStory.forEach(function(tabStory) {
  tabStory.addEventListener('click', function() {
    tabsStory.forEach(function(tStory) {
      tStory.classList.remove('active-test');
    });
    contentsStory.forEach(function(contentStory) {
      contentStory.classList.remove('visible-test');
    });

    tabStory.classList.add('active-test');
    
    var indexStory = Array.from(tabsStory).indexOf(tabStory);
    contentsStory[indexStory].classList.add('visible-test');
  });
});

var toggle1 = document.querySelector('#toggle1');
var content1 = document.querySelector('#content1');
var content1a = document.querySelector('#content1a');
var content1b = document.querySelector('#content1b');
var content1c = document.querySelector('#content1c');

toggle1.addEventListener('click', function() {
  toggle1.classList.toggle('active');
  content1.classList.toggle('visible');
  content1a.classList.toggle('visible');
  content1b.classList.toggle('visible');
  content1c.classList.toggle('visible');
});

var toggle2 = document.querySelector('#toggle2');
var content2 = document.querySelector('#content2');

toggle2.addEventListener('click', function() {
  toggle2.classList.toggle('active');
  content2.classList.toggle('visible');
});