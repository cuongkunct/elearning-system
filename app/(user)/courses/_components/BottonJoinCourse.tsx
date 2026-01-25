"use client";
import { Button } from "@heroui/button";

type Props = {
  isJoined: boolean;
  loading?: boolean;
  onJoin: () => void;
};

export default function ButtonJoinCourse({ isJoined, loading, onJoin }: Props) {
  return (
    <Button
      className="m-4 w-full"
      color={isJoined ? "success" : "default"}
      isLoading={loading}
      onPress={onJoin}
    >
      {isJoined ? "Cancel the course" : "Join now"}
    </Button>
  );
}
