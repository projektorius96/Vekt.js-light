import { Pane, Input, Label } from "wc-pane";
import { Print } from "./utils";

/**
 * @alias
 */
const [ID, ATTR_TYPE, UI_EVENT] = 
    Array(3).fill(Print)
    ,
    { text: input, range, checkbox } = ATTR_TYPE
    ;
    
const GUI = new Pane({container: document.body.children[0].children.footer, draggable: true, hidden: false, position: Print.right, opacity: 1})
    GUI.addGroup({name: ID.slider, nodes: GUI.addSection({flex_direction: Print.row})})
    // GUI.addGroup({name: ID.describer, nodes: GUI.addSection({})})
    // GUI.addGroup({name: ID.layer_manager, nodes: GUI.addSection({accessor: Print.slot}), override_label: "layer-manager", collapse: true})

const rangeParams = {
    min: 0,
    max: 360,
    step: 1,
    value: 1
}

let isChecked = false;
const sense = new Map([
    [false, -1],
    [true, 1]
]);

/* === GUI.slider === */
const slider = GUI.find({name: ID.slider}).children;
slider.child1.append(
    new Input({name: Print.tick1, type: checkbox}),
    new Input({name: ID.range, type: range, attrs: {...rangeParams}})
);

GUI.find({name: Print.tick1}).on(UI_EVENT.change, (e)=>{
    isChecked = e.target.checked;
})
GUI.find({name: ID.range}).on(UI_EVENT.input, function() {
    const 
        targetElement = document.getElementById("circle_top")
        ,
        allPoints = targetElement?.getPoints()
    ;
    console.log(Number(this.value));
    
    // Vekt.js-light API
    targetElement?.setPoints(
        allPoints.slice(rangeParams.min, (sense.get(isChecked) * Number(this.value))+1)
    )
});

/* === GUI.describer === */
// const describer = GUI.find({name: ID.describer}).children;
// describer.child1.append(
//         new Label({description: "Sticky note"}),
//         new Input({name: ID.text_handle, type: input})
// )
// GUI.find({name: ID.text_handle}).on(UI_EVENT.input, (e)=>console.log(e.target.value))

/* === GUI.layerManager */
// const layerManager = GUI.find({name: ID.layer_manager}).children;
// layerManager.slot1.appendChild(
//     new Input.List({
//     name: ID.layer_manager, 
//     attrs: {
//         loopData: [
//             function(item, index) { 
//                 const ul = document.createElement(Print.ul);
//                     ul.textContent = `${item}${1+index}`;
//                 this.appendChild(ul);
//             }
//             , 
//             [
//                 ...Array.from({length: 3}).fill( Print.HTMLElement )
//             ]
//         ], 
//         sortableConfig: {
//             animation: 150,
//             onChange: function(e) {
//                     console.log(e);
//             }
//         }
//     }
//     })
// )