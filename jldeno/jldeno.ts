import __ from "https://deno.land/x/dirname@1.1.2/mod.ts";
import * as path from "https://deno.land/std@0.125.0/path/mod.ts";
import { randomUUID } from "https://deno.land/std@0.170.0/node/crypto.ts";
import { SYMBOLS } from "./symbols.ts";
import { encode } from "./utils.ts";

const { __dirname } = __(import.meta);

let JlDeno!: Deno.DynamicLibrary<typeof SYMBOLS>["symbols"];

try {
  JlDeno = Deno.dlopen(
    path.join(__dirname, "../jlbun/build/", "libjlbun.dylib"),
    SYMBOLS,
  ).symbols;
} catch (e) {
  console.log(e.message);
}

function evalJlCode(code: string) {
  const cCode = encode(code);
  const ret = JlDeno.jl_eval_string(cCode);
}

JlDeno.jl_init0();
// evalJlCode("Pkg.activate(; temp=true)");
evalJlCode("__jl_globals__ = IdDict()");

const mainPtr = JlDeno.jl_main_module_getter();
const basePtr = JlDeno.jl_base_module_getter();

const println = JlDeno.jl_get_global(basePtr, JlDeno.jl_symbol(encode("println")));
const setIndex = JlDeno.jl_get_global(basePtr, JlDeno.jl_symbol(encode("setindex!")));
const global = JlDeno.jl_get_global(mainPtr, JlDeno.jl_symbol(encode("__jl_globals__")));

// JlDeno.jl_call1(println, global);

function tagEval(
  strings: TemplateStringsArray,
  ...values: any[]
) {
  const uuids = Array.from(
    { length: values.length },
    () => `tmp_${randomUUID()}`,
  );

  const arrType = JlDeno.jl_apply_array_type(
    JlDeno.jl_int64_type_getter(), 1
  );

  for (let i = 0; i < values.length; i++) {
    let ptr: any;
    if (typeof values[i] === "string") {
      ptr = JlDeno.jl_cstr_to_string(encode(values[i]));
    } else if (typeof values[i] === "number") {
      ptr = JlDeno.jl_box_int64(values[i]);
    } else if (values[i].length > 0) {
      ptr = JlDeno.jl_alloc_array_1d(arrType, values[i].length);
      values[i].forEach((v: number, index: number) => {
        JlDeno.jl_arrayset(ptr, JlDeno.jl_box_int64(v), index);
      });
    }

    JlDeno.jl_call3(
      setIndex,
      global,
      ptr,
      JlDeno.jl_cstr_to_string(encode(uuids[i])),
    );
  }

  const codeParts: string[] = strings.slice(0, 1);
  for (let i = 0; i < strings.length - 1; i++) {
    codeParts.push(`__jl_globals__["${uuids[i]}"]`);
    codeParts.push(strings[i + 1]);
  }
  const tmp = codeParts.join("");
  return evalJlCode(tmp);
}

const arr = [1, 2, 3];
tagEval`println(${arr})`;

const name = "Vampire";
tagEval`println("Hello: " * ${name})`;
