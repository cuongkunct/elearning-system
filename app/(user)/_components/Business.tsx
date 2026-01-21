"use client";
import Image from "next/image";
const business = [
  { id: 1, logo: "/business/fpt_software.png", name: "Business 1" },
  { id: 2, logo: "/business/logo_vnpt.png", name: "Business 2" },
  { id: 3, logo: "/business/messer.png", name: "Business 3" },
  { id: 4, logo: "/business/vietcombank.png", name: "Business 4" },
  { id: 5, logo: "/business/vietinbank.png", name: "Business 5" },
  { id: 6, logo: "/business/vpbank.png", name: "Business 6" },
];

export default function BusinessList() {
  return (
    <section className="w-full py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between gap-8 flex-wrap lg:flex-nowrap">
          {business.map((business) => (
            <div
              key={business.id}
              className="flex items-center justify-center grayscale  hover:grayscale-0  transition"
            >
              <Image
                alt={business.name}
                className="object-contain"
                height={60}
                src={business.logo}
                width={100}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
