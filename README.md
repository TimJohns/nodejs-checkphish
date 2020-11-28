# CheckPhish Node.js Library

![Node.js CI](https://github.com/actions/hello-world/workflows/Node.js%20CI/badge.svg)

The CheckPhish Node.js Library provides convenient access to the CheckPhish API from Bolster, for applications running in Node.js environments (written in either JavaScript or TypeScript).

For more information on CheckPhish, and how to use the API (and this library) to automate your phishing detection & response with real-time detection, see the [CheckPhish API](https://checkphish.ai/checkphish-api/).

## Installation

Install the package with:

```sh
npm install @timjohns/checkphish --save
```

## Usage

The library needs to be configured with a valid CheckPhish API key, which is
available after signing up for free at [CheckPhish.ai](https://checkphish.ai/).

```ts
import { CheckPhish } from '@timjohns/checkphish';

const checkphish = new CheckPhish('your CheckPhish API key');

const scan = async () => {
  const scanResponse = await checkphish.scan('https://example.com/');

  console.log(JSON.stringify({scanResponse}, null, 2));
}

// This will almost always show PENDING - see the checkphish-cli for a more functional example
scan();
```

You can find a full TypeScript example at [checkphish-cli](https://github.com/TimJohns/checkphish-cli).



