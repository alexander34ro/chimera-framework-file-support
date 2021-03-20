const NodeWebcam = require('node-webcam');
const exec = require('child_process').exec;
const os = require('os');

if (require.main === module) {
  const path = '_' + os.platform() + '_camera_sample_' + Date.now() + '.jpg';
  if (os.platform() === 'android') {
    exec(
      `termux-camera-photo -c 1 ${path}`,
      (error, stdout, stderr) => {
        console.log(path);
      }
    );
  } else {
    const Webcam = NodeWebcam.create();
    Webcam.capture(path, function (err, data) { console.log(data); });
  }
}
