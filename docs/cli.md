# CLI

Despite the code usage, you can also use it as a CLI tool.

## Installation

::: code-group

```sh [npm]
npm install @fumari/json2ts -D
```

```sh [pnpm]
pnpm add @fumari/json2ts -D
```

```sh [yarn]
yarn add @fumari/json2ts -D
```

:::

## Usage

Use the CLI to convert JSON files to TypeScript typings:

```sh
cat foo.json | json2ts > foo.d.ts
# or
json2ts foo.json > foo.d.ts
# or
json2ts foo.yaml foo.d.ts
# or
json2ts --input foo.json --output foo.d.ts
# or
json2ts -i foo.json -o foo.d.ts
# or (quote globs so that your shell doesn't expand them)
json2ts -i 'schemas/**/*.json'
# or
json2ts -i schemas/ -o types/
```

You can pass any of the [options](/options) as CLI flags. Boolean values can be set to false using the `no-` prefix.

```sh
# generate code for definitions that aren't referenced
json2ts -i foo.json -o foo.d.ts --unreachableDefinitions
# use single quotes and disable trailing semicolons
json2ts -i foo.json -o foo.d.ts --style.singleQuote --no-style.semi
```
