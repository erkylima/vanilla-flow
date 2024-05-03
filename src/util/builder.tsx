export function DivBuilder(id:string, className: string): HTMLElement{
    const doc = document.createElement("div");
    doc.className = className;
    doc.id = id;
    return doc;
}

export function ButtonBuilder(id:string, className: string): HTMLElement{
    const doc = document.createElement("button");
    doc.className = className;
    doc.id = id;
    return doc;
}

export function ClickOutside(element: any, callback: Function) {
    const handleClick = (event) => {
        if (!element.contains(event.target)) {
            callback();
        }
    };

    document.addEventListener('click', handleClick);

    return () => {
        document.removeEventListener('click', handleClick);
    };
}