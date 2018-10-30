// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ML5 Example
KNN_Image
KNN Image Classifier example with p5.js
=== */

let knn;
let video;
let i = 0;
var countdownnumber=3;
var countdownid;
var predict_t;
var play_t;
var win_t;
var p_time=0;

const st = document.getElementById("startbtn");
const cd = document.getElementById("countdown");


function countdownfunc(){
 
 
 cd.innerHTML=countdownnumber;
 if (countdownnumber==0){ 
  cd.style.display = "none";
  showpic();
  //setTimeout(delay,500);
  clearTimeout(countdownid);
 }else{
  countdownnumber--;
  if(countdownid){
   clearTimeout(countdownid);
  }
  countdownid=setTimeout(countdownfunc,500);
 }
}
 




function setup() {
  noCanvas();
  

  video = createCapture(VIDEO).parent('videoContainer');
  // Create a KNN Image Classifier

  knn = new ml5.KNNImageClassifier(3, 1, modelLoading, video.elt);
  knn.load('test.json', modelLoaded);
  
  createButtons();
  
}

function createButtons() {
 
  // Predict Button
  buttonPredict = select('#buttonNew');
  buttonPredict.mousePressed(function() {
    rs();
  });
  
}


function rs() {
    var audio = new Audio("s.wav");
 audio.play();
   countdownfunc();
   st.style.display = "none";
   predict();
}


// A function to be called when the model has been loaded
function modelLoaded() {
  select('#loading').html('猜拳模組載入成功');
}

function modelLoading() {
  select('#loading').html('猜拳模組載入中……');
}


function win() {
	
  
  cd.innerHTML="我贏";
	countdownnumber=3;
	cd.style.display = "";
	st.style.display = "";
	document.getElementById("myImg").src ="";
//  start_t = setTimeout(function(){
//    countdownfunc();
//  }, 1500);
}


function showpic() {

  if (i == 1) {
    //msg = '剪刀';
	document.getElementById("myImg").src = "p2.jpg";
  } else if (i == 2) {
    //msg = '石頭';
	document.getElementById("myImg").src = "p3.jpg";
  } else if (i == 3) {
    //msg = '布';
	document.getElementById("myImg").src = "p1.jpg";
  }

  
   win_t = setTimeout(function(){
    win();
  }, 3000);  
}



// Predict the current frame.
function predict() {
  knn.predictFromVideo(gotResults);
}

// Show the results
function gotResults(results) {
  let msg;

  i = results.classIndex;

  //select('#result').html(msg);

   predict_t = setTimeout(function(){
     predict();
   }, 50);
  
}

// Clear the data in one class
function clearClass(classIndex) {
  knn.clearClass(classIndex);
  win();
}

