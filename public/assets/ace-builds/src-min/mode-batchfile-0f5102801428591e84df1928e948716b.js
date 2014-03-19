define("ace/mode/batchfile",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/batchfile_highlight_rules","ace/mode/folding/cstyle"],function(e,t){var o=e("../lib/oop"),i=e("./text").Mode,r=(e("../tokenizer").Tokenizer,e("./batchfile_highlight_rules").BatchFileHighlightRules),n=e("./folding/cstyle").FoldMode,a=function(){this.HighlightRules=r,this.foldingRules=new n};o.inherits(a,i),function(){this.lineCommentStart="::",this.blockComment="",this.$id="ace/mode/batchfile"}.call(a.prototype),t.Mode=a}),define("ace/mode/batchfile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var o=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,r=function(){this.$rules={start:[{token:"keyword.command.dosbatch",regex:"\\b(?:append|assoc|at|attrib|break|cacls|cd|chcp|chdir|chkdsk|chkntfs|cls|cmd|color|comp|compact|convert|copy|date|del|dir|diskcomp|diskcopy|doskey|echo|endlocal|erase|fc|find|findstr|format|ftype|graftabl|help|keyb|label|md|mkdir|mode|more|move|path|pause|popd|print|prompt|pushd|rd|recover|ren|rename|replace|restore|rmdir|set|setlocal|shift|sort|start|subst|time|title|tree|type|ver|verify|vol|xcopy)\\b",caseInsensitive:!0},{token:"keyword.control.statement.dosbatch",regex:"\\b(?:goto|call|exit)\\b",caseInsensitive:!0},{token:"keyword.control.conditional.if.dosbatch",regex:"\\bif\\s+not\\s+(?:exist|defined|errorlevel|cmdextversion)\\b",caseInsensitive:!0},{token:"keyword.control.conditional.dosbatch",regex:"\\b(?:if|else)\\b",caseInsensitive:!0},{token:"keyword.control.repeat.dosbatch",regex:"\\bfor\\b",caseInsensitive:!0},{token:"keyword.operator.dosbatch",regex:"\\b(?:EQU|NEQ|LSS|LEQ|GTR|GEQ)\\b"},{token:["doc.comment","comment"],regex:"(?:^|\\b)(rem)($|\\s.*$)",caseInsensitive:!0},{token:"comment.line.colons.dosbatch",regex:"::.*$"},{include:"variable"},{token:"punctuation.definition.string.begin.shell",regex:'"',push:[{token:"punctuation.definition.string.end.shell",regex:'"',next:"pop"},{include:"variable"},{defaultToken:"string.quoted.double.dosbatch"}]},{token:"keyword.operator.pipe.dosbatch",regex:"[|]"},{token:"keyword.operator.redirect.shell",regex:"&>|\\d*>&\\d*|\\d*(?:>>|>|<)|\\d*<&|\\d*<>"}],variable:[{token:"constant.numeric",regex:"%%\\w+|%[*\\d]|%\\w+%"},{token:"constant.numeric",regex:"%~\\d+"},{token:["markup.list","constant.other","markup.list"],regex:"(%)(\\w+)(%?)"}]},this.normalizeRules()};r.metaData={name:"Batch File",scopeName:"source.dosbatch",fileTypes:["bat"]},o.inherits(r,i),t.BatchFileHighlightRules=r}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){var o=e("../../lib/oop"),i=e("../../range").Range,r=e("./fold_mode").FoldMode,n=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};o.inherits(n,r),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,o,i){var r=e.getLine(o),n=r.match(this.foldingStartMarker);if(n){var a=n.index;if(n[1])return this.openingBracketBlock(e,n[1],o,a);var l=e.getCommentFoldRange(o,a+n[0].length,1);return l&&!l.isMultiLine()&&(i?l=this.getSectionRange(e,o):"all"!=t&&(l=null)),l}if("markbegin"!==t){var n=r.match(this.foldingStopMarker);if(n){var a=n.index+n[0].length;return n[1]?this.closingBracketBlock(e,n[1],o,a):e.getCommentFoldRange(o,a,-1)}}},this.getSectionRange=function(e,t){var o=e.getLine(t),r=o.search(/\S/),n=t,a=o.length;t+=1;for(var l=t,s=e.getLength();++t<s;){o=e.getLine(t);var c=o.search(/\S/);if(-1!==c){if(r>c)break;var d=this.getFoldWidgetRange(e,"all",t);if(d){if(d.start.row<=n)break;if(d.isMultiLine())t=d.end.row;else if(r==c)break}l=t}}return new i(n,a,l,e.getLine(l).length)}}.call(n.prototype)});