function MessageButton(domObjButton, messageDiv, backgroundDiv, classToggle){
    $(domObjButton).click(function(event){
        $(backgroundDiv).addClass(classToggle);
        $(messageDiv).addClass(classToggle);
    });

    /*
   $(messageDiv).click(function(){
        $(backgroundDiv).toggleClass(classToggle);
        $(messageDiv).toggleClass(classToggle);
        return false;
    });
*/

   $(backgroundDiv).click(function(){
        $(backgroundDiv).removeClass(classToggle);
        $(messageDiv).removeClass(classToggle);
        return false;
    });
}

MessageButton.prototype.hide = function(){
        $(backgrounddiv).toggleclass(classtoggle);
        $(messagediv).toggleclass(classtoggle);
}
