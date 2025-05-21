import { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [goalProtein, setGoalProtein] = useState('');
    const [goalCarbs, setGoalCarbs] = useState('');
    const [goalFat, setGoalFat] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://macro-tracker-api.onrender.com/users/', {
        email,
        password_hash: password,
        goal_protein: parseInt(goalProtein),
        goal_carbs: parseInt(goalCarbs),
        goal_fat: parseInt(goalFat)
        });

        setSuccessMessage('Account created successfully!');
        console.log(response.data);
    } catch (err) {
        console.error(err);
        setSuccessMessage('Signup failed. Check input or try again.');
    }
    };

    return (
    <div>
    <h2>Sign Up</h2>
    <form onSubmit={handleSignup}>
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        /><br />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        /><br />
        <input
        type="number"
        placeholder="Protein Goal (g)"
        value={goalProtein}
        onChange={e => setGoalProtein(e.target.value)}
        /><br />
        <input
        type="number"
        placeholder="Carbs Goal (g)"
        value={goalCarbs}
        onChange={e => setGoalCarbs(e.target.value)}
        /><br />
        <input
        type="number"
        placeholder="Fat Goal (g)"
        value={goalFat}
        onChange={e => setGoalFat(e.target.value)}
        /><br />
        <button type="submit">Create Account</button>
    </form>
    {successMessage && <p>{successMessage}</p>}
    </div>
    );
}

export default Signup;
