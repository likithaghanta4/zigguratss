import React, { useState } from 'react';

export function ConversationsSection() {
  const conversations = [
    { 
      id: 1, 
      name: 'Heritage Expert', 
      role: 'Cultural Advisor', 
      videoId: 'zLYjrT_jvY0',
      description: 'Curators, Conservators, and Museum Workers Career Video'
    },
    { 
      id: 2, 
      name: 'Museum Curator', 
      role: 'Collection Manager', 
      videoId: 'skxIZXXYKq4',
      description: 'A day in the life of a museum curator'
    },
    { 
      id: 3, 
      name: 'Restoration Master', 
      role: 'Artifact Specialist', 
      videoId: 'JULoAgsvTQ0',
      description: 'Dream Jobs: Conservator'
    },
    { 
      id: 4, 
      name: 'Collector\'s Guide', 
      role: 'Investment Advisor', 
      videoId: 'yDaY6KraDW0',
      description: 'How to Curate an Exhibition'
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="py-8 md:py-16 lg:py-24">
      <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-8 mb-8 md:mb-12">
          <div>
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-widest mb-2 md:mb-3">Insights & Knowledge</p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black">Conversations with Experts</h2>
          </div>
        </div>

        {/* Conversations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="group relative rounded-3xl overflow-hidden h-72 sm:h-80 md:h-96 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              onClick={() => setSelectedVideo(conversation.videoId)}
            >
              {/* Premium Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-black/20 pointer-events-none z-10"></div>
              
              {/* Autoplaying YouTube iframe (muted for autoplay) */}
              <div className="w-full h-full relative overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${conversation.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${conversation.videoId}`}
                  title={conversation.name}
                  frameBorder="0"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
                {/* Premium Gradient Overlay - Only bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none group-hover:to-black/85 transition-all duration-500"></div>
                
                {/* Clickable transparent layer to open modal */}
                <button
                  aria-label={`Open ${conversation.name} video`}
                  className="absolute inset-0 z-20 bg-transparent cursor-pointer"
                  onClick={() => setSelectedVideo(conversation.videoId)}
                ></button>
              </div>

              {/* Premium Content Box */}
              <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 text-white backdrop-blur-sm">
                <div className="space-y-1">
                  <h3 className="font-serif text-base md:text-xl lg:text-2xl font-bold tracking-tight line-clamp-2 group-hover:translate-y-0.5 transition-transform">{conversation.name}</h3>
                  <p className="text-xs md:text-sm opacity-90 font-light tracking-wide uppercase">{conversation.role}</p>
                </div>
              </div>

              {/* Hover Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setSelectedVideo(null)}>
            <div className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Expert Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
