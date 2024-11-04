import React, { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { User, Menu, X, Github, Twitter, Linkedin, Lock, Image } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const ParticleBackground = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const particleCount = 50
    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.5 + 0.1,
      speedX: Math.random() * 0.2 - 0.1,
      speedY: Math.random() * 0.2 - 0.1,
    }))
    setParticles(newParticles)

    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
        }))
      )
      requestAnimationFrame(animateParticles)
    }

    const animationFrame = requestAnimationFrame(animateParticles)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-pink-200 opacity-30"
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            width: `${particle.size}vw`,
            height: `${particle.size}vw`,
          }}
        />
      ))}
    </div>
  )
}

function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const controls = useAnimation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    imageURL: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prevData) => ({ ...prevData, imageURL: reader.result }));
        };
        reader.readAsDataURL(file);
    }
  };

  const navItems = ['Home', 'Recipes', 'Community', 'About', 'Contact']

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    })
  }, [controls])

  const handleRedirect = () => {
    navigate('/signin');
  }
  const toggleModal = () => setIsModalOpen(!isModalOpen)
  const toggleForm = () => setIsSignUp(!isSignUp)

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('');
    if(formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
    }
    try{
        const response = await axios.post('http://localhost:8080/api/users/signup', formData);
        console.log('Sign up successfully:', response.data);
        alert('Sign in successfully!');
        navigate('/dashboard');
    }catch(error) {
        console.error('Sign up failed:', error);
        setError('Sign up failed');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try{
        const response = await axios.post('http://localhost:8080/api/users/login', {
          email, 
          password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Sign in successfully:', response.data);
        navigate('/dashboard');
        alert('Sign in successfully!');
    }catch(error) {
        console.error('Sign in failed:', error);
        setError('Sign in failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
      <ParticleBackground />
      <header className="w-full px-4 py-4 lg:py-6 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/src/images/HomepageLogo.png?height=40&width=40" alt="SavorSpace Logo" className="w-8 h-8 lg:w-10 lg:h-10" />
            <h1 className="ml-2 text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              SavorSpace
            </h1>
          </motion.div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="#"
                    className={`text-sm lg:text-base text-gray-600 hover:text-pink-500 transition-colors ${
                      activeNavItem === item ? 'text-pink-500 font-semibold' : ''
                    }`}
                    onClick={() => setActiveNavItem(item)}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center">
            <motion.button 
              className="mr-2 lg:mr-4 text-gray-600 hover:text-pink-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5 lg:w-6 lg:h-6" />
            </motion.button>
            <motion.button 
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm lg:text-base px-3 py-1 lg:px-4 lg:py-2 rounded-full hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleModal}
            >
              Sign up
            </motion.button>
            <button 
              className="ml-2 lg:ml-4 md:hidden text-gray-600 hover:text-pink-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.nav 
            className="mt-4 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`block py-2 text-gray-600 hover:text-pink-500 transition-colors ${
                      activeNavItem === item ? 'text-pink-500 font-semibold' : ''
                    }`}
                    onClick={() => {
                      setActiveNavItem(item)
                      setIsMenuOpen(false)
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </header>

      <main className="flex-grow flex items-center justify-center w-full px-4 py-8 lg:py-16 relative z-10">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center">
          <motion.div 
            className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              SAVOR THE<br />MOMENT
            </h2>
            <p className="text-gray-600 mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg">
              Embark on a culinary journey with SavorSpace. Discover exquisite recipes, connect with food enthusiasts, and elevate your dining experience to new heights.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button 
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-shadow text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Flavors
              </motion.button>
              <motion.button 
                className="border border-pink-500 text-pink-500 px-6 py-3 rounded-full hover:bg-pink-50 transition-colors text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Community
              </motion.button>
            </div>
          </motion.div>
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative w-full max-w-md">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.img 
                src="/src/images/Homepage.jpg?height=400&width=400" 
                alt="Delicious Dish" 
                className="relative z-10 rounded-full shadow-2xl w-full h-auto"
                animate={controls}
              />
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-between items-start">
            <div className="w-full sm:w-1/2 lg:w-1/3 mb-6 lg:mb-0">
              <h3 className="text-xl lg:text-2xl font-bold mb-2">SavorSpace</h3>
              <p className="text-gray-400 text-sm lg:text-base">Elevating your culinary journey, one recipe at a time.</p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 mb-6 lg:mb-0">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors text-sm lg:text-base">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
              <div className="flex space-x-4">
                <motion.a href="#" className="text-gray-400 hover:text-pink-400 transition-colors" whileHover={{ scale: 1.2 }}>
                  <Github className="w-5 h-5 lg:w-6 lg:h-6" />
                </motion.a>
                <motion.a href="#" className="text-gray-400 hover:text-pink-400 transition-colors" whileHover={{ scale: 1.2 }}>
                  <Twitter className="w-5 h-5 lg:w-6 lg:h-6" />
                </motion.a>
                <motion.a href="#" className="text-gray-400 hover:text-pink-400 transition-colors" whileHover={{ scale: 1.2 }}>
                  <Linkedin className="w-5 h-5 lg:w-6 lg:h-6" />
                </motion.a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p className="text-sm lg:text-base">&copy; 2024 SavorSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-lg shadow-xl max-w-md  w-full overflow-hidden"
            >
              <div className="relative p-6">
                <button
                  onClick={toggleModal}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                  {isSignUp ? 'Create an Account' : 'Welcome Back'}
                </h2>
                <form className="space-y-4" onSubmit={isSignUp ? handleSignup : handleSignIn}>
                  {isSignUp && (
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Your username"
                          value={formData.username}
                          onChange= {handleChange}
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange= {handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange= {handleChange}
                      />
                    </div>
                  </div>
                  {isSignUp && (
                    <>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange= {handleChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                          Profile Image URL
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Image className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="imageURL"
                            id="imageURL"
                            placeholder="https://example.com/your-image.jpg"
                            className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            onChange={handleChange}
                            value={formData.imageURL}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                  <motion.button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </motion.button>
                </form>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <motion.a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button onClick={handleRedirect} className="text-sm text-pink-600 hover:text-pink-500">
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Homepage