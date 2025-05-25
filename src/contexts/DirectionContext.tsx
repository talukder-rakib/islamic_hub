import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Direction = 'ltr' | 'rtl';

interface DirectionContextType {
  direction: Direction;
  toggleDirection: () => void;
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export const DirectionProvider = ({ children }: { children: ReactNode }) => {
  const [direction, setDirection] = useState<Direction>(() => {
    const savedDirection = localStorage.getItem('direction');
    return (savedDirection === 'rtl' || savedDirection === 'ltr') ? savedDirection : 'ltr';
  });

  useEffect(() => {
    localStorage.setItem('direction', direction);
  }, [direction]);

  const toggleDirection = () => {
    setDirection(prev => prev === 'ltr' ? 'rtl' : 'ltr');
  };

  return (
    <DirectionContext.Provider value={{ direction, toggleDirection }}>
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirection = (): DirectionContextType => {
  const context = useContext(DirectionContext);
  if (context === undefined) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return context;
};