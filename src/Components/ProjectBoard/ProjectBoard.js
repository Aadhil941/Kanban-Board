import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Button } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";

import EditBoard from "./EditBoard/EditBoard";
import Board from "./Board/Board";
import { actionCreators } from "../../AppRedux/actions"

function ProjectBoard(props) {
    let location = useLocation();
    const strategyTitle = location.pathname.split("/")[2];

    const { strategies } = useSelector(({ project }) => project);
    const dispatch = useDispatch();
    const { addStrategy } = actionCreators;

    const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("prac-kanban")) || []);

    const [targetCard, setTargetCard] = useState({
        bid: "",
        cid: "",
    });

    const addCardHandler = (id, title) => {
        const index = boards.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempBoards = [...boards];
        tempBoards[index].cards?.push({
            id: Date.now() + Math.random() * 2,
            title,
            labels: [],
            date: "",
            tasks: [],
        });
        setBoards(tempBoards);
    };

    const removeBoard = (id) => {
        const index = boards.findIndex((item) => item.id === id);
        if (index < 0) return;

        const tempBoards = [...boards];
        tempBoards.splice(index, 1);
        setBoards(tempBoards);
    };


    const removeCard = (bid, cid) => {
        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...boards];
        const cards = tempBoards[index].cards;

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        cards.splice(cardIndex, 1);
        setBoards(tempBoards);
    };

    const dragEnded = (bid, cid) => {
        let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
        s_boardIndex = boards.findIndex((item) => item.id === bid);
        if (s_boardIndex < 0) return;

        s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
            (item) => item.id === cid
        );
        if (s_cardIndex < 0) return;

        t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
        if (t_boardIndex < 0) return;

        t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
            (item) => item.id === targetCard.cid
        );
        if (t_cardIndex < 0) return;

        const tempBoards = [...boards];
        const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
        tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
        tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
        setBoards(tempBoards);

        setTargetCard({
            bid: "",
            cid: "",
        });
    };

    const dragEntered = (bid, cid) => {
        if (targetCard.cid === cid) return;
        setTargetCard({
            bid,
            cid,
        });
    };

    const updateCard = (bid, cid, card) => {
        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) return;

        const tempBoards = [...boards];
        const cards = tempBoards[index].cards;

        const cardIndex = cards.findIndex((item) => item.id === cid);
        if (cardIndex < 0) return;

        tempBoards[index].cards[cardIndex] = card;

        setBoards(tempBoards);
    };

    const addboardHandler = (name) => {
        const strategy = strategies.length > 0 && strategies.find((item) => item.title === strategyTitle);

        const tempBoards = [...boards];
        tempBoards.push({
            id: Date.now() + Math.random() * 2,
            title: name,
            cards: []
        });
        setBoards(tempBoards);

        const newStrategies = strategies.filter(item => item.title != strategyTitle);
        const tempStrategy = [...newStrategies];
        tempStrategy.push({
            id: strategy?.id,
            title: strategy?.title,
            cards: {
                'Q1': tempBoards
            },
        });
        dispatch(addStrategy(tempStrategy));
    };

    useEffect(() => {
        localStorage.setItem("prac-kanban", JSON.stringify(boards));
    }, [boards]);

    useEffect(() => {

        if (strategies.length > 0) {
            const strategy = strategies.find((item) => item.title === strategyTitle);
            setBoards(strategy?.cards?.Q1 || []);
        }
    }, []);

    return (
        <div className="app_main_board">
            {boards?.length > 0 && boards.map((item) => (
                <Board
                    key={item.id}
                    board={item}
                    addCard={addCardHandler}
                    removeBoard={() => removeBoard(item.id)}
                    removeCard={removeCard}
                    dragEnded={dragEnded}
                    dragEntered={dragEntered}
                    updateCard={updateCard}
                />
            ))}
            <EditBoard
                displayClass="app_boards_add-board"
                editClass="app_boards_add-board_edit"
                placeholder="Enter Board Name"
                text="Add Board"
                buttonText="Add Board"
                onSubmit={addboardHandler}
            />
            <Link to="/">
                <Button className="pull-right" type="primary" danger>
                    Back
                </Button>
            </Link>
        </div>
    );

}

export default ProjectBoard;