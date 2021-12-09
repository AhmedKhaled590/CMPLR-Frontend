import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ChatContext } from '../../../contexts/chatContext/ChatContext';
/**
 * ChatSideIconItem Component
 * @function ChatSideIconItem
 * @description this is the main Component ChatSideIconItem section a message sideicon
 * @property {string} name - name of blog sender
 * @property {string} photo - photo of blog sender
 * @property {string} message - name of blog sender
 * @returns {Component} message item
 */
export default function ChatSideIconItem(props) {
    let { openChatPopup } = useContext(ChatContext);
    let name = props.name;
    let chatId = props.chatId;
    let photo = props.photo;
    const onClick = () => {
        // to do open the chat with this id
        openChatPopup(chatId);
    };
    return (
        <div className="chat-side-icon-item" onClick={onClick}>
            <img src={photo} title={name} alt={name} />
        </div>
    );
}
ChatSideIconItem.propTypes = {
    name: PropTypes.string.isRequired,
    chatId: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired
};
