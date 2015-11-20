
$(document).ready(function(){
	//Initialize third party services
	$(document).foundation();

	//Method to sticky menu effect
	sticky_menu_effect_scroll();

	//Method to initialize gallery
	slick_gallery_technologies();

	//Effect to menu links
	effect_menu_link();

	//Active class menu items links
	animation_active_class_menu_links();

	//Effect text change in slogan
	change_text_slogan();

	//Only apply effects to desktop version	
	if($(window.top).width() > 1024){

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

function change_text_slogan(){

	//Replace each 3 seconds
	window.setInterval(function(){
	  	
		var newSpan = "<span display='none'>Web App</span>";
		$(".first-section .slogan .text-change span").hide("puff", null, 20000, function(){
			//Remove element and add new span
			$(".first-section .slogan .text-change").empty();

			$(".first-section .slogan .text-change").append(newSpan);
			$(".first-section .slogan .text-change span").show("puff", null, 20000, null);
		});

	}, 20000);
}

function animation_active_class_menu_links(){
	//Initialization
	add_active_class_menu_links();

	//Calculate with event
	$(window).scroll(function(){
		add_active_class_menu_links();
	});
}

function add_active_class_menu_links(){
	var topAboutUs = $("#about-us").offset().top - 200;
	var topHowWeWorks = $("#how-we-works").offset().top - 200;
	var topContact = $("#contact-us").offset().top - 200;

	var topBody = $(window).scrollTop();

	if(topBody < topAboutUs){
		//Remove all li
		$("nav.top-bar ul.right li").removeClass("active");
	}
	else if(topBody >= topAboutUs && topBody < topHowWeWorks){
		//Remove all li
		$("nav.top-bar ul.right li").removeClass("active");
		//Add about us
		$("nav.top-bar ul.right li.about-us").addClass("active");
	}
	else if(topBody >= topHowWeWorks && topBody < topContact){
		//Remove all li
		$("nav.top-bar ul.right li").removeClass("active");
		//Add about us
		$("nav.top-bar ul.right li.how-we-works").addClass("active");
	}
	else if(topBody >= topContact){
		//Remove all li
		$("nav.top-bar ul.right li").removeClass("active");
		//Add about us
		$("nav.top-bar ul.right li.contact-us").addClass("active");
	}


}

function effect_menu_link(){
	var ink, d, x, y;
	$("nav.top-bar section.top-bar-section ul li a, a.ghost-button, nav.top-bar li.toggle-topbar a").click(function(e){
		if($(this).find(".ink").length === 0){
		    $(this).prepend("<span class='ink'></span>");
		}
		     
		ink = $(this).find(".ink");
		ink.removeClass("animate");
		 
		if(!ink.height() && !ink.width()){
		    d = Math.max($(this).outerWidth(), $(this).outerHeight());
		    ink.css({height: d, width: d});
		}
		 
		x = e.pageX - $(this).offset().left - ink.width()/2;
		y = e.pageY - $(this).offset().top - ink.height()/2;
		 
		ink.css({top: y+'px', left: x+'px'}).addClass("animate");

		//Redirect window top to the section by anchor link
		var anchorLink = $(this).attr("href");
		var topDiv = $(anchorLink).offset().top - 77;
		$("html, body").stop().animate({scrollTop:topDiv}, '2000', 'swing', null);
	});
}

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