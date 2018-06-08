// $(window).on("load", animateMase);

//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

var stage = new Container();
var renderer = autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: true, view: document.querySelector('#screen'), resolution: window.devicePixelRatio < 2 ? 2 : window.devicePixelRatio });
var screenContainer = new Container();
stage.addChild(screenContainer);

//resize
renderer.autoResize = true;
$(window).resize(function() {
    renderer.resize(window.innerWidth, window.innerHeight);
})


loader
    .add("./assets/images/logo1.png")
    .add("./assets/images/logo2.png");
loader.load(setup);



function setup() {
	drawScreen();
    render();
}

var numInRow,numInCol;

var cirRadius = 20;
function drawScreen() {
	var marginTop = cirRadius*2/Math.sqrt(2);
	var marginLeft = cirRadius*4/Math.sqrt(2);

	numInRow = parseInt(window.innerWidth/marginLeft)+1;
	numInCol = (parseInt(window.innerWidth/marginTop)+1) + 4 - (parseInt(window.innerWidth/marginTop)+1)%4;
	console.log(numInCol);
	for (var j = 0; j < numInCol; j+=4) {
		var marginRow = j*cirRadius*2/Math.sqrt(2);
		//第1排
		for (var i = 0; i < numInRow; i++) {
			if(i%2==0) {
				var c = cir(1,i*marginLeft,marginRow);
			} else {
				var c = cir(2,i*marginLeft,marginRow);
			}
			c.screenPos = {x:i,y:j};
			screenContainer.addChild(c);
		}
		//第2排
		for (var i = 0; i < numInRow; i++) {
			if(i%2==0) {
				var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop);
			} else {
				var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop);
			}
			c.screenPos = {x:i,y:j+1};
			screenContainer.addChild(c);
		}
		//第3排
		for (var i = 0; i < numInRow; i++) {
			if(i%2==0) {
				var c = cir(3,i*marginLeft,marginRow+marginTop*2);
			} else {
				var c = cir(1,i*marginLeft,marginRow+marginTop*2);
			}
			c.screenPos = {x:i,y:j+2};
			screenContainer.addChild(c);
		}
		//第4排
		for (var i = 0; i < numInRow; i++) {
			if(i%2==0) {
				var c = cir(5,marginLeft/2+i*marginLeft,marginRow+marginTop*3);
			} else {
				var c = cir(4,marginLeft/2+i*marginLeft,marginRow+marginTop*3);
			}
			c.screenPos = {x:i,y:j+3};
			screenContainer.addChild(c);
		}
	}
}

function getCirFromPos(pos) {
	var c = screenContainer.children.find(c => {
		return (c.screenPos.x == pos.x && c.screenPos.y == pos.y)
	})
	return c;
}


function changeAlpha(pos,alpha) {
	var c = getCirFromPos(pos);
	if(alpha==1) {
		if(c.stat == 1) return;
		c.stat = 1;
	} else {
		if(c.stat == 0) return;
		c.stat = 0;
	}
	var ran = Math.random()/2;
	setTimeout(function(){
		TweenMax.to(c,0.3,{alpha:alpha});
	},ran*1000,alpha);
	// TweenMax.to(c,0.3,{alpha:alpha});
}


// .
function animate1() {
	for (var i = 0; i < numInCol; i++) {
		for (var j = 0; j < numInRow; j++) {
			var pos = {x:j,y:i};
			if(i%4 == 0) {
				if(j%2 == 0) {
					changeAlpha(pos,1);
				} else {
					// changeAlpha(pos,0.2);
				}
			} 
			if(i%4 == 2) {
				if(j%2 == 0) {
					// changeAlpha(pos,0.2);
				} else {
					changeAlpha(pos,1);
				}
			}
		}
	}
}

// \
function animate2() {
	for (var i = 1; i < numInCol; i++) {
		for (var j = 0; j < numInRow; j++) {
			var pos = {x:j,y:i};

			if(i%4 == 1) {
				if(j%2 == 0) {
					changeAlpha(pos,1);
				} else {
					// changeAlpha(pos,0.2);
				}
			}
			if(i%4 == 3){
				if(j%2 == 0) {
					// changeAlpha(pos,0.2);
				} else {
					changeAlpha(pos,1);
				}
			}
		}
	}
}


// /
function animate3() {
	for (var i = 1; i < numInCol; i++) {
		for (var j = 0; j < numInRow; j++) {
			var pos = {x:j,y:i};

			if(i%4 == 1) {
				if(j%2 == 0) {
					// changeAlpha(pos,0.2);
				} else {
					changeAlpha(pos,1);
				}
			}
			if(i%4 == 3){
				if(j%2 == 0) {
					changeAlpha(pos,1);
				} else {
					// changeAlpha(pos,0.2);
				}
			}
		}
	}
}

// -
function animate4() {
	for (var i = 1; i < numInCol; i++) {
		for (var j = 0; j < numInRow; j++) {
			var pos = {x:j,y:i};
			if(i%4 == 0) {
				if(j%2 == 1) {
					changeAlpha(pos,1);
				}
			}
		}
	}
}

// |
function animate5() {
	for (var i = 1; i < numInCol; i++) {
		for (var j = 0; j < numInRow; j++) {
			var pos = {x:j,y:i};
			if(i%4 == 2) {
				if(j%2 == 0) {
					changeAlpha(pos,1);
				} else {
					// changeAlpha(pos,0.2);
				}
			}
		}
	}
}



// .
function animateMase() {
	// clear();
	for (var i = 0; i < numInCol; i++) {
		for (var j = 0; j < numInRow; j++) {
			var pos = {x:j,y:i};
			if(i%4 == 1 || i%4 == 3) {
				if(j%2 == Math.round(Math.random())) {
					changeAlpha(pos,1);
				} else {
					changeAlpha(pos,0.1);
				}
			}
			if(i%4 == 0) {
				if(j%2 == 0) {
					changeAlpha(pos,1);
				} else {
					// changeAlpha(pos,0.2);
				}
			} 
			if(i%4 == 2) {
				if(j%2 == 0) {
					// changeAlpha(pos,0.2);
				} else {
					changeAlpha(pos,1);
				}
			}
		}
	}
	setTimeout(animateMase,1000);
}

var isDrawing = true;

// type 1:o, 2:-, 3:|, 4:\, 5:/
function cir(type,x,y) {
	if(type == 1) {
		var c = new Sprite(resources["./assets/images/logo1.png"].texture);
	} else {
		var c = new Sprite(resources["./assets/images/logo2.png"].texture);
	}
	c.anchor.set(0.5, 0.5);
	c.width = c.height = cirRadius*2;
	c.x = x;
	c.y = y;
	c.alpha = 0.1;
	c.stat = 0; //off-on
	if(type==3){
		c.rotation = Math.PI/2;
	}
	if(type==4){
		c.rotation = Math.PI/4;
	}
	if(type==5){
		c.rotation = -Math.PI/4;
	}

	// console.log(c);


	c.interactive = true;

	var isPressing = false;
	$(window).on('mousedown', press);
	$(window).on('mouseup', release);
	c.on('mousedown', press2);
	c.on('mouseover', toggle);

	function press(e) {
		isPressing = true;
		// toggle(e);
	}
	function press2(e) {
		isPressing = true;
		toggle(e);
	}
	function release(e) {
		isPressing = false;
	}

	function toggle(e) {
		// console.log(isPressing);
		if(isPressing) {
			// console.log(e);
			if(e.target) {
				if(isDrawing) {
					TweenMax.to(e.target,0.3,{alpha:1});
					e.target.stat = 1;
				} else {
					TweenMax.to(e.target,0.3,{alpha:0.2});
					e.target.stat = 0;
				}
			}
		}
	}
				
	return c;
}


function printMap() {
	var map = [];
	for (var i = 0; i < numInCol; i++) {
		map.push([]);
		for (var j = 0; j < numInRow; j++) {
			map[i].push([]);
		}
	}
	// console.log(map);
	screenContainer.children.forEach(c => {
		var pos = c.screenPos;
		
		// console.log(pos);
		map[pos.y][pos.x] = c.stat;
	})
	console.log(JSON.stringify(map));
}

//render
function render() {
    requestAnimationFrame(render);
    renderer.render(stage);
}






var animism2 = 
[

[0,0,0,0,0,0,1,0,1,0,0,0,1,1,1,0,1,1,1],
[0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,1,1,0],
[0,0,0,0,0,1,1,0,1,1,0,0,1,1,1,0,1,1,1],
[0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
[0,0,0,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
[0,0,0,1,1,1,0,0,1,1,1,0,1,1,0,0,1,1,0],
[0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1],
[0,0,1,1,1,1,0,0,1,1,0,1,1,1,0,0,1,1,0],
[0,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
[0,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
[0,1,1,1,1,1,1,0,1,1,1,0,0,1,1,0,1,1,1],
[1,1,1,0,1,1,0,0,1,1,0,0,0,1,0,0,1,1,0],
[1,1,1,0,1,1,1,0,1,1,1,0,0,0,1,0,1,1,1],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1],
[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1],
[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1],
[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1],
[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0],
[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,1],
[1,1,0,0,0,1,1,1,1,0,0,0,1,0,0,0,0,1,0],
[1,1,1,0,0,1,1,1,0,1,0,0,1,1,0,0,0,1,1],
[1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,1,1,0],
[1,1,1,0,0,0,1,0,0,0,0,0,1,1,1,0,1,1,1],
[1,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0],
[1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1],
[1,1,0,0,0,0,0,1,0,0,0,0,1,1,0,1,1,1,0],
[1,1,1,0,0,0,0,0,1,0,0,0,1,1,1,0,1,1,1],
[1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0],
[1,1,1,0,0,1,0,1,1,1,0,0,1,1,1,0,1,1,1],
[1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,0],
[1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,1,1,1]
]



var animism = 
[
	[0,0,0,0,0,0,1,0,1,0,0,0,1,1,1,0,1,1,1,0,1,0,0,0,0,0,1],
	[0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,0,1,1,0,0,1,0,0,0,0,1,0],
	[0,0,0,0,0,1,1,0,1,1,0,0,1,1,1,0,1,1,1,0,1,1,0,0,0,1,1],
	[0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
	[0,0,0,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
	[0,0,0,1,1,1,0,0,1,1,1,0,1,1,0,0,1,1,0,0,1,1,1,1,1,1,0],
	[0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1],
	[0,0,1,1,1,1,0,0,1,1,0,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
	[0,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
	[0,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
	[0,1,1,1,1,1,1,0,1,1,1,0,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1],
	[1,1,1,0,1,1,0,0,1,1,0,0,0,1,0,0,1,1,0,0,1,1,0,0,1,1,0],
	[1,1,1,0,1,1,1,0,1,1,1,0,0,0,1,0,1,1,1,0,1,1,1,0,1,1,1],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,1],
	[0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,0,0,0,1,0,0,0,0,1,0],
	[0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,1,0,0,1,1,0,0,0,1,1],
	[0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,1,1,0,0,1,1,0],
	[0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,1,1,1,0,1,1,1],
	[0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0],
	[0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1],
	[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,1,1,0,0,1,1,0],
	[0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,1,1,1,0,1,1,1],
	[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0],
	[0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,1,0,1,0,0,1,1,1,0,1,1,1],
	[0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,1,0,0,0,1,1,0,0,1,1,0],
	[0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,1,1,1]
]

var aaa = 
[
	[0,0,0,0,0,0,1,0,0,0,0,0,0],
	[0,0,0,0,0,1,1,0,0,0,0,0,0],
	[0,0,0,0,0,1,0,1,0,0,0,0,0],
	[0,0,0,0,1,0,0,1,0,0,0,0,0],
	[0,0,0,0,1,0,1,0,1,0,0,0,0],
	[0,0,0,1,0,1,1,0,1,0,0,0,0],
	[0,0,0,1,0,1,0,1,0,1,0,0,0],
	[0,0,1,0,1,0,0,1,0,1,0,0,0],
	[0,0,1,0,1,0,1,0,1,0,1,0,0],
	[0,1,0,1,0,1,1,0,1,0,1,0,0],
	[0,1,0,1,0,1,0,1,0,1,0,1,0],
	[0,1,0,1,0,1,0,1,0,1,0,1,0],
	[1,0,1,0,1,0,1,0,1,0,1,0,1],
	[1,0,1,0,1,0,0,1,0,1,0,1,0],
	[0,1,0,1,0,1,0,1,0,1,0,1,0],
	[0,1,0,1,0,1,1,0,1,0,1,0,0],
	[0,0,1,0,1,0,1,0,1,0,1,0,0],
	[0,0,1,0,1,0,0,1,0,1,0,0,0],
	[0,0,0,1,0,1,0,1,0,1,0,0,0],
	[0,0,0,1,0,1,1,0,1,0,0,0,0],
	[0,0,0,0,1,0,1,0,1,0,0,0,0],
	[0,0,0,0,1,0,0,1,0,0,0,0,0],
	[0,0,0,0,0,1,0,1,0,0,0,0,0],
	[0,0,0,0,0,1,1,0,0,0,0,0,0],
	[0,0,0,0,0,0,1,0,0,0,0,0,0]
]


function drawBitmap(x,y,b) {
	for (var i = y; i < numInCol; i++) {
		for (var j = x; j < numInRow; j++) {
			var pos = {x:j,y:i};
			if(b.length>i-y && b[i-y].length>j-x) {
				var stat = b[i-y][j-x];
				if(stat == 1) {
					changeAlpha(pos,1);
				}
			}
		}
	}
}

function clear() {
	for (var i = 0; i < numInCol; i++) {
		for (var j = 0; j < numInRow; j++) {
			var pos = {x:j,y:i};
			changeAlpha(pos,0.2);
		}
	}
}

$(window).on("keypress",function(e) {
	if(e.keyCode == 49) {
		clear();
		drawBitmap(4,4,animism);
	}
	if(e.keyCode == 50) {
		clear();
		animateMase();
	}
});




