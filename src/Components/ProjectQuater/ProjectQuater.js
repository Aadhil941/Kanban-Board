import React, { useEffect, useState } from "react";
import { Button, Tabs } from 'antd';

import ProjectBoard from "../ProjectBoard/ProjectBoard";

const { TabPane } = Tabs;
const initialPanes = [
    { title: 'Q1', content: <ProjectBoard />, key: '1' }
];

function ProjectQuater(props) {

    const [activeKey, setActiveKey] = useState(initialPanes[0].key);
    const [panes, setPanes] = useState(initialPanes);
    const [newTabIndex, setNewTabIndex] = useState(2);

    const onChange = activeKey => {
        setActiveKey(activeKey);
    };

    const onEdit = (targetKey, action) => {
        switch (action) {
            case 'add':
                add();
                break;
            case 'remove':
                remove(targetKey);
                break;

            default:
                break;
        }
    };

    const add = () => {
        const activeKey = `${newTabIndex}`;
        const newPanes = [...panes];
        newPanes.push({ title: 'Q' + newTabIndex, content: <ProjectBoard />, key: activeKey });
        setActiveKey(activeKey);
        setPanes(newPanes);
        setNewTabIndex(newTabIndex + 1);
    };

    const remove = targetKey => {
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setNewTabIndex(newTabIndex - 1);
        setActiveKey(newActiveKey);
        setPanes(newPanes);
    };

    return (
        <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            hideAdd={(newTabIndex < 5) ? false : true}
        >
            {panes.map(pane => (
                <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                    {pane.content}
                </TabPane>
            ))}
        </Tabs>
    );

}

export default ProjectQuater;