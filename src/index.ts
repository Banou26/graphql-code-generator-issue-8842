import type { TypedQueryDocumentNode } from 'graphql'

import { gql } from './generated'

export const COMMON_FRAGMENT = gql(`
  fragment CommonFragment on Common {
    common
    common2
  }
`)

export const FOO_FRAGMENT = gql(`
  fragment FooFragment on Foo {
    ...CommonFragment
    foo
    foo2
    bar {
      ...BarFragment
    }
  }
`)

export const BAR_FRAGMENT = gql(`
  fragment BarFragment on Bar {
    ...CommonFragment
    bar
    bar2
  }
`)

export const _GET_FOO = gql(`
  query GetFoo {
    foo {
      ...FooFragment
    }
  }
`)

const removeDuplicate = <T>(document: T): T => ({
  ...document,
  definitions: (document as TypedQueryDocumentNode).definitions.reduce((acc, def) => {
    if (acc.find((d) => d.kind === def.kind && d.name?.value === def.name?.value)) {
      return acc
    }
    return [...acc, def]
  }, [] as TypedQueryDocumentNode['definitions'])
})

// bug with graphql-codegen, https://github.com/dotansimha/graphql-code-generator/issues/XXXX
const GET_FOO = removeDuplicate(_GET_FOO)

console.log('_GET_FOO', _GET_FOO)
console.log('GET_FOO', GET_FOO)
