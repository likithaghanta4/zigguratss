with open('src/components/ProductDetail.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Define renderProductDossierBox inside ProductDetail component
# Let's see where the original dossier box was
old_dossier_start = '''          {/* RIGHT: ELEGANT PURCHASE DOSSIER (5 Columns - Sticky within Main Product Section) */}
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="product-details-sticky-track order-2 lg:order-none lg:col-span-5 xl:col-span-5 lg:col-start-8 xl:col-start-8 lg:row-start-1 lg:row-end-3 space-y-4 sm:space-y-6 w-full min-w-0 lg:sticky lg:top-24 self-start"
          >
            <div className="bg-[#121217]/95 backdrop-blur-2xl p-4 xs:p-5 sm:p-7 lg:p-8 xl:p-9 rounded-2xl sm:rounded-3xl border border-neutral-800 shadow-[0_16px_50px_rgba(0,0,0,0.5)] space-y-4 sm:space-y-6 w-full">'''

assert old_dossier_start in content, "old_dossier_start not found"
print("Found old_dossier_start!")
