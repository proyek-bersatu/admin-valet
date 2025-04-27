import {
  BarChart2Icon,
  BoxIcon,
  Building2Icon,
  ClipboardCheck,
  CreditCardIcon,
  ListChecksIcon,
  UserIcon,
  Users2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  navigations: any[];
  isWide: boolean;
}

export const getIcon = (icon: string) => {
  switch (icon) {
    case "dashboard":
      return <BarChart2Icon className={`w-6 h-6 text-white`} />;
    case "area":
      return <Building2Icon className={`w-6 h-6 text-white`} />;
    case "user":
      return <UserIcon className={`w-6 h-6 text-white`} />;
    case "category":
      return <BoxIcon className={`w-6 h-6 text-white`} />;
    case "cashier":
      return <ListChecksIcon className={`w-6 h-6 text-white`} />;
    case "report-transaction":
      return <ClipboardCheck className={`w-6 h-6 text-white`} />;
    case "fee":
      return <CreditCardIcon className={`w-6 h-6 text-white`} />;
    case "admin":
      return <UserIcon className={`w-6 h-6 text-white`} />;
    case "partner":
      return <Users2Icon className={`w-6 h-6 text-white`} />;
    default:
      return <></>;
  }
};

export default function Sidebar({ navigations, isWide }: Props) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center py-6">
      <div className="p-2">
        {/* <Image
          alt="logo"
          src={ isWide ? "/images/logo.png" : "/images/logo-camera-only.svg"}
          className={isWide ? "w-auto h-auto" : "w-7 h-7"}
          layout="relative"
          width={isWide ? 170 : 50}
          height={isWide ? 25 : 50}
        /> */}
        <h2 className={isWide ? "text-2xl text-white" : "text-xs text-white"}>
          {pathname?.includes("/bo/main") ? "Backoffice" : "Admin"} Valet Services
        </h2>
      </div>
      <div className="py-5 px-4 mt-5 w-full border-t-2 border-t-white">
        {navigations.map((navigation, index) => (
          <div key={index} className="my-2">
            <Link
              href={navigation.href}
              className={`${
                pathname === navigation.href
                  ? "bg-orange-500 gap-4"
                  : "bg-transparent hover:bg-orange-500 duration-200 gap-4 transition-all"
              } py-4 px-4 w-full flex items-center ${
                isWide
                  ? "justify-start rounded-full"
                  : "justify-center rounded-xl"
              }`}
            >
              {/* <Image
                alt={navigation.title}
                src={`${navigation.icon}`}
                className="w-auto h-auto"
                layout="relative"
                width={5}
                height={5}
              /> */}
              {getIcon(navigation.icon)}
              {isWide ? <p className="text-white">{navigation.title}</p> : ""}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
