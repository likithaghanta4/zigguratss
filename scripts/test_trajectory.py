import math

segments = [
    {'p0': (705, 282), 'p1': (679, 245), 'p2': (654, 256)},
    {'p0': (654, 256), 'p1': (590, 175), 'p2': (527, 166)},
    {'p0': (527, 166), 'p1': (514, 155), 'p2': (502, 161)},
    {'p0': (502, 161), 'p1': (401, 128), 'p2': (300, 197)},
    {'p0': (300, 197), 'p1': (252, 185), 'p2': (205, 216)},
    {'p0': (205, 216), 'p1': (252, 225), 'p2': (300, 197)},
    {'p0': (300, 197), 'p1': (401, 142), 'p2': (502, 161)},
    {'p0': (502, 161), 'p1': (578, 195), 'p2': (654, 256)},
    {'p0': (654, 256), 'p1': (679, 260), 'p2': (705, 282)},
]

p0_start = segments[0]['p0']
pathD = f"M {p0_start[0]} {p0_start[1]}"
xs, ys, rotates = [], [], []

for seg in segments:
    p0, p1, p2 = seg['p0'], seg['p1'], seg['p2']
    pathD += f" Q {p1[0]} {p1[1]} {p2[0]} {p2[1]}"
    steps = 16
    for i in range(steps):
        t = i / steps
        mt = 1 - t
        x = mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0]
        y = mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1]
        dx = 2 * mt * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0])
        dy = 2 * mt * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])
        angle = (math.atan2(dy, dx) * 180) / math.PI
        xs.append(round(x, 1))
        ys.append(round(y, 1))
        rotates.append(round(angle, 1))

xs.append(segments[0]['p0'][0])
ys.append(segments[0]['p0'][1])
rotates.append(rotates[0])

print("Total keyframes:", len(xs))
print("pathD sample:", pathD[:60])
print("First 3:", list(zip(xs[:3], ys[:3], rotates[:3])))
