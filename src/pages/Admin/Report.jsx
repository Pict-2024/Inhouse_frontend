import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Header from '../../components/AModule/Header';
import {
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton
} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Report = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRoleButtonClick = (role) => {
    setSelectedRole(role);
    setSelectedOptions([]); // Reset selected options when role changes
    setPage(0); // Reset page when role changes
  };

  const handleSelectChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Dummy data for the table
  const teacherData = [
    { id: 1, name: 'John', age: 35, subject: 'Math' },
    { id: 2, name: 'Jane', age: 28, subject: 'English' },
    // Add more dummy data as needed
  ];

  const studentData = [
    { id: 1, name: 'Alice', age: 20, grade: 'A' },
    { id: 2, name: 'Bob', age: 22, grade: 'B' },
    // Add more dummy data as needed
  ];

  const currentData = selectedRole === 'teacher' ? teacherData : studentData;

  return (
    <Box
      sx={{
        height: 'auto',
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
        <Header category="Page" title="Report" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <Button variant="contained" onClick={() => handleRoleButtonClick('teacher')} style={{ marginRight: '5%' }}>
          Teacher
        </Button>
        <Button variant="contained" onClick={() => handleRoleButtonClick('student')}>
          Student
        </Button>
      </div>

      {selectedRole && (
        <div style={{ marginTop: '20px' }}>
          <FormControl fullWidth>
            <InputLabel style={{ fontSize: '20px' }}>Select {selectedRole}</InputLabel>
            <Select value={selectedOptions} onChange={handleSelectChange} multiple>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}

      {selectedOptions.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Paper elevation={3} style={{ padding: '20px', width: '80%', margin: '20px' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                    {selectedRole === 'teacher' ? <TableCell>Subject</TableCell> : <TableCell>Grade</TableCell>}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : currentData
                  ).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{selectedRole === 'teacher' ? row.subject : row.grade}</TableCell>
                      <TableCell>
                        <IconButton color="primary" aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={currentData.length}
              rowsPerPage={5}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Button variant="outlined" style={{ float: 'right', marginTop: '10px' }}>
              Filter
            </Button>
          </Paper>
        </div>
      )}

    </Box>
  )
}

export default Report;

