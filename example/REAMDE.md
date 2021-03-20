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

There are 2 options for the server:

1. Just save the file received from the client:

```bash
xchimera-serve save_file.chiml
```

2. Due some face detection on the received file:

```bash
xchimera-serve face_analyzer.chiml
```

# Client

There are 2 options for the client:

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
