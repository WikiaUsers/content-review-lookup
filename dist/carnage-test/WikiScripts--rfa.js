// Request Form
function RequestForm(config){
    this.id = config.id;
    this.target = this.selector = '#'.concat(this.id);
    this.title = 'Request For Adminship';
    this.voteable = config.voteable || false;
    this.create();
}
 
RequestForm.prototype.submit = function(event){
    var position = $('#rfa-position').val(),
        description = $('#rfa-description').val(),
        d = new Date(),
        date = [d.getMonth() + 1, d.getDate(), d.getFullYear()].map(function(_d){
            _d = Number(_d);
            if (!isNaN(_d) && _d < 10){
                _d = '0'.concat(_d);
            }
            return String(_d);
        }),
        time = [d.getHours(), d.getMinutes(), d.getSeconds()].map(function(t){
            t = Number(t);
            if (!isNaN(t) && t < 10){
                t = '0'.concat(t);
            }
            return String(t);
        }),
        template = 
            '<div class="RFABox rfa-user-box" data-user="' + wgPageName + '" data-date="' + date.join('-') + '" data-time="' + time.join('') + '">',
        mwAPI = new mw.Api();
    localStorage.setItem('datetime', JSON.stringify(time));
    var _12htime = localStorage.getItem('datetime');
    _12htime = JSON.parse(_12htime);
    _12htime[0] = _12htime[0].replace(/([0-9]{1,})/, function(match, hour){
        hour = Number(hour);
        localStorage.setItem('24h', hour);
        if (!isNaN(hour)){
            hour = hour % 12;
            hour = hour ? hour : 12;
        }
        hour = String(hour);
        return hour;
    });
    _12htime[3] = Number(localStorage.getItem('24h')) >= 12 ? 'PM' : 'AM';  
    template = template.concat('{{RFAInfo|');
    template = template.concat('username=' + wgUserName + '|');
    template = template.concat('timeapplied='.concat(date.join('/')) + ' '.concat(_12htime.slice(0, 3).join(':')) + ' ' + _12htime[3] + '|'); // Date required for voting
    template = template.concat('position=$position|');
    template = template.concat('description=$description|');
    template = template.concat('voteable=' + (this.voteable ? '1' : '0' ) + '}}');
    template = template.concat('</div>');
 
    template = template.replace('$position', position);
    template = template.replace('$description', description);
 
    if (position === '' || description === '') return;
    mwAPI.post({
        action: 'edit',
        title: 'Project:Requests/'.concat([date.join('-'), time.join('')].join('/')),
        section: 'new',
        summary: 'Creating a new application. Username: ' + wgUserName + '. Time: ' + date.join('/') + ' ' + time.join(':') + '.',
        text: template,
        token: mw.user.tokens.get('editToken')
    }).done(function(d){
        location.reload();
    });
};
 
RequestForm.prototype.create = function(){
    importArticle({ type: 'style', article: 'MediaWiki:RFAForm.css' });
    var $rfa_form = $('<form class="RFAform rfa-form request-form WikiaForm" id="' + this.id + '" />'),
        $rfa_container = $('.rfa-form-container'),
        _this = this;
    $rfa_form.html(function(){
        var $html = [
            $('<h2 class="rfa-header">' + _this.title + '</h2>'),
            $('<section class="rfa-content" />').html(
                [$('<div class="rfa-section" data-name="Position" />')
                    .html([
                        $('<label class="rfa-label" for="rfa-position">Position:</label>'),
                        $('<input type="text" class="rfa-input" id="rfa-position" placeholder="What is your position?" />')
                    ]),
                $('<div class="rfa-section" data-name="Description" />')
                    .html([
                        $('<label class="rfa-label" for="rfa-description">Description:</label>'),
                        $('<textarea class="rfa-textarea" id="rfa-description" placeholder="Describe your qualifications and why you want to apply to this position." />')
                    ])
                ]
            ),
            $('<footer class="rfa-footer" />').html(
                $('<a href="#" class="rfa-submit">Submit <i class="icon ion-chevron-right"></i></a>')
                .on('click', function(event){
                    event.preventDefault();
                    _this.submit(event);
                })
            )
        ];
 
        return $html;
    });
 
    $rfa_form.on('submit', function(event){
        event.preventDefault();
    });
 
    if (!$(this.selector).length) $rfa_container.replaceWith($rfa_form);
};