"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const UploadForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
