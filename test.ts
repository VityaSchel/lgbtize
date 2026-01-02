import { $ } from "bun";
import { lgbt } from ".";

const hetero = await fetch("https://bun.sh/logo.svg")
	.then((res) => res.arrayBuffer())
	.then((buf) => new Uint8Array(buf));

const result = await lgbt(hetero);
await $`open -a Preview.app -f < ${result}`;
