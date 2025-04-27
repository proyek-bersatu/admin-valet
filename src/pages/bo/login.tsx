import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      if (!payload.email || !payload.password) {
        return Swal.fire({
          icon: "warning",
          title: "Login Gagal",
          text: "Email dan password harus diisi",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      const result = await axios.post("/api/bo_login", payload);
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang di Admin Valet Services",
        showConfirmButton: false,
        timer: 1500,
      });
      // Set user login data
      useAuthStore
        .getState()
        .login(result?.data?.payload?.token, result.data?.payload?.user);
      router.push("/bo/main/dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Email atau password salah",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center">
      <Head>
        <title>Backoffice</title>
      </Head>
      <h1 className="font-bold text-2xl text-center">
        Backoffice Valet Services
      </h1>
      <div className="mt-2 bg-white w-[400px] p-4 shadow rounded">
        <form onSubmit={onSubmit}>
          <Input
            label="Email"
            placeholder="Masukkan Email"
            name="email"
            autoFocus
          />
          <Input
            name="password"
            label="Password"
            type="password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            placeholder="Masukkan password"
          />
          <Button disabled={loading} variant="primary" className="mt-4 w-full">
            {loading ? "Memproses..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
