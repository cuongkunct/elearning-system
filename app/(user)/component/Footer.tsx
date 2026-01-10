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
              Online learning platforms help you improve your skills and advance
              your career.
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
            <h3 className="font-semibold mb-3">Course</h3>
            <ul className="space-y-2 text-sm text-default-500">
              <li>
                <Link href="/categories?id=FrontEnd">Frontend</Link>
              </li>
              <li>
                <Link href="/categories?id=BackEnd">Backend</Link>
              </li>
              <li>
                <Link href="/categories?id=FullStack">Fullstack</Link>
              </li>
              <li>
                <Link href="/categories?id=DiDong">Mobile App</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-default-500">
              <li>
                <Link href="#">Help Center</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
              <li>
                <Link href="#">Frequently asked questions</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Policy</h3>
            <ul className="space-y-2 text-sm text-default-500">
              <li>
                <Link href="#">Terms of service</Link>
              </li>
              <li>
                <Link href="#">Privacy</Link>
              </li>
              <li>
                <Link href="#">Refund</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-default-500">
          <span>
            © {new Date().getFullYear()} E-Learning. All rights reserved.
          </span>
          <span className="mt-2 md:mt-0">Made with ❤️ by Cuong Dev</span>
        </div>
      </div>
    </footer>
  );
}
