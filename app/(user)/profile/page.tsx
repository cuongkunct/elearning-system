"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Card } from "@heroui/react";
import { addToast } from "@heroui/react";

import Profile from "./_components/Profile";
import MyCoursePage from "./_components/MyCourses";
import SkeletonItem from "@/components/user/shared/SkeletonCardItem";

import { useSelector, useDispatch } from "react-redux";
import { RootState, DispatchType } from "@/store";

import {
  getUserProfile,
  updateUserProfile,
} from "@/store/user/profile/profile.slice";

export default function ProfilePage() {
  const dispatch = useDispatch<DispatchType>();
  const userSession = useSelector((state: RootState) => state.auth.userData);
  const profileState = useSelector((state: RootState) => state.userProfile.profile);
  const updateState = useSelector((state: RootState) => state.userProfile.update);

  const [prfSwitch, setPrfSwitch] = useState<"profile" | "courses">("profile");

  useEffect(() => {
    if (!userSession?.accessToken) return;
    dispatch(getUserProfile({ token: userSession.accessToken }))
      .unwrap()
      .catch((err: any) => {
        addToast({
          title: "Error fetching user profile",
          description: err?.message || err,
          color: "danger",
        });
      });
  }, [dispatch, userSession?.accessToken]);

  const handleUpdateProfile = async (data?: any) => {
    console.log("fetchToken ", userSession?.accessToken);
    if (!userSession?.accessToken) return;

    try {
      if (data) {

        await dispatch(
          updateUserProfile({ data, token: userSession?.accessToken })
        ).unwrap();

        addToast({
          title: "Profile updated",
          description: "User profile updated successfully",
          color: "success",
        });
      }

      await dispatch(getUserProfile({ token: userSession.accessToken })).unwrap();
    } catch (err: any) {
      addToast({
        title: "Error updating profile",
        description: err?.message || err,
        color: "danger",
      });
    }
  };


  const loading = profileState.loading || updateState.loading;

  if (!profileState.data || loading) {
    return (
      <div>
        <SkeletonItem />
      </div>
    );
  }

  const userInfo = profileState.data;

  return (
    <div className="flex flex-col md:flex-row lg:flex-row">
      <div className="flex flex-1/5 flex-col">
        <Card className="md:col-span-1 min-h-full p-6 rounded-2xl shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24" name={userInfo.hoTen} />
            <div className="text-center">
              <p className="font-semibold">{userInfo.hoTen}</p>
              <p className="text-sm text-gray-500">{userInfo.email}</p>
            </div>
            <div className="w-full text-sm text-gray-600 space-y-2">
              <p>
                <span className="font-medium">Username:</span> {userInfo.taiKhoan}
              </p>
              <p>
                <span className="font-medium">Group:</span> {userInfo.maNhom}
              </p>
              <p>
                <span className="font-medium">Role:</span> {userInfo.maLoaiNguoiDung}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-4/5 mt-2">
        <div className="pl-4 w-full flex flex-col justify-center items-center md:items-start lg:items-start">
          <div className="flex mb-4">
            <Button
              color={prfSwitch === "profile" ? "secondary" : "primary"}
              radius="none"
              variant={prfSwitch === "profile" ? "solid" : "bordered"}
              onPress={() => setPrfSwitch("profile")}
            >
              My Profile
            </Button>
            <Button
              color={prfSwitch === "profile" ? "primary" : "secondary"}
              radius="none"
              variant={prfSwitch === "profile" ? "bordered" : "solid"}
              onPress={() => setPrfSwitch("courses")}
            >
              My Courses
            </Button>
          </div>

          {prfSwitch === "profile" ? (
            <Profile userSession={userSession?.accessToken} onUpdate={handleUpdateProfile} />
          ) : (
            <MyCoursePage userData={userInfo} onCancel={handleUpdateProfile} />
          )}
        </div>
      </div>
    </div>
  );
}