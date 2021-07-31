import React from 'react';
import { reduxForm } from 'redux-form';
import { maxLengthCreator } from '../../../utils/validators';
import { required } from './../../../utils/validators';
import { createField, Input, Textarea } from './../../common/FormsControls/FormsControls';
import stylesFormsControls from './../../common/FormsControls/FormsControls.module.css';
import s from './ProfileInfo.module.css';

const maxLength100 = maxLengthCreator(100);

const ProfileForm = ({ error, handleSubmit }) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>Save</button>
        </div>
        {
            error && <div className={stylesFormsControls.commonError}>
                {error}
            </div>
        }
        <div>
            {createField(Input, [maxLength100, required], 'fullName', {
                placeholder: 'full name',
                label: 'Full name: ',
            })}
            {createField(Input, [maxLength100, required], 'aboutMe', {
                placeholder: 'Some info about you',
                label: 'About me: ',
            })}
            {createField(Input, [], 'lookingForAJob', {
                type: 'checkbox',
                label: 'Are looking for a job? ',
            })}
            {createField(Textarea, [maxLength100, required], 'lookingForAJobDescription', {
                placeholder: 'Describe what job you are looking for and about your skills',
                label: 'Looking for a job description: ',
            })}
            <div>
                Your contacts:
                <div className={s.contactsList}>
                    {createField(Input, [maxLength100], 'contacts.github', {
                        placeholder: 'github',
                        label: 'Github: ',
                    })}
                    {createField(Input, [maxLength100], 'contacts.vk', {
                        placeholder: 'vk',
                        label: 'Vk: ',
                    })}
                    {createField(Input, [maxLength100], 'contacts.facebook', {
                        placeholder: 'facebook',
                        label: 'Facebook: ',
                    })}
                    {createField(Input, [maxLength100], 'contacts.instagram', {
                        placeholder: 'instagram',
                        label: 'Instagram: ',
                    })}
                    {createField(Input, [maxLength100], 'contacts.twitter', {
                        placeholder: 'twitter',
                        label: 'Twitter: ',
                    })}
                    {createField(Input, [maxLength100], 'contacts.website', {
                        placeholder: 'website',
                        label: 'Website: ',
                    })}
                    {createField(Input, [maxLength100], 'contacts.youtube', {
                        placeholder: 'youtube',
                        label: 'YouTube: ',
                    })}
                </div>
            </div>
        </div>
    </form>
};

export default reduxForm({ form: 'profile' })(ProfileForm);