import cv2
import numpy as np

# Let's inspect each scene and draw bounding boxes / coordinate grids
for name in ['scene-02-debark', 'scene-03-walk', 'scene-04-doorbell', 'scene-05-dooropen', 'scene-06-handover', 'scene-07-finale']:
    im = cv2.imread(f'src/assets/delivery/backup_originals/{name}.jpg')
    vis = im.copy()
    
    # Draw grid lines every 50 pixels in the region x: 400..800, y: 300..750
    for x in range(400, 850, 50):
        cv2.line(vis, (x, 250), (x, 750), (0, 255, 255), 1)
        cv2.putText(vis, str(x), (x, 260), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 255, 255), 1)
    for y in range(250, 770, 50):
        cv2.line(vis, (400, y), (850, y), (0, 255, 255), 1)
        cv2.putText(vis, str(y), (405, y - 2), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 255, 255), 1)
        
    cv2.imwrite(f'scripts/grid_{name}.jpg', vis)
    print(f'Wrote scripts/grid_{name}.jpg')
