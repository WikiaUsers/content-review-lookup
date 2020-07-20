(function() {
    window.statWheelStrings = window.statWheelStrings || {
        'damage-tooltip': 'Obrażenia',
        'toughness-tooltip': 'Wytrzymałość',
        'control-tooltip': 'Kontrola tłumu',
        'mobility-tooltip': 'Mobilność',
        'utility-tooltip': 'Użyteczność',
        'center-tooltip': 'Uwaga: klasyfikacja bohaterów w kliencie jest w skali 1-3, przy czym bohaterowie bez umiejętności w danej dziedzinie są traktowani na równi z bohaterami z minimum.\nTutaj stosujemy skalę 0-3, gdzie 0 oznacza BRAK umiejętności w danej dziedzinie i może być traktowane jako 1 w oficjalnej charakterystyce.',
        'small-tooltip': 'Obrażenia: %damage% / 3\nWytrzymałość: %toughness% / 3\nKontrola tłumu: %control% / 3\nMobilność: %mobility% / 3\nUżyteczność: %utility% / 3\n',
    }
    function addSVGTitle(elem, text) {
        var title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        title.textContent = text;
        $(elem).append(title);
    }
    function createStatWheel(values) {
        var svg = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.772535 59.1636" class="stat-wheel-svg"><circle cx="30.886295" cy="32.257652" r="23.812559" fill="#020a15" class="stat-wheel-background"/><g class="stat-wheel-section stat-wheel-damage"><path fill="#fff" fill-opacity="0" d="M27.688902 27.406997a5.820833 5.820833 0 0 1 6.39233.003l12.40561-17.07486L33.374462.808432c-1.48369-1.077833-3.49262-1.077916-4.9764-.000208l-13.11312 9.526843z" class="stat-wheel-hover"/><g class="stat-wheel-bars" style="fill:#00202d"><path d="M30.885316 22.742002c-1.7509-.000688-3.501667.48051-5.045687 1.44384l1.87275 2.57762c1.96417-1.13245 4.38338-1.131683 6.3469.0021l1.8712-2.575554c-1.54332-.96461-3.29427-1.44729-5.04517-1.44797z" class="stat-wheel-bar"/><path d="M30.8848 16.928404c-2.95056-.0014-5.901773.846566-8.469768 2.54403l1.870687 2.575037c4.01802-2.59748 9.18497-2.60006 13.20539-.0062l1.860862-2.56056c-2.566413-1.699912-5.51662-2.55091-8.46718-2.5523z" class="stat-wheel-bar"/><path d="M30.88635 11.116872c-4.149605-.000356-8.29972 1.217195-11.888164 3.65249l1.86862 2.57142c6.0613-4.07 13.980905-4.073286 20.045805-.0088l1.86087-2.560568c-3.588-2.43587-7.73752-3.654208-11.88713-3.65456z" class="stat-wheel-bar"/></g><path fill="#fff" d="M28.981582 1.830358l-.47625.47625.83344.83344-.53579.53578.47626.47625.53578-.53578.10453.13069.56519-.45218-.19347-.15476.53578-.53578-.47625-.47625-.53578.53578zm3.81 0l-.83344.83344-.53578-.53578-.47625.47625.53578.53578-2.97656 2.38125v1.07156h1.07156l2.38125-2.97656.53578.53578.47625-.47625-.53578-.53578.83344-.83344zm-.85957 2.62229l-.7239.90494.98822 1.23527h1.07156v-1.07156l-1.33582-1.06865z" class="stat-wheel-icon"/></g><g class="stat-wheel-section stat-wheel-toughness"><path fill="#fff" fill-opacity="0" d="M34.511532 27.717797a5.820833 5.820833 0 0 1 1.97239 6.08042l20.0727 6.52202 5.00849-15.41453c.56659-1.74414-.0541-3.65477-1.5376-4.7329l-13.11274-9.52736z" class="stat-wheel-hover"/><g class="stat-wheel-bars" style="fill:#00202d"><path d="M37.00329 24.963572l-1.872755 2.57762c1.68398 1.51809 2.43091 3.819132 1.959572 6.036842l3.028238.98392c.88099-3.53173-.328136-7.256952-3.115055-9.598382z" class="stat-wheel-bar"/><path d="M40.427887 20.250165L38.5572 22.8252c3.71199 3.018712 5.311032 7.932215 4.086572 12.557375l3.01015.977718c1.647303-5.93222-.410026-12.274648-5.226035-16.110128z" class="stat-wheel-bar"/><path d="M43.84525 15.547093l-1.86862 2.571936c5.743848 4.50694 8.19479 12.03777 6.20324 19.06188l3.01015.97823c2.415792-8.33024-.49491-17.291498-7.34477-22.612058z" class="stat-wheel-bar"/></g><path fill="#fff" d="M55.518632 21.210057v1.78594c0 1.87101 2.04103 2.97656 2.04103 2.97656s2.04103-1.10555 2.04103-2.97656v-1.78594s-.93554.68032-1.36071.68032l-.68032-.68032-.68032.68032c-.42523 0-1.36071-.68032-1.36071-.68032z" class="stat-wheel-icon"/></g><g class="stat-wheel-section stat-wheel-control"><path fill="#fff" fill-opacity="0" d="M36.324262 34.302537a5.820833 5.820833 0 0 1-5.17333 3.75481v21.10569h16.2078c1.83386-.00011 3.45917-1.18086 4.02611-2.92489l5.009-15.41508z" class="stat-wheel-hover"/><g class="stat-wheel-bars" style="fill:#00202d"><path d="M36.683413 34.836872c-.923412 2.07068-2.880795 3.491932-5.135605 3.728972v3.183784c3.63111-.25349 6.80027-2.55425 8.16591-5.92832z" class="stat-wheel-bar"/><path d="M42.227776 36.638312c-1.72389 4.46314-5.902797 7.50224-10.679968 7.766968v3.165182c6.15092-.26648 11.547126-4.183227 13.706658-9.948747z" class="stat-wheel-bar"/><path d="M47.760256 38.436135c-2.51141 6.85544-8.916708 11.51349-16.212448 11.78998v3.16518c8.66905-.27663 16.29209-5.81405 19.23552-13.972792z" class="stat-wheel-bar"/></g><path fill="#fff" d="M47.268722 52.566027c-.86481.00067-1.71432.44428-2.17235 1.28468-.22485.41259-.3216.87946-.29725 1.33517.0406.7595.41791 1.48786 1.10127 1.88232.91791.52988 2.15241.23974 2.65986-.76891.41294-.82075.16755-1.91994-.66866-2.34904-.65079-.33394-1.51977-.10934-1.82904.63556-.1124.27072-.12169.57538-.0321.84957.0896.2742.29175.52373.58908.62835.19355.0681.40266.0587.5928-.0271s.36759-.2784.39677-.53764c.0444-.34773-.45754-.4098-.49179-.0608-.007.0645-.0325.0918-.10089.12266-.0684.0309-.17338.0347-.23892.0116-.14175-.0499-.23018-.15706-.27844-.30474-.0483-.14769-.0426-.33016.0177-.47533.18569-.44721.7414-.59002 1.15687-.37683.56595.29041.73878 1.06543.44857 1.64222-.36974.73492-1.29647.95286-1.98251.55683-.83761-.4835-1.08091-1.64848-.61306-2.50692.55443-1.01733 1.85494-1.30832 2.8094-.7245.7342.44908 1.16253 1.33232 1.11115 2.22159-.024.34875.47822.38053.49451.0313.0625-1.08174-.45128-2.14723-1.35547-2.70028-.40731-.24914-.86445-.37015-1.31743-.36974z" class="stat-wheel-icon"/></g><g class="stat-wheel-section stat-wheel-mobility"><path fill="#fff" fill-opacity="0" d="M30.621962 38.061337a5.820833 5.820833 0 0 1-5.16968-3.75982l-20.072706 6.52202 5.008485 15.41453c.5668 1.74407 2.19201 2.92496 4.02587 2.92522l16.20848.00031z" class="stat-wheel-hover"/><g class="stat-wheel-bars" style="fill:#00202d"><path d="M25.091355 34.836355l-3.02824.983403c1.36316 3.37506 4.530846 5.67837 8.161777 5.934522v-3.18637c-2.25468-.23834-4.211327-1.660345-5.133537-3.731555z" class="stat-wheel-bar"/><path d="M19.537688 36.64038l-3.010152.978234c2.154177 5.76753 7.546685 9.689476 13.697356 9.961666v-3.182752c-4.77741-.26034-8.959194-3.2956-10.687204-7.75715z" class="stat-wheel-bar"/><path d="M14.001592 38.439236l-3.010152.978236C13.933416 47.57674 21.555375 53.1157 30.224375 53.39388v-3.179135c-7.29598-.27004-13.705317-4.92229-16.222783-11.77551z" class="stat-wheel-bar"/></g><path fill="#fff" d="M12.020094 52.565987v.52915h1.76895c.12378-.22809.23639-.43601.28708-.52915zm2.63786 0s-1.30092 2.38819-1.41409 2.63471c-.1172.065-.21304.16042-.27952.27893l-.35508.63311 1.07143.60102.14988-.26719c.0741.0755.14877.17291.22196.26824.009.0115.019.0213.0301.0298.0266.0404.0508.0759.0703.0991.14556.17285.6143.48485.81623.48485h1.81336v-.50264c0-.40027-.32552-.72562-.72574-.72562h-.11173c-.33869 0-.8276-.14525-.6811-.5052l1.14722-2.04541zm-2.63786 1.05828v.52915h1.19758c.0928-.17294.18414-.34312.28462-.52915zm0 1.05828v.52926h.5088c.079-.13392.18877-.24461.31056-.34056.0285-.0571.059-.1172.0961-.1887z" class="stat-wheel-icon"/></g><g class="stat-wheel-section stat-wheel-utility"><path fill="#fff" fill-opacity="0" d="M25.285012 33.799667a5.820833 5.820833 0 0 1 1.97829-6.07851L14.85769 10.646297l-13.112382 9.5267c-1.483565 1.07801-2.104438 2.98858-1.53799 4.73277l5.008395 15.41528z" class="stat-wheel-hover"/><g class="stat-wheel-bars" style="fill:#00202d"><path d="M24.771994 24.96719c-2.78863 2.3394-4.000173 6.063427-3.121773 9.595797l3.03031-.984436c-.47006-2.21798.27781-4.51817 1.96267-6.03529z" class="stat-wheel-bar"/><path d="M21.350497 20.257916c-4.819562 3.83101-6.882814 10.171728-5.241023 16.105477l3.026688-.983402c-1.228706-4.62404.365477-9.53887 4.074687-12.56099z" class="stat-wheel-bar"/><path d="M17.929 15.54916c-6.850807 5.31934-9.763206 14.279836-7.348905 22.610506l3.02359-.98237c-1.99776-7.02234.445805-14.55556 6.185668-19.06757z" class="stat-wheel-bar"/></g><path fill="#fff" d="M2.512197 21.209537c0 1.78594 1.36071 2.72148 1.36071 2.72148v1.36071c-.25513 0-.68044.3401-.68044.3401v.34021h2.04115v-.34021s-.42529-.3401-.68044-.3401v-1.36071s1.36071-.93554 1.36071-2.72148z" class="stat-wheel-icon" stroke="#000" stroke-opacity=".501961" stroke-width=".79375"/></g><g class="stat-wheel-section stat-wheel-center"><path fill="#fff" fill-opacity="0" d="M36.177962 32.257647a5.291666 5.291667 0 0 1-5.29167 5.29167 5.291666 5.291667 0 0 1-5.29166-5.29167 5.291666 5.291667 0 0 1 5.29166-5.29166 5.291666 5.291667 0 0 1 5.29167 5.29166z" class="stat-wheel-hover"/><path fill="#00202d" d="M34.590594 32.25765a3.7043 3.7043 0 0 1-3.7043 3.7043 3.7043 3.7043 0 0 1-3.704298-3.7043 3.7043 3.7043 0 0 1 3.704298-3.704297 3.7043 3.7043 0 0 1 3.7043 3.704298z" class="stat-wheel-middle"/></g></svg>');
        
        ['damage', 'toughness', 'control', 'mobility', 'utility'].forEach(function(x, i){
            var section = svg.find('.stat-wheel-' + x);
            
            var bars = section.find('.stat-wheel-bar'),
                val = Math.max(0, Math.min(3, values[i]));
            
            for(var j=0; j<val; j++) {
                $(bars[j]).attr('class', 'stat-wheel-bar stat-wheel-bar-lit');
            }
            
            addSVGTitle(section, window.statWheelStrings[x + '-tooltip']);
        });
        addSVGTitle(svg.find('.stat-wheel-center'), window.statWheelStrings['center-tooltip']);
        
        return svg;
    }
    function createStatWheelSmall(values) {
        var svg = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.924999 34.925079" class="stat-wheel-svg"><circle cx="17.4625" cy="17.4625" r="17.4625" fill="#020a15" class="stat-wheel-background" /><path fill="#00202d" d="M17.462298 14.816743a2.645837 2.645837 0 0 0-2.645833 2.645834 2.645837 2.645837 0 0 0 2.645833 2.645833 2.645837 2.645837 0 0 0 2.645834-2.645833 2.645837 2.645837 0 0 0-2.645834-2.645834z" class="stat-wheel-middle" /><g class="stat-wheel-section stat-wheel-damage"><path fill="#fff" fill-opacity="0" d="M17.46271 17.462553l10.2642-14.12746a17.4625 17.4625 0 0 0-20.52233.0084z" class="stat-wheel-hover" /><g class="stat-wheel-bars" style="fill:#00202d"><path d="M17.714478 10.329162a7.143753 7.143753 0 0 0-3.892785.996838l1.877922 2.58434a3.968753 3.968753 0 0 1 3.527433-.002065l1.87999-2.58744a7.143753 7.143753 0 0 0-3.39256-.99167z" class="stat-wheel-bar" /><path d="M17.1233 5.83383a11.64167 11.64167 0 0 0-5.956742 1.83658l1.871203 2.577103a8.46667 8.46667 0 0 1 8.84959 0l1.863455-2.565218A11.64167 11.64167 0 0 0 17.1233 5.83383z" class="stat-wheel-bar" /><path d="M17.245774 1.34263a16.139586 16.139586 0 0 0-8.7204 2.693893l1.87017 2.574003a12.964585 12.964585 0 0 1 14.138673-.006718l1.86035-2.560568a16.139586 16.139586 0 0 0-9.148793-2.70061z" class="stat-wheel-bar" /></g></g><g class="stat-wheel-section stat-wheel-toughness"><path fill="#fff" fill-opacity="0" d="M17.462512 17.462715l16.607825 5.39621a17.4625 17.4625 0 0 0-6.349773-19.515287z" class="stat-wheel-hover" /><g class="stat-wheel-bars" style="fill:#00202d"><path d="M22.173638 12.10373l-1.877404 2.58434a3.968753 3.968753 0 0 1 1.091407 3.354317l3.041676.988568a7.143752 7.143752 0 0 0-2.255677-6.927224z" class="stat-wheel-bar" /><path d="M24.82929 8.448656l-1.87172 2.57607a8.46667 8.46667 0 0 1 2.7342 8.416543l3.01532.979782a11.64167 11.64167 0 0 0-3.8778-11.972397z" class="stat-wheel-bar" /><path d="M27.469957 4.814253l-1.87069 2.574003a12.964585 12.964585 0 0 1 4.375444 13.444658l3.010157.977717a16.139585 16.139585 0 0 0-5.51491-16.996376z" class="stat-wheel-bar" /></g></g><g class="stat-wheel-section stat-wheel-control"><path fill="#fff" fill-opacity="0" d="M17.462298 17.462577v17.4625A17.4625 17.4625 0 0 0 34.06025 22.85553z" class="stat-wheel-hover" /><g class="stat-wheel-bars" style="fill:#00202d"><path d="M20.976812 19.30019a3.968753 3.968753 0 0 1-2.853056 2.07481v3.198254a7.143752 7.143752 0 0 0 5.891113-4.286044z" class="stat-wheel-bar" /><path d="M25.28301 20.69907a8.46667 8.46667 0 0 1-7.159254 5.201234v3.170867a11.64167 11.64167 0 0 0 10.18801-7.387662z" class="stat-wheel-bar" /><path d="M29.558202 22.088134a12.964585 12.964585 0 0 1-11.434446 8.315772v3.165182a16.139585 16.139585 0 0 0 14.460618-10.49755z" class="stat-wheel-bar" /></g></g><g class="stat-wheel-section stat-wheel-mobility"><path fill="#fff" fill-opacity="0" d="M17.462363 17.46233L.85454 22.85854a17.4625 17.4625 0 0 0 16.60787 12.055897z" class="stat-wheel-hover" /><g class="stat-wheel-bars" style="fill:#00202d"><path d="M13.945716 19.30019l-3.041675.98857a7.143752 7.143752 0 0 0 5.8968 4.278292v-3.19412a3.968753 3.968753 0 0 1-2.855123-2.072742z" class="stat-wheel-bar" /><path d="M9.642103 20.69907l-3.015837.979788a11.64167 11.64167 0 0 0 10.174574 7.406264v-3.184818a8.46667 8.46667 0 0 1-7.158737-5.201233z" class="stat-wheel-bar" /><path d="M5.358643 22.09072l-3.010152.977716a16.139585 16.139585 0 0 0 14.45235 10.50892v-3.181718a12.964585 12.964585 0 0 1-11.442196-8.30492z" class="stat-wheel-bar" /></g></g><g class="stat-wheel-section stat-wheel-utility"><path fill="#fff" fill-opacity="0" d="M17.462617 17.462318l-10.2642-14.12746A17.4625 17.4625 0 0 0 .864693 22.85536z" class="stat-wheel-hover" /><g class="stat-wheel-bars" style="fill:#00202d"><path d="M12.747857 12.098563a7.143753 7.143753 0 0 0-2.246892 6.930326l3.038058-.987538a3.968753 3.968753 0 0 1 1.088823-3.35535z" class="stat-wheel-bar" /><path d="M10.10409 8.45951a11.64167 11.64167 0 0 0-3.90002 11.96516l3.029272-.98392a8.46667 8.46667 0 0 1 2.734717-8.416023z" class="stat-wheel-bar" /><path d="M7.460324 4.820454A16.139586 16.139586 0 0 0 1.93198 21.813216l3.02617-.983403A12.964585 12.964585 0 0 1 9.320677 7.381538z" class="stat-wheel-bar" /></g></g></svg>');
        
        var text = window.statWheelStrings['small-tooltip'];
        
        ['damage', 'toughness', 'control', 'mobility', 'utility'].forEach(function(x, i){
            var section = svg.find('.stat-wheel-' + x);
            
            var bars = section.find('.stat-wheel-bar'),
                val = Math.max(0, Math.min(3, values[i]));
            
            for(var j=0; j<val; j++) {
                $(bars[j]).attr('class', 'stat-wheel-bar stat-wheel-bar-lit');
            }
            if(text) {
                text = text.replace('%' + x + '%', val);
            }
        });
        addSVGTitle(svg.find('> g'), text);
        
        return svg;
    }
    window.createStatWheel = createStatWheel;
    window.createStatWheelSmall = createStatWheelSmall;
    
    function handler(func) {
        return function() {
            var $this = $(this);
            if($this.attr('data-values') == '') return;
            var values = $this.data('values').split(';').map(function(x) { return parseInt(x); });
			$this.attr('data-values', null).empty().append(func(values));
        }
    }
    function init(elem) {
        elem.find('.stat-wheel[data-values]').each(handler(createStatWheel));
        elem.find('.stat-wheel-small[data-values]').each(handler(createStatWheelSmall));
    }
    $(function() {
        init($('#mw-content-text'));
        mw.hook('wikipage.content').add(function(elem) {
            init($(elem));
        });
    });
})();