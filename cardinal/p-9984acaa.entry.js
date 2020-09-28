import{r as t,c as s,h as i,g as e}from"./p-dac455db.js";import"./p-f2139256.js";import{a as o,s as r}from"./p-224883a5.js";import{T as n}from"./p-e04d2587.js";const h=class{constructor(i){t(this,i),this.getModelEvent=s(this,"getModelEvent",7),this.condition=null,this.conditionResult=!1,this.falseSlot=null,this.trueSlot=null}componentWillLoad(){if(!this._host.isConnected)return;this.modelChain=this.condition,this.modelChain=o(this.modelChain);let t=t=>{if(t.hasExpression(this.modelChain)){let s=()=>{this.condition=t.evaluateExpression(this.modelChain)};t.onChangeExpressionChain(this.modelChain,s),s()}else{let s=()=>{this.condition=t.getChainValue(this.modelChain)};t.onChange(this.modelChain,s),s()}this.falseSlot=null;const s=Array.from(this._host.children);let i=s.filter(t=>"condition-true"===t.getAttribute("slot"));this.trueSlot=i.map(t=>t.outerHTML).join("");let e=s.filter(t=>"condition-false"===t.getAttribute("slot"));this.falseSlot=e.map(t=>t.outerHTML).join(""),0===this.trueSlot.length&&0===this.falseSlot.length&&(this.trueSlot=s.map(t=>t.outerHTML).join("")),this._host.innerHTML=""};return new Promise(s=>{this.getModelEvent.emit({callback:(i,e)=>{i&&console.log(i),t(e),this._updateConditionResult().then(()=>{s()})}})})}componentWillUpdate(){return this._updateConditionResult()}_updateConditionResult(){let t;return t=this.condition instanceof Promise?this.condition:Promise.resolve(this.condition),t.then(t=>(this.conditionResult=r(t),Promise.resolve()))}render(){return i("psk-hoc",{innerHTML:this.conditionResult?this.trueSlot:this.falseSlot})}get _host(){return e(this)}};!function(t,s,i,e){var o,r=arguments.length,n=r<3?s:null===e?e=Object.getOwnPropertyDescriptor(s,i):e;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,s,i,e);else for(var h=t.length-1;h>=0;h--)(o=t[h])&&(n=(r<3?o(n):r>3?o(s,i,n):o(s,i))||n);r>3&&n&&Object.defineProperty(s,i,n)}([n({description:"The property value must be the name of a model property or expression. Children are rendered only if the value of the condition is evaluated to true",isMandatory:!0,propertyType:"any"})],h.prototype,"condition",void 0);export{h as psk_condition}