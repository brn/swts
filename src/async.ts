/**
 * @fileoverview
 * @author Taketoshi Aono
 */


export async function iterate<T>(arr: T[], asyncFn: (a: T) => Promise<any>): Promise<void> {
  try {
    const max = arr.length;
    const fn = async (nextIndex: number) => {
      try {
        const ret = await asyncFn(arr[nextIndex]);
        if (max > nextIndex) {
          await fn(nextIndex + 1);
        }
      } catch(e) {
        throw e;
      }
    };
    if (max > 0) {
      await fn(0);
    }
  } catch(e) {
    throw e;
  }
}
