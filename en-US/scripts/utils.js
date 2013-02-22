var daysToKeep = 500; // default cookie life...
theCookie = '';
today      = new Date(); 
expiryDate = new Date(today.getTime() + (daysToKeep * 86400000));

function setCookie (name, value, path, expires, theDomain, secure) { 
   value = escape(value);
   var theCookie = name + "=" + value + 
   ((expires)    ? "; expires=" + expires.toGMTString() : "") + 
   ((path)       ? "; path="    + path   : "") +  
   ((theDomain)  ? "; domain="  + theDomain : "") +    
   ((secure)     ? "; secure"            : ""); 
   document.cookie = theCookie;
} 

function getCookie(Name) { 
   var search = Name + "=" 
   if (document.cookie.length > 0) { // if there are any cookies 
      offset = document.cookie.indexOf(search) 
      if (offset != -1) { // if cookie exists 
         offset += search.length 
         // set index of beginning of value 
         end = document.cookie.indexOf(";", offset) 
         // set index of end of cookie value 
         if (end == -1) end = document.cookie.length 
         return unescape(document.cookie.substring(offset, end)) 
      } 
   }
} 


/*  
    Example URLs:
    
    http://documentation-devel.engineering.redhat.com/docs/en-US/Red_Hat_Enterprise_MRG/2/html/Messaging_Installation_and_Configuration_Guide/Enable_SSL_in_Python_Clients.html
    https://access.redhat.com/knowledge/docs/en-US/Red_Hat_Enterprise_MRG/2/html/Messaging_Installation_and_Configuration_Guide/index.html
    https://access.redhat.com/knowledge/docs/en-US/Red_Hat_Enterprise_MRG/2/html-single/Messaging_Installation_and_Configuration_Guide/index.html

*/

function getCookiePath (){
    // set cookie for entire book in both html and html-single, not just for this page
    var path,
        url = document.URL;
    
    if (url.indexOf('/html-single/') != -1) { // html-single url
        path = url.substring(0, url.indexOf('/html-single/')) + '/';
    } else {
        if (url.indexOf('/html/') != -1) { // html url
            path = url.substring(0, url.indexOf('/html/')) + '/';
        } else { // unknown url
            path = null;
        }
    }
    
    return path;
}

function setProgrammingLanguageCookie (programmingLanguage) {
    setCookie('defaultProgrammingLanguage', programmingLanguage, getCookiePath());
}

function getDefaultProgrammingLanguageFromCookie () {
    return getCookie('defaultProgrammingLanguage');
}