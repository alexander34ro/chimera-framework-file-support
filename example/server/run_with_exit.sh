command="xchimera emotion_detector.chiml _darwin_video_sample_1616869585269.mp4"
log="prog.log"
match="Done"

$command > "$log" 2>&1 &
pid=$!

while sleep 0.5
do
    if fgrep --quiet "$match" "$log"
    then
        exit 0
    fi
done