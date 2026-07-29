import { useState, useMemo } from 'react'

const DAYS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

export default function MiniCalendar({ 
  selectedDate, 
  onSelect,
  isDayDisabled,
}: { 
  selectedDate: Date | null; 
  onSelect: (d: Date) => void;
  isDayDisabled?: (d: Date) => boolean;
}) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) {
      return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    }
    return new Date();
  });

  const { daysInMonth, prevDays } = useMemo(() => {
    const y = currentMonth.getFullYear(), m = currentMonth.getMonth();
    const first = new Date(y, m, 1);
    // Monday-based: 0=Mon … 6=Sun
    const dow = (first.getDay() + 6) % 7;
    return {
      daysInMonth: new Date(y, m + 1, 0).getDate(),
      prevDays: dow,
    };
  }, [currentMonth]);

  const today = new Date();
  today.setHours(0,0,0,0);

  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) setCurrentMonth(prev);
  };
  const nextMonth = () => setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return (
    <div className="p-4 bg-white rounded-lg border border-outline-variant/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-sand-light rounded-full transition-colors">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <span className="font-label-md text-label-md text-sage-deep uppercase tracking-wider">
          {MONTHS_FR[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button onClick={nextMonth} className="p-1 hover:bg-sand-light rounded-full transition-colors">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAYS_SHORT.map((d, i) => (
          <span key={i} className="text-[10px] text-outline font-bold">{d}</span>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Filler prev month */}
        {Array.from({ length: prevDays }).map((_, i) => (
          <span key={`p${i}`} className="font-caption text-caption text-outline/30 py-2">
            {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), -prevDays + i + 1).getDate()}
          </span>
        ))}
        {/* Current month days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const thisDayDate = new Date(
            currentMonth.getFullYear(), 
            currentMonth.getMonth(), 
            day
          );
          thisDayDate.setHours(0,0,0,0);
          
          const isPast = thisDayDate < today;
          const disabledByRule = Boolean(isDayDisabled?.(thisDayDate))
          const isDisabled = isPast || disabledByRule
          
          let isSelected = false;
          if (selectedDate) {
            isSelected = 
              thisDayDate.getFullYear() === selectedDate.getFullYear() &&
              thisDayDate.getMonth() === selectedDate.getMonth() &&
              thisDayDate.getDate() === selectedDate.getDate();
          }

          return (
            <button
              key={day}
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(thisDayDate)}
              className={`font-caption text-caption py-2 rounded-lg transition-colors ${
                isSelected
                  ? 'bg-primary text-white font-bold shadow-md'
                  : isDisabled
                  ? 'text-outline/30 cursor-not-allowed'
                  : 'cursor-pointer hover:bg-sand-light'
              }`}
              style={isSelected ? { backgroundColor: '#425646', color: '#ffffff' } : {}}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
