let theStream: any;

export function getUserMedia(
  options: any,
  successCallback: any,
  failureCallback: any
) {
  var api = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia) as any;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}

export function getStream() {
  if (
    !navigator.getUserMedia &&
    !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia &&
    !navigator.msGetUserMedia
  ) {
    alert("User Media API not supported.");
    return;
  }

  var constraints = {
    video: true,
  };

  getUserMedia(
    constraints,
    function (stream: any) {
      var mediaControl = document.querySelector("video")! as any;
      if ("srcObject" in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (!!navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(
          stream
        );
      }
      theStream = stream;
    },
    function (err: Error) {
      alert("Error: " + err);
    }
  );
}

export function takePhoto() {
  if (!("ImageCapture" in window)) {
    alert("ImageCapture is not available");
    return;
  }

  if (!theStream) {
    alert("Grab the video stream first!");
    return;
  }

  var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

  theImageCapturer
    .takePhoto()
    .then((blob) => {
      var theImageTag = document.querySelector("#imageTag")! as any;
      theImageTag.src = URL.createObjectURL(blob);
    })
    .catch((err) => alert("Error: " + err));
}
