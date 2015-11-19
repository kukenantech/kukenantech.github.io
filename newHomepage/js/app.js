
$(document).ready(function(){
	//Initialize third party services
	$(document).foundation();

	//Method to sticky menu effect
	sticky_menu_effect_scroll();

	//Method to initialize gallery
	slick_gallery_technologies();

	//Only apply effects to desktop version	
	if($(window.top).width() > 1000){

		//Method to adjust height of first section to display first and second section on page load
		auto_height_first_section();		

		//Parallax Effects
		parallax_efect_first_section();
	}
	else if($(window.top).width() < 640){

		//Overwrite event to menu-icon
		event_menu_icon();
	}
});

function slick_gallery_technologies(){
	//Initialize the gallery
	if($(window.top).width() > 1023){
		$(".gallery").slick({
			infinite: true,
			slidesToShow: 8,
			slidesToScroll: 1,
			autoplay: true,
	  		autoplaySpeed: 3000,
	  		cssEase: 'linear'
		});

		$("#items-technologies").val("8");
	}
	else if($(window.top).width() > 640){
		$(".gallery").slick({
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: true,
	  		autoplaySpeed: 3000,
	  		cssEase: 'linear'
		});

		$("#items-technologies").val("5");
	}
	else{
		$(".gallery").slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
	  		autoplaySpeed: 3000,
	  		cssEase: 'linear'
		});

		$("#items-technologies").val("3");
	}

	//Event resize
	$(window).resize(function(){

		//Create the gallery again
		if($(window.top).width() > 1023 && $("#items-technologies").val() != "8"){
			$('.gallery').slick('unslick');
			$(".gallery").slick({
				infinite: true,
				slidesToShow: 8,
				slidesToScroll: 1,
				autoplay: true,
		  		autoplaySpeed: 3000,
		  		cssEase: 'linear'
			});

			$("#items-technologies").val("8");
		}
		else if($(window.top).width() > 640 && $("#items-technologies").val() != "5"){
			$('.gallery').slick('unslick');
			$(".gallery").slick({
				infinite: true,
				slidesToShow: 5,
				slidesToScroll: 1,
				autoplay: true,
		  		autoplaySpeed: 3000,
		  		cssEase: 'linear'
			});

			$("#items-technologies").val("5");
		}
		else if($(window.top).width() <= 640 && $("#items-technologies").val() != "3"){
			$('.gallery').slick('unslick');
			$(".gallery").slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				autoplay: true,
		  		autoplaySpeed: 3000,
		  		cssEase: 'linear'
			});

			$("#items-technologies").val("3");
		}
	});

}

function event_menu_icon(){

	$(document).on("click", "section.menu-section nav.top-bar li.toggle-topbar.menu-icon a", function(){

		if($("section.menu-section nav.top-bar").hasClass("expanded")){
			$("section.menu-section nav.top-bar").removeClass("expanded");
		}
		else{
			$("section.menu-section nav.top-bar").addClass("expanded");
		}		
		return false;
	});
}

function auto_height_first_section(){
	
	var height_screen = $(window.top).height();

	//Calculate the height required to first section to adjust the second section to bottom
	var auto_height = height_screen-90-110;
	//% to increase or decrease slogan to new auto-height of first section
	var percentage = 0;

	if(auto_height == 500){
		percentage = 6;
	}
	else if(auto_height > 500){
		percentage = parseInt(Math.abs(500 - auto_height) / 25, 10) + 7;
	}
	else{
		percentage = 6 - parseInt(Math.abs(500 - auto_height) / 25, 10);
	}

	//Assign values
	$("section.row.first-section").css("height", auto_height+"px");
	$("section.row.first-section p.slogan").css("margin-top", percentage+"%");		
}

function sticky_menu_effect_scroll(){

	$(window).scroll(function(){

		if($("section.menu-section .sticky").hasClass("fixed")){
			$("nav.top-bar li.name h1 a img").attr("src", "img/Kukenan-Logo-sticky.png");
		}
		else{
			$("nav.top-bar li.name h1 a img").attr("src", "img/Kukenan-Logo-White-Letters.png");
		}

		//Assign class to body and topbar when page not load on top
		if($(this).scrollTop() == 0){
			$("body").removeClass("animated");
			$("div.contain-to-grid.sticky-custom").removeClass("sticky-custom-animated");
			$("div.contain-to-grid.sticky-custom .top-bar").removeClass("top-bar-animated");
		}
		else{
			if($("body").hasClass("animated") == false){
				$("body").addClass("animated");
				$("div.contain-to-grid.sticky-custom").addClass("sticky-custom-animated", 100, "swing");
				$("div.contain-to-grid.sticky-custom .top-bar").addClass("top-bar-animated", 100, "swing");
			}
		}
		
	});
}

function parallax_efect_first_section(){

	//Parallax Background
	$('section[data-type="background"], div[data-type="background"]').each(function(){
		var objParallax = $(this); // assigning the object

		$(window).scroll(function(){
	      	//Calculate yPosition
	      	var yPos = -($(this).scrollTop() / objParallax.data('speed'));
	      	// Put together our final background position
       		var coords = '50% '+ yPos + 'px';

       		// Move the background
            objParallax.css({ backgroundPosition: coords });
	    });		
	});

	//Parallax slogan and brief
	$('span[data-type="slogan"]').each(function(){
		var objParallax = $(this); // assigning the object

		$(window).scroll(function(){
	      	//Calculate Opacity
	      	var opacityPercentage = 1 - (($(this).scrollTop() / objParallax.data('speed')) / 100);
	      	// Put together our final background position
       		var coords = opacityPercentage;

       		// Move the background
            objParallax.css({ zoom: 1, filter:"alpha(opacity="+opacityPercentage+")", opacity:opacityPercentage });
	    });	
	});

}