import {
  Button,
  Card,
  CardHeader,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  LinkBox,
  LinkOverlay,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { memo } from "react";
import { trpc } from "../../../core/utils/trpc";
import CreateSubSkillForm from "./CreateSubSkillForm";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  skillId?: bigint;
}

function SubSkillDrawer({ isOpen, onClose, skillId }: Props) {
  if (!skillId) return null;

  const utils = trpc.useContext();
  const { data } = trpc.admin.skillsAndExpertises.getSubSkills.useQuery({
    skillId,
  });
  const { data: skill } = trpc.admin.skillsAndExpertises.getSkillById.useQuery({
    skillId,
  });
  const {
    mutateAsync: deleteSubSkillAsync,
    isLoading,
    variables,
  } = trpc.admin.skillsAndExpertises.deleteSubSkill.useMutation({
    onSuccess: () => {
      utils.admin.skillsAndExpertises.invalidate();
    },
  });

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{skill?.skill}</DrawerHeader>
        <DrawerBody>
          <Stack spacing={3}>
            {!!skillId && <CreateSubSkillForm skillId={skillId} />}

            <Card variant="outline">
              <CardHeader>
                <Heading size="sm">Sub Skills</Heading>
              </CardHeader>
              <Stack spacing={0}>
                {data?.map((subSkill, index) => (
                  <LinkBox
                    key={subSkill.id.toString()}
                    justifyContent="space-between"
                    display="flex"
                    p={3}
                    bg={index % 2 === 0 ? "gray.100" : "white"}
                  >
                    <LinkOverlay
                      href={`/admin/skills-and-expertises/${subSkill.id}`}
                    >
                      {subSkill.name}
                    </LinkOverlay>

                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() =>
                        deleteSubSkillAsync({
                          subSkillId: subSkill.id,
                        })
                      }
                      isLoading={
                        isLoading && subSkill.id === variables?.subSkillId
                      }
                      loadingText="Deleting..."
                    >
                      Delete
                    </Button>
                  </LinkBox>
                )) || (
                  <Center>
                    <Spinner />
                  </Center>
                )}
              </Stack>
            </Card>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default memo(SubSkillDrawer);
