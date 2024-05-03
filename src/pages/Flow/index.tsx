import EdgeComponent, { EdgeProps } from "../../components/EdgeComponent";
import NodeComponent, { NodeProps } from "../../components/NodeComponent";

export class Flow extends HTMLElement {
    constructor(){
        super();
        this.render();
    }
    render(){
        const flow = document.createElement('div');
        var props: NodeProps = {
            x:1,
            y:1,
            label: "label",
            content: "content",
            inputs: 3,
            outputs: 2,
            selected: false,
            onClickOutside: () => {},
            onNodeMount: () => {},
            onClickDelete: () => {},
            onMouseDown: () => {},
          };
        const edge = new NodeComponent(props);
        flow.appendChild(edge);
        this.innerHTML = flow.innerHTML;
    }
}

customElements.define("flow-root", Flow)