function ErrorHelper(aceEditor){
    this.editor = aceEditor;
}

ErrorHelper.prototype.noteError = function(event){
    if(event.data.error == undefined){
        /* Clear marked errors */
        this.editor.getSession().setAnnotations();
        return;
    }
    error = JSON.parse(event.data.error);
    var lineNum = this.getLineNumber(error.stack);
    this.editor.getSession().setAnnotations([{row: lineNum, text: error.message, type: "error"}]);
    
    this.editor.scrollToLine(lineNum);
}

ErrorHelper.prototype.getLineNumber = function(stackTrace){
    var regex = new RegExp(':(\\d+):')
    var finds = regex.exec(stackTrace);
    return finds.pop()-1;
}

ErrorHelper.prototype.parseChromeST = function(stackTrace){
    var regex = new RegExp(':(\\d+):')
    var finds = regex.exec(stackTrace);
    return finds.pop()-1;
}
