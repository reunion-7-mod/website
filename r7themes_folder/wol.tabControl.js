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


if(typeof Ms=="undefined")
Ms={};
if(typeof Ms.Wol=="undefined")
Ms.Wol={};
if(typeof Ms.Wol.TabControl=="undefined")
Ms.Wol.TabControl={};
Ms.Wol.TabControl=function()
{
$(document).ready(b);
var a={_sCurrentQuery:location.search.toLowerCase(),_sControlClass:"tabBody",_sTabClass:"tabLink",_sSelTabClass:"tabLinkSelected",_sTcPrevClass:"tabChangerLinkPrevious",_sTcNextClass:"tabChangerLinkNext",_sTcDsblClass:"tabChangerDisabled",_sNavLnkClass:"navigationLink",_sTabCntClass:"tabContent",_sTabCntEnblClass:"tabContentEnabled",_sTabLnkEnblClass:"tabLinkEnabled",_sBaseIdAttrName:"baseId",_sTgtIdAttrName:"targetElementId",_iPbRetryWaitMs:100,_iPbRetryMaxMs:10000,_aSelTabIdTbl:[],_sPostBackOriginCtrlId:null,_sPostBackOriginElementId:null,_UpdSelTabIdTbl:function(c,d)
{
if(c!=null&&d!=null)
{
var a=$(c),
b=$(d);
if(a.attr("id")!=null&&b.attr("id")!=null&&a.attr(this._sBaseIdAttrName)!=null&&b.attr(this._sBaseIdAttrName)!=null)
this._aSelTabIdTbl[a.attr(this._sBaseIdAttrName)]=[a.attr("id"),b.attr(this._sBaseIdAttrName),b.attr("id")]
}
},_ParseTargetUrl:function(b,c)
{
if(b!=null)
{
var d=new RegExp(".*\\?.*?"+c+"=([a-z0-9]*?)(?:&.*)?$","i"),
a=d.exec(b);
if(a!=null&&a.length>1)
return a[1]
}
return null
},_AttachTab:function(a)
{
if(typeof a!="undefined")
if(a.hasClass(this._sTabClass))
if(!a.hasClass(this._sSelTabClass))
Ms.Wol.TabControl.ChangeTab(a)
},_AttachTabChanger:function(a)
{
if(!a.hasClass(this._sTcDsblClass))
{
var b=a.attr(this._sTgtIdAttrName);
if(typeof b!="undefined")
Ms.Wol.TabControl.ChangeTab($("#"+b))
}
},_TabChange:function(a)
{
Ms.Wol.TabControl.TabChangeEvent.Raise(a)
},_ShowTab:function(c,b)
{
c.addClass(a._sTabLnkEnblClass);
b.addClass(a._sTabCntEnblClass);
b.css("visibility","visible")
}};
function b()
{
if(Sys!=null&&Sys.WebForms!=null&&Sys.WebForms.PageRequestManager!=null)
{
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function()
{
$("."+a._sControlClass).each(function()
{
$("#"+$(this).attr("id")+" ."+a._sTabCntClass+" ."+a._sNavLnkClass).click(function()
{
return Ms.Wol.TabControl.CaptureContentLink(this,$(this).parents("."+a._sControlClass))
});
$("#"+$(this).attr("id")+" a."+a._sTcPrevClass).click(function()
{
a._AttachTabChanger($(this));
return false
});
$("#"+$(this).attr("id")+" a."+a._sTcNextClass).click(function()
{
a._AttachTabChanger($(this));
return false
})
})
});
Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(function(d,c)
{
var b=c.get_postBackElement().id;
if(typeof b!="undefined")
if($("#"+b).hasClass(a._sTabClass))
{
a._sPostBackOriginElementId=b;
a._sPostBackOriginCtrlId=$("#"+b).parents("."+a._sControlClass).get(0).id
}
});
Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function()
{
if(a._sPostBackOriginCtrlId!=null&&a._sPostBackOriginElementId!=null)
{
var c=$("#"+a._sPostBackOriginElementId),
b=$("#"+a._sPostBackOriginCtrlId+" ."+a._sTabCntClass);
a._ShowTab(c,b);
a._sPostBackOriginElementId=null;
a._sPostBackOriginCtrlId=null
}
})
}
$("."+a._sControlClass).each(function()
{
var c=$(this).find("."+a._sSelTabClass),
d=$(this).find("."+a._sTabCntClass);
a._UpdSelTabIdTbl($(this),c);
if(a._sCurrentQuery.indexOf($(this).attr(a._sBaseIdAttrName).toLowerCase())<0)
if(Ms.Wol.Cookies!=null)
{
var b=Ms.Wol.Cookies.GetCookie($(this).attr(a._sBaseIdAttrName));
if(b!=null&&$(this).find("#"+b).length>0)
if(!$(this).find("#"+b).hasClass(a._sSelTabClass))
{
Ms.Wol.TabControl.ChangeTab($(this).find("#"+b));
return
}
}
a._ShowTab(c,d)
});
$("a."+a._sTabClass).click(function()
{
a._AttachTab($(this));
return false
})
}
return {CaptureContentLink:function(d,c)
{
if(d!=null&&c!=null)
{
var h=$(d),
e=$(d).attr("href"),
f=false,
g=null,
b=null;
if(e==null)
return true;
b=a._ParseTargetUrl(e,c.attr(a._sBaseIdAttrName));
if(b==null)
return true;
$("#"+c.attr("id")+" ."+a._sTabClass).each(function()
{
if($(this).attr(a._sBaseIdAttrName).toLowerCase()==b.toLowerCase())
{
jqoTargetElement=$(this);
f=true;
return false
}
});
if(f)
{
Ms.Wol.TabControl.ChangeTab(jqoTargetElement);
return false
}
}
return true
},ChangeTab:function(b)
{
if(typeof b!="undefined")
{
a._TabChange(b.get(0));
var e=b.parents("."+a._sControlClass),
c=e.attr(a._sBaseIdAttrName),
d=$("#"+a._aSelTabIdTbl[c][2]);
d.removeClass(a._sSelTabClass);
d.removeClass(a._sTabLnkEnblClass);
b.addClass(a._sSelTabClass);
if(c!=null)
a._UpdSelTabIdTbl(e,b);
Ms.Wol.Cookies.SetCookie(c,b.attr("id"));
Ms.Wol.TabControl.TryPostBack(b.attr("id"))
}
},TryPostBack:function(c,b)
{
if(c!=null)
{
if(b==null)
b=0;
if(b<a._iPbRetryMaxMs)
{
var d=Sys.WebForms.PageRequestManager.getInstance().get_isInAsyncPostBack();
if(d==true)
setTimeout(function()
{
Ms.Wol.TabControl.TryPostBack(c,b+a._iPbRetryWaitMs)
},a._iPbRetryWaitMs);
else
__doPostBack(c.replace(/_/g,"$"),"")
}
}
},NoOp:function()
{
},TabChangeEvent:new Wol.Util.CustomEvent}
}()


}
/*
     FILE ARCHIVED ON 14:40:20 Mar 03, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:27:27 Dec 27, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.594
  exclusion.robots: 0.02
  exclusion.robots.policy: 0.01
  esindex: 0.016
  cdx.remote: 19.073
  LoadShardBlock: 220.517 (3)
  PetaboxLoader3.datanode: 212.95 (4)
  load_resource: 257.517
  PetaboxLoader3.resolve: 234.921
*/