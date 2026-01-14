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
    <Card isPressable shadow="sm" onPress={() => console.log("item pressed")}>
      <CardBody className="overflow-visible p-0">
        <Image
          src={course.hinhAnh}
          alt={course.tenKhoaHoc}
          width={400}
          height={250}
          className="rounded-lg object-cover"
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <div className="text-sm text-gray-600 space-y-2">
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
      <div className="p-4">
        <Button color="primary" fullWidth={true}>
          Join now
        </Button>
      </div>
    </Card>
  );
}
