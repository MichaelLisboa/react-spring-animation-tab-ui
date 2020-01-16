// Tabs.js

import React, { useState } from "react";
import { useSpring, animated as a } from "react-spring";
import { useGesture } from "react-use-gesture";
import Tab from "./presentation/Tab";
import "./Tabs.css";

const Tabs = ({ // a bunch of args I pass
        connect,
        tabLabels,
        children,
        ...props
    }) => {

    const [tabs, setTabs] = useState(true); // set tab state to default or collapsed

    const tabStyle = useSpring({ // this is where react-spring does its thing
        marginTop: tabs ? 0 : -60,
        fontSize: tabs ? "1em" : "0em",
        fontColor: tabs ? "rgb(126, 87, 194)" : "rgb(252, 250, 255)",
        backgroundColor: tabs ? "rgba(252, 250, 255, 0)" : "rgb(126, 87, 194)",
        config: { mass: 1, tension: 400, friction: 30 }
    });

    const bind = useGesture({
        onDrag: ({ down, direction: [, y], delta: [yDelta] }) => {
            const trigger = Math.abs(yDelta) >= 1;
            const dir = y > 0 ? -1 : 1;
            if (!down && trigger) dir < 0 ? setTabs(true) : setTabs(false);
        }
    })

    return (
        <a.div
            {...bind()}
            className="flex-container">
            <a.div
                style={tabStyle}
                className="tab-header-container"
                >
                <div className="tab-header-content">
                    <SectionTitle
                        className="with-large-header"
                        title={title} />
                    <Tab className={ tabs ? "defaultTabs" : "collapsed-tabs" } connect={connect}>
                        {tabLabels.map((label, i) => (
                            <div key={i}>
                                <a href="/#" data-uk-switcher-item={i}>{label}</a>
                            </div>
                        ))}
                    </Tab>
                </div>
            </a.div>
            <div className="tab-content-fixed-bottom with-header">
                {children}
            </div>
        </a.div>
    );
}

export default Tabs;
