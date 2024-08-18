import { DataGrid } from "@mui/x-data-grid";
import Questionnaire from "../dialog/questionairre";
import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { DeleteSweep, Sync } from "@mui/icons-material";
import { API_URL, columns, NO_DATA } from "../../utils/consts";
import { Dataset } from "../../utils/types";
import { DeletionConfirmDialog } from "../dialog/deletionConfirm";
import { useState } from "react";

export const Table = ({ dataset = null, load, exported }: Dataset) => {


    const [open, setOpen] = useState(false);

    const handleDeleteAll = () => {
        axios.delete(API_URL + '/deleteAll').then(() => load()).then(() => {
            sessionStorage.setItem("exported", JSON.stringify([]));
            window.location.reload();
        });
    }

    const handleSync = () => {
        load();
    }

    const handleExport = (type: string) => {
        axios.post(API_URL + '/export', { exportType: type })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'children_data.csv');
                document.body.appendChild(link);
                link.click();
                sessionStorage.setItem("exported", JSON.stringify(dataset));
                window.location.reload();
            })
            .catch(e => console.log(e.message));
    };

    return <Card className={"card-table"}>
        <CardHeader
            title="Family Members"
            action={
                <Stack direction={"row"} gap={1}>
                    <DeletionConfirmDialog open={open} handleClose={() => setOpen(false)} handleDeleteAll={handleDeleteAll}>
                        <Tooltip title={<Typography>Delete all the entries</Typography>}>
                            <IconButton disabled={dataset?.length === 0} size="small" onClick={() => setOpen(true)} color="warning">
                                <DeleteSweep fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </DeletionConfirmDialog>
                    <Questionnaire load={load} />
                    <Tooltip title={<Typography>Reload dataset</Typography>}>
                        <IconButton size="small" onClick={handleSync} color="info"><Sync fontSize="small" /></IconButton>
                    </Tooltip>
                </Stack>
            }
        />
        <Divider />
        <CardContent sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            {(dataset !== null ? <DataGrid
                getCellClassName={
                    () => "cell-middle-vertical"
                }
                sx={{ boxShadow: "-2px 2px 5px rgba(0,0,0,0.4)", minHeight: "200px" }}
                rows={dataset}
                rowSelection={false}
                rowCount={dataset.length}
                columns={columns(load)}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                localeText={{ noRowsLabel: NO_DATA }}
                pageSizeOptions={[5, 10, 20]} />
                : <CircularProgress />)}
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "end" }}>
            <Button disabled={dataset?.length === 0} color='error' variant='contained' size='small' onClick={() => handleExport('all')}>Export All to CSV</Button>
            <Button disabled={dataset?.length === 0 || exported.length === dataset?.length} color='info' variant='contained' size='small' onClick={() => handleExport('changed')}>Export Changed to CSV</Button>
        </CardActions>
    </Card >
}