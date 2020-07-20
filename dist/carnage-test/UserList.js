require([
    "wikia.window",
    "mw",
    "jquery"
], function(wk, mw, $){
    Array.prototype.sort = (function(){
        var ctx = { x: 9 }, sortCtxTest, sortFn;
        
        [1,2,3].sort(function(a, b){
            sortCtxTest = this === ctx;
            return 0;
        }, ctx);
        
        console.log(sortCtxTest);
        
        if (!sortCtxTest){
            var origSort = Array.prototype.sort;
            sortFn = function sort(compareFn){
                var T, A, thisArg, ctx, noctx;
                
                if (arguments.length > 1) T = arguments[1];
                else T = this;
                
                if (typeof compareFn === "function"){
                    if (T !== this){
                        A = Array.from(arguments).slice(2);
                        noctx = false;
                        
                        if (typeof T === "boolean"){
                            if (T) ctx = window;
                            else noctx = true;
                        } else ctx = T;
                        
                        if (noctx) ctx = this;
                        
                        return origSort.call(this, function(a, b){
                            var c = [A];
                            Array.prototype.unshift.call(c, a, b);
                            return compareFn.apply(ctx, c);
                        });
                    } else return origSort.call(T, compareFn);
                } else if (typeof compareFn === "undefined"){
                    return origSort.call(this);
                } else {
                    throw new TypeError("The comparison function must be either a function or undefined.");
                }
            };
        } else sortFn = Array.prototype.sort;
        
        return sortFn;
    })();
    
    const CLASSNAMES = Object.freeze({
        // The primary wrapper
        MAIN: "UserList user-list",
        // Dropdown class names
        DROPDOWN: "UserListDropdown user-list__dropdown",
        DROPDOWN_CONTAINER: "UserListDropdownContainer user-list__dropdown-container",
        DROPDOWN_LABEL: "UserListDropdownLabel user-list__dropdown-label",
        DROPDOWN_CHEVRON: "UserListDropdownChevron user-list__dropdown-chevron",
        DROPDOWN_LIST: "UserListDropdownList user-list__dropdown-list",
        DROPDOWN_SORT: "user-list__dropdown-sort",
        DROPDOWN_FILTER: "user-list__dropdown-filter",
        // User list class names
        USERLIST: "UserListContainer user-list__container",
        USERLIST_ITEMS: "UserListItems user-list__items",
        USERLIST_ITEM: "UserListItem user-list__item",
        USERLIST_CHECK: "UserListCheck user-list__check",
        USERLIST_AVATAR_CONTAINER: "UserListAvatarContainer user-list__avatar-container",
        USERLIST_AVATAR: "UserListAvatar user-list__avatar",
        USERLIST_INFO: "UserListInfo user-list__info",
        USERLIST_NAME_CONTAINER: "UserListNameContainer user-list__name-container",
        USERLIST_NAME: "UserListName user-list__name",
        USERLIST_GROUP_CONTAINER: "UserListGroupContainer user-list__group-container",
        USERLIST_GROUP: "UserListGroup user-list__group"
    });
    
    const USERLIST_ITEM_ID = "user-list__item-$i";
    const USERGROUPS = Object.freeze([
        // Global user groups
        "staff", "helper", "wiki-manager", "vstf", "content-team-member",
        "global-discussions-moderator", "councilor", "voldev",
        // Local user groups
        "bureaucrat", "sysop", "discussions-moderator", "content-moderator",
        "chatmoderator", "threadmoderator", "rollback", "bot",
        // Common custom user groups
        "patroller", "codeeditor"
    ]);
    
    const CONSTANTS = Object.freeze([
        "_loaded", "_callbacks", "sortName", "filterName", "users", "cache"
    ]);
    
    function UserList(){
        if (!(this instanceof UserList)) return new UserList();
        
        this._loaded = false;
        this._callbacks = {};
        this.users = {};
        this.cache = [];
        this.cols = 2;
        this.categorized = false;
        
        return this;
    }
    
    UserList.prototype = {
        constructor: UserList,
        _sort: {
            groups: function(a, b){
                var ai = USERGROUPS.indexOf(a.group),
                    bi = USERGROUPS.indexOf(b.group);
                return ai - bi;
            },
            name: function(a, b){
                var aname = a.name, bname = b.name;
                return aname.localeCompare(bname);
            }
        },
        _filter: {
            groups: function(a, group){
                return this.inGroup(a, group) === true;
            },
            name: function(a, name){
                if (Array.isArray(name)){
                    return name.some(function(n){
                        return n !== a.name;
                    }, this);
                } else return a.name !== name;
            }
        },
        sortBy: function(name, a){
            var users = [], reverse = false, fn;
            
            if (arguments.length > 1) reverse = !!arguments[1];
            Array.prototype.push.apply(users, this.users);
            
            if (!(name in this._sort)) return false;
            
            fn = this._sort[name];
            
            users = users.sort(fn, this);
            
            if (reverse) users = users.reverse();
            
            this.generateList(users);
            
            return true;
        },
        filterBy: function(name, value){
            var users = [], u = [], exclude = false, fn;
            
            if (arguments.length > 1) exclude = !!arguments[1];
            Array.prototype.push.apply(users, this.users);
            
            if (!(name in this._sort)) return false;
            
            fn = this._filter[name];
            
            users = users.filter(function(user){
                return exclude ? !fn.call(user, value) : fn.call(user, value);
            }, this);
            
            this.generateList(users);
            
            return true;
        },
        set: function __set(){
            if (arguments.length === 0) return false;
            var k = arguments[0], o = arguments[1],
                prim = ["string", "boolean", "number"].indexOf(typeof o) > -1,
                p, v, isConst;
            
            if (!(typeof k === "string" || typeof k === "object")) return false;
            else if (typeof k === "object"){
                if (Array.isArray(k)){
                    return k.some(function(key){
                        return this.set(key, o);
                    }, this);
                } else {
                    return Object.entries(o).some(function(entry){
                        var key = entry[0], value = entry[1];
                        return this.set(key, value);
                    }, this);
                }
            } else {
                if (prim || typeof o === "object"){
                    p = o; isConst = CONSTANTS.indexOf(k) > -1;
                    if (isConst) return false;
                    
                    this[k] = p;
                } else if (typeof o === "function"){
                    p = o || function(){}; v = null;
                    isConst = CONSTANTS.indexOf(k) > -1;
                    
                    v = p.call(this, k);
                    if (v === undefined || v === null) v = p;
                    
                    this[k] = v;
                } else return false;
            }
            
            return true;
        },
        get: function __get(){
            var o;
            if (arguments.length === 0){
                o = Object.entries(this).reduce((function(obj, entry){
                    var key = entry[0], value = entry[1];
                    obj[key] = value;
                    return obj;
                }).bind(this), {});
                return o;
            }
            
            var k = arguments[0], v = null,
                prim = ["string", "number"].indexOf(typeof k) > -1;
            
            if (typeof k === "object"){
                if (!Array.isArray(k)) return v;
                o = {};
                k.forEach(function(n){ if (!(n in o)) o[n] = this[n]; }, this);
                return o;
            } else if (prim){
                return this[k];
            } else return v;
        },
        createUI: function(){
            // Main wrapper
            this.$main = $("<div>", { "class": CLASSNAMES.MAIN });
            // Sort dropdown
            this.$sorter = $("<nav>", { "class": [CLASSNAMES.DROPDOWN, CLASSNAMES.DROPDOWN_SORT].join(" ") });
            // Filter dropdown
            this.$filter = $("<nav>", { "class": [CLASSNAMES.DROPDOWN, CLASSNAMES.DROPDOWN_SORT].join(" ") });
            // User list
        },
        generateList: function(users){}
    };
});