function getNamespaceId(name) {
    return (!name) ? wgNamespaceNumber : wgNamespaceIds[name.toLowerCase().replace(' ','_')];
}

function getNamespace() {
    return _.invert(wgNamespaceIds)[wgNamespaceNumber];
}

function getNamespaces(callback) {
    $.get('http://de.harry-grangers-test.wikia.com/api.php?action=query&meta=siteinfo&siprop=namespaces%7Cnamespacealiases&format=json').done(callback);
}

function getNamespaceName(id) {
    var id = id || wgNamespaceNumber;
    getNamespaces(function(data) {
        console.log(data.query.namespaces[id]['*']);
    });
}

function getNamespaceNameOrigin(identifier) {
    id = (typeof identifier !== 'undefined' && _.isNumber(identifier)) ? identifier : null;
    namespace = (typeof identifier !== 'undefined' && _.isString(identifier)) ? identifier : null;
    console.log('identifier',id,namespace);
    getNamespaces(function(data) {
        if(id) {
            result = data.query.namespaces[id].canonical;
        }
        else if(namespace) {
            result = _.findWhere(data.query.namespaces, {"*": namespace}).canonical;
        }
        else {
            result = data.query.namespaces[wgNamespaceNumber].canonical;
        }
        console.log(result);
    });
}