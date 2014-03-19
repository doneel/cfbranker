define("ace/mode/snippets",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/text_highlight_rules","ace/mode/folding/coffee"],function(e,t){var n=e("../lib/oop"),r=e("./text").Mode,o=(e("../tokenizer").Tokenizer,e("./text_highlight_rules").TextHighlightRules),i=function(){var e="SELECTION|CURRENT_WORD|SELECTED_TEXT|CURRENT_LINE|LINE_INDEX|LINE_NUMBER|SOFT_TABS|TAB_SIZE|FILENAME|FILEPATH|FULLNAME";this.$rules={start:[{token:"constant.language.escape",regex:/\\[\$}`\\]/},{token:"keyword",regex:"\\$(?:TM_)?(?:"+e+")\\b"},{token:"variable",regex:"\\$\\w+"},{onMatch:function(e,t,n){return n[1]?n[1]++:n.unshift(t,1),this.tokenName},tokenName:"markup.list",regex:"\\${",next:"varDecl"},{onMatch:function(e,t,n){return n[1]?(n[1]--,n[1]||n.splice(0,2),this.tokenName):"text"},tokenName:"markup.list",regex:"}"},{token:"doc.comment",regex:/^\${2}-{5,}$/}],varDecl:[{regex:/\d+\b/,token:"constant.numeric"},{token:"keyword",regex:"(?:TM_)?(?:"+e+")\\b"},{token:"variable",regex:"\\w+"},{regex:/:/,token:"punctuation.operator",next:"start"},{regex:/\//,token:"string.regex",next:"regexp"},{regex:"",next:"start"}],regexp:[{regex:/\\./,token:"escape"},{regex:/\[/,token:"regex.start",next:"charClass"},{regex:"/",token:"string.regex",next:"format"},{token:"string.regex",regex:"."}],charClass:[{regex:"\\.",token:"escape"},{regex:"\\]",token:"regex.end",next:"regexp"},{token:"string.regex",regex:"."}],format:[{regex:/\\[ulULE]/,token:"keyword"},{regex:/\$\d+/,token:"variable"},{regex:"/[gim]*:?",token:"string.regex",next:"start"},{token:"string",regex:"."}]}};n.inherits(i,o),t.SnippetHighlightRules=i;var g=function(){this.$rules={start:[{token:"text",regex:"^\\t",next:"sn-start"},{token:"invalid",regex:/^ \s*/},{token:"comment",regex:/^#.*/},{token:"constant.language.escape",regex:"^regex ",next:"regex"},{token:"constant.language.escape",regex:"^(trigger|endTrigger|name|snippet|guard|endGuard|tabTrigger|key)\\b"}],regex:[{token:"text",regex:"\\."},{token:"keyword",regex:"/"},{token:"empty",regex:"$",next:"start"}]},this.embedRules(i,"sn-",[{token:"text",regex:"^\\t",next:"sn-start"},{onMatch:function(e,t,n){return n.splice(n.length),this.tokenName},tokenName:"text",regex:"^(?!	)",next:"start"}])};n.inherits(g,o),t.SnippetGroupHighlightRules=g;var a=e("./folding/coffee").FoldMode,s=function(){this.HighlightRules=g,this.foldingRules=new a};n.inherits(s,r),function(){this.$indentWithTabs=!0,this.$id="ace/mode/snippets"}.call(s.prototype),t.Mode=s}),define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t){var n=e("../../lib/oop"),r=e("./fold_mode").FoldMode,o=e("../../range").Range,i=t.FoldMode=function(){};n.inherits(i,r),function(){this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;var i=/\S/,g=e.getLine(n),a=g.search(i);if(-1!=a&&"#"==g[a]){for(var s=g.length,x=e.getLength(),l=n,d=n;++n<x;){g=e.getLine(n);var c=g.search(i);if(-1!=c){if("#"!=g[c])break;d=n}}if(d>l){var u=e.getLine(d).length;return new o(l,s,d,u)}}},this.getFoldWidget=function(e,t,n){var r=e.getLine(n),o=r.search(/\S/),i=e.getLine(n+1),g=e.getLine(n-1),a=g.search(/\S/),s=i.search(/\S/);if(-1==o)return e.foldWidgets[n-1]=-1!=a&&s>a?"start":"","";if(-1==a){if(o==s&&"#"==r[o]&&"#"==i[o])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(a==o&&"#"==r[o]&&"#"==g[o]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return e.foldWidgets[n-1]=-1!=a&&o>a?"start":"",s>o?"start":""}}.call(i.prototype)});