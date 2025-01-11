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

var __tabControlCurrent, __tabs = {};
function openTab( tabID, on )
{
	if ( !on )
	{
		setTimeout( "openTab( '" + tabID + "', true )", 0 );
		return;
	}

	// Ensure current tab is set:
	__tabControlCurrent = __tabControlCurrent ? __tabControlCurrent : resolveCurrentTab();

	// Unhighlight current tab:	
	if ( __tabControlCurrent )
	{
		__tabControlCurrent.SetEnabled( false );
	}
	
	// Highlight the tab w/ the specified ID:
	__tabControlCurrent = createTab( tabID );
	__tabControlCurrent.SetEnabled( true );
}

function createTab( tabID )
{
	if  ( __tabs[ tabID ] )
	{
		return __tabs[ tabID ];
	}
	return __tabs[ tabID ] = new Tab( tabID );
}

function resolveCurrentTab()
{
	var allContent = document.getElementsByTagName( "div" );
	for ( var contentIndex = 0; contentIndex < allContent.length; contentIndex++ )
	{
		if ( allContent[contentIndex].className == "tabLabelSelected" )
		{
			var parts = allContent[contentIndex].id.split( "_" );
			parts.pop();
			return createTab( parts.join( "_" ) );
		}
	}
	return null;
}

function Tab( tabID )
{
	function SetEnabled( on )
	{
    	var prev                        = parseInt( tabID.replace( 'tab' , '' ) ) - 1;
        var prevID                      = 'tab' + prev + '_bottom';
	    var previousBottom              = document.getElementById( prevID );
		var qualifier					= ( on ? "Selected" : "" );
		if (tabID == 'tab1' && !on)
		    this.elementTop.className   = "tabLabelBottom";
		else 
		{
		    if (tabID != 'tab1' && on)
	            previousBottom.className = "tabLabelTop";
		    else if (prevID != __tabControlCurrent.elementID && tabID != 'tab1')
    		    previousBottom.className = "tabLabelBottom";
    		this.elementTop.className	= "tabLabelTop"		+ qualifier;
    	}
		this.elementCenter.className	= "tabLabel"		+ qualifier;
		this.elementBottom.className	= "tabLabelBottom"	+ qualifier;
		with ( this.elementContent.style )
		{
			visibility	= on ? "visible" : "hidden";
			display		= on ? "block" : "none";
		}
		this.elementArrow.className = on ? "tabArrow" : "tabArrowHidden";
	}
	this.SetEnabled = SetEnabled;
	
	this.elementID		= tabID;
	this.elementContent	= document.getElementById( tabID );
	this.elementTop		= document.getElementById( tabID + "_top" );
	this.elementCenter	= document.getElementById( tabID + "_center" );
	this.elementBottom	= document.getElementById( tabID + "_bottom" );
	this.elementArrow	= document.getElementById( tabID + "_arrow" );
}

}
/*
     FILE ARCHIVED ON 21:45:22 Feb 28, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 11:47:45 Dec 30, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.991
  exclusion.robots: 0.019
  exclusion.robots.policy: 0.009
  esindex: 0.011
  cdx.remote: 39.454
  LoadShardBlock: 6148.01 (3)
  PetaboxLoader3.datanode: 5587.954 (4)
  PetaboxLoader3.resolve: 589.93 (2)
  load_resource: 460.738
*/