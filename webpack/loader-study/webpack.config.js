const path = require('path')

module.exports = {
  module:{
    rules:[
      {
        test:/.js$/,
        // use:[
        //   'loader1',
        //   'loader2',
        //   {
        //     loader:'loader3',
        //     options:{
        //       name:'jack',
        //       age:18
        //     }
        //   },
        // ]
        loader:'babelLoader',
        options:{
          presets:[
            '@babel/preset-env'
          ]
        }
      }
    ]
  },
  resolveLoader:{
    modules:[
      'node_modules',
      path.resolve(__dirname,'loaders')
    ]
  }
}