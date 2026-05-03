import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('vedatrust_currentUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Standardize name property
            if (parsedUser.fullName && !parsedUser.name) {
                parsedUser.name = parsedUser.fullName;
            }
            setUser(parsedUser);
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('vedatrust_currentUser', JSON.stringify(userData));
        if (token) localStorage.setItem('vedatrust_token', token);
        setUser(userData);
    };

    const updateUser = (updatedData) => {
        const newUser = { ...user, ...updatedData };
        localStorage.setItem('vedatrust_currentUser', JSON.stringify(newUser));
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('vedatrust_currentUser');
        localStorage.removeItem('vedatrust_token');
        setUser(null);
    };

    return { user, loading, login, logout, updateUser, isAuthenticated: !!user };
};
