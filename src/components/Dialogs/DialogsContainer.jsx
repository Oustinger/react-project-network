import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { addMessage, resetDialogForm, setActiveDialog } from '../../redux/dialogs/dialogsReducer';
import { getActiveDialogId, getAuthors, getDialogs, getMessages } from '../../redux/dialogs/dialogsSelectors';
import { getPhotoLarge } from './../../redux/auth/authSelectors';
import { withAuthRedirect } from './../common/HOC/withAuthRedirect';
import Preloader from './../common/Preloader/Preloader';
import Dialogs from './Dialogs';

const DialogContainer = (props) => {
    const currentDialogId = Number.parseInt(props.match.params.dialogId) || props.activeDialogId;

    if (currentDialogId && (currentDialogId !== props.activeDialogId)) {
        props.setActiveDialog(currentDialogId);
        return <Preloader />;
    }

    const onFormSubmit = ({ message }) => {
        props.addMessage({ message, dialogId: props.activeDialogId });
        props.resetDialogForm();
    };

    const findCompanionById = (authorId) => props.authors.find(({ id }) => id === authorId);

    const companionName = props.activeDialogId &&
        props.dialogs.find(({ id }) => id === props.activeDialogId)
            .companions
            .map(compId => findCompanionById(compId))
            .map(comp => comp.name)[0];

    return <Dialogs dialogs={props.dialogs}
        messages={props.messages.filter(({ dialogId }) => dialogId === props.activeDialogId)}
        activeDialogId={props.activeDialogId}
        photoMe={props.photoMe}
        companionName={companionName}
        findCompanionById={findCompanionById}
        onFormSubmit={onFormSubmit} />;
};

const mapStateToProps = (state) => ({
    dialogs: getDialogs(state),
    authors: getAuthors(state),
    messages: getMessages(state),
    photoMe: getPhotoLarge(state),
    activeDialogId: getActiveDialogId(state),
});

export default compose(
    connect(mapStateToProps, { addMessage, resetDialogForm, setActiveDialog }),
    withRouter,
    withAuthRedirect,
)(DialogContainer);