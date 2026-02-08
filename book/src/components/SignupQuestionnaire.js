import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, Save } from 'lucide-react';

const SignupQuestionnaire = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        software: 'Beginner',
        hardware: 'Beginner',
        interests: '',
        language: 'en'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // In a real app, this would call Better Auth signup then update UserProfile
        console.log('Saving User Profile:', formData);

        // Mock save to local storage or backend
        try {
            // await axios.post('http://localhost:8000/auth/profile', formData);
            localStorage.setItem('user_profile', JSON.stringify(formData));
            onComplete(formData);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '30px', backgroundColor: '#f4f7f6', borderRadius: '12px', maxWidth: '500px', margin: '50px auto', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#2e8555', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UserPlus /> Personalize Your Journey
            </h2>
            <p style={{ color: '#666' }}>Tell us about your background so we can tailor the textbook content for you.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Software Background</label>
                    <select
                        value={formData.software}
                        onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hardware Background</label>
                    <select
                        value={formData.hardware}
                        onChange={(e) => setFormData({ ...formData, hardware: e.target.value })}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Interests (e.g., Computer Vision, Walking, Manipulation)</label>
                    <input
                        type="text"
                        value={formData.interests}
                        onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                        placeholder="What excites you most?"
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{ backgroundColor: '#2e8555', color: 'white', padding: '12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                    <Save size={18} /> Start Learning
                </button>
            </form>
        </div>
    );
};

export default SignupQuestionnaire;
