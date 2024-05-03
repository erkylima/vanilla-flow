export default function CreateState<T>(rerender:Function): [() => T, (value) => void] {
    var state:T = null
    const getter = (): any => {
        
    };

    const setter = (value: any) => {
        state = value;
        rerender();
    };

    return [getter, setter];
}

