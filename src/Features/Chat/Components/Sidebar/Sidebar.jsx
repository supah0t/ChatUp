import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../Context/Auth';

import './Sidebar.css';

export default function Sidebar(props) {
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const { users, currentUser } = props;

    async function handleSignOut() {
        await signOut();
        navigate('/');
    }

    return (
        <div className="sidebar">
            <p>Signed in as {currentUser}</p>
            <div className="gap-20" />
            <button onClick={handleSignOut}>Sign out</button>
            <div className="gap-20" />
            <span>Online users:</span>
            <ul>
                {users.length !== 0 ? (
                    users.map(user => {
                        return <li key={user[0]}>{user}</li>;
                    })
                ) : (
                    <div>None</div>
                )}
            </ul>
        </div>
    );
}
