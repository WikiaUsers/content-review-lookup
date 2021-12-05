/* Any JavaScript here will be loaded for all users on every page load. */

/* Slider quotes . */
if($('.hslider')[0]){
    var multiItemhslider = (function () {
      return function (selector, config) {
        var
          _mainElement = document.querySelector(selector), // основный элемент блока
          _hsliderWrapper = _mainElement.querySelector('.hslider__wrapper'), // обертка для .hslider-item
          _hsliderItems = _mainElement.querySelectorAll('.hslider__item'), // элементы (.hslider-item)
          _hsliderControls = _mainElement.querySelectorAll('.hslider__control'), // элементы управления
          _hsliderControlLeft = _mainElement.querySelector('.hslider__control_left'), // кнопка "LEFT"
          _hsliderControlRight = _mainElement.querySelector('.hslider__control_right'), // кнопка "RIGHT"
          _wrapperWidth = parseFloat(getComputedStyle(_hsliderWrapper).width), // ширина обёртки
          _itemWidth = parseFloat(getComputedStyle(_hsliderItems[0]).width), // ширина одного элемента    
          _positionLeftItem = 0, // позиция левого активного элемента
          _transform = 0, // значение транфсофрмации .hslider_wrapper
          _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
          _items = [], // массив элементов
          _interval = 0,
          _config = {
            isCycling: false, // автоматическая смена слайдов
            direction: 'right', // направление смены слайдов
            interval: 5000, // интервал между автоматической сменой слайдов
            pause: true // устанавливать ли паузу при поднесении курсора к слайдеру
          };

        for (var key in config) {
          if (key in _config) {
            _config[key] = config[key];
          }
        }

        // наполнение массива _items
        _hsliderItems.forEach(function (item, index) {
          _items.push({ item: item, position: index, transform: 0 });
        });

        var position = {
          getItemMin: function () {
            var indexItem = 0;
            _items.forEach(function (item, index) {
              if (item.position < _items[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getItemMax: function () {
            var indexItem = 0;
            _items.forEach(function (item, index) {
              if (item.position > _items[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getMin: function () {
            return _items[position.getItemMin()].position;
          },
          getMax: function () {
            return _items[position.getItemMax()].position;
          }
        }

        var _transformItem = function (direction) {
          var nextItem;
          if (direction === 'right') {
            _positionLeftItem++;
            if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
              nextItem = position.getItemMin();
              _items[nextItem].position = position.getMax() + 1;
              _items[nextItem].transform += _items.length * 100;
              _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
            }
            _transform -= _step;
          }
          if (direction === 'left') {
            _positionLeftItem--;
            if (_positionLeftItem < position.getMin()) {
              nextItem = position.getItemMax();
              _items[nextItem].position = position.getMin() - 1;
              _items[nextItem].transform -= _items.length * 100;
              _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
            }
            _transform += _step;
          }
          _hsliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        var _cycle = function (direction) {
          if (!_config.isCycling) {
            return;
          }
          _interval = setInterval(function () {
            _transformItem(direction);
          }, _config.interval);
        }

        // обработчик события click для кнопок "назад" и "вперед"
        var _controlClick = function (e) {
          var direction = this.classList.contains('hslider__control_right') ? 'right' : 'left';
          e.preventDefault();
          _transformItem(direction);
          clearInterval(_interval);
          _cycle(_config.direction);
        };

        var _setUpListeners = function () {
          // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
          _hsliderControls.forEach(function (item) {
            item.addEventListener('click', _controlClick);
          });
          if (_config.pause && _config.isCycling) {
            _mainElement.addEventListener('mouseenter', function () {
              clearInterval(_interval);
            });
            _mainElement.addEventListener('mouseleave', function () {
              clearInterval(_interval);
              _cycle(_config.direction);
            });
          }
        }

        // инициализация
        _setUpListeners();
        _cycle(_config.direction);

        return {
          right: function () { // метод right
            _transformItem('right');
          },
          left: function () { // метод left
            _transformItem('left');
          },
          stop: function () { // метод stop
            _config.isCycling = false;
            clearInterval(_interval);
          },
          cycle: function () { // метод cycle 
            _config.isCycling = true;
            clearInterval(_interval);
            _cycle();
          }
        }

      }
    }());

    var hslider = multiItemhslider('.hslider', {
      isCycling: true
    })
}

/* Soundtrack display */
$("#OSTDeadCellsTheme").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2167314356/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTPrisonersAwakening").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=3419867149/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTPromenadeOfTheCondemned").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=3934518812/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTTheMerchant").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=1243206155/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTPrisonsRooftop").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=201915925/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTBlackBridge").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=1331163242/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTTheVillage").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2319237993/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTToxicSewers").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2345238880/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTOssuary").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=1859239885/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTEliteFight").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=4005036310/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTTheOldSewers").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2551885165/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTTheCemetery").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2157133789/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTConjonctivius").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=3228594029/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTThePrisonsDepths").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2294027802/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTPrisonTheme").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=3303687694/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTTheCrypt").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=167259455/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTWeaponMerchant").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=271035203/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTFoodMerchant").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2154943795/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTTheTemple").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=669799087/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTClockTower").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2835038278/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTFormerlyKnowAsAssassin").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=3608794590/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTCollector").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=1200792195/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTTheCastle").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=844144758/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTHandOfTheKing").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=4188767486/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTCredits").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=4276171382/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTCavern").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=272210796/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTGuardiansHaven").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=152967111/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTAstrolab").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2657868154/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTObservatory").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=3227863443/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTTimeForYourMedicine").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2043857393/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTCorruptedPrison").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=1764337562/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTArboretum").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=609262421/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTSwamp").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2132768536/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTHeartOfTheSwamp").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=1632686436/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTDistillery").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=2405648616/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTFracturedShrines").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=1975075753/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTUndyingShores").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=1186186668/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTTheMausoleum").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=1561157763/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');
$("#OSTKeepOffTheFlowers").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1895766752/size=small/bgcol=333/linkcol=f7735c/track=4276759009/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-1">Dead Cells - Soundtrack Part 1 by Yoann Laulan</a></iframe>');

$("#OSTDeadCellsTheme8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=1313670213/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTPrisonersAwakening8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=3247308180/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTPromenade8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=431742092/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTTheMerchant8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=100141424/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTRamparts8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=2751272961/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTBlackBridge8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=667758877/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTStiltVillage8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=3189268371/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTToxicSewers8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=653457969/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTOssuary8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=2026827096/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTEliteFight8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=835948397/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTOldSewers8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=555600592/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTCemetery8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=1099543713/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTConjonctivius8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=444255521/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTPrisonsDepths8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=1008338796/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTUnusedPrisonTheme8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=293473070/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTSepulcher8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=3299937800/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTWeaponShop8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=2798849834/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTFoodShop8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=3353903357/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTSanctuary8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=2199205819/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTClockTower8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=104865752/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTTheTimeKeeper8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=3626950161/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTCollectorsTheme8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=3721201322/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTHighpeakCastle8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=1283152574/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTHandOfTheKing8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=290514593/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTCredits8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=2012350646/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTCavern8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=269981505/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTGuardiansHaven8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=1425814095/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTAstrolab8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=3021648347/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTObservatory8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=670670693/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTTimeForYourMedicine8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=692649502/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTCorruptedPrison8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=855191507/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTArboretum8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=4210961842/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTTheSwamps8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=2651616085/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTTheNest8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=2201999024/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTDistillery8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=893765461/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTNotPanMasterSlash").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=772132142/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTIAmNotTheMachine").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=2668114368/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTBadseeds8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=2929039876/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTFracturedShrines8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=3454841153/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTUndyingShores8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=831895668/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTMausoleum8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=1782288654/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');
$("#OSTKeepOffTheFlowers8bit").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2727466516/size=small/bgcol=333/linkcol=f7735c/track=1221252580/transparent=true/" seamless><a href="https://valmontderagondas.bandcamp.com/album/dead-cells-soundtrack-part-2-demake">Dead Cells - Soundtrack Part 2 (Demake) by Yoann Laulan</a></iframe>');

/* Hide spoiler replacement script */
$(function() {
	$.when( 
		$('.spoiler').each(function() {
			var position = $(this).css('position');
			if (!position || (position == 'static')) $(this).css({'position': 'relative'});
			$(this).append(
				$('<div>').append(
					$('<div>', {
						text: ' Spoiler alert!'
					}).prepend(
						$('<img>', {
							'src': 'https://static.wikia.nocookie.net/deadcells_gamepedia_en/images/c/c0/Exclamation.png/revision/latest/scale-to-width-down/15?cb=20210304214608'
						})
					).css({'color': '#d1394e', 'font-weight': 'bold', 'font-size': '20px'}),
					$('<a>', {
						'class': 'spoiler-text',
						href: 'javascript:void(0)',
						text: 'Tap to reveal'
					})
				).css({'position': 'absolute', 'inset': '0px', 'background-color': 'black', 'display': 'flex', 'justify-content': 'center', 'flex-flow': 'column wrap', 'align-items': 'center'})
			);
		})
	).done(function() {
       $('.spoiler-text').click(function() {
			$(this).parent().fadeOut("400", function() {
        		$(this).remove();
    		});
		});
	});
} );

/* Tooltips configuration */
window.tooltips_config = {
    offsetX: 7,
    offsetY: 7,
    noCSS: true,
}