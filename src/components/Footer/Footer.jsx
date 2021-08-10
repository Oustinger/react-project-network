import s from './Footer.module.css';

const Footer = () => {
    const currYear = (new Date()).getFullYear();
    return (
        <footer className={s.footer}>
            © github.com/Oustinger, {currYear}
        </footer>
    );
}

export default Footer;