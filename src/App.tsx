import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { DataParser } from "./classes/dataParser";
import {
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import { Dataset } from "./interfaces/dataset";
import { FileDialog } from "./components/fileDialog";
import { TabPanel } from "./components/tabPanel";
import { GroupDataset } from "./components/groupDataset";
import { MemberCard } from "./components/memberCard";
import { UberGroupContainer } from "./components/uberGroupContainer";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const App: React.FC = () => {
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
  const [dataset, setDataset] = useState<Dataset>();
  const [value, setValue] = React.useState(0);
  const [oldValue, setOldValue] = React.useState(0);
  const dataParser = new DataParser();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (file && typeof file === "string") {
      setDataset(dataParser.parse(file as string));
    }
  }, [file]);

  useEffect(() => {
    if (dataset) {
      console.log(dataset);
    }
  }, [dataset]);

  useEffect(() => {
    if (value !== 3) {
      setOldValue(value);
    }
  }, [value]);

  return (
    <Container sx={{ textAlign: "center", paddingTop: "50px" }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="Tabs">
            <Tab label="Members" {...a11yProps(0)} />
            <Tab label="Groups" {...a11yProps(1)} />
            <Tab label="UberGroup" {...a11yProps(2)} />
            <Tab label="Select File" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {dataset ? <>
            {dataset.members.map((value, index) => {
              return <MemberCard member={value} key={index} />
            })}
          </> : <>Please select a valid file to view data.</>}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {dataset ? <GroupDataset groups={dataset?.groups} /> : <>Please select a valid file to view data.</>}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {dataset ? <>
          <UberGroupContainer dataParser={dataParser} dataset={dataset} />
          </> : <>Please select a valid file to view data.</>}
        </TabPanel>
        <FileDialog
          value={value}
          index={3}
          oldValue={oldValue}
          setValue={setValue}
          setFile={setFile}
        />
      </Box>
    </Container>
  );
};

export default App;
