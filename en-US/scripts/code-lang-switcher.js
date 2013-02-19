/* 

Code Tabs Code

This javascript code handles "Codetabs"  - displaying code samples in multiple programming languages as
tabbed dialogs. This way readers can choose which language they want to see, and the other languages can be hidden
"at one click's distance".

In Docbook, the author creates a variablelist with the role "codetabs". For example:

<variablelist role="codetabs">




*/


// Pseudo-code

// The page starts up and calls this function
// First:
// Check HTML5 Local Storage (fallback to cookie) for:
// a default programming language for this book
// a default programming language for our docs
// book.default = thisbook.default || docs.default 

// Second: 
// Scan the page and construct the code switchers. 
// foreach if thisbook.default){setTabTo(thisbook.default)}
// Keep a list of languages in the book

// Third:
// If the skynet-defaultcodeselector div is on this page, then:
// If length(langslist) > 0 {
// Detach all programming languages that are not in the list }
// If (book.default) set switcher to book.default
// else if (docs.default) set switcher to docs.default
// Attach event handler to skynet-defaultcodeselectorswitch
// set visible}

// skynet-defaultcodeselectorswitch onclick()
// thisDefault = skynet-defaultcodeselector.activetab
// writeCookie(thisBook, thisDefault)
// if (!cookie.docs) writeCookie(docs, thisDefault)
// scanpage and set default active

/*jslint indent: 2 */

function setUpCodeTabs() {

  function setCookie(bookname, bookver, codelang)
  {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
  }


  function getCookie(bookname, bookver, codelang)
  {
   var tab
   tab = 0;
  }

// http://stackoverflow.com/questions/11509555/insert-new-list-sorted-in-alphabetical-order-javascript-or-jquery 
  function addNewListItem($list, $element) { // inserts a listitem in alphabetical order
     var listItems;
      $list.append($element);
      listItems = $list.children('li').get();
      listItems.sort(function (a, b) {
         return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
      });
      $.each(listItems, function(index, item) { $list.append(item); });
  }

// Make the first tab active - used when no default is selected, or the default is not available here
  function makeFirstActive (thisCodeDiv) {
    initialTab = thisCodeDiv.find('a:first');
    initialTab.addClass('active');
    thisCodeDiv.find('dd').hide();
    thisCodeDiv.find('.code-lang-' + initialTab.attr('rel')).show();
  }

  function hideIntroSection(){
    $('div.skynet-defaultcodeselector').each(function(){$(this).hide()});
  }

  function showIntroSection(tabsInBook){
    var tab;
    // For all 
    $('div.skynet-defaultcodeselector').each(function (){
      // show the selector section      
      $(this).removeClass('hidden');
      // hide all selectors by default
      $(this).find('li').hide();

      // Iterate through all the code tabs
      for (tab in tabsInBook){
        // If this code has tabs in the book, we'll find its selector
        // and enable it
        if ( tabsInBook[tab] ) {
          // Loop through the listitems in the master selector
          $(this).find('li').each(function(){
            // Compare its class with the code we seek
            if ($(this).hasClass(tab)){
              var anchor =  $('<a href="#" rel="' + tab + '">' + $(this).find('div.para').html() +
         '</a>');
              $(this).prepend(anchor);
              
              // Here's the click handler for the master selectors
              anchor.click(function (e) {
                $('.codetabs-selector li a').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
                $('div.codetabs').each(function(){
                  codelang = $(anchor).attr('rel');
                  codesample = $(this).find('.code-lang-'+ codelang);
                  if (codesample.length > 0){
                    $(this).find('dd').hide();                    
                    codesample.show();
                    $(this).find('a').removeClass('active');
                    $(this).find('a[rel="' + codelang + '"]') .addClass('active');
                  }
                });                
              });

              $(this).find('div.para').detach();
              $(this).show();
            }
          });
        }
      }
      // Now we need to set one of them as the default active one
      //makeFirstActive($(this)); 
    });
  }

// the main function, here we go through and change variablelists into tabbed code
// displays
  var cssCode,
      linkEl,
      listItemEl,
      currentNamedAnchor,
  // Will be true if codetabs are in the book
      thisBookHasCodeTabs = false,

  // This array records what tabs are included in this book
      tabsInBook = {
          /*    
          'js' : 0,
          'node' : 0,
          'cpp' : 0,
          'cs' : 0,
          'py' : 0,
          'rb' : 0,
          'java' : 0,
          'HTML' : 0 
          */
        },

  /* 
      We use the short code in css classes and for link matching purposes.
      This is done because the human readable text can contain characters not allowed in css class names or JS object property names.
      The long name is used for the human readable text 
  */

      lookupCSSCodeFromLanguageName = {
          'JavaScript'  : 'js',
          'Node.js'     : 'node',
          'C++'         : 'cpp',
          'C#/.NET'     : 'cs',
          'Python'      : 'py',
          'Ruby'        : 'rb',
          'Java'        : 'java',
          'html'        : 'HTML'
        };

  // Initialize the tabs in the book to 0 
  for (humanReadableCodeLanguageName in lookupCSSCodeFromLanguageName){
    cssCode = lookupCSSCodeFromLanguageName[humanReadableCodeLanguageName];
    tabsInBook[cssCode] = false;
  }

  currentNamedAnchor = window.location.hash;

  // hide the introductory section with the Codetabs selector by default
  
  // Commented out for now - if there are no code selections, we might
  // change the wording of the intro rather than hide the whole thing
  //  hideIntroSection();

  $('div.codetabs').each(function () {
    // Go through each of the codetabs in the book
    // This Docbook: <variablelist role="codetabs"> produces this HTML: <div class="codetabs">
    var thisCodeDiv = $(this);
    thisBookHasCodeTabs = true;

    // The code tab selectors will be li - listitem - elements inside a ul - unordered list - element
    // Create the ul element to add them to:
    ul = $(document.createElement('ul'));
    // Code tabs are based on a Docbook varlist. The <varlistentry><term> is rendered as a dt - data term - element in HTML
    // Go through each of the tabs in this codetab:
    thisCodeDiv.find('dt').each(function () {
      // This relies on the Docbook author using the Human Readable Names in lookupCSSCodeFromLanguageName
      // as the <variablelist><term>
      // Note that unpredictably things will happen if an author puts multiple occurrences of the same code language in a single codetab
      humanReadableCodeLanguageName = $(this).children('.term')[0].innerHTML;
      // We construct a link for the click handler. We'll misuse the rel attribute to hold a css classname
      linkEl = $('<a href="#" rel="' + lookupCSSCodeFromLanguageName[humanReadableCodeLanguageName] + '">' + humanReadableCodeLanguageName +
         '</a>');
      tabsInBook[lookupCSSCodeFromLanguageName[humanReadableCodeLanguageName]] = true;
      listItemEl = $('<li class="code-select-li"></li>');
      listItemEl.append(linkEl);
      // Directly following the human readable name is the code sample, it's in a dd element, but we rely on it's position here
      proglisting = $(this).next();
      // We give it a css classname that we can use to match the programlisting with the selector    
      proglisting.addClass('code-lang-' + lookupCSSCodeFromLanguageName[humanReadableCodeLanguageName]);

      $(this).detach();

      // This is the click handler for the code tab selector
      linkEl.click(function (e) {
        e.preventDefault();

        // Do nothing if this one is already selected
        if ($(this).hasClass('active')) return;

        // The <varlistentry><listitem> is rendered as a dd - data definition - element in HTML
        thisCodeDiv.find('dd').hide();
        thisCodeDiv.find('.code-lang-'+$(this).attr('rel')).show();
        thisCodeDiv.find('a').removeClass('active');
        $(this).addClass('active');
      });

      addNewListItem(ul, listItemEl);
    });
    thisCodeDiv.prepend(ul);

    // atm default to first, but will store the lang pref (perhaps in a cookie)
    makeFirstActive(thisCodeDiv); 
  });

  // if there *are* codetabs in this book, then show the Codetabs 
  // introductory section
  if (thisBookHasCodeTabs) showIntroSection(tabsInBook);

  // The document has resized. If the user opened it on a named anchor, take
  // them to the new location for that point
  if (currentNamedAnchor)
    if (currentNamedAnchor != '#')
      $('html, body').animate({ scrollTop: $(currentNamedAnchor).offset().top }, 'slow');
}
