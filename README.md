# BOrk
Browser Orchestra

## Basic demo instructions

To hear music from this demo, you'll need to do the following:

1. Drag all of the nodes so that you can see each one clearly

2. Make the following connections as described by the node:
    - Start button Node's`trigger` output to AudioPlayerNode's `start` input
    - AudioPlayerNode's `aud` output to FilterNode's `aud` input
    - Frequency Slider's `value` output to FilterNode's `freq` input
    - FilterNode's `aud` output to AudioOutputNode's `aud` input

3. Click the lock icon in the bottom left corner of the screen to lock the nodes in place

4. Click on the __Start__ button, which should start playing music from a test track. You should be able to move around the slider to change the filter's frequency
