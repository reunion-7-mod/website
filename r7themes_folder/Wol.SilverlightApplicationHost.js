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

﻿/// <reference name="MicrosoftAjax.js" />
/// <reference name="Wol.Logging.Helper.js"/>
/// <reference name="Wol.Logging.Const.js"/>
/// <reference name="Wol.Logging.Enum.js"/>
/// <reference name="Wol.Logging.Logger.js"/>
/// <reference name="Wol.Logging.LoggerTemplate.js"/>


//<Silverlight_JS_Snippet>//
if (!window.SilverlightHelper) {
    window.SilverlightHelper = {};
}

//////////////////////////////////////////////////////////////////
//
// isInstalled:
//
// Checks to see if the correct version is installed
//
//////////////////////////////////////////////////////////////////

SilverlightHelper.isInstalled = function(version) {
    if (version == undefined)
        version = null;

    var isVersionSupported = false;
    var container = null;

    try {
        var control = null;
        var tryNS = false;

        if (window.ActiveXObject) {
            try {
                control = new ActiveXObject('AgControl.AgControl');
                if (version === null) {
                    isVersionSupported = true;
                }
                else if (control.IsVersionSupported(version)) {
                    isVersionSupported = true;
                }
                control = null;
            }
            catch (e) {
                tryNS = true;
            }
        }
        else {
            tryNS = true;
        }
        if (tryNS) {
            var plugin = navigator.plugins["Silverlight Plug-In"];
            if (plugin) {
                if (version === null) {
                    isVersionSupported = true;
                }
                else {
                    var actualVer = plugin.description;
                    if (actualVer === "1.0.30226.2")
                        actualVer = "2.0.30226.2";
                    var actualVerArray = actualVer.split(".");
                    while (actualVerArray.length > 3) {
                        actualVerArray.pop();
                    }
                    while (actualVerArray.length < 4) {
                        actualVerArray.push(0);
                    }
                    var reqVerArray = version.split(".");
                    while (reqVerArray.length > 4) {
                        reqVerArray.pop();
                    }

                    var requiredVersionPart;
                    var actualVersionPart;
                    var index = 0;


                    do {
                        requiredVersionPart = parseInt(reqVerArray[index]);
                        actualVersionPart = parseInt(actualVerArray[index]);
                        index++;
                    }
                    while (index < reqVerArray.length && requiredVersionPart === actualVersionPart);

                    if (requiredVersionPart <= actualVersionPart && !isNaN(requiredVersionPart)) {
                        isVersionSupported = true;
                    }
                }
            }
        }
    }
    catch (e) {
        isVersionSupported = false;
    }

    return isVersionSupported;
};

//</Silverlight_JS_Snippet>//

if (!window.SAHHelper) {

    window.SAHHelper = {};

    SAHHelper.isSLInstalled = function(slVersion) {
    
        if (slVersion == null) {
            slVersion = "2.0.31005.0";
        }

        return SilverlightHelper.isInstalled(slVersion);
    }




    SAHHelper.log = function(sahId, slInstalled) {

        if (!Wol.Logging) {
            Sys.Debug.assert(false, "Logging library is not available", true);
            return;
        }

        if (!Wol.Logging.isEnabled()) {
            return;
        }

        //log the Base loaded
        var myLogger = new Wol.Logging.Logger(Wol.Logging.commonLoggerTemplate());
        myLogger.setScalar(Wol.Logging.Const.FieldName.InteractionId, Wol.Logging.Const.InteractionTypeId.SilverlightComponentLoaded);
        myLogger.log();

        if (slInstalled) {
            //log silverlight available
            myLogger.setScalar(Wol.Logging.Const.FieldName.InteractionId, Wol.Logging.Const.InteractionTypeId.SilverlightPluginAvailable);
            myLogger.log();
        }
    }

    SAHHelper.registerLog = function(sahId, slInstalled) {

        if (!Wol.Logging) {
            Sys.Debug.assert(false, "Logging library is not available", true);
            return;
        }

        Wol.Logging.WhenReady.register(function() { SAHHelper.log(sahId, slInstalled) });
    }

    SAHHelper.loaded = function(slPnlId, dlPnlId, dlAvailable, slVersion) {

        var slPnl = $get(slPnlId);
        var dlPnl = $get(dlPnlId);
        var slInstalled = SAHHelper.isSLInstalled(slVersion);

        if (!slInstalled && dlAvailable && (slPnl != null) && (dlPnl != null)) {
            slPnl.style.display = "none";
            dlPnl.style.display = "block";
        }
        
        //register the control with the logging system
        SAHHelper.registerLog(slPnlId, slInstalled);
    }
}

﻿

}
/*
     FILE ARCHIVED ON ﻿12:13:06 Dec 27, 2009﻿ AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON ﻿13:53:09 Dec 30, 2024﻿.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
﻿playback timings (ms):
﻿  ﻿captures_list﻿: ﻿1.721﻿
﻿  ﻿exclusion.robots﻿: ﻿0.02﻿
﻿  ﻿exclusion.robots.policy﻿: ﻿0.01﻿
﻿  ﻿esindex﻿: ﻿0.011﻿
﻿  ﻿cdx.remote﻿: ﻿9.178﻿
﻿  ﻿LoadShardBlock﻿: ﻿297.864﻿ (﻿3﻿)
﻿  ﻿PetaboxLoader3.datanode﻿: ﻿218.906﻿ (﻿4﻿)
﻿  ﻿load_resource﻿: ﻿361.99﻿
﻿  ﻿PetaboxLoader3.resolve﻿: ﻿335.266﻿
﻿*/