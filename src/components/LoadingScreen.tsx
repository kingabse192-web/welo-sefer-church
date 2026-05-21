import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-church-cream dark:bg-slate-950 transition-colors relative overflow-hidden rounded-2xl mx-4 my-8">
      <img
        src="curent church.PNG"
        alt="Loading"
        className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10"
      />
      <div className="relative flex flex-col items-center justify-center p-12">
        <div className="w-12 h-12 border-4 border-church-gold/30 border-t-church-gold rounded-full animate-spin mb-6" />
        <p className="font-serif text-church-blue dark:text-church-gold text-xl font-bold tracking-wide">
          ወሎ ሰፈር ቤተክርስቲያን
        </p>
        <p className="font-sans text-church-blue/60 dark:text-church-gold/60 text-sm mt-1">
          Welo Sefer Church
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
