import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/Auth';

import supabase from '../Client/supabaseClient';
import Sidebar from './Sidebar/Sidebar';
import ChatArea from './ChatArea/ChatArea';
import InputArea from './InputArea/InputArea';

import './Chat.css';

export default function Chat() {
    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([]);
    const [splitMessages, setSplitMessages] = useState([]);

    const { user } = useAuth();

    useEffect(() => {
        SetUpData();
    }, [user]);

    useEffect(() => {
        setSplitMessages(handleMessages(messages));
    }, [messages]);

    async function SetUpData() {
        fetchMessages();
        setUsername(user.email);
        //fetchUsers();
        supabase
            .from('Messages')
            .on('INSERT', payload => {
                setMessages(prev => [...prev, payload.new]);
            })
            .subscribe();
    }

    //Fetches the username of the current user from database, not necessary now
    //async function fetchUsers() {
    //const { data } = await supabase
    //.from('profiles')
    //.select('*')
    //.eq('id', user.id);
    //setUsername(data[0].username);
    //}

    async function fetchMessages() {
        const { data } = await supabase.from('Messages').select();
        setMessages(data);
        setSplitMessages(handleMessages(data));
    }

    //function to return an array of messages for each user in the chat
    function handleMessages(messageArray) {
        let currentUser;
        let counter = -1;
        let finalArray = [];
        messageArray.forEach(msg => {
            if (msg.user === currentUser) {
                finalArray[counter].push(msg);
            } else {
                currentUser = msg.user;
                finalArray.push([msg]);
                counter++;
            }
        });
        return finalArray;
    }

    return (
        <div className="messaging-layout">
            {username !== '' ? (
                <>
                    <Sidebar users={['john', 'mark']} currentUser={username} />
                    <ChatArea currentUser={username} messages={splitMessages} />
                    <br />
                    <InputArea />
                </>
            ) : (
                <div />
            )}
        </div>
    );
}
