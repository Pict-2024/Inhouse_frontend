/* eslint-disable react/jsx-key */
import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Header from "../../components/AModule/Header";
// import axios from 'axios';
// import { getAllTeachers } from "../../components/AModule/APIRoutes";

import {
  GridRowModes,
  DataGrid,
  // GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import {
  // randomCreatedDate,
  // randomTraderName,
  // randomId,
  // randomArrayItem,
} from "@mui/x-data-grid-generator";
import { useEffect } from "react";
import axios from "axios";
// import { useSelector } from "react-redux";
import { useState } from "react";

// const roles = ["Market", "Finance", "Development"];
// const randomRole = () => {
//   return randomArrayItem(roles);
// };

// let initialRows;

function EditToolbar() {
  // const { setRows, setRowModesModel } = props;

  // const handleClick = () => {
  //   const id = randomId();
  //   setRows((oldRows) => [...oldRows, { id, Name: "", Email: "", isNew: true }]);
  //   setRowModesModel((oldModel) => ({
  //     ...oldModel,
  //     [id]: { mode: GridRowModes.Edit, fieldToFocus: "Email" },
  //   }));
  // };

  return (
    <>
    {/** 
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
      */}
    </>
  );
}

export default function Teachers() {

  
  // const { currentUser } = useSelector((state) => state.user);

  let columns = [
    { field: "Name", headerName: "Name", width: 300, editable: true },
    {
      field: "Email",
      headerName: "Email",
      width: 300,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "SpecialAccess",
      headerName: "SpecialAccess",
      width: 220,
      align: "left",
      editable: true,
      type: "singleSelect",
      valueOptions: ["NAAC", "PDA", "Development", "Sports"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const addIdToTeachers = (dataArray) => {
    return dataArray.map((obj) => {
      return { ...obj, id: obj.Email };
    });
  };

  const getAllTeachers = async () => {

    try {
      const apiurl = "http://localhost:5000/api/v1/auth/getAllTeacher";
      // console.log("apiRoute in getAllRecords:", apiurl);
      const response = await axios.get(apiurl, {
        headers: {
          "Content-Type": "application/json", // Make sure this header is defined
        },
      });
      // console.log("Rows : ", response.data.data);
      const columnHeaders = Object.keys(response.data.data[0]);

      console.log("Response is : ", response);
      console.log("column headers are : ", columnHeaders);

      columns = columnHeaders;
      console.log("Columns are : ", columns);

      const newRows = addIdToTeachers(response.data.data);
      setRows(newRows);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (Email) => () => {
    setRowModesModel({ ...rowModesModel, [Email]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (Email) => () => {
    setRowModesModel({ ...rowModesModel, [Email]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (Email) => () => {
    setRows(rows.filter((row) => row.Email !== Email));
  };

  const handleCancelClick = (Email) => () => {
    setRowModesModel({
      ...rowModesModel,
      [Email]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.Email === Email);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.Email !== Email));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.Email === newRow.Email ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <div>
        <Header category="Page" title="Teacher" />
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
