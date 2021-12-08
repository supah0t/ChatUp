import supabase from '../../Client/supabaseClient';

export default function Signup() {
    async function signInWithGithub() {
        const { user, session, error } = await supabase.auth.signIn(
            {
                provider: 'github',
            },
            {
                redirectTo: 'http://localhost:3000/chat',
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
