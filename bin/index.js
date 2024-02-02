#!/usr/bin/env node
/*******************************************************************************
 * Copyright (c) 2024 Kiel University and others.
 * 
 * This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License 2.0 
 * which is available at https://www.eclipse.org/legal/epl-2.0/ 
 * 
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

const fs = require("fs");
const yargs = require("yargs");
const ELK = require("elkjs");
const elksvg = require("elkjs-svg");

const elk = new ELK();

const usage = "Supply an elkj graph directly with the -g option or read in an elkj graph from a file with the -f option."
const options = yargs.usage(usage)
                     .option("g", {alias: "graph", describe: "Input elkj graph", type: "string", demandOption: false})
                     .option("f", {alias: "file", describe: "Input file", type: "string", demandOption: false})
                     .option("s", {alias: "svg", describe: "Render output as svg and write to file", type: "string", demandOption: false})
                     .option("c", {alias: "css", describe: "CSS to be used for svg", type: "string", demandOption: false})
                     .help(true)
                     .argv;

let graph = {}
if (options.g !== undefined) {
    console.log(options.g);
    graph = JSON.parse(options.g);

} else if (options.f !== undefined) {
    s = fs.readFileSync(options.f, "utf8");
    // Preserve newlines, etc. - use valid JSON
    s = s.replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
    // Remove non-printable and other non-valid JSON characters
    s = s.replace(/[\u0000-\u0019]+/g,"");
    graph = JSON.parse(s);
} else {
    console.log("Please supply an elkg graph. Use --help for usage information.")
    process.exit();
}
elk.layout(graph)
       .then(function(g) {
            if (options.s !== undefined) {
                let renderer = new elksvg.Renderer();
                let svg = {};
                if (options.c !== undefined) {
                    let css = fs.readFileSync(options.c, "utf-8");
                    svg = renderer.toSvg(g,
                        styles=css,
                    );
                } else {
                    svg = renderer.toSvg(g);
                }
                fs.writeFileSync(options.s, svg, "utf-8");
            }
            console.log(JSON.stringify(g))
        })
       .catch(console.error);
