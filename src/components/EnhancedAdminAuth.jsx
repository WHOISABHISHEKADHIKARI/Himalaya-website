import React, { useState, useContext, createContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEye, FaEyeSlash, FaLock, FaUser, FaShieldAlt, 
  FaSignOutAlt, FaClock, FaExclamationTriangle,
  FaCheckCircle, FaTimesCircle, FaKey
} from 'react-icons/fa';

// Enhanced Admin Authentication Context
const EnhancedAdminAuthContext = createContext();

export const useEnhancedAdminAuth = () => {
  const context = useContext(EnhancedAdminAuthContext);
  if (!context) {
    throw new Error('useEnhancedAdminAuth must be used within EnhancedAdminAuthProvider');
  }
  return context;
};

// User roles and permissions
const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin', 
  EDITOR: 'editor',
  CONTRIBUTOR: 'contributor'
};

const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: ['*'], // All permissions
  [USER_ROLES.ADMIN]: [
    'posts.create', 'posts.edit', 'posts.delete', 'posts.publish',
    'media.upload', 'media.delete', 'comments.moderate',
    'users.view', 'settings.edit'
  ],
  [USER_ROLES.EDITOR]: [
    'posts.create', 'posts.edit', 'posts.publish',
    'media.upload', 'comments.moderate'
  ],
  [USER_ROLES.CONTRIBUTOR]: [
    'posts.create', 'posts.edit', 'media.upload'
  ]
};

// Demo users with different roles
const DEMO_USERS = [
  {
    id: '1',
    username: 'admin',
    password: '1254admin',
    email: 'admin@himalaya.com',
    role: USER_ROLES.SUPER_ADMIN,
    name: 'Super Admin',
    isActive: true
  },
  {
    id: '2', 
    username: 'editor',
    password: 'editor123',
    email: 'editor@himalaya.com',
    role: USER_ROLES.EDITOR,
    name: 'Content Editor',
    isActive: true
  },
  {
    id: '3',
    username: 'contributor',
    password: 'contrib123', 
    email: 'contributor@himalaya.com',
    role: USER_ROLES.CONTRIBUTOR,
    name: 'Content Contributor',
    isActive: true
  }
];

// Enhanced Admin Auth Provider
export const EnhancedAdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockExpiry, setLockExpiry] = useState(null);

  useEffect(() => {
    checkAuthStatus();
    // Set up session check interval
    const interval = setInterval(checkAuthStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check if account is locked
    const lockData = localStorage.getItem('admin_lock');
    if (lockData) {
      const { attempts, lockUntil } = JSON.parse(lockData);
      if (lockUntil && Date.now() < lockUntil) {
        setIsLocked(true);
        setLockExpiry(lockUntil);
        setLoginAttempts(attempts);
      } else {
        // Lock expired, clear it
        localStorage.removeItem('admin_lock');
        setIsLocked(false);
        setLoginAttempts(0);
      }
    }
  }, []);

  const checkAuthStatus = () => {
    const savedAuth = localStorage.getItem('admin_auth_enhanced');
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
        console.error('Auth check failed:', error);
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (username, password, rememberMe = false) => {
    // Check if account is locked
    if (isLocked && lockExpiry && Date.now() < lockExpiry) {
      const timeLeft = Math.ceil((lockExpiry - Date.now()) / 1000 / 60);
      throw new Error(`Account locked. Try again in ${timeLeft} minutes.`);
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user
    const foundUser = DEMO_USERS.find(u => 
      u.username === username && u.password === password && u.isActive
    );

    if (!foundUser) {
      // Increment login attempts
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      // Lock account after 5 failed attempts
      if (newAttempts >= 5) {
        const lockUntil = Date.now() + (30 * 60 * 1000); // 30 minutes
        localStorage.setItem('admin_lock', JSON.stringify({
          attempts: newAttempts,
          lockUntil
        }));
        setIsLocked(true);
        setLockExpiry(lockUntil);
        throw new Error('Too many failed attempts. Account locked for 30 minutes.');
      }

      // Store failed attempts
      localStorage.setItem('admin_lock', JSON.stringify({
        attempts: newAttempts,
        lockUntil: null
      }));

      throw new Error(`Invalid credentials. ${5 - newAttempts} attempts remaining.`);
    }

    // Successful login - clear attempts
    localStorage.removeItem('admin_lock');
    setLoginAttempts(0);
    setIsLocked(false);
    setLockExpiry(null);

    const userData = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
      name: foundUser.name,
      loginTime: new Date().toISOString(),
      permissions: ROLE_PERMISSIONS[foundUser.role] || []
    };
    
    const sessionDuration = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000; // 7 days or 8 hours
    const expiresAt = Date.now() + sessionDuration;
    
    const authData = {
      user: userData,
      expires: expiresAt,
      rememberMe,
      csrfToken: generateCSRFToken()
    };
    
    localStorage.setItem('admin_auth_enhanced', JSON.stringify(authData));
    setIsAuthenticated(true);
    setUser(userData);
    setSessionExpiry(expiresAt);
    
    return { success: true, user: userData };
  };

  const logout = () => {
    localStorage.removeItem('admin_auth_enhanced');
    setIsAuthenticated(false);
    setUser(null);
    setSessionExpiry(null);
  };

  const extendSession = () => {
    const savedAuth = localStorage.getItem('admin_auth_enhanced');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        const sessionDuration = authData.rememberMe ? 7 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000;
        const newExpiresAt = Date.now() + sessionDuration;
        
        authData.expires = newExpiresAt;
        localStorage.setItem('admin_auth_enhanced', JSON.stringify(authData));
        setSessionExpiry(newExpiresAt);
        
        return true;
      } catch (error) {
        console.error('Session extension failed:', error);
        return false;
      }
    }
    return false;
  };

  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    if (user.permissions.includes('*')) return true; // Super admin
    return user.permissions.includes(permission);
  };

  const getTimeUntilExpiry = () => {
    if (!sessionExpiry) return null;
    const timeLeft = sessionExpiry - Date.now();
    return timeLeft > 0 ? timeLeft : 0;
  };

  const generateCSRFToken = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    sessionExpiry,
    extendSession,
    getTimeUntilExpiry,
    hasPermission,
    loginAttempts,
    isLocked,
    lockExpiry,
    USER_ROLES
  };

  return (
    <EnhancedAdminAuthContext.Provider value={value}>
      {children}
    </EnhancedAdminAuthContext.Provider>
  );
};

// Enhanced Admin Login Component
export const EnhancedAdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const { login, loginAttempts, isLocked, lockExpiry } = useEnhancedAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.username, formData.password, rememberMe);
      if (result.success && onLogin) {
        onLogin(result.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (userType) => {
    const demoUser = DEMO_USERS.find(u => u.role === userType);
    if (demoUser) {
      setFormData({ username: demoUser.username, password: demoUser.password });
      try {
        setLoading(true);
        const result = await login(demoUser.username, demoUser.password, rememberMe);
        if (result.success && onLogin) {
          onLogin(result.user);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const getLockTimeRemaining = () => {
    if (!isLocked || !lockExpiry) return '';
    const timeLeft = Math.ceil((lockExpiry - Date.now()) / 1000 / 60);
    return `${timeLeft} minute${timeLeft !== 1 ? 's' : ''}`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Enhanced Admin Login</h1>
          <p className="text-gray-600">Secure access to CMS Dashboard</p>
        </div>

        {/* Security Status */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <FaShieldAlt className="text-blue-600" />
            <span className="font-medium text-blue-800">Security Features Active</span>
          </div>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Rate limiting protection</li>
            <li>• Account lockout after 5 failed attempts</li>
            <li>• Role-based access control</li>
            <li>• Session timeout protection</li>
          </ul>
        </div>

        {/* Lock Warning */}
        {isLocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <FaTimesCircle className="text-red-600" />
              <span className="font-medium text-red-800">Account Locked</span>
            </div>
            <p className="text-sm text-red-700">
              Too many failed login attempts. Try again in {getLockTimeRemaining()}.
            </p>
          </motion.div>
        )}

        {/* Login Attempts Warning */}
        {loginAttempts > 0 && loginAttempts < 5 && !isLocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <div className="flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-600" />
              <span className="text-sm text-yellow-800">
                {loginAttempts} failed attempt{loginAttempts !== 1 ? 's' : ''}. 
                {5 - loginAttempts} remaining before lockout.
              </span>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <div className="flex items-center gap-2">
              <FaTimesCircle className="text-red-600" />
              <span className="text-sm text-red-800">{error}</span>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                placeholder="Enter username"
                required
                disabled={isLocked}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E37] focus:border-transparent"
                placeholder="Enter password"
                required
                disabled={isLocked}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={isLocked}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#1C4E37] focus:ring-[#1C4E37] border-gray-300 rounded"
                disabled={isLocked}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me (7 days)</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || isLocked}
            className="w-full bg-[#1C4E37] text-white py-3 rounded-lg hover:bg-[#164A32] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6">
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showDemo ? 'Hide' : 'Show'} Demo Credentials
          </button>
          
          <AnimatePresence>
            {showDemo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2"
              >
                <div className="text-xs text-gray-600 mb-3">Click to quick login:</div>
                
                <button
                  onClick={() => quickLogin(USER_ROLES.SUPER_ADMIN)}
                  disabled={loading || isLocked}
                  className="w-full p-2 text-left bg-purple-50 hover:bg-purple-100 rounded border border-purple-200 transition-colors disabled:opacity-50"
                >
                  <div className="font-medium text-purple-800">Super Admin</div>
                  <div className="text-xs text-purple-600">admin / 1254admin</div>
                </button>
                
                <button
                  onClick={() => quickLogin(USER_ROLES.EDITOR)}
                  disabled={loading || isLocked}
                  className="w-full p-2 text-left bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors disabled:opacity-50"
                >
                  <div className="font-medium text-blue-800">Editor</div>
                  <div className="text-xs text-blue-600">editor / editor123</div>
                </button>
                
                <button
                  onClick={() => quickLogin(USER_ROLES.CONTRIBUTOR)}
                  disabled={loading || isLocked}
                  className="w-full p-2 text-left bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors disabled:opacity-50"
                >
                  <div className="font-medium text-green-800">Contributor</div>
                  <div className="text-xs text-green-600">contributor / contrib123</div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// Enhanced Protected Route Component
export const EnhancedProtectedRoute = ({ children, requiredPermission = null }) => {
  const { isAuthenticated, loading, hasPermission } = useEnhancedAdminAuth();

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
    return <EnhancedAdminLogin />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <FaTimesCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this resource.</p>
        </div>
      </div>
    );
  }

  return children;
};

// Enhanced Session Status Component
export const EnhancedSessionStatus = () => {
  const { user, sessionExpiry, getTimeUntilExpiry, extendSession, logout } = useEnhancedAdminAuth();
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

  const getRoleColor = (role) => {
    const colors = {
      [USER_ROLES.SUPER_ADMIN]: 'bg-purple-100 text-purple-800',
      [USER_ROLES.ADMIN]: 'bg-blue-100 text-blue-800',
      [USER_ROLES.EDITOR]: 'bg-green-100 text-green-800',
      [USER_ROLES.CONTRIBUTOR]: 'bg-yellow-100 text-yellow-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  if (!user || !timeLeft) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${
        showWarning ? 'bg-yellow-100 border border-yellow-300' : 'bg-white border border-gray-200'
      }`}
    >
      <div className="flex items-center gap-2">
        <FaUser className="text-gray-600" />
        <span className="font-medium">{user.name}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
          {user.role.replace('_', ' ').toUpperCase()}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <FaClock className={showWarning ? 'text-yellow-600' : 'text-gray-500'} />
        <span className={showWarning ? 'text-yellow-800 font-medium' : 'text-gray-600'}>
          {formatTimeLeft(timeLeft)}
        </span>
        
        {showWarning && (
          <button
            onClick={extendSession}
            className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600 transition-colors"
          >
            Extend
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Enhanced Logout Button Component
export const EnhancedLogoutButton = ({ className = '', showText = true }) => {
  const { logout, user } = useEnhancedAdminAuth();
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
              <div className="flex items-center gap-3 mb-4">
                <FaExclamationTriangle className="text-yellow-500 text-xl" />
                <h3 className="font-semibold">Confirm Logout</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout? Any unsaved changes will be lost.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
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

// Permission Check Component
export const PermissionGate = ({ permission, children, fallback = null }) => {
  const { hasPermission } = useEnhancedAdminAuth();
  
  if (!hasPermission(permission)) {
    return fallback;
  }
  
  return children;
};

export default {
  EnhancedAdminAuthProvider,
  useEnhancedAdminAuth,
  EnhancedAdminLogin,
  EnhancedProtectedRoute,
  EnhancedSessionStatus,
  EnhancedLogoutButton,
  PermissionGate,
  USER_ROLES
};