export default function measureTime(target, key, descriptor) {
    const originFn = descriptor.value;
    let i = 0;

    descriptor.value = function (...args) {
        const id = i++;
        console.time(key + id);
        const value = originFn.apply(this, args);
        console.timeEnd(key + id);
        return value;
    };
}