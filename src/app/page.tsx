"use client";

import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import RestaurantLayout from "./components/tables";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Home() {
  const theme = useTheme();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const step = 0.055;
  const [selectedTable, setSelectedTable] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("2");
  const [fullName, setFullName] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [reservations, setReservations] = useState<Reservation[]>([]); // Specify Reservation[] as the state type
  const [reservationExistsAlert, setReservationExistsAlert] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);

  interface Reservation {
    reservationDate: string; // Adjust the types according to your data structure
    reservationTime: string;
    area: string;
    tableNumber: string;
    numberOfPeople: number;
    fullName: string;
    // Add other properties if present in your data
  }
  const generateTimeSlots = () => {
    const hours = ["18", "19", "20", "21", "22"]; // Specify allowed hours
    const intervals = ["00", "30"]; // Specify intervals
    const timeSlots = [];

    for (const hour of hours) {
      for (const interval of intervals) {
        timeSlots.push(`${hour}:${interval}`);
      }
    }

    return timeSlots;
  };
  const allowedHours = generateTimeSlots();

  const handleNumberOfPeopleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setNumberOfPeople(event.target.value);
    // Add additional logic or validation as needed
  };

  const handleTimeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedTime(event.target.value);
    // Add additional logic or validation as needed
  };
  const handleTableClick = (tableNumber: number, area: string) => {
    setSelectedTable(tableNumber);
    setSelectedArea(area);

    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNewModalOpen(false);
    setSelectedArea("Area One");
    setSelectedTable(1);
  };
  const handleFullNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setFullName(event.target.value); // Update the 'fullName' state with input value
  };

  const handleTableChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: number = parseInt(event.target.value, 10); // Parse the input value as a number

    setSelectedTable(newValue);
  };
  const handleAreaChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedArea(event.target.value);
  };
  const handleDateChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedDate(event.target.value); // Update the 'selectedDate' state with input value
  };
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Check if the reservation already exists in the database
    const response = await fetch("/api/checkReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservationDate: new Date(selectedDate),
        reservationTime: selectedTime,
        area: selectedArea,
        tableNumber: selectedTable.toString(),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reservationExists) {
        // Handle case where the reservation already exists
        console.log("Reservation already exists");
        setReservationExistsAlert(true);

        return;
      }
    } else {
      console.error("Error checking reservation:", response.statusText);
      // Handle error checking reservation
      return;
    }

    // Continue with creating the reservation if it doesn't exist

    try {
      const createResponse = await fetch("/api/createReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName,
          reservationDate: new Date(selectedDate),
          reservationTime: selectedTime,
          numberOfPeople: parseInt(numberOfPeople),
          area: selectedArea,
          tableNumber: `${selectedTable}`,
        }),
      });

      if (createResponse.ok) {
        const createData = await createResponse.json();
        // Handle success
      } else {
        console.error("Error creating reservation:", createResponse.statusText);
        // Handle error creating reservation
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      // Handle error creating reservation
    }

    // Reset the form fields and close the modal
    setNumberOfPeople("2");
    setSelectedTime("");
    setFullName("");
    setSelectedDate(new Date().toISOString().split("T")[0]);
    handleCloseModal();
  };
  const handleAlertClose = () => {
    setReservationExistsAlert(false);
  };
  function formatDate(inputDate: string | number | Date) {
    const date = new Date(inputDate); // Parse the input date string
    const day = date.getDate().toString().padStart(2, "0"); // Get day with leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month with leading zero if needed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Return formatted date in DD/MM/YYYY format
  }
  const isHourTaken = (tableNumber: number, hour: string) => {
    const tableNum = tableNumber.toString();

    // Filter reservations for a specific table
    const reservationsForTable = reservations.filter(
      (reservation) =>
        reservation.tableNumber === tableNum &&
        reservation.area === selectedArea,
    );

    // Get reservation times for the table
    const reservationTimes = reservationsForTable.map(
      (reservation) => reservation.reservationTime,
    );

    // Check if the given hour is included in the reservation times for the table
    return reservationTimes.includes(hour);
  };
  const handleRowClick = async () => {
    // Access reservation properties here
    console.log("Clicked reservation:", selectedReservation);
    const response = await fetch("/api/deleteReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedReservation?.id,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reservationExists) {
        // Handle case where the reservation already exists
      }
    } else {
      console.error("Error checking reservation:", response.statusText);
    }
    setOpenDeleteModal(false);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedReservation(null);
  };
  const handleCloseDeleteOrderModal = () => {
    setModalDeleteOpen(false);
    setSelectedReservation(null);
  };

  const handleOpenDeleteModal = (reservation: any) => {
    setSelectedReservation(reservation);
    setOpenDeleteModal(true);
  };
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Check if the reservation already exists in the database
        const response = await fetch("/api/getReservations", {
          method: "POST", // Assuming you want to send data in the body
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json(); // Ensure TypeScript understands the data as Reservation[]
          setReservations(data.Reservations);
        } else {
          console.error("Failed to fetch reservations:", response.statusText);
          // Handle the error case here
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        // Handle exceptions that might occur during the fetch
      }
    };

    fetchReservations();
  }, [reservations]);

  const columns = [
    { field: "fullName", headerName: "Name", width: 100 }, // Adjust width as needed
    { field: "reservationDate", headerName: "Date", width: 100 }, // Adjust width as needed
    { field: "reservationTime", headerName: "Time", width: 100 }, // Adjust width as needed
    { field: "area", headerName: "Area", width: 100 }, // Adjust width as needed
    { field: "tableNumber", headerName: "Table Number", width: 100 }, // Adjust width as needed
    { field: "numberOfPeople", headerName: "Number of People", width: 150 }, // Adjust width as needed
    {
      field: "deleteIcon",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params: { row: { id: string | number } }) => (
        <IconButton
          onClick={() =>
            handleOpenDeleteModal(reservations[params.row.id as number])
          }
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const rows = reservations.map((reservation, index) => ({
    id: index,
    fullName: reservation.fullName,
    reservationDate: formatDate(reservation.reservationDate),
    reservationTime: reservation.reservationTime,
    area: reservation.area,
    tableNumber: reservation.tableNumber,
    numberOfPeople: reservation.numberOfPeople,
    deleteIcon: (
      <DeleteIcon
        onClick={() => handleOpenDeleteModal(reservation)} // Call your delete modal handler
        style={{ cursor: "pointer", color: "red" }} // Adjust styles as needed
      />
    ),
  }));

  const getRowClassName = (params: GridRowParams) => {
    return (params.id as number) % 2 === 0 ? "evenRow" : "oddRow";
  };
  const tableIndices = [1, 3, 5, 7];
  const areas = ["Area One", "Area Two", "Area Three", "Area Four"];
  const renderTables = () => {
    const gridLayout = [];
    for (let i = 0; i < 9; i++) {
      if (tableIndices.includes(i)) {
        const areaIndex = tableIndices.indexOf(i);
        const areaTitle = areas[areaIndex];

        gridLayout.push(
          <Grid item xs={12} sm={4} md={4} key={i}>
            <Container maxWidth="sm">
              <Box
                padding={2}
                border={1}
                borderColor="white"
                borderRadius={5}
                style={{ backgroundColor: "#00000090" }}
              >
                <RestaurantLayout
                  area={areaTitle}
                  handleTableClick={(tableNumber: number, area: string) =>
                    handleTableClick(tableNumber, area)
                  }
                  reservations={reservations}
                />
              </Box>
            </Container>
          </Grid>,
        );
      } else if (i === 0) {
        gridLayout.push(
          <Grid item xs={12} sm={4} md={4} key={i}>
            <Container maxWidth="md">
              <Box
                padding={2}
                border={1}
                borderColor="white"
                borderRadius={5}
                style={{ backgroundColor: "#00000090" }}
              >
                <Typography variant="h5" gutterBottom>
                  My Reservations
                </Typography>
                {reservations.length > 0 ? (
                  <div style={{ height: 250, width: "100%" }}>
                    <DataGrid
                      className="bg-white"
                      rows={rows}
                      columns={columns}
                      rowHeight={40} // Adjust row height if needed
                      //onRowClick={(row) => handleOpenDeleteModal(reservations[row.id])}
                      getRowClassName={getRowClassName}
                    />
                  </div>
                ) : (
                  <Typography variant="body1">No reservations found</Typography>
                )}
                <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
                  <DialogTitle>Delete Reservation</DialogTitle>
                  <DialogContent>
                    <p>Are you sure you want to delete this reservation?</p>
                    {/* Display reservation details in the modal */}
                    {selectedReservation && (
                      <div>
                        <p>Date: {selectedReservation.reservationDate}</p>
                        {/* Display other reservation details... */}
                      </div>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button onClick={handleRowClick} color="error">
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Container>
          </Grid>,
        );
      } else if (i === 4) {
        gridLayout.push(
          <Grid item xs={12} sm={4} md={4} key={i}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
                border={1}
                borderColor="white"
                borderRadius={5}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setNewModalOpen(true);
                      setModalOpen(true);
                    }}
                    style={{
                      width: "200px",
                      marginBottom: "10px",
                      backgroundColor: "#00000095",
                    }}
                  >
                    Order a Table
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ width: "200px", backgroundColor: "#00000095" }}
                    onClick={() => {
                      setModalDeleteOpen(true);
                    }}
                  >
                    Cancel Table
                  </Button>
                </Box>
                <Modal open={modalDeleteOpen} onClose={handleCloseModal}>
                  <Box
                    border={1}
                    borderColor="white"
                    borderRadius={5}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "#000000",
                      border: "2px solid #000",
                      boxShadow: 24,
                      p: 4,
                      width: "50%", // Default width for larger screens
                      [theme.breakpoints.down("sm")]: {
                        width: "90%", // Adjust for smaller screens (e.g., smartphones)
                      },
                      [theme.breakpoints.between("sm", "md")]: {
                        width: "80%", // Adjust for medium-sized screens (e.g., tablets)
                      },
                      height: 600,
                      textAlign: "center",
                    }}
                  >
                    <IconButton
                      onClick={handleCloseDeleteOrderModal}
                      color="inherit"
                      sx={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.7)",
                        },
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Container maxWidth="md">
                      <Box
                        padding={2}
                        border={1}
                        borderColor="white"
                        borderRadius={5}
                        style={{ backgroundColor: "#00000090" }}
                      >
                        <Typography variant="h5" gutterBottom>
                          My Reservations
                        </Typography>

                        {reservations.length > 0 ? (
                          <div style={{ height: 450, width: "100%" }}>
                            <DataGrid
                              className="bg-white"
                              rows={rows}
                              columns={columns}
                              rowHeight={40} // Adjust row height if needed
                              //onRowClick={(row) => handleOpenDeleteModal(reservations[row.id])}
                              getRowClassName={getRowClassName}
                            />
                          </div>
                        ) : (
                          <Typography variant="body1">
                            No reservations found
                          </Typography>
                        )}
                        <Dialog
                          open={openDeleteModal}
                          onClose={handleCloseDeleteModal}
                        >
                          <DialogTitle>Delete Reservation</DialogTitle>
                          <DialogContent>
                            <p>
                              Are you sure you want to delete this reservation?
                            </p>
                            {/* Display reservation details in the modal */}
                            {selectedReservation && (
                              <div>
                                <p>
                                  Date: {selectedReservation.reservationDate}
                                </p>
                                {/* Display other reservation details... */}
                              </div>
                            )}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseDeleteModal}>
                              Cancel
                            </Button>
                            <Button onClick={handleRowClick} color="error">
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                    </Container>
                  </Box>
                </Modal>
              </Box>
            </Box>
          </Grid>,
        );
      } else {
        gridLayout.push(
          <Grid item xs={4} key={i}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
            ></Box>
          </Grid>,
        );
      }
    }
    return gridLayout;
  };

  return (
    <div className="video-background">
      <video
        ref={videoRef}
        muted
        autoPlay
        loop
        className="video-bg"
        src="/restaurant-loop2.mp4" // Update the source with your video path
      />
      <div className="gradient-overlay">
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <Navbar />

          <Box
            sx={{
              flex: "1 1 auto",
              overflowY: "auto",
              marginTop: "1%",
              marginBottom: "1%",
            }}
            flexDirection="column"
          >
            <Grid container item xs={12} spacing={2}>
              {renderTables()}
            </Grid>
          </Box>
          <Footer />

          <Modal open={modalOpen} onClose={handleCloseModal}>
            <Box
              border={1}
              borderColor="white"
              borderRadius={5}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "#000000",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                width: 400,

                [theme.breakpoints.down("sm")]: {
                  width: "90%", // Adjust for smaller screens (e.g., smartphones)
                },
                [theme.breakpoints.between("sm", "md")]: {
                  width: "50%", // Adjust for medium-sized screens (e.g., tablets)
                },
                textAlign: "center",
              }}
            >
              <form onSubmit={handleSubmit}>
                {newModalOpen ? (
                  <>
                    <TextField
                      label="Table"
                      variant="outlined"
                      fullWidth
                      type="number" // Set input type as number
                      margin="normal"
                      style={{
                        backgroundColor: "#FFF",
                        border: "2px solid #FFF",
                        borderRadius: 8,
                      }}
                      value={selectedTable} // Assign value from state
                      onChange={handleTableChange} // Handle changes to update the state
                    />
                    <TextField
                      select
                      label="Area"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={selectedArea} // Assign value from state
                      onChange={handleAreaChange} // Handle changes to update the state
                      style={{
                        backgroundColor: "#FFF",
                        border: "2px solid #FFF",
                        borderRadius: 8,
                        textAlign: "left",
                      }}
                    >
                      {areas.map((area) => (
                        <MenuItem key={area} value={area}>
                          {area}
                        </MenuItem>
                      ))}
                    </TextField>
                  </>
                ) : (
                  <Typography variant="h5" gutterBottom>
                    Table {selectedTable} - {selectedArea}
                  </Typography>
                )}

                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  style={{
                    backgroundColor: "#FFF",
                    border: "2px solid #FFF",
                    borderRadius: 8,
                  }}
                  value={fullName} // Assign value from state
                  onChange={handleFullNameChange} // Handle changes to update the state
                // Add state or ref for managing the full name input value
                />
                <TextField
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  style={{
                    backgroundColor: "#FFF",
                    border: "2px solid #FFF",
                    borderRadius: 8,
                  }}
                  defaultValue={new Date().toISOString().split("T")[0]}
                  value={selectedDate} // Assign value from state
                  onChange={handleDateChange} // Handle changes to update the state
                  InputLabelProps={{
                    shrink: true, // Ensure the label floats when a value is set
                  }}
                // Add state or ref for managing the date input value
                />
                <TextField
                  select
                  label="Select Time"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  style={{
                    backgroundColor: "#FFF",
                    border: "2px solid #FFF",
                    borderRadius: 8,
                    textAlign: "left",
                  }}
                >
                  {allowedHours.map((hour) => (
                    <MenuItem
                      key={hour}
                      value={hour}
                      disabled={isHourTaken(selectedTable, hour)}
                    >
                      {hour}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Number of People"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={numberOfPeople}
                  onChange={handleNumberOfPeopleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: 2, // Minimum value allowed
                    max: 8, // Maximum value allowed
                    step: 1, // Increment value by 1
                  }}
                  style={{
                    backgroundColor: "#FFF",
                    border: "2px solid #FFF",
                    borderRadius: 8,
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    color: "white",
                    margin: 10,
                    border: "2px solid #FFF",
                    borderRadius: 8,
                  }}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    color: "white",
                    margin: 10,
                    border: "2px solid #FFF",
                    borderRadius: 8,
                  }}
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </form>
              {reservationExistsAlert && (
                <Alert
                  severity="warning"
                  onClose={handleAlertClose}
                  sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    zIndex: 9999,
                  }}
                >
                  Reservation already exists!
                </Alert>
              )}
            </Box>
          </Modal>
        </Box>
      </div>
    </div>
  );
}
