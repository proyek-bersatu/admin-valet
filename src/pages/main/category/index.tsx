import Button from "@/components/Button";
import Input from "@/components/Input";
import { useModal } from "@/components/Modal";
import CategoryCreateModal from "@/components/modals/category/create";
import CategoryDeleteModal from "@/components/modals/category/delete";
import CategoryUpdateModal from "@/components/modals/category/update";
import UserCreateModal from "@/components/modals/user/create";
import UserDeleteModal from "@/components/modals/user/delete";
import UserUpdateModal from "@/components/modals/user/update";
import Select from "@/components/Select";
import { CONFIG } from "@/config";
import { ColumnCategory } from "@/constants/column_category";
import { ColumnUser } from "@/constants/column_user";
import { IArea } from "@/types/area";
import axios from "axios";
import { parse } from "cookie";
import { PencilLineIcon, TrashIcon } from "lucide-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query, req } = ctx;
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  try {
    // if (!token) {
    //   return {
    //     redirect: {
    //       destination: "/",
    //       permanent: false,
    //     },
    //   };
    // }
    const { page = 1, limit = 10, search = "", areaid } = query;

    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      areaid: String(areaid),
    });

    if (typeof search === "string" && search.trim() !== "") {
      params.set("search", search);
    }

    const table = await axios.get(
      `${CONFIG.base_url_api}/partner/category?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const areas = await axios.get(
      `${CONFIG.base_url_api}/partner/areas?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (table?.status === 401) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // Optionally validate token...
    return {
      props: {
        table: table?.data?.data || [],
        areas: areas?.data?.data || [],
      },
    };
  } catch (error: any) {
    console.log(error);
    if (error?.response?.status === 401) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: { table: [] },
    };
  }
};

export default function UserPage({ table, areas }: any) {
  const [show, setShow] = useState<boolean>(false);
  const [modal, setModal] = useState<useModal>();
  const router = useRouter();
  const [filter, setFilter] = useState<any>(router.query);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShow(true);
    }
  }, []);
  const data = [...table?.data].map((item, index) => ({
    ...item,
    action: (
      <div key={index} className="flex gap-2">
        <Button
          className="bg-orange-200 text-orange-500"
          variant="custom-color"
          type="button"
          onClick={() => {
            setModal({
              open: true,
              data: item,
              key: "update",
            });
          }}
        >
          <PencilLineIcon className="w-4 h-4" />
        </Button>
        <Button
          className="bg-red-200 text-red-500"
          variant="custom-color"
          type="button"
          onClick={() => {
            setModal({
              open: true,
              data: item,
              key: "delete",
            });
          }}
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    ),
  }));

  useEffect(() => {
    const queryFilter = new URLSearchParams(filter).toString();
    router.push(`?${queryFilter}`);
  }, [filter]);
  return (
    <div>
      <div className="flex lg:flex-row flex-col gap-2 items-center justify-between">
        <h1 className="text-2xl font-bold">Kategori</h1>
      </div>
      <div className="flex lg:flex-row flex-col gap-2 items-center justify-between mt-4">
        <div className="flex gap-2 lg:flex-row flex-col items-end w-full">
          <Input
            placeholder="Cari Kategori"
            type="search"
            onChange={(e) => setFilter({ search: e.target.value })}
            className="lg:w-auto w-full"
          />
          <Select
            options={areas?.data?.map((item: IArea) => ({
              value: item.id,
              label: item.name,
            }))}
            defaultValue={filter?.areaid}
            placeholder="Pilih Lokasi"
            onChange={(e: any) => setFilter({ areaid: e?.value || "" })}
          />
        </div>
        <Button
          variant="custom-color"
          className={`bg-orange-500 text-white w-1/5 ${
            filter?.areaid ? "" : "hidden"
          }`}
          type="button"
          onClick={() => setModal({ open: true, key: "create" })}
          disabled={!filter?.areaid}
        >
          + Tambah Kategori
        </Button>
      </div>
      {filter?.areaid ? (
        <div className="w-full overflow-x-auto">
          {show && (
            <div className="mt-4">
              <DataTable
                columns={ColumnCategory}
                data={data}
                pagination
                highlightOnHover
                responsive
                customStyles={{
                  headCells: {
                    style: {
                      backgroundColor: "#f3f4f6",
                      fontWeight: "bold",
                    },
                  },
                  rows: {
                    style: {
                      "&:hover": {
                        backgroundColor: "#e5e7eb",
                      },
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="bg-blue-100 rounded p-2 mt-4">
          <p>Harap pilih lokasi terlebih dahulu</p>
        </div>
      )}

      {modal?.key == "create" && (
        <CategoryCreateModal open={modal?.open} setOpen={setModal} />
      )}
      {modal?.key == "update" && (
        <CategoryUpdateModal
          open={modal?.open}
          setOpen={setModal}
          data={modal?.data}
        />
      )}
      {modal?.key == "delete" && (
        <CategoryDeleteModal
          open={modal?.open}
          setOpen={setModal}
          data={modal?.data}
        />
      )}
    </div>
  );
}
