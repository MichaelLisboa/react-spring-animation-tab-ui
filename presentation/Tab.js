import React from "react";

const Tab = ({children, ...props}) => {
    return (
        <div className={`sticky-tab-container uk-subnav-pill ${props.className}`}
                data-uk-switcher={`connect: .${props.connect}; animation: uk-animation-slide-bottom, uk-animation-slide-top-small`}>
                {children}
        </div>
    )
}

export default Tab;
