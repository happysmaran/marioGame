var bgimg, marioimg, marioDeadimg, marioHeadImg, groundimg, bulletimg, cloudimg, coinimg, gameOverimg, pipesimg, restartimg, textimg, enemyimg;
var mario, ground, gameState=1, back;

var pipeGroup, enemyGroup, bullGroup, coinGroup, score=0;

var checkSnd, jumpSnd, GO_Snd, shootSnd;

function preload(){
    marioimg=loadAnimation("mario1.png","mario2.png");
    marioDeadimg=loadImage("mario_dead.png");
    marioHeadimg=loadImage("mario-head.png");
    groundImg=loadImage("ground.png");
    bulletimg=loadImage("bullet.png");
    bgimg=loadImage("bg.png");
    pipesimg=loadImage("pipes.png");
    cloudimg=loadImage("cloud.png");
    back=loadImage("end.png");
    enemyimg=loadAnimation("enemy1.png","enemy2.png");
    coinimg=loadImage("coin.png");

    checkSnd=loadSound("checkPoint.mp3");
    jumpSnd=loadSound("jump.mp3");
    GO_Snd=loadSound("gameover.ogg");
    shootSnd=loadSound("shoot-impact.mp3");

}
function setup(){
    createCanvas(2000,1000);
    mario=createSprite(100,100,40,40);
    mario.addAnimation("mario", marioimg);

    mario.scale=0.8;

    ground=createSprite(1100,965,2000,20);

    pipeGroup=createGroup();
    bullGroup=createGroup();
    enemyGroup=createGroup();
    coinGroup=createGroup();

    invi=createSprite(1000,950,2000,5);
    invi.visible=false;

    ground.addImage("gnd",groundImg);

    //console.log(displayWidth);

}
function draw(){
    background(bgimg);

    textSize(50);
    text("Score:"+score, 200,200);

    if(gameState===1){
        if(keyDown(UP_ARROW)){
            mario.velocityY=-30;
    
            jumpSnd.play();
        }
    
        spawnCloud();
        spawnPipes();
    
        spawnEnemy();

        spawnCoin();
    
        ground.velocityX=-8;
    
        if(ground.x<700){
            ground.x=ground.width/2;
        }

        if(keyDown("space")){
            shoot();
            shootSnd.play();
        }

        if(bullGroup.isTouching(enemyGroup)){
            enemyGroup.destroyEach();
            bullGroup.destroyEach();
        }
        
    
        mario.velocityY=mario.velocityY+3;
    
        mario.collide(invi);
        //mario.collide(pipeGroup);
    
        if(pipeGroup.isTouching(mario)){
            gameState=0
            GO_Snd.play();
        }

        for(var j =0; j<coinGroup.length;j++){
			if(coinGroup.isTouching(mario)){
                checkSnd.play();
                coinGroup.get(j).destroy();
                score=score+1;
			}
		}

        if(enemyGroup.isTouching(mario)){
            gameState=0
            GO_Snd.play();
        }
    
        drawSprites();
    }

    if(gameState==0){
        background(back);
    }
}

    

function spawnCloud(){
    
    if(frameCount%60===0){
        var cloud=createSprite(2500,random(700,0),200,200);
        cloud.addImage("c", cloudimg);

        cloud.scale=3;

        cloud.velocityX=-4;
    }
}

function spawnPipes(){
    
    if(frameCount%100===0){
        var pipe=createSprite(2500,900,200,200);
        pipe.addImage("p", pipesimg);

        mario.collide(pipe);
        pipeGroup.add(pipe)

        pipe.velocityX=-8;


    }
}

function spawnEnemy(){
    
    if(frameCount%160===0){
        var enemy=createSprite(2500,900,200,200);
        enemy.addAnimation("e", enemyimg);

        enemy.scale=0.3;

        enemy.velocityX=-8;
        enemyGroup.add(enemy);
    }
}

function shoot(){
    var bull=createSprite(mario.x,mario.y,200,200);
        bull.addAnimation("b", bulletimg);

        bull.velocityX=10;

        bullGroup.add(bull);
}

function spawnCoin(){
    
    if(frameCount%200===0){
        for(var i=0 ; i<5 ;i++){
			coin = createSprite(1200+i*20,200 ,10,10);
			coin.addImage("coin",coinimg);
			coin.velocityX = -8;
			coin.lifetime = 1000;
			coinGroup.add(coin);
		}
    }
}