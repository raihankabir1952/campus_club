"use client";
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

export default function EditMember() {
    const { id } = useParams();
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        gender: 'male',
        dob: '',
        // profile fields
        age: '',
        location: '',
        bio: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                // member data fetch
                const response = await axios.get(`http://localhost:5000/api/member/${id}`);
                const data = response.data;
                
                setFormData({
                    name: data.name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    password: '', 
                    gender: data.gender || 'male',
                    dob: data.dob ? data.dob.split('T')[0] : '',
                    // প্রোফাইল ডাটা সেট করা
                    age: data.profile?.age || '',
                    location: data.profile?.location || '',
                    bio: data.profile?.bio || ''
                });
                setLoading(false);
            } catch (err) {
                setError("Failed to load data.");
                setLoading(false);
            }
        };
        if (id) fetchMemberData();
    }, [id]);

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // member data update (PUT)
            const memberPayload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                gender: formData.gender,
                dob: formData.dob ? new Date(formData.dob).toISOString() : undefined
            };
            await axios.put(`http://localhost:5000/api/member/${id}`, memberPayload);

            // profile data update (PATCH)
            const profilePayload = {
                age: Number(formData.age),
                location: formData.location,
                bio: formData.bio
            };
            await axios.patch(`http://localhost:5000/api/member/${id}/profile`, profilePayload);

            alert("Member and Profile updated successfully!");
            router.push(`/member/${id}`); 
        } catch (err: any) {
            const msg = err.response?.data?.message || "Update failed!";
            setError(Array.isArray(msg) ? msg.join(", ") : msg);
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading Data...</p>;

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Edit Full Profile</h2>
            
            {error && (
                <div style={{ color: 'white', background: '#e74c3c', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                    {error}
                </div>
            )}
            
            <form onSubmit={handleUpdate}>
                {/* Basic Section */}
                <h4 style={{ color: '#3498db', borderBottom: '1px solid #eee' }}>Basic Info</h4>
                <label>Full Name:</label>
                <input type="text" value={formData.name} style={inputStyle} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <label>Gender:</label>
                        <select value={formData.gender} style={inputStyle} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label>Date of Birth:</label>
                        <input type="date" value={formData.dob} style={inputStyle} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
                    </div>
                </div>

                {/* Profile Section */}
                <h4 style={{ color: '#2ecc71', borderBottom: '1px solid #eee', marginTop: '20px' }}>Profile Info (One-to-One)</h4>
                <label>Age:</label>
                <input type="number" value={formData.age} style={inputStyle} onChange={(e) => setFormData({...formData, age: e.target.value})} />
                
                <label>Location:</label>
                <input type="text" value={formData.location} style={inputStyle} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                
                <label>Bio:</label>
                <textarea value={formData.bio} style={{ ...inputStyle, height: '60px' }} onChange={(e) => setFormData({...formData, bio: e.target.value})} />

                <label style={{ color: '#e67e22', fontWeight: 'bold' }}>Current Password (Required to save):</label>
                <input type="password" value={formData.password} style={inputStyle} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                
                <button type="submit" style={buttonStyle}>Save All Changes</button>
                <button type="button" onClick={() => router.back()} style={{ ...buttonStyle, background: '#95a5a6', marginTop: '10px' }}>Cancel</button>
            </form>
        </div>
    );
}

const inputStyle = { display: 'block', width: '100%', marginBottom: '12px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' as const };
const buttonStyle = { width: '100%', padding: '12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' as const };
