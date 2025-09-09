/* let componentWasDefined = false; */

// CREDITS : Kudos to Copilot (ChatGPT-5) for help writing this logic
export function startAnimation({ from = 0, to = 180, duration = 1000, callback = (c)=>c }) {

    const ac_namespace = 'animation-counter';

    if (!(customElements.get(ac_namespace))) {

        customElements.define(ac_namespace, class extends HTMLElement {

        constructor(){

            if ( super() ) {
                this.id = ac_namespace;
            }

            this.style.cssText = `
                position: absolute;
            `;

            /* defined = true; */

        }

        })

    document.body.appendChild(
        new (customElements.get(ac_namespace))
    )

    }

    customElements.whenDefined(ac_namespace).then(()=>{

    const effect = new KeyframeEffect(
        document.body.children[ac_namespace],
        [{ transform: `rotate(${from}deg)` }, { transform: `rotate(${to}deg)` }],
        { duration, iterations: Infinity }
    );

    const animation = new Animation(effect, document.timeline);
        animation.play();

    let count = from;
    let lastTick = 0;

    function trackTime() {
        const time = animation.currentTime;
        if (time !== null) {
            const tick = Math.floor(time / duration);
            if (tick > lastTick) {
                lastTick = tick;
                count++;
                if (count === to) {
                    animation.pause();
                } else {
                    /* console.log(count); */
                    callback({count})
                }
            }
        }

        requestAnimationFrame(trackTime);

    }

    trackTime();

    })

    return true;

}

// let anim = startAnimation({
//     callback: function({count}){
//         console.log(count)
//     }
// }) /* [PASSING] # will iterate single value of count */