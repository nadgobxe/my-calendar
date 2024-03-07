import { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/logo_v1_1.png'

function App() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [calendarDays, setCalendarDays] = useState([]);
  const [today, setToday] = useState(new Date().getDate());
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());

  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getDaysInMonth = (month, year) => {
    if (month === 1) { // February
      return isLeapYear(year) ? 29 : 28;
    }
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    }
    return 31;
  };

  const handleMonthChange = (direction) => {
    let newMonth = months.indexOf(month);
    let currentYear = year; // Get the current year from the state

    if (direction === 'forward') {
      newMonth = newMonth === 11 ? 0 : newMonth + 1;
      currentYear = newMonth === 0 ? currentYear + 1 : currentYear; // Update year if the month changes from December to January
    } else {
      const date = new Date();

      const concatValues = (a, b) => {
        // Convert both the integers to string 
        var s1 = a.toString();
        var s2 = b.toString();

        // Concatenate both strings 
        var s = s1 + s2;

        // Convert the concatenated string 
        // to integer 
        var c = parseInt(s);

        // return the formed integer 
        return c;
      }

      const calendarDate = concatValues(months.indexOf(month), year);
      const conditionalDate = concatValues(date.getMonth(), date.getFullYear());

      console.log(calendarDate, conditionalDate);
      if (calendarDate === conditionalDate) return; // Prevent going back to the current month

      newMonth = newMonth === 0 ? 11 : newMonth - 1;
      currentYear = newMonth === 11 ? currentYear - 1 : currentYear; // Update year if the month changes from January to December
    }
    setMonth(months[newMonth]);
    setCalendarDays(generateCalendarDays(currentYear, newMonth)); // Pass updated year to generateCalendarDays
    setYear(currentYear); // Update the year state
  }

  const generateCalendarDays = (year, month) => {
    const daysInCurrentMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInPreviousMonth = month === 0 ? getDaysInMonth(11, year - 1) : getDaysInMonth(month - 1, year);

    // Adjust firstDayOfMonth to match your week start (Monday)
    const daysFromPreviousMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const daysFromNextMonth = 7 - ((daysFromPreviousMonth + daysInCurrentMonth) % 7);
    console.log(daysFromPreviousMonth, daysFromNextMonth)

    let daysObj = [];
    // Add days from the previous month
    for (let i = daysFromPreviousMonth; i > 0; i--) {
      daysObj.push({ "day": -(daysInPreviousMonth - i + 1) });

    }
    // Add days of the current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      if (new Date(year, month, i).getDay() === 5) {
        daysObj.push({
          "day": i,
          "isFriday": true //Add values for Dynamic Styling and Values
        });
      } else if (new Date(year, month, i).getDay() === 4) {
        daysObj.push({
          "day": i,
          "isThursday": true //Add values for Dynamic Styling and Values
        });
      } else if (new Date(year, month, i).getDay() === 6) {
        daysObj.push({
          "day": i,
          "isSunday": true //Add values for Dynamic Styling and Values
        });
      } else {
        daysObj.push({ "day": i });
      }
    }
    // Optionally, add days from the next month to complete the last week
    if (daysFromNextMonth === 7) { return daysObj; }
    else {
      for (let i = 1; i <= daysFromNextMonth; i++) {
        console.log(`hello${-i}1`)
        daysObj.push({ "day": i * 100 });
      }
    }

    console.log(daysObj)
    return daysObj;
  };

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    setToday(today.getDate());
    setCalendarDays(generateCalendarDays(currentYear, currentMonth));


    console.log(month)
  }, []);

  return (
    <>
      <main className='p-4 mx-auto'>
        <div className='flex flex-col gap-5 mx-auto'>
          <div className='inline-block'>
            <div><img src={logo}></img></div>
            <div className='flex md:p-5'>
              <div className='flex-none'><button value="back" onClick={(e) => handleMonthChange(() => e.target.value)}>Back</button></div>
              <div className='grow flex justify-center'>{month} {year}</div>
              <div className='flex-none'><button value="forward" onClick={(e) => {
                const value = e.target.value;
                return handleMonthChange(value)
              }}>Forward</button></div>
            </div>
            <div className='grid grid-cols-7 gap-1 p-1 md:gap-4 border border-indigo-600 border-round m-auto md:p-5'>
              {days.map((day, index) => <div key={index} className='p-1 w-11 text-sm font-semibold flex justify-center md:p-8 border-1 border-slate-200 shadow-md'>{day}</div>)}
            </div>
            <div className='grid grid-cols-7 gap-1 p-1 md:gap-4 border border-indigo-600 border-round m-auto md:p-5'>
              {calendarDays.map((day, index) => {
                const currentDate = new Date();
                const isPast = new Date(year, months.indexOf(month), day.day + 1) < currentDate;
                const daysFromPrevMonth = day.day < 0;
                const daysFromNextMonth = day.day >= 100;

                const currentYear = currentDate.getFullYear();
                const currentMonth = currentDate.getMonth();
                const currentDay = currentDate.getDate();

                // Create a new Date object representing the day you want to check
                const checkToday = new Date(currentYear, currentMonth, day.day);
                const myToday = new Date(year, months.indexOf(month), today);

                console.log(`checkToday: ${checkToday}, today: ${myToday}`)
                // Compare the year, month, and day components individually
                // Compare the year, month, and day components individually
                const isToday = checkToday.getFullYear() === myToday.getFullYear() &&
                  checkToday.getMonth() === myToday.getMonth() &&
                  checkToday.getDate() === myToday.getDate(); // Check if the day is today


                return (
                  <div
                    key={index}
                    className={`p-1 w-11 text-sm font-semibold flex justify-center md:p-8 border-1 border-slate-200 shadow-md ${isPast || day.isSunday ? 'bg-gray-300 cursor-default font-normal line-through' : 'cursor-pointer'} ${daysFromPrevMonth || daysFromNextMonth ? 'bg-gray-300' : ''} ${isToday ? 'bg-indigo-600 text-white' : ''}`}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <div>
                        {day.day >= 100 ? day.day / 100 : Math.abs(day.day)}
                      </div>
                      <div>
                        {day.isFriday ? (
                          <div className='text-xs text-red-500'>£{500 * 1.2}</div>
                        ) : day.isThursday ? (
                          <div className='text-xs text-red-500'>£{500 * 1.1}</div>
                        ) : day.isSunday ? (
                          <div className='text-xs text-red-500'></div>
                        ) : (
                          <div className='text-xs text-red-500'>£500</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
