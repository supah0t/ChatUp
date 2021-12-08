import React, { useState } from 'react';

import supabase from '../../Client/supabaseClient';
import { useAuth } from '../../Context/Auth';
import FancyButton from './FancyButton';
import './InputArea.css';

export default function InputArea() {
    const [message, setMessage] = useState({ user: '', post: '' });

    const { user } = useAuth();

    async function createMessage() {
        if (message.post == '') {
            console.log('no text');
            return;
        }

        try {
            await supabase
                .from('Messages')
                .insert([
                    {
                        user: user.email,
                        post: message.post,
                        timestamp: generateTimeStamp(),
                    },
                ])
                .single();
        } catch (error) {
            console.log(error);
        }
        setMessage({ user: user, post: '' });
    }

    function generateTimeStamp() {
        return new Date().toISOString();
    }

    return (
        <div className="input-area">
            <textarea
                className="text-area"
                placeholder="Message..."
                value={message.post}
                onChange={e => setMessage({ ...message, post: e.target.value })}
            />
            <FancyButton createMessage={createMessage} />
        </div>
    );
}
