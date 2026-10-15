with open('src/components/ProductDetail.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Verify markers
assert 'bg-[#121217]/95 backdrop-blur-2xl' in lines[1327], f"Line 1327 mismatch: {lines[1327]}"
assert 'onMouseLeave={handleMouseLeaveModal}' in lines[1543], f"Line 1543 mismatch: {lines[1543]}"
assert '</div>' in lines[1545], f"Line 1545 mismatch: {lines[1545]}"
assert 'Curved Reveal Divider' in lines[2442], f"Line 2442 mismatch: {lines[2442]}"
assert 'CollectorReviewsSection' in lines[2754], f"Line 2754 mismatch: {lines[2754]}"

# Extract raw dossier card lines
dossier_lines = lines[1327:1546]
dossier_text = ''.join(dossier_lines)
# Parametrize key={item.id} to avoid React duplicate key warning
dossier_text_param = dossier_text.replace('key={item.id}', 'key={`${item.id}-${keySuffix}`}')

# Define helper function before 'return ('
return_line_idx = -1
for i, line in enumerate(lines[:1100]):
    if line.strip() == 'return (':
        return_line_idx = i
        break

assert return_line_idx != -1, "return ( line not found!"

helper_code = f"""  // Reusable Product Purchase Dossier Box (rendered on right side of Acts 1-5 and Acts 7-8)
  const renderProductDossierBox = (keySuffix = 'main', isSecondary = false) => (
{dossier_text_param}  )

"""

# Reconstruct lines:
# 1. Insert helper before return (
part1 = lines[:return_line_idx] + [helper_code] + lines[return_line_idx:1327]

# 2. Replace lines[1327:1546] with call to renderProductDossierBox('top')
part2 = ['            {renderProductDossierBox(\'top\')}\n']

# 3. From 1546 to 2442 (before Act 7 curved reveal divider)
part3 = lines[1546:2442]

# 4. Insert Grid 2 wrapper open
grid2_open = [
    '      {/* ========================================================= */}\n',
    '      {/* GRID 2: SHIPPING & REVIEWS WITH STICKY PRODUCT DOSSIER */}\n',
    '      {/* ========================================================= */}\n',
    '      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start w-full">\n',
    '        {/* LEFT: 7 Columns for Act 7 (Logistics) & Act 8 (Reviews) */}\n',
    '        <div className="lg:col-span-7 xl:col-span-7 space-y-12 sm:space-y-16 lg:space-y-24 w-full min-w-0">\n'
]

# 5. From 2442 to 2755 (including CollectorReviewsSection)
part4 = lines[2442:2755]

# 6. Close Grid 2 left column and add right sticky dossier box
grid2_close = [
    '        </div>\n',
    '\n',
    '        {/* RIGHT: 5 Columns with Sticky Product Dossier Box on Desktop */}\n',
    '        <div className="hidden lg:block lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24 space-y-4 sm:space-y-6 w-full min-w-0 self-start">\n',
    '          {renderProductDossierBox(\'bottom\', true)}\n',
    '        </div>\n',
    '      </div>\n'
]

# 7. Remaining lines from 2755 onward
part5 = lines[2755:]

new_lines = part1 + part2 + part3 + grid2_open + part4 + grid2_close + part5

with open('src/components/ProductDetail.jsx', 'w', encoding='utf-8', newline='\n') as f:
    f.writelines(new_lines)

print("Successfully applied dual dossier grid layout to ProductDetail.jsx!")
