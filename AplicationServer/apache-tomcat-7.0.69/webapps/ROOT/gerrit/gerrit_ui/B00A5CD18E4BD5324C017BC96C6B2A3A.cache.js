/*

Copyright (C) 2015 by Marijn Haverbeke <marijnh@gmail.com> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function(d){"object"==typeof exports&&"object"==typeof module?d(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed"],d):d(CodeMirror)})(function(d){var k="template literal msg fallbackmsg let if elseif else switch case default foreach ifempty for call param deltemplate delcall log".split(" ");d.defineMode("soy",function(e){function g(b){return b[b.length-1]}function l(b,a,c){var d=b.string;
if(c=c.exec(d.substr(b.pos)))b.string=d.substr(0,b.pos+c.index);c=b.hideFirstChars(a.indent,function(){return a.localMode.token(b,a.localState)});b.string=d;return c}var h=d.getMode(e,"text/plain"),f={html:d.getMode(e,{name:"text/html",multilineTagIndentFactor:2,multilineTagIndentPastTag:!1}),attributes:h,text:h,uri:h,css:d.getMode(e,"text/css"),js:d.getMode(e,{name:"text/javascript",statementIndent:2*e.indentUnit})};return{startState:function(){return{kind:[],kindTag:[],soyState:[],indent:0,localMode:f.html,
localState:d.startState(f.html)}},copyState:function(b){return{tag:b.tag,kind:b.kind.concat([]),kindTag:b.kindTag.concat([]),soyState:b.soyState.concat([]),indent:b.indent,localMode:b.localMode,localState:d.copyState(b.localMode,b.localState)}},token:function(b,a){var c;switch(g(a.soyState)){case "comment":return b.match(/^.*?\*\//)?a.soyState.pop():b.skipToEnd(),"comment";case "variable":if(b.match(/^}/))return a.indent-=2*e.indentUnit,a.soyState.pop(),"variable-2";b.next();return null;case "tag":if(b.match(/^\/?}/))return a.indent=
"/template"==a.tag||"/deltemplate"==a.tag?0:a.indent-("/}"==b.current()||-1==k.indexOf(a.tag)?2:1)*e.indentUnit,a.soyState.pop(),"keyword";if(b.match(/^([\w?]+)(?==)/))return"kind"==b.current()&&(c=b.match(/^="([^"]+)/,!1))&&(c=c[1],a.kind.push(c),a.kindTag.push(a.tag),a.localMode=f[c]||f.html,a.localState=d.startState(a.localMode)),"attribute";if(b.match(/^"/))return a.soyState.push("string"),"string";b.next();return null;case "literal":return b.match(/^(?=\{\/literal})/)?(a.indent-=e.indentUnit,
a.soyState.pop(),this.token(b,a)):l(b,a,/\{\/literal}/);case "string":return b.match(/^.*?"/)?a.soyState.pop():b.skipToEnd(),"string"}return b.match(/^\/\*/)?(a.soyState.push("comment"),"comment"):b.match(b.sol()?/^\s*\/\/.*/:/^\s+\/\/.*/)?"comment":b.match(/^\{\$[\w?]*/)?(a.indent+=2*e.indentUnit,a.soyState.push("variable"),"variable-2"):b.match(/^\{literal}/)?(a.indent+=e.indentUnit,a.soyState.push("literal"),"keyword"):(c=b.match(/^\{([\/@\\]?[\w?]*)/))?("/switch"!=c[1]&&(a.indent+=(/^(\/|(else|elseif|case|default)$)/.test(c[1])&&
"switch"!=a.tag?1:2)*e.indentUnit),a.tag=c[1],a.tag=="/"+g(a.kindTag)&&(a.kind.pop(),a.kindTag.pop(),a.localMode=f[g(a.kind)]||f.html,a.localState=d.startState(a.localMode)),a.soyState.push("tag"),"keyword"):l(b,a,/\{|\s+\/\/|\/\*/)},indent:function(b,a){var c=b.indent,f=g(b.soyState);if("comment"==f)return d.Pass;if("literal"==f)/^\{\/literal}/.test(a)&&(c-=e.indentUnit);else{if(/^\s*\{\/(template|deltemplate)\b/.test(a))return 0;/^\{(\/|(fallbackmsg|elseif|else|ifempty)\b)/.test(a)&&(c-=e.indentUnit);
"switch"!=b.tag&&/^\{(case|default)\b/.test(a)&&(c-=e.indentUnit);/^\{\/switch\b/.test(a)&&(c-=e.indentUnit)}c&&b.localMode.indent&&(c+=b.localMode.indent(b.localState,a));return c},innerMode:function(b){return b.soyState.length&&"literal"!=g(b.soyState)?null:{state:b.localState,mode:b.localMode}},electricInput:/^\s*\{(\/|\/template|\/deltemplate|\/switch|fallbackmsg|elseif|else|case|default|ifempty|\/literal\})$/,lineComment:"//",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",
fold:"indent"}},"htmlmixed");d.registerHelper("hintWords","soy",k.concat("delpackage namespace alias print css debugger".split(" ")));d.defineMIME("text/x-soy","soy")});
