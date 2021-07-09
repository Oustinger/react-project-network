import React from 'react';
import styles from './FormsControls.module.css';

const FormControl = ({ meta, ...props }) => {
    const hasError = meta.touched && meta.error;

    return <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
        <div>
            {props.children}
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