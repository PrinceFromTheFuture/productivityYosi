import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface Data {
  id: string;
  userId: string;
  date: string;
}

interface Users {
  id: string;
  name: string;
}
const App = () => {
  const [data, setData] = useState<Data[] | null>(null);
  const [users, setUsers] = useState<Users[] | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const getData = async () => {
    const res = await axios.get<{ success: boolean; sesstions: Data[] }>(
      "https://productivityyosi-backend.onrender.com/sessions"
    );
    setData(res.data.sesstions);
    console.log(res.data);
  };
  const getUsers = async () => {
    const res = await axios.get<{ success: boolean; users: Users[] }>(
      "https://productivityyosi-backend.onrender.com/users"
    );
    setUsers(res.data.users);
    console.log(res.data);
  };
  const getallData = () => {
    getData();
    getUsers();
  };
  useEffect(() => {
    getallData();
    setCurrentUser(localStorage.getItem("userId"));
  }, []);

  if (!data || !users) {
    return <div>loading....</div>;
  }
  return (
    <div className=" fixed inset-0 overflow-auto bg-slate-100 ">
      {!currentUser && (
        <div className=" absolute bg-black  top-6">
          {users!.map((user) => {
            return (
              <button
                className=" p-4 bg-slate-300 m-2 rounded-xl"
                onClick={() => {
                  localStorage.setItem("userId", user.id);
                  setCurrentUser(user.id);
                }}
              >
                {user.name}
              </button>
            );
          })}
        </div>
      )}
      <div className=" min-h-full items-center mt-20   flex gap-56  flex-col justify-between">
        <div className=" text-4xl font-bold">productivty hours today :</div>
        <div className=" flex flex-col items-center">
          <div
            onClick={async () => {
              await axios.post("https://productivityyosi-backend.onrender.com/newSession", {
                userId: currentUser,
              });
              getallData();
            }}
            className=" p-8 rounded-2xl bg-blue-950 text-white text-4xl font-semibold"
          >
            new 30 minutes session
          </div>

          {currentUser && (
            <div className=" text-bold text-lg">
              {data
                .filter((session) => dayjs(session.date).isSame(dayjs(), "day"))
                .filter((session) => session.userId === currentUser).length / 2}{" "}
              Hours today
            </div>
          )}
        </div>
        <div className=" w-[85%] mb-12">
          <div className=" text-xl font-semibold flex justify-between items-center">
            <div>date</div>
            <div>yosi</div>
            <div>amir</div>
          </div>
          {Array.from(
            [
              1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
              26, 27, 28, 29, 30,
            ],
            (_, index) => {
              return (
                <div className=" text-xl font-semibold flex justify-between items-center">
                  <div> {dayjs().subtract(index, "days").format("DD/MM/YYYY")}</div>
                  <div>
                    {data
                      .filter((session) => dayjs(session.date).isSame(dayjs().subtract(index, "days"), "day"))
                      .filter((session) => session.userId === "c074fca1-2181-40e6-8938-620c1d4c2010").length /
                      2}{" "}
                    hours
                  </div>
                  <div>
                    {" "}
                    {data
                      .filter((session) => dayjs(session.date).isSame(dayjs().subtract(index, "days"), "day"))
                      .filter((session) => session.userId === "8a0753d6-65b4-46b4-b206-79801c8fb1e5").length /
                      2}{" "}
                    hours
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
