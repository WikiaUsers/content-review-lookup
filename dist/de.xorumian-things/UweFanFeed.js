document.addEventListener("DOMContentLoaded", function() {
    var container = document.querySelector(".resizable-container");

    var newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div id="mixed-content-footer" class="mcf-en" data-number-of-wiki-articles="8" data-number-of-ns-articles="0">
            <div class="mcf-wrapper">
                <div class="mcf-content" style="display: block;">
                    <h2 class="mcf-header">Fan Feed</h2>
                    <div class="mcf-mosaic">
                        <div class="mcf-column">
                            <div class="mcf-card mcf-card-wiki-articles">
                                <header class="mcf-card-wiki-articles__header">
                                    <span class="mcf-card-wiki-articles__header-text">More Xorum Wiki</span>
                                </header>
                                <ul class="mcf-card-wiki-articles__list">
                                    <li class="mcf-card-wiki-articles__item">
                                        <a href="https://xorumian-things.fandom.com/de/wiki/Kategorie:Hauptcharaktere" class="mcf-card-wiki-articles__item-link" data-tracking="more-wiki-0" title="Hauptcharaktere">
                                            <span class="mcf-card-wiki-articles__circle">1</span>
                                            <span class="mcf-card-wiki-articles__title">Hauptcharaktere</span>
                                        </a>
                                    </li>
                                    <li class="mcf-card-wiki-articles__item">
                                        <a href="https://xorumian-things.fandom.com/de/wiki/Kategorie:Nebencharaktere" class="mcf-card-wiki-articles__item-link" data-tracking="more-wiki-1" title="Nebencharaktere">
                                            <span class="mcf-card-wiki-articles__circle">2</span>
                                            <span class="mcf-card-wiki-articles__title">Nebencharaktere</span>
                                        </a>
                                    </li>
                                    <li class="mcf-card-wiki-articles__item">
                                        <a href="https://xorumian-things.fandom.com/de/wiki/Kategorie:Hintergrundcharaktere" class="mcf-card-wiki-articles__item-link" data-tracking="more-wiki-2" title="Hintergrundcharaktere">
                                            <span class="mcf-card-wiki-articles__circle">3</span>
                                            <span class="mcf-card-wiki-articles__title">Hintergrundcharaktere</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Zovin" class=" mcf-card mcf-card-article" data-tracking="footer-card-1-2,wiki-article,footer" data-li-type="wiki" data-item-id="509_84" title="Zovin">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/0/0b/Zovin.png/revision/latest?cb=20240714130000&amp;path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Zovin</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                    </span>
                                </a>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Heinrych" class=" mcf-card mcf-card-article" data-tracking="footer-card-1-3,wiki-article,footer" data-li-type="wiki" data-item-id="2233_18186" title="Heinrych">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/2/22/Heinrych.png/revision/latest?cb=20241007193623&amp;path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Heinrych</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="mcf-column">
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Luq" class=" mcf-card mcf-card-article" data-tracking="footer-card-2-1,wiki-article,footer" data-li-type="wiki" data-item-id="2575_81949" title="Luq">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/3/38/Itslgd.png/revision/latest/scale-to-width-down/1000?cb=20241207175816&amp;path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Luq</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                    </span>
                                </a>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Faydror" class=" mcf-card mcf-card-article" data-tracking="footer-card-2-2,wiki-article,footer" data-li-type="wiki" data-item-id="2575_457319" title="Faydror">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/b/b5/FaydrorHelmet.png/revision/latest/scale-to-width-down/1000?cb=20241103170521&amp;path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Faydror</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                    </span>
                                </a>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Atrae" class=" mcf-card mcf-card-article" data-tracking="footer-card-2-3,wiki-article,footer" data-li-type="wiki" data-item-id="2233_64786" title="Atrae">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/1/11/Atrae.png/revision/latest/scale-to-width-down/1000?cb=20241207204943&amp;path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Atrae</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="mcf-column">
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Luna" class=" mcf-card mcf-card-article" data-tracking="footer-card-3-1,wiki-article,footer" data-li-type="wiki" data-item-id="2575_524345" title="Luna">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/1/13/Luna.png/revision/latest/scale-to-width-down/1000?cb=20241208195552&amp;path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Luna</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                	    </span>
                                    </a>
                                </div>
                                <div class="mcf-card-article__link">
                                    <a href="https://xorumian-things.fandom.com/de/wiki/Rolfin" class=" mcf-card mcf-card-article" data-tracking="footer-card-3-2,wiki-article,footer" data-li-type="wiki" data-item-id="2233_5903" title="Rolfin">
                                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/6/63/Rolfin.png/revision/latest?cb=20241215162139&amp;path-prefix=de" loading="lazy" alt="">
                                        <span class="mcf-card-article__wrapper has-thumbnail">
                                            <span class="mcf-card-article__title">Rolfin</span>
                                            <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                        </span>
                                    </a>
                                </div>
                                <div class="mcf-card-article__link">
                                    <a href="https://xorumian-things.fandom.com/de/wiki/Gorior" class=" mcf-card mcf-card-article" data-tracking="footer-card-3-3,wiki-article,footer" data-li-type="wiki" data-item-id="2233_922444" title="Gorior">
                                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/b/b5/Gorior.png/revision/latest/scale-to-width-down/1000?cb=20241103184643&amp;path-prefix=de" loading="lazy" alt="">
                                        <span class="mcf-card-article__wrapper has-thumbnail">
                                            <span class="mcf-card-article__title">Gorior</span>
                                            <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    container.appendChild(newDiv);
});