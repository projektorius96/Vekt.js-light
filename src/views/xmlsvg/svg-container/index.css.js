/**
 * @returns `true`, whilst setting the styles bound to `this`, i.e. target element
*/
export default function () {

    this.style.cssText = /* css */`
        width: calc(100vw - (100vw - 100%));
        height: 100vh;
        display: block;
        position: absolute;
        background: transparent;
    `;

    return true;
    
}