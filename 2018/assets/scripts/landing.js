//landing背景動畫


//old

var ww = $(".screen").innerWidth();
var wh = $(".screen").innerHeight();

var mouse = {x: 0, y: 0};

function draw() {
	requestAnimationFrame(draw);

	gradientAnimate();
	mouseAnimate();

	glitch();
}
draw();

var redColor = "rgba(199,43,83,1)";
var gradientSpeed = 1.5;
var gradientProgress = -100;
function gradientAnimate(){
	gradientProgress += gradientSpeed;
	if(gradientProgress > 200) gradientProgress = -100;
	var colorStop1 = `transparent -100%`;
	var colorStop2 = `transparent ${Math.min(Math.max(gradientProgress-80,-100),200)}%`;
	var colorStop3 = `${redColor} ${Math.min(Math.max(gradientProgress-10,-100),200)}%`;
	var colorStop4 = `${redColor} ${Math.min(Math.max(gradientProgress,-100),200)}%`;
	var colorStop5 = `${redColor} ${Math.min(Math.max(gradientProgress+10,-100),200)}%`;
	var colorStop6 = `transparent ${Math.min(Math.max(gradientProgress+80,-100),200)}%`;
	var colorStop7 = `transparent 200%`;
	$(".animate-light").css('background', `linear-gradient(-45deg, ${colorStop1}, ${colorStop2}, ${colorStop3}, ${colorStop4}, ${colorStop5}, ${colorStop6}, ${colorStop7})`);
}


$(window).on("mousemove", function(e){
	mouse.x = (e.pageX - $(".screen").offset().left)*100 / ww;
	mouse.y = (e.pageY - $(".screen").offset().top)*100 / wh;
	// console.log(mouse);
})

function mouseAnimate(){
	var x = mouse.x;
	var y = mouse.y;
	$(".mouse-light").css('background', `radial-gradient(circle at ${x}% ${y}%, ${redColor}, transparent 50%, transparent 100%)`);
}


//glitch
var frequency = 5;
var glitchCount = 0;
function glitch() {
	glitchCount++;
	if(glitchCount == frequency) {
		if(Math.random() < 0.1) {
			var ran = Math.round(Math.random()*4);
			$(".glitch").removeClass('active');
			$("#logo"+ran).addClass('active');
		} else {
			$(".glitch").removeClass('active');
			$("#logo0").addClass('active');
		}
		glitchCount = 0;
	}
}