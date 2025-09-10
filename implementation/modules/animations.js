// CREDITS : Kudos to Copilot (ChatGPT-5) for help writing this logic
export function startAnimation({ from = 0, to = 180, duration = 1000, iterations = Infinity, callback }) {

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

    const effect = new KeyframeEffect(
        document.body.children[ac_namespace],
        [{ opacity: 0 }, { opacity: 1 }],
        { duration, iterations }
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
                    /* animation.persist() */
                    animation.pause()
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
//     callback: function({count}){
//         console.log(count)
//     }
// }) /* [PASSING] # will iterate single value of count */