export function before(beforeFn: any) {
    return function(target: any, name: any, descriptor: any) {
        const oldValue = descriptor.value;

        descriptor.value = function() {
            beforeFn.apply(this, arguments);
            return oldValue.apply(this, arguments);
        };

        return descriptor;
    };
}

export function after(afterFn: any) {
    return function(target: any, name: any, descriptor: any) {
        const oldValue = descriptor.value;

        descriptor.value = function() {
            const ret = oldValue.apply(this, arguments);
            afterFn.apply(this, arguments);
            return ret;
        };

        return descriptor;
    };
}

function measure(target: any, name: string, descriptor: any) {
    const oldValue = descriptor.value;

    descriptor.value = async function(...args) {
        const start = Date.now();
        const res = await oldValue.apply(this, args);

        console.log(`${name}执行耗时时间${Date.now() - start}ms`)
        return res;
    }

    return descriptor

}