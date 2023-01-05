import { Julia, JuliaArray } from "./jlbun";

Julia.init();
Julia.eval('println("Hello from Julia")'); // "Hello from Julia"

const arr = [1, 2, "hello"];
Julia.tagEval`println(${arr})`; // "Any[1, 2, "hello"]"

const arr2 = new Uint8Array([1, 2, 3]);
Julia.tagEval`println(${arr2})`; // "UInt8[0x01, 0x02, 0x03]"

const obj = { foo: 0, bar: false, bal: [1, 2, 3] }
Julia.tagEval`println(${obj})`; // "(foo = 0, bar = false, bal = Any[1, 2, 3])"

// Create a `TypedArray` at the Bun side.
const bunArray = new Float64Array([1, 2, 3, 4, 5]);

// Create a `JuliaArray` from the `TypedArray`.
const juliaArray = JuliaArray.from(bunArray);

Julia.println(Julia.Base["*"])

// These two arrays now share the same memory.
Julia.print(Julia.Base.map(Julia.Base["+"], juliaArray, juliaArray)) // [1.0, 2.0, 3.0, 4.0, 5.0]


Julia.close();
