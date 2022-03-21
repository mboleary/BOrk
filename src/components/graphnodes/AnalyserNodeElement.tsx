/**
 * Contains the Element for an AnalyserNode.
 * 
 * Adapted from https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
 */

import React, { useState, useEffect, useMemo, useCallback, ChangeEventHandler, useRef } from "react";

import { Handle, Position } from "react-flow-renderer";

import Port, { PORT_TYPES, PORT_DIRECTIONS, buildPortObj } from "libjame/src/Port";

import { INPUT_TYPES } from "../../internalNodes/InputNode";

import { canConnect } from "../../state/helpers/node.helper";

import { environment } from "../../state/slices/nodes";

import "../../style/reactFlow.css";

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
    id: string,
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
const SIZE = 256;

function AnalyserNodeElement({ id, selected, isConnectable, ...props }: GraphNodeProps) {
    const ref = useRef<HTMLCanvasElement>(null);

    const data = useMemo(() => {
        return environment.getNodeByID(id);
    }, [id])

    const [fill, setFill] = useState<string>("black");
    const [lineWidth, setLineWidth] = useState<number>(2);
    const [stroke, setStroke] = useState<string>("red");

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

    useEffect(() => {
        let frame: number = 0;
        let ctx: CanvasRenderingContext2D | null = null;

        function draw() {
            frame = requestAnimationFrame(draw);
            data._analyserNode.getByteTimeDomainData(data.dataArray);

            if (ctx && ref.current) {
                ctx.fillStyle = fill;
                ctx.fillRect(0, 0, ref.current.width, ref.current.height);
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = stroke;
                ctx.beginPath();

                let sliceWidth = ref.current.width * 1.0 / data.bufferLen;
                let x = 0;

                for (var i = 0; i < data.bufferLen; i++) {

                    var v = data.dataArray[i] / 128.0;
                    var y = v * ref.current.height / 2;

                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                ctx.lineTo(ref.current.width, ref.current.height / 2);
                ctx.stroke();
            }

        }

        if (ref.current) {
            ctx = ref.current.getContext("2d");

            if (data && !frame) {
                draw();
            }
        }

        return () => {
            cancelAnimationFrame(frame);
        }
    }, [data, fill, lineWidth, stroke]);

    useEffect(() => {
        function setState() {
            setFill(data.params.fill);
            setLineWidth(data.params.lineWidth);
            setStroke(data.params.stroke);
        }




        if (data) {
            setState();
            data._onParamUpdate = function (params: any, paramName: string, value: any) {
                if (paramName === "fill") {
                    setFill(value);
                } else if (paramName === "lineWidth") {
                    setLineWidth(value);
                } else if (paramName === "stroke") {
                    setStroke(value);
                }
            }

        }


    }, [data]);

    const name = data._type;
    const mode = "input";

    return <div className={`react-flow__node-${mode} selectable ${selected ? "selected" : ""}`} style={{ minHeight: PORT_SPACING * leftHandles.length, minWidth: SIZE }}>
        {leftHandles}
        <div>
            <b>{name}</b>
        </div>
        <div>
            <i>{data.name}</i>
        </div>
        <canvas width={SIZE} height={SIZE} ref={ref} />
    </div>
}

export default AnalyserNodeElement;
