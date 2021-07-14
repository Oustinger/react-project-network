import React, { Suspense } from "react";
import Preloader from "../Preloader/Preloader";

export default (Component) => (props) => {
    return <Suspense fallback={<Preloader />}>
        <Component {...props} />
    </Suspense>
}