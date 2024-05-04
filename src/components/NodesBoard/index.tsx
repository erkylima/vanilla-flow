import NodeComponent, { NodeComponentProps } from "../NodeComponent";
import styles from "./styles.module.css";

interface NodeBoardProps {
    id: string;
    data: { label?: string; content: any };
    inputs: number;
    outputs: number;
    actions?: { delete: boolean };
}

interface Props {
    nodesPositions: { x: number; y: number }[];
    nodes: NodeBoardProps[];
    onNodeMount: (values: {
        nodeIndex: number;
        inputs: { offset: { x: number; y: number } }[];
        outputs: { offset: { x: number; y: number } }[];
    }) => void;
    onNodePress: (x: number, y: number) => void;
    onNodeMove: (nodeIndex: number, x: number, y: number) => void;
    onNodeDelete: (nodeId: string) => void;
    onOutputMouseDown: (nodeIndex: number, outputIndex: number) => void;
    onInputMouseUp: (nodeIndex: number, inputIndex: number) => void;
    onMouseUp: () => void;
    onMouseMove: (x: number, y: number) => void;
}

class NodesBoard extends HTMLElement{
    props: Props
    grabbing: number | null    
    setGrabbing(value: number|null){
        this.grabbing = value;        
    }    
    selected: number | null
    setSelected(value: number|null){
        this.selected = value;
    }
    scene: HTMLElement
    constructor(props: Props) {
        super();
        this.props = props;
        this.render()
    }

    connectedCallback() {
        this.grabbing = null;
        this.selected = null;
    }

    render(){
        if (this.props){
            const main = document.createElement("div");
            main.className = "nodeMain"
            main.onmousemove = this.handleOnMouseMoveScene
            main.onmouseup = this.handleOnMouseUpScene        
            this.scene = main;
            main.setAttribute("ref", "nodeMain")
            this.props.nodes.forEach((node, index) => {
                var props:NodeComponentProps = {
                    x:this.props.nodesPositions[index].x,
                    y:this.props.nodesPositions[index].y,
                    selected:this.selected === index,
                    label:node.data.label,
                    content:node.data.content,
                    inputs:node.inputs,
                    outputs:node.outputs,
                    onMouseDown: (event: MouseEvent) => {
                        
                        this.handleOnMouseDownNode(index, event.x, event.y)                    
                    },
                    onNodeMount: (inputs: { offset: { x: number; y: number } }[], outputs: { offset: { x: number; y: number } }[]) =>
                        this.props.onNodeMount({
                            
                            nodeIndex: index,
                            inputs: inputs.map((values: { offset: { x: number; y: number } }) => {
                                return {
                                    offset: {
                                        x: values.offset.x - main.getBoundingClientRect().x - this.props.nodesPositions[index].x + 6,
                                        y: values.offset.y - main.getBoundingClientRect().y - this.props.nodesPositions[index].y + 6,
                                    },
                                };
                            }),
                            outputs: outputs.map((values: { offset: { x: number; y: number } }) => {
                                return {
                                    offset: {
                                        x: values.offset.x - this.scene.getBoundingClientRect().x - this.props.nodesPositions[index].x + 6,
                                        y: values.offset.y - this.scene.getBoundingClientRect().y - this.props.nodesPositions[index].y + 6,
                                    },
                                };
                            }),
                    }),
                    onMouseDownOutput: (outputIndex: number) => this.props.onOutputMouseDown(index, outputIndex),
                    onMouseUpInput: (inputIndex: number) => this.props.onInputMouseUp(index, inputIndex),
                    onClickOutside: () => {
                        if (index === this.selected) this.setSelected(null);
                    },
                    onClickDelete: () => {
                        this.setSelected(null);
                        this.props.onNodeDelete(node.id);
                    },
                }
                const nodeComp = new NodeComponent(props)
                main.innerHTML = main.innerHTML + nodeComp.innerHTML

            })

            this.innerHTML = main.outerHTML;
        }
    }
           

    handleOnMouseMoveScene(event: any) {
        const x = event.x - this.scene.getBoundingClientRect().x;
        const y = event.y - this.scene.getBoundingClientRect().y;
        if (this.grabbing !== null) {
            this.props.onNodeMove(this.grabbing || 0, x, y);
        }
        this.props.onMouseMove(x, y);
        this.render();
    }

    handleOnMouseUpScene(event: any) {
        this.setGrabbing(null);
        this.props.onMouseUp();
        this.render();
    }

    handleOnMouseDownNode(index: number, x: number, y: number) {
        this.setGrabbing(index);
        this.setSelected(index);
        this.props.onNodePress(
            x - this.scene.getBoundingClientRect().x - this.props.nodesPositions[index].x,
            y - this.scene.getBoundingClientRect().y - this.props.nodesPositions[index].y
        );        

        this.render();
    }

    
        
    
}

customElements.define("nodes-board", NodesBoard)
export default NodesBoard;
