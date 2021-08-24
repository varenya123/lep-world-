var right, pickleJar, groundback, coin, obstacle, invisGround, edges, gameOver
var rightImg, pickleJarImg, backgroundImg, coinImg, obstacleImg, gameOverImg
var fireGroup, coinGroup
var PLAY = 1
var END = 0
var score = 0
var gameState = PLAY

function preload(){
rightImg = loadImage("right.png")
pickleJarImg = loadImage("picklejar.png")
backgroundImg = loadImage("background.jpg")
coinImg = loadImage("coin1.png")
obstacleImg = loadImage("obstacle.png")
gameOverImg = loadImage("go.jpg")
lavaImg = loadImage("lava.png")

}

function setup(){
createCanvas(1500,600)
lavaGroup=createGroup()

groundback = createSprite(200,0,1500,700)
groundback.addImage(backgroundImg)
groundback.scale=2.5
groundback.velocityX=-4
right= createSprite(50,450,50,50)
right.addImage(rightImg)
right.scale=0.3
pickleJar = createSprite(1350,300,10,10)
pickleJar.addImage(pickleJarImg)
pickleJar.scale=0.25
invisGround = createSprite(0,457,3000,20)
invisGround.visible = false
groundback.x=groundback.width/2
console.log(displayWidth)
console.log(displayHeight)
fireGroup = new Group()
coinGroup = new Group()
}

function draw(){
background("green")
edges = createEdgeSprites()

right.collide(invisGround)
if (gameState===PLAY){
    if(groundback.x<600){
    groundback.x=1000
    }

if(keyDown("space")){
    right.velocityY = -10
}
right.velocityY = right.velocityY + 0.8
spawnObstacles()
spawnCoins()
if (keyDown("right")) {
    right.velocityX = 3
}
if (keyDown("left")){
    right.velocityX = -3
}
right.collide(edges)
spawnlava()
if(coinGroup.isTouching(right)){
    score = score + 5
    coinGroup.destroyEach()
}
if(fireGroup.isTouching(right)){
    gameState = END
    fireGroup.destroyEach()
    coinGroup.destroyEach()
    right.addImage(gameOverImg)
}

}
if(gameState === END){
groundback.velocityX = 0
right.velocityX = 0
right.velocityY = 0
lavaGroup.setVelocityXEach(0)

}
drawSprites()
if(score >= 6 && right.isTouching(pickleJar)){
    textSize(30)
    text("You win!",350,300)
}
textSize(20)
fill("green")
text ("score:"+score,750,50)
fill("white")
text ("Earn 30 points to touch me and win!", 1150, 200)
}



function spawnCoins(){
    if (frameCount % 250 === 0){
        var coin = createSprite(1300,Math.round(random(100,450)),10,10)
        coin.addImage(coinImg)
        coin.velocityX = -3
        coin.scale = 0.2
        coinGroup.add(coin)
        coin.lifetime=700
    }
}
function spawnlava(){
    if (frameCount % 550 === 0){
        var lava = createSprite(1300,500,10,10)
        lava.addImage(lavaImg)
        lava.velocityX = -3
        lava.scale = 1.5
        lavaGroup.add(lava)
        lava.lifetime=700
    
    }
    function spawnObstacles() {
        if(frameCount % 250 === 0) {
          var obstacle = createSprite(600,165,10,40);
          //obstacle.debug = true;
          obstacle.velocityX = -(6 + 3*score/100);
          
          //generate random obstacles
          var rand = Math.round(random(1,3));
          switch(rand) {
            case 1: obstacle.addImage(animal1);
                    break;
            case 2: obstacle.addImage(animal2);
                    break;
            case 3: obstacle.addImage(snail);
                    break;
            default: break;
          }
        }