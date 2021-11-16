img = "";
objects = [];
status = "";

function preload(){
}

function setup(){
     canvas = createCanvas(600, 450);
     canvas.position(450, 250);
     video = createCapture(VIDEO);
     video.size(600, 450);
     video.hide();
     objectDetector = ml5.objectDetector('cocossd', modelLoaded);
     document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
     console.log("Model Loaded");
     status = true;
}

function gotResult(error, results){
     if(error){
          console.error(error);
     }

     console.log(results);
     objects = results;
}

function draw(){
     image(video, 0,0, 600, 450);
     if(status != ""){
          r = random(255);
          g = random(255);
          b = random(255);
          objectDetector.detect(video, gotResult);
          for(i = 0; i < objects.length; i++){
               document.getElementById("status").innerHTML = "Status : Object Detected";
               document.getElementById("number_of_object").innerHTML = "Number of objects detected are :" + objects.length;
     fill(r,g,b);
     percent = floor(objects[i].confidence * 100);
     text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
     noFill();     
     stroke(r,g,b);
     rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
     }
     }
}