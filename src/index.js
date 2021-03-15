import parseHtml from '../vue相关/ast';
import h from '../vue相关/h';
import patch from '../vue相关/patch';

const container = document.querySelector('#container');
const btn = document.querySelector('button');

const myVnode = h('p',{},'你好');
const myVnode3 = h('p',{},[
  h('div',{},'xx')
]);

const myVnode1 = h(
  'ul',{},[
    h('li',{key:'aaa'},'aaa'),
    h('li',{key:'bbb'},'bbb'),
  ]
);

const myVnode2 = h(
  'ul',{},[
    h('li',{key:'eee'},'eee'),
    h('li',{key:'aaa'},'aaa'),
    h('li',{key:'bbb'},'bbb'),
    h('li',{key:'ccc'},'ccc'),
    h('li',{key:'ddd'},'ddd'),
  ]
);
patch(container,myVnode1);

btn.onclick = function(){
  patch(myVnode1,myVnode2);
};

const templateStr = `<div>
    <h3>什么</h3>
    <ul class="uu" id="uu">
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
    <div>
      <div>嵌套</div>
    </div>
  </div>`;

console.log(parseHtml(templateStr));