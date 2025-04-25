import Button from "@/components/Button";
import Input from "@/components/Input";
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
        username: e.target.username.value,
        password: e.target.password.value,
      };
      if (!payload.username || !payload.password) {
        return Swal.fire({
          icon: "warning",
          title: "Login Gagal",
          text: "Email dan password harus diisi",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(payload);
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Selamat datang di Admin Valet Services",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/main/dashboard")
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
      <h1 className="font-bold text-2xl text-center">Admin Valet Services</h1>
      <div className="mt-2 bg-white w-[400px] p-4 shadow rounded">
        <form onSubmit={onSubmit}>
          <Input
            label="Username"
            placeholder="Masukkan username"
            name="username"
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
            {loading ? "Memproses" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
