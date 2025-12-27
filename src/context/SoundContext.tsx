import React, { createContext, useContext, useState, useEffect } from 'react';

type SoundType = 'hover' | 'click' | 'success' | 'error';

interface SoundContextType {
    playSound: (type: SoundType) => void;
    isMuted: boolean;
    toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);

    // SFX Assets (Short UI sounds)
    // Using hosted assets or simple beep generation logic if needed. 
    // For now, these are placeholders for standard UI kit sounds.
    const sounds = {
        hover: new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'), // Short high tech click
        click: new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'), // Mechanical click
        success: new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'), // Mission Success / Item equip
        error: new Audio('https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'), // Error buzz
    };

    // Preload sounds
    useEffect(() => {
        Object.values(sounds).forEach(audio => {
            audio.volume = 0.2; // Low volume for subtlety
            audio.load();
        });
    }, []);

    const playSound = (type: SoundType) => {
        if (isMuted) return;

        const audio = sounds[type];
        if (audio) {
            audio.currentTime = 0;
            // distinct volumes
            if (type === 'hover') audio.volume = 0.05; // Very quiet
            if (type === 'click') audio.volume = 0.2;
            if (type === 'success') audio.volume = 0.3;

            audio.play().catch(e => console.log("Audio play failed (interaction needed first)", e));
        }
    };

    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <SoundContext.Provider value={{ playSound, isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) throw new Error('useSound must be used within SoundProvider');
    return context;
};
