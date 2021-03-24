
class Plugins1{
  apply(complier){
    complier.hooks.emit.tap('Plugins1',(compilation)=>{
      console.log('emit.tap 111');
    });

    complier.hooks.emit.tapAsync('Plugins1',(compilation,cb)=>{
      setTimeout(()=>{
        console.log('emit.tapAsync 111');
        cb();
      },2000);
    });

    complier.hooks.afterEmit.tap('Plugins1',(compilation)=>{
      console.log('afterEmit.tap 111');
    });

    complier.hooks.done.tap('Plugins1',(compilation)=>{
      console.log('done.tap 111');
    });
  }
}

module.exports =  Plugins1;