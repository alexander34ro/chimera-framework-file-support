#!/bin/bash
echo "Bash version ${BASH_VERSION}..."
for run in {1..31}
do
  time python 2_emotion_detector/emotions.py _darwin_video_sample_1616869585269.mp4
done