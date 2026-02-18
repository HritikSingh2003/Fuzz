
// Card Effects 
document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("mousemove", e=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width/2;
    const midY = rect.height/2;

    const rotateY = ((x-midX)/midX)*15;
    const rotateX = -((y-midY)/midY)*15;

    card.style.transform = 
      `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-15px)`;
  });

  card.addEventListener("mouseleave", ()=>{
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
});





const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,1000);
camera.position.z=50;

const renderer=new THREE.WebGLRenderer({alpha:true});
renderer.setSize(innerWidth,innerHeight);
document.getElementById("threejs").appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff,.7));
const light=new THREE.PointLight(0x00a5e0,2);
light.position.set(20,20,20);
scene.add(light);

const particles=new THREE.BufferGeometry();
const count=1500;
const pos=new Float32Array(count*3);
for(let i=0;i<count*3;i++)pos[i]=(Math.random()-.5)*300;
particles.setAttribute("position",new THREE.BufferAttribute(pos,3));
const pMesh=new THREE.Points(particles,new THREE.PointsMaterial({size:1.2,color:0x00a5e0}));
scene.add(pMesh);

const shapes=[];
for(let i=0;i<25;i++){
const s=new THREE.Mesh(
new THREE.IcosahedronGeometry(Math.random()*2+1),
new THREE.MeshStandardMaterial({color:0x26017b,wireframe:true})
);
s.position.set((Math.random()-.5)*80,(Math.random()-.5)*60,(Math.random()-.5)*80);
scene.add(s);shapes.push(s);
}

let mx=0,my=0;
addEventListener("mousemove",e=>{
mx=(e.clientX/innerWidth-.5)*2;
my=(e.clientY/innerHeight-.5)*2;
});

function animate(){
requestAnimationFrame(animate);
pMesh.rotation.y+=.0008;
shapes.forEach((s,i)=>{
s.rotation.x+=.002;
s.rotation.y+=.003;
s.position.y+=Math.sin(Date.now()*.001+i)*.01;
});
camera.position.x+=(mx*15-camera.position.x)*.05;
camera.position.y+=(-my*10-camera.position.y)*.05;
renderer.render(scene,camera);
}
animate();

addEventListener("resize",()=>{
camera.aspect=innerWidth/innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(innerWidth,innerHeight);
});

/* LIGHT MODE TOGGLE */
const toggle=document.getElementById("modeToggle");
let isLight=false;
toggle.onclick=()=>{
document.body.classList.toggle("light-mode");
isLight=!isLight;
toggle.innerText=isLight?"Dark Mode":"Light Mode";
};

// GET FREE STRAGEGY CALL

function openWhatsApp(){
    const phone = "9310930177"; // apna number
    const msg = encodeURIComponent(
        "Hi Fuzzads Team 👋\nI want a free digital marketing strategy call."
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

//BOOK FREE CALL FORM


function submitLead(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;

    // Unique Lead ID
    const leadId = "FZ-" + Math.floor(Math.random() * 1000000);

    // WhatsApp Message (PRO FORMAT)
    const msg = encodeURIComponent(
        "🔥 *NEW LEAD FROM FUZZADS WEBSITE* 🔥\n\n" +
        "🆔 Lead ID: " + leadId + "\n" +
        "👤 Name: " + name + "\n" +
        "📧 Email: " + email + "\n" +
        "📞 Phone: " + phone + "\n" +
        "📌 Interested In: " + service + "\n\n" +
        "Please contact ASAP 🚀"
    );

    // Open WhatsApp
    window.open(
        "https://wa.me/919310930177?text=" + msg,
        "_blank"
    );

    // OPTIONAL – n8n / Google Sheet
    fetch("https://YOUR-N8N-WEBHOOK-URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            leadId, name, email, phone, service,
            source: "Fuzzads Website",
            date: new Date().toISOString()
        })
    }).catch(()=>{});

    closeForm();
}




// AI CHATBOT
const chatbot=document.getElementById("aiChatbot");
const messages=document.getElementById("aiMessages");

function toggleChatbot(){
chatbot.style.display=chatbot.style.display==="flex"?"none":"flex";
if(messages.innerHTML===""){
botMsg("Hi 👋 I'm Fuzzads AI Assistant.");
setTimeout(()=>botMsg("What service are you looking for?"),600);
}
}

function botMsg(text){
messages.innerHTML+=`<div class="bot">🤖 ${text}</div>`;
messages.scrollTop=messages.scrollHeight;
}

function userMsg(text){
messages.innerHTML+=`<div class="user">👤 ${text}</div>`;
messages.scrollTop=messages.scrollHeight;
}

function userSelect(service){
userMsg(service);

setTimeout(()=>{
botMsg(`Great 👍 ${service} is one of our top-performing services.`);
},600);

setTimeout(()=>{
botMsg("Would you like a FREE strategy call on WhatsApp?");
messages.innerHTML+=`
<div style="display:flex;gap:10px;margin-top:10px">
<button onclick="goWhatsapp('${service}')" 
style="flex:1;padding:8px;border:none;border-radius:10px;background:#25D366;color:#000">
Yes
</button>
<button onclick="botMsg('No problem 😊 Let me know anytime.')"
style="flex:1;padding:8px;border:none;border-radius:10px;background:#444;color:#fff">
Later
</button>
</div>`;
},1200);
}

function goWhatsapp(service){
botMsg("Redirecting you to WhatsApp 🚀");

const msg=encodeURIComponent(
"Hi Fuzzads Team 👋\n\n" +
"I spoke with your AI assistant.\n" +
"I'm interested in: " + service + "\n" +
"Please share next steps."
);

setTimeout(()=>{
window.open("https://wa.me/919310930177?text="+msg,"_blank");
},1000);
}

/*<!-- Hover & Scroll Effects -->*/

  const img = document.querySelector('#about img');
  img.addEventListener('mouseenter', () => { 
    img.style.transform = 'scale(1.08) rotate(-1deg)'; 
    img.style.boxShadow = '0 35px 70px rgba(0,0,0,0.6)';
  });
  img.addEventListener('mouseleave', () => { 
    img.style.transform = 'scale(1) rotate(0deg)'; 
    img.style.boxShadow = '0 25px 50px rgba(0,0,0,0.5)';
  });

  // Optional: Fade-in on scroll
  const aboutCard = document.querySelector('#about .about-container > div:nth-child(2) > div');
  window.addEventListener('scroll', () => {
    const rect = aboutCard.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      aboutCard.style.transform = 'translateY(0)';
      aboutCard.style.opacity = '1';
    }
  });
  // Initial state
  aboutCard.style.transform = 'translateY(50px)';
  aboutCard.style.opacity = '0';
  aboutCard.style.transition = 'all 1s ease-out';


  // FAQ ACCORDION
const faqBoxes = document.querySelectorAll(".faq-box");

faqBoxes.forEach(box=>{
  box.querySelector(".faq-question")
    .addEventListener("click", ()=>{

      box.classList.toggle("active");

      // Optional: close others automatically
      faqBoxes.forEach(other=>{
        if(other !== box){
          other.classList.remove("active");
        }
      });

  });
});







