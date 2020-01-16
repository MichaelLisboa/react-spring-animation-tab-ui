// TabItems.js
import React from "react";

const TabItems = ({children, ...props}) =>
    <div className={`sticky-tab-container tab-item ${props.className}`}>
        {children}
    </div>

export default TabItems;
