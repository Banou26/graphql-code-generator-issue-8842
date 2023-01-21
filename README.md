# graphql-code-generator issue XXXX

Using these fragments

```ts
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

export const GET_FOO = gql(`
  query GetFoo {
    foo {
      ...FooFragment
    }
  }
`)
```

and logging out `GET_FOO` we can see that there's the `CommonFragment` twice in that document, which causes most servers to reject the request
