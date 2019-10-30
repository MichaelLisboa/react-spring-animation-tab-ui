import React, {useState} from "react";
import { useSpring, animated as a } from "react-spring";
import { useGesture } from "react-use-gesture";
import { SectionTitle } from "../Content";
import Tab from "./presentation/Tab";
import { renderTitle } from "../../utils/renderUtils";
import "./Tabs.css";

const Tabs = ({
        connect,
        title,
        tabLabels,
        children,
        ...props
    }) => {
    const [expandTabs, setExpandTabs] = useState(true);
    const cardStyle = useSpring({
        marginTop: expandTabs ? 0 : -60,
        fontSize: expandTabs ? "1em" : "0em",
        fontColor: expandTabs ? "rgb(126, 87, 194)" : "rgb(252, 250, 255)",
        backgroundColor: expandTabs ? "rgb(252, 250, 255)" : "rgb(126, 87, 194)",
        config: { mass: 1, tension: 400, friction: 30 }
    });

    const bind = useGesture({
        onDrag: ({ down, velocity, distance, direction: [, y], delta: [yDelta] }) => {
            const trigger = Math.abs(yDelta) >= 1;
            const dir = y > 0 ? -1 : 1;
            // console.log("TOGGLE", expandTabs, "VELOCITY: ", velocity, "DISTANCE: ", distance, "DIRECTION: ", dir, "DELTA", Math.abs(yDelta))
            if (!down && trigger) {
                if (dir !== 0) {
                    if (dir < 0 && (distance > 100 && velocity > 1)) {
                        setExpandTabs(true);
                    } else {
                        setExpandTabs(false);
                    }
                }

            }
        }
    })

    return (
        <>
        <a.div
            {...bind()}
            className="flex-container">
            <a.div
                style={cardStyle}
                className="tab-header-container"
                >
                <div className="tab-header-content">
                    <SectionTitle
                        className="with-large-header"
                        title={renderTitle(title)} />
                    <Tab className={ expandTabs ? "defaultTabs" : "collapsedTabs" } connect={connect}>
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
        </>
    );
}

export default Tabs;
