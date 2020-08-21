function startTimer(t, fn, end) {
  var duration = Number(t) * 60 || 1;
  var timer = duration,minutes,seconds;
  var interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    fn(minutes + ":" + seconds);
    if (--timer < 0) {
      clearInterval(interval);
      end();
    }
  }, 1000);
  return interval
}
