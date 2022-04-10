import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import AddStrategy from "../../Components/Strategy/AddStrategy";
import StrategyList from "../../Components/Strategy/StrategyList";
import { STRATEGIES } from "../../Constants/ActionTypes";
import { actionCreators } from "../../AppRedux/actions"

function Strategy(props) {

    const dispatch = useDispatch();
    const { addStrategy } = actionCreators;
    const { strategies } = useSelector(({ project }) => project);

    const addStrategyHandler = (name) => {
        const tempStrategies = [...strategies];
        tempStrategies.push({
            id: Date.now() + Math.random() * 2,
            title: name,
            cards:[]
        });
        dispatch(addStrategy(tempStrategies));
    };

    return (
        <div className="app_main_strategy">
            <h2>{STRATEGIES}</h2>
            {strategies.length > 0 && strategies.map((item) => (
                <StrategyList
                    key={item.id}
                    title={item.title}
                />
            ))}
            <AddStrategy
                placeholder="Enter Strategy Name"
                text="Add Strategy"
                onSubmit={addStrategyHandler}
            />
        </div>
    );

}

export default Strategy;
