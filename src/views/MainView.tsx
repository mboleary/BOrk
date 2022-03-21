/**
 * The main BOrk view
 */

import React, { useState, useEffect } from "react";

import ReactFlow, {Background, Controls, Edge, MiniMap } from "react-flow-renderer";

import type {Connection} from "react-flow-renderer";

import { useSelector, useDispatch } from "../state/hooks";

import NodeElement from "../components/graphnodes/NodeElement";
import InputNode from "../components/graphnodes/InputNode";

import {AudioPlayerNode, AudioOutputNode, FilterNode} from "libjame/src/nodes";

import {initAudio, resumeAudio} from "libjame/src/Audio";

import BorkInputNode, {INPUT_TYPES} from "../internalNodes/InputNode";

import AnalyserNode from "../internalNodes/AnalyserNode";
import AnalyserNodeElement from "../components/graphnodes/AnalyserNodeElement";

import {addNode, addEdge, removeNode, removeEdge} from "../state/slices/nodes";

import { nanoid } from "nanoid";

import "../style/reactFlow.css";

const nodeTypes = {
    Node: NodeElement,
    Input: InputNode,
    Analyser: AnalyserNodeElement
};

initAudio();

function MainView({ ...props }) {

    // const [elements, setElements] = useState<Array<any>>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        resumeAudio();
        const apn = new AudioPlayerNode({
            id: nanoid(),
            name: "AudioPlayerNode",
            sourceURL: "/static/test.wav"
        });
        const aon = new AudioOutputNode({
            id: nanoid(),
            name: "AudioOutputNode"
        });
        const fn = new FilterNode({
            id: nanoid(),
            name: "FilterNode",
            filter: 440
        });
        const bin1 = new BorkInputNode({
            id: nanoid(),
            type: INPUT_TYPES.SLIDER,
            min: 0,
            max: 22050,
            name: "Frequency"
        });
        const bin2 = new BorkInputNode({
            id: nanoid(),
            type: INPUT_TYPES.BUTTON,
            min: 0,
            max: 100,
            name: "Start"
        });
        const an = new AnalyserNode({
            id: nanoid(),
            name: "Analyser"
        });
        dispatch(addNode(apn, {x: 0, y: 0}, "Node"));
        dispatch(addNode(aon, {x: 50, y: 0}, "Node"));
        dispatch(addNode(fn, {x: 100, y: 0}, "Node"));
        dispatch(addNode(bin1, {x: 150, y: 0}, "Input"));
        dispatch(addNode(bin2, {x: 200, y: 0}, "Input"));
        dispatch(addNode(an, {x: 250, y: 0}, "Analyser"));
        // setElements([
        //     {
        //         id: '1',
        //         type: 'Input', // input node
        //         data: bin1,
        //         position: { x: 250, y: 25 },
        //     },
        //     {
        //         id: '2',
        //         type: 'Input', // input node
        //         data: bin2,
        //         position: { x: 250, y: 25 },
        //     },
        //     {
        //         id: '3',
        //         type: 'output', // output node
        //         data: { label: 'Output Node' },
        //         position: { x: 250, y: 250 },
        //     },
        //     {
        //         id: '4',
        //         type: 'Node',
        //         data: apn,
        //         position: {x: 300, y: 300}
        //     },
        //     {
        //         id: '5',
        //         type: 'Node',
        //         data: aon,
        //         position: {x: 300, y: 400}
        //     },
        //     {
        //         id: '6',
        //         type: 'Node',
        //         data: fn,
        //         position: {x: 350, y: 300}
        //     },
        //     // animated edge
        //     { id: 'e1-2', source: '1', target: '2', animated: true },
        //     { id: 'e2-3', source: '2', target: '3' },
        // ]);
    }, []);

    const elements = useSelector(state => state.nodes.graphEdges.concat(state.nodes.graphElements));

    const handleConnect = (params: Connection | Edge<any>) => {
        console.log({handleConnect: params});
        if (params.source && params.sourceHandle && params.target && params.targetHandle) {
            dispatch(addEdge({
                source: params.source,
                sourcePort: params.sourceHandle,
                target: params.target,
                targetPort: params.targetHandle
            }));
        }
        
    }

    return <>
        <ReactFlow 
            elements={elements} 
            nodeTypes={nodeTypes}
            onConnect={(params) => handleConnect(params)}
        >
            <Background gap={12} size={1} />
            <Controls />
            <MiniMap />
        </ReactFlow>
    </>
}

export default MainView;