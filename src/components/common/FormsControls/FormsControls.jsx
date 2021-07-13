import React from 'react';
import styles from './FormsControls.module.css';
import { Field } from 'redux-form';

const FormControl = ({ meta, children }) => {
    const hasError = meta.touched && meta.error;

    return <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
        <div>
            {children}
        </div>
        <div>
            <span className={styles.errorText}>{hasError ? meta.error : ''}</span>
        </div>
    </div>
};

export const Textarea = (props) => {
    const { input, meta, ...restProps } = props;        // важно, чтобы obj: meta не попал в HTML input/textarea
    return <FormControl {...props}>
        <textarea {...input} {...restProps} />
    </FormControl>
}

export const Input = (props) => {
    const { input, meta, ...restProps } = props;        // важно, чтобы obj: meta не попал в HTML input/textarea
    return <FormControl {...props}>
        <input {...input} {...restProps} />
    </FormControl>
}

export const createField = (component, validate, name, { type, placeholder, text }) => {
    return <div>
        <div>
            <Field component={component} name={name} placeholder={placeholder}
                validate={validate} type={type} />
        </div>
        <div>
            {text}
        </div>
    </div>
}