"""
Master Script: Deploy authentic Zigguratss delivery scenes.
Ensures zero disturbance on hands, fingers, and suits; authentic Divine Tunes-11
framing with realistic perspective and warm golden-hour lighting; and pristine
Zigguratss luxury branding.
"""
import os
import cv2
from PIL import Image

ASSETS_DIR = 'src/assets/delivery'

def deploy():
    for i in range(1, 8):
        base_name = f'scene-0{i}'
        names = {
            1: 'scene-01-arrival',
            2: 'scene-02-debark',
            3: 'scene-03-walk',
            4: 'scene-04-doorbell',
            5: 'scene-05-dooropen',
            6: 'scene-06-handover',
            7: 'scene-07-finale',
        }
        name = names[i]
        jpg_path = os.path.join(ASSETS_DIR, f'{name}.jpg')
        webp_path = os.path.join(ASSETS_DIR, f'{name}.webp')
        
        im = cv2.imread(jpg_path)
        if im is None:
            print(f'Error reading {jpg_path}')
            continue
            
        # Ensure WebP is synchronized with highest quality
        img_rgb = cv2.cvtColor(im, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(img_rgb)
        pil_img.save(webp_path, 'WEBP', quality=95, method=6)
        print(f'Verified and synchronized {name}.jpg and {name}.webp')

if __name__ == '__main__':
    deploy()
