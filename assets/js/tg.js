var keyWord = "cholado";
var nFramesInLoop = 120;
var bEnableExport = false;
var nElapsedFrames;
var bRecording;
var theCanvas;

function setup() {
    theCanvas = createCanvas(windowWidth, windowHeight);
    bRecording = false;
    nElapsedFrames = 0;
}

function keyTyped() {
if (bEnableExport) {
    if ((key === 'r') || (key === 'R')) {
    bRecording = true;
    nElapsedFrames = 0;
    }
}
}

function draw() {
    var percentCompleteFraction = 0;
    if (bRecording) {
      percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
    } else {
      percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
    }
    renderMyDesign (percentCompleteFraction);
    if (bRecording && bEnableExport) {
      var frameOutputFilename = keyWord + "_frame_" + nf(nElapsedFrames, 4) + ".png";
      print("Saving output image: " + frameOutputFilename);
      saveCanvas(theCanvas, frameOutputFilename, 'png');
      nElapsedFrames++;
  
      if (nElapsedFrames >= nFramesInLoop) {
        bRecording = false;
      }
    }
  }

function renderMyDesign (percent) {

}