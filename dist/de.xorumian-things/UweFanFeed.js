document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    const container = document.querySelector(".resizable-container");

    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div id="mixed-content-footer" class="mixed-content-footer">
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
                                        <a href="https://xorumian-things.fandom.com/de/wiki/Kategorie:Hauptcharaktere" class="mcf-card-wiki-articles__item-link" title="Hauptcharaktere">
                                            <span class="mcf-card-wiki-articles__circle">1</span>
                                            <span class="mcf-card-wiki-articles__title">Hauptcharaktere</span>
                                        </a>
                                    </li>
                                    <li class="mcf-card-wiki-articles__item">
                                        <a href="https://xorumian-things.fandom.com/de/wiki/Kategorie:Nebencharaktere" class="mcf-card-wiki-articles__item-link" title="Nebencharaktere">
                                            <span class="mcf-card-wiki-articles__circle">2</span>
                                            <span class="mcf-card-wiki-articles__title">Nebencharaktere</span>
                                        </a>
                                    </li>
                                    <li class="mcf-card-wiki-articles__item">
                                        <a href="https://xorumian-things.fandom.com/de/wiki/Kategorie:Hintergrundcharaktere" class="mcf-card-wiki-articles__item-link" title="Hintergrundcharaktere">
                                            <span class="mcf-card-wiki-articles__circle">3</span>
                                            <span class="mcf-card-wiki-articles__title">Hintergrundcharaktere</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Zovin" class=" mcf-card mcf-card-article" title="Zovin">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/0/0b/Zovin.png/revision/latest/scale-to-width-down/800?path-prefix=de">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Zovin</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                    </span>
                                </a>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Heinrych" class=" mcf-card mcf-card-article" title="Heinrych">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/2/22/Heinrych.png/revision/latest/scale-to-width-down/800?path-prefix=de">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Heinrych</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="mcf-column">
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Luq" class=" mcf-card mcf-card-article" title="Luq">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/5/5e/Luq.png/revision/latest/scale-to-width-down/800?path-prefix=de">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Luq</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                    </span>
                                </a>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Qara" class=" mcf-card mcf-card-article" title="Qara">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/0/04/Qara.png/revision/latest/scale-to-width-down/800?path-prefix=de">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Qara</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                    </span>
                                </a>
                            </div>
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Atrae" class=" mcf-card mcf-card-article" title="Atrae">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/1/11/Atrae.png/revision/latest/scale-to-width-down/800?path-prefix=de">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Atrae</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="mcf-column">
                            <div class="mcf-card-article__link">
                                <a href="https://xorumian-things.fandom.com/de/wiki/Luna" class=" mcf-card mcf-card-article" title="Luna">
                                    <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/1/13/Luna.png/revision/latest/scale-to-width-down/800?path-prefix=de">
                                    <span class="mcf-card-article__wrapper has-thumbnail">
                                        <span class="mcf-card-article__title">Luna</span>
                                        <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                	    </span>
                                    </a>
                                </div>
                                <div class="mcf-card-article__link">
                                    <a href="https://xorumian-things.fandom.com/de/wiki/Rolfin" class=" mcf-card mcf-card-article" title="Rolfin">
                                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/6/63/Rolfin.png/revision/latest/scale-to-width-down/800?path-prefix=de">
                                        <span class="mcf-card-article__wrapper has-thumbnail">
                                            <span class="mcf-card-article__title">Rolfin</span>
                                            <span class="mcf-card-article__subtitle">Xorum Wiki</span>
                                        </span>
                                    </a>
                                </div>
                                <div class="mcf-card-article__link">
                                    <a href="https://xorumian-things.fandom.com/de/wiki/Gorior" class=" mcf-card mcf-card-article" title="Gorior">
                                        <img class="mcf-card-article__thumbnail" src="https://static.wikia.nocookie.net/xorumian-things/images/b/b5/Gorior.png/revision/latest/scale-to-width-down/800?path-prefix=de">
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
        </div>
    `;

    container.appendChild(newDiv);
  }, 1000);
});