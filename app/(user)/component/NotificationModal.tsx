import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useDraggable,
} from "@heroui/react";

export default function NotificationModal({
  title,
  color,
  description,
  isOpen,
  onClose,
}: {
  title: string;
  color: "danger" | "success" | "warning";
  description: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    isDisabled: !isOpen,
  });

  return (
    <Modal
      ref={targetRef}
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <ModalContent>
        {(closeModal) => (
          <>
            <ModalHeader
              {...moveProps}
              className="flex flex-col gap-1 cursor-move"
            >
              {title}
            </ModalHeader>

            <ModalBody>
              <p>{description}</p>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  closeModal();
                  onClose();
                }}
              >
                Close
              </Button>

              <Button
                color={color}
                onPress={() => {
                  closeModal();
                  onClose();
                }}
              >
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
