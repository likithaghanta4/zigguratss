with open('src/components/ProductDetail.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

target1 = """        </AnimatePresence>
      </motion.section>

      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 6: RELATED MASTERWORKS MARQUEE STREAMS */}
      {/* ========================================================= */}
      <ArtistMarqueesSection />"""

replacement1 = """        </AnimatePresence>
      </motion.section>
          </div>
        </div>

      {/* Curved Reveal Divider */}
      <div className="curved-section-divider -my-4 opacity-50">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* ACT 6: RELATED MASTERWORKS MARQUEE STREAMS & COMPACT PRODUCT BAR */}
      {/* (FULL-WIDTH PANORAMIC STREAM - NO RIGHT-SIDE PRODUCT BOX) */}
      {/* ========================================================= */}
      <div className="w-full relative space-y-6 sm:space-y-8">
        <ArtistMarqueesSection />

        {/* Compact Bottom Product Bar (Referencing Singulart Luxury Spec) */}
        <div className="sticky bottom-4 z-40 w-full max-w-5xl mx-auto px-2 sm:px-4 pointer-events-auto">
          <div className="bg-[#121218]/95 backdrop-blur-2xl border border-[#dfb76c]/50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 md:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9)] ring-1 ring-[#dfb76c]/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
              {/* Artwork Info & Valuation */}
              <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6">
                <div>
                  <span className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.2em] text-[#dfb76c] font-mono font-medium block">
                    Pradip Sarkar
                  </span>
                  <h4 className="font-serif text-base sm:text-xl font-normal text-white tracking-tight">
                    Divine Tunes-11
                  </h4>
                </div>

                {/* Pricing with Strikethrough & -20% badge */}
                <div className="text-right sm:text-left">
                  <div className="flex items-center gap-1.5 justify-end sm:justify-start">
                    <span className="text-[10px] sm:text-xs text-neutral-500 line-through font-serif">₹1,47,800</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#8a1c14] text-white text-[9px] font-bold font-mono tracking-wider">-20%</span>
                  </div>
                  <span className="font-serif text-base sm:text-xl font-bold text-[#dfb76c]">
                    ₹1,18,300
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#dfb76c] via-[#f7d794] to-[#dfb76c] hover:from-[#f7d794] hover:to-[#dfb76c] text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(223,183,108,0.3)] hover:shadow-[0_8px_30px_rgba(223,183,108,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Acquire Artwork</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => setShowOfferModal(true)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border border-[#dfb76c]/40 hover:border-[#dfb76c] bg-neutral-900/90 hover:bg-[#dfb76c]/15 text-[#dfb76c] flex items-center justify-center transition-all cursor-pointer shadow-sm shrink-0"
                  title="Make an Offer or Inquire"
                >
                  <MessageCircle size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>"""

target2 = """      {/* ========================================================= */}
      {/* ACT 8: VERIFIED COLLECTOR LETTERHEAD REVIEWS */}
      {/* ========================================================= */}
      <CollectorReviewsSection />
          </div>
        </div>
      </div>
      </div>"""

replacement2 = """      {/* ========================================================= */}
      {/* ACT 8: VERIFIED COLLECTOR LETTERHEAD REVIEWS */}
      {/* ========================================================= */}
      <CollectorReviewsSection />
      </div>
      </div>"""

if target1 not in content:
    print("target1 not in content")
    # let's find closest
    idx = content.find("ACT 6: RELATED MASTERWORKS MARQUEE STREAMS")
    print("Found ACT 6 at:", idx)
    if idx != -1:
        print("Surrounding:", repr(content[idx-200:idx+200]))

if target2 not in content:
    print("target2 not in content")
    idx2 = content.find("ACT 8: VERIFIED COLLECTOR LETTERHEAD REVIEWS")
    print("Found ACT 8 at:", idx2)
    if idx2 != -1:
        print("Surrounding:", repr(content[idx2-50:idx2+200]))

if target1 in content and target2 in content:
    content = content.replace(target1, replacement1, 1)
    content = content.replace(target2, replacement2, 1)
    with open('src/components/ProductDetail.jsx', 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)
    print("Successfully updated ProductDetail.jsx!")
