function getMessage(e){ranker.updateCode(e.data.newCode),ranker.updateData(e.data.rawData),ranker.run()}function buildTeamTile(e,a){var n=document.createElement("div");n.className="teamTile";n.onclick=function(){console.log(a)};var t=document.createElement("div");t.className="numberingDiv",n.appendChild(t);var r=document.createElement("p");r.className="rankNumber",r.innerHTML=e+1,t.appendChild(r);var d=document.createElement("div");d.className="teamSide",n.appendChild(d);var m=document.createElement("div");m.className=" teamLogo";var l=document.createElement("div");l.className+=" team-logo",l.className+=" team"+a.team_code,m.appendChild(l),d.appendChild(m);var o=document.createElement("p");return o.className="teamName",o.innerHTML=a.name,d.appendChild(o),n}function remap(e){for(var a={},n=0;n<e.length;n++)a[e[n].name]=e[n];for(var t={},r=0;r<e.length;r++)for(var d=e[r],m=0;m<e[r].schedule.length;m++){var l=d.schedule[m];l.opp=a[l.opp],l.team=e[r];var o=t[l.game_code];o?(l.opp_game=o,o.opp_game=l):t[l.game_code]=l}return e}window.onload=function(){window.addEventListener?addEventListener("message",getMessage,!1):attachEvent("onmessage",getMessage),ranker=new Ranker(document.querySelector(".rankings"),null,null,buildTeamTile,remap),$(".banner").css("display","none")};