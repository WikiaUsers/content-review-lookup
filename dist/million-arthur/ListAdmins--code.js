#admin-list ul {
    list-style: none; 
    margin: 0;
    padding: 0;
}
#admin-list ul li {
    display: inline;
}
#admin-list ul li:after {
    content: ",";
}
#admin-list ul li:last-child:after {
    content: "";
}