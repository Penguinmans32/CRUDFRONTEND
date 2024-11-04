import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const gradientAnimation = `
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                setError(`Error: ${error.response.status} ${error.response.statusText}`);
            } else {
                setError('Error: Unable to sign in');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const pageStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(-45deg, #FFA07A, #FF69B4, #87CEFA, #00FA9A)',
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
        padding: '12px',
        margin: '10px 0',
        borderRadius: '25px',
        border: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        transition: 'all 0.3s ease',
        fontSize: '16px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        margin: '20px 0',
        borderRadius: '25px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    };

    const errorStyle = {
        color: '#FF6B6B',
        marginTop: '10px',
        textAlign: 'center',
        fontSize: '14px',
    };

    return (
        <div style={pageStyle}>
            <style>{gradientAnimation}</style>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2 style={{ color: 'white', marginBottom: '20px', fontSize: '28px' }}>Sign In</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    style={inputStyle}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={inputStyle}
                    required
                />
                <button 
                    type="submit" 
                    style={{
                        ...buttonStyle,
                        opacity: isLoading ? 0.7 : 1,
                        cursor: isLoading ? 'not-allowed' : 'pointer'
                    }} 
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
                {error && <p style={errorStyle}>{error}</p>}
            </form>
        </div>
    );
}

export default SignIn;