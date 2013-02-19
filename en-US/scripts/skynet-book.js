function skynetBookLoad(){
  setUpCodeTabs();
  setUpChangeLogs();
}

function setUpChangeLogs(){
	$('.changelog-toggle').click(changelogClick);
	$('.changelog-toggle').each(function(){
		$(this).html('<a href="#">' + $(this).html() + '</a>');
	});


	$('.changelog-items').find('li').find('div').each(function(){
		$(this).html('<a href="#" class="' + $($(this)).closest('div').attr('class') + '">' + $(this).html() + '</a>');
	});


	$('.changelog-items').find('li').find('a').click(changelogItemClick);
	
}

function changelogClick(e){
	e.preventDefault();
	var parentSection = $(this).closest('.section');
	$(parentSection).find('.changelog-items').each(function(){
		if ($(this).hasClass('changelog-visible')) {
			$(this).removeClass('changelog-visible');
			$('.changes-highlight').removeClass('changes-highlight');
		} else {	
			// $('.changelog-visible').removeClass('changelog-visible');		
			$(this).addClass('changelog-visible');
		}
	});
}

function changelogItemClick(e){
	e.preventDefault();
	var classes= {};
	$($(this).attr('class').split(' ')).each(function() { 
        if (this !== '') {
            classes[this] = this;
        }    
    });
    $('.changes-highlight').removeClass('changes-highlight');
    $(this).addClass('changes-highlight');
    for (className in classes) {
    	if (className.substring(0,10) === 'changelog-') {
	    	$('.' + 'changes-' + className.substring(10)).addClass('changes-highlight');

    	}
    }
}