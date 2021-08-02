import React from 'react';
import { reduxForm } from 'redux-form';
import { maxLengthCreator } from '../../../utils/validators';
import { required } from './../../../utils/validators';
import { createField, FormButton, Input, Textarea } from './../../common/FormsControls/FormsControls';
import stylesFormsControls from './../../common/FormsControls/FormsControls.module.css';
import s from './ProfileInfo.module.css';

const maxLength100 = maxLengthCreator(100);

const ProfileForm = ({ error, handleSubmit }) => {
    return <form onSubmit={handleSubmit} className={stylesFormsControls.form}>
        {
            error && <div className={stylesFormsControls.commonError}>
                {error}
            </div>
        }
        <div className={s.form__fieldsContainer}>
            <div>
                {createField(Input, [maxLength100, required], 'fullName', {
                    placeholder: 'full name',
                    label: 'Full name: ',
                })}
            </div>
            <div>
                {createField(Input, [maxLength100, required], 'aboutMe', {
                    placeholder: 'Some info about you',
                    label: 'About me: ',
                })}
            </div>
            <hr className={s.form__divider}></hr>
            <div>
                {createField(Input, [], 'lookingForAJob', {
                    type: 'checkbox',
                    textAfter: 'Are looking for a job? ',
                })}
            </div>
            <div>
                {createField(Textarea, [maxLength100, required], 'lookingForAJobDescription', {
                    placeholder: 'Describe what job you are looking for and about your skills',
                    label: 'Looking for a job description: ',
                })}
            </div>
            <hr className={s.form__divider}></hr>
            <div>
                <div className={s.form__contactsFields}>
                    <div>
                        {createField(Input, [maxLength100], 'contacts.github', {
                            placeholder: 'github',
                            label: 'Github: ',
                        })}
                    </div>
                    <div>
                        {createField(Input, [maxLength100], 'contacts.vk', {
                            placeholder: 'vk',
                            label: 'Vk: ',
                        })}
                    </div>
                    <div>
                        {createField(Input, [maxLength100], 'contacts.facebook', {
                            placeholder: 'facebook',
                            label: 'Facebook: ',
                        })}
                    </div>
                    <div>
                        {createField(Input, [maxLength100], 'contacts.instagram', {
                            placeholder: 'instagram',
                            label: 'Instagram: ',
                        })}
                    </div>
                    <div>
                        {createField(Input, [maxLength100], 'contacts.twitter', {
                            placeholder: 'twitter',
                            label: 'Twitter: ',
                        })}
                    </div>
                    <div>
                        {createField(Input, [maxLength100], 'contacts.website', {
                            placeholder: 'website',
                            label: 'Website: ',
                        })}
                    </div>
                    <div>
                        {createField(Input, [maxLength100], 'contacts.youtube', {
                            placeholder: 'youtube',
                            label: 'YouTube: ',
                        })}
                    </div>
                </div>
            </div>
            <div>
                <FormButton isInvert={true} isSmall={true} className={s.form__btn}>Save</FormButton>
            </div>
        </div>
    </form>
};

export default reduxForm({ form: 'profile' })(ProfileForm);