import numpy as np
import cv2
from tensorflow import lite
import sys
import json
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

def emotion(file):
    # load lite model
    interpreter = lite.Interpreter(model_path="model_quantized.tflite")
    interpreter.allocate_tensors()
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    # prevents openCL usage and unnecessary logging messages
    cv2.ocl.setUseOpenCL(False)
    # dictionary which assigns each label an emotion (alphabetical order)
    emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}
    # load default face cascade
    faceCascade = cv2.CascadeClassifier('cascade.xml')

    cap = cv2.VideoCapture(file)
    while(cap.isOpened()):
        # Find haar cascade to draw bounding box around face
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = faceCascade.detectMultiScale(gray,scaleFactor=1.3, minNeighbors=5)

        for (x, y, w, h) in faces:
            try:
                cv2.rectangle(frame, (x, y-50), (x+w, y+h+10), (255, 0, 0), 2)
                roi_gray = gray[y:y + h, x:x + w]
                cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray, (48, 48)), -1), 0)

                try:
                    input_data = np.array(cropped_img, dtype=np.float32)
                    interpreter.set_tensor(input_details[0]['index'], input_data)
                except:
                    input_data = np.array(cropped_img, dtype=np.int8)
                    interpreter.set_tensor(input_details[0]['index'], input_data)

                interpreter.invoke()
                prediction = interpreter.get_tensor(output_details[0]['index'])

                maxindex = int(np.argmax(prediction))
                cv2.putText(frame, emotion_dict[maxindex], (x+20, y-60), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
            except:
                pass

        cv2.imshow('Video', cv2.resize(frame,(400,240),interpolation = cv2.INTER_CUBIC))
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    return True


if __name__ == '__main__':
    file = sys.argv[1]
    emotion(file)
    print(json.dumps("Done"))
