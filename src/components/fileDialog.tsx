import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, useMediaQuery, useTheme } from "@mui/material";

interface FileDialogProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    oldValue: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    setFile: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  }

export const FileDialog:React.FC<FileDialogProps> = (props: FileDialogProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClose = () => {
      props.setValue(props.oldValue);
    };
  
    const openFile = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const input = event.target as HTMLInputElement;
  
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        props.setFile(text);
        handleClose();
      }
  
      if(input.files?.length) {
        const selectedFile = input.files.item(0)
        if(selectedFile) {
          reader.readAsText(selectedFile);
        }
      }
    }
  
    return (
      <Dialog
          fullScreen={fullScreen}
          open={props.index === props.value}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Select file"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select file to parse your members and groups.
            </DialogContentText>
            
      <Input type='file' onChange={event => openFile(event)}></Input>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    );
  }