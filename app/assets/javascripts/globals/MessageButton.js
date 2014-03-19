function MessageButton(domObjButton, messageDiv, backgroundDiv, classToggle){

    var keyHandler = function(event){
        $(backgroundDiv).click();
    };

    $(domObjButton).click(function(event){
        $(backgroundDiv).addClass(classToggle);
        $(messageDiv).addClass(classToggle);
        $(window).on('keydown', keyHandler);
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
        $(window).off('keydown', keyHandler);
        return false;
    });
}

MessageButton.prototype.hide = function(){
        $(backgrounddiv).toggleclass(classtoggle);
        $(messagediv).toggleclass(classtoggle);
};
