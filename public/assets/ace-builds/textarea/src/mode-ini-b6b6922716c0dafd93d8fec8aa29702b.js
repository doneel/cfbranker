__ace_shadowed__.define("ace/mode/ini",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/ini_highlight_rules","ace/mode/folding/ini"],function(e,i){var n=e("../lib/oop"),t=e("./text").Mode,o=(e("../tokenizer").Tokenizer,e("./ini_highlight_rules").IniHighlightRules),a=e("./folding/ini").FoldMode,r=function(){this.HighlightRules=o,this.foldingRules=new a};n.inherits(r,t),function(){this.lineCommentStart=";",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/ini"}.call(r.prototype),i.Mode=r}),__ace_shadowed__.define("ace/mode/ini_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,i){var n=e("../lib/oop"),t=e("./text_highlight_rules").TextHighlightRules,o="\\\\(?:[\\\\0abtrn;#=:]|x[a-fA-F\\d]{4})",a=function(){this.$rules={start:[{token:"punctuation.definition.comment.ini",regex:"#.*",push_:[{token:"comment.line.number-sign.ini",regex:"$|^",next:"pop"},{defaultToken:"comment.line.number-sign.ini"}]},{token:"punctuation.definition.comment.ini",regex:";.*",push_:[{token:"comment.line.semicolon.ini",regex:"$|^",next:"pop"},{defaultToken:"comment.line.semicolon.ini"}]},{token:["keyword.other.definition.ini","text","punctuation.separator.key-value.ini"],regex:"\\b([a-zA-Z0-9_.-]+)\\b(\\s*)(=)"},{token:["punctuation.definition.entity.ini","constant.section.group-title.ini","punctuation.definition.entity.ini"],regex:"^(\\[)(.*?)(\\])"},{token:"punctuation.definition.string.begin.ini",regex:"'",push:[{token:"punctuation.definition.string.end.ini",regex:"'",next:"pop"},{token:"constant.language.escape",regex:o},{defaultToken:"string.quoted.single.ini"}]},{token:"punctuation.definition.string.begin.ini",regex:'"',push:[{token:"constant.language.escape",regex:o},{token:"punctuation.definition.string.end.ini",regex:'"',next:"pop"},{defaultToken:"string.quoted.double.ini"}]}]},this.normalizeRules()};a.metaData={fileTypes:["ini","conf"],keyEquivalent:"^~I",name:"Ini",scopeName:"source.ini"},n.inherits(a,t),i.IniHighlightRules=a}),__ace_shadowed__.define("ace/mode/folding/ini",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,i){var n=e("../../lib/oop"),t=e("../../range").Range,o=e("./fold_mode").FoldMode,a=i.FoldMode=function(){};n.inherits(a,o),function(){this.foldingStartMarker=/^\s*\[([^\])]*)]\s*(?:$|[;#])/,this.getFoldWidgetRange=function(e,i,n){var o=this.foldingStartMarker,a=e.getLine(n),r=a.match(o);if(r){for(var l=r[1]+".",g=a.length,d=e.getLength(),u=n,s=n;++n<d;)if(a=e.getLine(n),!/^\s*$/.test(a)){if(r=a.match(o),r&&0!==r[1].lastIndexOf(l,0))break;s=n}if(s>u){var c=e.getLine(s).length;return new t(u,g,s,c)}}}}.call(a.prototype)});