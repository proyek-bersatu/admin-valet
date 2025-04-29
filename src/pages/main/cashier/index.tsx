import Button from "@/components/Button";
import Input from "@/components/Input";
import { useModal } from "@/components/Modal";
import AreaCreateModal from "@/components/modals/area/create";
import AreaDeleteModal from "@/components/modals/area/delete";
import AreaUpdateModal from "@/components/modals/area/update";
import Select from "@/components/Select";
import { CONFIG } from "@/config";
import { ColumnArea } from "@/constants/column_area";
import { IArea } from "@/types/area";
import { ICategory } from "@/types/category";
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
    const { page = 1, limit = 10, search = "" } = query;

    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (typeof search === "string" && search.trim() !== "") {
      params.set("search", search);
    }

    const areas = await axios.get(
      `${CONFIG.base_url_api}/partner/areas?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const categories = await axios.get(
      `${CONFIG.base_url_api}/partner/category?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Optionally validate token...
    return {
      props: {
        areas: areas?.data?.data || [],
        categories: categories?.data?.data || [],
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

export default function UserPage({ areas, categories }: any) {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  const [filter, setFilter] = useState<any>(router.query);
  const AREAS = areas?.data?.map((area: IArea) => ({
    ...area,
    value: area.id,
    label: area.name,
  }));
  const CATEGORIES = categories?.data?.map((category: ICategory) => ({
    ...category,
    value: category.id,
    label: category.name,
  }));
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    const queryFilter = new URLSearchParams(filter).toString();
    router.push(`?${queryFilter}`);
  }, [filter]);
  return (
    <div>
      <div className="flex lg:flex-row flex-col gap-2 items-center justify-between">
        <h1 className="text-2xl font-bold">Kasir</h1>
      </div>
      <form className="mt-4 flex flex-col gap-2 pb-32">
        <Select options={AREAS} placeholder="Pilih Lokasi" name="areaId" />
        <Select
          options={CATEGORIES}
          placeholder="Pilih Kategori"
          name="categoryId"
        />
        <Input name="platNo" maxLength={10} placeholder="B 1234 BAH" type="platNo" />
        <button className="bg-blue-500 text-white py-2 rounded w-full text-2xl">
            Submit
        </button>
      </form>
    </div>
  );
}
