"use client";
import TimeCounter from "@/lib/TimeCounter";
import Image from "next/image";
import { useEffect, useState } from "react";

async function getNexttrainData() {
  const dataResponse = await fetch(
    "https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TKL&sta=LHP",
    {
      cache: "no-store",
    }
  );
  console.log("fetch");
  return dataResponse.json();
}

const sample = {
  status: 1,
  message: "successful",
  sys_time: "2023-07-05 0:18:14",
  curr_time: "2023-07-05 00:18:14",
  data: {
    "TKL-LHP": {
      curr_time: "2023-07-05 00:18:14",
      sys_time: "2023-07-05 0:18:14",
      DOWN: [
        {
          ttnt: "159",
          valid: "Y",
          plat: "2",
          time: "2023-07-05 05:57:00",
          source: "-",
          dest: "TIK",
          seq: "1",
        },
        {
          ttnt: "168",
          valid: "Y",
          plat: "2",
          time: "2023-07-05 06:06:00",
          source: "-",
          dest: "TIK",
          seq: "2",
        },
        {
          ttnt: "181",
          valid: "Y",
          plat: "2",
          time: "2023-07-05 06:18:00",
          source: "-",
          dest: "TIK",
          seq: "3",
        },
        {
          ttnt: "192",
          valid: "Y",
          plat: "2",
          time: "2023-07-05 06:30:00",
          source: "-",
          dest: "TIK",
          seq: "4",
        },
      ],
    },
  },
  isdelay: "N",
};

export default function Page() {
  const [nextTrainDataA, setNextTrainDataA] = useState<any>([]);
  const nextTrainData = sample.data["TKL-LHP"].DOWN;
  const [loading, setLoading] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetchNextTrainData();
  }, []);
  function fetchNextTrainData() {
    // fetch(
    //   "https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TKL&sta=LHP"
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setNextTrainDataA(data.data["TKL-LHP"].DOWN);
    //   });
    setNextTrainDataA(nextTrainData);
    setLoading(false);
    setLoaded(true);
    console.log("fetch");
  }
  function convertDataTime(dataTime: string) {
    var result;
    const dataYear = parseInt(dataTime.split(" ")[0].split("-")[0]);
    const dataMonth = parseInt(dataTime.split(" ")[0].split("-")[1]);
    const dataDate = parseInt(dataTime.split(" ")[0].split("-")[2]);
    const dataHour = parseInt(dataTime.split(" ")[1].split(":")[0]);
    const dataMin = parseInt(dataTime.split(" ")[1].split(":")[1]);
    const dataSec = parseInt(dataTime.split(" ")[1].split(":")[2]);

    // result = formatDistanceToNowStrict(
    //   new Date(
    //     dataYear,
    //     dataMonth - 1,
    //     dataDate,
    //     dataHour,
    //     dataMin,
    //     dataSec - 50
    //   ),
    //   { addSuffix: true, unit: "minute" }
    // );
    result = new Date(
      dataYear,
      dataMonth - 1,
      dataDate,
      dataHour,
      dataMin,
      dataSec - 50
    );
    return result;
  }

  return (
    <main className="flex  flex-col items-center justify-between p-5">
      <h1 className="text-xl font-bold text-center">Next Train (LP)</h1>
      <div className="mb-20">
        {!loading ? (
          nextTrainDataA.map((train: any, i: number) => {
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center my-5"
              >
                <h2 className="text-2xl font-bold text-center">
                  <TimeCounter targetDate={convertDataTime(train.time)} />
                </h2>
              </div>
            );
          })
        ) : (
          <Image
            className="justify-center content-center m-20"
            src="/loading.gif"
            width={25}
            height={50}
            alt={""}
          />
        )}
        {loaded && nextTrainDataA[0] == null ? <h1>No Train Available</h1> : ""}
      </div>

      <button onClick={() => fetchNextTrainData()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </main>
  );
}
