export default function memoize<Signature extends Function>(func: Signature): Signature {
  const cache: Record<string, unknown> = {}

  return (((...args: unknown[]) => {
    const key = JSON.stringify(args)
    if(!cache[key]) {
      cache[key] = func.apply(null, args)
    }

    return cache[key]
  }) as Function) as Signature
}