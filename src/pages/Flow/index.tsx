import FlowChart, { EdgeProps, NodeProps } from "../../components/Board";

const initialNodes = [
    {
        id: "node-1",
        position: { x: 50, y: 100 },
        data: {
            content: "This is a simple node",
        },
        inputs: 0,
        outputs: 1,
    },
    {
        id: "node-2",
        position: { x: 350, y: 100 },
        data: {
            label: "Node with label",
            content: "This is a node with a label",
        },
        inputs: 1,
        outputs: 1,
    },
    {
        id: "node-3",
        position: { x: 350, y: 300 },
        data: {
            content: "This is a node with two inputs and two outputs",
        },
        inputs: 2,
        outputs: 2,
    },

    {
        id: "node-4",
        position: { x: 700, y: 100 },
        data: {
            label: "Only inputs",
            content: "This is a node with only inputs",
        },
        inputs: 2,
        outputs: 0,
    },
];

const initialEdges = [
    {
        id: "edge_0:0_1:0",
        sourceNode: "node-1",
        sourceOutput: 0,
        targetNode: "node-2",
        targetInput: 0,
    },
    {
        id: "edge_0:0_2:0",
        sourceNode: "node-1",
        sourceOutput: 0,
        targetNode: "node-3",
        targetInput: 0,
    },
    {
        id: "edge_1:0_3:0",
        sourceNode: "node-2",
        sourceOutput: 0,
        targetNode: "node-4",
        targetInput: 0,
    },
    {
        id: "edge_2:0_3:1",
        sourceNode: "node-3",
        sourceOutput: 0,
        targetNode: "node-4",
        targetInput: 1,
    },
];

export class Flow extends HTMLElement {
    nodes:NodeProps[];
    setNodes(nodes:NodeProps[]){
        this.nodes = nodes;
    }
    edges:EdgeProps[];
    setEdges(edges:EdgeProps[]){
        this.edges = edges;
    }
    constructor(){
        super();
        this.setNodes(initialNodes);
        this.setEdges(initialEdges);
    }
    connectedCallback() {
        this.render();
    }
    render(){
        const flowchart = new FlowChart({
            nodes: this.nodes,
            edges: this.edges,
            onNodesChange: (newNodes: NodeProps[]) => {
                this.setNodes(newNodes);
            },
            onEdgesChange: (newEdges: EdgeProps[]) => {
                this.setEdges(newEdges);
            }
        })
        this.innerHTML = flowchart.outerHTML;
    }
}

customElements.define("flow-root", Flow)