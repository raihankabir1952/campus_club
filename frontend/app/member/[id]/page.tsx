"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function MemberDetails() {
    const { id } = useParams();
    const [member, setMember] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    //profile form states
    const [profileForm, setProfileForm] = useState({ age: '', location: '', bio: '' });
    const [showProfileForm, setShowProfileForm] = useState(false);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/member/${id}`);
            setMember(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching member details:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchDetails();
    }, [id]);

    // profile save
    const handleAddProfile = async () => {
        if (!profileForm.age || !profileForm.location) {
            alert("Age and Location are required!");
            return;
        }
        try {
            // backend post request
            await axios.post(`http://localhost:5000/api/member/${id}/profile`, {
                age: Number(profileForm.age), 
                location: profileForm.location,
                bio: profileForm.bio
            });
            alert("Profile added successfully!");
            setShowProfileForm(false);
            fetchDetails(); // new data refress
        } catch (err) {
            alert("Failed to add profile. Check if it already exists.");
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading Profile Details...</p>;
    if (!member) return <p style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Member Not Found!</p>;

    return (
        <div style={{ maxWidth: '700px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px' }}>
                Full Member Information
            </h2>

            {/* Basic Details */}
            <section style={sectionStyle}>
                <h3 style={subHeaderStyle}>Basic Details</h3>
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Phone:</strong> {member.phone}</p>
                <p><strong>Gender:</strong> {member.gender}</p>
                <p><strong>Date of Birth:</strong> {member.dob ? new Date(member.dob).toLocaleDateString('en-GB') : 'Not provided'}</p>
            </section>

            {/* Profile Info (One-to-One) */}
            <section style={sectionStyle}>
                <h3 style={subHeaderStyle}>Profile Details</h3>
                {member.profile ? (
                    <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #2ecc71' }}>
                        <p><strong>Age:</strong> {member.profile.age}</p>
                        <p><strong>Location:</strong> {member.profile.location}</p>
                        <p><strong>Bio:</strong> {member.profile.bio || 'No bio added'}</p>
                    </div>
                ) : (
                    <div>
                        <p style={{ color: '#e67e22' }}>No profile found for this member.</p>
                        {!showProfileForm && (
                            <button 
                                onClick={() => setShowProfileForm(true)} 
                                style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                + Create Profile
                            </button>
                        )}
                    </div>
                )}

                {/* profile form */}
                {showProfileForm && (
                    <div style={{ marginTop: '15px', padding: '20px', border: '1px dashed #ccc', borderRadius: '8px' }}>
                        <h4 style={{ marginBottom: '10px' }}>Create New Profile</h4>
                        <input 
                            type="number"
                            placeholder="Age" 
                            style={inputStyle} 
                            value={profileForm.age}
                            onChange={(e) => setProfileForm({...profileForm, age: e.target.value})} 
                        />
                        <input 
                            placeholder="Location (City, Country)" 
                            style={inputStyle} 
                            value={profileForm.location}
                            onChange={(e) => setProfileForm({...profileForm, location: e.target.value})} 
                        />
                        <textarea 
                            placeholder="Brief Bio" 
                            style={{ ...inputStyle, height: '80px' }} 
                            value={profileForm.bio}
                            onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})} 
                        />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={handleAddProfile} 
                                style={{ flex: 1, background: '#3498db', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                Save Profile
                            </button>
                            <button 
                                onClick={() => setShowProfileForm(false)} 
                                style={{ flex: 1, background: '#e74c3c', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {/* Button Section */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button 
                    onClick={() => window.history.back()} 
                    style={{ padding: '12px 25px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Back
                </button>
                
                <Link href={`/member/${member.id}/edit`} style={{ 
                    padding: '12px 25px', 
                    background: '#f1c40f', 
                    color: '#000', 
                    textDecoration: 'none', 
                    borderRadius: '5px', 
                    fontWeight: 'bold'
                }}>
                    Edit Member
                </Link>
            </div>
        </div>
    );
}

const sectionStyle = { marginBottom: '25px' };
const subHeaderStyle = { color: '#3498db', marginBottom: '10px', borderBottom: '1px solid #eee' };
const inputStyle = { display: 'block', width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' as const };
