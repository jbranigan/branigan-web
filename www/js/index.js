//  eventListener approach from https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function() {

    window.addEventListener('resize', resizeThrottler, false);

    var resizeTimeout;
    function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
        if ( !resizeTimeout ) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                checkSize();

            // The actualResizeHandler will execute at a rate of 15fps
            }, 66);
        }
    }

    checkSize();

}());

// the code in the iframe is heavy, and was unnecessarily loading on smaller screens
// this function only loads the visualization if the screen is likely a laptop or desktop
function checkSize() {
    var size = window.innerWidth || document.body.clientWidth;

    var desktop = '<iframe src="https://jbranigan.carto.com/builder/cc9983a2-ddcf-46a5-82dc-0040fdcbcdd1/embed" frameborder="0"></iframe>';
    var heroEmbed = document.getElementById("hero-embed");
    if (size > 1024) {
        if (!heroEmbed.firstElementChild) {
            heroEmbed.innerHTML = desktop;
        }
    }
    else {
        if (heroEmbed.firstElementChild) {
            heroEmbed.innerHTML = "";
        }
    }
}

