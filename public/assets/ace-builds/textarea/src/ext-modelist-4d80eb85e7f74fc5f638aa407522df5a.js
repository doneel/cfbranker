__ace_shadowed__.define("ace/ext/modelist",["require","exports","module"],function(e,s,t){function a(e){for(var s=c.text,t=e.split(/[\/\\]/).pop(),a=0;a<l.length;a++)if(l[a].supportsFile(t)){s=l[a];break}return s}var l=[],r=function(e,s,t){if(this.name=e,this.caption=s,this.mode="ace/mode/"+e,this.extensions=t,/\^/.test(t))var a=t.replace(/\|(\^)?/g,function(e,s){return"$|"+(s?"^":"^.*\\.")})+"$";else var a="^.*\\.("+t+")$";this.extRe=new RegExp(a,"gi")};r.prototype.supportsFile=function(e){return e.match(this.extRe)};var o={ABAP:["abap"],ActionScript:["as"],ADA:["ada|adb"],Apache_Conf:["^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd"],AsciiDoc:["asciidoc"],Assembly_x86:["asm"],AutoHotKey:["ahk"],BatchFile:["bat|cmd"],C9Search:["c9search_results"],C_Cpp:["cpp|c|cc|cxx|h|hh|hpp"],Clojure:["clj"],Cobol:["CBL|COB"],coffee:["coffee|cf|cson|^Cakefile"],ColdFusion:["cfm"],CSharp:["cs"],CSS:["css"],Curly:["curly"],D:["d|di"],Dart:["dart"],Diff:["diff|patch"],Dot:["dot"],Erlang:["erl|hrl"],EJS:["ejs"],Forth:["frt|fs|ldr"],FTL:["ftl"],Glsl:["glsl|frag|vert"],golang:["go"],Groovy:["groovy"],HAML:["haml"],Handlebars:["hbs|handlebars|tpl|mustache"],Haskell:["hs"],haXe:["hx"],HTML:["html|htm|xhtml"],HTML_Ruby:["erb|rhtml|html.erb"],INI:["ini|conf|cfg|prefs"],Jack:["jack"],Jade:["jade"],Java:["java"],JavaScript:["js|jsm"],JSON:["json"],JSONiq:["jq"],JSP:["jsp"],JSX:["jsx"],Julia:["jl"],LaTeX:["tex|latex|ltx|bib"],LESS:["less"],Liquid:["liquid"],Lisp:["lisp"],LiveScript:["ls"],LogiQL:["logic|lql"],LSL:["lsl"],Lua:["lua"],LuaPage:["lp"],Lucene:["lucene"],Makefile:["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],MATLAB:["matlab"],Markdown:["md|markdown"],MEL:["mel"],MySQL:["mysql"],MUSHCode:["mc|mush"],Nix:["nix"],ObjectiveC:["m|mm"],OCaml:["ml|mli"],Pascal:["pas|p"],Perl:["pl|pm"],pgSQL:["pgsql"],PHP:["php|phtml"],Powershell:["ps1"],Prolog:["plg|prolog"],Properties:["properties"],Protobuf:["proto"],Python:["py"],R:["r"],RDoc:["Rd"],RHTML:["Rhtml"],Ruby:["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],Rust:["rs"],SASS:["sass"],SCAD:["scad"],Scala:["scala"],Scheme:["scm|rkt"],SCSS:["scss"],SH:["sh|bash|^.bashrc"],SJS:["sjs"],Space:["space"],snippets:["snippets"],Soy_Template:["soy"],SQL:["sql"],Stylus:["styl|stylus"],SVG:["svg"],Tcl:["tcl"],Tex:["tex"],Text:["txt"],Textile:["textile"],Toml:["toml"],Twig:["twig"],Typescript:["ts|typescript|str"],VBScript:["vbs"],Velocity:["vm"],Verilog:["v|vh|sv|svh"],XML:["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl"],XQuery:["xq"],YAML:["yaml|yml"]},i={ObjectiveC:"Objective-C",CSharp:"C#",golang:"Go",C_Cpp:"C/C++",coffee:"CoffeeScript",HTML_Ruby:"HTML (Ruby)",FTL:"FreeMarker"},c={};for(var p in o){var m=o[p],h=(i[p]||p).replace(/_/g," "),f=p.toLowerCase(),n=new r(f,h,m[0]);c[f]=n,l.push(n)}t.exports={getModeForPath:a,modes:l,modesByName:c}});