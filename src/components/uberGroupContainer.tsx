import React, {useState} from "react";
import { Box, Button } from "@mui/material";
import { Dataset } from "../interfaces/dataset";
import { DataParser } from "../classes/dataParser";
import { Group } from "../interfaces/group";
import { GroupDataset } from "./groupDataset";

interface UberGroupContainerProps {
    children?: React.ReactNode;
    dataset: Dataset;
    dataParser: DataParser;
}

export const UberGroupContainer: React.FC<UberGroupContainerProps> = (props: UberGroupContainerProps) => {
    const {dataset, dataParser} = props;
    const [uberGroup, setUberGroup] = useState<Group>();

    const calcUberGroup = () => {
        setUberGroup(dataParser.findBestGroup(dataset.members));
    }

    return (
        <Box>
            <Button onClick={() => calcUberGroup()}>Calculate Uber Group</Button>
            {uberGroup && <GroupDataset groups={[uberGroup]} />}
        </Box>
    )
}