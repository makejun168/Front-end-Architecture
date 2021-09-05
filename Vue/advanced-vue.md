### mixin

```js
var myMixin = {
  created: function() {
    this.hello();
  },
  methods: {
    created
  }
}
```

本质上解决了复用问题，某个程序上类似 `React` 在 `Hooks` 没有出来之前的 `HOC` 方案