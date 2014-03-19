define("ace/mode/c9search",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/c9search_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/c9search"],function(e,t){var n=e("../lib/oop"),r=e("./text").Mode,i=(e("../tokenizer").Tokenizer,e("./c9search_highlight_rules").C9SearchHighlightRules),o=e("./matching_brace_outdent").MatchingBraceOutdent,a=e("./folding/c9search").FoldMode,c=function(){this.HighlightRules=i,this.$outdent=new o,this.foldingRules=new a};n.inherits(c,r),function(){this.getNextLineIndent=function(e,t){var n=this.$getIndent(t);return n},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.$id="ace/mode/c9search"}.call(c.prototype),t.Mode=c}),define("ace/mode/c9search_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(e,t){function n(e,t){try{return new RegExp(e,t)}catch(n){}}var r=e("../lib/oop"),i=e("../lib/lang"),o=e("./text_highlight_rules").TextHighlightRules,a=function(){this.$rules={start:[{tokenNames:["c9searchresults.constant.numeric","c9searchresults.text","c9searchresults.text","c9searchresults.keyword"],regex:"(^\\s+[0-9]+)(:\\s)(.+)",onMatch:function(e,t,n){var r,i=this.splitRegex.exec(e),o=this.tokenNames,a=[{type:o[0],value:i[1]},{type:o[1],value:i[2]}],c=n[1],s=i[3],u=0;if(c)for(c.lastIndex=0;r=c.exec(s);){var h=s.substring(u,r.index);if(u=c.lastIndex,h&&a.push({type:o[2],value:h}),r[0])a.push({type:o[3],value:r[0]});else if(!h)break}return u<s.length&&a.push({type:o[2],value:s.substr(u)}),a}},{token:["string","text"],regex:"(\\S.*)(:$)"},{regex:"Searching for .*$",onMatch:function(e,t,r){var o=e.split(""),a=o[1];if(o.length<3)return"text";var c=" in"==o[2]?o[5]:o[6];/regex/.test(c)||(a=i.escapeRegExp(a)),/whole/.test(c)&&(a="\\b"+a+"\\b");var s=a&&n("("+a+")",/ sensitive/.test(c)?"g":"ig");s&&(r[0]=t,r[1]=s);var u=0,h=[{value:o[u++]+"'",type:"text"},{value:o[u++],type:"text"},{value:"'"+o[u++],type:"text"}];for(" in"!==o[2]&&h.push({value:"'"+o[u++]+"'",type:"text"},{value:o[u++],type:"text"}),h.push({value:" "+o[u++]+" ",type:"text"}),o[u+1]?(h.push({value:"("+o[u+1]+")",type:"text"}),u+=1):u-=1;u++<o.length;)o[u]&&h.push({value:o[u],type:"text"});return h}},{regex:"\\d+",token:"constant.numeric"}]}};r.inherits(a,o),t.C9SearchHighlightRules=a}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var r=e.getLine(t),i=r.match(/^(\s*\})/);if(!i)return 0;var o=i[1].length,a=e.findMatchingBracket({row:t,column:o});if(!a||a.row==t)return 0;var c=this.$getIndent(e.getLine(a.row));e.replace(new n(t,0,t,o-1),c)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r}),define("ace/mode/folding/c9search",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){var n=e("../../lib/oop"),r=e("../../range").Range,i=e("./fold_mode").FoldMode,o=t.FoldMode=function(){};n.inherits(o,i),function(){this.foldingStartMarker=/^(\S.*\:|Searching for.*)$/,this.foldingStopMarker=/^(\s+|Found.*)$/,this.getFoldWidgetRange=function(e,t,n){var i=e.doc.getAllLines(n),o=i[n],a=/^(Found.*|Searching for.*)$/,c=/^(\S.*\:|\s*)$/,s=a.test(o)?a:c;if(this.foldingStartMarker.test(o)){for(var u=n+1,h=e.getLength();h>u&&!s.test(i[u]);u++);return new r(n,o.length,u,0)}if(this.foldingStopMarker.test(o)){for(var u=n-1;u>=0&&(o=i[u],!s.test(o));u--);return new r(u,o.length,n,0)}}}.call(o.prototype)});