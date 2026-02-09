"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <img
            alt="404 illustration"
            className="w-full max-w-md drop-shadow-xl"
            src="/scarecrow.png"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-7xl font-extrabold text-gray-900 dark:text-white">
            404
          </h1>
          <p className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Oops! Page not found or{" "}
            <strong className="text-red-500 text-4xl">
              you don&apos;t have permission to access
            </strong>
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable, or you don&apos;t have
            access.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <Button
                className="px-8"
                color="primary"
                startContent={<ArrowLeft size={18} />}
              >
                Back to Home
              </Button>
            </Link>
            <Button
              className="px-8"
              variant="bordered"
              onPress={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
