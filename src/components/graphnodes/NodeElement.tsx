/**
 * Given a libjame node, this visualizes it on the graph as a custom node
 */

import React, {useState, useEffect, useMemo} from "react";

import { Handle, Position } from "react-flow-renderer";

import {PORT_TYPES} from "libjame/src/Port";

type PortObject = {
    in: any,
    out: any
}

type Node = {
    ports: PortObject,
    name: string
};

type GraphNodeProps = {
    data: Node,
    selected: boolean,
    isConnectable: boolean
};

const PORT_TYPE_COLORS = {
    [PORT_TYPES.PARAM]: "#FF5733",
    [PORT_TYPES.MIDI]: "#41D000",
    [PORT_TYPES.AUDIO]: "#FFC300",
    [PORT_TYPES.TRIGGER]: "#00CBD0"
};

const PORT_SPACING = 15;

function NodeElement ({data, selected, isConnectable, ...props}: GraphNodeProps) {
    const leftHandles = useMemo(() => {
        let arr = [];
        if (data.ports.in) {
            let keys = Object.keys(data.ports.in);
            for (const k of keys) {
                const obj = data.ports.in[k];
                if (obj) {
                    obj.__keyname = k;
                    arr.push(obj);
                }
            }
        }
        return arr.map((item, index) => <Handle 
            key={item.id}
            id={item.id}
            type="target"
            position={Position.Left}
            style={{
                background: PORT_TYPE_COLORS[item.type] || "#1a192b",
                top: PORT_SPACING * (index + 1),
                color: "#666"
            }}
            title={item.name}
            data-label={item.__keyname}
            isConnectable={isConnectable}
        />)
    }, [data.ports.in]);

    const rightHandles = useMemo(() => {
        let arr = [];
        if (data.ports.out) {
            let keys = Object.keys(data.ports.out);
            for (const k of keys) {
                const obj = data.ports.out[k];
                if (obj) {
                    obj.__keyname = k;
                    arr.push(obj);
                }
            }
        }
        return arr.map((item, index) => <Handle 
            key={item.id}
            id={item.id}
            type="source"
            position={Position.Right}
            style={{
                background: PORT_TYPE_COLORS[item.type] || "#1a192b",
                top: PORT_SPACING * (index + 1),
                color: "#666"
            }}
            title={item.name}
            data-label={item.__keyname}
            isConnectable={isConnectable}
            // isValidConnection={(connection) => }
            onConnect={(params) => console.log('handle onConnect', params)}
        />)
    }, [data.ports.out]);

    const name = data.constructor.name;

    return <div className={`react-flow__node-default selectable ${selected ? "selected" : ""}`} style={{ minHeight: PORT_SPACING * Math.max(leftHandles.length, rightHandles.length)}}>
        {leftHandles}
        <div>
            <b>{name}</b>
        </div>
        <div>
            <i>{data.name}</i>
        </div>
        {rightHandles}
    </div>
}

export default NodeElement;