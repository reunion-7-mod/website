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

var obsidianNormal, obsidianHover;
var porcelainLeft, porcelainMiddle, porcelainRight;
var porcelain2Left, porcelain2Middle, porcelain2Right;
var selectedObsidianID = '';
var firstObsidianID = '';
var navTimer, navTimerRunning = false;
var oTimer, oTimerRunning = false;
var p2Timer, p2timerRunning = false;
var porcelainOnID = '';
var pageloaded = false;

function obsidianMouseOver(obsidianID)
{
    if (pageloaded)
    {
        if (porcelainOnID != '')
            turnOff();
        oTimer = setTimeout('obsidianOn(\'' + obsidianID + '\')',150);
        oTimerRunning = true;
    }
}
function obsidianOn(obsidianID)
{
    var oldIndex = parseInt(selectedObsidianID.replace('obsidian',''))-1;
    var newIndex = parseInt(obsidianID.replace('obsidian',''))-1;
  
    // unselect currently selected
    if (selectedObsidianID != null && selectedObsidianID != '')
    {
	    var selectedObsidian = document.getElementById(selectedObsidianID);
	    var selectedPorcelain = document.getElementById(selectedObsidianID.replace('obsidian','porcelainContent'));
	    selectedObsidian.src = obsidianNormal[oldIndex].src;
	    selectedPorcelain.className = 'menuHide';
	}
	// select new
	if (selectedObsidianID != null && selectedObsidianID != '')
    {
	    var obsidianImage = document.getElementById(obsidianID);
	    var porcelainContentID = obsidianID.replace('obsidian','porcelainContent');
	    var porcelainContent = document.getElementById(porcelainContentID);
	    
	    obsidianImage.src = obsidianHover[newIndex].src;
	    porcelainContent.className = 'menuShow';
	    alignPorcelainContent(obsidianID,porcelainContentID);
	    selectedObsidianID = obsidianID;
	}
}

function obsidianMouseOut(obsidianID)
{
    if (oTimerRunning)
        clearTimeout(oTimer);
    oTimerRunning = false;
}
function porcelainMouseOver(porcelainID, contentID)
{
    if (porcelainOnID != '')
        turnOff();
    // hover button
    var selectedPorcelain = document.getElementById(porcelainID);
    if (selectedPorcelain.className != 'porcelainItemCurrent')
    {
        selectedPorcelain.className = 'porcelainItemSelected';
        handleDividerImages(porcelainID,true);
    }
        // display flyout if neccessary
        var flyout = document.getElementById(porcelainID + '_FlyOut');
        if (flyout != null)
        {
            positionFlyout(selectedPorcelain, contentID, flyout);
            porcelainOnID = porcelainID;
        }
}

function porcelainMouseOut(porcelainID)
{
    var flyout = document.getElementById(porcelainID + '_FlyOut');
    if (flyout == null)
    {
        // unhover button
        var selectedPorcelain = document.getElementById(porcelainID);
        if (selectedPorcelain.className != 'porcelainItemCurrent')
        {
            selectedPorcelain.className = 'porcelainItem';
            handleDividerImages(porcelainID,false);
        }
    }
    else
    {
        p2Timer = setTimeout("turnOff()",500);
        p2timerRunning = true;
    }
}
function porcelain2MouseOver(porcelain2ID, parentID)
{
    if (p2timerRunning)
	    clearTimeout(p2Timer);
    porcelainOnID = parentID;
    var item = document.getElementById(porcelain2ID);
    item.className = 'porcelain2ItemSelected';
}
function porcelain2MouseOut(porcelain2ID)
{
    p2Timer = setTimeout("turnOff()",500);
    p2timerRunning = true;
    var item = document.getElementById(porcelain2ID);
    item.className = 'porcelain2Item';
}
function turnOff()
{
    if (p2timerRunning)
	    clearTimeout(p2Timer);
    // unhover button
    var selectedPorcelain = document.getElementById(porcelainOnID);
    if (selectedPorcelain != null)
    {
        if (selectedPorcelain.className != 'porcelainItemCurrent')
        {
            selectedPorcelain.className = 'porcelainItem';
            handleDividerImages(porcelainOnID,false);
        }
    }
    // hide flyout
    var flyout = document.getElementById(porcelainOnID + '_FlyOut');
    if (flyout != null)
	    flyout.className = 'porcelain2Hide';
    porcelainOnID = '';
    p2timerRunning = false;
}

function relativePosition(currentObject, baseObjectID) 
{
    var totalLeft = 0;
    var totalTop = 0;
    if (currentObject.offsetParent) 
    {
	    totalLeft = currentObject.offsetLeft;
	    totalTop = currentObject.offsetTop;
	    if (baseObjectID == null)
	    {
	        while (currentObject = currentObject.offsetParent)
	        {
	            totalLeft += currentObject.offsetLeft;
    		    totalTop += currentObject.offsetTop;
	        }
	    }
	    else
	    {
	        var found = false;
	        while (!(found)) 
	        {
	            currentObject = currentObject.offsetParent;
	            if (currentObject.id == baseObjectID)
	            {
	                found = true;
	            }
	            else
	            {
		            totalLeft += currentObject.offsetLeft;
        		    totalTop += currentObject.offsetTop;
                }
	        }
	    }
    }
    return [totalLeft,totalTop];
}

function handleDividerImages(porcelainID,turnOff,expireState)
{
    var porcelainItem = document.getElementById(porcelainID);
    var dividerAfterID = porcelainID.replace('_porcelain','_divider');
    var pIndex = parseInt(dividerAfterID.substring(dividerAfterID.length - 1, dividerAfterID.length));
    var from = '_divider' + pIndex;
    var to = pIndex - 1;
    to = '_divider' + to;
    var dividerBeforeID = dividerAfterID.replace(from,to);
    
    var firstDivider, secondDivider;
    var visValue = 'visible';
    var disValue = 'inline';
    if (turnOff)
    {
        visValue = 'hidden';
        disValue = 'none';
    }
    if (firstDivider = document.getElementById(dividerBeforeID))
    {
        if (firstDivider.className != 'expired')
        {
            firstDivider.style.visibility = visValue;
        }
        if (expireState) { firstDivider.className = 'expired'; }
        else { firstDivider.style.display = disValue; }
    }
    if (secondDivider = document.getElementById(dividerAfterID))
    {
        if (secondDivider.className != 'expired')
        {
            secondDivider.style.visibility = visValue;
        }
        if (expireState) { secondDivider.className = 'expired'; }
        else { secondDivider.style.display = disValue; }
    }
}

function revertNavigation ()
{
    navTimer = setTimeout('revertFinal()',500);
    navTimerRunning = true;
}
function revertFinal()
{
    navTimerRunning = false;
    obsidianOn(firstObsidianID);
}
function cancelRevert ()
{
    if (navTimerRunning)
    {
        navTimerRunning = false;
        clearTimeout(navTimer);
    }
}


function LoadNavigation ()
{
    // preload Images
    obsidianNormal = new Array();
    obsidianHover = new Array();

    var obsidianRow = document.getElementById('obsidianRow');
    var allImages = obsidianRow.getElementsByTagName('img');

    var myIndex = 0;
    for (var index = 0; index < allImages.length; index++)
    {
        if (allImages[index].id != null && allImages[index].id.indexOf('obsidian') > -1)
        {
            // set normal state
            obsidianNormal[myIndex] = new Image();
            obsidianNormal[myIndex].src = allImages[index].src;

            // set hover state
            obsidianHover[myIndex] = new Image();
            if (obsidianNormal[myIndex].src.indexOf('_actv.png') > -1)
            {
                obsidianHover[myIndex].src = obsidianNormal[myIndex].src;
            }
            else
            {
		        obsidianHover[myIndex].src = obsidianNormal[myIndex].src.replace('.png','_hvr.png');
	        }
	        myIndex++;
    	    
	    }
    }

    porcelainLeft = new Image();
    porcelainLeft.src = '/windows/templates/Common/images/navs/por_active_cap_lft.gif';
    porcelainMiddle = new Image();
    porcelainMiddle.src = '/windows/templates/Common/images/navs/por_active_bkg_span.gif';
    porcelainRight = new Image();
    porcelainRight.src = '/windows/templates/Common/images/navs/por_active_cap_rt.gif';
    porcelain2Left = new Image();
    porcelain2Left.src = '/windows/templates/Common/images/navs/por2_active_cap_lft.gif';
    porcelain2Middle = new Image();
    porcelain2Middle.src = '/windows/templates/Common/images/navs/por2_active_bkg_span.gif';
    porcelain2Right = new Image();
    porcelain2Right.src = '/windows/templates/Common/images/navs/por2_active_cap_rt.gif';

    // set initial selected obsidian
    var porcelainArea = document.getElementById("porcelainFiller");
    var porcelainContents = porcelainArea.getElementsByTagName("div");
    var selectedPorcelainContentID;
    for (var index = 0; index < porcelainContents.length; index++)
    {
        // set selected
        if (porcelainContents[index].className == 'menuShow')
        {
            porcelainContents[index].style.visibility = 'hidden';
            firstObsidianID = selectedObsidianID = porcelainContents[index].id.replace('porcelainContent','obsidian');
            selectedPorcelainContentID = porcelainContents[index].id;
            addPageLoadEvent(function () { document.getElementById(selectedPorcelainContentID).style.visibility = 'visible'; });
            addPageLoadEvent(function () { alignPorcelainContent(selectedObsidianID,selectedPorcelainContentID); });
            addPageLoadEvent(function () { pageloaded = true; });
            
        }
    }
    // set initial porcelain if neccessary
    var selectedPorcelain = document.getElementById('selectedPorcelainNode');
    if (selectedPorcelain)
    {
        var selectedNode = document.getElementById(selectedPorcelain.value);
        selectedNode.className = 'porcelainItemCurrent';
        handleDividerImages(selectedPorcelain.value,true,true);
    }
    function addPageLoadEvent(myFunction)
    {
        var oldonload = window.onload;
        if (typeof window.onload != 'function')
        { 
            window.onload = myFunction;
        }
        else 
        { 
            window.onload = function() { 
                if (oldonload) { oldonload(); }
                 myFunction(); };
        }
    }
}

}
/*
     FILE ARCHIVED ON 21:49:12 Feb 28, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 11:47:41 Dec 30, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 2.681
  exclusion.robots: 0.028
  exclusion.robots.policy: 0.016
  esindex: 0.012
  cdx.remote: 37.171
  LoadShardBlock: 123.685 (3)
  PetaboxLoader3.resolve: 174.593 (2)
  PetaboxLoader3.datanode: 120.75 (4)
  load_resource: 187.566
*/