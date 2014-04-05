function ErrorHelper(aceEditor){
    this.editor = aceEditor;
}

ErrorHelper.prototype.findSyntaxError = function(code){
    var err = new Error();
    var lineNum = code.split('\n').length;
    var subCode = code;
    while(err != null && subCode.indexOf('\n') > -1){
        var passed = true;
        try{
            eval(subCode);
        } catch (error){
            passed = false;
        }
        if(passed){
            return lineNum;
        }

        subCode = subCode.substring(0, subCode.lastIndexOf('\n'));
        subCode = this.closeBrackets(subCode);
        lineNum--;
    }
    return lineNum + 1;
}
/** Function count the occurrences of substring in a string;
 * @param {String} string   Required. The string;
 * @param {String} subString    Required. The string to search for;
 * @param {Boolean} allowOverlapping    Optional. Default: false;
 */
ErrorHelper.prototype.occurrences = function(string, subString, allowOverlapping){

    string+=""; subString+="";
    if(subString.length<=0) return string.length+1;

    var n=0, pos=0;
    var step=(allowOverlapping)?(1):(subString.length);

    while(true){
        pos=string.indexOf(subString,pos);
        if(pos>=0){ n++; pos+=step; } else break;
    }
    return(n);
}


ErrorHelper.prototype.closeBrackets = function(code){
    var symbols = {'(':')', '[':']', '{':'}'};
    var context = this;

    var removeMatching = function(){
        Object.getOwnPropertyNames(symbols).forEach(function(key){
            if(context.occurrences(code, key, false) == context.occurrences(code, symbols[key], false)){
            //    console.log(key, context.occurrences(code, key, false));
             //   console.log(symbols[key], context.occurrences(code, symbols[key], false));
                delete symbols[key];
            }
        });
    }

    var findLast = function(){
        var result = null;
        var resultIndex = code.length;

        Object.getOwnPropertyNames(symbols).forEach(function(key){
            var myIndex = code.lastIndexOf(key);
            if(myIndex < resultIndex){
                result = key;
                resultIndex = myIndex;
            }
        });
        return result;
    }
    
    removeMatching();
    while(Object.keys(symbols).length > 0){
        code += symbols[findLast()]; 
        removeMatching();
    }
    return code;
}

ErrorHelper.prototype.noteError = function(event){
    if(event.data.error == undefined){
        /* Clear marked errors */
        this.editor.getSession().clearAnnotations();
        return;
    }
    var error = event.data.error;
    var lineNum = -1;

    if(error.type == "SyntaxError"){
       lineNum = (this.findSyntaxError(error.code));
    } else{
       lineNum = this.getLineNumber(error.stack) - 1;
    }

    this.editor.getSession().setAnnotations([{row: lineNum, text: error.message, type: "error"}]);
    
    this.editor.scrollToLine(lineNum);
}

ErrorHelper.prototype.getLineNumber = function(stackTrace){

    var regex = new RegExp(':(\\d+)(?::|$)')
    var finds = regex.exec(stackTrace[0]);
    return finds.pop();
}

ErrorHelper.prototype.parseChromeST = function(stackTrace){
    var regex = new RegExp(':(\\d+):')
    var finds = regex.exec(stackTrace);
    return finds.pop()-1;
}
