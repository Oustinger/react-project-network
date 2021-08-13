import React, { useEffect, useState } from "react";
import s from './ProfileStatus.module.css';
import styleFormsControls from '../../../common/FormsControls/FormsControls.module.css';

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const toggleEditMode = () => {
        if (editMode)
            props.updateProfileStatus(status);

        setEditMode(!editMode);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div className={styleFormsControls.form}>
            <div className={styleFormsControls.formControl}>
                {
                    !editMode ?
                        props.isOwner ?
                            <span onDoubleClick={toggleEditMode} className={s.statusText}
                                uk-tooltip="Double click to edit"
                            >
                                {status || '-set-status-'}
                            </span>
                            : <span>{status}</span>
                        : <input onChange={onStatusChange} onBlur={toggleEditMode}
                            autoFocus={true} value={status}
                            className={s.input} onKeyUp={(event) => event.keyCode === 13 ? toggleEditMode() : null} />
                }
            </div>
        </div>
    );
}

export default ProfileStatus;