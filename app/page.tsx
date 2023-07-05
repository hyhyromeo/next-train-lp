"use client";
import GoIn from "@/lib/GoIn";
import GoOut from "@/lib/GoOut";
import TimeCounter from "@/lib/TimeCounter";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [goOut, setGoOut] = useState<any>(true);

  return (
    <main className="flex h-screen flex-col items-center ">
      <button
        onClick={() => setGoOut(!goOut)}
        className="flex items-center justify-center align-middle text-xl font-bold text-center border-b-2 w-full border-neutral-400	h-16"
      >
        {goOut ? "LP go out 🏃🏻‍♂️💨" : "🏃🏻‍♂️💨 go in LP "}
      </button>

      {goOut ? <GoOut /> : <GoIn />}
    </main>
  );
}
