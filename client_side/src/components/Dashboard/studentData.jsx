import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationPopup from 'components/forms/ConfimationPopup';
import CSVUploader from 'components/forms/CSVUploader';
import "../../styles/index.css";
import Navbar from 'components/Header/navbar';


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { Delete } from '@mui/icons-material';
import InviteStudents from 'components/forms/InviteStudents';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '100%',
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "14.5px",
  fontFamily: "Poppins",
  whiteSpace: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const HoverTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    cursor: 'pointer',
  },
}));

const getDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function Studentdata() {
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  const handleClick = (id) => {
    setPopup(true);
    setSelectedStudent(id);
  };

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
      const filtered = students.filter((student) =>
        student.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/users");
        console.log('response :', response);
        setData(response.data);
        setStudents(response.data.users || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  async function onYes() {
    console.log('selectedstudent: ', selectedStudent);
    try {
      await axios.delete(`/api/users/${selectedStudent}`);
      const updateUsers = data.users.filter((user) => user._id !== selectedStudent);
      setStudents(updateUsers);
      const updatedData = { ...data, users: updateUsers };
      setData(updatedData);
      setPopup(false);
    } catch (err) {
      switch (err.response.status) {
        case 401:
          setPopup(false);
          navigate("/sigin", { replace: true });
          break;
        case 404:
          setPopup(false);
          break;
        default:
          setPopup(false);
          break;
      }
    }
  }

  function onNo() {
    setPopup(false);
  }

  return (
    <>
    <Navbar/>
    <div className='courses-students'>
      {popup && <ConfirmationPopup message="Are you sure you want to delete this student ?" onNo={onNo} onYes={onYes} />}

      <StyledPaper>
        <Toolbar sx={{ height: "100px" }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: "#0097EB", fontFamily: "Poppins" }}
          >
            Student Administration
          </Typography>

          <StyledInputBase
            placeholder="Search by Student Name"
            value={searchName}
            onChange={handleSearchNameChange}
          />
          <CSVUploader data={data} setData={setData} setStudents={setStudents} />

          <InviteStudents data={data} setData={setData} setStudents={setStudents} />

          <Box sx={{ ml: 1.5 }} ></Box>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <HeaderTableCell>Name</HeaderTableCell>
                <HeaderTableCell>Email</HeaderTableCell>
                <HeaderTableCell>Added On</HeaderTableCell>
                <HeaderTableCell>Action</HeaderTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <HoverTableRow key={row._id} onClick={() => handleClick(row._id)}>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{getDate(row.createdAt)}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton color="error" aria-label="delete">
                        <Delete />
                      </IconButton>
                    </StyledTableCell>
                  </HoverTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledPaper>
    </div>
    </>
  );
}
