import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";

const Dashboard = ({ email, onLogout }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("personalInfo");
  const [balance, setBalance] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  const [transferDetails, setTransferDetails] = useState({
    receiverAccountNumber: "",
    amount: "",
  });

  useEffect(() => {
    fetchUserDetails();
  }, [email]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/user-details", {
        params: { email },
      });
      setUserDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/get-balance", {
        params: { email },
      });
      setBalance(response.data);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/auth/transaction-history",
        { params: { identifier: userDetails.accountNumber } }
      );
      setTransactionData(response.data);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  const handleTransfer = async () => {
    try {
      const payload = {
        senderAccountNumber: userDetails.accountNumber,
        receiverAccountNumber: transferDetails.receiverAccountNumber,
        amount: parseFloat(transferDetails.amount),
      };
      const response = await axios.post(
        "http://localhost:8080/api/auth/transfer",
        null,
        { params: payload }
      );
      alert(response.data);
      setTransferDetails({ receiverAccountNumber: "", amount: "" });
      fetchBalance();
    } catch (error) {
      console.error("Error in transfer:", error);
      alert("Transfer failed: " + (error.response?.data || "Server error"));
    }
  };

  const renderContent = () => {
    if (loading) return <Typography>Loading your details...</Typography>;
    if (!userDetails) return <Typography>No user data found.</Typography>;

    switch (selectedSection) {
      case "personalInfo":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Personal Information
            </Typography>
            <Typography>Name: {userDetails.firstname} {userDetails.lastname}</Typography>
            <Typography>Email: {userDetails.email}</Typography>
            <Typography>Phone: {userDetails.mobileNumber}</Typography>
          </Paper>
        );
      case "balanceInquiry":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Balance Inquiry
            </Typography>
            <Button variant="contained" color="primary" onClick={fetchBalance}>
              Check Balance
            </Button>
            {balance !== null && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                Current Balance: ₹{balance}
              </Typography>
            )}
          </Paper>
        );
      case "amountTransfer":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Amount Transfer
            </Typography>
            <TextField
              fullWidth
              label="Receiver's Account Number"
              value={transferDetails.receiverAccountNumber}
              onChange={(e) =>
                setTransferDetails({ ...transferDetails, receiverAccountNumber: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={transferDetails.amount}
              onChange={(e) =>
                setTransferDetails({ ...transferDetails, amount: e.target.value })
              }
              margin="normal"
              required
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleTransfer}
            >
              Transfer
            </Button>
          </Paper>
        );
      case "transactionHistory":
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Transaction History
            </Typography>
            <Button variant="contained" color="primary" onClick={fetchTransactionHistory}>
              Load Transactions
            </Button>
            {transactionData.length > 0 ? (
              <Table sx={{ mt: 3 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Other Party Account</TableCell>
                    <TableCell>Other Party Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionData.map((transaction, index) => {
                    const isSent = transaction.senderAccountNumber === userDetails.accountNumber;
                    return (
                      <TableRow key={index}>
                        <TableCell>{isSent ? "Sent" : "Received"}</TableCell>
                        <TableCell>{new Date(transaction.transactionDate).toLocaleString()}</TableCell>
                        <TableCell>{isSent ? `-₹${transaction.amount}` : `+₹${transaction.amount}`}</TableCell>
                        <TableCell>
                          {isSent
                            ? transaction.receiverAccountNumber
                            : transaction.senderAccountNumber}
                        </TableCell>
                        <TableCell>
                          {isSent
                            ? transaction.receiverFirstname
                            : transaction.senderFirstname}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <Typography sx={{ mt: 2 }}>No transactions found.</Typography>
            )}
          </Paper>
        );
      default:
        return <Typography>Select a section from the menu.</Typography>;
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
        padding: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sm={3}>
          <List
            sx={{
              bgcolor: "primary.light",
              borderRadius: 2,
              p: 1,
              height: "100%",
            }}
          >
            <ListItem button onClick={() => setSelectedSection("personalInfo")}>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
              <ListItemText primary="Personal Info" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => setSelectedSection("balanceInquiry")}>
              <Avatar>
                <AttachMoneyIcon />
              </Avatar>
              <ListItemText primary="Balance Inquiry" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => setSelectedSection("amountTransfer")}>
              <Avatar>
                <AttachMoneyIcon />
              </Avatar>
              <ListItemText primary="Amount Transfer" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => setSelectedSection("transactionHistory")}>
              <Avatar>
                <HistoryIcon />
              </Avatar>
              <ListItemText primary="Transaction History" />
            </ListItem>
            <Divider />
            <ListItem button onClick={onLogout}>
              <Avatar>
                <LogoutIcon />
              </Avatar>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={9}>
          {renderContent()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
