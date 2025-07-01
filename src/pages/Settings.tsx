
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Settings as SettingsIcon, Users, Database, FileText, Bell } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'ProMaster Dive Center',
    currency: 'EGP',
    timezone: 'UTC+2',
    dateFormat: 'DD/MM/YYYY',
    language: 'English',
    notifications: true,
    autoBackup: true,
    backupFrequency: 'daily'
  });

  const [users] = useState([
    { id: '1', username: 'Admin', role: 'admin', lastLogin: '2024-01-15' },
    { id: '2', username: 'Owner', role: 'owner', lastLogin: '2024-01-14' },
    { id: '3', username: 'Office', role: 'office', lastLogin: '2024-01-15' }
  ]);

  const handleSettingsChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const exportData = () => {
    // Mock data export
    console.log('Exporting system data...');
    alert('Data export feature will be implemented with backend integration');
  };

  const backupDatabase = () => {
    // Mock backup
    console.log('Creating database backup...');
    alert('Database backup feature will be implemented with backend integration');
  };

  const sections = [
    { id: 'general', label: 'General Settings', icon: SettingsIcon },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'reports', label: 'Report Settings', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="dive-card p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Settings</h1>
        <p className="text-gray-600">Configure system preferences and manage users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="dive-card">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeSection === 'general' && (
            <Card className="dive-card">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => handleSettingsChange('companyName', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingsChange('currency', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="EGP">Egyptian Pound (EGP)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingsChange('timezone', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="UTC+2">UTC+2 (Cairo)</option>
                      <option value="UTC+0">UTC+0 (London)</option>
                      <option value="UTC-5">UTC-5 (New York)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => handleSettingsChange('dateFormat', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'users' && (
            <Card className="dive-card">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-3 text-left">Username</th>
                        <th className="border border-gray-200 p-3 text-left">Role</th>
                        <th className="border border-gray-200 p-3 text-left">Last Login</th>
                        <th className="border border-gray-200 p-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((userItem) => (
                        <tr key={userItem.id} className="hover:bg-gray-50">
                          <td className="border border-gray-200 p-3 font-medium">{userItem.username}</td>
                          <td className="border border-gray-200 p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              userItem.role === 'admin' ? 'bg-red-100 text-red-800' :
                              userItem.role === 'owner' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {userItem.role.charAt(0).toUpperCase() + userItem.role.slice(1)}
                            </span>
                          </td>
                          <td className="border border-gray-200 p-3">{userItem.lastLogin}</td>
                          <td className="border border-gray-200 p-3">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    User management features will be fully implemented with backend integration.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'data' && (
            <Card className="dive-card">
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Database Backup</h3>
                    <p className="text-sm text-gray-600 mb-4">Create a backup of all financial data</p>
                    <Button onClick={backupDatabase} className="w-full">
                      Create Backup
                    </Button>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Export Data</h3>
                    <p className="text-sm text-gray-600 mb-4">Export transactions and reports</p>
                    <Button onClick={exportData} variant="outline" className="w-full">
                      Export Data
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.autoBackup}
                        onChange={(e) => handleSettingsChange('autoBackup', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm font-medium">Enable Auto Backup</span>
                    </label>
                  </div>
                  {settings.autoBackup && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                      <select
                        value={settings.backupFrequency}
                        onChange={(e) => handleSettingsChange('backupFrequency', e.target.value)}
                        className="w-full md:w-48 p-2 border border-gray-300 rounded-md"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'reports' && (
            <Card className="dive-card">
              <CardHeader>
                <CardTitle>Report Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Default Report Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Include company logo in reports</label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Show currency conversion rates</label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Include detailed transaction list</label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card className="dive-card">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={(e) => handleSettingsChange('notifications', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm font-medium">Enable Notifications</span>
                    </label>
                  </div>
                  
                  {settings.notifications && (
                    <div className="ml-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Daily summary reports</label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Large transaction alerts</label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Low cash flow warnings</label>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
