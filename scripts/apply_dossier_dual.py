import re

with open('src/components/ProductDetail.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's locate the full dossier block from lines 1328 to 1546
dossier_content_start = '<div className="bg-[#121217]/95 backdrop-blur-2xl p-4 xs:p-5 sm:p-7 lg:p-8 xl:p-9 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-[0_16px_50px_rgba(0,0,0,0.5)] space-y-4 sm:space-y-6 w-full">'
dossier_content_end = '''              {/* Four Interactive Guideline Modals Overlay */}
              <ProductGuidelineOverlayManager 
                activeGuideline={activeGuideline} 
                isPinned={isGuidelinePinned}
                onClose={handleCloseGuideline} 
                onPin={handlePinGuideline}
                onMouseEnter={handleMouseEnterModal}
                onMouseLeave={handleMouseLeaveModal}
              />
            </div>'''

start_idx = content.find(dossier_content_start)
end_idx = content.find(dossier_content_end) + len(dossier_content_end)
assert start_idx != -1 and end_idx != -1, "Could not locate dossier block!"

raw_dossier_inner = content[start_idx:end_idx]

# Replace key={`${item.id}`} with key={`${item.id}-${keySuffix}`} inside TRUST_GUARANTEE_ITEMS.map
dossier_inner_parametrized = raw_dossier_inner.replace("key={item.id}", "key={`${item.id}-${keySuffix}`}")

# Define the helper render function to insert before return (
helper_def = f'''  // Reusable Product Purchase Dossier Box (rendered on right side of Acts 1-5 and Acts 7-8)
  const renderProductDossierBox = (keySuffix = 'main', isSecondary = false) => (
{dossier_inner_parametrized}
  )

  return ('''

content = content.replace("  return (", helper_def, 1)

# Now replace the original top dossier call
old_top_dossier = f'''          {{/* RIGHT: ELEGANT PURCHASE DOSSIER (5 Columns - Sticky within Main Product Section) */}}
          <motion.div 
            initial={{shouldReduceMotion ? {{ opacity: 1 }} : {{ opacity: 0, x: 20 }}}}
            animate={{{{ opacity: 1, x: 0 }}}}
            transition={{{{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}}}
            className="product-details-sticky-track order-2 lg:order-none lg:col-span-5 xl:col-span-5 lg:col-start-8 xl:col-start-8 lg:row-start-1 lg:row-end-3 space-y-4 sm:space-y-6 w-full min-w-0 lg:sticky lg:top-24 self-start"
          >
{raw_dossier_inner}
          </motion.div>'''

new_top_dossier = '''          {/* RIGHT: ELEGANT PURCHASE DOSSIER (5 Columns - Sticky within Main Product Section) */}
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="product-details-sticky-track order-2 lg:order-none lg:col-span-5 xl:col-span-5 lg:col-start-8 xl:col-start-8 lg:row-start-1 lg:row-end-3 space-y-4 sm:space-y-6 w-full min-w-0 lg:sticky lg:top-24 self-start"
          >
            {renderProductDossierBox('top')}
          </motion.div>'''

assert old_top_dossier in content, "old_top_dossier not found!"
content = content.replace(old_top_dossier, new_top_dossier, 1)

# Now wrap Acts 7 and 8 in Grid 2 with the sticky dossier box on the right
old_acts78_start = '''      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50 transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 7: INTERACTIVE 4-STAGE WHITE-GLOVE LOGISTICS PIPELINE (KEPT DOWN) */}
      {/* ========================================================= */}'''

old_acts78_end = '''      {/* ========================================================= */}
      {/* ACT 8: VERIFIED COLLECTOR LETTERHEAD REVIEWS */}
      {/* ========================================================= */}
      <CollectorReviewsSection />
      </div>
      </div>'''

new_acts78_block = '''      {/* ========================================================= */}
      {/* GRID 2: SHIPPING & REVIEWS WITH STICKY PRODUCT DOSSIER ON RIGHT */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start w-full">
        {/* LEFT: 7 Columns for Act 7 (Logistics) & Act 8 (Reviews) */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-12 sm:space-y-16 lg:space-y-24 w-full min-w-0">
          {/* Curved Reveal Divider */}
          <div className="curved-section-divider -my-4 opacity-50 transform rotate-180">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
            </svg>
          </div>

          {/* ACT 7: INTERACTIVE 4-STAGE WHITE-GLOVE LOGISTICS PIPELINE */}'''

new_acts78_closing = '''          {/* Curved Reveal Divider */}
          <div className="curved-section-divider -my-4 opacity-50">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
            </svg>
          </div>

          {/* ACT 8: VERIFIED COLLECTOR LETTERHEAD REVIEWS */}
          <CollectorReviewsSection />
        </div>

        {/* RIGHT: 5 Columns with Sticky Product Dossier Box on Desktop */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24 space-y-4 sm:space-y-6 w-full min-w-0 self-start">
          {renderProductDossierBox('bottom', true)}
        </div>
      </div>
      </div>
      </div>'''

assert old_acts78_start in content, "old_acts78_start not found!"
content = content.replace(old_acts78_start, new_acts78_block, 1)

# Find the end of act 8
old_act8_tail = '''      {/* ACT 8: VERIFIED COLLECTOR LETTERHEAD REVIEWS */}
      {/* ========================================================= */}
      <CollectorReviewsSection />
      </div>
      </div>'''

assert old_act8_tail in content, "old_act8_tail not found!"
content = content.replace(old_act8_tail, '''      {/* ACT 8: VERIFIED COLLECTOR LETTERHEAD REVIEWS */}
      {/* ========================================================= */}
      <CollectorReviewsSection />
        </div>

        {/* RIGHT: 5 Columns with Sticky Product Dossier Box on Desktop */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24 space-y-4 sm:space-y-6 w-full min-w-0 self-start">
          {renderProductDossierBox('bottom', true)}
        </div>
      </div>
      </div>
      </div>''', 1)

with open('src/components/ProductDetail.jsx', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("Successfully applied dual dossier grid layout to ProductDetail.jsx!")
