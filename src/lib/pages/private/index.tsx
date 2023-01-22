import { Flex, Img, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { AppContainer } from "../../components";
import { trpc } from "../../core/utils/trpc";

function PrivatePage() {
  const offsetRef = useRef<HTMLInputElement>(null);
  const { data } = trpc.tool.getGaito.useQuery(
    {
      offset: parseInt(offsetRef.current?.value || "0"),
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <AppContainer>
      <Input ref={offsetRef} />

      {data?.map((item) => (
        <Flex key={item.id} gap={2}>
          <Img
            src={item.cover.dimensions.original.url}
            width={20}
            height={20}
            objectFit="cover"
          />

          {item.name}
        </Flex>
      ))}
    </AppContainer>
  );
}

export default PrivatePage;
