import React, {createContext, useContext, useReducer} from 'react';
import { UserContext } from './UserContext';

export const ChatContext = createContext();

const ChatContextProvider = ({children}) => {

    const {User} = useContext(UserContext)
    const INITIAL_STATE = {
        chatId: 'null',
        user: {}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId:
                        User > action.payload.uid
                        ? User + action.payload.uid
                        : action.payload.uid + User
                }
            
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContext.Provider value={{ data:state, dispatch }}>
          {children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider