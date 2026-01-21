"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  CodeIcon,
  FrontEndIcon,
  FullStaskIcon,
  MobileIcon,
  PaletteIcon,
  ThinkingIcon,
} from "@/components/icons";

export default function AboutPage() {
  const router = useRouter();
  const categories = [
    {
      maDanhMuc: "BackEnd",
      tenDanhMuc: "Backend Development",
      icon: <CodeIcon size={32} />,
    },
    {
      maDanhMuc: "Design",
      tenDanhMuc: "Web Design",
      icon: <PaletteIcon size={32} />,
    },
    {
      maDanhMuc: "DiDong",
      tenDanhMuc: "Mobile Development",
      icon: <MobileIcon size={32} />,
    },
    {
      maDanhMuc: "FrontEnd",
      tenDanhMuc: "Frontend Development",
      icon: <FrontEndIcon size={32} />,
    },
    {
      maDanhMuc: "FullStack",
      tenDanhMuc: "Full Stack Development",
      icon: <FullStaskIcon size={32} />,
    },
    {
      maDanhMuc: "TuDuy",
      tenDanhMuc: "Programming Mindset",
      icon: <ThinkingIcon size={32} />,
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <section className="relative w-full h-64 md:h-96 lg:h-[500px]">
        <Image
          alt="Blog background"
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="blog-banner.png"
        />
        <div className="absolute inset-0 bg-gray-900/50" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto max-w-7xl px-8">
            <h1 className="text-5xl font-bold mb-4 text-white">Blog TOT</h1>
            <p className="max-w-xl text-lg  mb-8 text-white">
              Sharing knowledge, learning experiences, and skill development
              tailored for individuals and businesses.
            </p>
            <Button color="primary" onPress={() => router.push("/courses")}>
              Join Now
            </Button>
          </div>
        </div>
      </section>
      <div className="py-5 px-4 font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Mission */}
            <div className="p-8 rounded-xl border border-gray-200 shadow-md flex flex-col items-center text-center dark:bg-gray-900 dark:border-gray-700 dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
              <div className="mb-4 text-blue-600 dark:text-blue-400">
                <svg
                  fill="none"
                  height="48"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Mission</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Transforming people and businesses, helping them achieve
                breakthrough goals through learning.
              </p>
            </div>

            {/* Beliefs */}
            <div className="p-8 rounded-xl border border-gray-200 shadow-md flex flex-col items-center dark:bg-gray-900 dark:border-gray-700 dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
              <div className="mb-4 text-blue-600 dark:text-blue-400">
                <svg
                  fill="none"
                  height="48"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 3h12l4 6-10 13L2 9Z" />
                  <path d="M11 3 8 9l4 13 4-13-3-6" />
                  <path d="M2 9h20" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">Beliefs</h3>
              <ul className="text-sm space-y-2 list-none text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span> Developing
                  people is developing the organization.
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span> Human nature is
                  inherently good and capable.
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">•</span> All members of
                  the Company strive their best to serve the ultimate boss the
                  common goals and mutual interests.
                </li>
              </ul>
            </div>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-xl border border-gray-200 shadow-md mb-20 flex flex-col items-center dark:bg-gray-900 dark:border-gray-700 dark:shadow-[0_4px_25px_rgba(255,255,255,0.08)]">
            <div className="mb-4 text-blue-600 dark:text-blue-400">
              <svg
                fill="none"
                height="48"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Vision to 2027</h3>
            <ul className="text-sm space-y-2 max-w-3xl text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span> Serving 10,000
                businesses and 10 million learners in Vietnam.
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span> Trusted and loved
                by customers and partners for the Wow experience.
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span> Becoming a
                self-managed company where employees enjoy prosperity and
                respect.
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span> A testament to
                sustainable growth through investment in human development and
                transformation.
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-center mb-16 tracking-wide uppercase">
            6 CORE VALUES
          </h2>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
            {/* 1 */}
            <div className="text-center shadow-md p-6 rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:shadow-[0_4px_15px_rgba(255,255,255,0.05)] transition-transform hover:scale-105">
              <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
                <svg
                  fill="none"
                  height="40"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h4 className="font-bold mb-3">Focus on what matters</h4>
              <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
                The TOT team always focuses on critical tasks that, when
                completed, create a large, positive, and systemic impact.
              </p>
            </div>

            {/* 2 */}
            <div className="text-center shadow-md p-6 rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:shadow-[0_4px_15px_rgba(255,255,255,0.05)] transition-transform hover:scale-105">
              <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
                <svg
                  fill="none"
                  height="40"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m18 15 3-3-3-3" />
                  <path d="m6 9-3 3 3 3" />
                  <path d="M21 12H3" />
                  <path d="m9 18 3 3 3-3" />
                  <path d="m15 6-3-3-3 3" />
                  <path d="M12 21V3" />
                </svg>
              </div>
              <h4 className="font-bold mb-3">
                Doing the right things together
              </h4>
              <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
                We align on key objectives, define clear roles, and maintain
                cross-departmental links to ensure collective success.
              </p>
            </div>

            {/* 3 */}
            <div className="text-center shadow-md p-6 rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:shadow-[0_4px_15px_rgba(255,255,255,0.05)] transition-transform hover:scale-105">
              <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
                <svg
                  fill="none"
                  height="40"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 5h6v6h-6z" />
                  <path d="M2 5h6v6H2z" />
                  <path d="M9 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
                </svg>
              </div>
              <h4 className="font-bold mb-3">Honor your word</h4>
              <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
                We cherish our integrity, choose directness, and deliver on
                promises. If a commitment cannot be met, we inform stakeholders
                immediately and provide a new commitment.
              </p>
            </div>

            {/* 4 */}
            <div className="text-center shadow-md p-6 rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:shadow-[0_4px_15px_rgba(255,255,255,0.05)] transition-transform hover:scale-105">
              <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
                <svg
                  fill="none"
                  height="40"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M8 9h8" />
                  <path d="M8 13h6" />
                </svg>
              </div>
              <h4 className="font-bold mb-3">Complete communication</h4>
              <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
                Communicate clearly and directly to prevent misunderstandings.
                Fully understand others and ensure you are understood.
              </p>
            </div>

            {/* 5 */}
            <div className="text-center shadow-md p-6 rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:shadow-[0_4px_15px_rgba(255,255,255,0.05)] transition-transform hover:scale-105">
              <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
                <svg
                  fill="none"
                  height="40"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a7 7 0 1 0 10 10" />
                </svg>
              </div>
              <h4 className="font-bold mb-3">Be the source</h4>
              <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
                Choose a mindset where you are the source of your choices and
                actions. You are the cause of your reality, not the consequence.
              </p>
            </div>

            {/* 6 */}
            <div className="text-center shadow-md p-6 rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:shadow-[0_4px_15px_rgba(255,255,255,0.05)] transition-transform hover:scale-105">
              <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
                <svg
                  fill="none"
                  height="40"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                  <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                  <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </div>
              <h4 className="font-bold mb-3">Wow Experience</h4>
              <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
                Put yourself in the shoes of partners and customers. Listen
                actively to deliver experiences that exceed expectations. We
                never say No, we find a way to say Yes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="py-5 px-4     transition-colors duration-300 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-tight">
            Course Categories at TOT
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-5/12 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  alt="Programming Hero"
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  src="/banner1.png"
                />
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
              </div>
            </div>
            <div className="w-full lg:w-7/12 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
              {categories.map((item) => (
                <Link
                  key={item.maDanhMuc}
                  className="flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300
                            bg-white text-slate-800 shadow-md hover:-translate-y-2 ..."
                  href={`/courses?id=${item.maDanhMuc}`}
                >
                  <div className="mb-4">{item.icon}</div>
                  <span className="text-sm font-bold text-center">
                    {item.tenDanhMuc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
