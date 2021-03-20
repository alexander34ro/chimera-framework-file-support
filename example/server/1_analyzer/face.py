import numpy as np
import cv2
import sys
import json

def color(file):
    faceCascade = cv2.CascadeClassifier('1_analyzer/cascade.xml')
    cap = cv2.VideoCapture(file)

    while(cap.isOpened()):
        ret, img = cap.read()

        try:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = faceCascade.detectMultiScale(
                gray,
                scaleFactor=1.2,
                minNeighbors=5,
                minSize=(20, 20)
            )
            for (x, y, w, h) in faces:
                cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
                roi_gray = gray[y:y+h, x:x+w]
                roi_color = img[y:y+h, x:x+w]

            cv2.imshow('frame', img)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        except: break

    cap.release()
    cv2.destroyAllWindows()

    return True


if __name__ == '__main__':
    file = sys.argv[1]
    color(file)
    print(json.dumps("Done"))
