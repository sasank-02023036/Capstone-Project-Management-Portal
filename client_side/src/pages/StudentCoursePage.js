import React, { useState } from "react";
import { useEffect } from "react";
import ProjectPreview from "components/project/ProjectPreview";
import axios from 'axios';

import {
  TableCell,
  TableRow,
  TablePagination,
  Paper,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem, // Import MenuItem
    Select, // Import Select
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { Delete } from '@mui/icons-material';
import PreferenceForm from "components/forms/PreferenceForm";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1.5px solid #9F9F9F",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  marginRight: "1rem",
  marginLeft: 0,
  boxShadow: "none",
  [theme.breakpoints.up("sm")]: {
    width: "40ch",
    marginLeft: theme.spacing(1),
    "&:focus": {
      width: "30ch", // Increase the focused width here
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
    boxShadow: "none",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginLeft: theme.spacing(7),
  background: "white",
  borderRadius: "10px",
  marginRight: theme.spacing(7),
  marginTop: theme.spacing(7),
  marginBottom: theme.spacing(7),
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#0097EB",
  fontSize: "16px",
  fontFamily: "Poppins",
  color: theme.palette.common.white,
  whiteSpace: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const HoverTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    cursor: "pointer",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "14.5px",
  fontFamily: "Poppins",
  whiteSpace: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "1px",
}));


function StudentCoursesPage({ data }) {
  const mongoose = require('mongoose');

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [preview, setPreview] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const [selected, setSelected] = React.useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const disabledPriorities = [1, 2, 3, 4].filter((priority) => selectedPriorities.includes(priority));


  useEffect(() => {
    setProjects(data.projects);
    setFilteredProjects(data.projects);
  }, [data]);

  useEffect(() => {
    if (searchName) {
      const filtered = projects.filter((client) =>
        client.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }, [projects, searchName]);

  const handleClick = (id) => {
    setPreview(true);
    setSelected(id);
  };

  useEffect(()=>{
    async function info(){
    try {
      const response = await axios.get(`/api/courses/teamates/${data.name}`)
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  info();

  }, [data])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
    if (searchName) {
      const filtered = projects.filter((client) =>
        client.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  };

  const handleClose = () => {
    setPreview(false);
  };

  const handleDropdownChange = (event, projectId) => {
    const selectedValue = event.target.value;

    // Check if the selected priority is already chosen for another project
    const isPrioritySelected = selectedPriorities.some(
      (preference) => preference.priority === selectedValue
    );

    if (!isPrioritySelected) {
      setSelectedPriorities((prevPriorities) => {
        // Check if a preference with the same project ID exists
        const existingPreferenceIndex = prevPriorities.findIndex(
          (preference) => preference.project === projectId
        );

        if (existingPreferenceIndex !== -1) {
          // If it exists, update the priority
          prevPriorities[existingPreferenceIndex] = {
            project: projectId,
            priority: selectedValue,
          };
        } else {
          // If it doesn't exist, add a new preference
          prevPriorities.push({
            project: projectId,
            priority: selectedValue,
          });
        }

        return [...prevPriorities];
      });
    }
  };

    const togglePreferences = () => {
        setShowPreferences(!showPreferences);
        setShowSubmitButton(!showSubmitButton);
      };

  const submitPreferences = async (event) => {
    try {
      const response = await axios.post("/api/preference", {
        course: data._id,
        projectPreferences: selectedPriorities.map((preference, index) => ({
          project: new mongoose.Types.ObjectId(preference.project),
          rank: index + 1,
        })),
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting preferences:", error);
    }
  };

  const handlePreferencesSubmit = () => {
    // Call the function to submit preferences
    submitPreferences();
    setShowPreferences(!showPreferences);
    setShowSubmitButton(!showSubmitButton);
  };

  return (
    <div>

      {preview && (
        <ProjectPreview projectId={selected} handleClose={handleClose} />
      )}
      {/* table goes here */}
      <StyledPaper>
        <Toolbar sx={{ height: "100px" }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "#0097EB",
              fontFamily: "Poppins",
            }}
          >
            Projects in this Course
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchOutlinedIcon sx={{ color: "#9F9F9F" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by Project Name"
              inputProps={{ Poppins: "search" }}
              value={searchName}
              onChange={handleSearchNameChange}
            />
          </Search>

          {/* need to add preferences button */}
          <button className="set-preferences" onClick={togglePreferences}>
                  Set Preferences
                </button>
          <Box sx={{ ml: 1.5 }}></Box>
        </Toolbar>
        <div className='card-container'>
          {filteredProjects
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            return (
              <Card sx={{ width: 250 ,border: '1.5px solid var(--primary-color)',borderRadius: '10px' ,boxShadow: '0 6px 8px rgba(0, 0, 0, 0.3)',}}>
                <CardContent onClick={() => {handleClick(row._id);}}>
                  <Typography variant="h5" component="div" sx={{ marginBottom: 4}}>
                    {row.name}
                  </Typography>
                  <Typography variant="body2">
                    <span style={{ fontWeight: 'bold' }}>Skills:</span> {row.skills}
                  </Typography>
                  <Typography variant="body2">
                    <span style={{ fontWeight: 'bold' }}>Administrators:</span> {row.administrators}
                  </Typography>
                  <Typography variant="body2">
                    <span style={{ fontWeight: 'bold' }}>Created By:</span> {row.createdBy}
                  </Typography>
                </CardContent>
                <CardActions>
                {showPreferences && (
                                      <Select
                                        label="Priority"
                                        value={selectedPriorities.find((preference) => preference.project === row._id)?.priority || ''}
                                        onChange={(event) => handleDropdownChange(event, row._id)}
                                        sx={{ marginLeft: 'auto' }}
                                      >
                                        {[null, ...[1, 2, 3, 4].filter((priority) => {
                                          const isPrioritySelected = selectedPriorities.some(
                                            (preference) => preference.project !== row._id && preference.priority === priority
                                          );
                                          return !isPrioritySelected;
                                        })].map((availablePriority) => (
                                          <MenuItem key={availablePriority} value={availablePriority}>
                                            {availablePriority === null ? 'None' : availablePriority}
                                          </MenuItem>
                                        ))}
                                      </Select>

                                    )}
                </CardActions>
              </Card>
            );
          })}
          {showSubmitButton && ( // Display the submit button when showSubmitButton is true
                      <button className="set-preferences" style={{ marginLeft: 'auto' }} onClick={handlePreferencesSubmit}>
                        Submit
                      </button>
                    )}
        </div>
        <TablePagination
          sx={{ marginRight: "1.5rem" }}
          component="div"
          count={projects.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledPaper>
    </div>
  );
}

export default StudentCoursesPage;
