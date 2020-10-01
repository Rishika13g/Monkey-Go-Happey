//defining the variables
var monkey , monkey_running;
var bananaImage, obstacleImage;
var ground;
var bananaGroup, obtsacleGroup; 
var survivalTime = 0;
var score = 0;

//defining the game states for the game
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  //loading all the animations for the game
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  //creating a sprite for the monkey
  monkey = createSprite(80,315,900,10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  
  //creating the sprite for the ground and make it run infenitely
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  //creating groups for the obstacle and banana
  obstacleGroup = new Group();
  bananaGroup = new Group(); 
}


function draw() {
  background(255);
  
  if(gameState === PLAY){
    
  //making the monkey jump  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  
    //adding the infinetly scrolling background
  if (ground.x < 0){
     ground.x = ground.width/2;
  }
  
  //making the monkey collide with ground and calling the banana and obttsacle functions
  monkey.collide(ground);
  spawnBanana();
  spawnObstacles();
    

  //adding the survival time   
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100,50);
  
  }else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  
  }

  drawSprites();
}

function spawnBanana(){
  //spawning the banana
    if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -3;
    banana.lifetime = 200;
      
    //add each banana to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  //spawning the rock
  if(frameCount % 300 === 0) {
    var rock = createSprite(400,320,10,10);
    rock.addAnimation("rock", obstacleImage);
    rock.scale = 0.15;
    rock.velocityX = -(5+World.frameCount/1000);         
    rock.lifetime = 300;
    
    //add each obstacle to the group
    obstacleGroup.add(rock);
  }
}
