import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import { IArea } from "@/types/area";
import { queryToUrlSearchParams } from "@/utils";
import axios from "axios";
import { XIcon } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface Props {
  open: boolean;
  setOpen: any;
  areas: IArea[];
}

export default function UserCreateModal({ open, setOpen, areas }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const AREAS = areas.map((area) => ({
    label: area.name,
    value: area.id,
  }));
  const params = queryToUrlSearchParams(router?.query)?.toString();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = Object.fromEntries(new FormData(e.target));
    try {
      const payload = {
        ...formData,
      };
      await axios.post("/api/user", payload);
      Swal.fire({
        icon: "success",
        title: "User Created Successfully",
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
        title: error?.response?.data?.message?.message || "Error creating user",
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
            Tambah Data Pengguna
          </h1>
          <button type="button" onClick={setOpen}>
            <XIcon className="w-6 h-6 text-orange-500" />
          </button>
        </div>
        <form className="mt-4 flex flex-col gap-2" onSubmit={onSubmit}>
          <Input
            label="Nama"
            required={true}
            placeholder="Masukkan Nama"
            name="name"
          />
          <Input
            label="Username"
            required={true}
            placeholder="Masukkan Username"
            name="username"
          />
          <Input
            label="Email"
            required={true}
            placeholder="Masukkan Email"
            name="email"
            type="email"
          />
          <Input
            label="Password"
            required={true}
            placeholder="Masukkan Password"
            name="password"
            type="password"
          />
          <Input
            label="No Telepon"
            required={true}
            placeholder="Masukkan No Telepon"
            name="phone"
            type="number"
          />
          <Select
            options={AREAS}
            label="Lokasi"
            required={true}
            placeholder="Pilih Lokasi"
            name="areaId"
          />
          <Select
            options={[
              { value: "FINANCE", label: "Admin Keuangan" },
              { value: "CASHIER", label: "Kasir" },
            ]}
            label="Peran"
            required={true}
            placeholder="Pilih Peran"
            name="role"
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
