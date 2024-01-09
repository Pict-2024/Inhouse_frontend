import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Header from '../../components/AModule/Header';
import { Paper, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText } from '@mui/material';

const Report = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
  
    const handleRoleButtonClick = (role) => {
      setSelectedRole(role);
    };
  
    const handleSelectChange = (event) => {
      setSelectedOptions(event.target.value);
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
        <Header category="Page" title="Report" />
      </div>
      <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
        
      <Paper elevation={3} style={{ padding: '20px', width: '500px', margin: '20px',  }}>
        <Button variant="contained" onClick={() => handleRoleButtonClick('teacher')} style={{ marginRight:'55%' }}>
          Teacher
        </Button>
        <Button variant="contained" onClick={() => handleRoleButtonClick('student')}>
          Student
        </Button>

        {selectedRole && (
          <div style={{ marginTop: '20px' }}>
            <FormControl fullWidth>
              <InputLabel style={{fontSize:'20px'}}>Select {selectedRole}</InputLabel>
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
            <FormControl fullWidth>
              <InputLabel>Filters</InputLabel>
              <Select value={selectedOptions} onChange={handleSelectChange} multiple renderValue={(selected) => selected.join(', ')}>
                <MenuItem value="filter1">
                  <Checkbox checked={selectedOptions.includes('filter1')} />
                  <ListItemText primary="Filter 1" />
                </MenuItem>
                <MenuItem value="filter2">
                  <Checkbox checked={selectedOptions.includes('filter2')} />
                  <ListItemText primary="Filter 2" />
                </MenuItem>
                <MenuItem value="filter3">
                  <Checkbox checked={selectedOptions.includes('filter3')} />
                  <ListItemText primary="Filter 3" />
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
      </Paper>
    </div>
    
    </Box>
  )
}

export default Report;