import React, { useEffect, useRef, Fragment } from 'react';

import './ChatArea.css';

export default function ChatArea(props) {
    const { currentUser, messages } = props;

    const bottomRef = useRef(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView();
    };

    //TODO scroll only when the ref is in viewport
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="messages">
            {messages ? (
                messages.map(array => {
                    return (
                        <Fragment key={array[0].id + array[0].user}>
                            <p
                                className={
                                    array[0].user === currentUser
                                        ? 'mine username'
                                        : 'not-mine username'
                                }
                            >
                                {array[0].user}
                            </p>
                            {array.map(msg => {
                                return (
                                    <div
                                        onMouseEnter={() =>
                                            console.log(msg.timestamp)
                                        }
                                        key={msg.id}
                                        className={
                                            msg.user === currentUser
                                                ? 'mine message'
                                                : 'not-mine message'
                                        }
                                    >
                                        {msg.post}
                                    </div>
                                );
                            })}
                        </Fragment>
                    );
                })
            ) : (
                <div />
            )}
            <div ref={bottomRef} />
        </div>
    );
}
