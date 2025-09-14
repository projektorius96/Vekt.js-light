// CREDITS : Kudos to Copilot (ChatGPT-5) for help writing this logic
export function startAnimation({ from = 0, to = 180, duration = 100, iterations = Infinity, callback }) {

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

        }

        })

    document.body.appendChild(
        new (customElements.get(ac_namespace))
    )

    }

    /* customElements.whenDefined(ac_namespace).then(()=>{ */

    let effect = new KeyframeEffect(
        document.body.children[ac_namespace],
        [{ opacity: 0 }, { opacity: 1 }],
        { duration, iterations }
    );

    let animation = new Animation(effect, document.timeline);
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
                    /* animation.cancel() */
                    /* animation.play() */
                    // DEV_NOTE # instead, do the following:..
                    count = 0; // reset count
                    effect = new KeyframeEffect(/* reset KeyframeEffect */
                        document.body.children[ac_namespace],
                        effect.getKeyframes(),
                        effect.getTiming()
                    );
                } else {
                    callback({count})
                }
            }
        }

        requestAnimationFrame(trackTime);

    }

    trackTime();

    /* }) */

    return animation;

}

// let anim = startAnimation({
//     to: 90,
//     iterations: Infinity,
//     callback: function({count}){
//         console.log(count)
//     }
// })