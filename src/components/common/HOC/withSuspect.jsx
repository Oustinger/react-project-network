import React, { Suspense } from "react";
import Preloader from "../Preloader/Preloader";

const withSuspect = (Component) => (props) => {
    return <Suspense fallback={<Preloader />}>
        <Component {...props} />
    </Suspense>;
};
export default withSuspect;