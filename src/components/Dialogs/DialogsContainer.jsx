import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addMessage, resetDialogForm } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from './../common/HOC/withAuthRedirect';

const mapStateToProps = (state) => ({
    dialogsPage: state.dialogsPage,
});

export default compose(
    connect(mapStateToProps, { addMessage, resetDialogForm }),
    withAuthRedirect,
)(Dialogs);