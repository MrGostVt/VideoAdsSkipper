// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-01-23
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    let defaultVideos = document.querySelectorAll('video');

    function refillDefaultVideos(currentNormal){
        defaultVideos = currentNormal;
    }

    function CheckCurrentVideosToDefaults(current = []){
        const defaults = [];

        for(let j = 0; j < defaultVideos.length; j++){
            for(let i = 0; i < current.length; i++){
                if(defaultVideos[j] == current[i]){

                    if(!defaults.includes(current[i])){
                        defaults.push(current[i]);
                    }
                    break;
                }
                else if(current[i].duration < 300){
                    if(defaultVideos.length <= defaults){
                        refillDefaultVideos(defaults);
                    }
                    return i;
                }
                else if(i == current.length-1){
                    if(defaultVideos.length <= defaults){
                        refillDefaultVideos(defaults);
                    }

                    return i;
                }
            }
        }

        if(defaultVideos.length <= defaults){
            refillDefaultVideos(defaults);
        }

        if(current.length != defaultVideos.length){
            if(defaultVideos.length == 0){
                return current.length-1;
            }
            return defaultVideos.length;
        }
        return 0;
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyB' && event.shiftKey) {
            const videos = document.querySelectorAll('video');
            console.log(videos);

            const strangeIndex = CheckCurrentVideosToDefaults(videos);
            videos[strangeIndex].currentTime = videos[strangeIndex].duration-1;
        }
    });

    const mutationCallback = () => {
        const videos = document.querySelectorAll('video');

        if(videos.length > defaultVideos.length ){
            const strangeIndex = CheckCurrentVideosToDefaults(videos);
            videos[strangeIndex].currentTime = videos[strangeIndex].duration;
        }
    }

    if((window.location.href).split('youtube').length < 2){
        const config = { childList: true, subtree: true };
        const observer = new MutationObserver(mutationCallback);
        observer.observe(document.body, config);
    }


})();