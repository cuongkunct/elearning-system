"use client";
import Image from "next/image";
import { Course } from "@/types/user/course/course.type";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/react";

type Props = {
  course: Course;
};

export default function JoinCourseCard({ course }: Props) {
  return (
    <Card shadow="sm" onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <Image
          src={course.hinhAnh}
          alt={course.tenKhoaHoc}
          width={400}
          height={250}
          className="rounded-lg object-cover"
        />
      </CardBody>
      <CardFooter className="text-sm flex justify-start">
        <div className="text-sm  space-y-2 text-left">
          <p>
            <strong>Teacher:</strong> Anh Cường Dev
          </p>
          <p>
            <strong>Category:</strong> {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          </p>
          <p>
            <strong>Create date:</strong> {course.ngayTao}
          </p>
        </div>
      </CardFooter>

      <Button color="primary" className="m-4">
        Join now
      </Button>
    </Card>
  );
}
