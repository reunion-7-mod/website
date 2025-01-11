var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

if(typeof(COMSCORE)=="undefined"){var COMSCORE={};}if(typeof COMSCORE.SiteRecruit=="undefined"){COMSCORE.SiteRecruit={version:"4.5.3",configUrl:"broker-config.js",builderUrl:"builder.js",CONSTANTS:{COOKIE_TYPE:{ALREADY_ASKED:1,DD_IN_PROGRESS:2,EDD_IN_PROGRESS:3}}};
COMSCORE.SiteRecruit.Utils=(function(){var A=COMSCORE.SiteRecruit;return{location:document.location.toString(),loadScript:function(C,D){if(D){C=A.Utils.appendQueryParams(C,(new Date()).getTime());
}var B=document.createElement("script");B.src=C;document.body.appendChild(B);},getBrowser:function(){var B={};
B.name=navigator.appName;B.version=parseInt(navigator.appVersion,10);if(B.name=="Microsoft Internet Explorer"){if(B.version>3){var C=navigator.userAgent.toLowerCase();
if(C.indexOf("msie 5.0")==-1){B.ie=true;}if(C.indexOf("msie 7")!=-1){B.ie7=true;}}}if(B.name=="Netscape"||B.name=="Opera"){if(B.version>4){B.mozilla=true;
}}return B;},fireBeacon:function(B){setTimeout(function(){if(B.indexOf("?")==-1){B+=(/\?/.test(B)?"&":"?")+(new Date()).getTime();
}var C=new Image();C.src=B;},1);},appendQueryParams:function(C,B){if(C==null||B==null){}if(!C){return B;
}else{C=C.replace("?","")+"?";if(B){C+=B.toString().replace("?","");}return C;}},getRandom:function(K){var L=1000000000;
function C(W,U,Y,T,X){var V=Math.floor(W/Y);V=U*(W-(V*Y))-(V*T);return Math.round((V<0)?(V+X):V);
}var R=2147483563,H=2147483399,B=40014,J=40692,O=53668,D=52774,P=12211,E=3791,S=67108862;
var M=(Math.round(((new Date()).getTime()%100000))&2147483647),F=M;var Q=[32],I=0;
for(;I<19;I++){F=C(F,B,O,P,R);}for(I=0;I<32;I++){F=C(F,B,O,P,R);Q[31-I]=F;}F=C(F,B,O,P,R);
M=C(M,J,D,E,H);var G=Math.round((Q[Math.floor(Q[0]/S)]+M)%R);var N=Math.floor(G/(R/(L+1)))/L;
if(typeof(K)=="undefined"){return N;}else{return Math.floor(N*(K+1));}},getExecutingPath:function(C){var B=document.getElementsByTagName("script");
for(var D=B.length-1;D>=0;D--){var E=B[D].src;this.scriptUrl=E;if(E.indexOf("/"+C)!=-1){return E.replace(/(.*)(\/.*)$/,"$1/");
}}}};})();COMSCORE.SiteRecruit.Utils.UserPersistence={set:function(B,A,D){A=escape(A);
if(D.date){A+=";expires="+D.date.toGMTString();}else{if(D.duration){var C=new Date();
C.setTime(C.getTime()+D.duration*24*60*60*1000);A+="; expires="+C.toGMTString();}}if(D.path){A+="; path="+D.path;
}else{}if(D.domain){A+="; domain="+D.domain;}if(D.secure){A+="; secure";}document.cookie=B+"="+A;
if(!COMSCORE.isDDInProgress()){}return true;},get:function(B){var A=document.cookie.match("(?:^|;)\\s*"+B+"=([^;]*)");
return A?unescape(A[1]):false;},remove:function(A,B){B=B||{};B.duration=-999;this.set(A,"",B);
}};COMSCORE.SiteRecruit.DDKeepAlive=(function(){var B=1000,E=Math.random(),A;var C=COMSCORE.SiteRecruit;
var D=C.Utils;return{start:function(){var F=this;A=setInterval(function(){if(C.Broker.isDDInProgress()){F.setDDTrackerCookie();
}else{F.stop();}},B);},stop:function(){clearInterval(A);},setDDTrackerCookie:function(){var F=C.Broker.config.cookie;
var G=C.CONSTANTS.COOKIE_TYPE.DD_IN_PROGRESS+":"+escape(D.location)+":"+(new Date()).getTime();
D.UserPersistence.set(F.name,G,{path:F.path,domain:F.domain});}};})();COMSCORE.SiteRecruit.PagemapFinder=(function(){var C;
var B=COMSCORE.SiteRecruit;var A=B.Utils;return{getTotalFreq:function(){return C;
},find:function(K){var F=0,I;var G=K;var J=[];var H=false;C=0;for(var D=0;G&&D<G.length;
D++){var E=false;var N=G[D];if(N){var M=new RegExp(N.m,"i");if(A.location.search(M)!=-1){if(N.halt){H=true;
break;}var L=G[D].prereqs;E=true;if(L){if(!this.isMatchContent(L.content)){E=false;
}if(!this.isMatchCookie(L.cookie)){E=false;}if(!this.isMatchLanguage(L.language)){E=false;
}}}if(E){J.push(N);C+=N.f;}}}if(H==true){J=null;C=0;return null;}return this.choosePriority(J);
},choose:function(E,F){var D=A.getRandom((F*100));var H=0;for(var G=0;G<E.length;
G++){H+=(E[G].f*100);if(D<=H){return E[G];}}return null;},choosePriority:function(D){var F=null;
for(var E=0;E<D.length;E++){if(F==null){F=D[E];}else{if(F.p<D[E].p){F=D[E];}}}return F;
},isMatchContent:function(M){var I=true,D=0;while(I&&D<M.length){var L=false;var K=false;
var J=M[D];if(J.element){var F=document.getElementsByTagName(J.element);for(var E=0;
E<F.length;E++){var G=J.elementValue;if(G&&G.length){if(F[E].innerHTML.search(G)!=-1){L=true;
}}else{L=true;}if(J.attrib&&J.attrib.length){var H=F[E].attributes.getNamedItem(J.attrib);
if(H){if(J.attribValue&&J.attribValue.length){if(H.value.search(J.attribValue)!=-1){K=true;
}}else{K=true;}}}else{K=true;}}}if(!L||!K){I=false;}D++;}return I;},isMatchCookie:function(D){var H=true,F=0;
while(H&&F<D.length){var E=D[F],G=A.UserPersistence.get(E.name);if(G&&G!==null){H=G.indexOf(E.value)!=-1?true:false;
F++;}else{return false;}}return H;},isMatchLanguage:function(E){var D=navigator.language||navigator.userLanguage;
D=D.toLowerCase();if(!E){return true;}if(D.indexOf(E)!=-1){return true;}return false;
}};})();COMSCORE.SiteRecruit.Broker=(function(){var B=COMSCORE.SiteRecruit;var A=B.Utils;
return{init:function(){B.browser=A.getBrowser();B.executingPath=A.getExecutingPath("broker.js");
if(B.browser.ie||B.browser.mozilla){A.loadScript(B.executingPath+B.configUrl,true);
}else{return;}},start:function(){this.init();},run:function(){if(this.config.objStoreElemName){if(B.browser.ie){COMSCORE.SiteRecruit.Utils.UserPersistence.initialize();
}else{return;}}if(B.version!==this.config.version){return;}if(this.isDDInProgress()){this.processDDInProgress();
}if(this.isEDDInProgress()){this.processEDDInProgress();}if(!this.config.testMode||this.isDDInProgress()||this.isEDDInProgress()){if(A.UserPersistence.get(this.config.cookie.name)!==false){return;
}}if(this.findPageMapping()){var C=A.getRandom();if(C<=B.PagemapFinder.getTotalFreq()){if(this.pagemap){this.loadBuilder();
}}else{return;}}else{return;}},isDDInProgress:function(){var C=A.UserPersistence.get(COMSCORE.SiteRecruit.Broker.config.cookie.name);
return(C&&C.indexOf(B.CONSTANTS.COOKIE_TYPE.DD_IN_PROGRESS)===0);},isEDDInProgress:function(){var C=A.UserPersistence.get(this.config.cookie.name);
return(C&&C.indexOf(B.CONSTANTS.COOKIE_TYPE.EDD_IN_PROGRESS)===0);},processDDInProgress:function(){B.DDKeepAlive.start();
},processEDDInProgress:function(){var E=A.UserPersistence.get(this.config.cookie.name);
if(E){var C=E.match(new RegExp("\\d*$"));if(C&&C.length){var D=this.config.eddListenerUrl;
var F="action=log&user="+C[0]+"&location="+escape(A.location);D=A.appendQueryParams(D,F);
A.fireBeacon(D);}else{}}else{}},findPageMapping:function(){this.pagemap=B.PagemapFinder.find(this.config.mapping);
return this.pagemap;},loadBuilder:function(){var C=B.executingPath+B.builderUrl;A.loadScript(C);
}};})();COMSCORE.isDDInProgress=COMSCORE.SiteRecruit.Broker.isDDInProgress;COMSCORE.SiteRecruit.OnReady=(function(){var B=COMSCORE.SiteRecruit;
var A=B.Utils;return{onload:function(){if(B.OnReady.done){return;}B.OnReady.done=true;
B.Broker.start();if(B.OnReady.timer){clearInterval(B.OnReady.timer);}if(document.addEventListener){document.removeEventListener("DOMContentLoaded",B.OnReady.onload,false);
}if(window.ActiveXObject){}},listen:function(){if(/WebKit|khtml/i.test(navigator.userAgent)){B.OnReady.timer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(B.OnReady.timer);
delete B.OnReady.timer;B.OnReady.onload();}},10);}else{if(document.addEventListener){document.addEventListener("DOMContentLoaded",B.OnReady.onload,false);
}else{if(window.ActiveXObject){COMSCORE.SiteRecruit.OnReady.waitForLoad=setInterval(function(){try{document.documentElement.doScroll("left");
}catch(C){return;}COMSCORE.SiteRecruit.OnReady.waitForLoad=clearInterval(COMSCORE.SiteRecruit.OnReady.waitForLoad);
COMSCORE.SiteRecruit.OnReady.onload();},1000);}else{if(window.addEventListener){window.addEventListener("load",B.OnReady.onload,false);
}else{if(window.attachEvent){return window.attachEvent("onload",B.OnReady.onload);
}}}}}},f:[],done:false,timer:null};})();COMSCORE.SiteRecruit.OnReady.listen();}

}
/*
     FILE ARCHIVED ON 10:13:08 Dec 27, 2009 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:00:28 Dec 26, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.631
  exclusion.robots: 0.031
  exclusion.robots.policy: 0.019
  esindex: 0.013
  cdx.remote: 5.221
  LoadShardBlock: 132.025 (3)
  PetaboxLoader3.datanode: 171.022 (4)
  load_resource: 294.827
  PetaboxLoader3.resolve: 169.048
*/