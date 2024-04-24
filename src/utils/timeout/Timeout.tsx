export function getTimeoutId(result: boolean) {
    return setTimeout(() => {
        console.log("Timeout completed with result:", result);
    }, 2000);
}