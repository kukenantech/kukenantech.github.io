
$(document).ready(function(){
	//Initialize third party services
	$(document).foundation();

	//Method to sticky menu effect
	sticky_menu_effect_scroll();

	//Method to initialize gallery
	slick_gallery_technologies();	

	//Active class menu items links
	animation_active_class_menu_links();

	//Effect text change in slogan
	change_text_slogan();

	//Move image in "How we works" section
	move_image_how_we_work();

	//Method to link "Go top"
	go_top_link();

	//Effect to menu links
	effect_menu_link();

	//Validate contact form
	validate_contact_form();

	//Only apply effects to desktop version	
	if($(window.top).width() > 1024){

		//Method to adjust height of first section to display first and second section on page load
		auto_height_first_section();		

		//Parallax Effects
		parallax_efect_first_section();

		//Method to hide hww images before scroll down
		hww_hide_images();

		//Method to fade in hww images on scroll down
		hww_content_scroll_fade_in();
	}
	else if($(window.top).width() < 640){

		//Overwrite event to menu-icon
		event_menu_icon();
	}
});

function go_top_link(){
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
	//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
	offset_opacity = 1200,
	//duration of the top scrolling animation (in ms)
	scroll_top_duration = 700,
	//grab the "back to top" link
	$back_to_top = $('.cd-top');

	//hide or show the "back to top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
}

function move_image_how_we_work(){

	//Move the images for each stage
	if($(window.top).width() < 640){
		$("section.fourth-section .stage .info").each(function(){

			var image = $(this).find(".image");
			var content = $(this).find(".content");

			content.after(image);
		});
	}

	//Apply fix in resize event
	$(window).resize(function(){
		if($(window.top).width() < 640){
			$("section.fourth-section .stage .info").each(function(){

				var image = $(this).find(".image");
				var content = $(this).find(".content");

				content.after(image);
			});
		}
		else{
			//Only stages 1, 3, 4 and 6
			$("section.fourth-section .stage .info").each(function(){

				var image = $(this).find(".image");
				var content = $(this).find(".content");

				if($(this).parents(".stage").hasClass("stage-1") || $(this).parents(".stage").hasClass("stage-3") || $(this).parents(".stage").hasClass("stage-4") || $(this).parents(".stage").hasClass("stage-6")){
					content.before(image);
				}					
			});
		}
	});
}

function change_text_slogan(){
	var rText = 0;
	var rColors = 1;
	var container = $(".first-section .slogan .text-change");
	var element = $(".first-section .slogan .text-change span");
	var colors = ["#F6CA5C", "#c8f70c", "#f0e807"];
	var _width = 0;

	//Replace each 3 seconds
	window.setInterval(function(){

		element.eq(rText).removeClass("show-el"),
		rText=(rText+1)%element.length;

		if(element.eq(rText).text() == "Web Solutions"){
			if($(window.top).width() < 1024){
				_width = 260;
			}
			else{
				_width = 370;
			}			
		}
		else if(element.eq(rText).text() == "Web Design"){
			if($(window.top).width() < 1024){
				_width = 216;
			}
			else{
				_width = 315;
			}			
		}
		else{
			_width = element.eq(rText)[0].scrollWidth;
		}

		container.css({width:_width});

		var newColor=colors[rColors];
		rColors=(rColors+1)%colors.length;
		element.eq(rText).css({color:newColor}).addClass("show-el");

	}, 2e3);
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
	var topContact = $("#contact").offset().top - 200;

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
		var topDiv = $(anchorLink).offset().top - 67;

		$("html, body").stop().animate({scrollTop:topDiv}, '2000', 'swing', null);
	});

	//Add event to links in footer
	$("section.footer ul.links_site li a").click(function(e){
		//Redirect window top to the section by anchor link
		var anchorLink = $(this).attr("href");
		var topDiv = $(anchorLink).offset().top - 67;
		$("html, body").stop().animate({scrollTop:topDiv}, '2000', 'swing', null);
	});
}

function slick_gallery_technologies(){
	var drag = !($(window.top).width() > 1024);

	//Initialize the gallery
	if($(window.top).width() > 1023){
		$(".gallery").slick({
			infinite: true,
			slidesToShow: 8,
			slidesToScroll: 1,
			autoplay: true,
	  		autoplaySpeed: 3000,
	  		cssEase: 'linear',
	  		draggable: drag
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
	  		cssEase: 'linear',
	  		draggable: drag
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
	  		cssEase: 'linear',
	  		draggable: drag
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
		  		cssEase: 'linear',
		  		draggable: drag
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
		  		cssEase: 'linear',
		  		draggable: drag
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
		  		cssEase: 'linear',
		  		draggable: drag
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
	if(auto_height > 320){
		$("section.row.first-section").css("height", auto_height+"px");
		$("section.row.first-section p.slogan").css("margin-top", percentage+"%");
	}	
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

function hww_hide_images(){
	$("#contact-image").addClass("scroll-hide");
	$("#requirements-image").addClass("scroll-hide");
	$("#loe-image").addClass("scroll-hide");
	$("#dev-image").addClass("scroll-hide");
	$("#testing-image").addClass("scroll-hide");
	$("delivery-image").addClass("scroll-hide");

	$("#dotted-1-2").addClass("scroll-hide");
	$("#dotted-2-3").addClass("scroll-hide");
	$("#dotted-3-4").addClass("scroll-hide");
	$("#dotted-4-5").addClass("scroll-hide");
	$("#dotted-5-6").addClass("scroll-hide");
	$("#dotted-6-7").addClass("scroll-hide");


	//Hidding the How we works images
	$(".scroll-hide").hide();
}

function hww_content_scroll_fade_in(){
  $(window).scroll(function(){
    var docScroll = $(this).scrollTop(), 
        stageOneOffset = $(".stage-1").offset().top - ($(window).height() - 250),
        stageTwoOffset = $(".stage-2").offset().top - ($(window).height() - 250)
        stageThreeOffset = $(".stage-3").offset().top - ($(window).height() - 250)
        stageFourOffset = $(".stage-4").offset().top - ($(window).height() - 250)
        stageFiveOffset = $(".stage-5").offset().top - ($(window).height() - 250)
        stageSixOffset = $(".stage-6").offset().top - ($(window).height() - 250)
        dotted_1_2_Offset = $(".dotted-1-2").offset().top - ($(window).height() - 150)
        dotted_2_3_Offset = $(".dotted-2-3").offset().top - ($(window).height() - 150)
        dotted_3_4_Offset = $(".dotted-3-4").offset().top - ($(window).height() - 150)
        dotted_4_5_Offset = $(".dotted-4-5").offset().top - ($(window).height() - 150)
        dotted_5_6_Offset = $(".dotted-5-6").offset().top - ($(window).height() - 150);
    
    if(docScroll >= stageOneOffset) {
    	$("#contact-image").fadeIn(500);
    }
    if(docScroll >= stageTwoOffset) {
    	$("#requirements-image").fadeIn(500);
    }
    if(docScroll >= stageThreeOffset) {
    	$("#loe-image").fadeIn(500);
    }
    if(docScroll >= stageFourOffset) {
    	$("#dev-image").fadeIn(500);
    }
    if(docScroll >= stageFiveOffset) {
    	$("#testing-image").fadeIn(500);
    }
    if(docScroll >= stageSixOffset) {
    	$("#delivery-image").fadeIn(500);
    }

    if(docScroll >= dotted_1_2_Offset) {
    	$("#dotted-1-2").fadeIn(200);
    }
    if(docScroll >= dotted_2_3_Offset) {
    	$("#dotted-2-3").fadeIn(200);
    }
    if(docScroll >= dotted_3_4_Offset) {
    	$("#dotted-3-4").fadeIn(200);
    }
    if(docScroll >= dotted_4_5_Offset) {
    	$("#dotted-4-5").fadeIn(200);
    }
    if(docScroll >= dotted_5_6_Offset) {
    	$("#dotted-5-6").fadeIn(200);
    }
  })
}

function validate_contact_form() {
	$("#contact_form").validate({
		ignore: [],
		rules: {
			name: "required",
			_replyto: {
				required: true,
				email: true
			},
			country: "required",
			idea: "required",
			"hiddenRecaptcha": {
			    required: function() {
					if(grecaptcha.getResponse() == '') {
					var spanError = '<div class="recaptcha-error-message">Please verify that you are not a robot.</div>';

					if($(".recaptcha-error-message").length == 0){
						//Add error to recaptcha
						$(".g-recaptcha > div").addClass("recaptcha-error");
						$(".g-recaptcha > div").append(spanError);
					}			

						return true;
					} else {

						//Remove border and span
						if($(".recaptcha-error-message").length > 0){
							//Add error to recaptcha
							$(".g-recaptcha > div").removeClass("recaptcha-error");
							$(".g-recaptcha > div .recaptcha-error-message").remove();
						}

						return false;
					}
			    }
			}
		},
		messages: {
			name: "Please enter your name.",
			_replyto: {
				required: "Please enter an email address.",
				email: "Please enter a valid email address.",
			},
			country: "Please entre your country",
			idea: "Please enter your idea.",
		}		
	});

	$("#contact_form").attr('action', '//formspree.io/' + 'kukenantech' + '@' + 'gmail' + '.' + 'com');
	$("#_cc").val("juanj" + "." + "gonzalezp" + "@" + "gmail" + ".com");
}