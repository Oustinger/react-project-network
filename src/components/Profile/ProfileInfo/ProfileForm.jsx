import { reduxForm } from 'redux-form';
import { maxLengthCreator } from '../../../utils/validators';
import { firstLetterToUpperCase } from './../../../utils/stringHelpers';
import { required } from './../../../utils/validators';
import { createField, FormButton, Input, Textarea } from './../../common/FormsControls/FormsControls';
import stylesFormsControls from './../../common/FormsControls/FormsControls.module.css';
import s from './ProfileInfo.module.css';

const maxLength100 = maxLengthCreator(100);

const contacts = ['github', 'vk', 'facebook', 'instagram', 'twitter', 'website', 'youtube'];
const Contact = ({ name }) => (<div>
    {createField(Input, [maxLength100], `contacts.${name}`, {
        placeholder: name,
        label: `${firstLetterToUpperCase(name)}: `,
    })}
</div>);

const ProfileForm = ({ error, handleSubmit, isUploadingDataInProgress }) => {
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
                    textAfter: 'Looking for a job? ',
                })}
            </div>
            <div>
                {createField(Textarea, [maxLength100, required], 'lookingForAJobDescription', {
                    placeholder: 'Describe what job you are looking for and about your skills',
                    label: 'Description: ',
                })}
            </div>
            <hr className={s.form__divider}></hr>
            <div>
                <div className={s.form__contactsFields}>
                    {
                        contacts.map(contact => <Contact name={contact} />)
                    }
                </div>
            </div>
            <div>
                <FormButton isInvert={true} isSmall={true}
                    float="right" className={s.form__btn}
                    disabled={isUploadingDataInProgress}
                >Save</FormButton>
            </div>
        </div>
    </form>
};

export default reduxForm({ form: 'profile' })(ProfileForm);