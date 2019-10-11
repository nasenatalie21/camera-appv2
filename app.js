// Set constraints for the video stream
var constraints = { video: true, audio: false };
var track = null;
var shouldFaceUser = true;


// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraSwitch = document.querySelector("#camera--switch"),
    saveImage = document.querySelector("#save--image");

// Access the device camera and stream to cameraView
function cameraStart() {
    constraints.video = { facingMode: shouldFaceUser ? 'user' : 'environment'}
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // track.stop();
};

// Switch Camera to back/front camera
cameraSwitch.addEventListener('click', function(){
   if(track == null) return
   track.getTracks().array.forEach(t => {
       t.stop();
   });
   shouldFaceUser = !shouldFaceUser;
});

// Save the image to local gallery
saveImage.onclick = function() {
    var gh = cameraOutput.src;
    var a  = document.createElement('a');
    a.href = gh;
    a.download = 'image.png';

    a.click()
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);