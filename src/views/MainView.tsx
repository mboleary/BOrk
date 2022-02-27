/**
 * The main BOrk view
 */

import React, { useState, useEffect } from "react";

import ReactFlow, {Background, Controls, MiniMap } from "react-flow-renderer";

// import nodeTypes from "../data/nodeTypes";

import NodeElement from "../components/graphnodes/NodeElement";

import {AudioPlayerNode, AudioOutputNode} from "libjame/src/nodes";

import {initAudio, resumeAudio} from "libjame/src/Audio";

import "../style/reactFlow.css";

const nodeTypes = {
    Node: NodeElement
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
        setElements([
            {
                id: '1',
                type: 'input', // input node
                data: { label: 'Input Node' },
                position: { x: 250, y: 25 },
            },
            // default node
            {
                id: '2',
                // you can also pass a React component as a label
                data: { label: <div>Default Node</div> },
                position: { x: 100, y: 125 },
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
                position: {x: 300, y: 300}
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