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

// Filename: flashinsert.js
// Description: This script writes xhtml that will embed a basic flash file.  With the release of IE7, users must click to activate ActiveX 
//  controls that are coded in xhtml.  Since this is an external script, the user won't need to click the flash file in order to
//  activate it's interface.
var Filename;
var Flashvars;
var Staticimage;
var Width;
var Height;
var TemplatePath;
var pillValue = null;
var IE = document.all?true:false;
var q = location.search;

if(q)
{
    q = escape(q.substring(q.indexOf("?")+1,q.length) + ".");
    q = q.replace("%3D","=").replace("%26","&");
}

function detectIE(ClassID){
    result = false;
    document.write('<SCRIPT LANGUAGE=VBScript>\n on error resume next \n result = IsObject(CreateObject("' + ClassID + '"))</SCRIPT>\n');     
    return result;
}

function detectNS(){
    if(navigator.plugins["Shockwave Flash"])
    {
        if((navigator.plugins["Shockwave Flash"].description.indexOf("8.0") > 0) || (navigator.plugins["Shockwave Flash"].description.indexOf("9.0") > 0))
            return true;
    }else{
        return false;
    }
}

function floatFlashObject(floatWidth, floatHeight, offSetX, offSetY){
    
    mastheadHeight  = document.getElementById('msviMasthead').offsetHeight;
    pageHeight      = document.getElementById('page').offsetHeight;
    pageWidth       = document.getElementById('page').offsetWidth;
    footerHeight    = document.getElementById('msviFooter').offsetHeight;
    document.getElementById('transparentOverlay').style.height=pageHeight + mastheadHeight + footerHeight + 20;
    document.getElementById('transparentOverlay').style.top=-(mastheadHeight+20);
    document.getElementById('transparentOverlay').style.display='inline';
    document.getElementById('transparentOverlay').style.zIndex='100';
    
     if(IE){
        document.getElementById('flashObject').style.position = 'absolute';
	    if(offSetY != 'undefined')
            document.getElementById('flashObject').style.top = offSetY;
            document.getElementById('flashObjectContainer').style.zIndex = '100';
            document.getElementById('flashObject').style.width = floatWidth;
            document.getElementById('flashObject').style.height = floatHeight;
	    if(offSetX != 'undefined')
            document.getElementById('flashObject').style.left = offSetX;
    }else{
	    if(offSetY != 'undefined')
            document.getElementById('flashEmbed').style.top = offSetY;
            document.getElementById('flashObjectContainer').style.zIndex = '100';
            document.getElementById('flashEmbed').style.width = floatWidth;
            document.getElementById('flashEmbed').style.height = floatHeight;
	    if(offSetX != 'undefined')
            document.getElementById('flashEmbed').style.left = offSetX;
    }
}

function dockFlashObject(){

    if(navigator.userAgent.indexOf("MSIE") > 1){
        document.getElementById('flashObject').style.position = 'relative';
        document.getElementById('flashObject').style.left = '0px';
        document.getElementById('flashObject').style.top = '0px';
        document.getElementById('flashObject').style.zIndex = '5';
        document.getElementById('flashObject').style.width = Width;
        document.getElementById('flashObject').style.height = Height;
    }else{    
        document.getElementById('flashEmbed').style.left = '0px';
        document.getElementById('flashEmbed').style.top = '0px';
        document.getElementById('flashEmbed').style.zIndex = '5';
        document.getElementById('flashEmbed').style.width = Width;
        document.getElementById('flashEmbed').style.height = Height;
    }
    document.getElementById('transparentOverlay').style.zIndex='-1';
    document.getElementById('transparentOverlay').style.display='none';
    document.getElementById('flashObjectContainer').style.zIndex='5';

}

function loadFlash(filename,flashvars,staticimagelink,staticimage,width,height,templatePath){
    var flashInstalled;
    Filename=filename;
    Flashvars=flashvars;
    Staticimage=staticimage;
    Width=width;
    Height=height;
    TemplatePath=templatePath;
    
    if (IE){
        flashInstalled = detectIE("ShockwaveFlash.ShockwaveFlash.9");
        if(!flashInstalled)
            flashInstalled = detectIE("ShockwaveFlash.ShockwaveFlash.8");
    }else{
		flashInstalled = detectNS();
    }
        
    document.writeln("<div id='flashObjectContainer' class='flashObjectContainer' style='z-index:5;position:relative;width:" + width + ";height:" + height + ";' />");
    document.writeln("<div style='position:absolute;left:0;top:0;display:inline;z-index:0;width:" + width + ";height:" + height + ";'>");
    document.writeln("<a href='" + staticimagelink + "'><img src='" + staticimage + "' alt='' border='0'/></a>");
    document.writeln("</div>");
    if(flashInstalled){
        document.writeln("<object id='flashObject' style='position:absolute;z-index:5;' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='https://web.archive.org/web/20070226202442/http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='" + width + "' height='" + height + "'>");
        document.writeln("<param name='movie' value='" + filename + "'/>");
        document.writeln("<param name='quality' value='high'/>");
        document.writeln("<param name='flashvars' value='" + flashvars + "&" + q + "' />");
        document.writeln("<param name='wmode' value='transparent'/>"); 
        document.writeln("<embed id='flashEmbed' style='position:absolute;z-index:5;' src='" + filename + "' quality='high' flashvars='" + flashvars + "&" + q +"' pluginspage='https://web.archive.org/web/20070226202442/http://www.macromedia.com/go/getflashplayer' wmode='transparent' type='application/x-shockwave-flash' width='" + width + "' height='" + height + "'></embed>");
        document.writeln("</object>");
    }
    document.writeln("</div>");
}

}
/*
     FILE ARCHIVED ON 20:24:42 Feb 26, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 11:47:39 Dec 30, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.679
  exclusion.robots: 0.025
  exclusion.robots.policy: 0.011
  esindex: 0.014
  cdx.remote: 6.886
  LoadShardBlock: 113.567 (3)
  PetaboxLoader3.datanode: 171.539 (4)
  load_resource: 223.927
  PetaboxLoader3.resolve: 41.823
*/