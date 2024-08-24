function getRecentChanges() {
    return new Promise(function(resolve,reject) {
         $.getJSON('/api.php?' + $.param({
            action: 'query',
            list: 'recentchanges',
            rcprop: ['title','ids','sizes','flags','user','timestamp'].join('|'),
            rclimit: 5,
            format: 'json'
        }),function(data) {
            resolve(data.query.recentchanges);
        });
    });
}

function displayRecentChanges(changes) {
    tmpl = template();
    Mustache.parse(tmpl);
    $('.rail-module.activity-module .activity-items').html(Mustache.render(tmpl,{changes: changes}));
    $('time.timeago').timeago();
}

function template() {
    return '<ul class="activity-items"> \
        {{#changes}} \
            <li class="activity-item"> \
                <div class="page-title"><a class="page-title-link" href="/wiki/{{title}}">{{title}}</a></div> \
                <div class="edit-info"> \
                    <a class="edit-info-user" href="/wiki/User:{{user}}">{{user}}</a>&nbsp;&middot;&nbsp; \
                    <a href="/wiki/{{title}}?oldid={{old_revid}}" class="edit-info-time" style="color:rgba(58, 58, 58, 0.75);"> \
                        <time class="timeago" datetime ="{{timestamp}}" style="vertical-align:top;">{{timestamp}}</time> \
                    </a> \
                </div> \
            </li> \
        {{/changes}} \
    </ul>';
}

getRecentChanges().then(function(changes) { displayRecentChanges(changes); });