function startEffects(el){

    // --- PRIME ---
    if(el.matches(".prime, .prime-bp") && !el.dataset.fxPrime){
        el.dataset.fxPrime = "1";
        el.setAttribute("data-text", el.textContent);
        el.style.setProperty("--swipe-speed", FX.prime.swipeSpeed+"ms");

        // shimmer swipe
        setInterval(()=> {
            el.classList.remove("is-swiping");
            void el.offsetWidth;
            el.classList.add("is-swiping");
        }, FX.prime.swipeSpeed + FX.prime.swipeGap);

        // stars
        setInterval(()=> spawnStar(el), FX.prime.starSpawn + Math.random()*300);
    }

    // --- CONTRABAND GLITCH ---
    if(el.matches(".contraband, .contraband-bp") && !el.dataset.fxContra){
        el.dataset.fxContra = "1";

        // glitch blocks
        setInterval(() => spawnGlitch(el), FX.contraband.rate[0] + Math.random()*(FX.contraband.rate[1]-FX.contraband.rate[0]));

        // jitter (frequent)
        setInterval(()=> jitterText(el), 80 + Math.random()*40);
    }
}