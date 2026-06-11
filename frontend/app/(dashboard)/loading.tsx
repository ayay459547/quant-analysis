import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full space-y-4 animate-in fade-in duration-500">
      <div className="relative w-16 h-16">
        {/* 外圈旋轉 */}
        <div className="absolute inset-0 border-4 border-sky-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        
        {/* 內圈反向旋轉 */}
        <div className="absolute inset-2 border-4 border-purple-500/20 rounded-full"></div>
        <div className="absolute inset-2 border-4 border-purple-500 border-b-transparent rounded-full animate-spin-slow"></div>
      </div>
      
      <div className="flex flex-col items-center">
        <p className="text-sky-600 font-medium tracking-widest text-sm uppercase animate-pulse">
          Loading Data
        </p>
        <div className="flex space-x-1 mt-1">
          <div className="w-1 h-1 bg-sky-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1 h-1 bg-sky-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1 h-1 bg-sky-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
