import { ClickOutside } from "../../util/builder";
import styles from "./styles.module.css";

export interface NodeComponentProps {
    ref?: any;
    x: number;
    y: number;
    selected: boolean;
    actions?: { delete?: boolean };
    label?: string;
    content: any;
    inputs: number;
    outputs: number;
    onNodeMount?: (inputs: { offset: { x: number; y: number } }[], outputs: { offset: { x: number; y: number } }[]) => void;
    onMouseDown?: (event: any) => void;
    onMouseDownOutput?: (outputIndex: number) => void;
    onMouseUpInput?: (inputIndex: number) => void;
    onClickOutside?: () => void;
    onClickDelete?: () => void;
}

class NodeComponent extends HTMLElement {
    props: NodeComponentProps;
    private inputRefs: [...Array<HTMLElement>]
    private outputRefs: [...Array<HTMLElement>]
    constructor(props: NodeComponentProps){
        super();
        this.props = props;
        this.inputRefs = [...Array(this.props.inputs)];
        this.outputRefs = [...Array(this.props.outputs)];
        let inputs: { offset: { x: number; y: number } }[] = [];
        let outputs: { offset: { x: number; y: number } }[] = [];
        for (let i = 0; i < this.inputRefs.length; i++) {
            inputs.push({ offset: { x: this.inputRefs[0].getBoundingClientRect().x, y: this.inputRefs[0].getBoundingClientRect().y } });
        }

        for (let i = 0; i < this.outputRefs.length; i++) {
            outputs.push({ offset: { x: this.outputRefs[i].getBoundingClientRect().x, y: this.outputRefs[i].getBoundingClientRect().y } });
        }
        props.onNodeMount(inputs, outputs);
        this.render();
    }
    
    render(){
        const node = document.createElement('div');
        node.classList.add("node");
        node.style.transform = `translate(${this.props.x}px, ${this.props.y}px)`;
        node.onmousedown = this.props.onMouseDown;
        const action = document.createElement('div');
        action.className = this.props.selected ? "actions" : "actionsHidden";
        action.innerHTML = `
        ${this.props.actions && this.props.actions.delete && (
            <svg
                class="delete"
                onClick={() => {
                    if (this.props.onClickDelete) this.props.onClickDelete();
                }}
                fill="currentColor"
                stroke-width="0"
                baseProfile="tiny"
                version="1.2"
                viewBox="4 4 16 16"
                style="overflow: visible;"
            >
                <path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293a.999.999 0 11-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 01-1.414 0 .999.999 0 010-1.414L10.586 12 8.293 9.707a.999.999 0 111.414-1.414L12 10.586l2.293-2.293a.999.999 0 111.414 1.414L13.414 12l2.293 2.293z"></path>
            </svg>
        )}
        ${this.props.label && <span class="nodeLabel">{this.props.label}</span>}
        <div class="nodeContent">${this.props.content}</div>

        ${this.props.inputs > 0 && (
            <div class="nodeInputs">
                {[...Array(this.props.inputs).keys()].forEach((element,index) => {
                    <div
                    ref={(ref: any) => {
                        this.inputRefs[index] = ref;
                    }}
                    class={styles.nodeInput}
                    onMouseDown={(event: any) => {
                        event.stopPropagation();
                    }}
                    onMouseUp={(event: any) => {
                        event.stopPropagation();
                        if (this.props.onMouseUpInput) this.props.onMouseUpInput(index);
                    }}
                ></div>
                })}
                
            </div>
        )}

        ${this.props.inputs > 0 && (
            <div class="nodeInputs">
                {[...Array(this.props.inputs).keys()].forEach((element,index) => {
                    <div
                        ref={(ref: any) => {
                            this.inputRefs[index] = ref;
                        }}
                        class={styles.nodeInput}
                        onMouseDown={(event: any) => {
                            event.stopPropagation();
                        }}
                        onMouseUp={(event: any) => {
                            event.stopPropagation();
                            if (this.props.onMouseUpInput) this.props.onMouseUpInput(index);
                        }}
                    ></div>
                })}
                
            </div>
        )}

        ${this.props.outputs > 0 && (
            <div id="outputs" class="nodeOutputs">
                {[...Array(this.props.outputs).keys()].forEach((element, index) => {
                    <div
                    ref={(ref: any) => {
                        this.outputRefs[index] = ref;
                    }}
                    class="nodeOutput"
                    onMouseDown={(event: any) => {
                        event.stopPropagation();
                        if (this.props.onMouseDownOutput) this.props.onMouseDownOutput(index);
                    }}
                ></div>
                })}
                
            </div>
        )}
        `
        node.appendChild(action);
        ClickOutside(node, this.props.onClickOutside)

        this.appendChild(node);
    }            
    
};

export default NodeComponent;
customElements.define("node-component",NodeComponent)