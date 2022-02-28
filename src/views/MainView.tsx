/**
 * The main BOrk view
 */

import React, { useState, useEffect } from "react";

import ReactFlow, {Background, Controls, MiniMap } from "react-flow-renderer";

// import nodeTypes from "../data/nodeTypes";

import NodeElement from "../components/graphnodes/NodeElement";
import InputNode from "../components/graphnodes/InputNode";

import {AudioPlayerNode, AudioOutputNode, FilterNode} from "libjame/src/nodes";

import {initAudio, resumeAudio} from "libjame/src/Audio";

import "../style/reactFlow.css";

const nodeTypes = {
    Node: NodeElement,
    Input: InputNode
};

initAudio();

function MainView({ ...props }) {

    const [elements, setElements] = useState<Array<any>>([]);

    useEffect(() => {
        resumeAudio();
        const apn = new AudioPlayerNode({
            sourceURL: "/static/test.wav"
        });
        const aon = new AudioOutputNode();
        const fn = new FilterNode({filter: 440});
        setElements([
            {
                id: '1',
                type: 'Input', // input node
                data: { 
                    type: "range",
                    min: 0,
                    max: 100,
                    title: "Test"
                },
                position: { x: 250, y: 25 },
            },
            {
                id: '2',
                type: 'Input', // input node
                data: { 
                    type: "button",
                    min: 0,
                    max: 100,
                    title: "Test"
                },
                position: { x: 250, y: 25 },
            },
            {
                id: '3',
                type: 'output', // output node
                data: { label: 'Output Node' },
                position: { x: 250, y: 250 },
            },
            {
                id: '4',
                type: 'Node',
                data: apn,
                position: {x: 300, y: 300}
            },
            {
                id: '5',
                type: 'Node',
                data: aon,
                position: {x: 300, y: 400}
            },
            {
                id: '6',
                type: 'Node',
                data: fn,
                position: {x: 350, y: 300}
            },
            // animated edge
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3' },
        ]);
    }, []);

    return <>
        <ReactFlow elements={elements} nodeTypes={nodeTypes}>
            <Background gap={12} size={1} />
            <Controls />
            <MiniMap />
        </ReactFlow>
    </>
}

export default MainView;