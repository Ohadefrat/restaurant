import { Box, Grid, Typography, useTheme } from '@mui/material';


interface Reservation {
    reservationDate: string; // Adjust the types according to your data structure
    reservationTime: string;
    area: string;
    tableNumber: string;
    // Add other properties if present in your data
}
type RestaurantLayoutProps = {
    area: string;
    handleTableClick: (tableNumber: number, area: string) => void;
    reservations: any

};

const RestaurantLayout: React.FC<RestaurantLayoutProps> = ({ area, handleTableClick, reservations }) => {

    const reservationsList = reservations as Reservation[]
    const tableIndices = [1, 2, 3, 4, 6, 7, 8, 9];
    const allowedHours = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'];
    const theme = useTheme();

    const renderTables = () => {
        const gridLayout = [];
        for (let i = 1; i <= 9; i++) {
            let tableBackgroundColor = 'green'; // Default color

            const tableReservations = reservations.filter(
                (reservation: { tableNumber: string; area: string; }) => reservation?.tableNumber === i.toString() && reservation?.area === area
            );
            const reservedHours = tableReservations.map((reservation: { reservationTime: any; }) => reservation?.reservationTime);

            // Check if all allowed hours for the table are reserved
            const allHoursReserved = allowedHours.every((hour) => reservedHours.includes(hour));

            if (allHoursReserved && reservations[i].area === area) {
                tableBackgroundColor = 'red'; // Set to red if all hours are reserved
            } else if (reservedHours.length > 0) {
                tableBackgroundColor = 'orange'; // Set to orange if some hours are reserved
            }
            if (tableIndices.includes(i)) {
                gridLayout.push(
                    <Grid item xs={4} sm={4} md={4} key={i}>
                        <Box

                            border={1}
                            borderColor="white"
                            borderRadius={5}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color="white"
                            onClick={() => handleTableClick(i, area)}
                            style={{ backgroundColor: tableBackgroundColor }} // Set the background color dynamically
                            sx={{
                                [theme.breakpoints.down('sm')]: {
                                    width: '30%', // Adjust for smaller screens (e.g., smartphones)
                                    height: '30px', // Adjust for smaller screens (e.g., smartphones)
                                },
                                [theme.breakpoints.between('sm', 'md')]: {
                                    width: '50%', // Adjust for medium-sized screens (e.g., tablets)
                                    height: '50px', // Adjust for medium-sized screens (e.g., tablets)
                                },
                                [theme.breakpoints.up('lg')]: {
                                    width: '100%', // Adjust for larger screens (e.g., laptops, desktops)
                                    height: '100px', // Adjust for larger screens (e.g., laptops, desktops)
                                },
                            }}
                        >
                            Table {i}
                        </Box>
                    </Grid>
                );
            } else {
                gridLayout.push(
                    <Grid item xs={4} sm={4} md={4} key={i}>
                        {/* Empty space */}
                        <Box width={100} display="flex" height={100} alignItems="center" justifyContent="center" sx={{
                            [theme.breakpoints.down('sm')]: {
                                width: '30%', // Adjust for smaller screens (e.g., smartphones)
                                height: '30px', // Adjust for smaller screens (e.g., smartphones)
                            },
                            [theme.breakpoints.between('sm', 'md')]: {
                                width: '50%', // Adjust for medium-sized screens (e.g., tablets)
                                height: '50px', // Adjust for medium-sized screens (e.g., tablets)
                            },
                            [theme.breakpoints.up('lg')]: {
                                width: '100%', // Adjust for larger screens (e.g., laptops, desktops)
                                height: '100px', // Adjust for larger screens (e.g., laptops, desktops)
                            },
                        }}>
                            <Typography variant="body2" textAlign="center" color="white">
                                {area}
                            </Typography>
                        </Box>
                    </Grid>
                );
            }
        }
        return gridLayout;
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ width: '100%' }}>
            <Grid container item xs={8} py={2} sm={12} md={8} spacing={2} justifyContent="center">
                {renderTables()}
            </Grid>
        </Grid>
    );
};

export default RestaurantLayout;
