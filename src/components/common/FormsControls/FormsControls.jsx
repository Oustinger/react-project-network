import cn from 'classnames';
import React from 'react';
import { Field } from 'redux-form';
import MyButton from '../MyButton/MyButton';
import s from './FormsControls.module.css';

const FormControl = ({ meta, children }) => {
    const hasError = meta.touched && meta.error;

    return <div className={cn(
        s.formControl,
        { [s.error]: hasError }
    )}>
        {children}
        <div className={s.errorText}>{hasError ? meta.error : ''}</div>
    </div>
};

export const Textarea = (props) => {
    // важно, чтобы obj: meta не попал в HTML input/textarea
    const { input, meta, ...restProps } = props;

    return <FormControl {...props}>
        <textarea {...input} {...restProps} />
    </FormControl>
};

export const Input = (props) => {
    // важно, чтобы obj: meta не попал в HTML input/textarea
    const { input, meta, textafter, label, otherProps, ...restProps } = props;

    return <FormControl {...props}>
        <input id={input.name} {...input} {...otherProps} {...restProps} />
        {
            !label ?
                <label htmlFor={input.name}>
                    {textafter}
                </label>
                : textafter
        }
    </FormControl>
};

export const createField = (component, validate, name, { type, placeholder, textAfter, label }) => {
    const fieldControl = (<>
        <Field component={component} name={name} placeholder={placeholder}
            validate={validate} type={type} textafter={textAfter}
            label={label} />
    </>);

    return <>
        {label && <div className={s.label}>{label}</div>}
        <div className={label ? s.control : s.fullFiled}>
            {fieldControl}
        </div>
    </>
};

export const ArrangeFormFields = ({ children }) => {
    const styles = {
        display: 'grid',
        gridTemplateColumns: '[labels] auto [controls] 1fr',
        gridAutoFlow: 'row',
        gridGap: '1em',
        placeItems: 'center start',
        padding: '1.2em',
    };

    return <div style={styles}>
        {children}
    </div>
};

export const FormButton = (props) => {
    return <div className={s.formBtnContainer}>
        <input id="submit" type="submit" style={{ display: 'none' }} />
        <label htmlFor="submit">
            <MyButton {...props} className={cn(s.formBtn, props.className)}>
                {props.children}
            </MyButton>
        </label>
    </div>
};