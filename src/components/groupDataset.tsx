import { Accordion, AccordionSummary, Typography } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Group } from "../interfaces/group";
import { MemberCard } from "./memberCard";

interface GroupDatasetProps {
  children?: React.ReactNode;
  groups: Group[];
}

interface GroupAccordionProps {
  children?: React.ReactNode;
  group: Group;
  index: number;
}

const GroupAccordion: React.FC<GroupAccordionProps> = (props: GroupAccordionProps) => {
  const {group, index} = props;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`group${index}a-content`}
        id={`group${index}a-header`}
      >
        <Typography>
          <b>Members: </b> 
          {group.members.map((value, index) => {
            return `${value.name}${index < group.members.length - 1 ? ", " : ""}`
          })}
          <b> Group score: </b>
          {`${group.groupScore}`}
          <b> {`${group.valid ? "VALID" : "INVALID"}`}</b>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {group.members.map((value, index) => {
          return <MemberCard key={index} member={value} />;
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export const GroupDataset: React.FC<GroupDatasetProps> = (props: GroupDatasetProps) => {
  const {groups} = props;

  return (
    <>
      {groups.map((group, index) => {
        return <GroupAccordion group={group} key={index} index={index}/>
      })}
    </>
  );
};
