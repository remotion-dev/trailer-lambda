# Remotion Lambda Trailer

<p align="center">
  <a href="https://github.com/JonnyBurger/remotion-logo">
    <img src="https://github.com/JonnyBurger/remotion-logo/raw/main/withtitle/element-0.png">
  </a>
</p>

This is the source code the [Remotion Lambda trailer](https://www.youtube.com/watch?v=GN2jkJphR5M). This video was written entirely in React using [Remotion](https://remotion.dev).

## Rendering via Remotion Lambda

To validate the claim in the video that it can be rendered in 15 seconds, first set up [Remotion Lambda](https://remotion.dev/docs/lambda/setup). Afterwards, deploy the project and render across 200 Lambda functions:

```bash
npx remotion lambda sites create src/index.tsx --site-name=trailer
npx remotion lambda render trailer Main --frames-per-lambda=12
npx remotion lambda render trailer Main --frames-per-lambda=12
```

On the second render, you should see a render time of around 15 seconds. We've achieved a time of 14.6 seconds in our best run.
Note: We are rendering the video twice to "warm up" the Lambda functions. There is no caching going on.

## Commands

**Start Preview**

```console
npm start
```

**Render video**

```console
npm run build
```

**Upgrade Remotion**

```console
npm run upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/JonnyBurger/remotion/issues/new).

## License

This code: MIT  
Remotion: Notice that for some entities a company license is needed. Read [the terms here](https://github.com/JonnyBurger/remotion/blob/main/LICENSE.md).
