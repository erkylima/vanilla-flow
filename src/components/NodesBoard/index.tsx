import NodeComponent, { NodeComponentProps } from "../NodeComponent";
import styles from "./styles.module.css";
import CreateState  from "../../util/CreateState";

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
    grabbing: Function
    setGrabbing: Function
    selected: Function
    setSelected:Function
    scene: any
    constructor(props: Props) {
        super();

        [this.grabbing, this.setGrabbing] = CreateState<number|null>(null);
        [this.selected, this.setSelected] = CreateState<number | null>(null);
        this.props = props;
        this.render();
    }
    render(){
        
        const main = document.createElement("div");
        main.className = "main"
        main.setAttribute("ref", this.scene)
        main.onmousemove = this.handleOnMouseMoveScene
        main.onmouseup = this.handleOnMouseUpScene
        
        this.props.nodes.forEach((node, index) => {
            var props:NodeComponentProps = {
                x:this.props.nodesPositions[index].x,
                y:this.props.nodesPositions[index].y,
                selected:this.selected() === index,
                label:node.data.label,
                content:node.data.content,
                inputs:node.inputs,
                outputs:node.outputs
            }
            const nodeComp = new NodeComponent(props)
        })
    }
           

    handleOnMouseMoveScene(event: any) {
        const x = event.x - this.scene.getBoundingClientRect().x;
        const y = event.y - this.scene.getBoundingClientRect().y;
        if (this.grabbing() !== null) {
            this.props.onNodeMove(this.grabbing() || 0, x, y);
        }
        this.props.onMouseMove(x, y);
    }

    handleOnMouseUpScene(event: any) {
        this.setGrabbing(null);
        this.props.onMouseUp();
    }

    handleOnMouseDownNode(index: number, x: number, y: number) {
        this.setGrabbing(index);
        this.setSelected(index);
        this.props.onNodePress(
            x - this.scene.getBoundingClientRect().x - this.props.nodesPositions[index].x,
            y - this.scene.getBoundingClientRect().y - this.props.nodesPositions[index].y
        );
    }

    
        
    
}

export default NodesBoard;
