import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { Button, Card, Input } from '../components/UI';

const initialNgo = {
  name: '', tagline: '', description: '', location: '', address: '', latitude: '', longitude: '', email: '', phone: '', website: '', mainImage: '',
};

const initialRestaurant = {
  name: '', description: '', location: '', address: '', latitude: '', longitude: '', email: '', phone: '', website: '', image: '',
};

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [ngoForm, setNgoForm] = useState(initialNgo);
  const [restaurantForm, setRestaurantForm] = useState(initialRestaurant);
  const [message, setMessage] = useState('');

  const refresh = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data?.data?.user || null);
      setMessage('Profile refreshed.');
    } catch {
      setMessage('Unable to refresh profile.');
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const createNgo = async (e) => {
    e.preventDefault();
    try {
      await api.post('/ngos', ngoForm);
      setNgoForm(initialNgo);
      setMessage('NGO added successfully.');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to add NGO.');
    }
  };

  const createRestaurant = async (e) => {
    e.preventDefault();
    try {
      await api.post('/restaurants', restaurantForm);
      setRestaurantForm(initialRestaurant);
      setMessage('Restaurant added successfully.');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed to add restaurant.');
    }
  };

  return (
    <div className="space-y-4">
      {message ? <Card className="text-sm text-primary">{message}</Card> : null}

      <Card>
        <h2 className="text-xl font-bold text-primary">Profile</h2>
        <p className="mt-2 text-sm">Name: {user?.name}</p>
        <p className="text-sm">Email: {user?.email}</p>
        <p className="text-sm">Role: {user?.role || 'user'}</p>
        <Button className="mt-3" onClick={refresh}>Refresh User Data</Button>
      </Card>

      {user?.role === 'admin' ? (
        <>
          <Card>
            <h3 className="font-semibold text-primary">Add NGO</h3>
            <form className="mt-2 grid gap-2 md:grid-cols-2" onSubmit={createNgo}>
              {Object.keys(initialNgo).map((key) => (
                <Input
                  key={key}
                  placeholder={key}
                  value={ngoForm[key]}
                  onChange={(e) => setNgoForm((s) => ({ ...s, [key]: e.target.value }))}
                  required={['name', 'tagline', 'description', 'location', 'address', 'latitude', 'longitude', 'email', 'phone'].includes(key)}
                />
              ))}
              <Button className="md:col-span-2" type="submit">Add NGO</Button>
            </form>
          </Card>

          <Card>
            <h3 className="font-semibold text-primary">Add Restaurant</h3>
            <form className="mt-2 grid gap-2 md:grid-cols-2" onSubmit={createRestaurant}>
              {Object.keys(initialRestaurant).map((key) => (
                <Input
                  key={key}
                  placeholder={key}
                  value={restaurantForm[key]}
                  onChange={(e) => setRestaurantForm((s) => ({ ...s, [key]: e.target.value }))}
                  required={['name', 'location', 'address', 'latitude', 'longitude', 'email', 'phone'].includes(key)}
                />
              ))}
              <Button className="md:col-span-2" type="submit">Add Restaurant</Button>
            </form>
          </Card>
        </>
      ) : null}
    </div>
  );
}
