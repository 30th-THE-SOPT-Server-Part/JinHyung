export async function promHandler<T>(
  prom: Promise<T>
): Promise<[T | null, any]> {
  try {
    return [await prom, null];
  } catch (error) {
    return [null, error];
  }
}

export default {
    promHandler
}