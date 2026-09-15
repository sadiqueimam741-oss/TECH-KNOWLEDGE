'use client';

import { useState } from 'react';

export default function AdminCredentialsClient() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validate fields
      if (!formData.currentPassword.trim()) {
        setError('Current password is required');
        setIsLoading(false);
        return;
      }

      if (!formData.newUsername.trim()) {
        setError('New username is required');
        setIsLoading(false);
        return;
      }

      if (!formData.newPassword) {
        setError('New password is required');
        setIsLoading(false);
        return;
      }

      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      const res = await fetch('/api/admin/change-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newUsername: formData.newUsername,
          newPassword: formData.newPassword,
        }),
      });

      if (res.ok) {
        setSuccess('Credentials updated successfully. You will need to log in again with your new credentials.');
        setFormData({
          currentPassword: '',
          newUsername: '',
          newPassword: '',
          confirmPassword: '',
        });
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Change Admin Credentials</h2>
        <p className="text-gray-600 dark:text-gray-400">Update your admin username and password. You will need to log in again with your new credentials.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm">
            {success}
          </div>
        )}

        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
            Current Password *
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="input w-full"
            placeholder="Enter current password"
            required
            disabled={isLoading}
          />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">New Credentials</p>

          <div className="space-y-6">
            <div>
              <label htmlFor="newUsername" className="block text-sm font-medium mb-2">
                New Username *
              </label>
              <input
                type="text"
                id="newUsername"
                name="newUsername"
                value={formData.newUsername}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter new username"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                New Password *
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="input w-full"
                placeholder="Enter new password (min 6 characters)"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input w-full"
                placeholder="Confirm new password"
                required
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? 'Updating...' : 'Update Credentials'}
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg text-sm">
        <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Security Note</p>
        <p className="text-yellow-700 dark:text-yellow-300">
          After changing your credentials, you will be logged out and required to log in again with your new username and password. Make sure you save your new credentials in a secure location.
        </p>
      </div>
    </div>
  );
}
