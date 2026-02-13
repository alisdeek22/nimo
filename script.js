// Floating hearts
var heartSymbols=['❤','💕','💗','🌸','✨','🎀','💐','🦋'];
setInterval(function(){
  var c=document.getElementById('hearts-container');
  var s=document.createElement('span');
  s.textContent=heartSymbols[Math.floor(Math.random()*heartSymbols.length)];
  s.style.left=Math.random()*100+'vw';
  s.style.bottom='-20px';
  s.style.animationDuration=(4+Math.random()*4)+'s';
  s.style.fontSize=(14+Math.random()*18)+'px';
  c.appendChild(s);
  setTimeout(function(){s.remove()},8000);
},900);

// Navigation
function goTo(page){
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active')});
  document.getElementById('page-'+page).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(page==='ending')startEnding();
}

// Password
function checkPassword(){
  var input=document.getElementById('passwordInput');
  if(input.value.trim()==='33'){
    goTo('letter');input.value='';
    document.getElementById('errorMsg').style.display='none';
  }else{
    document.getElementById('errorMsg').style.display='block';
    var box=input.closest('.password-box');
    box.classList.add('animate-shake');
    setTimeout(function(){box.classList.remove('animate-shake')},500);
  }
}

// Letter
function showLetter(){
  document.getElementById('letterPrompt').style.display='none';
  document.getElementById('letterCard').style.display='block';
}
function showEasterEgg(){
  document.getElementById('easterEgg').style.display='block';
}

// Carousel
var currentSlide=0;
function setSlide(n){
  currentSlide=n;
  for(var i=0;i<4;i++){document.getElementById('cimg'+i).style.opacity=i===n?'1':'0'}
  document.querySelectorAll('.carousel-dot').forEach(function(d,i){d.classList.toggle('active',i===n)});
}
setInterval(function(){setSlide((currentSlide+1)%4)},3000);

// Timers - English labels & English numerals
function updateTimers(){
  var start=new Date('2026-01-20T00:00:00');
  var now=new Date();
  var diff=now.getTime()-start.getTime();
  if(diff>0){
    var d=Math.floor(diff/(1000*60*60*24));
    var h=Math.floor((diff/(1000*60*60))%24);
    var m=Math.floor((diff/(1000*60))%60);
    var s=Math.floor((diff/1000)%60);
    document.getElementById('loveTimer').textContent='🎀 '+d+' Days, '+h+' Hours, '+m+' Minutes, '+s+' Seconds 🎀';
  }
  var val=new Date(now.getFullYear(),1,14);
  if(val<=now)val=new Date(now.getFullYear()+1,1,14);
  var cd=val.getTime()-now.getTime();
  var items=[
    {val:Math.floor(cd/(1000*60*60*24)),label:'Days'},
    {val:Math.floor((cd/(1000*60*60))%24),label:'Hours'},
    {val:Math.floor((cd/(1000*60))%60),label:'Minutes'},
    {val:Math.floor((cd/1000)%60),label:'Seconds'}
  ];
  document.getElementById('valentineCountdown').innerHTML=items.map(function(i){
    return '<div class="countdown-item"><div class="countdown-val">'+i.val+'</div><div class="countdown-label">'+i.label+'</div></div>';
  }).join('');
}
updateTimers();
setInterval(updateTimers,1000);

// Timeline
var events=[
  {date:"أول يوم",emoji:"📸",title:"لما اتقابلنا أول مرة 💕",desc:"كان احسن يوم فحياتي حتي لو مكنش احسن حاجه"},
  {date:"أول خروجة",emoji:"🎭",title:"أول مرة نخرج مع بعض 🎭",desc:" ياريت نخرجها تاني وتكون أحلى"},
  {date:"لحظة مميزة",emoji:"🌅",title:"اول ما شوفتك🌅",desc:"احسن لحظه عدت فحياتي💗"},
  {date:"عيد ميلادك",emoji:"🎂",title:"يوم عيد ميلادك 🎂",desc:" احلى يوم ف السنه ونعملو مع بعض المره الجايه"},
  {date:"قهوتنا",emoji:"☕",title:"قهوتنا المفضلة ☕",desc:"عارف انك مش بتحبها بس هتعجبك🥰"},
];
var tl=document.getElementById('timeline');
tl.innerHTML='<div class="timeline-line"></div>'+events.map(function(e,i){
  return '<div class="timeline-event animate-fadeInUp" style="animation-delay:'+(0.3+i*0.2)+'s">'+
    '<div class="timeline-content"><div class="inner">'+
      '<div style="font-family:Playfair Display,serif;font-size:11px;color:var(--primary);font-weight:bold;margin-bottom:3px">'+e.date+'</div>'+
      '<div style="font-family:Playfair Display,serif;font-size:14px;font-weight:bold;margin-bottom:6px">'+e.title+'</div>'+
      '<p style="font-family:Playfair Display,serif;font-size:13px;color:var(--muted);line-height:1.6">'+e.desc+'</p>'+
    '</div></div>'+
    '<div class="timeline-icon"><div class="circle">'+e.emoji+'</div></div>'+
  '</div>';
}).join('');
// Ending
function startEnding(){
  var ids=['end-title','end-line1','end-line2','end-line3','end-hearts','end-message','end-replay','end-footer'];
  var delays=[500,1500,2800,4000,5500,6000,7000,7500];
  ids.forEach(function(id){
    var el=document.getElementById(id);
    el.classList.remove('visible-el');
    el.classList.add('hidden-el');
  });
  var hc=document.getElementById('end-hearts');
  hc.innerHTML=[0,.2,.4,.6,.8].map(function(d){return '<span class="animate-heartFloat" style="animation-delay:'+d+'s">❤️</span>'}).join('');
  ids.forEach(function(id,i){
    setTimeout(function(){
      document.getElementById(id).classList.remove('hidden-el');
      document.getElementById(id).classList.add('visible-el');
    },delays[i]);
  });
}

// Don't show the lovable-badge if the page is in an iframe or if it's being rendered by puppeteer (screenshot service)
	if (window.self !== window.top || navigator.userAgent.includes('puppeteer')) {
		// the page is in an iframe
		var badge = document.getElementById('lovable-badge');
		if (badge) {
			badge.style.display = 'none';
		}
	}

	// Add click event listener to close button with animation
	var closeButton = document.getElementById('lovable-badge-close');
	if (closeButton) {
		closeButton.addEventListener('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			var badge = document.getElementById('lovable-badge');
			if (badge) {
				badge.classList.add('closing');
				setTimeout(function() {
					if (badge) {
						badge.style.display = 'none';
					}
				}, 240);
			}
		});
	}
