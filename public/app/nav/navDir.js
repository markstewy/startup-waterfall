angular.module('app.nav')
	.directive('navDir', function() {
  return {
    restrict: 'E',
    templateUrl: './app/nav/nav.html',
    controller: 'navCtrl',
	controllerAs: 'navCtrl',
	link: function() {
		// jQuery to collapse the navbar on scroll
		function collapseNavbar() {
			console.log($('.navbar'));
			console.log($(".navbar").offset());
		    if ($(".navbar").offset().top > 50) {
		        $(".navbar-fixed-top").addClass("top-nav-collapse");
		    } else {
		        $(".navbar-fixed-top").removeClass("top-nav-collapse");
		    }
		}

		$(window).scroll(collapseNavbar);
		collapseNavbar();

		// jQuery for page scrolling feature - requires jQuery Easing plugin
		$(function() {
		    $('a.page-scroll').bind('click', function(event) {
		        var $anchor = $(this);
		        $('html, body').stop().animate({
		            scrollTop: $($anchor.attr('href')).offset().top
		        }, 1500, 'easeInOutExpo');
		        event.preventDefault();
		    });
		});

		// Closes the Responsive Menu on Menu Item Click
		$('.navbar-collapse ul li a').click(function() {
		    $(this).closest('.collapse').collapse('toggle');
		});
	}
  };
});
