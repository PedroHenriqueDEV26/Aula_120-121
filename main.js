var previsionResult = "";


function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  classifier = ml5.imageClassifier("MobileNet", modelLoaded)
}
function modelLoaded(){
console.log("modelo carregado")
}

function gotResult(error,results){
if (error) {
  console.error(error)
}
else{
  if (results[0].confidence > 0.5 && (previsionResult != results[0].label)) {
    previsionResult = results[0].label
    var synth = window.speechSynthesis;
    speakData  = "o objeto detectado é "+previsionResult;
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);

    document.getElementById("nameObj").innerHTML = previsionResult
    document.getElementById("btnPrec").innerHTML = results[0].confidence.toFixed(2)

  }
}
}

function draw(){
  image( video,0,0,300,300);
  classifier.classify(video, gotResult)
}


