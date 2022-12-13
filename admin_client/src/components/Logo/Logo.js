import logo from 'assets/images/logo_shoes.jpg';

const Logo = () => {
    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Mantis" width="100" />
         *
         */
        <>
            <img src={logo} alt="Mantis" width="100" />
        </>
    );
};

export default Logo;
