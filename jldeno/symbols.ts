export const SYMBOLS = {
  jl_init0: {
    parameters: [],
    result: "void",
  },
  jl_init_with_image0: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  jl_eval_string: {
    parameters: ["pointer"],
    result: "pointer",
  },
  /* global */
  jl_get_global: {
    parameters: ["pointer", "pointer"],
    result: "pointer"
  },
  jl_symbol: {
    parameters: ["pointer"],
    result: "pointer"
  },
  /* Modules */
  jl_main_module_getter: {
    parameters: [],
    result: "pointer"
  },
  jl_base_module_getter: {
    parameters: [],
    result: "pointer"
  },
  jl_call0: {
    parameters: ["pointer"],
    result: "pointer",
  },
  jl_call1: {
    parameters: ["pointer", "pointer"],
    result: "pointer",
  },
  jl_call3: {
    parameters: ["pointer", "pointer", "pointer", "pointer"],
    result: "pointer",
  },
  jl_box_int32: {
    parameters: ["i32"],
    result: "pointer",
  },
  jl_box_int64: {
    parameters: ["i64"],
    result: "pointer",
  },
  jl_cstr_to_string: {
    parameters: ["pointer"],
    result: "pointer",
  },
  jl_uint64_type_getter: {
    parameters: [],
    result: "pointer",
  },
  jl_int64_type_getter: {
    parameters: [],
    result: "pointer",
  },
  jl_int32_type_getter: {
    parameters: [],
    result: "pointer",
  },
  jl_uint32_type_getter: {
    parameters: [],
    result: "pointer",
  },
  jl_apply_array_type: {
    parameters: ["pointer", "i32"],
    result: "pointer",
  },
  jl_ptr_to_array_1d: {
    parameters: ["pointer", "pointer", "i32", "i32"],
    result: "pointer",
  },
  jl_alloc_array_1d: {
    parameters: ["pointer", "i32"],
    result: "pointer",
  },
  jl_arrayset: {
    parameters: ["pointer", "pointer", "i32"],
    result: "void",
  }
} as const;
