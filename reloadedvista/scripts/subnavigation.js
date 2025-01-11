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

function subnavOn ( buttonID, area )
			{
				
				var button = document.getElementById(buttonID);
				if (button.className.indexOf('Selected') < 0)
				{
					var newClassName;
					switch (area)
					{
						case 'Vista':
							newClassName = 'subNavigationVistaHover';
							break;
						case 'IE':
							newClassName = 'subNavigationIEHover';
							break;
						case 'Using':
							newClassName = 'subNavigationUsingHover';
							break;
						case 'VirtualPC':
							newClassName = 'subNavigationVirtualPCHover';
							break;
						default:
							newClassName = 'subNavigationVistaHover';
					}
					button.className = newClassName;
				}
			}
			function subnavOff ( buttonID, area)
			{
				var button = document.getElementById(buttonID);
				if (button.className.indexOf('Selected') < 0)
				{
					var newClassName;
					switch (area)
					{
						case 'Vista':
							newClassName = 'subNavigationVista';
							break;
						case 'IE':
							newClassName = 'subNavigationIE';
							break;
						case 'Using':
							newClassName = 'subNavigationUsing';
							break;
						case 'VirtualPC':
							newClassName = 'subNavigationVirtualPC';
							break;
						default:
							newClassName = 'subNavigationVista';
					}
					button.className = newClassName;
				}
			}

}
/*
     FILE ARCHIVED ON 21:42:07 Feb 28, 2007 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 11:47:43 Dec 30, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 1.3
  exclusion.robots: 0.041
  exclusion.robots.policy: 0.018
  esindex: 0.017
  cdx.remote: 5.789
  LoadShardBlock: 100.379 (3)
  PetaboxLoader3.datanode: 92.831 (4)
  PetaboxLoader3.resolve: 81.914 (2)
  load_resource: 83.82
*/