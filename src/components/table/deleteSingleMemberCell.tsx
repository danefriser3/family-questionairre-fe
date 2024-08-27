import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { DeletionConfirmDialog } from "../dialog/deletionConfirm";
import { DialogProps, Family } from "../../utils/types";

export const DeleteFamilyMemberCell = ({ params, load }: DialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <DeletionConfirmDialog
      open={open}
      handleClose={() => setOpen(false)}
      handleDeleteAll={() => {
        axios
          .delete("http://localhost:5000/api/children/deleteById/" + params.id)
          .then(() => {
            const expt = JSON.parse(
              sessionStorage.getItem("exported")!
            ) as Family[];
            if (sessionStorage.getItem("exported"))
              sessionStorage.setItem(
                "exported",
                JSON.stringify(expt?.filter((e: Family) => e.id !== params.id))
              );
          })
          .then(() => load());
      }}
    >
      <IconButton color="error" size="small" onClick={() => setOpen(true)}>
        <Delete fontSize="small" />
      </IconButton>
    </DeletionConfirmDialog>
  );
};
