import React, { useState, useEffect, useContext } from 'react';
import Messages from './Messages';
import SearchNewMessage from './SearchNewMessage';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ChatContext } from '../../../../../contexts/chatContext/ChatContext';

export default function MessagesContainer(props) {
    const [openNewMessageButton, setOpenNewMessageButton] = useState(false);
    // eslint-disable-next-line react/prop-types
    let { clickMessagePopup,mobile } = props;
    const clickNewMessageButton = () => {
        setOpenNewMessageButton(!openNewMessageButton);
    };
    let { loadChats } = useContext(ChatContext);
    useEffect(() => {
        loadChats();
    }, []);
    return (
        <>
            {/*header of message popup contains name and new message button */}
            <div className="popup-header">
                {/*TODO MAKE IT BY USEr name */}
                {/*TODO MAKE loading icon */}

                {/*TODO implement icon back function */}
                <span>
                    <NavLink to="/dashboard">
                        <i className="fas fa-angle-left"></i>
                    </NavLink>
                </span>
                <h3>gaser ashraf</h3>
                {!openNewMessageButton ? (
                    <button onClick={clickNewMessageButton}>new message</button>
                ) : (
                    <button onClick={clickNewMessageButton} className="never">
                        nevermind
                    </button>
                )}
                {/*TODO implement new message function */}
                <span>
                    <NavLink to="/messaging/new">
                        <i className="fas fa-comment-dots"></i>
                    </NavLink>
                </span>
            </div>

            {/*if not click on new message button then show the messages else show the search users*/}
            {!openNewMessageButton ? (
                <Messages clickMessagePopup={clickMessagePopup} mobile={mobile} />
            ) : (
                <SearchNewMessage />
            )}
        </>
    );
}
PropTypes.propTypes = {
    clickMessagePopup: PropTypes.func.isRequired,
    mobile:PropTypes.bool
};
