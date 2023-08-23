img="";
status="";
objects=[];
function preload(){
    img=loadImage('xbox.jpeg');
    song=loadSound("The Dancing Queen Group - Funky Town.mp3")
}
song="";
function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,420);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function draw(){
    image(video,0,0,640,420);
    if (status!="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(img,gotResult);
        for ( i = 0; i < objects.length; i++) {
         document.getElementById("status").innerHTML="status:objectDetected";
         document.getElementById("numberofobjects").innerHTML="number of objects detected are:"+objects.length;
         fill(r,g,b);
         percent=floor(objects[i].confidence*100);
         text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
         noFill();
         stroke(r,g,b);
         rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
         if(objects[i].label=="person"){
            document.getElementById("numberofobjects").innerHTML="baby found";
            console.log("stop");
            song.stop();
         }
         else{
            document.getElementById("numberofobjects").innerHTML="baby not found";
            console.log("play");
            song.play();
         }
        }
        if(
            objects.length==0
        ){
            document.getElementById("numberofobjects").innerHTML="baby not found";
            console.log("play");
            song.play();
        }
    }
}
function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
    }