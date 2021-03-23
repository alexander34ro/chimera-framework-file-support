const exec = require('child_process').exec;
const os = require('os');

if (require.main === module) {
  const path = '_' + os.platform() + '_video_sample_' + Date.now() + '.mp4';
  const framerate = '-framerate 30';
  const time = '-t 4';

  let format;
  let input;
  let command;

  if (os.platform() === 'android') {
    command = `termux-camera-photo -c 1 ${path}`;
    exec(
      command,
      () => {
        console.log(path);
      }
    );
  } else if (os.platform() === 'darwin') {
    format = '-f avfoundation';
    input = '-i default';
    command = `ffmpeg ${format} ${framerate} ${input} ${time} ${path}`;
    exec(
      command,
      () => {
        console.log(path);
      }
    );
  } else if (os.platform() === 'linux') {
    format = '-f v4l2';
    input = '-i /dev/video0';
    command = `ffmpeg ${format} ${framerate} ${input} ${time} ${path}`;
    exec(
      command,
      () => {
        console.log(path);
      }
    );
  } else {
    format = '-f v4l2';
    input = '-i /dev/video0';
    command = `gst-launch-1.0 nvarguscamerasrc sensor_id=1 ! \
   'video/x-raw(memory:NVMM),width=3264, height=2464, framerate=21/1, format=NV12' ! \
   nvvidconv flip-method=0 ! 'video/x-raw, width=816, height=616' ! \
   nvvidconv ! nvegltransform ! filesink location="test2.raw" -e`;
    exec(
      command,
      () => {
        console.log(path);
      }
    );
  }
}
