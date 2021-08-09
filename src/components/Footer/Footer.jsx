import s from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={s.footer}>
            © github.com/Oustinger, {(new Date()).getFullYear()}
        </footer>
    );
}

export default Footer;