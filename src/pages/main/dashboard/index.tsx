import { FilterIcon } from "lucide-react";
import React from "react";

export default function DashboardPage() {
  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 mt-4">
          <div className="bg-blue-100 rounded p-4 w-full">
            <p>Jumlah Pengguna</p>
            <h5 className="text-2xl font-bold">20</h5>
          </div>
          <div className="bg-red-100 rounded p-4 w-full">
            <p>Jumlah Lokasi</p>
            <h5 className="text-2xl font-bold">20</h5>
          </div>
          <div className="bg-green-100 rounded p-4 w-full">
            <p>Jumlah Transaksi</p>
            <h5 className="text-2xl font-bold">20</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
