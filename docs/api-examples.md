# API Examples

Check out the [live demo](https://borischerny.com/json-schema-to-typescript-browser/).

## JSON Schema

Input:

```json
{
  "title": "Example Schema",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "age": {
      "description": "Age in years",
      "type": "integer",
      "minimum": 0
    },
    "hairColor": {
      "enum": ["black", "brown", "blue"],
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": ["firstName", "lastName"]
}
```

Output:

```ts
export interface ExampleSchema {
  firstName: string
  lastName: string
  /**
   * Age in years
   */
  age?: number
  hairColor?: 'black' | 'brown' | 'blue'
}
```
