import { Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AppContainer } from "../../../components";

function JobDetail() {
  const router = useRouter();
  const { slug } = router.query;
  // job id is: sth-like-this-123 where 123 is the job id
  const jobId = new RegExp(/-(\d+)$/).exec(slug as string)?.[1];

  return (
    <AppContainer>
      <Heading>Job Detail</Heading>

      <Text>Job id: {jobId}</Text>
    </AppContainer>
  );
}

export default JobDetail;
