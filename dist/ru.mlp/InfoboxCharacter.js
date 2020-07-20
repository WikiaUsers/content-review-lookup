(function() {
    /*метки*/
    function CutieMark(elem) { //конструктор
        this.cutieMark = elem;
    }
    CutieMark.prototype.hide = function() { //сокрытие
        this.cutieMark.style.display = 'none';
    };
    CutieMark.prototype.show = function() { //отображение
        this.cutieMark.style.display = 'inline-block';
    };
    /*группа меток*/
    function CutieGroup(infobox) {
        //определениеи меток
        var cutieMarksEl = infobox.getElementsByClassName('ib1_cm');
        this.cutieMarks = [];
        for (var i = 0; i < cutieMarksEl.length; i++) {
            this.cutieMarks[i] = new CutieMark(cutieMarksEl[i]);
        }
        //определение кнопок
        var buttonsEl = infobox.getElementsByClassName('ib1_cmButton');
        if (buttonsEl.length > 0) {
            this.nextButton = buttonsEl[1];
            this.nextButton.addEventListener("click", this.next.bind(this));
            this.prevButton = buttonsEl[0];
            this.prevButton.addEventListener("click", this.prev.bind(this));
        }
        this.MAX_MARK = this.cutieMarks.length - 1;
        this.curentMark = 0;
    }
    CutieGroup.prototype.next = function() {
        this.cutieMarks[this.curentMark].hide();
        if (this.curentMark < this.MAX_MARK) {
            this.curentMark++;
        } else {
            this.curentMark = 0;
        }
        this.cutieMarks[this.curentMark].show();
    };
    CutieGroup.prototype.prev = function() {
        this.cutieMarks[this.curentMark].hide();
        if (this.curentMark !== 0) {
            this.curentMark--;
        } else {
            this.curentMark = this.MAX_MARK;
        }
        this.cutieMarks[this.curentMark].show();
    };
    /*инфобокс*/
    function Infobox(elem) { //конструктор
        this.infobox = elem;
        this.name = this.infobox.dataset.name;
        this.bgColor = this.infobox.dataset.bgcolor;
        this.fontColor = this.infobox.dataset.fontcolor;
        this.cm = new CutieGroup(this.infobox);
    }
    Infobox.prototype.hide = function() { //сокрытие
        this.infobox.style.display = 'none';
    };
    Infobox.prototype.show = function() { //отображение
        this.infobox.style.display = 'block';
    };
    /*Блок инфобоксов*/
    function InfoboxBlock(elem) {//конструктор
        this.infoboxBlock = elem;
        //определение инфобоксов
        this.infoboxes = [];
        var infoboxesEl = this.infoboxBlock.getElementsByClassName('ib1_infoboxCharacter');
        for (var i = 0; infoboxesEl[i]; i++) {
            this.infoboxes[i] = new Infobox(infoboxesEl[i]);
        }
        //определение параметров слайдера
        this.IB_NUM = this.infoboxes.length - 1;
        this.activeInfobox = 0;
        this.nextInfobox = 1;
        this.prevInfobox = this.IB_NUM;
        //определение управляющих кнопок
        var controlButtonsEl = this.infoboxBlock.getElementsByClassName('ib1_cb_block');
        this.nextButton, this.prevButton, this.switchButton;
        if (this.IB_NUM > 1) {
            this.prevButton = controlButtonsEl[0].firstChild;
            this.prevButton.addEventListener("click", this.prev.bind(this));
            this.nextButton = controlButtonsEl[0].lastChild;
            this.nextButton.addEventListener("click", this.next.bind(this));
        } else if (this.IB_NUM > 0) {
            this.switchButton = controlButtonsEl[0].firstChild;
            this.switchButton.addEventListener("click", this.ibSwitch.bind(this));
        }
    }
    InfoboxBlock.prototype.next = function() { //вперёд
            this.infoboxes[this.activeInfobox].hide();
            this.infoboxes[this.nextInfobox].show();
            this.prevInfobox = this.activeInfobox;
            this.activeInfobox = this.nextInfobox;
            if (this.nextInfobox == this.IB_NUM) {
                this.nextInfobox = 0;
            } else {
                this.nextInfobox++;
            }
            this.updateButton(this.nextButton, this.nextInfobox);
            this.updateButton(this.prevButton, this.prevInfobox);
        };
        InfoboxBlock.prototype.prev = function() { //назад
            this.infoboxes[this.activeInfobox].hide();
            this.infoboxes[this.prevInfobox].show();
            this.nextInfobox = this.activeInfobox;
            this.activeInfobox = this.prevInfobox;
            if (this.prevInfobox == 0) {
                this.prevInfobox = this.IB_NUM;
            } else {
                this.prevInfobox--;
            }
            this.updateButton(this.nextButton, this.nextInfobox);
            this.updateButton(this.prevButton, this.prevInfobox);
        };
        InfoboxBlock.prototype.ibSwitch = function() { //вариант для 2-х иб
            this.infoboxes[this.activeInfobox].hide();
            this.updateButton(this.switchButton, this.activeInfobox);
            this.activeInfobox = Math.abs(this.activeInfobox - 1);
            this.infoboxes[this.activeInfobox].show();
        };
        InfoboxBlock.prototype.updateButton = function(elem, number) { //обновление кнопок
            elem.innerHTML = this.infoboxes[number].name;
            elem.style.backgroundColor = this.infoboxes[number].bgColor;
            elem.style.color = this.infoboxes[number].fontColor;
        };
    /*Страница*/
    // определение блоков инфобоксов
    var ibBlocks = [];
    var ibBlocksEl = document.getElementsByClassName('ib1_ibBlock');
    for (var i = 0; ibBlocksEl[i]; i++) {
        ibBlocks[i] = new InfoboxBlock(ibBlocksEl[i]);
    }
})();