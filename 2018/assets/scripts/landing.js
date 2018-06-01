//landing背景動畫

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



// var c = document.getElementById("mask");
// var ctx = c.getContext("2d");
// var c2 = document.getElementById("light");
// var ctx2 = c2.getContext("2d");


// var resolution = 2;

// var ww = $(".screen").innerWidth();
// var wh = $(".screen").innerHeight();

// c.width = c2.width = ww*resolution;
// c.height = c2.height = wh*resolution;

// var bgColor = [25,20,86];

// var isLoaded = false;

// var img = new Image(); 
// var imageData;
// img.addEventListener("load", function() {
// 	isLoaded = true;
// 	resize();
// }, false);
// img.src = './assets/images/animism.png'; 


// function resize() {
// 	ww = $(".screen").innerWidth();
// 	wh = $(".screen").innerHeight();
// 	c.width = c2.width = ww*resolution;
// 	c.height = c2.height = wh*resolution;

// 	//put mask
// 	ctx.clearRect(0,0,c.width,c.height);
// 	ctx.drawImage(img,0,0,c.width,c.height);
// }
// $(window).on("resize", resize);

// var gradientProgress = 0;
// function draw() {
// 	requestAnimationFrame(draw);

// 	if(!isLoaded) return;

// 	//clear
// 	ctx2.clearRect(0,0,c.width,c.height);

// 	gradientAnimate();
// 	mouseAnimate();

	
// }
// draw();


// var redColor = "rgba(199,43,83,0.8)";
// var mouse = {x: c.width/2, y: c.height/2};

// function mouseAnimate() {
// 	var gradient = ctx2.createRadialGradient(mouse.x,mouse.y,50,mouse.x,mouse.y,400*resolution);
// 	gradient.addColorStop(0, redColor);
// 	gradient.addColorStop(1, "transparent");
// 	ctx2.fillStyle = gradient;
// 	ctx2.fillRect(0,0,c.width,c.height);
// }

// function gradientAnimate() {
// 	gradientProgress+= 0.005;
// 	gradientProgress = gradientProgress%1;
// 	var gradient = ctx2.createLinearGradient(c.width*2, c.height*2,-c.width*2,-c.height*2);
// 	gradient.addColorStop(0, "transparent");
// 	gradient.addColorStop(Math.min(Math.max(gradientProgress-0.4,0),1), "transparent");
// 	gradient.addColorStop(Math.min(Math.max(gradientProgress-0.05,0),1), redColor);
// 	gradient.addColorStop(gradientProgress, redColor);
// 	gradient.addColorStop(Math.min(Math.max(gradientProgress+0.05,0),1), redColor);
// 	gradient.addColorStop(Math.min(Math.max(gradientProgress+0.4,0),1), "transparent");
// 	gradient.addColorStop(1, "transparent");
// 	ctx2.fillStyle = gradient;
// 	ctx2.fillRect(0,0,c.width,c.height);
// }

// $(window).on("mousemove", function(e){
// 	mouse.x = (e.pageX - $(".screen").offset().left)*resolution;
// 	mouse.y = (e.pageY - $(".screen").offset().top)*resolution;
// })