"use client";
import Image from "next/image";
const partners = [
  { id: 1, logo: "/partners/partner1.png", name: "Partner 1" },
  { id: 2, logo: "/partners/partner2.png", name: "Partner 2" },
  { id: 3, logo: "/partners/partner3.png", name: "Partner 3" },
  { id: 4, logo: "/partners/partner4.png", name: "Partner 4" },
  { id: 5, logo: "/partners/partner5.png", name: "Partner 5" },
  { id: 6, logo: "/partners/partner6.png", name: "Partner 6" },
  { id: 7, logo: "/partners/partner7.png", name: "Partner 7" },
  { id: 8, logo: "/partners/partner8.png", name: "Partner 8" },
];

export default function PartnerList() {
  return (
    <section className="w-full py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between gap-8 flex-wrap lg:flex-nowrap">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center hover:scale-150 transition-all duration-500"
            >
              <Image
                alt={partner.name}
                className="object-contain"
                height={60}
                src={partner.logo}
                width={100}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
