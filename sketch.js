var cloudimage;
var CloudGroup, FuelGroup, BirdsGroup
var gamestate = 'play'
var fuelcount = 1000

function preload(){
    cloud1image = loadImage("Cloud1.png")
    cloud2image = loadImage("Cloud2.png")
    cloud3image = loadImage("Cloud3.png")
    planeimage = loadImage("plane.png")
    Fuelimage = loadImage("Fuel.png")
    Leftbirdimage = loadAnimation('Leftbird/frame1.png','Leftbird/frame2.png')
    Rightbirdimage = loadAnimation('Rightbird/frame1.png','Rightbird/frame2.png')
    
}

function setup(){
    var canvas = createCanvas(displayWidth-150,displayHeight-180);
    plane = createSprite(displayWidth/2,displayHeight-250)
    plane.addImage("plane,",planeimage)
    plane.scale = 0.35
    CloudGroup = new Group()
    BirdsGroup = new Group()
    FuelGroup = new Group()
}

function draw(){
    background(0,159,236);
if(gamestate === 'play'){
    planeControls()
    spawnClouds()
    spawnFuel()
    spawnBirds()
    if(plane.isTouching(BirdsGroup)){
    gamestate = 'end'
    }
    for(var i = 0;i<FuelGroup.length&&FuelGroup.length>0;i++){
        if(plane.isTouching(FuelGroup[i])){
            FuelGroup[i].destroy()
            fuelcount = fuelcount + 2000
            }

    }
}
else if(gamestate === 'end'){

    CloudGroup.setVelocityYEach(0)
    FuelGroup.setVelocityYEach(0)
    BirdsGroup.setVelocityEach(0)
}
 drawSprites()

 textSize(30)
 fill('black')
 stroke('blue')
 text('Fuelleft:'+fuelcount,100,100)
}

function planeControls(){

if(keyDown(LEFT_ARROW)){
    plane.x = plane.x-10
}
if(keyDown(RIGHT_ARROW)){
    plane.x = plane.x+10
}

}

function spawnClouds(){
if(World.frameCount%100===0){


var cloud = createSprite(random(0,displayWidth),0)
var cloudnumber = Math.round(random(1,3))
switch(cloudnumber){
case 1:cloud.addImage('cloud',cloud1image)
cloud.scale = 3.5
break;
case 2:cloud.addImage('cloud',cloud2image)
cloud.scale = 1.5
break;
case 3:cloud.addImage('cloud',cloud3image)
cloud.scale = 0.75
break;

}
//cloud.scale = 0.5
cloud.velocityY = 6
cloud.lifetime = 400
plane.depth = cloud.depth+1
CloudGroup.add(cloud)

}


}
function spawnFuel(){
    if(World.frameCount%300===0){
    
    
    var Fuel = createSprite(random(0,displayWidth),0)

   
    Fuel.addImage('Fuel',Fuelimage)

    Fuel.scale = 0.10
    Fuel.velocityY = 6
    Fuel.lifetime = 400
    plane.depth = Fuel.depth+1
    FuelGroup.add(Fuel)
    }
    
    }
function spawnBirds(){

    if(World.frameCount%200===0){


        var bird
        var birdnumber = Math.round(random(1,2))
        console.log(birdnumber)
        switch(birdnumber){
        case 1:bird = createSprite(displayWidth,random(0,20))
        bird.addAnimation('Leftbird',Leftbirdimage)
        bird.scale = 0.1
        bird.velocityX = random(-1,-4)
        bird.velocityY = random(1,4)
        break;
        case 2:bird = createSprite(0,random(0,20))
        bird.addAnimation('Rightbird',Rightbirdimage)
        bird.scale = 0.1
        bird.velocityX = random(1,4)
        bird.velocityY = random(1,4)
        break;
        
        
        }
        //cloud.scale = 0.5
        bird.lifetime = 400
        //plane.depth = cloud.depth+1
        BirdsGroup.add(bird)
    }
}