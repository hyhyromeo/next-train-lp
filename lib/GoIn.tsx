"use client";
import TimeCounter from "@/lib/TimeCounter";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const sample = {
  status: 1,
  message: "successful",
  sys_time: "2023-07-05 3:48:23",
  curr_time: "2023-07-05 03:48:23",
  data: {
    "TKL-TIK": {
      curr_time: "2023-07-05 03:48:23",
      sys_time: "2023-07-05 3:48:23",
      UP: [
        {
          ttnt: "147",
          valid: "Y",
          plat: "3",
          time: "2023-07-05 06:15:00",
          source: "-",
          dest: "POA",
          seq: "1",
        },
        {
          ttnt: "151",
          valid: "Y",
          plat: "3",
          time: "2023-07-05 06:18:00",
          source: "-",
          dest: "LHP",
          seq: "2",
        },
        {
          ttnt: "155",
          valid: "Y",
          plat: "3",
          time: "2023-07-05 06:22:00",
          source: "-",
          dest: "POA",
          seq: "3",
        },
        {
          ttnt: "161",
          valid: "Y",
          plat: "3",
          time: "2023-07-05 06:28:00",
          source: "-",
          dest: "POA",
          seq: "4",
        },
      ],
      DOWN: [
        {
          ttnt: "138",
          valid: "Y",
          plat: "4",
          time: "2023-07-05 06:05:00",
          source: "-",
          dest: "NOP",
          seq: "1",
        },
        {
          ttnt: "142",
          valid: "Y",
          plat: "4",
          time: "2023-07-05 06:09:00",
          source: "-",
          dest: "NOP",
          seq: "2",
        },
        {
          ttnt: "146",
          valid: "Y",
          plat: "4",
          time: "2023-07-05 06:14:00",
          source: "-",
          dest: "NOP",
          seq: "3",
        },
        {
          ttnt: "150",
          valid: "Y",
          plat: "4",
          time: "2023-07-05 06:17:00",
          source: "-",
          dest: "NOP",
          seq: "4",
        },
      ],
    },
  },
  isdelay: "N",
};

export default function GoIn() {
  const [nextTrainDataA, setNextTrainDataA] = useState<any>([]);
  const nextTrainData = sample.data["TKL-TIK"].UP.filter(
    (train: any) => train.dest == "LHP"
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getData();
    fetchNextTrainData();
  }, []);

  function fetchNextTrainData() {
    setInterval(() => {
      getData();
    }, 60000);
  }
  function getData() {
    fetch(
      "https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TKL&sta=TIK"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(
          data.data["TKL-TIK"].UP.filter((train: any) => train.dest == "LHP")
        );
        setNextTrainDataA(
          data.data["TKL-TIK"].UP.filter((train: any) => train.dest == "LHP")
        );
      });
    // setNextTrainDataA(nextTrainData);
    setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);
    console.log("fetch");
  }

  // function convertDataTime(dataTime: string) {
  //   var result;
  //   const dataYear = parseInt(dataTime.split(" ")[0].split("-")[0]);
  //   const dataMonth = parseInt(dataTime.split(" ")[0].split("-")[1]);
  //   const dataDate = parseInt(dataTime.split(" ")[0].split("-")[2]);
  //   const dataHour = parseInt(dataTime.split(" ")[1].split(":")[0]);
  //   const dataMin = parseInt(dataTime.split(" ")[1].split(":")[1]);
  //   const dataSec = parseInt(dataTime.split(" ")[1].split(":")[2]);
  //   result = new Date(
  //     dataYear,
  //     dataMonth - 1,
  //     dataDate,
  //     dataHour,
  //     dataMin + 3,
  //     dataSec - 50
  //   );
  //   return result;
  // }

  return (
    <>
      <div className="m-8">
        {!loading ? (
          nextTrainDataA.map((train: any, i: number) => {
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center my-5"
              >
                <h2 className="text-2xl font-bold text-center">
                  <TimeCounter targetDate={train.ttnt} />
                  {/* <TimeCounter targetDate={convertDataTime(train.time)} /> */}
                </h2>
              </div>
            );
          })
        ) : (
          <Image
            className="justify-center content-center"
            src="/loading.gif"
            width={25}
            height={50}
            alt={""}
          />
        )}
        {loaded && nextTrainDataA[0] == null ? (
          <h1>Seems No Train Available</h1>
        ) : (
          ""
        )}
      </div>

      <button onClick={() => getData()}>
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
    </>
  );
}
