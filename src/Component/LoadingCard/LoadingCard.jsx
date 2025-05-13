import React from "react";

export default function LoadingCard() {
  return (
    <div>
      <div class="relative animate-pulse  p-4">
        <div
          class="rounded-full bg-slate-400"
          style={{ height: "180px", width: "140px" }}
        ></div>
        {/* <div class="flex-1">
          <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
          <div class="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
        </div>
        <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div> */}
      </div>
    </div>
  );
}
