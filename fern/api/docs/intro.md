## Vellum API Documentation

### Welcome 👋

Welcome to Vellum's API documentation! Here you'll find information about the various endpoints available to you,
as well as the parameters and responses that they accept and return.

We will be exposing more and more of our APIs over time as they stabilize. If there is some action you can perform
via the UI that you wish you could perform via API, please let us know and we can expose it here in an unstable state.

### API Stability

Some of the APIs documented within are undergoing active development. Use the
<strong style="background-color:#4caf50; color:white; padding:4px; border-radius:4px">Stable</strong>
and
<strong style="background-color:#ffc107; color:white; padding:4px; border-radius:4px">Unstable</strong>
tags to differentiate between those that are stable and those that are not.

### Base URLs

Some endpoints are hosted separately from the main Vellum API and therefore have a different base url. If this is
the case, they will say so in their description.

Unless otherwise specified, all endpoints use <code>https://api.vellum.ai</code> as their base URL.

### Official API Clients:

Vellum maintains official API clients for Python and Node/Typescript. We recommend using these clients to interact
with all stable endpoints. You can find them here:

- [Python](https://github.com/vellum-ai/vellum-client-python)
- [Node/Typescript](https://github.com/vellum-ai/vellum-client-node)
