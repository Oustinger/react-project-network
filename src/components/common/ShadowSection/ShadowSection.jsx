import s from './ShadowSection.module.css';

export default ({ children, padding, width, height }) => {
    const style = {
        padding: padding || '0',
        width: width || '100%',
        height: height || '100%',
    };

    return <div className={s.shadowSection} style={style}>
        {children}
    </div>
}