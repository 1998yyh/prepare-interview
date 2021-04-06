function _instanceOf(left, right) {
  var proto = left.__proto__;
  var prototype = right.prototype;
  while(true){
    if(proto === prototype){
      return true;
    }else if(proto === null){
      return false
    }else{
      proto = proto.__proto__;
    }
  }
}