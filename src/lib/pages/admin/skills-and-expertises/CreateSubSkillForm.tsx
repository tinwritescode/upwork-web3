import {
  Card,
  CardBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Center,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createSubSkillSchema } from "../../../../server/trpc/router/admin/validation/skillsAndExpertises";
import type { RouterInputs } from "../../../core/utils/trpc";
import { trpc } from "../../../core/utils/trpc";

type Props = {
  skillId: bigint;
};

function CreateSubSkillForm({ skillId }: Props) {
  const utils = trpc.useContext();
  const { mutateAsync: createSubSkillAsync, isLoading } =
    trpc.admin.skillsAndExpertises.createSubSkill.useMutation({
      onSuccess: () => {
        utils.admin.skillsAndExpertises.invalidate();
      },
    });
  const formik = useFormik<
    RouterInputs["admin"]["skillsAndExpertises"]["createSubSkill"]
  >({
    initialValues: {
      name: "",
      skillId: skillId,
    },
    onSubmit: async (values) => {
      await createSubSkillAsync(values);
      formik.resetForm();
    },
    validationSchema: toFormikValidationSchema(createSubSkillSchema),
  });

  useEffect(() => {
    formik.setFieldValue("skillId", skillId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillId]);

  return (
    <Card variant="outline">
      <CardBody>
        <Stack>
          <FormControl
            isRequired
            isInvalid={!!formik.touched.name && !!formik.errors.name}
          >
            <FormLabel>Name</FormLabel>
            <Input {...formik.getFieldProps("name")} />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <Center>
            <Button
              onClick={() => formik.handleSubmit()}
              isLoading={isLoading}
              loadingText="Creating"
            >
              Create
            </Button>
          </Center>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default CreateSubSkillForm;
