/**
 * Contains the libjame node for displaying the audio waveform
 */

import Node from "libjame/src/Node";
import { PORT_TYPES, PORT_DIRECTIONS } from "libjame/src/Port";
import {getAudioContext} from "libjame/src/Audio";

type AnalyserNodeParams = {
    id?: any,
    name: string,
    fill?: string,
    lineWidth?: number,
    stroke?: string
};

export default class AnalyserNode extends Node {
    constructor(params: AnalyserNodeParams) {
        const defaults = {
            fill: "#eee",
            lineWidth: 1,
            stroke: "blue"
        };
        super(params, defaults);

        this._type = "AnalyserNode";

        this._addPort({
            id: "aud",
            type: PORT_TYPES.AUDIO,
            direction: PORT_DIRECTIONS.IN,
            name: "Audio Input"
        });

        const context = getAudioContext();

        this._analyserNode = context.createAnalyser();

        this.bufferLen = this._analyserNode.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLen);
        this._analyserNode.getByteTimeDomainData(this.dataArray);
    }

    _onAudioPortConnect(port: any) {
        if (port.control && port.control instanceof AudioNode) {
            port.control.connect(this._analyserNode);
        }
    }
}
