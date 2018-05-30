//手機menu相關
$(".m-menu-opener").on("click", function() {
	$(".menu").toggleClass('active');
	$(".m-menu-opener").toggleClass('close');
})

$(".menu-btn").on("click", function() {
	$(".menu").removeClass('active');
	$(".m-menu-opener").removeClass('close');
})

//切換menu動畫樣式
function changeMenuAnimate(index) {
	$(".menu").removeClass('menu-cir');
	$(".menu").removeClass('menu-fadein');
	$(".menu").removeClass('menu-slidein');
	switch(index) {
		case 1:
			$(".menu").addClass('menu-cir');
			break;
		case 2:
			$(".menu").addClass('menu-fadein');
			break;
		case 3:
			$(".menu").addClass('menu-slidein');
			break;
	}
}

//menu隱藏＆出現
// var prevScrollpos = window.pageYOffset;
// $(window).on("scroll", function(e){
// 	if(isScrolling) return;
// 	var currentScrollPos = window.pageYOffset;
// 	if (prevScrollpos > currentScrollPos) {
// 		$("header").removeClass('hide');
// 	} else {
// 		$("header").addClass('hide');
// 	}
// 	prevScrollpos = currentScrollPos;
// })

//導航列位置指示
var controller = new ScrollMagic.Controller();
var sections = [$("#intro"),$("#program"),$("#registration"),$("#taichi"),$("#crew"),$("#organizer"),$("#contact")];

for(i=0; i<sections.length; i++) {
	var sectionId = sections[i].attr("id");
	var sectionHeight = sections[i].outerHeight();//s - (window.innerHeight / 2);
	console.log(sectionHeight);
	var scene = new ScrollMagic.Scene({triggerElement: "#"+sectionId, duration: sectionHeight, triggerHook: 0.5})
	.setClassToggle("#menu"+(i+1), "menu-here")
	.addTo(controller);
}



//smooth scroll
var isScrolling = false;
//滾動偏移量
var scrollOffset = $("header").height();
$(function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
			  	// ga('send', 'event','menu','click', 'menu_'+$(this).attr('href').substring(1));
				isScrolling = true;// 確保animate就算先做執行 也不會做完ga
				$('html, body').animate({
				scrollTop: target.offset().top - scrollOffset
				}, 400, function(){
					setTimeout(function(){
						isScrolling = false;
					},100);
	        	});
				return false;
			}
		}
	});
});

var page = 0;

//crew section
$(".crew-content").click(function(){
	if(page==0){
		$(".slide-block").css("left","-360px");
		page=1;
	}
	else if(page==1){
		$(".slide-block").css("left","-720px");
		page=2;
	}
	else if(page==2){
		$(".slide-block").css("left","-1080px");
		page=3;
	}
	else if(page==3){
		$(".slide-block").css("left","0px");
		page=0;
	}
});