import { createContext, useContext, useState, useEffect } from 'react';
import { adminService } from '../../services';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.users.getAllUsers();
      if (response.data && response.data.status === 'SUCCESS') {
        setUsers(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      setLoading(true);
      const response = await adminService.users.createUser(userData);
      if (response.data && response.data.status === 'SUCCESS') {
        await fetchUsers();
        return true;
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error(error.response?.data?.message || 'Failed to create user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      setLoading(true);
      const response = await adminService.users.updateUser(userId, userData);
      if (response.data && response.data.status === 'SUCCESS') {
        await fetchUsers();
        return true;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(error.response?.data?.message || 'Failed to update user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId, statusData) => {
    try {
      setLoading(true);
      const response = await adminService.users.updateUserStatus(userId, statusData);
      if (response.data && response.data.status === 'SUCCESS') {
        await fetchUsers();
        return true;
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error(error.response?.data?.message || 'Failed to update user status');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const suspendUser = async (userId) => {
    try {
      setLoading(true);
      const response = await adminService.users.suspendUser(userId);
      if (response.data && response.data.status === 'SUCCESS') {
        await fetchUsers();
        return true;
      }
    } catch (error) {
      console.error('Error suspending user:', error);
      toast.error(error.response?.data?.message || 'Failed to suspend user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      const response = await adminService.users.deleteUser(userId);
      if (response.data && response.data.status === 'SUCCESS') {
        await fetchUsers();
        return true;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error.response?.data?.message || 'Failed to delete user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getUserById = (userId) => {
    return users.find(u => u.userId === userId);
  };

  const value = {
    users,
    loading,
    createUser,
    updateUser,
    updateUserStatus,
    suspendUser,
    deleteUser,
    getUserById,
    fetchUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};