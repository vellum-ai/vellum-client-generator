# {Company} API

Tagging a release on this repository will update the:

- [Node.js SDK repo](https://github.com/fern-{company}/{company}-node)
- [OpenAPI spec repo](https://github.com/fern-{company}/{company}-openapi)
- [Postman collection repo](https://github.com/fern-{company}/{company}-postman)
- _More SDKs to come..._

## What is in this repository?

This repository contains

- {Company}'s Fern API Definition which lives in the [definition](./fern/api/definition/) folder
- Generators (see [generators.yml](./fern/api/generators.yml))

## What is in the API Definition?

The API Definition contains information about what endpoints, types, and errors are used in the API. The definition is broken into smaller files such as [{TODO}.yml](fern/api/definition/{TODO}.yml) and [{TODO}.yml](fern/api/definition/{TODO}.yml).

To make sure that the definition is valid, you can use the Fern CLI.

```bash
npm install -g fern-api # Installs CLI
fern check # Checks if the definition is valid
```

## What are generators?

Generators read in your API Definition and output artifacts (e.g. the TypeScript SDK Generator) and are tracked in [generators.yml](./fern/api/generators.yml).

To trigger the generators run:

```bash
# output generated files locally
fern generate

# publish generated files
fern generate --group publish --version <version>
```

The publish command currently runs in a GitHub workflow (see [ci.yml](.github/workflows/ci.yml#L32))
