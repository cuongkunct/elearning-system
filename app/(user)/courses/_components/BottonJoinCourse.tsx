"use client";
import { Button } from "@heroui/button";

type Props = {
  isJoined: boolean;
  loading?: boolean;
  onJoin: () => void;
};

export default function ButtonJoinCourse({
  isJoined,
  loading,
  onJoin,
}: Props) {
  return (
    <Button
      color={isJoined ? "danger" : "primary"}
      isLoading={loading}
      onPress={onJoin}
      className="m-4"
    >
      {isJoined ? "Cancel the course" : "Join now"}
    </Button>
  );
}
