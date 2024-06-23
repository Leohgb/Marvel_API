export function getTimeoutId(result: boolean) {
    return new Promise<boolean>((res) => {
        setTimeout(() => {
            res(result);
        }, 10000);
    });
}