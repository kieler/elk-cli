# ELK-CLI
This is a simple wrapper around [elkjs](https://github.com/kieler/elkjs) to enable its usage directly from the commandline. It can be supplied with a graph from a file or directly over standard input. The expected format is the `elkj` format. When passing it directly in the commandline, care must be taken to correctly escape all quotes in the JSON object. The layouted graph is written `elkj` format to standard output.

## Installation
The elk cli tool can be installed using node:
```
> npm install -g @kieler/elk-cli
```
and then run as
```
> elk -f <inputfile>
```

## Usage

```
> elk -f examples/graph.json
```

## Generate SVGs
You can automatically generate a simple SVG of the laid out graph using the `-s <output.svg>` option. A css file for styling may be supplied using the `-c <style.css>` file. The examples folder contains an example style file.