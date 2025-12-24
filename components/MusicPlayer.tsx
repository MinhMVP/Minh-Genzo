
import React, { useState } from 'react';
import { Music, X, ChevronRight, ChevronLeft, Volume2 } from 'lucide-react';
import { CHILL_PLAYLIST } from '../constants';

const MusicPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const nextTrack = () => setCurrentTrackIndex((prev) => (prev + 1) % CHILL_PLAYLIST.length);
  const prevTrack = () => setCurrentTrackIndex((prev) => (prev - 1 + CHILL_PLAYLIST.length) % CHILL_PLAYLIST.length);

  return (
    <div className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${isOpen ? 'w-80 h-48' : 'w-14 h-14'}`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <Music size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl p-4 border border-indigo-100 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold truncate">
              <Volume2 size={18} />
              <span className="text-sm">{CHILL_PLAYLIST[currentTrackIndex].title}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 rounded-lg overflow-hidden bg-gray-100 relative">
             <iframe
                className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
                src={CHILL_PLAYLIST[currentTrackIndex].url}
                title="Chill Music"
                allow="autoplay"
              ></iframe>
              <div className="flex items-center justify-center h-full gap-4">
                <button onClick={prevTrack} className="p-2 hover:bg-indigo-50 rounded-full text-indigo-600">
                  <ChevronLeft size={24} />
                </button>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center animate-pulse">
                  <Music className="text-indigo-600" />
                </div>
                <button onClick={nextTrack} className="p-2 hover:bg-indigo-50 rounded-full text-indigo-600">
                  <ChevronRight size={24} />
                </button>
              </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-center italic">Đang phát nhạc chill tự động...</p>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
