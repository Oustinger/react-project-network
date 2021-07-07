import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status === null ? '' : this.props.status,
    }

    toggleEditMode = () => {
        if (this.state.editMode)
            this.props.updateProfileStatus(this.state.status);

        this.setState({
            editMode: !this.state.editMode,
        });
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value,
        });
    }

    render() {
        return <div>
            {
                !this.state.editMode ?
                    <span onDoubleClick={this.toggleEditMode}>{this.props.status || '-set-status-'}</span> :
                    <input onChange={this.onStatusChange} onBlur={this.toggleEditMode}
                        autoFocus={true} value={this.state.status} />
            }
        </div>;
    }
}

export default ProfileStatus;