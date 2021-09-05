rjDefine('a', ['lodash'], function() {
  console.log('moduleA load');

  return {
    str: function() {
      console.log('module A return data')
      return _.repeat('>>>>>', 20)
    }
  }
})