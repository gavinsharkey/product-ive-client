export const debounce = <T>(func: (...args: any[]) => T, delay: number) => {
  let inDebounce: NodeJS.Timeout
  return function(this: any, ...args: any[]) {
    const context = this
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() =>
      func.apply(context, args)
    , delay)
  }
}