import { useWeb3React } from "@web3-react/core";
import {useMemo} from "react";
import PlatziPunksArtifacts from "../../config/web3/artifacts/PlatziPunks";

const {address, abi} = PlatziPunksArtifacts;

const usePlatziPunks = () => {
    const {active, library, chainId} = useWeb3React();
    
    const platziPunks = useMemo(
        () => {
            if(active) return new library.eth.Contract(abi, address[chainId])
        },
        [library?.eth?.Contract, active, chainId]
    )
}