/**
 * Given a libjame node, this visualizes it on the graph as a custom node
 */

import React, {useState, useEffect, useMemo, useCallback} from "react";

import { Handle, Position } from "react-flow-renderer";

import {PORT_TYPES} from "libjame/src/Port";

import {canConnect} from "../../state/helpers/node.helper";

type PortObject = {
    in: any,
    out: any
}

type Node = {
    ports: PortObject,
    name: string,
    _type: string
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
            id={item.__keyname}
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
    }, [data.ports.in, isConnectable]);

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
            id={item.__keyname}
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
            isValidConnection={(connection) => canConnect(connection)}
            // onConnect={(params) => console.log('handle onConnect', params)}
        />)
    }, [data.ports.out, isConnectable]);

    const name = data._type;
    const mode = leftHandles.length === 0 && rightHandles.length > 0 ? "input" : leftHandles.length > 0 && rightHandles.length === 0 ? "output" : "default";

    return <div className={`react-flow__node-${mode} selectable ${selected ? "selected" : ""}`} style={{ minHeight: PORT_SPACING * Math.max(leftHandles.length, rightHandles.length)}}>
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