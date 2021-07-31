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
    const { input, meta, ...restProps } = props;        // важно, чтобы obj: meta не попал в HTML input/textarea

    return <FormControl {...props}>
        <textarea {...input} {...restProps} />
    </FormControl>
};

export const Input = (props) => {
    const { input, meta, textAfter, label, ...restProps } = props;
    // важно, чтобы obj: meta не попал в HTML input/textarea

    return <FormControl {...props}>
        <input id={input.name} {...input} {...restProps} />
        {
            !label ?
                <label for={input.name}>
                    {textAfter}
                </label>
                : textAfter
        }
    </FormControl>
};

export const createField = (component, validate, name, { type, placeholder, textAfter, label }) => {
    const fieldControl = (<>
        <Field component={component} name={name} placeholder={placeholder}
            validate={validate} type={type} textAfter={textAfter} label={label} />
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
        'display': 'grid',
        'grid-template-columns': '[labels] auto [controls] 1fr',
        'grid-auto-flow': 'row',
        'grid-gap': '1em',
        'place-items': 'center start',
        'padding': '1.2em',
    };

    return <div style={styles}>
        {children}
    </div>
};

export const FormButton = (props) => {
    return <div className={s.formBtnContainer}>
        <input id="submit" type="submit" style={{ 'display': 'none' }} />
        <label for="submit">
            <MyButton {...props} className={s.formBtn}>
                {props.children}
            </MyButton>
        </label>
    </div>
};