import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useTheme} from '@mui/material';
import { Member } from "../interfaces/member";

interface MemberCardProps {
  children?: React.ReactNode;
  member: Member;
}

export const MemberCard: React.FC<MemberCardProps> = (props: MemberCardProps) => {
    const { member } = props;
    const theme = useTheme();

    return (
        <Card sx={{textAlign: "left", margin: "12px 0", background: theme.palette.background.paper}}>
          <CardContent>
            <Typography variant="h4" component="div">
              {member.name}
            </Typography>
            <Typography variant="h5">
              Skills
            </Typography>
            <Typography mb={1} variant="body2">
                <b>Programming: </b>{member.skills.programming}<br/>
                <b>Writing: </b>{member.skills.writing}<br/>
                <b>Game design: </b>{member.skills.gameDesign}<br/>
                <b>Audio: </b>{member.skills.audio}<br/>
                <b>Project management: </b>{member.skills.projectManagement}<br/>
            </Typography>
            <Typography variant="h5">
              Interests
            </Typography>
            <Typography variant="body2">
                {`${member.interests}`}
            </Typography>
          </CardContent>
        </Card>
      );
}