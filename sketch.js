var balloon,height;
var database, position;
var hotAir_Animation,bg;

function preload(){
  hotAir_Animation= loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png");
}
function setup(){
    createCanvas(displayWidth,displayHeight);
    balloon = createSprite(250,250,10,10);

    bg=loadImage("Hot Air Ballon-01.png");
    //balloon.addImage()
    //balloon.shapeColor = "red";

    database= firebase.database();
    var balloonRef = database.ref('balloon/position');
    balloonRef.on("value", readPosition)

   /* var balloonRefy = database.ref('balloon/height');
    balloonRefy.on("value", readHeight)*/
}

function draw(){
    background(bg);

    balloon.addAnimation("normal",hotAir_Animation)
    if(keyDown(LEFT_ARROW)){
        balloon.addAnimation("Left Move",hotAir_Animation)
        writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        balloon.addAnimation("Right Move",hotAir_Animation)
       writePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        balloon.addAnimation("Up Move",hotAir_Animation)
     writePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
        balloon.addAnimation("Down Move",hotAir_Animation)
        writePosition(0,+10);
    }
    drawSprites();
}

function changePosition(x,y){
    balloon.x = balloon.x + x;
    balloon.y = balloon.y + y;
}
function readPosition(data){
    position= data.val();

    balloon.x=position.x
    balloon.y=position.y 
}
function writePosition(x,y){
    database.ref('balloon/position').set({
        x: position.x + x,
        y: position.y + y
    });
}

/*function writePosition(height){
    database.ref('balloon/height').set({
        height: balloon.height+balloon.height
    });
}*/
function readHeight(data){
    height= data.val();

    balloon.height=balloon.height
}