import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import type { JobCreateSchema } from "../../../../server/trpc/validation/job";
import { jobCreateSchema } from "../../../../server/trpc/validation/job";
import { AppContainer } from "../../../components";
import { Select } from "chakra-react-select";
import { trpc } from "../../../core/utils/trpc";

function JobCreate() {
  const toast = useToast();
  const { mutateAsync: createJobAsync } = trpc.job.createJob.useMutation();
  const formik = useFormik<JobCreateSchema>({
    initialValues: {
      title: "",
      content: "",
      fixedBudget: 0,
      levelRequired: "ENTRY",
      long: "ONE_TO_THREE_MONTHS",
      payType: "HOURLY",
      perHourBudget: 0,
      projectType: "MAINTAINANCE",
      scope: "SMALL",
      skillsAndExperties: [],
    },
    onSubmit: async (values) => {
      return toast.promise(
        createJobAsync(values),

        {
          loading: {
            title: "Creating Job",
            description: "Please wait...",
          },
          success: (data) => ({
            title: "Job Created",
            description: JSON.stringify(data),
          }),
          error: (e) => ({
            title: "Error",
            description: e?.message,
          }),
        }
      );
    },
    validationSchema: toFormikValidationSchema(jobCreateSchema),
  });

  return (
    <AppContainer>
      <Card variant="outline">
        <CardHeader>
          <Heading size="md">Create Job</Heading>
        </CardHeader>
        <Divider />
        <CardBody>
          <SimpleGrid columns={2} gap={4}>
            <FormControl
              isInvalid={!!formik.touched.title && !!formik.errors.title}
            >
              <FormLabel>Title</FormLabel>
              <Input {...formik.getFieldProps("title")} />
              <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formik.touched.content && !!formik.errors.content}
            >
              <FormLabel>Content</FormLabel>
              <Input {...formik.getFieldProps("content")} />
              <FormErrorMessage>{formik.errors.content}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!formik.touched.fixedBudget && !!formik.errors.fixedBudget
              }
            >
              <FormLabel>Fixed Budget</FormLabel>
              <Input {...formik.getFieldProps("fixedBudget")} />
              <FormErrorMessage>{formik.errors.fixedBudget}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!formik.touched.perHourBudget && !!formik.errors.perHourBudget
              }
            >
              <FormLabel>Per Hour Budget</FormLabel>
              <Input {...formik.getFieldProps("perHourBudget")} />
              <FormErrorMessage>{formik.errors.perHourBudget}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!formik.touched.levelRequired && !!formik.errors.levelRequired
              }
            >
              <FormLabel>Level Required</FormLabel>
              <Select
                {...formik.getFieldProps("levelRequired")}
                onChange={(e) => {
                  formik.setFieldValue("levelRequired", e?.value as string);
                }}
                value={undefined}
                isMulti={false}
                options={[
                  { value: "ENTRY", label: "Entry" },
                  { value: "INTERMEDIATE", label: "Intermediate" },
                  { value: "EXPERT", label: "Expert" },
                ]}
              />
              <FormErrorMessage>{formik.errors.levelRequired}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formik.touched.long && !!formik.errors.long}
            >
              <FormLabel>Long</FormLabel>
              <Select
                {...formik.getFieldProps("long")}
                onChange={(e) => {
                  formik.setFieldValue("long", e?.value as string);
                }}
                value={undefined}
                isMulti={false}
                options={[
                  {
                    value: "ONE_TO_THREE_MONTHS",
                    label: "One to Three Months",
                  },
                  {
                    value: "THREE_TO_SIX_MONTHS",
                    label: "Three to Six Months",
                  },
                  {
                    value: "MORE_THAN_SIX_MONTHS",
                    label: "More than Six Months",
                  },
                ]}
              />

              <FormErrorMessage>{formik.errors.long}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formik.touched.payType && !!formik.errors.payType}
            >
              <FormLabel>Pay Type</FormLabel>
              <Select
                {...formik.getFieldProps("payType")}
                onChange={(e) => {
                  formik.setFieldValue("payType", e?.value as string);
                }}
                value={undefined}
                isMulti={false}
                options={[
                  { value: "HOURLY", label: "Hourly" },
                  { value: "FIXED", label: "Fixed" },
                ]}
              />

              <FormErrorMessage>{formik.errors.payType}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!formik.touched.projectType && !!formik.errors.projectType
              }
            >
              <FormLabel>Project Type</FormLabel>
              <Select
                {...formik.getFieldProps("projectType")}
                onChange={(e) => {
                  formik.setFieldValue("projectType", e?.value as string);
                }}
                value={undefined}
                isMulti={false}
                options={[
                  { value: "NEW", label: "New" },
                  { value: "ON_GOING", label: "On Going" },
                  { value: "MAINTAINANCE", label: "Maintainance" },
                ]}
              />
              <FormErrorMessage>{formik.errors.projectType}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formik.touched.scope && !!formik.errors.scope}
            >
              <FormLabel>Scope</FormLabel>
              {/* SMALL' | 'MEDIUM' | 'LARGE */}
              <Select
                {...formik.getFieldProps("scope")}
                onChange={(e) => {
                  formik.setFieldValue("scope", e?.value as string);
                }}
                value={undefined}
                isMulti={false}
                options={[
                  { value: "SMALL", label: "Small" },
                  { value: "MEDIUM", label: "Medium" },
                  { value: "LARGE", label: "Large" },
                ]}
              />
              <FormErrorMessage>{formik.errors.scope}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={formik.isSubmitting}
            type="submit"
            onClick={formik.submitForm}
          >
            Submit
          </Button>
        </CardBody>
      </Card>
    </AppContainer>
  );
}

export default JobCreate;
