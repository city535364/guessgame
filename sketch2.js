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
var countdownnumber=5;
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
  countdownid=setTimeout(countdownfunc,1000);
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

  buttonPredict.mousePressed(rs());
}


function rs() {
   cd.style.display = "";
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
	setTimeout.clear(win_t);
  
  cd.innerHTML="我贏";
	countdownnumber=5;
	st.style.display = "";
	
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
  p_time++;
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

