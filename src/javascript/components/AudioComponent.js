import _ from 'underscore';
class AudioComponent {
  constructor() {
    _.bindAll(
      this,
      '_createAudioSource',
      '_volumeAudioProcess',
      '_createAudioMeter',
      'getValue'
    );
    this.mediaStreamSource = null;
    this.meter = null;
    this._createAudioSource();
  }
  _createAudioSource() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.mediaStreamSource = this.audioContext.createMediaStreamSource(
          stream
        );
        this.meter = this._createAudioMeter();
        this.mediaStreamSource.connect(this.meter);
      });
    }
  }
  _createAudioMeter() {
    const processor = this.audioContext.createScriptProcessor(512);
    processor.onaudioprocess = this._volumeAudioProcess;
    processor.clipping = false;
    processor.lastClip = 0;
    processor.volume = 0;
    processor.clipLevel = this.clipLevel;
    processor.averaging = this.averaging;
    processor.clipLag = this.clipLag;
    processor.connect(this.audioContext.destination);
    processor.checkClipping = () => {
      if (!this.clipping) {
        return false;
      }
      if (this.lastClip + this.clipLag < window.performance.now()) {
        this.clipping = false;
      }
      return this.clipping;
    };
    processor.shutdown = () => {
      this.disconnect();
      this.onaudioprocess = null;
    };
    return processor;
  }
  _volumeAudioProcess(event) {
    const buf = event.inputBuffer.getChannelData(0);
    let sum = 0,
      x,
      bufLength = buf.length;

    for (var i = 0; i < bufLength; i++) {
      x = buf[i];
      sum += x * x;
    }

    this.rms = Math.log10(sum / bufLength + 1) * window.innerHeight * 6;
  }
  getValue() {
    return this.rms;
  }
}
export default AudioComponent;
