# Setup

Make sure you have npm:

```bash
sudo apt-get install nodejs npm
```

Link this package

```bash
npm link
```

For face detection install python and OpenCV

```bash
pip install opencv-python
```

# Server

There are 3 options for the server:

1. Just save the file received from the client:

```bash
xchimera-serve save_file.chiml
```

2. Detect faces in the received file:

```bash
xchimera-serve face_analyzer.chiml
```

3. Analyze emotions for the faces in the received file:

```bash
xchimera-serve emotion_detector.chiml
```

# Client

There are 3 options for the client:

1. Send a photo:

```bash
cd 1_take
npm i
cd ..
xchimera send_photo.chiml
```

2. Send 3 videos:

```bash
cd 2_take
npm i
cd ..
xchimera send_video.chiml
```

3. Send 3 videos for emotion detection:

```bash
cd 2_take
npm i
cd ..
xchimera send_video_to_emotion_detector.chiml
```
