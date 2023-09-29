# Vellum API

Tagging a release on this repository will update the following clients:

- [Node.js SDK repo](https://github.com/vellum-ai/vellum-client-node)
- [Python SDK repo](https://github.com/vellum-ai/vellum-client-python)

## What is in this repository?

This repository contains

- Vellum's Fern API Definition which lives in the [definition](./fern/api/definition/) folder
- Generators (see [generators.yml](./fern/api/generators.yml))
- Definition for Help Documentation

## What is in the API Definition?

The API Definition contains an OpenAPI Specification adapted to be compatible with Fern.

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

## Publishing new client versions
Here are the steps required to publish a new version of our API clients.
1. cd into the `django` directory from within the [main vellum repo](https://github.com/vellum-ai/vellum)
2. Run `make generate-swagger-all`
3. Open the generated `schema_api_client_v1.yaml` file
4. Copy the contents of the file and paste it into the definition within this repo: [fern/api/openapi/openapi.yaml](./fern/api/openapi/openapi.yaml)
5. Optionally run `fern check` to make sure all is good.
6. Optionally run `fern generate` to see the newly generated clients locally.
    - If this is your first time, fern will ask you to log in. Hit `Y` to proceed logging in through GitHub.
7. Commit and push the changes to the `main` branch.
8. Create a new Release within Github. This will trigger a github action that will publish the new clients to their respective repos.

## Upgrading Fern
You can use the following command to upgrade fern to the latest version:
```bash
fern upgrade --rc
```

## Docs Site
Fern hosts our docs site at [https://docs.vellum.ai/](https://docs.vellum.ai/). The site navigation and page structure
is defined by the [docs.yml](./fern/api/docs.yml) file. The content for each page is defined in the [help](./docs/content/help) folder
as `.mdx` files using markdown syntax.

### Static Assets
Fern is in the process of adding support for relative links to static assets like images. In the meantime, we host all
images ourselves in [this public GCS bucket](https://console.cloud.google.com/storage/browser/vellum-public/help-docs?project=vocify-prod).

### Custom Components
You'll notice the usage of some custom components like `CodeBlock`. These are specific to fern.


### Local Development
Fern has not yet released a mechanism to locally compile and preview the docs site. In the meantime, you can
deploy to our staging site to preview your changes (see below for deploying to staging).


### Deploying the Docs Site
You can publish the docs to the staging site by running the following command:
```bash
fern generate --docs --instance vellum-staging.docs.buildwithfern.com
```

The staging site can be found at [vellum-staging.docs.buildwithfern.com](https://vellum-staging.docs.buildwithfern.com/).

You can publish the docs to production by running:
```bash
fern generate --docs --instance vellum.docs.buildwithfern.com
```

The production site can be found at [docs.vellum.ai](https://docs.vellum.ai/).

### Troubleshooting

If you run into errors, you can add the ` --log-level debug` flag to get more information.

If you get a 403 error, you may need to first run `fern login`. You might also need to be added
to the Vellum org in Fern, which requires contacting the fern team in #fern-x-vellum in Slack.