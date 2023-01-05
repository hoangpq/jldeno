#!/bin/sh
export LD_LIBRARY_PATH=/Applications/Julia-1.7.app/Contents/Resources/julia/lib
echo "\n\nDeno\n"
deno run -A --unstable jldeno.ts