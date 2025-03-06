
import React from 'react';
import { Calendar } from 'lucide-react';

const CalendarInfo = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-gray-800/50 rounded-lg p-4 mb-4">
      <div className="flex items-start mb-2">
        <Calendar className="h-5 w-5 text-blue-400 mr-2 mt-1" />
        <div className="flex-1">
          <p className="text-white">
            Jag ser i din kalender att ni har Scoutmöte på Scoutgården i Apelhult imorgon. Vill du se vilka resealternativ som finns dit?
          </p>
          <div className="mt-2">
            <p className="text-gray-400 text-sm">
              Åke hittade denna uppgift i din kalender.
            </p>
            <a href="#" className="text-sm text-blue-400 underline hover:text-blue-300">
              Här är dina inställningar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarInfo;
