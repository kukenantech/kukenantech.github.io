
$(document).ready(function(){
	$(document).foundation();

	//Method to adjust height of first section to display first and second section on page load
	auto_height_first_section();

	//Method to sticky menu effect
	sticky_menu_effect_scroll();
});

function auto_height_first_section(){

	if($(window.top).width() > 1000){
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
}

function sticky_menu_effect_scroll(){

	$(window).scroll(function(){

		if($("section.menu-section .sticky").hasClass("fixed")){
			$("nav.top-bar li.name h1 a img").attr("src", "img/Kukenan-Cube.png");
		}
		else{
			$("nav.top-bar li.name h1 a img").attr("src", "img/Kukenan-Logo-Black-Letters.png");
		}

		//Assign class to body and topbar when page not load on top
		if($(this).scrollTop() == 0){
			$("body").removeClass("f-topbar-fixed");
			$("div.contain-to-grid.sticky").removeClass("fixed");
		}
		
	});
}