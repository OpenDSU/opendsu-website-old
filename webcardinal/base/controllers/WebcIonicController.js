import WebcController from './WebcController.js';

//by default ionic components keep their model on value property
//sometimes it is possible that you need some other information. E.g on ion-checkbox you want to see if the model is checked

const ionEventsChainMappings = [{
  eventName: "ionChange",
  components:{
    "ion-checkbox":{
      chainTriggered:"checked"
    },
    "ion-toggle":{
      chainTriggered:"checked"
    }
  },
}]

export default class IonicController extends WebcController {

  constructor(...props) {
    super(...props);
    let constructorElement = props[0];

    ionEventsChainMappings.forEach((ionEventChainMapping)=>{
      let eventName = ionEventChainMapping.eventName;

      constructorElement.addEventListener(eventName,(event)=>{
        let eventSource = event.target;
        let eventValue = event.target.value;
        let componentName = eventSource.tagName.toLowerCase();
        let chainTriggered = ionEventChainMapping.components[componentName];

        if(typeof chainTriggered === "undefined"){
          chainTriggered = "value";
        }else{
          chainTriggered = ionEventChainMapping.components[componentName].chainTriggered;
          if(typeof event.target[chainTriggered]!=="undefined"){
            eventValue = event.target[chainTriggered]
          }
        }

        let attributeValue;
        if(eventSource.hasAttribute("data-view-model")){
          attributeValue= eventSource.getAttribute("data-view-model");
          let modelChain = attributeValue.split("@").join("");

          if(chainTriggered!=="@"){
            modelChain = `${modelChain}.${chainTriggered}`;
          }
          this.model.setChainValue(modelChain, eventValue);
        }
      });
    });
  }
}
