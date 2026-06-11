import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => (
  <div className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm ${className}`} onClick={onClick}>
    {children}
  </div>
);
