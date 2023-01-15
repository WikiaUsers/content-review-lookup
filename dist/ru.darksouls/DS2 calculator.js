(function () {

var canvas = null;
var draw = null;
var hover = -1;
var host = 'https://i.imgur.com/'

// soul memory tiers
var tiers = [
  0, 10, 20, 30, 40,
  50, 70, 90, 110, 130,
  150, 180, 210, 240, 270,
  300, 350, 400, 450,
  500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
  1500, 1750, 2000, 2250, 2500, 2750,
  3000, 5000, 7000,
  9000, 12000,
  15000,
  20000,
  30000,
  45000,
  360000
];

// multiplayer items
var items = [
  {'image':'1kjTaEs','label':'Белый мелок','down':3,'up':1,
  'desc':'Вас в виде фантома могут призвать в иной мир, чтобы в течение некоторого времени помогали хозяину этого мира. За успешную помощь вы получите Знак Верности или Медаль Света.'},
  {'image':'1kjTaEs','label':'Белый мелок','down':6,'up':4,'ner':true,
  'desc':'Особое кольцо, на которое можно нанести имя бога. Так будет проще соединиться с мирами игроков, выбравших того же бога.'},
  {'image':'iT5s4we','label':'Маленький белый мелок','down':4,'up':2,
  'desc':'Вас в виде фантома могут призвать в иной мир, чтобы в течение некоторого времени помогали хозяину этого мира. За успешную помощь вы будете вознаграждены.'},
  {'image':'iT5s4we','label':'Маленький белый мелок','down':7,'up':5,'ner':true,
  'desc':'Особое кольцо, на которое можно нанести имя бога. Так будет проще соединиться с мирами игроков, выбравших того же бога.'},
  {'image':'3L1Z32C','label':'Красный мелок','down':5,'up':2,
  'desc':'Перенеситесь в иной мир в виде темного фантома и победите призвавшего вас, и вы получите знак злобы.'},
  {'image':'2LM70sx','label':'Глаз Дракона','down':5,'up':5,
  'desc':'Отправьтесь в мир, где находится чешуя дракона, чтобы забрать чешую у хозяина этого мира.'},
  {'image':'TazeXyE','label':'Треснувшее красное око','down':0,'up':4,
  'desc':'Позволяет вторгнуться в иной мир. Победите хозяина мира, в который вы перенеслись, и вы получите знак злобы.'},
  {'image':'fKyjiZ2','label':'Треснувшее синее око','down':3,'up':3,
  'desc':'Переносит вас в мир виновного. Этот предмет могут использовать только Синие Стражи. Накажите виновного, чтобы укрепить связь со своим орденом.'},
  {'image':'okMYkRw','label':'Эмблема крысы','down':3,'up':1,
  'desc':'Вступите в этот орден и наденьте это кольцо, и тогда вы сможете заманивать в свой мир тех, кто проникает на территорию короля крыс.'},
  {'image':'miq8nEU','label':'Перстень звонаря','down':1,'up':3,
  'desc':'Вступите в этот орден и наденьте это кольцо, и тогда вас смогут сразу призвать в мир игрока, вторгшегося во владения звонарей.'},
  {'image':'8yd9kPJ','label':'Перстень Стража','down':5,'up':4,
  'desc':'Присоединитесь к этому ковенанту и наденьте кольцо, чтобы вас автоматически призывали в миры апостолов Лазурного пути, если туда вторглись духи Тьмы.'}
];

// load Именное Кольцо image
var ner = new Image();
ner.onload = typing;
ner.src = host + 'CHKPdU0.png';

$(document).ready(function ()
{
  canvas = $('#chart')[0];
  draw = canvas.getContext('2d');
  
  // register events
  $('#my-sm').keyup(typing);
  $('#chart').mousemove(mouse);
  
  // load images
  for (var i = 0; i < items.length; i++)
  {
    items[i].data = new Image();
    items[i].data.onload = typing;
    items[i].data.src = host + items[i].image + '.png';
  }
  
  // initial render
  render();
});

function render()
{
  // clear
  canvas.height = canvas.height;
  
  // read data
  var tier = getTier();
  var down = 0, up = 0;
  if (hover != -1)
  {
    down = items[hover].down;
    up = items[hover].up;
  }
  
  // static text
  draw.font = 'bold 14px sans-serif';
  draw.fillStyle = '#dd4300';
  draw.textAlign = 'right';
  draw.textBaseline = 'bottom';
  draw.fillText("Память душ", 90, 340);
  draw.fillStyle = '#0b0';
  draw.fillText("Диапазон", 90, 420);
  draw.fillText("доступных", 90, 440);
  draw.fillText("игроков", 90, 460);
  
  // range boxes
  for (var i = 0; i < items.length; i++)
  {
    var x = 246.5 + 40 * i, top, bottom;
    draw.beginPath();
    if (i == hover)
      draw.rect(100.5, top = 341.5 - items[i].down * 40, x + 30 - 100.5, bottom = 60 + (items[i].down + items[i].up) * 40);
    else
      draw.rect(x, top = 351.5 - items[i].down * 40, 30, bottom = 40 + (items[i].down + items[i].up) * 40);
    bottom += top;
    
    if (i == hover || hover == -1)
    {
      draw.strokeStyle = 'rgba(0, 204, 0, 1.0)';
      draw.fillStyle = 'rgba(0, 204, 0, 0.2)';
    }
    else
    {
      draw.strokeStyle = 'rgba(0, 204, 0, 0.25)';
      draw.fillStyle = 'rgba(0, 204, 0, 0.05)';
    }
    draw.stroke();
    draw.fill();
    
    draw.beginPath();
    draw.moveTo(x + 14.5, 50 + 600 * (i % 2));
    draw.lineTo(x + 14.5, (i % 2 == 0) ? top : bottom)
    draw.lineWidth = 2;
    draw.stroke();
    draw.lineWidth = 1;
  }
  
  // images
  for (var i = 0; i < items.length; i++)
  {
    var x = 230 + 80 * (i / 2), y = 600 * (i % 2);
    
    // glow
    if (i == hover)
    {
      // gradient
      var grad = draw.createRadialGradient(x + 32, y + 48, 0, x + 32, y + 48, 48);
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)');
      grad.addColorStop(0.91, 'rgba(255, 255, 255, 0.0)');
      
      // draw
      draw.beginPath();
      draw.arc(x + 32, y + 48, 48, 0, Math.PI * 2);
      draw.fillStyle = grad;
      draw.fill();
    }
    
    // sprites
    draw.drawImage(items[i].data, x, y);
    if (items[i].ner != undefined)
      draw.drawImage(ner, x + 32, y + 48, 32, 47.5);
  }
  
  // tier box
  if (tier != -1)
  {
    var x = 100.5, y = 341.5;
    draw.beginPath();
    draw.moveTo(x, y);
    draw.lineTo(x + 85, y);
    draw.lineTo(x + 90, y + 10);
    draw.lineTo(x + 585, y + 10);
    draw.lineTo(x + 585, y + 50);
    draw.lineTo(x + 90, y + 50);
    draw.lineTo(x + 85, y + 60);
    draw.lineTo(x, y + 60);
    draw.lineTo(x - 5, y + 55);
    draw.lineTo(x - 95, y + 55);
    draw.lineTo(x - 95, y + 5);
    draw.lineTo(x - 5, y + 5);
    draw.lineTo(x, y);
    draw.strokeStyle = '#dd4300';
    draw.stroke();
    draw.fillStyle = 'rgba(221, 67, 0, 0.2)';
    draw.fill();
  }
  
  // tiers
  draw.font = '15px sans-serif';
  draw.fillStyle = draw.strokeStyle = '#fff';
  if (tier == -1 && hover != -1) draw.fillStyle = draw.strokeStyle = '#060'; // [special casing intensifies]
  for (var i = 0; i < tiers.length; i++)
  {
    var y = 359.5 - tier * 40 + i * 40;
    
    // souls
    if (i >= tier - down && i < tier) draw.fillStyle = draw.strokeStyle = '#060';
    if (i == tier && tier != -1) draw.fillStyle = draw.strokeStyle = '#888';
    draw.textAlign = 'right';
    draw.fillText(format(tiers[i]), 185, y)
    
    draw.beginPath();
    draw.moveTo(190, y - 8);
    draw.lineTo(Math.abs(i - tier) <= 6 ? 685 : 220, y - 8); // extend in middle
    draw.stroke();
    
    // tier
    if (i == tier + 1) draw.fillStyle = draw.strokeStyle = '#060';
    if (i == tier + up + 1) draw.fillStyle = draw.strokeStyle = '#fff';
    draw.font = 'bold 15px sans-serif';
    draw.textAlign = 'left';
    draw.fillText(i + 1, 195, y + 20)
    draw.font = '15px sans-serif';
  }
  
  // hardcoded 999,999,999
  var y = 359.5 - tier * 40 + i * 40;
  if (tier - down == i) draw.fillStyle = draw.strokeStyle = '#060';
  draw.textAlign = 'right';
  draw.fillText('999,999,999', 185, y)
  
  draw.beginPath();
  draw.moveTo(190, y - 8);
  draw.lineTo(Math.abs(i - tier) <= 6 ? 685 : 220, y - 8);
  draw.stroke();
  
  // text
  $('#p1').text(hover != -1 ? items[hover].label : 'Предмет не выбран');
  $('#p3').text(hover != -1 ? items[hover].desc : '');
  if (hover != -1 && items[hover].ner != undefined)
    $('#p2').show();
  else
    $('#p2').hide();
}

// --- utility

function format(thousands)
{
  if (thousands <= 0)
    return '0';
    
  var result = (thousands % 1000) + ',000';
  
  // millions?
  if (thousands >= 1000)
  {
    // pad
    if (result.length == 5)
      result = '00' + result;
    if (result.length == 6)
      result = '0' + result;
    
    result = Math.floor(thousands / 1000) + ',' + result;
  }
  
  return result;
}

function getTier()
{
  // read
  var text = $('#my-sm').val();
  text = text.replace(/[^\d]/g, ''); // ignore non-numeric characters
  if (text.length == 0) // Number("") == 0, wat?
    return -1;
  
  // convert
  var n = Number(text);
  if (/*Number.*/isNaN(n)) // invalid
    return -1;
  if (n < 0) // clamp to 0
    n = 0;
  if (n > 999999999) // clamp to 999,999,999
    n = 999999999;
  
  // look up tier
  var i = tiers.length;
  while (n < tiers[i-1] * 1000 && i > 0)
    i--;
  return i - 1; // zero-indexed
}

// --- event handlers

function typing(event)
{
  // maximum boilerplate
  render();
}

function mouse(e)
{
  var pos = getCursorPosition(e);
  
  // find overlapping image
  var found = -1;
  for (var i = 0; i < items.length; i++)
  {
    var x = 230 + 80 * (i / 2), y = 600 * (i % 2);
    if (pos.x > x && pos.x < x + 64 && pos.y > y && pos.y < y + 96)
    {
      found = i;
      break;
    }
  }
  
  // trigger redraw when necessary
  if (hover != found)
  {
    hover = found;
    render();
  }
}

// transform mouse event coordinates into local canvas coordinates
function getCursorPosition(e) {
  return {x: e.offsetX - 0.5, y: e.offsetY - 0.5};
}

})();