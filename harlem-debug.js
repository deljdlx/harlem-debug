
class HarlemDebug
{
  
	songs = [
		{
			id: 'Z4PDu6jQY_A',
      bpm: 138,
      offset: 2000,
		},
		{
			url: 'https://www.youtube.com/embed/qV0LHCHf-pE',
			bpm: 138
		},
	];
  
  
  debugElements = [];
  debugSelector = '.xdebug-error';

  contentElements = [];
  contentSelector = 'h1,h2,h3,h4,h5,h6,img,a,button,label,select,input,li';


  player = null;

	constructor() {

    const contentElements = document.querySelectorAll(this.contentSelector);
    contentElements.forEach((element) => {
      const harlemElement = new HarlemDebugElement(element);
      this.contentElements.push(harlemElement);
    });


    const debugs = document.querySelectorAll(this.debugSelector);
    debugs.forEach((element) => {

      const harlemElement = new HarlemDebugElement(element);
      harlemElement.poopify();
      this.debugElements.push(harlemElement);
    });
  }



  injectVideo() {
    
   let div = document.createElement('div');
   div.setAttribute('id', 'harlem-music');
   document.body.append(div);

    this.player = new YT.Player('harlem-music', {
      height: '360',
      width: '640',
      videoId: this.songs[0].id,
      playerVars: {
        autoplay: 1,
        loop: 1,
        controls: 0,
        showinfo: 0,
        autohide: 1,
        modestbranding: 0,
      },
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });
  }
  
  onPlayerReady(event) {
    this.player.playVideo();
    setTimeout(() => {
      this.animate();
    }, this.songs[0].offset);
    
  }

  onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      this.player.playVideo(); 
    }
  }



  launch() {

    window.onYouTubeIframeAPIReady = function() {
      this.injectVideo();
    }.bind(this);

    let script = document.createElement('script');
    script.setAttribute('src', 'http://www.youtube.com/iframe_api')
    document.body.appendChild(script);

  }

  animate() {
    const bpm = this.songs[0].bpm;

    this.debugElements.forEach((element) => {
      element.live((60/bpm) * 1000 * (1+Math.trunc(Math.random())));
    });

    this.contentElements.forEach((element) => {
      console.log(element);
      element.live((60/bpm) * 1000 * (1+Math.trunc(Math.random())));
    });
  }
	
}


class HarlemDebugElement
{
  rotationX = 0;
  rotationY = 0;
  hueRotate = 0;
  zoom = 1;

  element = null;

  interval = 0;
  timer = null;

  poopified = false;

  constructor(element) {
    this.element = element;
    this.element.style.transition = 'filter 0.5s linear, transform 0.5s linear';
  }


  poopify() {
    this.poopified = true;
    this.element.querySelector('th').innerHTML = 
      '<img src="https://media3.giphy.com/media/Tjw85XqqRgJzYwsI6r/giphy.gif?cid=ecf05e47a13a46259305afdc11404edebd8e45a3ee31aa53&rid=giphy.gif" style="width:0%;transition: all 1s; display:block;margin:auto"/>' +
      this.element.querySelector('th').innerHTML
     ;
  }

	
	vibrate(intensity) {
		let interval = 100;
		for(let i = 0 ; i < 10 ; i++) {

			setTimeout(() => {
				let vx = Math.random() * intensity * this.randomSign();
				let vy = Math.random() * intensity * this.randomSign();

				this.element.style.marginTop = vx + 'px';
				this.element.style.marginLeft = vy + 'px';
			}, i * interval);
		}
  }
  
  randomSign() {
		if(Math.random() > 0.5) {
			return -1;
    }
    return 1;
  }

  randomRotationX(max = 180) {
    this.rotationX = Math.random() * max * this.randomSign();
  }

  randomHuRotation(max = 180) {
    this.hueRotate = Math.random() * max * this.randomSign();
  }
  randomZoom(min = 0.7, max = 1.3) {
    this.zoom = min + Math.random() * max;
  }

  live(interval) {

    if(this.poopified) {
      this.element.querySelector('th img').style.width='100%';
    }
    

    this.interval = interval;
    this.timer = setInterval(() => {this.randomAnimation()} , interval);
  }

  randomAnimation() {
    this.randomRotationX();
    this.randomHuRotation();
    this.randomZoom();
    this.vibrate();
    this.apply();
  }

  apply() {
    this.element.style.transform = 'rotate(' + this.rotationX + 'deg) scale(' + this.zoom + ')';
    this.element.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const harlemDebug = new HarlemDebug();
  harlemDebug.launch();
  console.log(harlemDebug);

});