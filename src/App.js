import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const numberOfDaysOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => { 
    
    const date = new Date(); //initialize date object
    
    const getMonth = date.getMonth(); //get month
    const getToday = date.getDate(); //get today
    const getMonthName = months[getMonth]; //get month name
    const getMonthSize = numberOfDaysOfMonth[getMonth]; //get month size
    
    let daysArray = [];

    for (let i = 0; i < getMonthSize; i++) {
        daysArray.push(i + 1)
    }

    setCalendarDays(daysArray);
    setCurrentMonth(getMonthName);

    console.log(calendarDays)
    console.log(getToday);
    console.log(months[getMonth]);
    console.log(numberOfDaysOfMonth[getMonth]);



   }, []);

  return (
    <>
      <main className='p-4 mx-auto'>
        <div className='flex flex-col gap-5'>
          <div><h1>Calendar</h1></div>
          <div className='flex flex-row gap-5 border border-indigo-600 border-round divide-x divide-slate-200 m-auto p-5'>
            <div className='p-1'>Monday</div>
          </div>
          <div className='grid grid-cols-7  gap-2 border border-indigo-600 border-round divide-x divide-slate-200 m-auto p-5'>
            {calendarDays.map((day, index) => {
              return <div key={index} className='p-1'>{day}</div>
        })}
        </div>
        </div>
      </main>
    </>
  );
}

export default App;
