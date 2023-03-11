import { useState } from "react";

import { SCHEDULE, USERS, WEEK_DAYS } from "./constants";

interface StateInt {
  currentWeekDay: string | undefined;
}
interface ScheduleInt {
  name: string;
  type: string;
}
function compare(a: any, b: any) {
  if (a.type < b.type) {
    return -1;
  }
  if (a.type > b.type) {
    return 1;
  }
  return 0;
}
function App() {
  const [state, setState] = useState<StateInt>();
  const stateSet = (prevState: StateInt, data: object): StateInt => {
    return {
      ...prevState,
      ...data,
    };
  };
  const handleWeekDaysChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setState((prev: any) => stateSet(prev, { [name]: value }));
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center flex-col h-screen">
        <div className="flex justify-center items-center ">
          <select
            name="currentWeekDay"
            defaultValue=""
            value={state?.currentWeekDay}
            onChange={handleWeekDaysChange}
            className="capitalize border rounded-xs px-4 py-2 shadow-sm outline-0"
          >
            <option disabled value="">
              Select
            </option>
            {WEEK_DAYS.map((val) => (
              <option key={val} value={val} className="bg-red-400">
                {val}
              </option>
            ))}
          </select>
          {state?.currentWeekDay && SCHEDULE[state.currentWeekDay]?.length && (
            <span className="ml-3">
              Total : {SCHEDULE[state.currentWeekDay]?.length} of {USERS.length}
            </span>
          )}
        </div>

        {state?.currentWeekDay && (
          <div className="mt-4 ">
            <ul className="divide-y w-64 border rounded-md shadow-md transition-all duration-1000 ease-in-out">
              {SCHEDULE[state.currentWeekDay] ? (
                SCHEDULE[state.currentWeekDay]?.sort(compare).map((obj: any) => {
                  return (
                    <li
                      key={obj.name}
                      className="flex justify-between px-2 py-1 hover:bg-slate-100"
                    >
                      <span className="flex flex-col capitalize">
                        {obj.name}
                        {obj.isDownLine && <span className="text-[.6rem]">DownLine</span>}
                      </span>

                      <span
                        className={`capitalize text-sm ${
                          obj.type === "call" ? "text-slate-800" : "text-slate-500"
                        } ${obj.customClass ? obj.customClass : ""}`}
                      >
                        {obj.type}
                      </span>
                    </li>
                  );
                })
              ) : (
                <li className="p-2 text-red-400 text-center animate-pulse">
                  No Schedule
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
