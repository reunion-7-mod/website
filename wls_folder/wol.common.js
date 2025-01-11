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


Type.registerNamespace("Wol.Util");
Wol.Util.TypeCheck={StringType:1,NumberType:2,BooleanType:4,isString:function(a)
{
if(a==undefined||a==null)
return false;
else
if(typeof a=="string")
return true;
else
if(a instanceof String)
return true;
else
return false
},isNumber:function(a)
{
if(a==undefined||a==null)
return false;
else
if(typeof a=="number")
return true;
else
if(a instanceof Number)
return true;
else
return false
},isBoolean:function(a)
{
if(a==undefined||a==null)
return false;
else
if(typeof a=="boolean")
return true;
else
if(a instanceof Boolean)
return true;
else
return false
},isOfType:function(c,b)
{
Sys.Debug.assert(arguments.length==2);
if(!Wol.Util.TypeCheck.isNumber(b))
throw Error.argument("type","type must be integer!");
var a=false;
if(b|Wol.Util.TypeCheck.StringType==Wol.Util.TypeCheck.StringType)
{
a=Wol.Util.TypeCheck.isString(c);
if(a==true)
return true
}
if(b|Wol.Util.TypeCheck.StringType==Wol.Util.TypeCheck.NumberType)
{
a=Wol.Util.TypeCheck.isNumber(c);
if(a==true)
return true
}
if(b|Wol.Util.TypeCheck.StringType==Wol.Util.TypeCheck.BooleanType)
{
a=Wol.Util.TypeCheck.isBoolean(c);
if(a==true)
return true
}
return a
}};
Wol.Util.Event=function(a)
{
Sys.Debug.assert(arguments.length<=1);
if(a)
{
Sys.Debug.assert(Wol.Util.TypeCheck.isString(a));
this._name=a
}
else
this._name="GenericEvent"
};
Wol.Util.Event.prototype={get_events:function()
{
if(!this._events)
this._events=new Sys.EventHandlerList;
return this._events
},addHandler:function(a)
{
Sys.Debug.assert(arguments.length==1);
Sys.Debug.assert(a!=undefined&&a!=null);
this.get_events().addHandler(this._name,a)
},removeHandler:function(a)
{
Sys.Debug.assert(arguments.length==1);
Sys.Debug.assert(a!=undefined&&a!=null);
this.get_events().removeHandler(this._name,a)
},raiseEvent:function(a)
{
Sys.Debug.assert(arguments.length<=1);
var b=this.get_events().getHandler(this._name);
if(b)
{
if(a==undefined||a==null)
a=Sys.EventArgs.Empty;
b(this,a)
}
}};
Wol.Util.Event.registerClass("Wol.Util.Event");
Wol.Util.RefCountEvent=function()
{
Wol.Util.RefCountEvent.initializeBase(this);
this._handlerList=[]
};
Wol.Util.RefCountEvent.prototype={get_HandlersCount:function()
{
return this._handlerList.length
},onHandlersChange:new Wol.Util.Event("on"+this._name+"_HandlersChange"),addHandler:function(a)
{
var b=false;
if(this._handlerList&&!Array.contains(this._handlerList,a))
{
Array.add(this._handlerList,a);
b=true
}
var c=Wol.Util.RefCountEvent.callBaseMethod(this,"addHandler",[a]);
if(b)
this.onHandlersChange.raiseEvent();
return c
},removeHandler:function(b)
{
var a=false;
if(this._handlerList)
{
Array.remove(this._handlerList,b);
a=true
}
var c=Wol.Util.RefCountEvent.callBaseMethod(this,"removeHandler",[b]);
if(a)
this.onHandlersChange.raiseEvent();
return c
}};
Wol.Util.RefCountEvent.registerClass("Wol.Util.RefCountEvent",Wol.Util.Event);
Wol.Util.Tools={cloneProperties:function(c,d,a)
{
Sys.Debug.assert(arguments.length==3);
Sys.Debug.assert(c!=undefined&&c!=null);
Sys.Debug.assert(d!=undefined&&d!=null);
Sys.Debug.assert(a!=undefined&&a!=null&&a.length>=0);
for(var b=0;b<a.length;b++)
d[a[b]]=c[a[b]].clone()
}};
Wol.Util.HashParameters={Regex:new RegExp("([^&#=]*)=([^&]*)","g"),NullValue:"nil",onHashChange:new Wol.Util.RefCountEvent("hashChangeEvent"),Get:function(c)
{
var a=null;
if(c&&c!="")
{
var b=window.location.hash;
if(b&&b!=""&&b!="#")
{
var d=this._FindParamMatch(b,c);
if(d)
a=d[2]
}
}
if(a==Wol.Util.HashParameters.NullValue)
a=null;
return a
},Set:function(d,f)
{
if(d&&d!="")
{
var b=this._EncodeParam(d,f),
a=this._GetHash(),
c=a;
if(a&&a!=""&&a!="#")
{
var e=this._FindParamMatch(a,d);
if(e!=null)
c=this._ReplaceMatch(a,e,b);
else
if(b!="")
c=a+"&"+b
}
else
if(b!="")
c="#"+b;
if(a!=c)
this._SetHash(c)
}
},InitializeEvents:function()
{
var a=Wol.Util.HashParameters;
a._hashLastValue=a._GetHash();
var b=function()
{
if(!a._hashEmulationEnabled||a.onHashChange.get_HandlersCount()==0)
{
clearInterval(a._hashEmulationTimer);
a._hashEmulationTimer=null
}
else
if(!a._hashEmulationTimer)
a._hashEmulationTimer=setInterval(a._EvaluateHashChange,a._hashEmulationInterval)
};
a.onHashChange.onHandlersChange.addHandler(b);
var c=function(c)
{
if(a._hashEmulationEnabled)
{
a._hashEmulationEnabled=false;
b()
}
a.onHashChange.raiseEvent(c)
};
$addHandler(window,"hashchange",c)
},_hashEmulationEnabled:true,_hashEmulationInterval:300,_hashEmulationTimer:null,_hashLastValue:null,_EvaluateHashChange:function()
{
var a=Wol.Util.HashParameters,
b=a._GetHash();
if(a._hashLastValue!=b)
{
a._hashLastValue=b;
a.onHashChange.raiseEvent();
return true
}
else
return false
},_GetHash:function()
{
return window.location.hash
},_SetHash:function(a)
{
window.location.hash=a
},_FindParamMatch:function(d,c)
{
var b=this.Regex,
a=null;
b.lastIndex=0;
do
{
a=b.exec(d);
if(this._IsParamMatch(a,c))
break
}while(a!=null);
return a
},_IsParamMatch:function(a,b)
{
return a&&a.length&&a.length==3&&a[1].toLowerCase()==b.toLowerCase()
},_ReplaceMatch:function(b,c,f)
{
var a=b.substr(0,c.index),
e="",
d=c.index+c[0].length;
if(d<b.length)
e=b.substr(d);
if(f==""&&a.charAt(a.length-1)=="&")
a=a.slice(0,-1);
b=a+f+e;
return b
},_EncodeParam:function(c,a)
{
var b="";
if(a&&a!=null&&a!="")
{
a=encodeURI(a);
b=c+"="+a
}
else
b=c+"="+Wol.Util.HashParameters.NullValue;
return b
}};
Wol.Util.CustomEvent=function()
{
var a={_oSourceElement:null};
return {Handlers:{},Attach:function(a,b)
{
if(b!=null&&a!=null)
this.Handlers[a]=b
},Detach:function(a)
{
if(a!=null&&this.Handlers[a]!="undefined")
delete this.Handlers[a]
},Raise:function(c)
{
a._oSourceElement=typeof c!="undefined"?c:null;
for(var b in this.Handlers)
this.Handlers[b](a._oSourceElement)
}}
};
Wol.Util.HashParameters.InitializeEvents();
if(typeof Ms=="undefined")
Ms={};
if(typeof Ms.Wol=="undefined")
Ms.Wol={};
if(typeof Ms.Wol.Cookies=="undefined")
Ms.Wol.Cookies={};
Ms.Wol.Cookies=function()
{
$(document).ready(b);
var a={_bCookiesEnabled:false,_bUniquePageIdAvailable:false,_sUniquePageIdValue:null,_sCookieNs:"Ms.Wol.",_GetCookieEnabledState:function()
{
document.cookie="cookiesEnabled=true;";
return document.cookie.indexOf("cookiesEnabled=true")>-1?true:false
},_BuildCookie:function(b)
{
return a._sCookieNs+a._sUniquePageIdValue+"."+b
}};
function b()
{
a._bCookiesEnabled=a._GetCookieEnabledState();
if(typeof PageData!="undefined")
if(typeof PageData.TopLevelAssetSystemId!="undefined")
{
a._sUniquePageIdValue=PageData.TopLevelAssetSystemId;
a._bUniquePageIdAvailable=true
}
}
return {SetCookie:function(c,b)
{
if(a._bUniquePageIdAvailable&&a._bCookiesEnabled&&c!=null&&b!=null)
document.cookie=a._BuildCookie(c)+"="+escape(b)
},GetCookie:function(e)
{
if(a._bUniquePageIdAvailable&&a._bCookiesEnabled&&e!=null)
{
var f=a._BuildCookie(e),
c=document.cookie.split("; ");
for(var b=0;b<c.length;b++)
{
var d=c[b].split("=");
if(f==d[0])
return unescape(d[1])
}
}
return null
}}
}();
Type.registerNamespace("Wol.Logging");
Wol.Logging.InternalVars=function()
{
this._isEnabled=false;
this._isClickThroughEnabled=true;
this._isLoggerReady=false;
this._shouldIgnoreError=true;
this._loggerReadyEvent=new Wol.Util.Event("loggerReadyEvent");
this._requiredLoggerTemplate=null;
this._commonLoggerTemplate=null
};
var WolLoggingVars=new Wol.Logging.InternalVars;
Wol.Logging={isEnabled:function()
{
return WolLoggingVars._isEnabled
},isClickThroughEnabled:function()
{
return WolLoggingVars._isClickThroughEnabled
},shouldIgnoreError:function()
{
return WolLoggingVars._shouldIgnoreError
},isLoggerReady:function()
{
return WolLoggingVars._isLoggerReady
},loggerReadyEvent:function()
{
return WolLoggingVars._loggerReadyEvent
},requiredLoggerTemplate:function()
{
return WolLoggingVars._requiredLoggerTemplate
},commonLoggerTemplate:function()
{
return WolLoggingVars._commonLoggerTemplate
},getTargetUrlElement:function(a)
{
if(arguments.length!=1)
throw Error.argument();
if(a==undefined||a==null)
return null;
if(a.href!=null&&a.href!=undefined&&a.tagName!=null&&a.tagName!=undefined&&a.tagName.toUpperCase()=="A")
return a;
else
return this.getTargetUrlElement(a.parentElement||a.parentNode)
},getTargetUrl:function(b)
{
var a=this.getTargetUrlElement(b);
if(a==undefined||a==null)
return null;
else
return a.href
},_getKeyValue:function(d,g,f,e)
{
if(d&&g&&e&&f)
{
var a=d.split(e);
if(a&&a.length>0)
for(i=0;i<a.length;i++)
{
var b=a[i].replace(/^\s+|\s+$\g/,""),
c=g+f;
if(b.indexOf(c)==0&&b.length>c.length)
return b.substring(c.length)
}
}
return null
},_getCookie:function(a)
{
var b=document.cookie;
if(b&&a)
return Wol.Logging._getKeyValue(b,a,"=",";");
return null
},_getUserIdCookie:function()
{
var a=Wol.Logging._getCookie("A");
if(a&&a!="")
return Wol.Logging._getKeyValue(a,"I","=","&");
return null
},getVisitor:function()
{
try
{
var a=Wol.Logging._getUserIdCookie();
if(a!=undefined&&a!=null)
a=a.replace(/-/g,"");
return a
}
catch(b)
{
if(WolLoggingVars._shouldIgnoreError)
return null;
else
throw b
}
},_getEncodedLengthForScalar:function(a)
{
if(a==undefined||a==null)
return 0;
else
if(Wol.Util.TypeCheck.isOfType(a,Wol.Util.TypeCheck.StringType|Wol.Util.TypeCheck.NumberType|Wol.Util.TypeCheck.BooleanType))
return escape(a.toString()).length;
else
throw Error.argument("value","_getEncodedLengthForScalar value parameter must be string, int or boolean type!")
},_getEncodedLength:function(a)
{
Sys.Debug.assert(arguments.length==1);
if(a instanceof Array)
{
var c=0;
for(var b=0;b<a.length;b++)
c+=Wol.Logging._getEncodedLengthForScalar(a[b])+1;
return c
}
else
return Wol.Logging._getEncodedLengthForScalar(a)
},normalizeToLowerCaseString:function(a)
{
if(a!=null&&a!=undefined)
return a.toString().toLowerCase();
else
return a
}};
Wol.Logging.WhenReady={register:function(a)
{
if(Wol.Logging.isLoggerReady())
a();
else
Wol.Logging.loggerReadyEvent().addHandler(a)
}};
Wol.Logging.Const={MaxAllowedUrlLength:2083,BaseUrlLength:380,LinkClickOverhead:600,PropOverhead:5};
Wol.Logging.Const.FieldName={Channel:"channel",PageName:"pageName",PageUrl:"pageURL",Referrer:"referrer",Site:"prop1",RequestedCulture:"prop2",Title:"prop3",ContentPurpose:"prop4",Provider:"prop5",ContentSet:"prop6",TopicArea:"prop7",ContentType:"prop8",TabAssetUsageId:"prop9",SilverlightVersion:"prop10",FlashVersion:"prop11",TargetUrl:"prop12",InteractionId:"prop13",Application:"prop14",BwcSku:"prop15",OSSku:"prop16",TabControlIds:"prop17",TabAssetUsageIds:"prop18",FailedAssetId:"prop19",StatusCode:"prop20",Lcid:"prop21",TopLevelAssetRev:"prop28",ChildAssetIds:"prop29",TopLevelAssetId:"prop30",SearchResultCount:"prop31",SearchTerm1:"prop32",SearchTerm2:"prop33",SearchTerm3:"prop34",SearchTerm4:"prop35",SearchResultClickPosition:"prop36",IsBestBetPresent:"prop37",IsClickedBestBet:"prop38",QueryId:"prop39",FeedbackId:"prop49",Rating:"prop50",VerboseFeedback1:"eVar1",VerboseFeedback2:"eVar2",VerboseFeedback3:"eVar3",VerboseFeedback4:"eVar4",VerboseFeedback5:"eVar5",VerboseFeedback6:"eVar6",VerboseFeedback7:"eVar7",VerboseFeedback8:"eVar8",VerboseFeedback9:"eVar9",VerboseFeedback10:"eVar10",VerboseFeedback11:"eVar11",VerboseFeedback12:"eVar12",VerboseFeedback13:"eVar13",VerboseFeedback14:"eVar14",VerboseFeedback15:"eVar15",VerboseFeedback16:"eVar16"};
Wol.Logging.Const.InteractionTypeId={Click:0,PageLoad:1,PrimaryNavBar:2,SecondaryNavBar:3,Footer:4,PerformSearch:8,SearchResultClick:9,SearchSiteEscalation:10,ChangeSearchOption:11,SearchSpelling:12,TabClick:13,WauBuyButtonClick:15,WauPageLoad:16,SuperHeroClick:17,HeroMouseOver:18,HeroVideoStart:19,HeroVideoReachEnd:20,HeroVideoStop:21,HeroPageLoad:22,SubHeroClick:23,DownLevelHeroClick:24,TocBookNodeClick:25,Rating:26,VerboseFeedback:27,TertiaryNavBar:28,Header:29,TocTopicClick:30,SilverlightComponentLoaded:31,SilverlightPluginAvailable:32};
Wol.Logging.Const.FieldMaxLength={Channel:100,PageName:100,PageUrl:256,Referrer:255,Prop:100,EVar:100};
Wol.Logging.Const.PropNArray={Length:50,MaxLength:Wol.Logging.Const.FieldMaxLength.Prop,NamePrefix:"prop",NameStartingAt:1};
Wol.Logging.Const.EVarNArray={Length:50,MaxLength:Wol.Logging.Const.FieldMaxLength.EVar,NamePrefix:"eVar",NameStartingAt:1};
Wol.Logging.Const.ElementAttrib={InteractionTypeId:"logginginteractiontypeid",InteractionTypeIdSep:":",AdditionalProp:"loggingAdditionalProp",AdditionalPropSep:"_"};
Wol.Logging.Const.OmnitureWTMappings=[[Wol.Logging.Const.FieldName.Title,"WT.ti"]];
Wol.Logging.LogTypeEnum=function()
{
throw Error.notImplemented()
};
Wol.Logging.LogTypeEnum.prototype={ClickThrough:0,PageLoad:1};
Wol.Logging.LogTypeEnum.registerEnum("Wol.Logging.LogTypeEnum");
Wol.Logging.PropTypeEnum=function()
{
throw Error.notImplemented()
};
Wol.Logging.PropTypeEnum.prototype={Scalar:1,List:2,TableName:3,TableValue:4};
Wol.Logging.PropTypeEnum.registerEnum("Wol.Logging.PropTypeEnum");
Wol.Logging.ResultId=function()
{
throw Error.notImplemented()
};
Wol.Logging.ResultId.prototype={Success:0,GeneralFailure:1,LengthTooLongFailure:2};
Wol.Logging.ResultId.registerEnum("Wol.Logging.ResultId");
Wol.Logging.Prop=function(c,b,a,e,d)
{
Sys.Debug.assert(arguments.length>=2&&arguments.length<=5);
Sys.Debug.assert(Wol.Util.TypeCheck.isString(c));
Sys.Debug.assert(Wol.Util.TypeCheck.isNumber(b));
if(a!=undefined)
Sys.Debug.assert(Wol.Util.TypeCheck.isBoolean(a));
this.name=c;
this.maxLength=b;
this.isCaseSensitive=a||false;
this.type=e||Wol.Logging.PropTypeEnum.Scalar;
this.keyPropName=d;
this.value=null;
this.encodedLength=0
};
Wol.Logging.Prop.prototype={checkForNonScalarType:function()
{
Sys.Debug.assert(this.type==Wol.Logging.PropTypeEnum.List||this.type==Wol.Logging.PropTypeEnum.TableName||this.type==Wol.Logging.PropTypeEnum.TableValue)
},clone:function()
{
Sys.Debug.assert(arguments.length==0);
var a=new Wol.Logging.Prop(this.name,this.maxLength,this.isCaseSensitive,this.type,this.keyPropName);
if(this.type==Wol.Logging.PropTypeEnum.Scalar||this.value==undefined||this.value==null)
a.value=this.value;
else
{
a.value=[];
for(var b=0;b<this.value.length;b++)
a.value[b]=this.value[b]
}
a.encodedLength=this.encodedLength;
return a
},setValue:function(a,b)
{
Sys.Debug.assert(arguments.length==1||arguments.length==2);
if(this.isCaseSensitive)
this.value=a;
else
if(this.type==Wol.Logging.PropTypeEnum.Scalar)
this.value=Wol.Logging.normalizeToLowerCaseString(a);
else
if(a==undefined||a==null)
this.value=a;
else
{
this.value=new Array(a.length);
for(var c=0;c<a.length;c++)
this.value[c]=Wol.Logging.normalizeToLowerCaseString(a[c])
}
if(b==undefined||b==null||b==0)
this.encodedLength=Wol.Logging._getEncodedLength(this.value);
else
{
Sys.Debug.assert(b>=0);
this.encodedLength=b
}
},getValue:function()
{
Sys.Debug.assert(arguments.length==0);
if(this.type==Wol.Logging.PropTypeEnum.Scalar)
return this.value;
else
if(this.value!=null&&this.value!=undefined)
return this.value.join(",");
else
return null
},append:function(b,a)
{
this.checkForNonScalarType();
Sys.Debug.assert(arguments.length>=1&&arguments.length<=2);
if(this.value==undefined||this.value==null)
{
this.value=[];
this.encodedLength=0
}
if(!this.isCaseSensitive)
b=Wol.Logging.normalizeToLowerCaseString(b);
if(a==undefined||a==null||a==0)
a=Wol.Logging._getEncodedLength(b);
else
Sys.Debug.assert(this.encodedLength>=0);
this.value.push(b);
this.encodedLength+=a+1
},setAt:function(b,a)
{
this.checkForNonScalarType();
Sys.Debug.assert(arguments.length==2);
Sys.Debug.assert(this.value.length>b);
if(!this.isCaseSensitive)
a=Wol.Logging.normalizeToLowerCaseString(a);
var d=Wol.Logging._getEncodedLength(this.value[b]),
c=Wol.Logging._getEncodedLength(a);
this.value[b]=a;
this.encodedLength+=c-d
},indexOf:function(b)
{
this.checkForNonScalarType();
Sys.Debug.assert(arguments.length==1);
if(this.value==null||this.value==undefined)
return -1;
if(!this.isCaseSensitive)
b=Wol.Logging.normalizeToLowerCaseString(b);
for(var a=0;a<this.value.length;a++)
if(b.toString()==this.value[a].toString())
return a;
return -1
}};
Wol.Logging.Prop.registerClass("Wol.Logging.Prop");
Wol.Logging.PropArray=function(d,c,e,b,a)
{
Sys.Debug.assert(arguments.length==4||arguments.length==5);
Sys.Debug.assert(Wol.Util.TypeCheck.isNumber(d));
Sys.Debug.assert(Wol.Util.TypeCheck.isNumber(c));
Sys.Debug.assert(Wol.Util.TypeCheck.isString(e));
Sys.Debug.assert(Wol.Util.TypeCheck.isNumber(b));
if(a!=undefined)
Sys.Debug.assert(Wol.Util.TypeCheck.isBoolean(a));
Sys.Debug.assert(d>0);
Sys.Debug.assert(c>0);
Sys.Debug.assert(b>=0);
this.arrayLength=d;
this.propMaxLength=c;
this.namePrefix=e;
this.startingNameAppendix=b;
this.data=[];
if(!a)
this.init()
};
Wol.Logging.PropArray.prototype={init:function()
{
Sys.Debug.assert(arguments.length==0);
for(var a=0,
b=this.startingNameAppendix;a<this.arrayLength;a++,b++)
{
var c=new Wol.Logging.Prop(this.namePrefix+b.toString(),this.propMaxLength);
this.data[a]=c
}
},clone:function()
{
Sys.Debug.assert(arguments.length==0);
var b=new Wol.Logging.PropArray(this.arrayLength,this.propMaxLength,this.namePrefix,this.startingNameAppendix,true);
for(var a=0;a<this.data.length;a++)
b.data[a]=this.data[a].clone();
return b
},getAt:function(a)
{
Sys.Debug.assert(arguments.length==1);
if(Wol.Util.TypeCheck.isString(a))
a=Number.parseInvariant(a);
Sys.Debug.assert(Wol.Util.TypeCheck.isNumber(a));
Sys.Debug.assert(a>=this.startingNameAppendix&&a-this.startingNameAppendix<this.arrayLength);
return this.data[a-this.startingNameAppendix]
},findProp:function(a)
{
Sys.Debug.assert(arguments.length==1);
Sys.Debug.assert(Wol.Util.TypeCheck.isString(a));
if(a.indexOf(this.namePrefix)==0)
{
var b=a.substr(this.namePrefix.length);
return this.getAt(b)
}
return null
}};
Wol.Logging.PropArray.registerClass("Wol.Logging.PropArray");
Wol.Logging.LoggerTemplate=function(a)
{
try
{
if(arguments.length>1)
throw Error.argument();
var c=[Wol.Logging.Const.FieldName.Channel,Wol.Logging.Const.FieldName.PageName,Wol.Logging.Const.FieldName.PageUrl,Wol.Logging.Const.FieldName.Referrer],
h=["_props","_eVars"];
if(a!=undefined&&a!=null)
{
if(!(a instanceof Wol.Logging.LoggerTemplate))
throw Error.argumentType("template",typeof a,"Wol.Logging.LoggerTemplate");
this.set_omLogger(a.get_omLogger());
this.set_totalLength(a.get_totalLength());
this._maxEncodedLength=a._maxEncodedLength;
this._nonScalarProps=a._nonScalarProps;
Wol.Util.Tools.cloneProperties(a,this,c);
Wol.Util.Tools.cloneProperties(a,this,h)
}
else
{
this.set_totalLength(0);
this._maxEncodedLength=Wol.Logging.Const.MaxAllowedUrlLength-Wol.Logging.Const.BaseUrlLength;
this._nonScalarProps=[Wol.Logging.Const.FieldName.TabControlIds,Wol.Logging.Const.FieldName.TabAssetUsageIds,Wol.Logging.Const.FieldName.ChildAssetIds];
this[Wol.Logging.Const.FieldName.Channel]=new Wol.Logging.Prop(Wol.Logging.Const.FieldName.Channel,Wol.Logging.Const.FieldMaxLength.Channel);
this[Wol.Logging.Const.FieldName.PageName]=new Wol.Logging.Prop(Wol.Logging.Const.FieldName.PageName,Wol.Logging.Const.FieldMaxLength.PageName);
this[Wol.Logging.Const.FieldName.PageUrl]=new Wol.Logging.Prop(Wol.Logging.Const.FieldName.PageUrl,Wol.Logging.Const.FieldMaxLength.PageUrl);
this[Wol.Logging.Const.FieldName.Referrer]=new Wol.Logging.Prop(Wol.Logging.Const.FieldName.Referrer,Wol.Logging.Const.FieldMaxLength.Referrer);
this._props=new Wol.Logging.PropArray(Wol.Logging.Const.PropNArray.Length,Wol.Logging.Const.PropNArray.MaxLength,Wol.Logging.Const.PropNArray.NamePrefix,Wol.Logging.Const.PropNArray.NameStartingAt);
this._eVars=new Wol.Logging.PropArray(Wol.Logging.Const.EVarNArray.Length,Wol.Logging.Const.EVarNArray.MaxLength,Wol.Logging.Const.EVarNArray.NamePrefix,Wol.Logging.Const.EVarNArray.NameStartingAt);
this._initNonScalarProps()
}
this._allProps=[];
for(var b=0;b<c.length;b++)
this._allProps.push(this[c[b]]);
this._allProps=this._allProps.concat(this._props.data).concat(this._eVars.data);
var d=[Wol.Logging.Const.FieldName.Channel,Wol.Logging.Const.FieldName.PageName,Wol.Logging.Const.FieldName.PageUrl,Wol.Logging.Const.FieldName.Referrer,Wol.Logging.Const.FieldName.RequestedCulture,Wol.Logging.Const.FieldName.ContentPurpose,Wol.Logging.Const.FieldName.ContentSet,Wol.Logging.Const.FieldName.TopicArea,Wol.Logging.Const.FieldName.ContentType,Wol.Logging.Const.FieldName.TabAssetUsageId,Wol.Logging.Const.FieldName.TargetUrl,Wol.Logging.Const.FieldName.InteractionId,Wol.Logging.Const.FieldName.Application,Wol.Logging.Const.FieldName.BwcSku,Wol.Logging.Const.FieldName.OSSku,Wol.Logging.Const.FieldName.TabControlIds,Wol.Logging.Const.FieldName.TabAssetUsageIds,Wol.Logging.Const.FieldName.FailedAssetId,Wol.Logging.Const.FieldName.StatusCode,Wol.Logging.Const.FieldName.Lcid,Wol.Logging.Const.FieldName.IsBestBetPresent,Wol.Logging.Const.FieldName.IsClickedBestBet,Wol.Logging.Const.FieldName.QueryId,Wol.Logging.Const.FieldName.FeedbackId],
e={};
for(var b=0;b<d.length;b++)
e[d[b]]=true;
for(var b=0;b<this._allProps.length;b++)
{
var f=this._allProps[b];
f.isCaseSensitive=e[f.name]==true?false:true
}
}
catch(g)
{
this.throwOrIgnore(g)
}
};
Wol.Logging.LoggerTemplate.prototype={get_omLogger:function()
{
return this._omLogger
},set_omLogger:function(a)
{
this._omLogger=a
},get_totalLength:function()
{
return this._totalLength
},set_totalLength:function(a)
{
this._totalLength=a
},setScalar:function(g,a)
{
try
{
if(arguments.length!=2)
throw Error.argument();
var b=this._getAndValidateProp(g,Wol.Logging.PropTypeEnum.Scalar);
if(!Wol.Util.TypeCheck.isOfType(a,Wol.Util.TypeCheck.StringType|Wol.Util.TypeCheck.NumberType|Wol.Util.TypeCheck.BooleanType)&&a!=null)
throw Error.argumentType("propValue",Object.getType(a),String);
if(a!=null)
a=this._replaceInvalidCharsWithSpace(a);
var c=Wol.Logging._getEncodedLengthForScalar(a),
d=c-b.encodedLength;
if(c==0)
d-=Wol.Logging.Const.PropOverhead;
if(b.encodedLength==null||b.encodedLength==undefined||b.encodedLength==0)
d+=Wol.Logging.Const.PropOverhead;
var e=this.get_totalLength()+d;
if(e>this._maxEncodedLength)
return Wol.Logging.ResultId.LengthTooLongFailure;
else
{
b.setValue(a,c);
this.set_totalLength(e);
return Wol.Logging.ResultId.Success
}
}
catch(f)
{
return this.throwOrIgnore(f)
}
},insertIntoList:function(c,a)
{
try
{
if(arguments.length!=2)
throw Error.argument();
if(c==null||c==undefined||c=="")
throw Error.argumentNull("propName","propName must be a valid omniture property name!");
var b=this._getAndValidateProp(c,Wol.Logging.PropTypeEnum.List);
a=this._getValidatedNonScalarPropValue(a);
var h=b.indexOf(a);
if(h>=0)
return Wol.Logging.ResultId.Success;
var d=Wol.Logging._getEncodedLengthForScalar(a),
e=0;
if(b.encodedLength==null||b.encodedLength==undefined||b.encodedLength==0)
e=d+Wol.Logging.Const.PropOverhead;
else
e=d+1;
var f=this.get_totalLength()+e;
if(f>this._maxEncodedLength)
return Wol.Logging.ResultId.LengthTooLongFailure;
else
{
b.append(a,d);
this.set_totalLength(f);
return Wol.Logging.ResultId.Success
}
}
catch(g)
{
return this.throwOrIgnore(g)
}
},insertIntoTable:function(c,e)
{
try
{
if(arguments.length!=2)
throw Error.argument();
if(c==null||c==undefined||c.length<2||!(c instanceof Array))
throw Error.argument("propNames");
if(e==null||e==undefined||e.length<2||!(e instanceof Array))
throw Error.argument("propValues");
if(c.length!=e.length)
throw Error.argument("propNamespropValues","propNames and propValues array length are different!");
var b=[],
f=[];
for(var a=0;a<c.length;a++)
{
var h=c[a],
k=e[a];
if(h==null||h==undefined||h=="")
throw Error.argumentNull("propName","propName must be a valid omniture property name!");
var t=this._getAndValidateProp(h,a==0?Wol.Logging.PropTypeEnum.TableName:Wol.Logging.PropTypeEnum.TableValue);
k=this._getValidatedNonScalarPropValue(k);
b[a]=t;
f[a]=k
}
var p=b[0].keyPropName;
for(a=1;a<b.length;a++)
if(b[a].keyPropName!=p)
throw Error.create("Wol.Logging.MultipleKeyPropNamesException");
var m=0;
for(a=0;a<this._nonScalarProps.length;a++)
{
var o=this._get(this._nonScalarProps[a]);
if(o.keyPropName==p)
{
m++;
var r=false;
for(var l=0;l<b.length;l++)
if(b[l].name==o.name)
{
r=true;
break
}
if(!r)
throw Error.create("Wol.Logging.MissingPropException")
}
}
if(m!=b.length)
throw Error.create("Wol.Logging.DuplicatePropNamesException");
var s=b[0].indexOf(f[0]),
d;
if(s>=0)
{
var g=[],
n=0;
for(a=1;a<b.length;a++)
{
g[a]=b[a].clone();
g[a].setAt(s,f[a]);
n+=g[a].encodedLength-b[a].encodedLength
}
d=this.get_totalLength()+n;
if(d>this._maxEncodedLength)
return Wol.Logging.ResultId.LengthTooLongFailure;
else
{
for(a=1;a<b.length;a++)
b[a].setValue(g[a].value,g[a].encodedLength);
this.set_totalLength(d);
return Wol.Logging.ResultId.Success
}
}
else
{
var j=0,
i=[];
for(a=0;a<b.length;a++)
{
i[a]=Wol.Logging._getEncodedLengthForScalar(f[a]);
j+=i[a]+1
}
if(b[0].encodedLength==null||b[0].encodedLength==undefined||b[0].encodedLength==0)
j+=b.length*Wol.Logging.Const.PropOverhead;
d=this.get_totalLength()+j;
if(d>this._maxEncodedLength)
return Wol.Logging.ResultId.LengthTooLongFailure;
else
{
for(a=0;a<b.length;a++)
b[a].append(f[a],i[a]);
this.set_totalLength(d);
return Wol.Logging.ResultId.Success
}
}
}
catch(q)
{
return this.throwOrIgnore(q)
}
},throwOrIgnore:function(a)
{
if(Wol.Logging.shouldIgnoreError())
return Wol.Logging.ResultId.GeneralFailure;
else
throw a
},_initNonScalarProps:function()
{
var b=this._props.findProp(Wol.Logging.Const.FieldName.TabControlIds);
b.type=Wol.Logging.PropTypeEnum.TableName;
b.keyPropName=Wol.Logging.Const.FieldName.TabControlIds;
var a=this._props.findProp(Wol.Logging.Const.FieldName.TabAssetUsageIds);
a.type=Wol.Logging.PropTypeEnum.TableValue;
a.keyPropName=Wol.Logging.Const.FieldName.TabControlIds;
var c=this._props.findProp(Wol.Logging.Const.FieldName.ChildAssetIds);
c.type=Wol.Logging.PropTypeEnum.List
},_getValidatedNonScalarPropValue:function(a)
{
if(!Wol.Util.TypeCheck.isOfType(a,Wol.Util.TypeCheck.StringType|Wol.Util.TypeCheck.NumberType|Wol.Util.TypeCheck.BooleanType))
throw Error.argumentType("propValue",Object.getType(a),String);
a=a.toString().replace(/[,]+/g," ");
var b=this._replaceInvalidCharsWithSpace(a);
if(b==""||b==" ")
throw Error.argument("propValue","Empty propValue is not allowed for non-scalar type");
return b
},_getAndValidateProp:function(b,c)
{
if(b==null||b==undefined||b=="")
throw Error.argumentNull("propName","propName must be a valid omniture property name!");
var a=this._get(b);
if(a==undefined||a==null||!(a instanceof Wol.Logging.Prop))
throw Error.argument("Can not find prop for given propName");
else
if(a.type!=c)
throw Error.argument("Invalid property type.");
return a
},_get:function(b)
{
var a=this[b];
if(a&&a instanceof Wol.Logging.Prop)
return a;
a=this._props.findProp(b);
if(a&&a instanceof Wol.Logging.Prop)
return a;
return this._eVars.findProp(b)
},_replaceInvalidCharsWithSpace:function(a)
{
return a.toString().replace(/[\s\u2122]+/g," ")
}};
Wol.Logging.LoggerTemplate.registerClass("Wol.Logging.LoggerTemplate");
Wol.Logging.Logger=function(c,a,b)
{
try
{
if(arguments.length<1||arguments.length>3)
throw Error.argument("invalid number of arguments!");
if(!(c instanceof Wol.Logging.LoggerTemplate))
throw Error.argumentType("template",Object.getType(c),Wol.Logging.LoggerTemplate);
Wol.Logging.Logger.initializeBase(this,[c]);
if(a==undefined||a==null)
a=Wol.Logging.LogTypeEnum.ClickThrough;
if(!Wol.Util.TypeCheck.isNumber(a))
throw Error.argumentType("loggingType",Object.getType(a),Number);
this.loggingType=a;
this.srcElement=b;
if(a==Wol.Logging.LogTypeEnum.ClickThrough&&b!=null&&b!=undefined)
{
this._maxEncodedLength=Wol.Logging.Const.MaxAllowedUrlLength-Wol.Logging.Const.BaseUrlLength-Wol.Logging.Const.LinkClickOverhead;
var e=Wol.Logging.getTargetUrl(b);
this.setScalar(Wol.Logging.Const.FieldName.TargetUrl,e)
}
else
this._maxEncodedLength=Wol.Logging.Const.MaxAllowedUrlLength-Wol.Logging.Const.BaseUrlLength;
if(this.get_totalLength()>this._maxEncodedLength)
throw Error.create("Wol.Logging.LengthTooLongException")
}
catch(d)
{
this.throwOrIgnore(d)
}
};
Wol.Logging.Logger.prototype.logToWT=function()
{
try
{
if(arguments.length>0)
throw Error.argument();
var a=[],
d=Wol.Logging.Const.OmnitureWTMappings;
for(var c=0;c<d.length;c++)
{
var b=d[c];
if(b==null||b==undefined)
continue;
var f=this._get(b[0]),
g=f.getValue();
a.push(b[1]);
a.push(g)
}
a.push("WT.dl");
if(this.loggingType==Wol.Logging.LogTypeEnum.PageLoad)
a.push("0");
else
a.push("1");
dcsMultiTrack.apply(this.srcElement,a);
return Wol.Logging.ResultId.Success
}
catch(e)
{
return this.throwOrIgnore(e)
}
};
Wol.Logging.Logger.prototype.log=function()
{
try
{
if(arguments.length>0)
throw Error.argument();
var a=this.get_omLogger(),
b=Wol.Logging.ResultId.Success;
for(var c=0;c<this._allProps.length;c++)
{
var e=this._allProps[c];
a[e.name]=e.getValue()
}
if(this.loggingType==Wol.Logging.LogTypeEnum.PageLoad)
{
b=this.logToWT();
a.t()
}
else
if(Wol.Logging.isClickThroughEnabled())
{
b=this.logToWT();
a.tl(this.srcElement,"o","")
}
return b
}
catch(d)
{
return this.throwOrIgnore(d)
}
};
Wol.Logging.Logger.registerClass("Wol.Logging.Logger",Wol.Logging.LoggerTemplate);
Wol.Logging.Internal={enableClickThroughLogging:function()
{
Sys.Debug.assert(arguments.length==0);
if(document.body!=undefined&&document.body!=null)
document.body.onclick=this.onClick
},onClick:function(l)
{
try
{
var c=typeof event!="undefined"?window.event.srcElement:l.target,
g=Wol.Logging.getTargetUrlElement(c);
if(g==null||g==undefined)
return;
c=g;
var f=Wol.Logging.Const.InteractionTypeId.Click,
h=new Wol.Logging.Logger(Wol.Logging.commonLoggerTemplate(),Wol.Logging.LogTypeEnum.ClickThrough,c),
e=Wol.Logging.Internal._findInteractionTypeIdElement(c);
if(e!=null)
{
var b=e.attributes[Wol.Logging.Const.ElementAttrib.InteractionTypeId].value;
if(b!=null&&b!=undefined)
{
if(b.toLowerCase()=="none")
return;
var i=b.indexOf(Wol.Logging.Const.ElementAttrib.InteractionTypeIdSep);
if(i<0)
f=Number.parseInvariant(b);
else
{
f=Number.parseInvariant(b.substr(0,i));
var k=b.substr(i);
if(k.toLowerCase()!=Wol.Logging.Const.ElementAttrib.InteractionTypeIdSep.toLowerCase()+Wol.Logging.Const.ElementAttrib.AdditionalProp.toLowerCase())
throw Error.create("Wol.Logging.InvalidInteractionTypeIdException");
var d=[],
a=c;
while(a!=null&&a!=undefined&&a!=e)
{
d.push(a);
a=a.parentElement||a.parentNode
}
d.push(e);
do
{
a=d.pop();
Wol.Logging.Internal._setPropFromElement(h,a)
}while(d.length>0)
}
}
}
h.setScalar(Wol.Logging.Const.FieldName.InteractionId,f);
h.log()
}
catch(j)
{
Wol.Logging.LoggerTemplate.prototype.throwOrIgnore(j)
}
},createOMLogger:function(b)
{
try
{
if(arguments.length!=1||!Wol.Util.TypeCheck.isString(b))
throw Error.argument("s_account","s_account must be the only parameter, and its type must be string!");
var a=s_gi(b);
a.m_Media_c="='s_media_'+m._in+'_~=new Function(~m.ae(mn,l,\"'+p+'\",~;`H~o.'+f~o.Get~=function(~){var m=this~}^9 p');p=tcf(o)~setTimeout(~x,x!=2?p:-1,o)}~=parseInt(~m.s.d.getElementsByTagName~ersion"+"Info~'`z_c_il['+m._in+'],~'o','var e,p=~QuickTime~if(~}catch(e){p=~s.wd.addEventListener~m.s.rep(~=new Object~layState~||^D~m.s.wd[f1]~Media~.name~Player '+~s.wd.attachEvent~'a','b',c~;o[f1]~tm.get"+"Time()/1~m.s.isie~.current~,tm=new Date,~p<p2||p-p2>5)~m.e(n,1,o^F~m.close~i.lx~=v+',n,~){this.e(n,~MovieName()~);o[f~i.lo~m.ol~o.controls~load',m.as~==3)~script';x.~,t;try{t=~Version()~else~o.id~)"+"{mn=~1;o[f7]=~Position~);m.~(x==~)};m.~&&m.l~l[n])~var m=s~!p){tcf~xc=m.s.~Title()~();~7+'~)}};m.a~\"'+v+';~3,p,o);~5000~return~i.lt~';c2='~Change~n==~',f~);i.~==1)~{p='~4+'=n;~()/t;p~.'+n)}~~`z.m_"+"i('`P'`uopen`6n,l,p,b`7,i`L`Ya='',x;l`Bl)`3!l)l=1`3n&&p){`H!m.l)m.l`L;n=`Km.s.rep(`Kn,\"\\n\",''),\"\\r\",''),'--**--','')`3m.`y`b(n)`3b&&b.id)a=b.id;for (x in m.l)`Hm.l[x]`x[x].a==a)`b(m.l[x].n^Fn"+"=n;i.l=l;i.p=p;i.a=a;i.t=0;i.s`B`V000);`c=0;^A=0;`h=0;i.e='';m.l[n]=i}};`b`6n`e0,-1`wplay`6n,o`7,i;i=`am`1`Ei`3m.l){i=m.l[\"'+`Ki.n,'\"','\\\\\"')+'\"]`3i){`H`c^Gm.e(i.n,3,-1^Fmt=`9i.m,^8)}}'^Fm(`w"+"stop`6n,o`e2,o`we`6n,x,o`7,i=n`x&&m.l[n]?m.l[n]:0`Yts`B`V000),d='--**--'`3i){if `v3||(x!=`c&&(x!=2||`c^G)) {`Hx){`Ho<0&&^A>0){o=(ts-^A)+`h;o=o<i.l?o:i.l-1}o`Bo)`3`v2||x`l&&`h<o)i.t+=o-`h`3x!=3){i.e"+"+=`v1?'S':'E')+o;`c=x;}`p `H`c!=1)`alt=ts;`h=o;m.s.pe='media';m.s.pev3=i.n+d+i.l+d+i.p+d+i.t+d+i.s+d+i.e+`v3?'E'+o:''`us.t(0,'`P^K`p{m.e(n,2,-1`ul[n]=0;m.s.fbr('`P^K}}^9 i};m.ae`6n,l,p,x,o,b){`Hn&&"+"p`7`3!m.l||!m.`ym.open(n,l,p,b`ue(n,x,o^5`6o,t`7,i=`q?`q:o`Q,n=o`Q,p=0,v,c,c1,c2,^1h,x,e,f1,f2`0oc^E3`0t^E4`0s^E5`0l^E6`0m^E7`0c',tcf,w`3!i){`H!m.c)m.c=0;i`0'+m.c;m.c++}`H!`q)`q=i`3!o`Q)o`Q=n=i`3!`"+'i)`i`L`3`i[i])^9;`i[i]=o`3!xc)^1b;tcf`1`F0;try{`Ho.v`D&&o`X`P&&`j)p=1`I0`8`3^0`1`F0`n`5`G`o`3t)p=2`I0`8`3^0`1`F0`n`5V`D()`3t)p=3`I0`8}}v="`z_c_il["+m._in+"],o=`i[\'"+i+"\']"`3p^G^HWindows `P `R'+"o.v`D;c1`dp,l,x=-1,cm,c,mn`3o){cm=o`X`P;c=`j`3cm&&c`rcm`Q?cm`Q:c.URL;l=cm.duration;p=c`X`t;n=o.p`M`3n){`H^D8)x=0`3n`lx=1`3^D1`N2`N4`N5`N6)x=2;}^B`Hx>=0)`2`A}';c=c1+c2`3`W&&xc){x=m.s.d.createElement"+"('script');x.language='j`mtype='text/java`mhtmlFor=i;x.event='P`M^C(NewState)';x.defer=true;x.text=c;xc.appendChild(x`g6]`1c1+'`Hn`l{x=3;'+c2+'}`9`46+',^8)'`g6]()}}`Hp==2)^H`G `R(`5Is`GRegistered()"+"?'Pro ':'')+`5`G`o;f1=f2;c`dx,t,l,p,p2,mn`3o`r`5`f?`5`f:`5URL^3n=`5Rate^3t=`5TimeScale^3l=`5Duration^J=`5Time^J2=`45+'`3n!=`44+'||`Z{x=2`3n!=0)x=1;`p `Hp>=l)x=0`3`Z`22,p2,o);`2`A`Hn>0&&`4^4>=10){`2"+"^7`4^4=0}`4^4++;`4^I`45+'=p;`9^6`42+'(0,0)\",500)}'`U`1`T`g4]=-`s0`U(0,0)}`Hp`l^HReal`R`5V`D^3f1=n+'_OnP`M^C';c1`dx=-1,l,p,mn`3o`r`5^2?`5^2:`5Source^3n=`5P`M^3l=`5Length()/1000;p=`5`t()/1000`3n!=`4"+"4+'){`Hn`lx=1`3^D0`N2`N4`N5)x=2`3^D0&&(p>=l||p==0))x=0`3x>=0)`2`A`H^D3&&(`4^4>=10||!`43+')){`2^7`4^4=0}`4^4++;`4^I^B`H`42+')`42+'(o,n)}'`3`O)o[f2]=`O;`O`1`T1+c2)`U`1`T1+'`9^6`41+'(0,0)\",`43+'?500:"+"^8);'+c2`g4]=-1`3`W)o[f3]=`s0`U(0,0^5s`1'e',`El,n`3m.autoTrack&&`C){l=`C(`W?\"OBJECT\":\"EMBED\")`3l)for(n=0;n<l.length;n++)m.a(`y;}')`3`S)`S('on`k);`p `H`J)`J('`k,false)";
a.m_i("Media");
a.charSet="utf-8";
a.trackInlineStats=false;
a.trackDownloadLinks=false;
a.trackExternalLinks=false;
a.loadModule("Media");
a.Media.autoTrack=true;
a.Media.trackVars="";
a.Media.trackEvents="None";
a.visitorID=Wol.Logging.getVisitor();
return a
}
catch(c)
{
return Wol.Logging.LoggerTemplate.prototype.throwOrIgnore(c)
}
},_findInteractionTypeIdElement:function(a)
{
if(a==null||a==undefined)
return null;
if(a.attributes&&a.attributes[Wol.Logging.Const.ElementAttrib.InteractionTypeId])
return a;
return Wol.Logging.Internal._findInteractionTypeIdElement(a.parentElement||a.parentNode)
},_setPropFromElement:function(e,c)
{
var b=Wol.Logging.Const.ElementAttrib.AdditionalProp+Wol.Logging.Const.ElementAttrib.AdditionalPropSep;
b=b.toLowerCase();
for(var a=0;a<c.attributes.length;a++)
if(c.attributes[a].name.toLowerCase().indexOf(b)==0)
{
var d=e.setScalar(c.attributes[a].name.substr(b.length),c.attributes[a].value);
if(d!=Wol.Logging.ResultId.Success)
throw Error.create("Wol.Logging.SetScalarFailedException")
}
}};
var link_expandAllText=!link_expandAllText?"":link_expandAllText,
link_collapseAllText=!link_collapseAllText?"":link_collapseAllText,
clickHandlerFunctionMap={link_expand:ExpandOrCollapseSingleNode,link_collapse:ExpandOrCollapseSingleNode,link_expandAll:ExpandOrCollapseAllNodes,link_collapseAll:ExpandOrCollapseAllNodes,link_image_expand:ExpandOrCollapseSingleNode_Image,link_image_collapse:ExpandOrCollapseSingleNode_Image};
if(document.attachEvent)
document.attachEvent("onclick",ClickHandlerBase);
else
if(document.addEventListener)
document.addEventListener("click",ClickHandlerBase,false);
function ClickHandlerBase(a)
{
var c=a!=null&&a.target==null?a.srcElement:a.target;
if(c.attributes["class"]!=null)
{
var b=c.attributes["class"].value;
if(clickHandlerFunctionMap.hasOwnProperty(b))
{
clickHandlerFunctionMap[b](c,b,true);
if(!ReturnFalse(a))
return false
}
}
}
function NoOp()
{
}
function FindFirstParent(c,d)
{
if(c==null||d==null)
return null;
var a=c,
e=d.toLowerCase();
while(a.parentNode&&a.parentNode!=document.body)
{
var b="";
a=a.parentNode;
if(a.tagName!=null)
b=a.tagName.toLowerCase();
if(b==e)
return a
}
return null
}
function GetElementDistance(c,b)
{
if(c==null||b==null)
return -1;
if(c==b)
return 0;
var d=1,
a=c.parentNode;
while(a!=null&&a!=document)
{
if(a==b)
return d;
d++;
a=a.parentNode
}
return -1
}
function IsElementWithinDistance(c,b,d)
{
var a=GetElementDistance(c,b);
if(a==null||a<0||a>d)
return false;
else
return true
}
function ExpandOrCollapseSingleNode(a,d,f)
{
if(a!=null)
{
var c=FindFirstParent(a,"DIV"),
b=c.childNodes[1],
g=c.parentNode,
h=FindFirstParent(a,"TR"),
e=$(h).find("td div a img")[0];
if(c!=null&&b!=null)
{
if(d=="link_collapse")
{
SetClassName(a,"link_expand");
SetClassName(b,"expand");
SetClassName(e,"link_image_expand");
if(f==true)
SaveCollapseState(a)
}
else
if(d=="link_expand")
{
SetClassName(a,"link_collapse");
SetClassName(b,"collapse");
SetClassName(e,"link_image_collapse");
if(f==true)
SaveExpandState(a)
}
UpdateExpandCollapseAllLink(g)
}
}
}
function ExpandOrCollapseSingleNode_Image(a,g,d)
{
if(a!=null)
{
var f=FindFirstParent(a,"TR"),
e=f.childNodes[1],
b=$(e).find("a")[0],
c=b.attributes["class"].value;
ExpandOrCollapseSingleNode(b,c,d)
}
}
function ExpandOrCollapseAllNodes(a,c,g)
{
if(a!=null)
{
var h=a.parentNode.childNodes;
if(c=="link_expandAll")
{
SetClassName(a,"link_collapseAll");
SetTextValue(a,link_collapseAllText);
if(g==true)
SaveExpandState(a)
}
if(c=="link_collapseAll")
{
SetClassName(a,"link_expandAll");
SetTextValue(a,link_expandAllText);
if(g==true)
SaveCollapseState(a)
}
for(i=0;i<h.length;i++)
{
var b=$(h[i]).attr("class");
if(b==undefined||b==null||b=="")
continue;
if(b.indexOf("faqEntry")!=-1||b.indexOf("procedure")!=-1||b.indexOf("section")!=-1)
{
var l=h[i].childNodes;
for(j=0;j<l.length;j++)
{
var k=l[j],
m=k.attributes["class"];
if(m==null)
continue;
var d=m.value;
if(d=="question"||d=="title_procedure ecTitle"||d=="title_section ecTitle")
{
var e=$(k).find("table tbody tr td");
if(e&&e.length==2)
{
var o=$(e[0]).find("div a img")[0],
f=$(e[1]).find("a")[0];
if(c=="link_expandAll")
{
SetClassName(o,"link_image_expand");
SetClassName(f,"link_expand");
if(g==true)
SaveCollapseState(f)
}
else
if(c=="link_collapseAll")
{
SetClassName(o,"link_image_collapse");
SetClassName(f,"link_collapse");
if(g==true)
SaveExpandState(f)
}
}
}
if(d=="collapse"||d=="expand")
{
var n=k;
if(c=="link_expandAll")
SetClassName(n,"expand");
else
if(c=="link_collapseAll")
SetClassName(n,"collapse")
}
}
}
}
}
}
function SetClassName(b,a)
{
if(b!=null&&a!=null&&a!="")
b.attributes["class"].value=a
}
function SetTextValue(b,a)
{
if(b!=null&&a!=null&&a!="")
b.innerHTML=a
}
function SaveExpandState(a)
{
if(a!=null&&a.id!=null)
Ms.Wol.Cookies.SetCookie(a.id,Ms.Wol.ExpandCollapse.GetECExpandValue())
}
function SaveCollapseState(a)
{
if(a!=null&&a.id!=null)
Ms.Wol.Cookies.SetCookie(a.id,Ms.Wol.ExpandCollapse.GetECCollapseValue())
}
function ReturnFalse(a)
{
if(a.preventDefault)
a.preventDefault();
else
return false
}
function DropDown_Changed(e)
{
var b=e.target;
if(b!=null)
{
var c=b.parentNode,
a=null;
while(c!=null&&a==null)
{
a=c.getElementsByTagName("a")[0];
c=c.parentNode
}
if(a!=null)
{
var d=b.options[b.selectedIndex].value;
if(d=="")
{
a.removeAttribute("href");
SetClassName(a,"nohref")
}
else
{
a.href=d;
SetClassName(a,"hashref")
}
}
}
}
if(typeof Ms=="undefined")
Ms={};
if(typeof Ms.Wol=="undefined")
Ms.Wol={};
if(typeof Ms.Wol.ExpandCollapse=="undefined")
Ms.Wol.ExpandCollapse={};
Ms.Wol.ExpandCollapse=function()
{
$(document).ready(b);
var a={_sExpandCookieValue:"e",_sCollapseCookieValue:"c"};
function b()
{
var c=$("a.link_expandAll");
jQuery.each(c,function()
{
if(this.id!=""&&Ms.Wol.Cookies.GetCookie(this.id)==a._sExpandCookieValue)
ExpandOrCollapseAllNodes(this,"link_expandAll",false)
});
var b=$("a.link_collapseAll");
jQuery.each(b,function()
{
if(this.id!=""&&Ms.Wol.Cookies.GetCookie(this.id)==a._sCollapseCookieValue)
ExpandOrCollapseAllNodes(this,"link_collapseAll",false)
});
var e=$("a.link_expand");
jQuery.each(e,function()
{
if(this.id!=""&&Ms.Wol.Cookies.GetCookie(this.id)==a._sExpandCookieValue)
ExpandOrCollapseSingleNode(this,"link_expand",false)
});
var d=$("a.link_collapse");
jQuery.each(d,function()
{
if(this.id!=""&&Ms.Wol.Cookies.GetCookie(this.id)==a._sCollapseCookieValue)
ExpandOrCollapseSingleNode(this,"link_collapse",false)
})
}
return {GetECExpandValue:function()
{
return a._sExpandCookieValue
},GetECCollapseValue:function()
{
return a._sCollapseCookieValue
}}
}();
if(Sys!=null&&Sys.WebForms!=null&&Sys.WebForms.PageRequestManager!=null)
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(ButtonKeypress);
else
$(document).ready(ButtonKeypress);
function ButtonKeypress()
{
$("span.button>a").keypress(function(c)
{
if(c.which==32)
{
var a=$(this).attr("href")!="undefined";
if(this.onClick)
if(this.onClick()==false)
a=false;
if(a)
{
if(this.click)
this.click();
else
{
var b=document.createEvent("MouseEvents");
b.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
this.dispatchEvent(b);
window.location.href=$(this).attr("href")
}
ReturnFalse(c)
}
}
})
}
if(Sys!=null&&Sys.WebForms!=null&&Sys.WebForms.PageRequestManager!=null)
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(MsWolDropDownPrep);
else
$(document).ready(MsWolDropDownPrep);
function MsWolDropDownPrep()
{
var a=$("select.dropdown_select");
a.change(DropDown_Changed);
jQuery.each(a,function()
{
$(this).trigger("change")
})
}
function UpdateExpandCollapseAllLink(a)
{
if(a!=undefined)
{
var e=$(a).children(".link_expandAll"),
d=$(a).children(".link_collapseAll"),
c=$(a).find("a.link_expand"),
b=$(a).find("a.link_collapse");
c=c.filter(function()
{
return IsElementWithinDistance($(this)[0],a,7)
});
b=b.filter(function()
{
return IsElementWithinDistance($(this)[0],a,7)
});
if($(b).length>0)
{
$(d).attr("class","link_expandAll");
$(d).html(link_expandAllText)
}
else
if($(c).length>0)
{
$(e).attr("class","link_collapseAll");
$(e).html(link_collapseAllText)
}
}
}
if(Sys!=null&&Sys.WebForms!=null&&Sys.WebForms.PageRequestManager!=null)
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(MsWolAOBIPatch);
else
$(document).ready(MsWolAOBIPatch);
function MsWolAOBIPatch()
{
var d=navigator.appVersion.split(";")[1]==" MSIE 6.0",
a=navigator.appName=="Safari"||navigator.userAgent.indexOf("Safari")!=-1;
if(d||a)
{
var b=$("div.section_oly-bg-stretch").parent();
b.each(function()
{
var a=$(this),
b=a.children().children("img.embedObject");
if(b.height()<a.height())
b.height(a.height())
})
}
if(a)
{
var c=$("div.wmpObjectDownlevel");
c.each(function()
{
var d=$(this),
i=d.children("a"),
c=i.children("img"),
b=d.parent(),
h=b.parent(),
f=h.parent(),
e=f.parent(),
g=e.parent(),
a=b.children("div.wmpObjectDiv"),
j=a.children("object");
if(g.hasClass("section_oly")&&a.size()>0)
if(c.height()<a.height())
c.height(a.height())
})
}
};
if(typeof Ms=="undefined")
Ms={};
if(typeof Ms.Wol=="undefined")
Ms.Wol={};
if(typeof Ms.Wol.SearchBox=="undefined")
Ms.Wol.SearchBox={};
Ms.Wol.SearchBox.BackgroundBoxSelector="div.SearchQueryBoxBackgroundLevel1";
Ms.Wol.SearchBox.InputBoxSelector='input[type="text"]';
$(function()
{
var c="form.SearchQuery",
b='form.SearchQuery input[type="submit"]',
a="a.HighContrastSearchQuerySubmit";
$(c).each(function()
{
var a=this,
c=$(a),
b=c.children(Ms.Wol.SearchBox.InputBoxSelector);
if(Ms.Wol.SearchBox.TryAddProperties(b,a))
{
b.focus(function()
{
Ms.Wol.SearchBox.UnloadSearchText(this.backgroundBox)
}).blur(function()
{
Ms.Wol.SearchBox.LoadSearchTextIfEmpty(this,this.backgroundBox)
});
$(a).children(Ms.Wol.SearchBox.BackgroundBoxSelector).focus(function()
{
Ms.Wol.SearchBox.UnloadSearchText(this);
$(this.inputBox).focus()
});
$(a).submit(function()
{
if(this.inputBox.value!="")
return true;
return false
})
}
});
$(a).css("display","inline");
$(b).css("display","none")
});
$(window).load(function()
{
$(Ms.Wol.SearchBox.InputBoxSelector).each(function()
{
if((typeof this.HasFocus=="undefined"||!this.HasFocus)&&typeof this.backgroundBox!="undefined")
Ms.Wol.SearchBox.LoadSearchTextIfEmpty(this,this.backgroundBox)
})
});
Ms.Wol.SearchBox.LoadSearchTextIfEmpty=function(b,a)
{
if(b.value=="")
$(a).css("display","inline");
else
$(a).css("display","none")
};
Ms.Wol.SearchBox.UnloadSearchText=function(a)
{
$(a).css("display","none")
};
Ms.Wol.SearchBox.TryAddProperties=function(a,e)
{
if(typeof a=="undefined"||typeof e=="undefined")
return false;
var c=a.siblings(Ms.Wol.SearchBox.BackgroundBoxSelector);
if(a.length==1&&c.length==1)
{
var b=a.get(0),
d=c.get(0);
e.inputBox=b;
b.backgroundBox=d;
d.inputBox=b;
return true
}
else
return false
};
var wolFeedbackId;
$(document).ready(processDocumentLoaded);
function processDocumentLoaded()
{
var a=$(".feedbackRatingButton");
if(a)
for(var b=0;b<a.length;b++)
a[b].disabled=false
}
function processRatingExplanationClick(a)
{
window.open(a)
}
function processRatingClick(b,h,g,e,c,d)
{
if(!Wol.Logging)
{
Sys.Debug.assert(false,"Logging library is not available",true);
return
}
if(Wol.Logging.isEnabled())
{
var a=new Wol.Logging.Logger(Wol.Logging.commonLoggerTemplate());
a.setScalar(Wol.Logging.Const.FieldName.InteractionId,Wol.Logging.Const.InteractionTypeId.Rating);
wolFeedbackId=createFeedbackId();
a.setScalar(Wol.Logging.Const.FieldName.FeedbackId,wolFeedbackId);
a.setScalar(Wol.Logging.Const.FieldName.Rating,b);
a.log()
}
var j=$("#"+h)[0],
i=$("#"+g)[0];
if(b=="0")
{
$("#"+e)[0].innerHTML=$("#commentNoPrompt")[0].innerHTML;
$("#"+c)[0].value=$("#commentNoYesString")[0].innerHTML;
$("#"+d)[0].value=$("#commentNoNoString")[0].innerHTML
}
else
if(b=="0.5")
{
$("#"+e)[0].innerHTML=$("#commentSomewhatPrompt")[0].innerHTML;
$("#"+c)[0].value=$("#commentSomewhatYesString")[0].innerHTML;
$("#"+d)[0].value=$("#commentSomewhatNoString")[0].innerHTML
}
j.style.display="none";
i.style.display="block";
var f=$("#commentVerboseText")[0];
f.focus();
return false
}
function processVerboseFeedbackKeyUp(a)
{
processTextChange(a)
}
function processVerboseFeedbackChange(a)
{
processTextChange(a)
}
function processVerboseFeedbackFocus(a)
{
processTextChange(a)
}
function processVerboseFeedbackPaste(a)
{
window.setTimeout("processTextChange('"+a+"')",200)
}
function processTextChange(k)
{
var f=5,
a=$("#commentVerboseText")[0],
k=$("#"+k)[0],
g=parseInt($("#commentMaxSize")[0].innerHTML),
j=parseInt($("#commentMaxEncodedSize")[0].innerHTML);
if(a.value.length>g)
a.value=a.value.substr(0,g);
var c=escape(a.value),
i=c.length,
b=j-f;
if(i>b)
{
var d=c.substr(0,b),
e=c.substr(b,f),
h=e.lastIndexOf("%"),
l;
if(h==-1)
d+=e;
else
d+=e.substr(0,h);
a.value=unescape(d)
}
}
function processCommentClick(g,c,e)
{
var b=$("#commentVerboseText")[0];
if(Wol.Logging.isEnabled()&&g=="1"&&b.value.length>0)
{
var a=new Wol.Logging.Logger(Wol.Logging.requiredLoggerTemplate());
a.setScalar(Wol.Logging.Const.FieldName.InteractionId,Wol.Logging.Const.InteractionTypeId.VerboseFeedback);
a.setScalar(Wol.Logging.Const.FieldName.FeedbackId,wolFeedbackId);
setVerboseFeedback(a,b.value);
a.log()
}
var d=$("#"+c)[0],
f=$("#"+e)[0];
d.style.display="none";
f.style.display="block";
return false
}
function setVerboseFeedback(j,g)
{
var b=25,
f=parseInt($("#commentMaxSize")[0].innerHTML),
i=Math.ceil(f/b),
c=Math.min(f,g.length);
if(c==0)
return;
var a=0,
d=1;
while(a<c&&d<=i)
{
var e;
if(a+b<=c)
e=b;
else
e=c-a;
var h=g.substr(a,e);
j.setScalar("eVar"+d,h);
a=a+b;
d=d+1
}
}
function createRandomFourDigitHex()
{
var a=Math.floor(Math.random()*65536).toString(16),
b=a.length;
if(b==4);
else
if(b==3)
a="0"+a;
else
if(b==2)
a="00"+a;
else
a="000"+a;
return a
}
function createFeedbackId()
{
return createRandomFourDigitHex()+createRandomFourDigitHex()+"-"+createRandomFourDigitHex()+"-"+createRandomFourDigitHex()+"-"+createRandomFourDigitHex()+"-"+createRandomFourDigitHex()+createRandomFourDigitHex()+createRandomFourDigitHex()
};
if(typeof Ms=="undefined")
Ms={};
if(typeof Ms.Wol=="undefined")
Ms.Wol={};
if(typeof Ms.Wol.Nav=="undefined")
Ms.Wol.Nav={};
Ms.Wol.Nav.Status=0;
$(function()
{
var c="#bodyNavBar",
b="#bodyNavBar a",
a="div.menuGroupWrapper:visible";
if(Ms.Wol.Nav.TryAddTransitions())
{
$(b).keydown(function(b)
{
var a=this.Transitions[Ms.Wol.Nav.GetKeyForTransitionFromEvent(b)];
if(typeof a!="undefined")
{
Ms.Wol.Nav.UpdateStyles(this,a);
Ms.Wol.Nav.FocusOnNext(this,a);
return false
}
return true
}).blur(function()
{
if(typeof this.InMenuBlur=="undefined"||!this.InMenuBlur)
{
Ms.Wol.Nav.RemoveKeyboardStyles(false);
Ms.Wol.Nav.Status=0
}
else
this.InMenuBlur=false
});
$(Ms.Wol.Nav.FirstLink).keydown(function(a)
{
if(Ms.Wol.Nav.GetKeyForTransitionFromEvent(a)==Ms.Wol.Nav.GetKeyForTransition(9,true))
{
Ms.Wol.Nav.RemoveKeyboardStyles(false);
Ms.Wol.Nav.Status=0;
return true
}
});
$(Ms.Wol.Nav.LastLink).keydown(function(a)
{
if(Ms.Wol.Nav.GetKeyForTransitionFromEvent(a)==Ms.Wol.Nav.GetKeyForTransition(9,false))
{
Ms.Wol.Nav.RemoveKeyboardStyles(false);
Ms.Wol.Nav.Status=0;
return true
}
});
$(Ms.Wol.Nav.FirstMenuTitleLink).focus(function()
{
if(Ms.Wol.Nav.Status!=1)
{
Ms.Wol.Nav.ApplyKeyboardStyles();
Ms.Wol.Nav.UpdateStyles(this,this)
}
});
$(Ms.Wol.Nav.LastMenuTitleLink).focus(function()
{
if(Ms.Wol.Nav.Status!=1&&$(this).siblings(a).length==0)
{
Ms.Wol.Nav.ApplyKeyboardStyles();
var b=this.Transitions[Ms.Wol.Nav.GetKeyForTransition(38,false)];
if(typeof b!="undefined")
{
Ms.Wol.Nav.UpdateStyles(this,b);
Ms.Wol.Nav.FocusOnNext(this,b)
}
else
Ms.Wol.Nav.UpdateStyles(this,this)
}
});
$(Ms.Wol.Nav.LastLink).focus(function()
{
if(Ms.Wol.Nav.Status!=1)
{
Ms.Wol.Nav.ApplyKeyboardStyles();
Ms.Wol.Nav.UpdateStyles(this,this)
}
});
$(c).mouseover(function()
{
if(Ms.Wol.Nav.Status==1)
{
Ms.Wol.Nav.RemoveKeyboardStyles(true);
Ms.Wol.Nav.Status=2
}
}).mousemove(function()
{
if(Ms.Wol.Nav.Status==1)
{
Ms.Wol.Nav.RemoveKeyboardStyles(true);
Ms.Wol.Nav.Status=2
}
}).mouseout(function()
{
if(Ms.Wol.Nav.Status==1)
{
Ms.Wol.Nav.RemoveKeyboardStyles(true);
Ms.Wol.Nav.Status=0
}
})
}
});
Ms.Wol.Nav.GetKeyForTransitionFromEvent=function(a)
{
var b=null;
if(typeof a.keyCode!="undefined")
b=a.keyCode;
else
if(typeof a.which!="undefined")
b=a.which;
var c=typeof a.shiftKey!="undefined"&&a.shiftKey;
return Ms.Wol.Nav.GetKeyForTransition(b,c)
};
Ms.Wol.Nav.GetKeyForTransition=function(a,b)
{
return String(a)+String(b)
};
Ms.Wol.Nav.AddTransition=function(b,d,c,a)
{
b.Transitions[Ms.Wol.Nav.GetKeyForTransition(d,c)]=a
};
Ms.Wol.Nav.AddBothTransitions=function(b,c,a)
{
Ms.Wol.Nav.AddTransition(b,c,true,a);
Ms.Wol.Nav.AddTransition(b,c,false,a)
};
Ms.Wol.Nav.TryAddTransitions=function()
{
var m="div.navMenu",
l="#bodyNavBar a",
k="menuItemLinkSimHover",
b=$(l).each(function()
{
this.Transitions=Array();
this.originalStyle=this.className;
this.hoverStyle=k
}).get();
if(b.length>0)
{
Ms.Wol.Nav.FirstLink=b[0];
Ms.Wol.Nav.LastLink=b[b.length-1]
}
Ms.Wol.Nav.AddAllTabTransitions(b);
var a=$(m).children().each(function()
{
if(!Ms.Wol.Nav.InitMenuTitle(this))
return false
}).get();
rtl=$(a).css("direction")=="rtl";
for(i=1;i<a.length-1;i++)
{
var g=rtl?a[i+1].menuTitleLink:a[i-1].menuTitleLink,
f=rtl?a[i-1].menuTitleLink:a[i+1].menuTitleLink,
c=$(a[i]).find("a").each(function()
{
this.menuTitle=a[i]
}).get();
Ms.Wol.Nav.AddArrowTransitionsForMenuTitle(c,g,f)
}
if(a.length>0)
{
var j=rtl||a.length<=1,
h=rtl&&a.length>1,
d=a[0].menuTitleLink,
e=a[a.length-1].menuTitleLink;
Ms.Wol.Nav.FirstMenuTitleLink=d;
Ms.Wol.Nav.LastMenuTitleLink=e;
var g=h?a[1].menuTitleLink:e,
f=j?e:a[1].menuTitleLink,
c=$(a[0]).find("a").each(function()
{
this.menuTitle=a[0]
}).get();
Ms.Wol.Nav.AddArrowTransitionsForMenuTitle(c,g,f);
var g=j?d:a[a.length-2].menuTitleLink,
f=h?a[a.length-2].menuTitleLink:d,
c=$(a[a.length-1]).find("a").each(function()
{
this.menuTitle=a[a.length-1]
}).get();
Ms.Wol.Nav.AddArrowTransitionsForMenuTitle(c,g,f)
}
return true
};
Ms.Wol.Nav.AddArrowTransitionsForMenuTitle=function(a,c,b)
{
for(j=1;j<a.length;j++)
{
Ms.Wol.Nav.AddBothTransitions(a[j],37,c);
Ms.Wol.Nav.AddBothTransitions(a[j],39,b);
Ms.Wol.Nav.AddBothTransitions(a[j],38,a[j-1]);
Ms.Wol.Nav.AddBothTransitions(a[j-1],40,a[j])
}
if(a.length>0)
{
Ms.Wol.Nav.AddBothTransitions(a[0],37,c);
Ms.Wol.Nav.AddBothTransitions(a[0],39,b);
Ms.Wol.Nav.AddBothTransitions(a[0],38,a[a.length-1]);
Ms.Wol.Nav.AddBothTransitions(a[a.length-1],40,a[0])
}
};
Ms.Wol.Nav.AddAllTabTransitions=function(a)
{
for(k=1;k<a.length;k++)
{
Ms.Wol.Nav.AddTransition(a[k],9,true,a[k-1]);
Ms.Wol.Nav.AddTransition(a[k-1],9,false,a[k])
}
};
Ms.Wol.Nav.InitMenuTitle=function(a)
{
var i="a.menuTitleLink,a.menuTitleLinkSelected",
h="div.menuGroupWrapper",
g="div.menuTitleUnderline",
e="menuTitleLinkSimHover",
f="menuTitleSimHover";
if(typeof a.menuTitleLink=="undefined")
{
a.originalStyle=a.className;
a.hoverStyle=f;
var c=$(a).children(h),
b=$(a).children(g);
if(c.length==1&&b.length==1)
{
a.menuGroupWrapper=c.get(0);
a.menuGroupWrapper.originalStyle=a.menuGroupWrapper.className;
a.menuGroupWrapper.hoverStyle=a.menuGroupWrapper.className+"SimHover";
a.menuTitleUnderline=b.get(0);
a.menuTitleUnderline.originalStyle=a.menuTitleUnderline.className;
a.menuTitleUnderline.hoverStyle=a.menuTitleUnderline.className+"SimHover"
}
var d=$(a).children(i);
if(d.length==1)
{
a.menuTitleLink=d.get(0);
a.menuTitleLink.originalStyle=a.menuTitleLink.className;
a.menuTitleLink.hoverStyle=e
}
else
return false
}
return true
};
Ms.Wol.Nav.ApplyKeyboardStyles=function()
{
var a="div.navMenu span";
$(a).each(function()
{
this.className=this.hoverStyle
})
};
Ms.Wol.Nav.RemoveKeyboardStyles=function(c)
{
var b="a.menuTitleLinkSimHover,div.menuGroupWrapperSimHover,div.menuTitleUnderlineSimHover,a.menuItemLinkSimHover,span.menuTitleSimHover",
a=$(b);
if(c)
a.blur();
a.each(function()
{
this.className=this.originalStyle
})
};
Ms.Wol.Nav.UpdateStyles=function(a,b)
{
if(a.menuTitle==b.menuTitle)
{
a.className=a.originalStyle;
Ms.Wol.Nav.DisplayMenuTitle(a.menuTitle);
b.className=b.hoverStyle
}
else
{
a.className=a.originalStyle;
Ms.Wol.Nav.HideMenuTitle(a.menuTitle);
Ms.Wol.Nav.DisplayMenuTitle(b.menuTitle);
b.className=b.hoverStyle
}
Ms.Wol.Nav.Status=1
};
Ms.Wol.Nav.FocusOnNext=function(a,b)
{
a.InMenuBlur=true;
$(b).focus()
};
Ms.Wol.Nav.DisplayMenuTitle=function(a)
{
a.menuTitleLink.className=a.menuTitleLink.hoverStyle;
if(typeof a.menuGroupWrapper!="undefined")
{
a.menuGroupWrapper.className=a.menuGroupWrapper.hoverStyle;
a.menuTitleUnderline.className=a.menuTitleUnderline.hoverStyle
}
};
Ms.Wol.Nav.HideMenuTitle=function(a)
{
a.menuTitleLink.className=a.menuTitleLink.originalStyle;
if(typeof a.menuGroupWrapper!="undefined")
{
a.menuGroupWrapper.className=a.menuGroupWrapper.originalStyle;
a.menuTitleUnderline.className=a.menuTitleUnderline.originalStyle
}
};
Type.registerNamespace("MS.WOL.WMP");
MS.WOL.WMP=function()
{
var b=this;
this.Params={};
function e()
{
b.Params.documentUrl=document.URL;
b.autoPlay=false
}
e();
function a(b)
{
var a=$(b);
a.removeClass("wmpObjectContainerInit");
a.removeClass("wmpObjectContainerReady");
a.addClass("wmpObjectContainerPlay")
}
function d(b)
{
var a=$(b);
a.removeClass("wmpObjectContainerInit");
a.addClass("wmpObjectContainerReady")
}
function c(b)
{
var a=$(b);
a.removeClass("wmpObjectContainerInit");
a.removeClass("wmpObjectContainerReady");
a.removeClass("wmpObjectContainerPlay");
a.addClass("wmpObjectContainerDisabled")
}
this.InitializePlayer=function(f,h,g)
{
if(typeof f=="undefined")
return;
var e=f.get(0);
if(typeof e!="object")
return;
try
{
if(typeof e.controls=="undefined")
{
c(e.parentElement.parentElement);
return
}
if(h=="True")
{
b.autoPlay=true;
a(e.parentElement.parentElement);
return
}
else
{
if(g=="True")
d(e.parentElement.parentElement);
else
a(e.parentElement.parentElement);
$(e.parentElement.parentElement).find("a.wmpObjectImageA").click(function()
{
a(e.parentElement.parentElement);
e.controls.play();
return false
})
}
}
catch(i)
{
c(e.parentElement.parentElement);
return
}
}
};
if(Sys!=null&&Sys.WebForms!=null&&Sys.WebForms.PageRequestManager!=null)
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(MsWolVideoHandler);
else
$(document).ready(MsWolVideoHandler);
function MsWolVideoHandler()
{
try
{
$("object.wmpObjectClass").each(function()
{
var a=$(this),
j=a.attr("id"),
f=a.children("param[name=AutoStart]"),
h=f.attr("value"),
d=a.parent().parent(),
e=d.children("div.wmpObjectOverlay"),
g=e.children("a").children("img");
if(g.size()>0)
imagePresent="True";
else
imagePresent="False";
var i=new MS.WOL.WMP;
i.InitializePlayer(a,h,imagePresent);
if(typeof Ms.Wol.TabControl!="undefined"&&typeof Ms.Wol.TabControl.TabChangeEvent!="undefined")
if(a.parents(".tabBody").length>0)
{
var k=a.parents(".tabBody").get(0).id,
c=$(this).attr("uniqueID"),
b=null;
if(typeof c=="undefined")
{
b=k+"_"+j;
$(this).attr("uniqueID",b)
}
else
b=c;
Ms.Wol.TabControl.TabChangeEvent.Attach(b,function()
{
ReleaseWmpObjectInTab(arguments[0],b)
})
}
})
}
catch(a)
{
}
}
function ReleaseWmpObjectInTab(d,a)
{
if(d!=null&&a!=null&&a!="")
{
var b=$('object.wmpObjectClass[uniqueID="'+a+'"]');
if(typeof b!="undefined")
{
var c=$(b).get(0),
e=$(d).parents(".tabBody").get(0);
if(c!=null&&e!=null)
{
var f=e.id;
if(b.parents("#"+f).length>0)
if(typeof c.playState!="undefined")
{
c.close();
Ms.Wol.TabControl.TabChangeEvent.Detach(a)
}
}
}
}
}


}
/*
     FILE ARCHIVED ON 10:12:34 Dec 27, 2009 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:33:17 May 08, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.603
  exclusion.robots: 0.067
  exclusion.robots.policy: 0.058
  esindex: 0.009
  cdx.remote: 15.458
  LoadShardBlock: 39.503 (3)
  PetaboxLoader3.datanode: 130.829 (4)
  load_resource: 716.854
  PetaboxLoader3.resolve: 579.011
*/