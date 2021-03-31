var blackAnt_img, greenAnt_img, mainAnt_img, redAnt_img, yellowAnt_img;
var blackAnt, greenAnt, redAnt, yellowAnt;
var blackAnt1Group, greenAnt1Group, bigAntGroup, redAnt1Group, yellowAnt1Group;
var blackAnt2Group, greenAnt2Group, redAnt2Group, yellowAnt2Group;
var ouch_img, youLose_img, youWin_img, score_img, start_img, restart_img;
var bgStart_img, bgGame_img;
var bgStart, bgGame, smashSound, loseSound, winSound;
var invisibleGround, restart, winLoseMessage;
var startButton, player, score;
var isBigAntCreated = false;
//var WAIT = 0;
//var PLAY = 1;
//var END = 2;
var gameState = 0;
var score = 0;
var win = 0;
var lose = 0;
var hitBigAnt = 0;

function preload(){
  blackAnt_img = loadImage("images/black_ant.png");
  greenAnt_img = loadImage("images/green_ant.png");
  mainAnt_img = loadImage("images/big_ant.png");
  redAnt_img = loadImage("images/red_ant.png");
  yellowAnt_img = loadImage("images/yellow_ant.png");
  bgStart_img = loadImage("images/bgMain.png");
  bgGame_img = loadImage("images/bg_game.jpg");
  ouch_img = loadImage("images/ouch_text.png");
  youLose_img = loadImage("images/you_lose.png");
  youWin_img = loadImage("images/you_win.png");
  score_img = loadImage("images/score.png");
  start_img = loadImage("images/start_text.png");
  restart_img = loadImage("images/restart.png");
  smashSound = loadSound("antSmashSound.mp3");
  loseSound = loadSound("loseSound.mp3");
  winSound = loadSound("winSound.mp3");
}
 
function setup(){
  createCanvas(windowWidth, windowHeight);

  //bg = createSprite(width/2, height/2, width, height);
  //bg.addImage("bg1", bgStart_img);
  //bg.addImage("bg2", bgGame_img);
  //bg.scale = 3;

  player = createSprite(0, 0, 15, 10);
  score = 0;

  startButton = createSprite(width/2+100, height/2+100, 10, 10);
  startButton.addImage("start", start_img);
  startButton.scale = 0.3;
  startButton.debug = true;

  invisibleGround = createSprite(width/2, height, width, 10);
  invisibleGround.visible = false;
  winLoseMessage = createSprite(width/2, height/2-100, 10, 10);
  winLoseMessage.visible = false;
  restart = createSprite(width/2, height/2+200, 10, 10);
  restart.addImage(restart_img);
  restart.scale = 0.6;
  restart.visible = false;

  blackAnt1Group = new Group();
  redAnt1Group = new Group();
  greenAnt1Group = new Group();
  yellowAnt1Group = new Group();
  bigAntGroup = new Group();

  blackAnt2Group = new Group();
  redAnt2Group = new Group();
  greenAnt2Group = new Group();
  yellowAnt2Group = new Group();
}

function draw(){
   //console.log(gameState + "wait: " + WAIT);
  if(gameState === 0){
     background(bgStart_img);
     //console.log("wait");
     if(mousePressedOver(startButton)){
        gameState = 1;
        //console.log("start");
     }
   }

  if(gameState === 1){
     //bg.addImage("bg2", bgGame_img);
     background(bgGame_img);
     player.x = mouseX;
     player.y = mouseY;
     startButton.visible = false;
     if(player.isTouching(redAnt1Group)){
        redAnt1Group.destroyEach();
        score++;
        smashSound.play();
     }
     if(player.isTouching(blackAnt1Group)){
        blackAnt1Group.destroyEach();
        score++;
        smashSound.play();
   }
   if(player.isTouching(greenAnt1Group)){
      greenAnt1Group.destroyEach();
      score++;
      smashSound.play();
   }
   if(player.isTouching(yellowAnt1Group)){
      yellowAnt1Group.destroyEach();
      score++;
      smashSound.play();
   }
   if(player.isTouching(redAnt2Group)){
      redAnt2Group.destroyEach();
      score++;
      smashSound.play();
   }
   if(player.isTouching(blackAnt2Group)){
      blackAnt2Group.destroyEach();
      score++;
      smashSound.play();
 }
 if(player.isTouching(greenAnt2Group)){
    greenAnt2Group.destroyEach();
    score++;
    smashSound.play();
 }
 if(player.isTouching(yellowAnt2Group)){
    yellowAnt2Group.destroyEach();
    score++;
    smashSound.play();
 }
 if(score === 25){
    //win = 1;
    //winSound.play();
    gameState = "level2";
 }
 console.log(gameState);
 if(invisibleGround.isTouching(redAnt1Group) || invisibleGround.isTouching(redAnt2Group) || 
    invisibleGround.isTouching(blackAnt1Group) || invisibleGround.isTouching(blackAnt2Group) ||
    invisibleGround.isTouching(greenAnt1Group) || invisibleGround.isTouching(greenAnt2Group) ||
    invisibleGround.isTouching(yellowAnt1Group) || invisibleGround.isTouching(yellowAnt2Group)){
    lose = 1;
    loseSound.play();
    gameState = 2;
 }
     var rand = Math.round(random(1, 4))
     if(frameCount % 10 === 0){
        switch(rand){
           case 1: spawnRedAnts();
           break;
           case 2: spawnBlackAnts();
           break;
           case 3: spawnGreenAnts();
           break;
           case 4: spawnYellowAnts();
           break;
        }
     }
  }else if(gameState === "level2"){
     background(bgGame_img);
     if(isBigAntCreated === false){
         spawnBigAnts();
        isBigAntCreated = true;
     }
     console.log("score" + score );
     if(mousePressedOver(bigAntGroup)){
        smashSound.play();
        if(frameCount % 3 === 0){
           hitBigAnt++
        }
     }
     if(hitBigAnt >= 17){
        bigAntGroup.destroyEach();
        win = 1;
        gameState = 2;
     }
     if(bigAntGroup.isTouching(invisibleGround)){
        bigAntGroup.destroyEach();
        lose = 1;
        gameState = 2;
     }
  }else if(gameState === 2){
     redAnt1Group.setVelocityYEach(0);
     redAnt2Group.setVelocityYEach(0);
     blackAnt1Group.setVelocityYEach(0);
     blackAnt2Group.setVelocityYEach(0);
     greenAnt1Group.setVelocityYEach(0);
     greenAnt2Group.setVelocityYEach(0);
     yellowAnt1Group.setVelocityYEach(0);
     yellowAnt2Group.setVelocityYEach(0);
     redAnt1Group.setLifetimeEach(-1);
     redAnt2Group.setLifetimeEach(-1);
     blackAnt1Group.setLifetimeEach(-1);
     blackAnt2Group.setLifetimeEach(-1);
     greenAnt1Group.setLifetimeEach(-1);
     greenAnt2Group.setLifetimeEach(-1);
     yellowAnt1Group.setLifetimeEach(-1);
     yellowAnt2Group.setLifetimeEach(-1);
     if(lose === 1){
        winLoseMessage.addImage(youLose_img);
     }
     if(win === 1){
        winLoseMessage.addImage(youWin_img);
     }
     winLoseMessage.visible = true;
     restart.visible = true;
     if(mousePressedOver(restart)){
        reset();
     }
  }

  image(score_img, displayWidth-180, 15, 80, 80);

  drawSprites();

  textSize(25);
  fill(0);
  text(" : " + score, displayWidth-100, 58);
}

function spawnRedAnts(){
  var redAnt = createSprite(Math.round(random(50, width - 100)), 0, 10, 10);
  redAnt.addImage(redAnt_img);
  redAnt.scale = 0.2;
  redAnt.velocityY = 3+score/100;
  redAnt.lifetime = 700;
  var rand = Math.round(random(1, 2))
  if(rand === 1){
     redAnt1Group.add(redAnt);
  }else{
     redAnt2Group.add(redAnt);
  }
}

function spawnBlackAnts(){
   var blackAnt = createSprite(Math.round(random(50, width - 100)), 0, 10, 10);
   blackAnt.addImage(blackAnt_img);
   blackAnt.scale = 0.2;
   blackAnt.velocityY = 2+score/100;
   blackAnt.lifetime = 700;
   var rand = Math.round(random(1, 2))
  if(rand === 1){
     blackAnt1Group.add(blackAnt);
  }else{
     blackAnt2Group.add(blackAnt);
  }
 }

 function spawnGreenAnts(){
   var greenAnt = createSprite(Math.round(random(50, width - 100)), 0, 10, 10);
   greenAnt.addImage(greenAnt_img);
   greenAnt.scale = 0.2;
   greenAnt.velocityY = 4+score/100;
   greenAnt.lifetime = 700;
   var rand = Math.round(random(1, 2))
  if(rand === 1){
     greenAnt1Group.add(greenAnt);
  }else{
     greenAnt2Group.add(greenAnt);
  }
 }

 function spawnYellowAnts(){
   var yellowAnt = createSprite(Math.round(random(50, width - 100)), 0, 10, 10);
   yellowAnt.addImage(yellowAnt_img);
   yellowAnt.scale = 0.2;
   yellowAnt.velocityY = 3+score/100;
   yellowAnt.lifetime = 700;
   var rand = Math.round(random(1, 2))
  if(rand === 1){
     yellowAnt1Group.add(yellowAnt);
  }else{
     yellowAnt2Group.add(yellowAnt);
  }
 }

 function spawnBigAnts(){
   var bigAnt = createSprite(width/2, -165, 10, 10);
   bigAnt.addImage(mainAnt_img);
   bigAnt.scale = 0.6;
   bigAnt.velocityY = 4;
   bigAntGroup.add(bigAnt);
 }

 function reset(){
    redAnt1Group.destroyEach();
    redAnt2Group.destroyEach();
    blackAnt1Group.destroyEach();
    blackAnt2Group.destroyEach();
    greenAnt1Group.destroyEach();
    greenAnt2Group.destroyEach();
    yellowAnt1Group.destroyEach();
    yellowAnt2Group.destroyEach();
    score = 0;
    winLoseMessage.visible = false;
    restart.visible = false;
    lose = 0;
    win = 0 ;
    gameState = 1;
    isBigAntCreated = false;
 }