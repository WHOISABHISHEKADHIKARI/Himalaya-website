import React, { useState, useContext, createContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaLock, FaUser, FaShieldAlt, FaSignOutAlt, FaClock } from 'react-icons/fa';

// Admin Authentication Context
const AdminAuthContext = createContext();

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error('useAdminAuth must be used within AdminAuthProvider');
    }
    return context;
};

 const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: '1254admin',
    role: 'super_admin'
};

// Admin Auth Provider
export const AdminAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionExpiry, setSessionExpiry] = useState(null);

    useEffect(() => {
        checkAuthStatus();
        // Set up session check interval
        const interval = setInterval(checkAuthStatus, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const checkAuthStatus = () => {
        const savedAuth = localStorage.getItem('admin_auth');
        if (savedAuth) {
            try {
                const authData = JSON.parse(savedAuth);
                if (authData.expires > Date.now()) {
                    setIsAuthenticated(true);
                    setUser(authData.user);
                    setSessionExpiry(authData.expires);
                } else {
                    // Session expired
                    logout();
                }
            } catch (error) {
                logout();
            }
        }
        setLoading(false);
    };

    const login = (username, password, rememberMe = false) => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            const userData = {
                username: ADMIN_CREDENTIALS.username,
                role: ADMIN_CREDENTIALS.role,
                loginTime: new Date().toISOString()
            };
            
            const sessionDuration = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 7 days or 24 hours
            const expiresAt = Date.now() + sessionDuration;
            
            const authData = {
                user: userData,
                expires: expiresAt,
                rememberMe: rememberMe
            };
            
            localStorage.setItem('admin_auth', JSON.stringify(authData));
            setIsAuthenticated(true);
            setUser(userData);
            setSessionExpiry(expiresAt);
            return { success: true };
        }
        return { success: false, error: 'Invalid credentials' };
    };

    const logout = () => {
        localStorage.removeItem('admin_auth');
        setIsAuthenticated(false);
        setUser(null);
        setSessionExpiry(null);
    };

    const extendSession = () => {
        const savedAuth = localStorage.getItem('admin_auth');
        if (savedAuth) {
            try {
                const authData = JSON.parse(savedAuth);
                const sessionDuration = authData.rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
                const newExpiresAt = Date.now() + sessionDuration;
                
                const updatedData = {
                    ...authData,
                    expires: newExpiresAt
                };
                
                localStorage.setItem('admin_auth', JSON.stringify(updatedData));
                setSessionExpiry(newExpiresAt);
            } catch (error) {
                logout();
            }
        }
    };

    const getTimeUntilExpiry = () => {
        if (!sessionExpiry) return null;
        const timeLeft = sessionExpiry - Date.now();
        return timeLeft > 0 ? timeLeft : 0;
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
        loading,
        sessionExpiry,
        extendSession,
        getTimeUntilExpiry
    };

    return (
        <AdminAuthContext.Provider value={value}>
            {children}
        </AdminAuthContext.Provider>
    );
};

// Admin Login Component
export const AdminLogin = ({ onLogin }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAdminAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const result = login(formData.username, formData.password, rememberMe);
        
        if (result.success) {
            onLogin && onLogin();
        } else {
            setError(result.error);
        }
        
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1C4E37] via-[#2D5A3D] to-[#1C4E37] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="bg-[#1C4E37] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaShieldAlt className="text-white text-2xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h1>
                    <p className="text-gray-600">Access the CMS Dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                                placeholder="Enter password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 text-[#1C4E37] focus:ring-[#1C4E37] border-gray-300 rounded"
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                            Remember me for 7 days
                        </label>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-50 border border-red-200 rounded-lg p-3"
                            >
                                <p className="text-red-600 text-sm">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1C4E37] text-white py-3 rounded-lg hover:bg-[#164A32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>

            
            </motion.div>
        </div>
    );
};

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAdminAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#1C4E37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return children;
};

// Session Status Component
export const SessionStatus = () => {
    const { user, sessionExpiry, getTimeUntilExpiry, extendSession, logout } = useAdminAuth();
    const [timeLeft, setTimeLeft] = useState(null);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const updateTimer = () => {
            const remaining = getTimeUntilExpiry();
            setTimeLeft(remaining);
            
            // Show warning when less than 30 minutes left
            const thirtyMinutes = 30 * 60 * 1000;
            setShowWarning(remaining && remaining < thirtyMinutes);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [sessionExpiry, getTimeUntilExpiry]);

    const formatTimeLeft = (ms) => {
        if (!ms) return '';
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

    if (!user || !timeLeft) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${
                showWarning 
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                    : 'bg-green-100 text-green-800 border border-green-300'
            }`}
        >
            <FaClock className={showWarning ? 'text-yellow-600' : 'text-green-600'} />
            <span>
                Session expires in {formatTimeLeft(timeLeft)}
            </span>
            {showWarning && (
                <button
                    onClick={extendSession}
                    className="ml-2 px-3 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 transition-colors"
                >
                    Extend
                </button>
            )}
        </motion.div>
    );
};

// Enhanced Logout Button Component
export const LogoutButton = ({ className = '', showText = true }) => {
    const { logout, user } = useAdminAuth();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleLogout = () => {
        logout();
        setShowConfirm(false);
    };

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                className={`flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${className}`}
            >
                <FaSignOutAlt />
                {showText && 'Logout'}
            </button>

            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setShowConfirm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-lg p-6 max-w-sm mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Confirm Logout
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to logout, {user?.username}?
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AdminAuthProvider;