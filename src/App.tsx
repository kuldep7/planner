import { useMemo, useState } from "react";

import { USERS, WEEK_DAYS } from "./constants";

interface StateInt {
  currentWeekDay: string | undefined;
  totalUsers: number | undefined;
}
const sortBy =
  (key = "type") =>
  (a: any, b: any) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  };
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
  const memoUser = useMemo(() => {
    const totalUsers = USERS.length;
    setState((prev: any) => stateSet(prev, { totalUsers }));
    return USERS.sort(sortBy("day"));
  }, []);
  const currentWeekArray = useMemo(() => {
    if (state?.currentWeekDay)
      return memoUser.filter((arr) => arr.day === state?.currentWeekDay)?.sort(sortBy());
    return null;
  }, [state?.currentWeekDay]);
  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center flex-col h-screen">
        <div className="flex justify-center items-center ">
          <select
            name="currentWeekDay"
            defaultValue=""
            value={state?.currentWeekDay}
            onChange={handleWeekDaysChange}
            className="capitalize border rounded-xs px-4 py-2 shadow-sm outline-0 text-sm"
          >
            <option value="">{state?.currentWeekDay ? "Clear" : "Select"}</option>
            {WEEK_DAYS.map((val) => (
              <option key={val} value={val} className="bg-red-400 text-sm">
                {val}
              </option>
            ))}
          </select>
          {state?.currentWeekDay && currentWeekArray && currentWeekArray.length > 0 && (
            <span className="ml-3">
              Total : {currentWeekArray?.length} of {USERS.length}
            </span>
          )}
        </div>

        {state?.currentWeekDay && (
          <div className="mt-4 ">
            <ul className="divide-y w-64 border rounded-md shadow-md transition-all duration-1000 ease-in-out">
              {currentWeekArray && currentWeekArray.length > 0 ? (
                currentWeekArray.map((obj: any) => {
                  return (
                    <li
                      key={obj.name}
                      className="flex justify-between items-center px-2 py-1 text-sm hover:bg-slate-100 hover:cursor-pointer"
                    >
                      <span className="flex flex-col capitalize">
                        {obj.name}
                        {obj.isDownLine && <span className="text-[.6rem]">DownLine</span>}
                      </span>

                      <span
                        className={`capitalize text-[.6rem] font-semibold  ${
                          obj.type === "call" ? "text-green-700" : "text-blue-700"
                        } ${obj.customClass ? obj.customClass : ""}`}
                      >
                        {obj.type}
                      </span>
                    </li>
                  );
                })
              ) : (
                <li className=" flex items-center justify-center p-2 text-red-400 text-center animate-pulse min-h-[10rem]">
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
