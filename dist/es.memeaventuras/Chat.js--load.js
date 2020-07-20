// Emblemas

/* Remover estrella de Moderador */

.User.chat-mod .username:after {
    background-image:none;
}



/* Moderadores del Chat */

.User.chat-mod[data-user="FlowerShy"] .username:after,
.User.chat-mod[data-user="Ken Min Nyan"] .username:after {
    content: url("https://images.wikia.nocookie.net/fakemon/es/images/thumb/9/92/Pokerface.png/422px-Pokerface.png") !important;
}

/* Administradores */

.User.chat-mod[data-user="Chuck Crepy Norris"] .username:after,
.User.chat-mod[data-user="Mr.alexpenidacrepy"] .username:after {
    content: url("https://images.wikia.nocookie.net/__cb20110123105416/fakemon-creators/es/images/thumb/7/73/Trollface.png/50px-Trollface.png") !important;
}