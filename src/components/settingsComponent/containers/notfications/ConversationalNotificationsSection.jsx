import React, { useContext } from 'react';
import { SettingsContext } from '../../../../contexts/settingsContext/SettingsContext';
import { toggleProperty } from '../../Service';
export default function ConversationalNotificationsSection() {
    const { conversationalNotification, updateProperty } =
        useContext(SettingsContext);

    return (
        <div className="security" id="section">
            <div className="sub-section-left">
                <h3>Conversational notifications</h3>
            </div>
            <div className="sub-section-right">
                <div className="sub-section-right-up">
                    <div className="switch-div">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={conversationalNotification}
                                onChange={() => {
                                    toggleProperty(
                                        'conversationalNotification',
                                        !conversationalNotification,
                                        updateProperty
                                    );
                                }}
                            ></input>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="text">
                        <p className="bold-text">
                            Notifications about posts you're participating in.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
