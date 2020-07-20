function Questionnaire() {
    this.data = {};
}

Questionnaire.prototype.get = function(callback, id) {
    that = this;
    $.getJSON('/wiki/MediaWiki:Questionnaire.store.js?action=raw', function(res) {
        console.log(res);
        questionnaires = res.questionnaires
        if(typeof id != 'undefined') {
            //get by ID
            questionnaire = _.findWhere(questionnaires,{id: id});
            if(questionnaire) {
                console.log('found questionnaire');
                callback(questionnaire);
            }
            else {
                callback(false);
            }
        }
        else {
            //get all
            that.data = questionnaires;
            callback(questionnaires);
        }
    });
}

Questionnaire.prototype.addQuestionnaire = function(questionnaire) {
    this.data.questionnaires.push(questionnaire);
    $.post('/wiki/MediaWiki:Questionnaire.store.js?action=raw',this.data, function(res) {
        console.log('successfull');
    },'json');
}