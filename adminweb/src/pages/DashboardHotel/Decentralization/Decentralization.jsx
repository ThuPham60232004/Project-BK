import React, { useState, useEffect } from 'react';
import './Decentralization.css';
import axios from 'axios';
import { Box, Modal, Typography, Button, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Decentralization = () => {
    const [user, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Store selected user data
    const [selectedRole, setSelectedRole] = useState(''); // Store selected user's role
    const [isAdmin, setIsAdmin] = useState(false); // Store selected user's admin status
    const [open, setOpen] = useState(false); // Modal open state

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:9000/api/users/');
                setUser(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);

    const columns = [
        { field: 'username', headerName: 'Tên người dùng', width: 150 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'country', headerName: 'Đất nước', width: 120 },
        { field: 'city', headerName: 'Thành phố', width: 120 },
        { field: 'phone', headerName: 'Số điện thoại', width: 120 },
        { field: 'role', headerName: 'Phân quyền', width: 120 },
        { field: 'isAdmin', headerName: 'Quản trị viên', width: 120, renderCell: (params) => params.row.isAdmin ? 'Có' : 'Không' },
    ];

    const handleRowClick = (params) => {
        setSelectedUser(params.row); // Store the selected user data
        setSelectedRole(params.row.role); // Set the current role of the selected user
        setIsAdmin(params.row.isAdmin); // Set the current admin status
        setOpen(true); // Open the modal
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value); // Update role in dropdown
    };

    const handleIsAdminChange = (event) => {
        setIsAdmin(event.target.checked); // Update isAdmin status
    };

    const handleClose = () => {
        setOpen(false); // Close modal
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:9000/api/users/${selectedUser._id}`, {
                role: selectedRole,
                isAdmin: isAdmin
            });
            // Update user state with the new role and isAdmin status
            setUser(user.map(u => u._id === selectedUser._id ? { ...u, role: selectedRole, isAdmin: isAdmin } : u));
            setOpen(false); // Close modal after update
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='Decentralization'>
            <div className='DecentralizationContainer'> 
                <h1>Phân quyền</h1>
            </div>
            <Box sx={{ height: '800px', width: '97%', marginLeft: '20px' }}>
                <DataGrid
                    rows={user}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 15,
                            },
                        },
                    }}
                    pageSizeOptions={[15]}
                    checkboxSelection
                    onRowClick={handleRowClick} // Handle row click
                />
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="user-role-update-title"
                aria-describedby="user-role-update-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="user-role-update-title" variant="h6" component="h2">
                        Cập nhật phân quyền
                    </Typography>
                    {selectedUser && (
                        <Box sx={{ mt: 2 }}>
                            <Typography>
                                <strong>Tên người dùng:</strong> {selectedUser.username}
                            </Typography>
                            <Select
                                value={selectedRole}
                                onChange={handleRoleChange}
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                <MenuItem value="system_admin">System Admin</MenuItem>
                                <MenuItem value="hotel_admin">Hotel Admin</MenuItem>
                                <MenuItem value="user">User</MenuItem>
                            </Select>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isAdmin}
                                        onChange={handleIsAdminChange}
                                    />
                                }
                                label="Quản trị viên"
                                sx={{ mt: 2 }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                sx={{ mt: 2 }}
                            >
                                Cập nhật
                            </Button>
                        </Box>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default Decentralization;
