 jQuery.noConflict();

jQuery(document).ready(function(){
	

	if (!online) {
		var isIE64= (navigator.userAgent.toLowerCase().indexOf("win64; x64")!= -1 ? true:false);
		jQuery.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
		if(jQuery.browser.chrome){
			localmessage('Google Chrome');
		}
		if (isIE64) {
			localmessage('Internet Explorer 64 bits');
		}
	}	
	
	
	hideContent = function(contentString,transition){
		if (transition==null) {
					jQuery("div.dynamicContent").fadeOut( 1000 ,function() {
					showContent(contentString);playSound(0);
					});
		} else {
					jQuery("div.dynamicContent").slideUp( 1000 ,function() {
					showContent(contentString);playSound(0);
					});
	  }

	};

	
	showContent = function (contentString) {
		jQuery.ajax({
			   type: "GET",
			   url: contentString,
			   dataType:"html",
			   success: function(data){
			    jQuery("div.dynamicContent").html(data);
			 		jQuery("div.dynamicContent").slideDown(1000);
				},
			   error: function () {
			   		alert("Page "+contentString+" not found");
			   	}
 		}); 
 };
 		
 	

 	if(jQuery(document).getUrlParam("page")!=null) { 			
 			hideContent(jQuery(document).getUrlParam("page"),'slideUp');	
 	} else {
 			showContent("_home.htm");	
	}	
});

function localmessage(browserString) {
	alert("You use "+browserString+" browser. Due to "+browserString+" known bugs, the template won't work locally on your computer and you won't be able to customize it locally.\n  Note that the template will work as expected when you'll put it online. \n We encourage you to use Firefox Browser to customize template locally.");
	if (confirm("Download Firefox Browser (free)")) 
	{
		document.location.href='http://www.mozilla.com/firefox/';
	}
}




function sendToASUnselectButton(button_id) {
		thisMovie(button_id).sendToASUnselectButton("");
     }
     
function thisMovie(movieName) {
     if (navigator.appName.indexOf("Microsoft") != -1) {
         return window[movieName];
     } else {
         return document[movieName];
     }
 }

var requiredMajorVersion = 9;
var requiredMinorVersion = 9;	
var requiredRevision = 0;
var selected_button ="";
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var online = ( ((window.location+'').substring(0,4)).toLowerCase()=='http' ) ? true : false;

function myButton (buttonText,buttonLink) {
	if (!online && !isIE) {
  document.write('	<DIV ID="flashMovie'+(anim_ids+1)+'" STYLE="width: 200; height: 31; z-index: 100;" onClick="showPage(\''+buttonLink+'\','+anim_ids+1+')">');																										
	}		
	AC_FL_RunContent('codebase','http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0','width','200','height','31','src','flash/button','quality','high','pluginspage','http://www.macromedia.com/go/getflashplayer','movie','flash/button','flashvars','custom_xml_url=button.xml&item_text='+buttonText+'&item_url='+buttonLink+'&button_id='+(anim_ids+1)+'&isIE='+isIE,'scale','noScale','wmode','transparent');
	if (!online && !isIE) {
	document.write('</DIV>');
	}	
}

function myFlashHeader (_src,_width,_height,_bgcolor,_divID,_xml,_wmode) {
	if (_wmode == null){
		_wmode = 'Window';
  }	
	if (window.document.getElementById(_divID)) {
	window.document.getElementById(_divID).innerHTML=AC_FL_RunContentDiv( 'codebase','http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0','width',_width,'height',_height,'src',_src,'quality','high','pluginspage','http://www.macromedia.com/go/getflashplayer','movie',_src,'flashvars','custom_xml_url='+_xml, 'bgcolor',_bgcolor,'allowScriptAccess','sameDomain','scale','noScale','wmode',_wmode); //end AC code								
	} else  {
		alert("Div '"+_divID+"' not found ");
	}
}

function myFlashGallery (_src,_width,_height,_bgcolor,_divID,_xml) {	
	if (window.document.getElementById(_divID)) {
		if (_xml == null){
			_xml = 'gallery.xml';
		}
	window.document.getElementById(_divID).innerHTML=AC_FL_RunContentDiv( 'codebase','http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0','width',_width,'height',_height,'src',_src,'quality','high','pluginspage','http://www.macromedia.com/go/getflashplayer','movie',_src,'bgcolor',_bgcolor,'allowScriptAccess','sameDomain','allowFullScreen','true','FlashVars','xmlFile='+_xml); //end AC code									                                             
	} else  {
		alert("Div '"+_divID+"' not found ");
	}
}




function showPage(pageURL,button_id) {
    if (pageURL.substring(0,4).toLowerCase()=='http') {
        window.open(pageURL, '_blank');
        return;
    };
    hideContent(pageURL,'slideUp');
    if (selected_button!="" && button_id!=selected_button) {
            sendToASUnselectButton('anim_'+selected_button);        
    }
    if (button_id!=undefined) {selected_button = button_id;}
}



/* Copyright (c) 2006-2007 Mathias Bank (http://www.mathias-bank.de)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 2.1
 * 
 * Thanks to 
 * Hinnerk Ruemenapf - http://hinnerk.ruemenapf.de/ for bug reporting and fixing.
 * Tom Leonard for some improvements
 * 
 */
jQuery.fn.extend({
/**
* Returns get parameters.
*
* If the desired param does not exist, null will be returned
*
* To get the document params:
* @example value = $(document).getUrlParam("paramName");
* 
* To get the params of a html-attribut (uses src attribute)
* @example value = $('#imgLink').getUrlParam("paramName");
*/ 
 getUrlParam: function(strParamName){
	  strParamName = escape(unescape(strParamName));
	  
	  var returnVal = new Array();
	  var qString = null;
	  
	  if (jQuery(this).attr("nodeName")=="#document") {
	  	//document-handler
		
		if (window.location.search.search(strParamName) > -1 ){
			
			qString = window.location.search.substr(1,window.location.search.length).split("&");
		}
			
	  } else if (jQuery(this).attr("src")!="undefined") {
	  	
	  	var strHref = jQuery(this).attr("src")
	  	if ( strHref.indexOf("?") > -1 ){
	    	var strQueryString = strHref.substr(strHref.indexOf("?")+1);
	  		qString = strQueryString.split("&");
	  	}
	  } else if (jQuery(this).attr("href")!="undefined") {
	  	
	  	var strHref = jQuery(this).attr("href")
	  	if ( strHref.indexOf("?") > -1 ){
	    	var strQueryString = strHref.substr(strHref.indexOf("?")+1);
	  		qString = strQueryString.split("&");
	  	}
	  } else {
	  	return null;
	  }
	  	
	  
	  if (qString==null) return null;
	  
	  
	  for (var i=0;i<qString.length; i++){
			if (escape(unescape(qString[i].split("=")[0])) == strParamName){
				returnVal.push(qString[i].split("=")[1]);
			}
			
	  }
	  
	  
	  if (returnVal.length==0) return null;
	  else if (returnVal.length==1) return returnVal[0];
	  else return returnVal;
	}
});



