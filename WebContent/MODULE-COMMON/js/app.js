(function ($) {
	new gnMenu( document.getElementById( 'gn-menu' ) );
	$(function() {
		$('.gn-menu li a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
		$('a.scroll').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});
})(jQuery);

$('.modal').on('shown.bs.modal', function() {
	$(this).find('button:contains("No")').focus();
	$(this).find('button:contains("Save")').focus();
	$(this).find('button:contains("Create")').focus();
});
