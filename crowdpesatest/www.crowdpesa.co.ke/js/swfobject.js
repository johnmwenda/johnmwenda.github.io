if(typeof deconcept=="undefined"){var deconcept=new Object}if(typeof deconcept.util=="undefined"){deconcept.util=new Object}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object}deconcept.SWFObject=function(e,t,n,r,i,s,o,u,a,f){if(!document.getElementById){return}this.DETECT_KEY=f?f:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object;this.variables=new Object;this.attributes=new Array;if(e){this.setAttribute("swf",e)}if(t){this.setAttribute("id",t)}if(n){this.setAttribute("width",n)}if(r){this.setAttribute("height",r)}if(i){this.setAttribute("version",new deconcept.PlayerVersion(i.toString().split(".")))}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true}if(s){this.addParam("bgcolor",s)}var l=o?o:"high";this.addParam("quality",l);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var c=u?u:window.location;this.setAttribute("xiRedirectUrl",c);this.setAttribute("redirectUrl","");if(a){this.setAttribute("redirectUrl",a)}};deconcept.SWFObject.prototype={useExpressInstall:function(e){this.xiSWFPath=!e?"expressinstall.swf":e;this.setAttribute("useExpressInstall",true)},setAttribute:function(e,t){this.attributes[e]=t},getAttribute:function(e){return this.attributes[e]},addParam:function(e,t){this.params[e]=t},getParams:function(){return this.params},addVariable:function(e,t){this.variables[e]=t},getVariable:function(e){return this.variables[e]},getVariables:function(){return this.variables},getVariablePairs:function(){var e=new Array;var t;var n=this.getVariables();for(t in n){e[e.length]=t+"="+n[t]}return e},getSWFHTML:function(){var e="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath)}e='<embed type="application/x-shockwave-flash" src="'+this.getAttribute("swf")+'" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'"';e+=' id="'+this.getAttribute("id")+'" name="'+this.getAttribute("id")+'" ';var t=this.getParams();for(var n in t){e+=[n]+'="'+t[n]+'" '}var r=this.getVariablePairs().join("&");if(r.length>0){e+='flashvars="'+r+'"'}e+="/>"}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath)}e='<object id="'+this.getAttribute("id")+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'" style="'+this.getAttribute("style")+'">';e+='<param name="movie" value="'+this.getAttribute("swf")+'" />';var i=this.getParams();for(var n in i){e+='<param name="'+n+'" value="'+i[n]+'" />'}var s=this.getVariablePairs().join("&");if(s.length>0){e+='<param name="flashvars" value="'+s+'" />'}e+="</object>"}return e},write:function(e){if(this.getAttribute("useExpressInstall")){var t=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(t)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title)}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=typeof e=="string"?document.getElementById(e):e;n.innerHTML=this.getSWFHTML();return true}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"))}}return false}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var e=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var t=navigator.plugins["Shockwave Flash"];if(t&&t.description){e=new deconcept.PlayerVersion(t.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."))}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var n=1;var r=3;while(n){try{r++;n=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+r);e=new deconcept.PlayerVersion([r,0,0])}catch(i){n=null}}}else{try{var n=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(i){try{var n=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");e=new deconcept.PlayerVersion([6,0,21]);n.AllowScriptAccess="always"}catch(i){if(e.major==6){return e}}try{n=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(i){}}if(n!=null){e=new deconcept.PlayerVersion(n.GetVariable("$version").split(" ")[1].split(","))}}}return e};deconcept.PlayerVersion=function(e){this.major=e[0]!=null?parseInt(e[0]):0;this.minor=e[1]!=null?parseInt(e[1]):0;this.rev=e[2]!=null?parseInt(e[2]):0};deconcept.PlayerVersion.prototype.versionIsValid=function(e){if(this.major<e.major){return false}if(this.major>e.major){return true}if(this.minor<e.minor){return false}if(this.minor>e.minor){return true}if(this.rev<e.rev){return false}return true};deconcept.util={getRequestParameter:function(e){var t=document.location.search||document.location.hash;if(e==null){return t}if(t){var n=t.substring(1).split("&");for(var r=0;r<n.length;r++){if(n[r].substring(0,n[r].indexOf("="))==e){return n[r].substring(n[r].indexOf("=")+1)}}}return""}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var e=document.getElementsByTagName("OBJECT");for(var t=e.length-1;t>=0;t--){e[t].style.display="none";for(var n in e[t]){if(typeof e[t][n]=="function"){e[t][n]=function(){}}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs)};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true}}if(!document.getElementById&&document.all){document.getElementById=function(e){return document.all[e]}}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject