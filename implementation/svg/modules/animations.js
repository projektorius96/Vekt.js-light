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

/* === */

export const Animations = Object.freeze(
    Object.assign(
        Object.create(null)
        ,
        {
            Helpers: {
                reverseCountOnCondition: function(animConfig, c){                    
                    if (c < animConfig?.to) {
                        return ({
                            value: c
                        })
                    } else {
                        return ({
                            value: animConfig.to - c
                        })
                    }
                }
            }
            ,
            Crossproduct: {
                part1: Crossproduct$part1,
                part2: Crossproduct$part2
            }
        }
    )
);

function Crossproduct$part1({animConfig, reverseCountOnCondition, count, paths, Helpers, UnitVector}) {
                                    
// existing z-axis animation (unchanged behavior)
if ( count === animConfig.to-1 ) {
    
    paths.z_axis.setPoints([
        ...UnitVector.drawVector({
            Helpers, 
            path: paths.z_axis,
            /* length: false */
        })
    ], -1 *  Math.sin( Helpers.Trigonometry.Converters.degToRad( reverseCountOnCondition(count).value ) ))

} else {

    paths.z_axis.setPoints([
        ...UnitVector.drawVector({
            Helpers, 
            path: paths.z_axis,
            /* length: false */
        })
    ], 1 *  Math.cos( Helpers.Trigonometry.Converters.degToRad( reverseCountOnCondition(count).value ) )) 

}
    
}
function Crossproduct$part2({reverseCountOnCondition, count, paths, Helpers, UnitVector, GROW_ALONG_SLOPE, GLOBAL_SCALAR, XMLSVG, ENUMS}) {

    try {
    const 
        twiceSlower = 2
        ,
        /* NOTE # t drives the animation (0..359). reverseCountOnCondition returns same here. */
        t = reverseCountOnCondition(count).value/twiceSlower
        ;

    // base angle for y-axis (as set originally) = 135 degrees    
    const baseYAngle = Number(paths.y_axis.dataset.angle);

    // compute progress in [0..1..0] with period 180° using absolute sine
    // Math.abs(Math.sin(rad(t))) yields 0 -> 1 -> 0 every 180°,
    // so progress will smoothly go toward 1 then back to 0.
    const progress = Math.abs(Math.sin( Helpers.Trigonometry.Converters.degToRad( t ) ));

    const animatedYAngle = 1 * baseYAngle * progress;

    // update y-axis visual (rotate arrow). UnitVector.drawVector will set transform using the passed `angle`.
    if (paths.y_axis) {
        paths.y_axis.setPoints(
            [
                ...UnitVector.drawVector({
                    Helpers,
                    path: paths.y_axis,
                    angle: animatedYAngle,
                })
            ],
            1 * GROW_ALONG_SLOPE                                            );
    }

    // Now update parallelogram (unit_square) so it follows x/y axes each frame.
    const unitSquarePath = XMLSVG.Helpers.findByID(ENUMS.PRINT.unit_square);
    const xAxisPath = paths.x_axis || XMLSVG.Helpers.findByID(ENUMS.PRINT.x_axis);
    const yAxisPath = paths.y_axis || XMLSVG.Helpers.findByID(ENUMS.PRINT.y_axis);

    if (unitSquarePath && xAxisPath && yAxisPath) {
        // get transforms (DOMMatrix-like expected)
        const mx = xAxisPath.getCurrentMatrix ? xAxisPath.getCurrentMatrix() : (xAxisPath.getCTM ? xAxisPath.getCTM() : null);
        const my = yAxisPath.getCurrentMatrix ? yAxisPath.getCurrentMatrix() : (yAxisPath.getCTM ? yAxisPath.getCTM() : null);
        const mPar = unitSquarePath.getCurrentMatrix ? unitSquarePath.getCurrentMatrix() : (unitSquarePath.getCTM ? unitSquarePath.getCTM() : null);

        if (mx && my && mPar) {
            // endpoints in screen coordinates
            const originScreen = new DOMPoint(0, 0).matrixTransform(mx);    // should be same for both axes
            const xEndScreen = new DOMPoint(1, 0).matrixTransform(mx);
            const yEndScreen = new DOMPoint(1, 0).matrixTransform(my);

            // vector components (from origin)
            const ux = xEndScreen.x - originScreen.x;
            const uy = xEndScreen.y - originScreen.y;
            const vx = yEndScreen.x - originScreen.x;
            const vy = yEndScreen.y - originScreen.y;

            const lenU = Math.hypot(ux, uy) || 1;
            const lenV = Math.hypot(vx, vy) || 1;

            // normalized dot and cross (2D scalar cross)
            /* const dotNorm = (ux * vx + uy * vy) / (lenU * lenV); */
            const crossNorm = (ux * vy - uy * vx) / (lenU * lenV);

            // compute parallelogram corners in screen coordinates
            const A = originScreen;
            const B = xEndScreen;
            const D = yEndScreen;
            const C = new DOMPoint(
                B.x + (D.x - A.x),
                B.y + (D.y - A.y)
            );

            // map screen-space corners back into unit_square local coordinates
            const invPar = (typeof mPar.inverse === 'function') ? mPar.inverse() : (new DOMMatrix(mPar)).inverse();
            const localA = new DOMPoint(A.x, A.y).matrixTransform(invPar);
            const localB = new DOMPoint(B.x, B.y).matrixTransform(invPar);
            const localC = new DOMPoint(C.x, C.y).matrixTransform(invPar);
            const localD = new DOMPoint(D.x, D.y).matrixTransform(invPar);

            // set the path points (local coords) and close the path
            unitSquarePath.setPoints(
                [
                    { x: localA.x, y: localA.y },
                    { x: localB.x, y: localB.y },
                    { x: localC.x, y: localC.y },
                    { x: localD.x, y: localD.y },
                    { x: localA.x, y: localA.y }
                ].map((basis)=>{
                    return({
                        x: basis.x * GLOBAL_SCALAR,
                        y: basis.y * GLOBAL_SCALAR/*  * SLOPE_TERSER */,
                    })
                }), stage.grid.GRIDCELL_DIM);

            // set visibility/opacity: show parallelogram proportional to |sin θ| (crossNorm)
            const baseOpacity = 0.25;
            const visualOpacity = Math.min(1, Math.max(0, Math.abs(crossNorm)));
            try {
                unitSquarePath.style.opacity = String(baseOpacity * visualOpacity);
                if (visualOpacity < 0.02) {
                    unitSquarePath.style.display = 'none';
                } else {
                    unitSquarePath.style.display = '';
                }
            } catch (e) {
                try {
                    unitSquarePath.setAttribute('opacity', String(baseOpacity * visualOpacity));
                } catch (e2) { /* ignore */ }
            }

            // // Expose debug-ish values on dataset for inspection
            // unitSquarePath.dataset.__dot = String(dotNorm.toFixed(3));
            // unitSquarePath.dataset.__cross = String(crossNorm.toFixed(3));
        }
    }

    } catch (err) {
        console.warn('axes animation frame failed', err);
    }
    
}

