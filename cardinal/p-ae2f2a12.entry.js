import{r as e,h as i}from"./p-7cf930c5.js";import"./p-d9d3000e.js";import"./p-64251922.js";import{T as t}from"./p-01e50cc5.js";import{C as s}from"./p-42a5bb64.js";import{B as o}from"./p-5ebf7f0a.js";var n=function(e,i,t,s){var o,n=arguments.length,a=n<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,i,t,s);else for(var p=e.length-1;p>=0;p--)(o=e[p])&&(a=(n<3?o(a):n>3?o(i,t,a):o(i,t))||a);return n>3&&a&&Object.defineProperty(i,t,a),a};const a=class{constructor(i){e(this,i),this.__inputHandler=e=>{e.stopImmediatePropagation(),this.modelHandler.updateModel("value",e.target.value)},this.label=null,this.value=null,this.name=null,this.placeholder=null,this.required=!1,this.readOnly=!1,this.invalidValue=null}render(){return i("psk-input",{type:"email",label:this.label,name:this.name,value:this.value,placeholder:this.placeholder,required:this.required,readOnly:this.readOnly,invalidValue:this.invalidValue,specificProps:{onKeyUp:this.__inputHandler.bind(this),onChange:this.__inputHandler.bind(this)}})}};n([s(),o()],a.prototype,"modelHandler",void 0),n([t({description:['By filling out this property, the component will display above it, a label using <psk-link page="forms/psk-label">psk-label</psk-link> component.'],isMandatory:!1,propertyType:"string",specialNote:"If this property is not provided, the component will be displayed without any label"})],a.prototype,"label",void 0),n([t({description:["Specifies the value of an psk-email-input component.",'This value is updated also in the model using the two-way binding. Information about two-way binding using models and templates can be found at: <psk-link page="forms/using-forms">Using forms</psk-link>.'],isMandatory:!1,propertyType:"string"})],a.prototype,"value",void 0),n([t({description:["Specifies the name of a psk-email-input component. It is used along with the psk-label component."],isMandatory:!1,propertyType:"string"})],a.prototype,"name",void 0),n([t({description:["Specifies a short hint that describes the expected value of an psk-email-input component"],isMandatory:!1,propertyType:"string"})],a.prototype,"placeholder",void 0),n([t({description:["Specifies that an input field must be filled out before submitting the form.",'Accepted values: "true" and "false"'],isMandatory:!1,propertyType:"boolean",defaultValue:"false"})],a.prototype,"required",void 0),n([t({description:["\tSpecifies that an input field is read-only.",'Accepted values: "true" and "false"'],isMandatory:!1,propertyType:"boolean",defaultValue:"false"})],a.prototype,"readOnly",void 0),n([t({description:["This property indicates if the value entered by the user is a valid one according to some validation present in the controller."],isMandatory:!1,propertyType:"boolean"})],a.prototype,"invalidValue",void 0);export{a as psk_email_input}