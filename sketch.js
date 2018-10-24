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

function setup() {
  noCanvas();
  video = createCapture(VIDEO).parent('videoContainer');
  // Create a KNN Image Classifier
  knn = new ml5.KNNImageClassifier(3, 1, modelLoaded, video.elt);
  createButtons();
}

function createButtons() {
  // Save and Load buttons
  save = select('#save');
  save.mousePressed(function() {
    knn.save('test');
  });

 load = select('#load');
 load.mousePressed(function() {
    knn.load('test.json', updateExampleCounts);
  });


  // Train buttons
  buttonA = select('#buttonA');
  buttonA.mousePressed(function() {
    train(1);
  });

  buttonB = select('#buttonB');
  buttonB.mousePressed(function() {
    train(2);
  });

  buttonC = select('#buttonC');
  buttonC.mousePressed(function() {
    train(3);
  });
  
  buttonC = select('#buttonD');
  buttonC.mousePressed(function() {
    train(4);
  }); 

  buttonC = select('#buttonE');
  buttonC.mousePressed(function() {
    train(5);
  });
  
    buttonC = select('#buttonF');
  buttonC.mousePressed(function() {
    train(6);
  });
 
  // Reset buttons
  resetBtnA = select('#resetA');
  resetBtnA.mousePressed(function() {
    clearClass(1);
    updateExampleCounts();
  });

  resetBtnB = select('#resetB');
  resetBtnB.mousePressed(function() {
    clearClass(2);
    updateExampleCounts();
  });

  resetBtnC = select('#resetC');
  resetBtnC.mousePressed(function() {
    clearClass(3);
    updateExampleCounts();
  });

  resetBtnC = select('#resetD');
  resetBtnC.mousePressed(function() {
    clearClass(4);
    updateExampleCounts();
  });
  
    resetBtnC = select('#resetE');
  resetBtnC.mousePressed(function() {
    clearClass(5);
    updateExampleCounts();
  });

    resetBtnC = select('#resetF');
  resetBtnC.mousePressed(function() {
    clearClass(6);
    updateExampleCounts();
  });
  
  // Predict Button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(predict);
}

// A function to be called when the model has been loaded
function modelLoaded() {
  select('#loading').html('Model loaded!');
}

// Train the Classifier on a frame from the video.
function train(category) {
  let msg;
  if (category == 1) {
    msg = 'A';
  } else if (category == 2) {
    msg = 'B';
  } else if (category == 3) {
    msg = 'C';
  } else if (category == 4) {
    msg = 'D';
  } else if (category == 5) {
    msg = 'E';
  } else if (category == 6) {
    msg = 'F';
  }
  select('#training').html(msg);
  knn.addImageFromVideo(category);
  updateExampleCounts();
}

// Predict the current frame.
function predict() {
  knn.predictFromVideo(gotResults);
}

// Show the results
function gotResults(results) {
  let msg;

  if (results.classIndex == 1) {
    msg = 'A';
  } else if (results.classIndex == 2) {
    msg = 'B';
  } else if (results.classIndex == 3) {
    msg = 'C';
  } else if (results.classIndex == 4) {
    msg = 'D';
  } else if (results.classIndex == 5) {
    msg = 'E';
  } else if (results.classIndex == 6) {
    msg = 'F';
  }
  select('#result').html(msg);

  // Update confidence
  select('#confidenceA').html(results.confidences[1]);
  select('#confidenceB').html(results.confidences[2]);
  select('#confidenceC').html(results.confidences[3]);
  select('#confidenceD').html(results.confidences[4]);
  select('#confidenceE').html(results.confidences[5]);
  select('#confidenceF').html(results.confidences[6]);
  setTimeout(function(){
    predict();
  }, 50);
}

// Clear the data in one class
function clearClass(classIndex) {
  knn.clearClass(classIndex);
}

// Update the example count for each class
function updateExampleCounts() {
  let counts = knn.getClassExampleCount();
  select('#exampleA').html(counts[1]);
  select('#exampleB').html(counts[2]);
  select('#exampleC').html(counts[3]);
  select('#exampleD').html(counts[4]);
  select('#exampleE').html(counts[5]);
  select('#exampleF').html(counts[6]);
}