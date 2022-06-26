/* Any JavaScript here will be loaded for all users on every page load. */
// set dev:LockOldComments.js limit to 1 month
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;

/* ContentBox template */
.content-box {
    color: white; /* TEMPORARY */
    border: 5px solid #303030;
    border-radius: 5px;
    margin-bottom: 15px;
}

.content-box-header {
    background-color: #092f71;
    text-align: center;
    font-size: 22px;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
}

.content-box-content {
    background-color: #3d3d3d;
    padding: 10px;
}

.content-box > div:nth-child(n+3) {
    border-top: 5px solid #303030;
}

.content-box > div:nth-child(n+3) {
    border-top: 5px solid #303030;
}