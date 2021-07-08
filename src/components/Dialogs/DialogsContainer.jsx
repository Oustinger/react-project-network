import React from 'react';
import { connect } from 'react-redux';
import { addMessage, resetDialogForm } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => ({
    dialogsPage: state.dialogsPage,
});

const DialogsContainer = connect(mapStateToProps, { addMessage, resetDialogForm })(Dialogs);

export default DialogsContainer;