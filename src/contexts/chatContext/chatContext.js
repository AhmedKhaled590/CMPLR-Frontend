import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { apiBaseUrl } from '../../config.json';
import Axios from 'axios';

export const ChatContext = createContext();
export default function ChatContextProvider(props) {
    //const { user } = useContext(UserContext);
    const userR = JSON.parse(localStorage.getItem('user'));
    const user = userR;
    const [pageNumber, setPageNumber] = useState(1);

    let currBlogObject = null;
    if (user && user?.userData)
        //console.log(user?.userData);
        currBlogObject = {
            senderName: user?.userData?.blog_name,
            senderId: user?.userData?.primary_blog_id,
            senderPhoto: user?.userData?.avatar,
            senderShape: user?.userData?.avatar_shape
        };
    //console.log('f', currBlogObject, user);
    const [currBlog, setCurrBlog] = useState(currBlogObject);
    const [blogs, setBlogs] = useState(null);

    // for chats show in navbar
    const [loadingChats, setLoadingChats] = useState(false);
    const [errLoadingChat, setErrLoadingChat] = useState(null);
    const [chats, setChats] = useState(null); //chats in navbar messages dropDown
    //for the signle conversation
    /*const [msgs, setMsgs] = useState([]);
    const [loadingConversation, setLoadingConversation] = useState(false);
    const [errorLoadingConversation, setErrorLoadingConversation] =
        useState(null);
    const [hasMorePages, setHasMorePages] = useState(false);*/

    const [conversationMsg, setConversationMsg] = useState([]);
    const [currPopUpOpenChat, setCurrPopUpOpenChat] = useState(null);
    const [sideIconOpenChat, setSideIconOpenChat] = useState([]); //array contains chats side icons opened

    const setUserBlog = userData => {
        let currBlogObject = null;
        // console.log(userData);
        currBlogObject = {
            senderName: userData?.blog_name,
            senderId: userData?.primary_blog_id,
            senderPhoto: userData?.avatar,
            senderShape: userData?.avatar_shape
        };
        //console.log('s', currBlogObject, userData);

        setCurrBlog(currBlogObject);
    };
    const getUnReadMsgsCount = setUnReadMsgs => {
        const abortCont = new AbortController();
        const config = { signal: abortCont.signal };
        if (user) {
            config['headers'] = {
                Authorization: `Bearer ${user?.token}`,
                Accept: 'application/json'
            };
        } else return;
        let count = 0;
        let blogId = currBlog?.senderId; //user.userData.id;
        Axios.get(`${apiBaseUrl}/blog/messaging/${blogId}`, config)
            .then(res => {
                //for production use
                if (!res.error) {
                    setChats(res?.data);
                    for (let i = 0; i < res?.data?.length; i++) {
                        if (
                            blogId !== res?.data[i]?.from_blog_id &&
                            res?.data[i]?.is_read === false
                        ) {
                            count++;
                        }
                    }
                    setUnReadMsgs(count);
                } else {
                    throw Error(res?.error);
                }
            })
            .catch(() => {});
    };
    //this function load chats in navbavr dropdown list
    async function loadChats() {
        // to DO load real chat by axios request,, Doing it!
        const abortCont = new AbortController();
        const config = { signal: abortCont.signal };
        if (user) {
            config['headers'] = {
                Authorization: `Bearer ${user?.token}`,
                Accept: 'application/json'
            };
        }
        let blogId = currBlog?.senderId; //user.userData.id;
        setLoadingChats(true);
        //console.log(user);
        Axios.get(`${apiBaseUrl}/blog/messaging/${blogId}`, config)
            .then(res => {
                if (!res.error) {
                    setChats(res?.data);
                    setLoadingChats(false);
                    setErrLoadingChat(null);
                    //console.log('ss');
                } else {
                    throw Error(res?.error);
                }
            })
            .catch(err => {
                if (err?.name !== 'AbortError') {
                    setLoadingChats(false);
                    setErrLoadingChat(err?.message);
                }
            });
        //setChats(charArr);
        //setLoadingChats(false);
    }

    // this function open the chat popup when use click it from the navbar drop down list
    const openChatPopup = (
        senderId,
        receiverId,
        senderPhoto,
        senderShape,
        receiverPhoto,
        receiverShape,
        senderName,
        receiverName
    ) => {
        // console.log(user);
        // if the current is the one i opened

        if (
            currPopUpOpenChat &&
            senderId === currPopUpOpenChat.senderId &&
            receiverId === currPopUpOpenChat.receiverId
        ) {
            return;
        }
        setConversationMsg([]);


        // if other chat opend close it first
        paritialCloseChatPopup();
        setCurrPopUpOpenChat({
            senderId,
            receiverId,
            senderPhoto,
            senderShape,
            receiverPhoto,
            receiverShape,
            senderName,
            receiverName
        });
        let nSide = [];
        for (let i = 0; i < sideIconOpenChat?.length; i++) {
            if (
                !(
                    sideIconOpenChat[i]?.senderId === senderId &&
                    sideIconOpenChat[i]?.receiverId === receiverId
                )
            ) {
                nSide.push(sideIconOpenChat[i]);
            }
        }
        setSideIconOpenChat(nSide);
    };

    // this function close the chat popup when use click it x button
    const closeChatPopup = () => {
        setPageNumber(1);
        setConversationMsg([]);
        setCurrPopUpOpenChat(null);
    };

    // this function pairtial close the chat popup when use click it > button, it will be in sideIcon
    const paritialCloseChatPopup = () => {
        if (!currPopUpOpenChat) return;
        // make 6 at most

        if (sideIconOpenChat?.length === 6) {
            closeChatPopup();
            return;
        }
        let found = false;
        for (let i = 0; i < sideIconOpenChat?.length; i++) {
            if (
                sideIconOpenChat[i]?.senderId === currPopUpOpenChat?.senderId &&
                sideIconOpenChat[i]?.receiverId ===
                    currPopUpOpenChat?.receiverId
            ) {
                found = true;
            }
        }
        console.log(found);
        if (found === false) {
            console.log(currPopUpOpenChat);
            if (!sideIconOpenChat || sideIconOpenChat?.length === 0) {
                let nSide = [];
                nSide.push(currPopUpOpenChat);
                setSideIconOpenChat(nSide);
            } else
                setSideIconOpenChat([...sideIconOpenChat, currPopUpOpenChat]);
            console.log(sideIconOpenChat);
        }
        closeChatPopup();
    };
    console.log(sideIconOpenChat);
    // send message
    const sendMessage = (message, senderId, receiverId) => {
        const abortCont = new AbortController();
        const config = { signal: abortCont.signal };
        if (user) {
            config['headers'] = {
                Authorization: `Bearer ${user.token}`,
                Accept: 'application/json'
            };
        }
        //  console.log(currPopUpOpenChat.senderId, currPopUpOpenChat.receiverId);
        Axios.post(
            `${apiBaseUrl}/messaging/conversation/${senderId}/${receiverId}`,
            {
                Content: message
            },
            config
        )
            .then(res => {
                if (!res.error) {
                    // console.log('send message succfully!');
                    let newMsg = {
                        // eslint-disable-next-line camelcase
                        from_blog_id: senderId,
                        // eslint-disable-next-line camelcase
                        to_blog_id: receiverId,
                        content: message,
                        // eslint-disable-next-line camelcase
                        is_read: false,
                        // eslint-disable-next-line camelcase
                        created_at: new Date()
                    };
                    //console.log(newMsg.created_at);
                    setConversationMsg([...conversationMsg, newMsg]);
                } else {
                    throw Error(res.error);
                }
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    // console.log('faild send message!');
                    // console.log(err.message);
                }
            });
    };
    const deleteChat = (senderId, receiverId) => {
        // let { senderId, receiverId } = currPopUpOpenChat;
        const abortCont = new AbortController();
        const config = { signal: abortCont.signal };
        if (user) {
            config['headers'] = {
                Authorization: `Bearer ${user.token}`,
                Accept: 'application/json'
            };
        }
        Axios.delete(
            `${apiBaseUrl}/messaging/conversation/${senderId}/${receiverId}`,
            config
        )
            .then(res => {
                if (!res.error) {
                    //console.log('deleted chat succfully!');
                    setConversationMsg([]);
                    closeChatPopup();
                    // to do delete it form chats
                } else {
                    throw Error(res.error);
                }
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    // console.log('faild delete chat!');
                    // console.log(err.message);
                }
            });
    };
    const clearToOpenNewChat = () => {
        if (currPopUpOpenChat) paritialCloseChatPopup();
        setConversationMsg([]);
        setPageNumber(1);
    };
    const clear = () => {
        setCurrBlog(null);
        if (currPopUpOpenChat) closeChatPopup();
        setChats(null);
        setErrLoadingChat(null);
        setConversationMsg([]);
        setCurrPopUpOpenChat(null);
        setSideIconOpenChat([]);
    };
    return (
        <ChatContext.Provider
            value={{
                currBlog,
                setCurrBlog,
                blogs,
                setBlogs,
                loadingChats,
                setLoadingChats,
                chats,
                setChats,
                currPopUpOpenChat,
                setCurrPopUpOpenChat,
                sideIconOpenChat,
                setSideIconOpenChat,
                openChatPopup,
                closeChatPopup,
                loadChats,
                paritialCloseChatPopup,
                sendMessage,
                setErrLoadingChat,
                errLoadingChat,
                pageNumber,
                setPageNumber,
                conversationMsg,
                setConversationMsg,
                deleteChat,
                clear,
                setUserBlog,
                getUnReadMsgsCount,
                clearToOpenNewChat
            }}
        >
            {props.children}
        </ChatContext.Provider>
    );
}

ChatContextProvider.propTypes = {
    children: PropTypes.any.isRequired
};
