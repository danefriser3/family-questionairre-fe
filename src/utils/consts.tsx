import { Male, Female, Transgender, Info, InfoRounded, InfoOutlined } from "@mui/icons-material";
import { Chip, Stack, Tooltip, Typography } from "@mui/material";
import { DeleteFamilyMemberCell } from "../components/table/deleteSingleMemberCell";
import { GridColumnHeaderParams } from "@mui/x-data-grid";

export const columns = (load: () => void) => [
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 175,
        valueGetter: (value: any, row: any) => {
            return `${new Date(row.createdAt).toLocaleString("en-EN")}`;
        },
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
    },
    {
        field: 'gender',
        headerName: 'Gender',
        renderCell: (params: any) => {
            switch (params.value) {
                case "male":
                    return <Male color="info" />;
                case "female":
                    return <Female color="error" />;
                case "diverse":
                    return <Transgender className="diverse" />;
            }
        },
        width: 75,
    },
    {
        field: 'favoriteAnimals',
        headerName: 'Animals',
        width: 200,
    },
    {
        field: "exported",
        renderHeader: (params: any) => (
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Typography>Exported</Typography>
                <Tooltip title={<Typography>Indicates if a row has been previously exported to csv in the same session</Typography>}>
                    <InfoOutlined fontSize="small" />
                </Tooltip>
            </Stack>
        ),
        width: 175,
        renderCell: (params: any) => {
            return <Chip color={params.value === true ? "success" : "error"} label={<Typography variant="caption">{params.value === true ? "Exported" : "Not Exported"}</Typography>} />
        }
    },
    {
        field: "action",
        headerName: "",
        renderCell: (params: any) => {
            return <DeleteFamilyMemberCell params={params} load={load} />
        },
        width: 20
    }
]

export const API_URL = "http://localhost:5000/api/children";
export const NO_DATA = "No data to show. Click on the + button to add a new family member.";