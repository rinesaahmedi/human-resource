import { Button, Modal } from "@mantine/core";

const CustomModal = (props) => {
  return (
    <Modal
      opened={props.isOpen}
      onClose={props.onClose}
      title={props.title}
      centered
    >
      {props.children}
      {props.showActionButtons && (
        <div className="flex justify-end gap-4 mt-8">
          <Button onClick={props.onCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={props.onSubmit}>Submit</Button>
        </div>
      )}
    </Modal>
  );
};

export default CustomModal;
