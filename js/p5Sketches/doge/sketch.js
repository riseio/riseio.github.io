var lastUpdate = Date.now();
var player;
var keyboard = [false,false,false,false]
var numLayers;
var layerHeight
var doge_idle_spritesheet
var enemy_walk_spritesheet
var enemy_dead_spritesheet
var player_idle_sprite

var enemies = []
var score
var hscore
var difficultychange = 50

var menu = true
var dogeface


function preload() {
  doge_idle_spritesheet  = loadSpriteSheet('assets/doge_idle.png', 38,32, 5);
  enemy_walk_spritesheet  = loadSpriteSheet('assets/enemy_run.png', 18,14, 6);

  doge_idle_animation = loadAnimation(doge_idle_spritesheet);
  enemy_run_animation = loadAnimation(enemy_walk_spritesheet);
  doge_idle_animation.frameDelay = 15
  enemy_run_animation.frameDelay = 15

  background_sound = loadSound('assets/nyan.mp3');
  woofSound = loadSound('assets/woot.mp3');
  dogeface = loadImage("assets/doge_face.gif");  // Load the image
}



function setup() {
    var canvasDiv = document.getElementById('myCanvas');
    var width = canvasDiv.offsetWidth;
    var sketchCanvas = createCanvas(width,450);
    console.log(sketchCanvas);
    sketchCanvas.parent("myCanvas");
    background_sound.setVolume(0.5);
    background_sound.loop(0, 1.1, 0.05)

    // any additional setup code goes here
    player = {
      x: width/2,
      y: height - 50/2,
      vx: 0,
      vy: 0,
      speed: 50,
      alive: true,
      current_animation: doge_idle_animation
    }

    numLayers = floor(height/player.speed);
    layerHeight = floor(height/numLayers)
    initializeEnemies()
    score = 0
    hscore = 0
}

function initializeEnemies() {
  enemies = []
  for(var i=1; i<numLayers-1; i++) {
  enemy = {
    x: 2,
    y: 50/2 + i*layerHeight,
    alive: true,
    goingRight: true,
    speed: random(1,6)
  }
  if(random()*10 > 5) {
    enemy.x = width -2
    enemy.goingRight = false
  }
  enemies.push(enemy)
  }
}

function draw() {
  background(255)
    // your "draw loop" code goes here
    var now = Date.now();
    var dt = now - lastUpdate;
    dt /= 100
    lastUpdate = now;
    update(dt)
    if(menu == false)
      render(dt)
    else {
      image(dogeface, 0,0, width, height);
      textSize(60);
      fill('white')
      text('DOGGER', width/2-150, height/2);
    }
}

function update(dt) {
  movePlayer(dt)
  if(enemies.some(isHit)) {
    reset()
  }
  updateEnemies()

}

function updateEnemies() {
  for(var i=0; i<enemies.length; i++) {
    if(enemies[i].goingRight)
      enemies[i].x += enemies[i].speed
    else
      enemies[i].x -= enemies[i].speed
    if(enemies[i].x < 0) {
      if(testScore())
        enemies[i].x = width-2
      else {
        enemies[i].x = 2
        enemies[i].goingRight = true
        speed: random(1,6)
      }
    }
    else if (enemies[i].x > width) {
      if(testScore())
        enemies[i].x = 2
      else {
          enemies[i].x = width-2
          enemies[i].goingRight = false
          speed: random(1,6)
        }
    }
  }
}

function testScore() {
  var upper = 9-floor(score/50)
  if(upper < 0) upper = 0
  if(random()*10 < upper)
    return true
  else return false
}

function reset() {
  if(score>hscore)
    hscore = score
  score = 0
  player.x = width/2
  player.y = height - 50/2
  initializeEnemies()
}



function movePlayer(dt) {
  if(player.x > width) {
    player.x = player.speed/4
  } else if(player.x < 0) {
    player.x = width - player.speed/4
  }
  if(player.y > height) {
    player.y = height - player.speed/2
  } else if(player.y < 0) {
    player.y = player.speed/2
  }
}

function drawBackground() {
  noStroke()
  for(var i=0; i<numLayers; i++){
    if(i == 0) {
      fill('green')
    } else if(i == numLayers-1) {
      fill('red')
    } else {
      fill(random(0,255),random(0,255),random(0,255))
    }
    rect(0,layerHeight*i,width,layerHeight)
  }
}

function render(dt) {
  drawBackground()
  textSize(32);
  fill('white')
  text('HScore: ' + hscore, 5, height-20);
  text('Score: ' + score, 5, 35);
  animation(player.current_animation,player.x, player.y);
  enemies.map(animateEnemy)
}

function animateEnemy(enemy) {
  animation(enemy_run_animation,enemy.x, enemy.y);
}


function keyReleased() {
  if(menu) {
    menu = false
  } else {
    if (keyCode == UP_ARROW) {
      player.y -= player.speed;
      if(player.y > height-layerHeight || player.y < layerHeight) {}
      else score += 5
    }
    if (keyCode == DOWN_ARROW) {
      player.y += player.speed;
      if(player.y > height-layerHeight || player.y < layerHeight) {}
      else score += 5
    }
    if (keyCode == LEFT_ARROW) {
      player.x -= player.speed/2;
    }
    if (keyCode == RIGHT_ARROW) {
      player.x += player.speed/2;
    }
  }
  woofSound.play();
}

function isHit(enemy) {
  if(player.x+20 > enemy.x && player.x-20 < enemy.x && player.y-16<enemy.y && player.y+16>enemy.y)
    return true
}
