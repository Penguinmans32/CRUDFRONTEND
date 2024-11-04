import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        imageURL: ''
    });

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user.id);
        setFormData({
            username: user.username || '',
            email: user.email || '',
            password: '',
            imageURL: user.imageURL || ''
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/users/${editingUser}`, formData);
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const dashboardStyle = {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '2px solid #333',
        paddingBottom: '10px',
    };

    const buttonStyle = {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const userListStyle = {
        listStyle: 'none',
        padding: 0,
    };

    const userItemStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
        marginBottom: '10px',
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s',
    };

    const userImageStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '15px',
        objectFit: 'cover',
    };

    const userInfoStyle = {
        flexGrow: 1,
    };

    const actionButtonStyle = {
        ...buttonStyle,
        marginLeft: '10px',
        padding: '5px 10px',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    };

    const inputStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    };

    return (
        <div style={dashboardStyle}>
            <div style={headerStyle}>
                <h1 style={{ margin: 0 }}>Dashboard</h1>
                <button onClick={fetchUsers} style={buttonStyle}>Fetch All Users</button>
            </div>
            <ul style={userListStyle}>
                {users.map(user => (
                    <li key={user.id} style={userItemStyle}>
                        <img src={user.imageURL} alt={user.username} style={userImageStyle} />
                        <div style={userInfoStyle}>
                            <strong>{user.username}</strong>
                            <div>{user.email}</div>
                        </div>
                        <button onClick={() => handleDelete(user.id)} style={{...actionButtonStyle, backgroundColor: '#f44336'}}>Delete</button>
                        <button onClick={() => handleEdit(user)} style={{...actionButtonStyle, backgroundColor: '#2196F3'}}>Edit</button>
                    </li>
                ))}
            </ul>
            {editingUser && (
                <form onSubmit={handleUpdate} style={formStyle}>
                    <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" style={inputStyle} />
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={inputStyle} />
                    <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" style={inputStyle} />
                    <input name="imageURL" value={formData.imageURL} onChange={handleChange} placeholder="Image URL" style={inputStyle} />
                    <button type="submit" style={buttonStyle}>Update User</button>
                </form>
            )}
        </div>
    );
}

export default Dashboard;