# Server Side Rendering で <AMP ⚡️/> するやつ

React で AMP⚡️ を SSR したら幸せになれるんじゃないかと思ってやってみたやつ。

## 使い方

ビルドしてから起動

```bash
$ yarn build
$ yarn start
```

開発時は

```bash
$ yarn dev
```

で watch しつつ nodemon が動きます。

どちらも http://localhost:8080 で動作します。

テストは `"test": "jest"` しか書いていないのでよしなに。

```bash
$ yarn test -- --watch
```

とか。


## 方針

- Standalone AMP
  - Node.js サーバ以外では動かさない
  - `ReactDOM.renderToStaticMarkup()`
- 作り込みが目的ではないので React のコンポーネントは <App /> で Hello World のみ
- CSS も PostCSS で最小限
- CSS Modules や CSS in JS は使用しない
  - PostCSS で minify したものを raw-loader で読んでいる
    - つまりページごとに CSS が必要…
  - styled-components の夢も見たけど、現場のことを考えると CSS は別で書くのが幸せそう
- amphtml-validator が通らないコンポーネントは git push 禁止
- jest


## やってみて

- Standalone AMP なら考えることが少し減って悪くないかも
- amphtml-validator は Node API があるので Node で完結できる
- Node.js サーバーで運用する知見がないので単純に障害点が増える
- 実際はページが一つというのはありえないので react-router や CSS のインライン展開周りがもっと複雑になる
  - その辺やっていく自信がないなら PHP とかファイルをそのまま読める言語の方が良さそう
  - デザイナーに styled-components を教えるって手もある（たぶんない