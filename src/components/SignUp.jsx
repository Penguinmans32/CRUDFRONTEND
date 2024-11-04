import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const gradientAnimation = `
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        imageURL: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/signup', formData);
            console.log(response.data);
            navigate('/signin');
        } catch (error) {
            console.error(error);
            setError('An error occurred during sign up. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const pageStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        maxWidth: '400px',
        width: '100%',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        transition: 'all 0.3s ease',
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        margin: '20px 0',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    };

    const errorStyle = {
        color: '#FF6B6B',
        marginTop: '10px',
        textAlign: 'center',
    };

    return (
        <div style={pageStyle}>
            <style>{gradientAnimation}</style>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2 style={{ color: 'white', marginBottom: '20px' }}>Sign Up</h2>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    style={inputStyle}
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    style={inputStyle}
                />
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    style={inputStyle}
                />
                <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    style={inputStyle}
                />
                <input
                    name="imageURL"
                    value={formData.imageURL}
                    onChange={handleChange}
                    placeholder="Image URL"
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle} disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
                {error && <p style={errorStyle}>{error}</p>}
            </form>
        </div>
    );
}

export default SignUp;