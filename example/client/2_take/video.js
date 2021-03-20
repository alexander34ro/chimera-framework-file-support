const exec = require('child_process').exec;
const os = require('os');

if (require.main === module) {
  const path = '_' + os.platform() + '_video_sample_' + Date.now() + '.mp4';
  const framerate = '-framerate 30';
  const time = '-t 4';

  let format;
  let input;

  if (os.platform() === 'android') {
    exec(
      `termux-camera-photo -c 1 ${path}`,
      () => {
        console.log(path);
      }
    );
  } else if (os.platform() === 'darwin') {
    format = '-f avfoundation';
    input = '-i default';
    exec(
      `ffmpeg ${format} ${framerate} ${input} ${time} ${path}`,
      () => {
        console.log(path);
      }
    );
  } else {
    format = '-f v4l2';
    input = '-i /dev/video0'
    exec(
      `ffmpeg ${format} ${framerate} ${input} ${time} ${path}`,
      () => {
        console.log(path);
      }
    );
  }
}
