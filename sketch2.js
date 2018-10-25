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

var countdownnumber=5;
var countdownid;

const st = document.getElementById("startbtn");
const cd = document.getElementById("countdown");


function countdownfunc(){
  st.style.display = "none";
 
 cd.innerHTML=countdownnumber;
 if (countdownnumber==0){ 
  cd.style.display = "none";
  predict();
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

  knn = new ml5.KNNImageClassifier(3, 1, modelLoaded, video.elt);
  knn.load('test.json', modelLoaded);
  
  createButtons();

}

function createButtons() {
 
  // Predict Button
  buttonPredict = select('#buttonNew');

  buttonPredict.mousePressed(countdownfunc);
}


function restart() {

   predict();

}


// A function to be called when the model has been loaded
function modelLoaded() {
  select('#loading').html('猜拳模組載入成功');
}

function modelLoading() {
  select('#loading').html('猜拳模組載入中……');
}

function restart() {

   
}

function win() {
  cd.style.display = "";
  cd.innerHTML="我贏";
	countdownnumber=5;
	st.style.display = "";
}



// Predict the current frame.
function predict() {
  knn.predictFromVideo(gotResults);
}

// Show the results
function gotResults(results) {
  let msg;

  if (results.classIndex == 1) {
    //msg = '剪刀';
	document.getElementById("myImg").src = "p2.jpg";
  } else if (results.classIndex == 2) {
    //msg = '石頭';
	document.getElementById("myImg").src = "p3.jpg";
  } else if (results.classIndex == 3) {
    //msg = '布';
	document.getElementById("myImg").src = "p1.jpg";
  }
  //select('#result').html(msg);

  setTimeout(function(){
    win();
  }, 3000);
}

// Clear the data in one class
function clearClass(classIndex) {
  knn.clearClass(classIndex);
}

