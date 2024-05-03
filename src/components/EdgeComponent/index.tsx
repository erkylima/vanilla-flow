import styles from "./styles.module.css";
import CreateState  from "../../util/CreateState";
import { ClickOutside } from "../../util/builder";

export interface EdgeProps {
    selected: boolean;
    isNew: boolean;
    position: { x0: number; y0: number; x1: number; y1: number };
    onClickEdge: () => void;
    onClickDelete: () => void;
    onClickOutside: () => void;
}

export interface Position{ x: number; y: number }

export default class EdgeComponent extends HTMLElement {
    props:EdgeProps
    middlePoint:Position
    
    constructor(props: EdgeProps) {
        super();        
        this.props = props;        
        this.middlePoint = {
            x: props.position.x0 + (props.position.x1 - props.position.x0) / 2,
            y: props.position.y0 + (props.position.y1 - props.position.y0) / 2,
        };
        this.render();
    }

    setMiddlePoint(middlePoint:Position){
        this.middlePoint = middlePoint;
    }
    render(){
        if(this.props){
            const middleX = this.props.position.x0 + (this.props.position.x1 - this.props.position.x0) / 2;
            const middleY = this.props.position.y0 + (this.props.position.y1 - this.props.position.y0) / 2;
            this.setMiddlePoint({
                x: middleX,
                y: middleY,
            })
            const path = document.createElement('path');
            path.className = this.props.isNew ? "edgeNew" : this.props.selected ? "edgeSelected" : "edge";
            path.setAttribute('d',`M ${this.props.position.x0} ${this.props.position.y0} C ${
                this.props.position.x0 + this.calculateOffset(Math.abs(this.props.position.x1 - this.props.position.x0))
            } ${this.props.position.y0}, ${this.props.position.x1 - this.calculateOffset(Math.abs(this.props.position.x1 - this.props.position.x0))} ${
                this.props.position.y1
            }, ${this.props.position.x1} ${this.props.position.y1}`);
            path.onclick = this.props.onClickEdge;
            ClickOutside(path, this.props.onClickOutside)

            const s = `
            <path
                class=${this.props.isNew ? "edgeNew" : this.props.selected ? "edgeSelected" : "edge"}
                d=${`M ${this.props.position.x0} ${this.props.position.y0} C ${
                    this.props.position.x0 + this.calculateOffset(Math.abs(this.props.position.x1 - this.props.position.x0))
                } ${this.props.position.y0}, ${this.props.position.x1 - this.calculateOffset(Math.abs(this.props.position.x1 - this.props.position.x0))} ${
                    this.props.position.y1
                }, ${this.props.position.x1} ${this.props.position.y1}`}
                onClick=${() => this.props.onClickEdge()}
                use:clickOutside=${() => this.props.onClickOutside()}
            />
                ${this.props.selected && (
                <g
                    class="delete"
                    cursor="pointer"
                    transform={`translate(${this.middlePoint.x}, ${this.middlePoint.y})`}
                    onClick={this.props.onClickDelete}
                >
                    <circle class="circle" />
                    <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        color="white"
                        x="-10"
                        y="-10"
                    >
                        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                    </svg>
                </g>
            )}`
            this.innerHTML = `${path.outerHTML}`

        }
    }

    calculateOffset(value: number): number {
        return (value * 100) / 200;
    }

    
        /*
            
            {this.props.selected && (
                <g
                    class={styles.delete}
                    cursor="pointer"
                    transform={`translate(${middlePoint().x}, ${middlePoint().y})`}
                    onClick={this.props.onClickDelete}
                >
                    <circle class={styles.circle} />
                    <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        class={styles.icon}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        color="white"
                        x="-10"
                        y="-10"
                    >
                        <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                    </svg>
                </g>
            )}
        
    */
}


customElements.define("edge-component", EdgeComponent)