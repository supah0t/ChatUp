import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '../../Client/supabaseClient';
import { useAuth } from '../../Context/Auth';

export default function Signup() {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/chat');
        }
    }, []);

    async function signInWithGithub() {
        const { user, session, error } = await supabase.auth.signIn(
            {
                provider: 'github',
            },
            {
                redirectTo: window.location.origin + '/chat',
            }
        );

        if (error) {
            alert('error logging in with github');
        }
    }

    return (
        <>
            <button onClick={signInWithGithub}>Sign in with github</button>
        </>
    );
}
