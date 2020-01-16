// Tab.js
import React from "react";

const Tab = ({children, ...props}) =>
    <div className={`sticky-tab-container tab-item ${props.className}`}>
        {children}
    </div>

export default Tab;
