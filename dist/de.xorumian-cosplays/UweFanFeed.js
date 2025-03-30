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
                                        <a href="https://xorumian-cosplays.fandom.com/de/wiki/Kategorie:Darsteller" class="mcf-card-wiki-articles__item-link" data-tracking="more-wiki-0" title="Darsteller">
                                            <span class="mcf-card-wiki-articles__circle">1</span>
                                            <span class="mcf-card-wiki-articles__title">Darsteller</span>
                                        </a>
                                    </li>
                                    <li class="mcf-card-wiki-articles__item">
                                        <a href="https://xorumian-cosplays.fandom.com/de/wiki/Kategorie:Kollektionen" class="mcf-card-wiki-articles__item-link" data-tracking="more-wiki-1" title="Kollektionen">
                                            <span class="mcf-card-wiki-articles__circle">2</span>
                                            <span class="mcf-card-wiki-articles__title">Kollektionen</span>
                                        </a>
                                    </li>
                                    <li class="mcf-card-wiki-articles__item">
                                        <a href="https://xorumian-cosplays.fandom.com/de/wiki/Kategorie:Cosplays" class="mcf-card-wiki-articles__item-link" data-tracking="more-wiki-2" title="Cosplays">
                                            <span class="mcf-card-wiki-articles__circle">3</span>
                                            <span class="mcf-card-wiki-articles__title">Cosplays</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-cosplays.fandom.com/de/wiki/Zovin" class=" mcf-card mcf-card-article" data-tracking="footer-card-1-2,wiki-article,footer" data-li-type="wiki" data-item-id="509_84" title="Zovin">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-cosplays/images/0/0b/Zovin.png/revision/latest?cb=20250324224515&path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Zovin</span>
                                        <span class="mcf-card-article__subtitle">Xorum Cosplay Wiki</span>
                                    </span>
                                </a>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-cosplays.fandom.com/de/wiki/Einari" class=" mcf-card mcf-card-article" data-tracking="footer-card-1-3,wiki-article,footer" data-li-type="wiki" data-item-id="2233_18186" title="Einari">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-cosplays/images/d/da/Einari.png/revision/latest?cb=20250324224642&path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Einari</span>
                                        <span class="mcf-card-article__subtitle">Xorum Cosplay Wiki</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="mcf-column">
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-cosplays.fandom.com/de/wiki/Luq" class=" mcf-card mcf-card-article" data-tracking="footer-card-2-1,wiki-article,footer" data-li-type="wiki" data-item-id="2575_81949" title="Luq">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-cosplays/images/5/5e/Luq.png/revision/latest?cb=20250324224447&path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Luq</span>
                                        <span class="mcf-card-article__subtitle">Xorum Cosplay Wiki</span>
                                    </span>
                                </a>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-cosplays.fandom.com/de/wiki/Qara" class=" mcf-card mcf-card-article" data-tracking="footer-card-2-2,wiki-article,footer" data-li-type="wiki" data-item-id="2575_457319" title="Qara">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-cosplays/images/0/04/Qara.png/revision/latest?cb=20250324224625&path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Qara</span>
                                        <span class="mcf-card-article__subtitle">Xorum Cosplay Wiki</span>
                                    </span>
                                </a>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-cosplays.fandom.com/de/wiki/Atrae" class=" mcf-card mcf-card-article" data-tracking="footer-card-2-3,wiki-article,footer" data-li-type="wiki" data-item-id="2233_64786" title="Atrae">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-cosplays/images/1/11/Atrae.png/revision/latest?cb=20250324224658&path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Atrae</span>
                                        <span class="mcf-card-article__subtitle">Xorum Cosplay Wiki</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="mcf-column">
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-cosplays.fandom.com/de/wiki/Luna" class=" mcf-card mcf-card-article" data-tracking="footer-card-3-1,wiki-article,footer" data-li-type="wiki" data-item-id="2575_524345" title="Luna">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-cosplays/images/1/13/Luna.png/revision/latest?cb=20250324224530&path-prefix=de" loading="lazy" alt="">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Luna</span>
                                        <span class="mcf-card-article__subtitle">Xorum Cosplay Wiki</span>
                                	    </span>
                                    </a>
                                </div>
                                <div class="mcf-card-article__link">
                                    <a href="https://xorumian-cosplays.fandom.com/de/wiki/Rolfin" class=" mcf-card mcf-card-article" data-tracking="footer-card-3-2,wiki-article,footer" data-li-type="wiki" data-item-id="2233_5903" title="Rolfin">
                                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-cosplays/images/6/63/Rolfin.png/revision/latest?cb=20250324224610&path-prefix=de" loading="lazy" alt="">
                                        <span class="mcf-card-article__wrapper has-thumbnail">
                                            <span class="mcf-card-article__title">Rolfin</span>
                                            <span class="mcf-card-article__subtitle">Xorum Cosplay Wiki</span>
                                        </span>
                                    </a>
                                </div>
                                <div class="mcf-card-article__link">
                                    <a href="https://xorumian-cosplays.fandom.com/de/wiki/Troel" class=" mcf-card mcf-card-article" data-tracking="footer-card-3-3,wiki-article,footer" data-li-type="wiki" data-item-id="2233_922444" title="Troel">
                                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-cosplays/images/e/e6/Troel.png/revision/latest?cb=20250324224549&path-prefix=de" loading="lazy" alt="">
                                        <span class="mcf-card-article__wrapper has-thumbnail">
                                            <span class="mcf-card-article__title">Troel</span>
                                            <span class="mcf-card-article__subtitle">Xorum Cosplay Wiki</span>
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