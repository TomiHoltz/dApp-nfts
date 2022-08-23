import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import usePlatziPunks from "../../hooks/usePlatziPunks";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
  const [isMinting, setIsMinting] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const { active, account } = useWeb3React();
  const platziPunks = usePlatziPunks();
  const toast = useToast();

  const getPlatziPunksData = useCallback(async () => {
    if (platziPunks) {
      const totalSupply = await platziPunks.methods.totalSupply().call();
      const dnaPreview = await platziPunks.methods
        .deterministicPseudoRandomDNA(totalSupply, account)
        .call();
      const image = await platziPunks.methods.imageByDNA(dnaPreview).call();
      setImageSrc(image);
    }
  }, [platziPunks, account]);

  useEffect(() => {
    getPlatziPunksData();
  }, [getPlatziPunksData]);

  const mint = () => {
    setIsMinting(true);

    platziPunks.methods.mint().send({
      from: account,
    })
      .on('transactionHash', (txHash) => {
        setIsMinting(false);
        toast({
          title: "Transaccion enviada",
          description: txHash,
          status: "info",
        })
      })
      .on('receipte', () => {
        setIsMinting(false);
        toast({
          title: "Transaccion confirmada",
          description: "Nunca pares de aprender",
          status: "success",
        })
      })
      .on('error', (error) => {
        setIsMinting(false);
        toast({
          title: "Transaccion fallida",
          description: error.message,
          status:'error'
        })
      });

  }

  return (
    <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "orange.400",
              zIndex: -1,
            }}
          >
            Hoopers w Flow
          </Text>
          <br />
          <Text as={"span"} color={"orange.400"}>
            nunca para de aprender
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Hoopers w Flow es una colección de Avatares randomizados creados en colaboracion entre HoopShoes y FlowGameBasketball.
          Poseen características únicas y sólo hay 10000
          en existencia.
        </Text>
        <Text color={"orange.500"}>
          Cada Hooper te da acceso a la comunidad de jugadores de basquet mas grande de habla hispana.
          Asi como acceso a todo el contenido digital de la academia FlowGame Basketaball
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
            disabled={!platziPunks}
            isLoading={isMinting}
            onClick={mint}
          >
            Obtén tu Hooper
          </Button>
          <Link to="/punks">
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Galería
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Image src={active ? imageSrc : "https://avataaars.io/"} />
        {active ? (
          <>
            <Flex mt={2}>
              <Badge>
                Next ID:
                <Badge ml={1} colorScheme="orange">
                  1
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address:
                <Badge ml={1} colorScheme="orange">
                  0x0000...0000
                </Badge>
              </Badge>
            </Flex>
            <Button
              onClick={getPlatziPunksData}
              mt={4}
              size="xs"
              colorScheme="orange"
            >
              Actualizar
            </Button>
          </>
        ) : (
          <Badge mt={2}>Wallet desconectado</Badge>
        )}
      </Flex>
    </Stack>
  );
};

export default Home;