import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import { optionDays } from "@/constants/days";
import { queryToUrlSearchParams } from "@/utils";
import axios from "axios";
import { XIcon } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface Props {
  open: boolean;
  setOpen: any;
}

const vehicles = [
  { value: "BIKE", label: "Motor" },
  { value: "CAR", label: "Mobil" },
];

export default function CategoryCreateModal({ open, setOpen }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDays, setSelectedDays] = useState<any[]>([]);
  const params = queryToUrlSearchParams(router?.query)?.toString();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = Object.fromEntries(new FormData(e.target));
    try {
      const payload = {
        ...formData,
        days: selectedDays,
        price: +formData?.price,
      };
      await axios.post("/api/category", payload);
      Swal.fire({
        icon: "success",
        title: "Category Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      setOpen();
      router.push(`?${params}`);
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title:
          error?.response?.data?.message?.message || "Error creating Category",
      });
      if (error?.response?.data?.message?.code === 401) {
        router.push("/");
        setLoading(false);
        return;
      }
      setLoading(false);
    }
  };
  return (
    <div>
      <Modal open={open} setOpen={setOpen}>
        <div className="border-b-2 border-gray-200 pb-4 flex justify-between gap-2">
          <h1 className="text-center font-bold text-xl text-orange-500">
            Tambah Data Kategori
          </h1>
          <button type="button" onClick={setOpen}>
            <XIcon className="w-6 h-6 text-orange-500" />
          </button>
        </div>
        <form className="mt-4 flex flex-col gap-2" onSubmit={onSubmit}>
          <input type="hidden" name="areaId" value={router.query.area_id} />
          <Input
            label="Nama Kategori"
            required={true}
            placeholder="Masukkan Nama"
            name="name"
          />
          <Select
            options={vehicles}
            label="Jenis Kendaraan"
            placeholder="Pilih Jenis Kendaraan"
            name="type"
          />
          <Select
            options={optionDays}
            label="Hari"
            placeholder="Pilih Hari"
            isMulti
            name="days"
            onChange={(e: any) => {
              setSelectedDays(e.map((day: any) => day.value));
            }}
          />
          <Input
            label="Tarif"
            required={true}
            placeholder="Masukkan Tarif"
            name="price"
            type="number"
          />
          <div className="w-full flex justify-end gap-2 border-t-2 border-t-gray-200 pt-4 mt-2">
            <Button
              variant="custom-color"
              className="border border-orange-500 text-orange-500"
              type="button"
              onClick={setOpen}
            >
              Batal
            </Button>
            <Button variant="submit" disabled={loading} type="submit">
              {loading ? "Loading..." : "Simpan"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
