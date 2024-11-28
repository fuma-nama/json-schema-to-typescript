export const input = {
  type: 'object',
  properties: {
    A: {
      type: 'string',
      nullable: true
    },
    B: {
      type: ['string'],
      nullable: true
    },
    C: {
      allOf: [
        { type: 'string' },
        { nullable: true }
      ]
    },
    D: {
      type: ['string', 'null']
    },
    E: {
      allOf: [
        { $ref: '#/definitions/MyString' },
        { nullable: true }
      ]
    },
    F: {
      allOf: [
        { type: 'string' },
        { $ref: '#/definitions/MyNullable' }
      ]
    },
    G: {
      allOf: [
        { $ref: '#/definitions/MyString' },
        { $ref: '#/definitions/MyNullable' }
      ]
    },
    H: {
      allOf: [
        { enum: ['foo', 'bar'] },
        { $ref: '#/definitions/MyNullable' }
      ]
    },
    I: {
      allOf: [
        { type: ['string', 'number' ] },
        { nullable: true },
      ]
    },
    J: {
      allOf: [
        {
          type: 'object',
          properties: {
            foo: { type: 'string' },
            bar: { type: 'number' },
          },
          required: ['foo', 'bar'],
          additionalProperties: false
        },
        { $ref: '#/definitions/MyNullable' }
      ]
    }
  },
  required: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  additionalProperties: false,
  definitions: {
    MyString: { name: 'string', type: 'string' },
    MyNullable: { nullable: true },
  }
}
