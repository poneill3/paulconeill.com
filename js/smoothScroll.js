$(function() {
	var lastTarget;
	window.onresize = function() {
		if(lastTarget){
			window.location.href = lastTarget;
		}
	}
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      lastTarget = this.hash;
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        },{duration: 1000, queue: false});
	$('html,body').animate({
          scrollLeft: target.offset().left
        },{duration: 1000, queue: false});
        return false;
      }
    }
  });
});
	window.onresize = function() {
			window.location.href = "#home";
	}
$(document).bind('touchmove', function(e) {
	e.preventDefault();
});
$( document ).ready(function() {
	var target = $("#home");
        $('html,body').animate({
          scrollTop: target.offset().top
        },{duration: 0, queue: false});
	$('html,body').animate({
          scrollLeft: target.offset().left
        },{duration: 0, queue: false});
});
    $(window).resize(function() {
	var target = $("#home");
        $('html,body').animate({
          scrollTop: target.offset().top
        },{duration: 0, queue: false});
	$('html,body').animate({
          scrollLeft: target.offset().left
        },{duration: 0, queue: false});
});