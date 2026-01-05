"use client";
import { Link } from "@heroui/react";
import { Facebook, Youtube, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background ">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold">E-Learning</h2>
            <p className="mt-2 text-sm text-default-500">
              Nền tảng học trực tuyến giúp bạn nâng cao kỹ năng và phát triển sự
              nghiệp.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Link href="#" aria-label="facebook">
                <Facebook className="w-5 h-5 text-default-500 hover:text-primary transition" />
              </Link>
              <Link href="#" aria-label="youtube">
                <Youtube className="w-5 h-5 text-default-500 hover:text-primary transition" />
              </Link>
              <Link href="#" aria-label="linkedin">
                <Linkedin className="w-5 h-5 text-default-500 hover:text-primary transition" />
              </Link>
              <Link href="#" aria-label="github">
                <Github className="w-5 h-5 text-default-500 hover:text-primary transition" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Khóa học</h3>
            <ul className="space-y-2 text-sm text-default-500">
              <li>
                <Link href="#">Frontend</Link>
              </li>
              <li>
                <Link href="#">Backend</Link>
              </li>
              <li>
                <Link href="#">Fullstack</Link>
              </li>
              <li>
                <Link href="#">Mobile App</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm text-default-500">
              <li>
                <Link href="#">Trung tâm trợ giúp</Link>
              </li>
              <li>
                <Link href="#">Liên hệ</Link>
              </li>
              <li>
                <Link href="#">Câu hỏi thường gặp</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Chính sách</h3>
            <ul className="space-y-2 text-sm text-default-500">
              <li>
                <Link href="#">Điều khoản</Link>
              </li>
              <li>
                <Link href="#">Bảo mật</Link>
              </li>
              <li>
                <Link href="#">Hoàn tiền</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-default-500">
          <span>
            © {new Date().getFullYear()} E-Learning. All rights reserved.
          </span>
          <span className="mt-2 md:mt-0">Made with ❤️ by Your Team</span>
        </div>
      </div>
    </footer>
  );
}
