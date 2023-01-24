import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { trpc } from "../../../core/utils/trpc";

type Props = {
  skillId: bigint;
  isOpen: boolean;
  onClose: () => void;
};

function DeleteSkillModal({ skillId, isOpen, onClose }: Props) {
  const utils = trpc.useContext();
  const { mutateAsync: deleteSkillAsync, isLoading } =
    trpc.admin.skillsAndExpertises.deleteSkill.useMutation({
      onSuccess: () => {
        utils.admin.skillsAndExpertises.invalidate();

        onClose();
      },
    });

  const handleDelete = async () => {
    await deleteSkillAsync({
      skillId,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Skill</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this skill?</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleDelete}
            isLoading={isLoading}
            loadingText="Deleting"
          >
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteSkillModal;
