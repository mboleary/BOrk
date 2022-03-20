/**
 * Renders an interactive input node that exposes a port
 */

import React, {useState, useEffect, useMemo, useCallback, ChangeEventHandler} from "react";

import { Handle, Position } from "react-flow-renderer";

import Port, {PORT_TYPES, PORT_DIRECTIONS, buildPortObj} from "libjame/src/Port";

import { INPUT_TYPES } from "../../internalNodes/InputNode";

import {canConnect} from "../../state/helpers/node.helper";

import { environment } from "../../state/slices/nodes";

import "../../style/reactFlow.css";

// export enum INPUT_TYPES {
//     BUTTON = "button",
//     CHECKBOX = "checkbox",
//     NUMBER = "number",
//     SLIDER = "range"
// }

// type PortInstance = {

// };

type PortObject = {
    out: any
};

type InputNodeData = {
    type: INPUT_TYPES,
    params: any,
    name: string,
    ports: PortObject,
    _type: string
};

// type PortObject = {
//     in: any,
//     out: any
// }

// type Node = {
//     ports: PortObject,
//     name: string
// };

type GraphNodeProps = {
    data: InputNodeData,
    selected: boolean,
    isConnectable: boolean,
    id: string
};

const PORT_TYPE_COLORS = {
    [PORT_TYPES.PARAM]: "#FF5733",
    [PORT_TYPES.MIDI]: "#41D000",
    [PORT_TYPES.AUDIO]: "#FFC300",
    [PORT_TYPES.TRIGGER]: "#00CBD0"
};

const PORT_SPACING = 15;

function InputNodeElement ({selected, isConnectable, id, ...props}: GraphNodeProps) {
    const data = useMemo(() => {
        return environment.getNodeByID(id);
    }, [id])
    const ports = data.ports;
    const rightHandles = useMemo(() => {
        let arr = [];
        if (ports.out) {
            let keys = Object.keys(ports.out);
            for (const k of keys) {
                const obj = ports.out[k];
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
        />)
    }, [ports.out, isConnectable]);

    const handleInputChange: ChangeEventHandler = (e) => {
        e.stopPropagation();
        ports.out.value.update((e.target as HTMLInputElement).value);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        ports.out.trigger.update((e.target as HTMLInputElement).value);
    }

    const mode = "input";

    return <div className={`react-flow__node-${mode} selectable ${selected ? "selected" : ""}`}>
        <div className="inputContainer">
            {
                data.params.type === INPUT_TYPES.BUTTON ? <button type="button" onClick={handleButtonClick}>{data.name}</button> : <>
                    <label>
                        {data.name}
                    </label>
                    <input type={data.params.type || INPUT_TYPES.NUMBER} min={data.params.min} max={data.params.max} name={id} onChange={handleInputChange} />
                </>
            }
            
        </div>
        {rightHandles}
    </div>
}

export default InputNodeElement;