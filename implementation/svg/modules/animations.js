/**
 * **CREDITS:** Kudos to Copilot for putting me on the right track...
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect|KeyframeEffect}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Animation|Animation}
 * 
 * @returns {Animation} animation
 */
export default function startAnimation({ from = 0, to = 180, duration = 100, iterations = Infinity, callback }) {

    const animation_counter = 'animation-counter';

    if ( !(customElements.get(animation_counter)) ) {

        customElements.define(animation_counter, class extends HTMLElement {

            constructor() {

                if ( super() ) {
                    this.id = animation_counter;
                }

                this.style.cssText = `
                    position: absolute;
                `;

            }

        })

        document.body.appendChild(
            new ( customElements.get(animation_counter) )
        );

    }

    let effect = new KeyframeEffect(
        document.body.children[animation_counter],
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
                    /* animation.cancel() */
                    /* animation.play() */
                    // DEV_NOTE # instead, do the following:..
                    count = 0; // reset count
                    effect = new KeyframeEffect(/* reset KeyframeEffect */
                        document.body.children[animation_counter],
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

    return animation;

}

/* // DEV_NOTE # [PASSING]
startAnimation({
    to: 90,
    iterations: Infinity,
    callback: function({count}){
        console.log(count)
    }
}) */

