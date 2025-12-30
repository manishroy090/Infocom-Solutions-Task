"use client";
import { DataGrid , GridActionsCellItem} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

  const actionColumn = {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 120,
    getActions: (params) => [
      <GridActionsCellItem
        key="edit"
        icon={<EditIcon />}
        label="Edit"
        onClick={() => onEdit(params.row)}
      />,
      <GridActionsCellItem
        key="delete"
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => onDelete(params.row.id)}
        showInMenu
      />
    ],
  };


const paginationModel = { page: 0, pageSize: 5 };

export default function Table({colmns,data}) {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={[...colmns,actionColumn]}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}