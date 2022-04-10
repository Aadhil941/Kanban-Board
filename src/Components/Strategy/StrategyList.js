import React, { useState } from "react";
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import { StrategyListWrapper } from "./Strategy.style";

function StrategyList(props) {
    const { title } = props;

    return (
        <StrategyListWrapper>
            <div className="strategy-list">
                <h2>{title}</h2>
                <Link to={`/strategy/${title}`}>
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<ArrowRightOutlined />}
                        size="small"
                        className="strategy-list-button"
                    />
                </Link>
            </div>
        </StrategyListWrapper>
    );
}

export default StrategyList;
