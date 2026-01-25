"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Card } from "@heroui/react";
import { addToast } from "@heroui/react";

import Profile from "./_components/Profile";
import MyCoursePage from "./_components/MyCourses";

import { fetchUserProfile } from "@/services/user/userAccount/user.service";
import { UserProfileResponse } from "@/types/user/userProfile/userProfile.type";
import SkeletonItem from "@/components/user/shared/SkeletonCardItem";
export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<UserProfileResponse>();
  const [prfSwich, setPrfSwitch] = useState("profile");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const getUserProfile = async () => {
        const response = await fetchUserProfile();

        if (response) {
          setUserInfo(response);
        }
      };

      getUserProfile();
    } catch (err: any) {
      addToast({
        title: "Error fetching user profile",
        description: err,
        color: "danger",
      });
    }
  }, []);

  const handleUpdateProfile = () => {
    try {
      setLoading(true);
      const getUserProfile = async () => {
        const response = await fetchUserProfile();

        if (response) {
          setUserInfo(response);
          setLoading(false);
        }
      };

      getUserProfile();
    } catch (err: any) {
      setLoading(false);
      addToast({
        title: "Error fetching user profile",
        description: err,
        color: "danger",
      });
    }
  };

  if (!userInfo || loading) {
    return (
      <div>
        <SkeletonItem />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row lg:flex-row ">
      <div className="flex flex-1/5 flex-col">
        <Card className="md:col-span-1 min-h-full p-6 rounded-2xl shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24" name={userInfo?.hoTen} />
            <div className="text-center">
              <p className="font-semibold">{userInfo?.hoTen}</p>
              <p className="text-sm text-gray-500">{userInfo?.email}</p>
            </div>
            <div className="w-full text-sm text-gray-600 space-y-2">
              <p>
                <span className="font-medium">Username:</span>{" "}
                {userInfo?.taiKhoan}
              </p>
              <p>
                <span className="font-medium">Group:</span> {userInfo?.maNhom}
              </p>
              <p>
                <span className="font-medium">Role:</span>{" "}
                {userInfo?.maLoaiNguoiDung}
              </p>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex flex-4/5 mt-2 ">
        <div className="pl-4 w-full flex flex-col justify-center items-center md:items-start lg:items-start">
          <div>
            <Button
              color={`${prfSwich === "profile" ? "secondary" : "primary"}`}
              radius="none"
              variant={`${prfSwich === "profile" ? "solid" : "bordered"}`}
              onPress={() => setPrfSwitch("profile")}
            >
              My Profile
            </Button>
            <Button
              color={`${prfSwich === "profile" ? "primary" : "secondary"}`}
              radius="none"
              variant={`${prfSwich === "profile" ? "bordered" : "solid"}`}
              onPress={() => setPrfSwitch("courses")}
            >
              My Courses
            </Button>
          </div>

          {prfSwich === "profile" ? (
            <Profile userData={userInfo} onUpdate={handleUpdateProfile} />
          ) : (
            <MyCoursePage userData={userInfo} onCancel={handleUpdateProfile} />
          )}
        </div>
      </div>
    </div>
  );
}
