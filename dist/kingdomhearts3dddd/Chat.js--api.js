/**
 * This is an exclusive API
 * created specially for
 * this wiki. Please do not
 * copy it without an admin's
 * consent. Thank you!
 * - Ultimate Dark Carnage
 **/

// Setting up the API with the global object
// @object _Chat
// @keys 
window._Chat = window._Chat || {
    usersByCid: mainRoom.model.users._byCid,
    modules: {
        chatParty: {
            enabled: true
        },
        options: {
            enabled: true
        },
        emoticonPanel: {
            enabled: true
        }
    }
};