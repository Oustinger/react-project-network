import s from './ShadowSection.module.css';

export default ({ children, padding, width, height }) => {
    const style = {
        padding: padding || '0',
        width: width || padding ? `calc(100% - ${padding} * 2)` : '100%',
        height: height || padding ? `calc(100% - ${padding} * 2)` : '100%',
    };

    return <div className={s.shadowSection} style={style}>
        {children}
    </div>
}