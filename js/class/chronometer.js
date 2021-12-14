class Chronometer {
  constructor() {
    this.currentTime  = 0,
    this.intervalId = null
  }
  start(callback) {
      this.intervalId = setInterval(()=>{
        if(typeof callback === 'function')callback()
        this.currentTime +=1
      }, 1000)

  }
  getMinutes() {
    return this.currentTime / 60 | 0 //same as Math.floor
  }

  getSeconds() {
    return  this.currentTime % 60;
  }

  computeTwoDigitNumber(value) {
    if(value.toString().length < 2 )
      return `0${value.toString()}`
    else  
      return value.toString()
  }

  stop() {
    clearInterval(this.intervalId)
  }

  reset() {
    this.currentTime = 0;
  }
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = Chronometer;
}