const encoder = new TextEncoder();

export function encode(value: string): Deno.PointerValue {
  const buf = encoder.encode(value + "\0");
  return Deno.UnsafePointer.of(buf);
}