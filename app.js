const app = document.getElementById('app');
const toast = document.getElementById('toast');

const state = {
  screen: 'welcome',
  tab: 'mobile',
  location: '',
  propertyType: 'House',
  budget: '',
  min: '',
  max: '',
  form: {name:'', mobile:'', date:'', time:'', message:''}
};

const requests = JSON.parse(localStorage.getItem('ramBhaiRequests') || '[]');
const properties = JSON.parse(localStorage.getItem('ramBhaiProperties') || '[]');

function save(){
  localStorage.setItem('ramBhaiRequests', JSON.stringify(requests));
  localStorage.setItem('ramBhaiProperties', JSON.stringify(properties));
}
function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}
function setScreen(s){state.screen=s;render()}
function back(){setScreen(state.screen==='login'?'welcome':state.screen==='property'?'login':state.screen==='budget'?'property':state.screen==='availability'?'budget':state.screen==='meet'?'availability':'welcome')}
function mobileNav(label){showToast(label+' section is ready in this demo')}
function header(title){return `<div class="topbar"><button class="back" onclick="back()">‹</button><h3>${title}</h3></div>`}

function render(){
  if(state.screen==='admin-login' || state.screen==='admin-dashboard' || state.screen==='admin-property' || state.screen==='admin-requests'){
    renderAdmin(); return;
  }
  const screens = {
    welcome: renderWelcome, login: renderLogin, property: renderProperty,
    budget: renderBudget, availability: renderAvailability, meet: renderMeet
  };
  app.innerHTML = `<div class="mobile-wrap"><div class="phone"><div class="status"><span>9:41</span><span>● ◔ ▮</span></div>${screens[state.screen]()}</div></div>`;
}
function renderWelcome(){
 return `<div class="screen hero-screen">
   <div class="hero-logo">⌂ ◇<strong>REAL ESTATE AGENT</strong><span>RAM BHAI</span></div>
   <div class="hero-copy"><h1>Find the perfect property</h1><p>according to your need</p><p>Trusted &nbsp;|&nbsp; Transparent &nbsp;|&nbsp; Reliable</p>
   <button class="btn btn-primary btn-full" onclick="setScreen('login')">Get Started</button>
   <p class="muted" style="color:#fff;margin-top:15px">Already have an account? <span class="link" style="color:#fff" onclick="setScreen('login')">Login</span></p></div>
 </div>`;
}
function renderLogin(){
 return `<div class="screen">${header('Welcome Back!')}<div class="logo-mark">⌂</div><h2>Login to Continue</h2><p class="subtitle">Find the right property with Ram Bhai.</p>
 <div class="tabs"><button class="tab active" onclick="this.classList.add('active')">Mobile Number</button><button class="tab">Gmail</button></div>
 <div class="field"><label>Mobile Number</label><input id="mobileLogin" placeholder="+91  Enter mobile number"></div>
 <button class="btn btn-primary btn-full" onclick="loginUser()">Continue</button>
 <div class="divider">OR</div><button class="btn btn-light btn-full google"><b>G</b> Continue with Google</button>
 <p class="center muted" style="margin-top:22px">By continuing, you agree to our <b>Terms & Conditions</b> and <b>Privacy Policy</b>.</p>
 </div>`;
}
function loginUser(){showToast('Login successful');setScreen('property')}
function renderProperty(){
 const types=['House','Plot','Shop','Commercial','Commercial Land','Agricultural Land'];
 return `<div class="screen">${header('Find Property')}<h2 style="font-size:20px">According to Your Need</h2><p class="subtitle">Tell us what property you are looking for.</p>
 <div class="field"><label>Where are you looking for property?</label><div class="search">⌕<input id="location" value="${state.location}" placeholder="Enter preferred location"></div></div>
 <div class="section-title">Select Property Type <span class="link">View all</span></div>
 <div class="type-grid">${types.map((t,i)=>`<button class="type-card ${state.propertyType===t?'selected':''}" onclick="state.propertyType='${t}';render()"><div class="ico">${['🏠','🌳','🏪','🏢','🏘️','🌾'][i]}</div>${t}</button>`).join('')}</div>
 <div class="summary"><b>We help you to find the best property</b><br><span class="muted">as per your requirement.</span></div>
 <button class="btn btn-primary btn-full" onclick="state.location=document.getElementById('location').value;setScreen('budget')">Continue</button>
 <div class="bottom-nav"><button class="active" onclick="mobileNav('Home')"><span>⌂</span>Home</button><button onclick="mobileNav('My Requests')"><span>▣</span>My Requests</button><button onclick="mobileNav('Profile')"><span>♙</span>Profile</button><button onclick="mobileNav('Contact')"><span>♧</span>Contact</button></div>
 </div>`;
}
function renderBudget(){
 const budgets=['Up to 15 Lakh','15 - 20 Lakh','20 - 25 Lakh','25 - 45 Lakh','45 - 75 Lakh','75 Lakh & Above'];
 return `<div class="screen">${header('Budget Range')}<h2 style="font-size:20px">Select your budget range</h2>
 <div class="section-title">Quick Range</div><div class="budget-grid">${budgets.map(b=>`<button class="budget ${state.budget===b?'selected':''}" onclick="state.budget='${b}';render()">${b}</button>`).join('')}</div>
 <div class="section-title">Or Enter Custom Range</div><div class="range"><div class="field"><label>Min. Budget</label><input id="min" value="${state.min}" placeholder="₹ Min"></div><div class="field"><label>Max. Budget</label><input id="max" value="${state.max}" placeholder="₹ Max"></div></div>
 <button class="btn btn-primary btn-full" style="margin-top:16px" onclick="state.min=document.getElementById('min').value;state.max=document.getElementById('max').value;setScreen('availability')">Continue</button><div class="illustration"></div>
 </div>`;
}
function renderAvailability(){
 return `<div class="screen">${header('Availability Status')}<div class="success"><div class="check">✓</div><h2>Good News!</h2><p>Properties are available<br>as per your requirement.</p>
 <p>Our expert agent will contact you soon<br>with the best options.</p></div>
 <button class="btn btn-primary btn-full" onclick="setScreen('meet')">Request to Meet Agent</button>
 <button class="btn btn-light btn-full" style="margin-top:10px" onclick="setScreen('property')">Modify Requirement</button>
 <div class="illustration"></div></div>`;
}
function renderMeet(){
 return `<div class="screen">${header('Meet Agent')}<h2 style="font-size:20px">Fill your details to</h2><p class="subtitle">connect with our expert</p>
 ${field('Full Name','name','Enter your full name','text')}${field('Mobile Number','mobile','Enter your mobile number','tel')}${field('Preferred Date','date','Select a date','date')}${field('Preferred Time','time','Select a time','time')}
 <div class="field"><label>Message (Optional)</label><textarea id="message" placeholder="Type your message...">${state.form.message}</textarea></div>
 <button class="btn btn-primary btn-full" onclick="submitRequest()">Submit Request</button><p class="center muted">♢ Your details are safe with us.</p></div>`;
}
function field(label,key,placeholder,type){
 return `<div class="field"><label>${label}</label><input id="f_${key}" type="${type}" value="${state.form[key]}" placeholder="${placeholder}"></div>`;
}
function submitRequest(){
 ['name','mobile','date','time'].forEach(k=>state.form[k]=document.getElementById('f_'+k).value);
 state.form.message=document.getElementById('message').value;
 if(!state.form.name || !state.form.mobile){showToast('Please enter name and mobile number');return}
 requests.unshift({id:Date.now(),name:state.form.name,location:state.location||'Not specified',budget:state.budget||'Custom',date:state.form.date||'—',status:'New'});
 save();showToast('Request submitted successfully');setTimeout(()=>setScreen('welcome'),600);
}

function renderAdmin(){
 if(state.screen==='admin-login'){app.innerHTML=`<div class="admin-login"><div class="login-card"><div class="logo-mark">⌂</div><h2>Admin Login</h2><p class="subtitle">Welcome back! Manage properties and meeting requests.</p><div class="field"><label>Username</label><input id="adminUser" placeholder="Enter username"></div><div class="field"><label>Password</label><input id="adminPass" type="password" placeholder="Enter password"></div><button class="btn btn-primary btn-full" onclick="adminLogin()">Login</button><p class="center muted" style="margin-top:16px">Demo: any username/password works.</p></div></div>`;return}
 const nav=(active)=>`<aside class="sidebar"><div class="brand">⌂ RAM BHAI<small>Real Estate Agent</small></div>${[['admin-dashboard','▦ Dashboard'],['admin-property','＋ Add Property'],['admin-requests','☷ Meeting Requests']].map(x=>`<button class="side-btn ${active===x[0]?'active':''}" onclick="setScreen('${x[0]}')">${x[1]}</button>`).join('')}<button class="side-btn" onclick="setScreen('admin-login')">↪ Logout</button></aside>`;
 if(state.screen==='admin-property'){app.innerHTML=`<div class="admin"><div class="admin-layout">${nav('admin-property')}<main class="main"><div class="main-head"><h1>Add / Edit Property</h1><button class="btn btn-light" onclick="setScreen('admin-dashboard')">← Back</button></div><div class="panel"><div class="admin-form"><div class="field"><label>Property Type</label><select id="pType"><option>House</option><option>Plot</option><option>Shop</option><option>Commercial</option><option>Commercial Land</option><option>Agricultural Land</option></select></div><div class="field"><label>Location</label><input id="pLocation" placeholder="Enter exact location"></div><div class="field"><label>Budget Range</label><select id="pBudget"><option>Up to 15 Lakh</option><option>15 - 20 Lakh</option><option>20 - 25 Lakh</option><option>25 - 45 Lakh</option><option>45 - 75 Lakh</option><option>75 Lakh & Above</option></select></div><div class="field"><label>Status</label><select id="pStatus"><option>Available</option><option>Booked</option><option>Sold</option></select></div><div class="field full"><label>Notes</label><textarea id="pNotes" placeholder="Enter property notes"></textarea></div></div><button class="btn btn-primary" onclick="addProperty()">Save Property</button></div></main></div></div>`;return}
 if(state.screen==='admin-requests'){app.innerHTML=`<div class="admin"><div class="admin-layout">${nav('admin-requests')}<main class="main"><div class="main-head"><h1>Meeting Requests</h1><span class="muted">${requests.length} total</span></div><div class="panel"><div class="table-wrap">${requestTable()}</div></div></main></div></div>`;return}
 app.innerHTML=`<div class="admin"><div class="admin-layout">${nav('admin-dashboard')}<main class="main"><div class="main-head"><h1>Dashboard</h1><span class="muted">Ram Bhai Admin</span></div><div class="stats"><div class="stat"><small>Total Properties</small><strong>${128+properties.length}</strong></div><div class="stat"><small>Available</small><strong>${85+properties.filter(p=>p.status==='Available').length}</strong></div><div class="stat"><small>Booked</small><strong>28</strong></div><div class="stat"><small>Sold</small><strong>15</strong></div></div><div class="panel"><h3>Recent Meeting Requests</h3><div class="table-wrap">${requestTable(5)}</div></div><div class="panel"><h3>Latest Properties</h3><div class="table-wrap">${propertyTable()}</div></div></main></div></div>`;
}
function requestTable(limit){
 const data=requests.slice(0,limit||999);
 if(!data.length)return `<p class="muted">No requests yet. Submit one from the app to see it here.</p>`;
 return `<table class="table"><thead><tr><th>Name</th><th>Location</th><th>Budget</th><th>Date</th><th>Status</th></tr></thead><tbody>${data.map(r=>`<tr><td>${r.name}</td><td>${r.location}</td><td>${r.budget}</td><td>${r.date}</td><td><span class="pill orange">${r.status}</span></td></tr>`).join('')}</tbody></table>`;
}
function propertyTable(){
 if(!properties.length)return `<p class="muted">No newly added properties yet.</p>`;
 return `<table class="table"><thead><tr><th>Type</th><th>Location</th><th>Budget</th><th>Status</th></tr></thead><tbody>${properties.map(p=>`<tr><td>${p.type}</td><td>${p.location}</td><td>${p.budget}</td><td><span class="pill ${p.status==='Available'?'green':p.status==='Sold'?'red':'orange'}">${p.status}</span></td></tr>`).join('')}</tbody></table>`;
}
function adminLogin(){setScreen('admin-dashboard');showToast('Welcome to Admin Panel')}
function addProperty(){
 const p={type:document.getElementById('pType').value,location:document.getElementById('pLocation').value,budget:document.getElementById('pBudget').value,status:document.getElementById('pStatus').value,notes:document.getElementById('pNotes').value};
 if(!p.location){showToast('Please enter location');return}
 properties.unshift(p);save();showToast('Property saved');setScreen('admin-dashboard');
}
render();
