import React from "react";
import { useState } from "react";

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const toggleEditMode = () => {
        if (editMode)
            props.updateProfileStatus(status);

        setEditMode(!editMode);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    return <div>
        {
            !editMode ?
                <span onDoubleClick={toggleEditMode}>{status || '-set-status-'}</span> :
                <input onChange={onStatusChange} onBlur={toggleEditMode}
                    autoFocus={true} value={status} />
        }
    </div>;
}

export default ProfileStatus;