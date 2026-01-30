"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  loading?: boolean;
  error?: string | null;
  onConfirm: () => Promise<void> | void;
};

export default function DeleteUserModal({
  isOpen,
  onOpenChange,
  title = "Delete user",
  description = "Bạn chắc chắn muốn xoá user này? Hành động này không thể hoàn tác.",
  loading = false,
  error = null,
  onConfirm,
}: Props) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="lg" size="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>

            <ModalBody>
              <p className="text-sm text-default-600">{description}</p>
              {error ? (
                <p className="mt-2 text-sm text-danger-500">{error}</p>
              ) : null}
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose} isDisabled={loading}>
                Cancel
              </Button>
              <Button color="danger" isLoading={loading} onPress={onConfirm}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
