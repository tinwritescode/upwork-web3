import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Spacer,
  Spinner,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import type { SkillsAndExperties } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { Paginate } from "react-paginate-chakra-ui";
import { AppContainer } from "../../../components";
import { AppTable } from "../../../components/AppTable";
import type { RouterInputs } from "../../../core/utils/trpc";
import { trpc } from "../../../core/utils/trpc";
import DeleteSkillModal from "./DeleteSkillModal";
import SubSkillDrawer from "./SubSkillDrawer";

const LIMIT = 10;

type DrawerState = {
  subSkillId?: bigint;
  isOpen: boolean;
};

type DrawerAction =
  | {
      type: "VIEW_SUBSKILLS";
      payload: bigint;
    }
  | {
      type: "CLOSE";
    };

function SkillsAndExpertises() {
  const utils = trpc.useContext();
  const { mutateAsync: createSkillAndExpertiseAsync } =
    trpc.admin.skillsAndExpertises.create.useMutation({
      onSuccess: () => {
        utils.admin.skillsAndExpertises.invalidate();
      },
    });
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useReducer(
    (state: number, action: number) => {
      if (!action) return 0;
      if (action > 0) {
        return action;
      }
      return state;
    },
    LIMIT
  );
  const { data, isLoading } = trpc.admin.skillsAndExpertises.getAll.useQuery({
    limit,
    offset: (page - 1) * limit,
  });
  const router = useRouter();
  const formik = useFormik<
    RouterInputs["admin"]["skillsAndExpertises"]["create"]
  >({
    initialValues: {
      skill: "",
    },
    onSubmit: async (values) => {
      await createSkillAndExpertiseAsync(values);
      formik.resetForm();
    },
  });
  const [drawerState, dispatchDrawer] = useReducer<
    React.Reducer<DrawerState, DrawerAction>
  >(
    (state, action) => {
      switch (action.type) {
        case "VIEW_SUBSKILLS": {
          return {
            ...state,
            isOpen: true,
            subSkillId: action.payload,
          };
        }
        case "CLOSE": {
          return {
            ...state,
            isOpen: false,
            subSkillId: undefined,
          };
        }
      }
    },
    { isOpen: false }
  );
  const [deleteSkillState, deleteSkillDispatch] = useReducer<
    React.Reducer<
      { id: bigint | null; isOpen: boolean },
      { type: "OPEN"; id: bigint } | { type: "CLOSE" }
    >
  >(
    (state, action) => {
      switch (action.type) {
        case "OPEN": {
          return {
            ...state,
            id: action.id,
            isOpen: true,
          };
        }
        case "CLOSE": {
          return {
            ...state,
            id: null,
            isOpen: false,
          };
        }
      }
    },
    { id: null, isOpen: false }
  );

  useEffect(() => {
    if (Number(router.query.page) > 0) {
      setPage(Number(router.query.page));
    }
  }, [router.query.page]);

  const columnHelper = createColumnHelper<SkillsAndExperties>();
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (row) => row.getValue().toString(),
    }),
    columnHelper.accessor("skill", {
      header: "Skill",
      cell: ({ row, getValue }) => (
        <Flex
          alignItems="center"
          gap={2}
          onClick={() => {
            dispatchDrawer({
              type: "VIEW_SUBSKILLS",
              payload: row.original.id,
            });
          }}
        >
          <Tooltip label="Click to view subskills">
            <Box>{getValue()}</Box>
          </Tooltip>

          <Tooltip label="Delete skill">
            <IconButton
              aria-label="Delete skill"
              icon={<DeleteIcon />}
              onClick={(e) => {
                e.stopPropagation();
                deleteSkillDispatch({
                  type: "OPEN",
                  id: row.original.id,
                });
              }}
            />
          </Tooltip>
        </Flex>
      ),
    }),
  ];

  return (
    <AppContainer>
      <>
        <Card variant="outline">
          <CardBody>
            <Stack>
              <FormControl
                isRequired
                isInvalid={!!formik.touched.skill && !!formik.errors.skill}
              >
                <FormLabel>Skill</FormLabel>
                <Input {...formik.getFieldProps("skill")} />
                <FormErrorMessage>{formik.errors.skill}</FormErrorMessage>
              </FormControl>

              <Center>
                <Button onClick={() => formik.handleSubmit()}>Submit</Button>
              </Center>
            </Stack>
          </CardBody>
        </Card>
        <Card variant="outline">
          <CardBody>
            <Stack spacing={3}>
              {!data ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <Stack spacing={3}>
                  <AppTable data={data.data} columns={columns} />
                </Stack>
              )}

              <HStack justifyContent="space-between" flexWrap="wrap">
                {!isLoading && data?.data?.length ? (
                  <Paginate
                    page={page - 1}
                    count={data?.total}
                    pageSize={limit}
                    onPageChange={(page: any) => {
                      router.push(
                        {
                          pathname: "/admin/skills-and-expertises",
                          query: {
                            page: page + 1,
                          },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }}
                  />
                ) : (
                  <Spacer flexGrow={1} />
                )}

                <InputGroup w="fit-content">
                  <InputLeftAddon>Limit</InputLeftAddon>
                  <Input
                    placeholder="Limit"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    w="20"
                  />
                </InputGroup>
              </HStack>
            </Stack>
          </CardBody>
        </Card>

        <SubSkillDrawer
          isOpen={drawerState.isOpen}
          skillId={drawerState.subSkillId}
          onClose={() => dispatchDrawer({ type: "CLOSE" })}
        />

        {deleteSkillState.id && (
          <DeleteSkillModal
            isOpen={deleteSkillState.isOpen}
            onClose={() => deleteSkillDispatch({ type: "CLOSE" })}
            skillId={deleteSkillState.id}
          />
        )}
      </>
    </AppContainer>
  );
}

export default SkillsAndExpertises;
