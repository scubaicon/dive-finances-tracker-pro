
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ocean-gradient">
      <div className="w-full max-w-md p-6">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-2xl">PM</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              ProMaster Dive Center
            </CardTitle>
            <CardDescription>
              Financial Management System
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="Enter your username"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="Enter your password"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full ocean-gradient hover:opacity-90"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
              <h4 className="font-medium text-gray-800 mb-2">Demo Credentials:</h4>
              <div className="space-y-1 text-gray-600">
                <p><strong>Admin:</strong> Admin / Promaster2025</p>
                <p><strong>Owner:</strong> Owner / Promaster2025</p>
                <p><strong>Office:</strong> Office / Promaster123456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
