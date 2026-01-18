"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
const [members, setMembers] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [isVerified, setIsVerified] = useState(false);
const router = useRouter();

// Step 1: Authentication Guard
useEffect(() => {
const user = localStorage.getItem('userEmail');
if (!user) {
router.push('/unauthorized');
} else {
setIsVerified(true);
fetchMembers();
}
}, [router]);

// Step 2: Axios GET Fetching  for dynamic update
const fetchMembers = async () => {
try {
const response = await axios.get('http://localhost:5000/api/member');
setMembers(response.data);
setLoading(false);
} 
catch (err) {
console.error("Fetch failed");
setLoading(false);
}
};

// Step 3: Axios DELETE Fetching
const handleDelete = async (id: number) => {
if (window.confirm("Delete this member?")) {
try {
await axios.delete(`http://localhost:5000/api/member/${id}`);
alert("Deleted!");
fetchMembers();
} 
catch (err) {
alert("Delete failed!");
}
}
};

if (!isVerified) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Verifying Access...</p>;
if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading Dashboard...</p>;

return (
<div style={{ padding: '30px' }}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

<h1 style={{  color: '#2233b0' }}>
    Dashboard
</h1>
<button onClick={() => 
    { localStorage.removeItem('userEmail'); 
    router.push('/login'); }} 
    style={{ background: 'red', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
</div>

<table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
<thead>
<tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
<th style={tableStyle}>ID</th>
<th style={tableStyle}>Name</th>
<th style={tableStyle}>Email</th>
<th style={tableStyle}>Actions</th>
</tr>
</thead>
<tbody>
{members.map((m: any) => (
<tr key={m.id}>
<td style={tableStyle}>{m.id}</td>
<td style={tableStyle}>{m.name}</td>
<td style={tableStyle}>{m.email}</td>
<td style={tableStyle}>
<Link href={`/member/${m.id}`} style={{ marginRight: '10px', color: 'blue' }}>View</Link>
<button onClick={() => handleDelete(m.id)} style={{ color: 'red', border: 'none', cursor: 'pointer', background: 'none' }}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
);
}
const tableStyle = { padding: '12px', borderBottom: '1px solid #ddd' };