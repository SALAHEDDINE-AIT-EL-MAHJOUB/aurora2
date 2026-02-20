// shop.js - fetch products from Firestore (compat) and render grid
const productsEl = document.getElementById('products');
// search & filter controls (may be null if DOM not present)
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
// complete product list from Firestore
let allProducts = [];

// --- Inline Lottie animation data (embedded so page works via file://) ---
const LOADING_ANIM = {"v":"5.5.7","meta":{"g":"LottieFiles AE 0.1.20","a":"","k":"","d":"","tc":"#FFFFFF"},"fr":24,"ip":0,"op":84,"w":1920,"h":1080,"nm":"loading bar","ddd":0,"assets":[{"id":"comp_0","layers":[{"ddd":0,"ind":1,"ty":5,"nm":"102","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[1390.958,435.783,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[173,173,100],"ix":6}},"ao":0,"t":{"d":{"k":[{"s":{"s":42,"f":"Muli-Bold","t":"1","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":21}]},"p":{},"m":{"g":1,"a":{"a":0,"k":[0,0],"ix":2}},"a":[]},"ip":20,"op":76,"st":20,"bm":0},{"ddd":0,"ind":2,"ty":5,"nm":"101","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[1437.621,435.783,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[173,173,100],"ix":6}},"ao":0,"t":{"d":{"k":[{"s":{"s":42,"f":"Muli-Bold","t":"1","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":11},{"s":{"s":42,"f":"Muli-Bold","t":"2","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":12},{"s":{"s":42,"f":"Muli-Bold","t":"3","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":13},{"s":{"s":42,"f":"Muli-Bold","t":"4","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":14},{"s":{"s":42,"f":"Muli-Bold","t":"5","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":15},{"s":{"s":42,"f":"Muli-Bold","t":"6","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":16},{"s":{"s":42,"f":"Muli-Bold","t":"7","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":17},{"s":{"s":42,"f":"Muli-Bold","t":"8","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":18},{"s":{"s":42,"f":"Muli-Bold","t":"9","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":19},{"s":{"s":42,"f":"Muli-Bold","t":"0","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":20}]},"p":{},"m":{"g":1,"a":{"a":0,"k":[0,0],"ix":2}},"a":[]},"ip":10,"op":78,"st":10,"bm":0},{"ddd":0,"ind":3,"ty":5,"nm":"1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[1481.958,435.783,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[173,173,100],"ix":6}},"ao":0,"t":{"d":{"k":[{"s":{"s":42,"f":"Muli-Bold","t":"1","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":1},{"s":{"s":42,"f":"Muli-Bold","t":"2","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":2},{"s":{"s":42,"f":"Muli-Bold","t":"3","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":3},{"s":{"s":42,"f":"Muli-Bold","t":"4","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":4},{"s":{"s":42,"f":"Muli-Bold","t":"5","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":5},{"s":{"s":42,"f":"Muli-Bold","t":"6","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":6},{"s":{"s":42,"f":"Muli-Bold","t":"7","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":7},{"s":{"s":42,"f":"Muli-Bold","t":"8","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":8},{"s":{"s":42,"f":"Muli-Bold","t":"9","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":9},{"s":{"s":42,"f":"Muli-Bold","t":"0","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":10}]},"p":{},"m":{"g":1,"a":{"a":0,"k":[0,0],"ix":2}},"a":[]},"ip":0,"op":78,"st":0,"bm":0}]}],"fonts":{"list":[{"fName":"Muli-Bold","fFamily":"Muli","fStyle":"Bold","ascent":71.1410522460938}]},"layers":[{"ddd":0,"ind":1,"ty":5,"nm":". 3","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[680,427.5,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[173,173,100],"ix":6}},"ao":0,"t":{"d":{"k":[{"s":{"s":42,"f":"Muli-Bold","t":".","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":0}]},"p":{},"m":{"g":1,"a":{"a":0,"k":[0,0],"ix":2}},"a":[]},"ip":60,"op":84,"st":36,"bm":0},{"ddd":0,"ind":2,"ty":5,"nm":". 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[652.5,427.5,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[173,173,100],"ix":6}},"ao":0,"t":{"d":{"k":[{"s":{"s":42,"f":"Muli-Bold","t":".","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":0}]},"p":{},"m":{"g":1,"a":{"a":0,"k":[0,0],"ix":2}},"a":[]},"ip":36,"op":84,"st":18,"bm":0},{"ddd":0,"ind":3,"ty":5,"nm":".","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[624,427.676,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[173,173,100],"ix":6}},"ao":0,"t":{"d":{"k":[{"s":{"s":42,"f":"Muli-Bold","t":".","j":0,"tr":30,"lh":50.4,"ls":0,"fc":[0,0,0]},"t":0}]},"p":{},"m":{"g":1,"a":{"a":0,"k":[0,0],"ix":2}},"a":[]},"ip":12,"op":84,"st":0,"bm":0}],"markers":[]} ;

const TICK_ANIM = {"v":"4.8.0","meta":{"g":"LottieFiles AE 3.1.1","a":"","k":"","d":"","tc":""},"fr":25,"ip":0,"op":34,"w":1000,"h":1000,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[471.75,445.5,0],"ix":2},"a":{"a":0,"k":[-28.25,-54.5,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[-195.652,-36.956],[-96.234,61],[139.152,-170]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.109803921569,0.752941176471,0.070588235294,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":44,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.04],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":20,"s":[0]},{"t":33,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":20,"op":145,"st":20,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[471.75,445.5,0],"ix":2},"a":{"a":0,"k":[-28.25,-54.5,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-151.878],[151.878,0],[0,151.878],[-151.878,0]],"o":[[0,151.878],[-151.878,0],[0,-151.878],[151.878,0]],"v":[[246.75,-54.5],[-28.25,220.5],[-303.25,-54.5],[-28.25,-329.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.110053770244,0.753725409508,0.071529850364,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":43,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.851],"y":[1]},"o":{"x":[0.903],"y":[0]},"t":0,"s":[100]},{"t":21,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":189,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":125,"st":0,"bm":0}],"markers":[]} ;

const CROSS_ANIM = {"v":"4.8.0","meta":{"g":"LottieFiles AE 3.1.1","a":"","k":"","d":"","tc":""},"fr":25,"ip":0,"op":37,"w":1000,"h":1000,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[498,500,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[145.738,-146.048],[-146.262,145.952]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.847058832645,0.054901961237,0.054901961237,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":60,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-146.262,-146.048],[145.738,145.952]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.847058832645,0.054901961237,0.054901961237,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":60,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.11],"y":[1]},"o":{"x":[0.863],"y":[0]},"t":10,"s":[50]},{"t":24,"s":[0]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.11],"y":[1]},"o":{"x":[0.863],"y":[0]},"t":10,"s":[50]},{"t":24,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":3,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":10,"op":135,"st":10,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[500,500,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-151.878],[151.878,0],[0,151.878],[-151.878,0]],"o":[[0,151.878],[-151.878,0],[0,-151.878],[151.878,0]],"v":[[274.738,-0.048],[-0.262,274.952],[-275.262,-0.048],[-0.262,-275.048]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.847058832645,0.054901961237,0.054901961237,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":61,"ix":5},"lc":2,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.293],"y":[1]},"o":{"x":[0.708],"y":[0]},"t":0,"s":[50]},{"t":14,"s":[0]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.293],"y":[1]},"o":{"x":[0.708],"y":[0]},"t":0,"s":[50]},{"t":14,"s":[100]}],"ix":2},"o":{"a":0,"k":-90,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":125,"st":0,"bm":0}],"markers":[]} ;

// --- Lottie runtime instances (will be created when DOM elements exist) ---
let loaderLottie = null;
let tickLottie = null;
let crossLottie = null;

function initLottieAnimations() {
  if (!window.lottie) return;
  try {
    const loaderContainer = document.getElementById('loader-lottie');
    const tickContainer = document.getElementById('tick-lottie');
    const crossContainer = document.getElementById('cross-lottie');
    if (loaderContainer) loaderLottie = window.lottie.loadAnimation({ container: loaderContainer, renderer: 'svg', loop: true, autoplay: false, animationData: LOADING_ANIM });
    if (tickContainer) tickLottie = window.lottie.loadAnimation({ container: tickContainer, renderer: 'svg', loop: false, autoplay: false, animationData: TICK_ANIM });
    if (crossContainer) crossLottie = window.lottie.loadAnimation({ container: crossContainer, renderer: 'svg', loop: false, autoplay: false, animationData: CROSS_ANIM });
  } catch (e) { console.warn('Lottie init failed', e); }
}

function showLoader() {
  const overlay = document.getElementById('loader-overlay');
  if (overlay) overlay.classList.remove('hidden');
  try { if (loaderLottie) loaderLottie.goToAndPlay(0, true); } catch (e) {}
}

function hideLoader() {
  const overlay = document.getElementById('loader-overlay');
  if (overlay) overlay.classList.add('hidden');
  try { if (loaderLottie) loaderLottie.stop(); } catch (e) {}
}

function showResult(success, message) {
  const overlay = document.getElementById('result-overlay');
  const tickEl = document.getElementById('tick-lottie');
  const crossEl = document.getElementById('cross-lottie');
  const msg = document.getElementById('result-message');
  if (!overlay) return;
  if (success) {
    if (tickEl) tickEl.style.display = 'block';
    if (crossEl) crossEl.style.display = 'none';
    try { if (tickLottie) tickLottie.goToAndPlay(0, true); } catch (e) {}
  } else {
    if (tickEl) tickEl.style.display = 'none';
    if (crossEl) crossEl.style.display = 'block';
    try { if (crossLottie) crossLottie.goToAndPlay(0, true); } catch (e) {}
  }
  if (msg) msg.textContent = message || (success ? 'Succès' : 'Erreur');
  overlay.classList.remove('hidden');
  // auto-hide after short delay
  setTimeout(() => {
    overlay.classList.add('hidden');
    try { if (tickLottie) tickLottie.stop(); if (crossLottie) crossLottie.stop(); } catch (e) {}
  }, 1800);
}

// initialize lottie when script runs (DOM elements are present because script is included at bottom of page)
initLottieAnimations();


// ============ FIREBASE INITIALIZATION ============
const firebaseConfig = {
  apiKey: "AIzaSyBm_xhZFlPkGkjDoe5ciFpDc82Ji0WjrYk",
  authDomain: "portfolio-5aa4d.firebaseapp.com",
  projectId: "portfolio-5aa4d",
  storageBucket: "portfolio-5aa4d.firebasestorage.app",
  messagingSenderId: "868761896954",
  appId: "1:868761896954:web:5f4e6720838288e6c7c643",
  measurementId: "G-D0JDZ64838"
};

// Initialize Firebase (compat) and Firestore
if (!window.firebase || !firebase.initializeApp) {
  console.error('Firebase compat scripts not loaded. Ensure shop.html includes firebase-app-compat.js and firebase-firestore-compat.js');
}
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// ============ LOAD FROM products.json OU EMBEDDED DATA ============

const STORAGE_KEY = 'shop_products';

// Charger les produits depuis le fichier products.json (ou fallback données embédées)
async function loadProductsFromJSON() {
  try {
    // Charger les produits depuis products.json (fonctionne sur GitHub Pages via HTTP)
    const response = await fetch('../backend/products.json');
    if (!response.ok) {
      throw new Error(`Erreur ${response.status} lors du chargement de products.json`);
    }
    
    const data = await response.json();
    const products = data.products || [];
    const items = products.map((p, idx) => ({
      id: p.id || `prod_${idx}`,
      data: p
    }));
    console.log(`✓ ${items.length} produit(s) chargé(s) depuis products.json`);
    allProducts = items;
    applyFilters();
  } catch (err) {
    console.error('Erreur chargement des produits:', err);
    if (productsEl) {
      productsEl.innerHTML = '<p class="text-red-600 p-4">❌ Erreur: Impossible de charger les produits. Assurez-vous que products.json existe.</p>';
    }
  }
}

// Sauvegarder une commande en Firebase
function saveOrderToFirebase(order) {
  return new Promise((resolve, reject) => {
    try {
      order.createdAt = new Date().toISOString();
      db.collection('commandes').add(order)
        .then((docRef) => {
          console.log('Commande sauvegardée dans Firebase:', docRef.id);
          resolve(true);
        })
        .catch((err) => {
          console.error('Erreur Firebase:', err);
          reject(err);
        });
    } catch (err) {
      console.error('Erreur sauvegarde commande:', err);
      reject(err);
    }
  });
}

// Sauvegarder un pack en Firebase
function savePackToFirebase(packDoc) {
  return new Promise((resolve, reject) => {
    try {
      packDoc.createdAt = new Date().toISOString();
      db.collection('pack').add(packDoc)
        .then((docRef) => {
          console.log('Pack sauvegardé dans Firebase:', docRef.id);
          resolve(true);
        })
        .catch((err) => {
          console.error('Erreur Firebase pack:', err);
          reject(err);
        });
    } catch (err) {
      console.error('Erreur sauvegarde pack:', err);
      reject(err);
    }
  });
}

function computeDiscountedPrice(original, promo) {
  const price = Number(original) || 0;
  if (!promo || promo.type === 'none') return { value: price, active: false };
  if (promo.type === 'percent') {
    const pct = Number(promo.value) || 0;
    const reduced = +(price * (1 - pct / 100)).toFixed(2);
    return { value: reduced, active: reduced < price };
  }
  if (promo.type === 'special') {
    const special = Number(promo.value) || price;
    const reduced = +(Math.min(special, price)).toFixed(2);
    return { value: reduced, active: reduced < price };
  }
  return { value: price, active: false };
}
// helper: determine if a product is expired
function isProductExpired(data) {
  if (!data) return false;
  if (data.expired === true) return true;
  // look for common expiry fields
  const candidates = [data.expiryDate, data.expireDate, data.expiry, data.expiredAt];
  for (let c of candidates) {
    if (c == null) continue;
    // Firestore Timestamp compat
    if (typeof c === 'object' && typeof c.toDate === 'function') {
      try { c = c.toDate(); } catch (e) { /* ignore */ }
    }
    if (c instanceof Date) {
      return c.getTime() < Date.now();
    }
    if (typeof c === 'string' || typeof c === 'number') {
      const d = new Date(c);
      if (!isNaN(d.getTime())) return d.getTime() < Date.now();
    }
  }
  return false;
}

// helper: check if product (or all its variants) is out of stock
function isOutOfStock(data) {
  if (!data) return false;
  // prefer explicit total stock/quantity fields when present
  const totalCandidates = ['stock','total','quantity','totalQuantity','qty_total','total_stock','quantity_total'];
  for (const key of totalCandidates) {
    if (data.hasOwnProperty(key) && typeof data[key] === 'number') {
      if (data[key] <= 0) return true;
      // if total > 0, it's available regardless of variant details
      return false;
    }
  }
  // if variants provided, consider out of stock when every variant has stock <= 0 (or no stock info)
  if (Array.isArray(data.variants) && data.variants.length) {
    // if every variant has numeric stock and the sum is 0 -> out of stock
    let sum = 0;
    let anyUnknown = false;
    for (const v of data.variants) {
      if (!v) continue;
      if (typeof v.stock === 'number') sum += Number(v.stock);
      else anyUnknown = true;
    }
    if (!anyUnknown) {
      return sum <= 0;
    }
    // if some variants lack stock info, assume available
    return false;
  }
  return false;
}

function renderCard(id, data) {
  const promo = data.promo || { type: 'none' };
  const discounted = computeDiscountedPrice(data.price, promo);
  const expired = isProductExpired(data);
  const outOfStock = isOutOfStock(data);

  const card = document.createElement('article');
  card.className = 'bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-1 transition p-0 flex flex-col';

  const imgWrap = document.createElement('div');
  imgWrap.className = 'relative h-56 bg-gray-100';
  const img = document.createElement('img');
  img.className = 'object-cover w-full h-full';
  img.src = data.imageUrl || data.imageBase64 || '';
  img.alt = data.name || 'Produit';
  imgWrap.appendChild(img);

  if (discounted.active) {
    const badge = document.createElement('span');
    badge.className = 'absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded';
    if (promo.type === 'percent') badge.textContent = `PROMO -${promo.value}%`;
    else badge.textContent = 'BLACK FRIDAY';
    imgWrap.appendChild(badge);
  }

  // expired overlay + badge
  if (expired) {
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-red-600 bg-opacity-60 flex items-center justify-center';
    overlay.style.pointerEvents = 'none';
    overlay.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    `;
    imgWrap.appendChild(overlay);

    const expBadge = document.createElement('span');
    expBadge.className = 'absolute top-3 right-3 bg-white/80 text-red-700 text-xs font-semibold px-2 py-1 rounded';
    expBadge.textContent = 'Expiré';
    imgWrap.appendChild(expBadge);
  }

  // out-of-stock overlay + badge (only if not expired)
  if (!expired && outOfStock) {
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center';
    overlay.style.pointerEvents = 'none';
    overlay.innerHTML = `
      <div class="text-center px-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" />
          <line x1="3" y1="6" x2="21" y2="6" />
        </svg>
        <div class="text-white font-semibold">Rupture de stock</div>
      </div>
    `;
    imgWrap.appendChild(overlay);

    const outBadge = document.createElement('span');
    outBadge.className = 'absolute top-3 right-3 bg-white/80 text-gray-800 text-xs font-semibold px-2 py-1 rounded';
    outBadge.textContent = 'Rupture';
    imgWrap.appendChild(outBadge);
  }

  card.appendChild(imgWrap);

  const body = document.createElement('div');
  body.className = 'p-4 flex-1 flex flex-col';

  const title = document.createElement('h3');
  let titleClass = 'font-medium ';
  if (expired) titleClass += 'text-red-600';
  else if (outOfStock) titleClass += 'text-gray-400';
  else titleClass += 'text-gray-800';
  title.className = titleClass;
  title.textContent = data.name || '';
  body.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'text-sm text-gray-500 mt-2 flex-1';
  desc.textContent = data.description || '';
  body.appendChild(desc);

  const priceWrap = document.createElement('div');
  priceWrap.className = 'mt-4 flex items-baseline space-x-2';

  if (discounted.active && discounted.value < data.price) {
    const orig = document.createElement('span');
    orig.className = 'text-sm text-gray-400 line-through';
    orig.textContent = `${data.price} DH`;
    priceWrap.appendChild(orig);

    const now = document.createElement('span');
    now.className = 'text-lg font-bold text-red-600';
    now.textContent = `${discounted.value} DH`;
    priceWrap.appendChild(now);
  } else {
    const only = document.createElement('span');
    only.className = 'text-lg font-semibold';
    only.textContent = `${data.price} DH`;
    priceWrap.appendChild(only);
  }

  body.appendChild(priceWrap);

  card.appendChild(body);

  // open modal on click (disable when out of stock)
  if (outOfStock) {
    card.classList.add('opacity-60', 'cursor-not-allowed');
  } else {
    card.classList.add('cursor-pointer');
    card.addEventListener('click', () => openProductModal(id, data));
  }

  return card;
}

// Modal logic
const modal = document.getElementById('product-modal');
const pmName = document.getElementById('pm-name');
const pmImage = document.getElementById('pm-image');
const pmUnit = document.getElementById('pm-unit');
const pmPrice = document.getElementById('pm-price');
const pmStock = document.getElementById('pm-stock');
const pmExpiry = document.getElementById('pm-expiry');
const pmDesc = document.getElementById('pm-desc');
const pmVariant = document.getElementById('pm-variant');
const pmVariantStock = document.getElementById('pm-variant-stock');
const pmClose = document.getElementById('pm-close');
const orderName = document.getElementById('order-name');
const orderCity = document.getElementById('order-city');
const orderQuantity = document.getElementById('order-quantity');
const orderQuantityFeedback = document.getElementById('order-quantity-feedback');
const orderPhone = document.getElementById('order-phone');
const orderSubmit = document.getElementById('order-submit');
const orderFeedback = document.getElementById('order-feedback');
const pmDelivery = document.getElementById('pm-delivery');
const pmTotal = document.getElementById('pm-total');

let currentProductId = null;
let currentProductData = null;

pmClose.addEventListener('click', () => { modal.classList.add('hidden'); });

function openProductModal(id, data) {
  currentProductId = id;
  currentProductData = data;
  pmName.textContent = data.name || '';
  pmImage.src = data.imageUrl || data.imageBase64 || '';
  // unit
  if (data.unit) {
    if (!isNaN(Number(data.unit))) pmUnit.textContent = `Contenance: ${data.unit}`;
    else pmUnit.textContent = `Unité: ${data.unit}`;
  } else pmUnit.textContent = '';

  // adjust quantity label when unit is 'piece'
  try {
    const qtyLabel = document.getElementById('order-quantity-label');
    if (qtyLabel) {
      if (String(data.unit) === 'piece') {
        qtyLabel.textContent = 'Combien de pièces souhaitez-vous ?';
      } else {
        qtyLabel.textContent = 'Combien souhaitez-vous ?';
      }
    }
  } catch (e) { /* ignore */ }
  // price (use discounted if any)
  const discounted = computeDiscountedPrice(data.price, data.promo || { type: 'none' });
  if (discounted.active && discounted.value < data.price) {
    pmPrice.innerHTML = `<span class="text-sm line-through text-gray-400 mr-2">${data.price} DH</span><span class="text-lg font-bold text-red-600">${discounted.value} DH</span>`;
  } else {
    pmPrice.textContent = `${data.price} DH`;
  }
  // stock
  pmStock.textContent = `Stock: ${data.stock != null ? data.stock : 0}`;
  // expiry
  if (data.expiryDate) {
    // show the expiry date instead of days remaining
    try {
      const d = new Date(data.expiryDate);
      pmExpiry.textContent = `Date d'expiration: ${d.toLocaleDateString('fr-FR')}`;
      // mark expired optionally
      if (d.getTime() < Date.now()) pmExpiry.textContent += ' (expiré)';
    } catch (e) {
      pmExpiry.textContent = `Date d'expiration: ${data.expiryDate}`;
    }
  } else pmExpiry.textContent = '';
  pmDesc.textContent = data.description || '';

  // populate variant select (do NOT include an "Aucune" option)
  pmVariant.innerHTML = '';
  let variantCount = 0;
    if (data.variants && Array.isArray(data.variants) && data.variants.length) {
    data.variants.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.label;
      // build label: weight/unit + price (do NOT show variant stock)
      const unit = data.unit || '';
      const unitLabel = (unit === 'piece') ? 'pièce' : unit;
      const quantityLabel = unitLabel ? `${v.label} ${unitLabel}` : String(v.label);
      if (v.price != null) opt.textContent = `${quantityLabel} :Prix ${v.price} DH`;
      else opt.textContent = `${quantityLabel}`;
      // if variant stock is zero, mark it and disable selection
      const vstock = Number(v.stock) || 0;
      if (vstock === 0) {
        opt.disabled = true;
        opt.style.color = 'red';
        opt.textContent = opt.textContent + ' (rupture)';
        opt.title = 'Rupture de stock';
      }
      pmVariant.appendChild(opt);
      variantCount++;
    });
  }

  // hide the variant select entirely when there are no variants
  if (variantCount === 0) {
    pmVariant.style.display = 'none';
    pmVariantStock.style.display = 'none';
  } else {
    pmVariant.style.display = '';
    pmVariantStock.style.display = '';
    // ensure first variant is selected by default
    pmVariant.selectedIndex = 0;
  }

  // ensure quantity has a safe default before computing limits/prices
  orderQuantity.value = 1;

  // update variant stock display and qty max
  updateVariantStock();

  // update displayed prices (unit, delivery, total)
  updateDisplayedPrices();

  // validate quantity against stock on open
  validateQuantityAndShowMessage();
  orderName.value = '';
  orderCity.value = '';
  orderPhone.value = '';
  orderFeedback.textContent = '';

  // populate orderCity options showing delivery fee in front of each city when available
  try {
    orderCity.innerHTML = '';
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'Sélectionnez une ville';
    orderCity.appendChild(defaultOpt);
    const dp = data.deliveryPrices || null;
    if (dp && typeof dp === 'object' && Object.keys(dp).length) {
      Object.keys(dp).forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        const price = Number(dp[city]) || 0;
        opt.textContent = `${city} : Frais livraison ${price} DH`;
        orderCity.appendChild(opt);
      });
    } else {
      const staticCities = ['Casablanca','Rabat','Marrakech','Fès','Tangier','Agadir','Meknès','Oujda','Kénitra','Tétouan'];
      staticCities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        orderCity.appendChild(opt);
      });
    }
  } catch (e) { /* ignore */ }

  modal.classList.remove('hidden');
}

function updateVariantStock() {
  const selected = pmVariant.value;
  if (!selected) {
    // show main stock
    pmVariantStock.textContent = '';
    orderQuantity.max = currentProductData.stock != null ? String(currentProductData.stock) : '';
    validateQuantityAndShowMessage();
    return;
  }
  const variants = currentProductData.variants || [];
  const found = variants.find(v => String(v.label) === String(selected));
  const vstock = found ? Number(found.stock) || 0 : 0;
  // show variant stock along with variant size and unit for clarity
  const unit = currentProductData.unit || '';
  const unitLabel = (unit === 'piece') ? 'pièce' : unit;
  const sizeText = selected + (unitLabel ? ' ' + unitLabel : '');
  pmVariantStock.textContent = `la quantité à commander`;
  orderQuantity.max = String(vstock);
  if (Number(orderQuantity.value) > vstock) orderQuantity.value = vstock > 0 ? vstock : 1;
  validateQuantityAndShowMessage();
}

pmVariant.addEventListener('change', () => { updateVariantStock(); validateQuantityAndShowMessage(); });

// recalc when city or quantity changes
orderCity.addEventListener('change', () => updateDisplayedPrices());
orderQuantity.addEventListener('input', () => { updateDisplayedPrices(); validateQuantityAndShowMessage(); });

// --- Pack composer UI & logic ---
const packModal = document.getElementById('pack-modal');
const openPackBtn = document.getElementById('open-pack-btn');
const packClose = document.getElementById('pack-close');
const packProductsEl = document.getElementById('pack-products');
const packName = document.getElementById('pack-name');
const packCity = document.getElementById('pack-city');
const packPhone = document.getElementById('pack-phone');
const packSubmit = document.getElementById('pack-submit');
const packFeedback = document.getElementById('pack-feedback');
const packFeedbackStep2 = document.getElementById('pack-feedback-step2');
const packNext = document.getElementById('pack-next');
const packBack = document.getElementById('pack-back');
const packStep1 = document.getElementById('pack-step-1');
const packStep2 = document.getElementById('pack-step-2');
const packDeliveryEl = document.getElementById('pack-delivery');
const packTotalEl = document.getElementById('pack-total');

let packDpMap = {}; // city -> max delivery price across products

// add a small debug badge inside the pack modal to verify the script version
let packDebugBadge = null;
try {
  if (packModal) {
    packDebugBadge = document.createElement('div');
    packDebugBadge.id = 'pack-debug-badge';
    packDebugBadge.style.position = 'absolute';
    packDebugBadge.style.top = '8px';
    packDebugBadge.style.right = '8px';
    packDebugBadge.style.background = '#111';
    packDebugBadge.style.color = '#fff';
    packDebugBadge.style.padding = '4px 8px';
    packDebugBadge.style.borderRadius = '6px';
    packDebugBadge.style.fontSize = '12px';
    packDebugBadge.style.zIndex = '9999';
    packDebugBadge.style.opacity = '0.9';
    packDebugBadge.textContent = 'Debug: ON';
    // ensure modal has relative positioning so absolute badge positions correctly
    try { if (getComputedStyle(packModal).position === 'static') packModal.style.position = 'relative'; } catch (e) {}
    packModal.appendChild(packDebugBadge);
  }
} catch (e) { /* ignore */ }

// debug: warn if critical pack UI elements are missing
try {
  const missing = [];
  if (!packProductsEl) missing.push('pack-products');
  if (!packCity) missing.push('pack-city');
  if (!packName) missing.push('pack-name');
  if (!packPhone) missing.push('pack-phone');
  if (!packSubmit) missing.push('pack-submit');
  if (!packModal) missing.push('pack-modal');
  if (missing.length) console.warn('Pack UI elements missing:', missing.join(', '));
} catch (e) { /* ignore */ }

function buildPackDpMap() {
  packDpMap = {};
  allProducts.forEach(({ id, data }) => {
    const dp = data.deliveryPrices || {};
    if (dp && typeof dp === 'object') {
      Object.keys(dp).forEach(city => {
        const price = Number(dp[city]) || 0;
        packDpMap[city] = Math.max(packDpMap[city] || 0, price);
      });
    }
  });
  try { console.log('buildPackDpMap -> packDpMap keys:', Object.keys(packDpMap).length, Object.keys(packDpMap)); } catch (e) {}
}

function openPackModal() {
  try { console.log('openPackModal called'); } catch (e) {}
  buildPackDpMap();
  // populate pack products list
  packProductsEl.innerHTML = '';
  allProducts.forEach(({ id, data }) => {
    const row = document.createElement('div');
    row.className = 'flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border-b hover:bg-gray-50';
    const left = document.createElement('div');
    left.className = 'flex flex-col sm:flex-row items-start sm:items-center space-x-3 w-full sm:w-auto';
    const chk = document.createElement('input'); chk.type = 'checkbox'; chk.dataset.pid = id; chk.className = 'h-4 w-4';
    // ensure checkbox visually appears before text on all screen sizes
    const chkWrap = document.createElement('div'); chkWrap.className = 'flex-shrink-0 order-first mr-2'; chkWrap.appendChild(chk);
    // product thumbnail
    const thumbWrap = document.createElement('div');
    thumbWrap.className = 'h-10 w-10 flex items-center justify-center overflow-hidden rounded bg-gray-100';
    const thumb = document.createElement('img');
    thumb.className = 'object-cover h-full w-full';
    thumb.src = data.imageUrl || data.imageBase64 || '';
    thumb.alt = data.name || '';
    thumb.onerror = function() { thumbWrap.style.display = 'none'; };
    thumbWrap.appendChild(thumb);
    const nameWrap = document.createElement('div'); nameWrap.className = 'flex flex-col';
    const name = document.createElement('div'); name.className = 'text-sm font-medium text-gray-800'; name.textContent = data.name || '';
    const subtitle = document.createElement('div'); subtitle.className = 'text-xs text-gray-500 truncate max-w-xs sm:max-w-[200px]';
    subtitle.textContent = (data.description || '').slice(0, 80);
    nameWrap.appendChild(name); nameWrap.appendChild(subtitle);
    left.appendChild(chkWrap); left.appendChild(thumbWrap); left.appendChild(nameWrap);

    

    const right = document.createElement('div'); right.className = 'flex flex-col sm:flex-row items-center sm:items-center sm:space-x-3 w-full sm:w-auto mt-2 sm:mt-0';
    const priceSpan = document.createElement('div'); priceSpan.className = 'text-sm font-medium text-gray-800 w-full sm:w-auto text-right sm:text-left';
    const discounted = computeDiscountedPrice(data.price, data.promo||{type:'none'});
    priceSpan.textContent = `${discounted.value} DH`;

    // variant select (if product has variants)
    let variantSelect = null;
    let variantStockSpan = null;
    if (data.variants && Array.isArray(data.variants) && data.variants.length) {
      variantSelect = document.createElement('select');
      variantSelect.className = 'border rounded p-1 w-full sm:w-auto min-w-0';
      	// require selecting the product checkbox before choosing a variant
      	variantSelect.disabled = true;
      const vFirstOpt = document.createElement('option'); vFirstOpt.value = ''; vFirstOpt.textContent = 'Sélectionnez variante'; variantSelect.appendChild(vFirstOpt);
      data.variants.forEach(v => {
        const o = document.createElement('option');
        o.value = v.label;
        const unit = data.unit || '';
        const unitLabel = (unit === 'piece') ? 'pièce' : unit;
        const qLabel = unitLabel ? `${v.label} ${unitLabel}` : String(v.label);
        // show variant label and price (do NOT display numeric stock)
        if (v.price != null) o.textContent = `${qLabel} :Prix ${v.price} DH`;
        else o.textContent = `${qLabel}`;
        // disable and mark out-of-stock variants
        const vstock = Number(v.stock) || 0;
        if (vstock === 0) {
          o.disabled = true;
          o.style.color = 'red';
          o.textContent = o.textContent + ' (rupture)';
          o.title = 'Rupture de stock';
        }
        variantSelect.appendChild(o);
      });
      variantStockSpan = document.createElement('div');
      variantStockSpan.className = 'text-xs text-gray-500 ml-0 sm:ml-2 w-full sm:w-auto';
      variantStockSpan.textContent = '';
    }

    // do not display main product stock inside the pack composer UI
    const qtyInput = document.createElement('input'); qtyInput.type = 'number'; qtyInput.min = 1; qtyInput.value = 1; qtyInput.className = 'w-full sm:w-24 text-center border rounded p-1'; qtyInput.disabled = true;
    qtyInput.dataset.pid = id;

    // for piece unit, prefer integer step
    if (String(data.unit) === 'piece') { qtyInput.step = 1; }

    // mark expired or out-of-stock products inside pack composer (after variantSelect and qtyInput exist)
    (function() {
      const prodExpired = isProductExpired(data);
      const prodOut = isOutOfStock(data);
      if (prodExpired) {
        const ov = document.createElement('div');
        ov.className = 'absolute inset-0 bg-red-600 bg-opacity-60 flex items-center justify-center';
        ov.style.pointerEvents = 'none';
        ov.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>`;
        thumbWrap.style.position = 'relative';
        thumbWrap.appendChild(ov);
        const b = document.createElement('span'); b.className = 'absolute top-0 right-0 text-xs bg-white/80 text-red-700 rounded px-2 py-0.5'; b.textContent = 'Expiré'; thumbWrap.appendChild(b);
        // disable selection
        chk.disabled = true;
        if (typeof variantSelect !== 'undefined' && variantSelect) variantSelect.disabled = true;
        qtyInput.disabled = true;
        name.className = 'text-sm font-medium text-red-600';
      } else if (prodOut) {
        const ov = document.createElement('div');
        ov.className = 'absolute inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center';
        ov.style.pointerEvents = 'none';
        ov.innerHTML = `<div class="text-white text-xs font-semibold">Rupture</div>`;
        thumbWrap.style.position = 'relative';
        thumbWrap.appendChild(ov);
        const b = document.createElement('span'); b.className = 'absolute top-0 right-0 text-xs bg-white/80 text-gray-800 rounded px-2 py-0.5'; b.textContent = 'Rupture'; thumbWrap.appendChild(b);
        chk.disabled = true;
        if (typeof variantSelect !== 'undefined' && variantSelect) variantSelect.disabled = true;
        qtyInput.disabled = true;
        name.className = 'text-sm font-medium text-gray-400';
      }
    })();

    // assemble right side (variant select + qty grouped)
    right.appendChild(priceSpan);
    if (variantSelect) {
      const varWrap = document.createElement('div');
      // add bottom margin on mobile so variant select is separated from qty
      varWrap.className = 'w-full sm:w-auto flex items-center sm:space-x-2 gap-2 mb-2 sm:mb-0';
      varWrap.appendChild(variantSelect); varWrap.appendChild(variantStockSpan);
      right.appendChild(varWrap);
    }
    // ensure qty appears on its own line on mobile and has a label above
    const qtyWrap = document.createElement('div'); qtyWrap.className = 'w-full sm:w-auto';
    const qtyLabel = document.createElement('div'); qtyLabel.className = 'text-xs text-gray-500 mb-1'; qtyLabel.textContent = 'la quantité à commander';
    qtyWrap.appendChild(qtyLabel);
    qtyWrap.appendChild(qtyInput);
    right.appendChild(qtyWrap);
    row.appendChild(left); row.appendChild(right);
    packProductsEl.appendChild(row);

    // events
    chk.addEventListener('change', () => {
      const checked = !!chk.checked;
      qtyInput.disabled = !checked;
      // enable or disable variant select together with the product checkbox
      if (variantSelect) {
        variantSelect.disabled = !checked;
        if (!checked) {
          variantSelect.selectedIndex = 0;
          if (variantStockSpan) variantStockSpan.textContent = '';
          // reset price display to product base price
          priceSpan.textContent = `${computeDiscountedPrice(data.price, data.promo||{type:'none'}).value} DH`;
        }
      }
      // when enabling, make qty editable and focused with a sensible default
      if (checked) {
        if (!qtyInput.value || Number(qtyInput.value) < 1) qtyInput.value = 1;
        try { qtyInput.focus(); } catch (e) {}
      } else {
        // clear qty when unchecking for a clean state
        qtyInput.value = '';
      }
      updatePackTotals().then(() => validatePack());
    });
    qtyInput.addEventListener('input', () => { if (Number(qtyInput.value) < 1) qtyInput.value = 1; updatePackTotals().then(() => validatePack()); });
    if (variantSelect) {
      variantSelect.addEventListener('change', () => {
        const sel = variantSelect.value;
        const found = (data.variants||[]).find(v => String(v.label) === String(sel));
        const vstock = found ? Number(found.stock)||0 : 0;
        variantStockSpan.textContent = sel ? ` ` : '';
        qtyInput.max = vstock || '';
        if (vstock && Number(qtyInput.value) > vstock) qtyInput.value = vstock;
        // update price shown for variant if variant has price
        if (found && found.price != null) priceSpan.textContent = `${computeDiscountedPrice(found.price, data.promo||{type:'none'}).value} DH`;
        else priceSpan.textContent = `${computeDiscountedPrice(data.price, data.promo||{type:'none'}).value} DH`;
        updatePackTotals().then(() => validatePack());
      });
    }
  });

  // populate packCity options
  try {
    packCity.innerHTML = '';
    const defaultOpt = document.createElement('option'); defaultOpt.value = ''; defaultOpt.textContent = 'Sélectionnez une ville'; packCity.appendChild(defaultOpt);
    if (Object.keys(packDpMap).length) {
      Object.keys(packDpMap).forEach(city => {
        const opt = document.createElement('option'); opt.value = city; opt.textContent = ` ${city} :Frais livraison ${packDpMap[city]} DH`; packCity.appendChild(opt);
      });
    } else {
      const staticCities = ['Casablanca','Rabat','Marrakech','Fès','Tangier','Agadir','Meknès','Oujda','Kénitra','Tétouan'];
      staticCities.forEach(city => { const opt = document.createElement('option'); opt.value = city; opt.textContent = city; packCity.appendChild(opt); });
    }
  } catch (e) { /* ignore */ }

  packName.value = ''; packPhone.value = ''; packFeedback.textContent = ''; if (packFeedbackStep2) packFeedbackStep2.textContent = ''; packDeliveryEl.textContent = ''; packTotalEl.textContent = 'Total: 0 DH';
  // show step 1 and hide step 2 initially
  if (packStep1) packStep1.style.display = '';
  if (packStep2) packStep2.style.display = 'none';
  packModal.classList.remove('hidden');
  // ensure button state is computed after modal open
  try { updatePackTotals().then(() => validatePack()); } catch (e) {}
}

function validatePackSelection() {
  // same as validatePack but without contact checks (only selection + per-item qty)
  if (packFeedback) packFeedback.textContent = '';
  const rows = packProductsEl.querySelectorAll(':scope > div');
  let selectedCount = 0;
  for (const row of rows) {
    const chk = row.querySelector('input[type="checkbox"]');
    const qtyIn = row.querySelector('input[type="number"]');
    const pid = chk && chk.dataset && chk.dataset.pid;
    if (chk && chk.checked && pid) {
      selectedCount++;
      const prod = allProducts.find(p => p.id === pid);
      const variantSel = row.querySelector('select');
      const qty = Number(qtyIn && qtyIn.value) || 0;
      if (variantSel && variantSel.value) {
        const found = (prod.data.variants||[]).find(v => String(v.label) === String(variantSel.value));
        const vstock = found ? Number(found.stock) || 0 : 0;
        if (qty <= 0 || qty > vstock) {
          packFeedback.textContent = `Quantité invalide pour ${prod.data.name} variante ${variantSel.value} (disponible: ${vstock}).`;
          return false;
        }
      } else {
        const stock = Number(prod.data.stock) || 0;
        if (qty <= 0 || qty > stock) {
          packFeedback.textContent = `Quantité invalide pour ${prod.data.name} (disponible: ${stock}).`;
          return false;
        }
      }
    }
  }
  if (selectedCount < 2) { packFeedback.textContent = 'Sélectionnez au moins 2 produits.'; return false; }
  return true;
}

async function updatePackTotals() {
  const rows = Array.from(packProductsEl.querySelectorAll(':scope > div'));
  // compute each line in parallel (useful if price lookup becomes async)
  const linePromises = rows.map(row => new Promise((resolve) => {
    try {
      const chk = row.querySelector('input[type="checkbox"]');
      const qtyIn = row.querySelector('input[type="number"]');
      const pid = chk && chk.dataset && chk.dataset.pid;
      if (!(chk && chk.checked && pid)) return resolve(0);
      const prod = allProducts.find(p => p.id === pid);
      if (!prod) return resolve(0);
      const variantSel = row.querySelector('select');
      let unitPrice = computeDiscountedPrice(prod.data.price, prod.data.promo||{type:'none'}).value || 0;
      if (variantSel && variantSel.value) {
        const found = (prod.data.variants||[]).find(v => String(v.label) === String(variantSel.value));
        if (found && found.price != null) unitPrice = computeDiscountedPrice(found.price, prod.data.promo||{type:'none'}).value || unitPrice;
      }
      const qty = Number(qtyIn.value) || 0;
      resolve(unitPrice * qty);
    } catch (e) { resolve(0); }
  }));

  const lineTotals = await Promise.all(linePromises);
  const subtotal = lineTotals.reduce((s, v) => s + v, 0);

  let delivery = 0;
  const city = packCity.value;
  if (city && packDpMap && packDpMap[city] != null) delivery = Number(packDpMap[city]) || 0;
  packDeliveryEl.textContent = delivery ? `Frais livraison: ${delivery} DH` : 'Frais livraison: non défini';
  const total = subtotal + Number(delivery || 0);
  packTotalEl.textContent = `Total: ${total.toFixed(2)} DH`;
  return { subtotal, delivery, total };
}

function validatePack() {
  if (packFeedback) packFeedback.textContent = '';
  const rows = packProductsEl.querySelectorAll(':scope > div');
  let selectedCount = 0;
  for (const row of rows) {
    const chk = row.querySelector('input[type="checkbox"]');
    const qtyIn = row.querySelector('input[type="number"]');
    const pid = chk && chk.dataset && chk.dataset.pid;
    if (chk && chk.checked && pid) {
      selectedCount++;
      const prod = allProducts.find(p => p.id === pid);
      // check variant stock if variant selected
      const variantSel = row.querySelector('select');
      const qty = Number(qtyIn.value) || 0;
      if (variantSel && variantSel.value) {
        const found = (prod.data.variants||[]).find(v => String(v.label) === String(variantSel.value));
        const vstock = found ? Number(found.stock) || 0 : 0;
        if (qty <= 0 || qty > vstock) {
          packFeedback.textContent = `Quantité invalide pour ${prod.data.name} variante ${variantSel.value} (disponible: ${vstock}).`;
          if (packSubmit) packSubmit.disabled = true; return false;
        }
      } else {
        const stock = Number(prod.data.stock) || 0;
        if (qty <= 0 || qty > stock) {
          packFeedback.textContent = `Quantité invalide pour ${prod.data.name} (disponible: ${stock}).`;
          if (packSubmit) packSubmit.disabled = true; return false;
        }
      }
    }
  }
  if (selectedCount < 2) { if (packFeedback) packFeedback.textContent = 'Sélectionnez au moins 2 produits.'; if (packSubmit) packSubmit.disabled = true; return false; }
  // basic contact validation
  // ensure contact inputs exist before using
  if (!packName || !packPhone) {
    if (packSubmit) packSubmit.disabled = true;
    return false;
  }
  if (!packName.value || !packName.value.trim() || !/^0[0-9]{9}$/.test((packPhone.value||'').trim())) { if (packSubmit) packSubmit.disabled = true; return false; }
  if (packSubmit) packSubmit.disabled = false;
  return true;
}

// open/close handlers
if (openPackBtn) openPackBtn.addEventListener('click', openPackModal);
if (packClose) packClose.addEventListener('click', () => packModal.classList.add('hidden'));
if (packCity) packCity.addEventListener('change', () => { updatePackTotals().then(() => validatePack()); });
if (packNext) packNext.addEventListener('click', async () => {
  try { console.log('packNext clicked'); } catch (e) {}
  if (packFeedback) packFeedback.textContent = '';
  const ok = validatePackSelection();
  try { console.log('validatePackSelection ->', ok); } catch (e) {}
  if (!ok) return;
  // compute totals then show step 2
  await updatePackTotals();
  if (packStep1) packStep1.style.display = 'none';
  if (packStep2) packStep2.style.display = '';
  try { if (packName) packName.focus(); } catch (e) {}
  // recompute validation on entering step2
  try { validatePack(); } catch (e) {}
});
if (packBack) packBack.addEventListener('click', () => {
  if (packStep2) packStep2.style.display = 'none';
  if (packStep1) packStep1.style.display = '';
});

// keep packSubmit enabled state in sync when contact fields change
try {
  if (packName) packName.addEventListener('input', () => validatePack());
  if (packPhone) packPhone.addEventListener('input', () => validatePack());
} catch (e) { /* ignore */ }

async function handlePackSubmit(e) {
  try {
    try { console.log('handlePackSubmit called'); } catch (e) {}
    if (packFeedback) packFeedback.textContent = '';
    const valid = validatePack();
    try { console.log('validatePack ->', valid); } catch (e) {}
    if (!valid) return;
    // ensure totals are up-to-date (wait for parallel computations)
    await updatePackTotals();
    const rows = packProductsEl.querySelectorAll(':scope > div');
    const items = [];
    rows.forEach(row => {
      const chk = row.querySelector('input[type="checkbox"]');
      const qtyIn = row.querySelector('input[type="number"]');
      const pid = chk && chk.dataset && chk.dataset.pid;
      if (chk && chk.checked && pid) {
        const prod = allProducts.find(p => p.id === pid);
        const variantSel = row.querySelector('select');
        let price = computeDiscountedPrice(prod.data.price, prod.data.promo||{type:'none'}).value || 0;
        let variantLabel = null;
        if (variantSel && variantSel.value) {
          variantLabel = variantSel.value;
          const found = (prod.data.variants||[]).find(v => String(v.label) === String(variantSel.value));
          if (found && found.price != null) price = computeDiscountedPrice(found.price, prod.data.promo||{type:'none'}).value || price;
        }
        items.push({ productId: pid, name: prod.data.name || '', qty: Number(qtyIn.value)||0, pricePerUnit: price, variant: variantLabel });
      }
    });
    try { console.log('pack items built:', items.length, items); } catch (e) {}
    if (!items.length) { if (packFeedback) packFeedback.textContent = 'Aucun produit sélectionné.'; return; }

    // show loader while performing transaction
    try { showLoader(); } catch (e) { /* ignore */ }

    // Validate stock for each product
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const prod = allProducts.find(p => p.id === it.productId);
      if (!prod) throw new Error(`Produit introuvable: ${it.name}`);
      const p = prod.data;
      if (it.variant) {
        const variants = (p.variants || []);
        const idx = variants.findIndex(x => String(x.label) === String(it.variant));
        if (idx === -1) throw new Error(`Variante introuvable: ${it.variant}`);
        const vstock = Number(variants[idx].stock) || 0;
        if (vstock < it.qty) throw new Error(`Stock insuffisant pour ${it.name} variante ${it.variant}`);
      } else {
        const available = Number(p.stock) || 0;
        if (available < it.qty) throw new Error(`Stock insuffisant pour ${it.name}`);
      }
    }

    // compute totals and create order
    const dp = packDpMap[packCity.value] != null ? Number(packDpMap[packCity.value]) : 0;
    const subtotal = items.reduce((s,it)=> s + (Number(it.pricePerUnit)||0)*it.qty, 0);
    const total = subtotal + Number(dp||0);
    const order = {
      clientName: (packName.value||'').trim(),
      city: packCity.value || '',
      phone: (packPhone.value||'').trim(),
      items,
      deliveryPrice: dp,
      totalPrice: total,
      isPack: true,
      status: 'en attente'
    };
    try { console.log('order to send:', order); } catch (e) {}
    
    // Save order to Firebase
    await saveOrderToFirebase(order);
    
    try { hideLoader(); } catch (e) { /* ignore */ }
    if (packFeedback) packFeedback.textContent = '';
    if (packFeedbackStep2) packFeedbackStep2.textContent = '';
    showResult(true, 'Pack commandé');
    if (packModal) packModal.classList.add('hidden');
  } catch (err) {
    try { hideLoader(); } catch (e) { /* ignore */ }
    console.error('Pack submit error', err);
    if (packFeedback) {
      packFeedback.textContent = 'Erreur: ' + (err.message || String(err));
      showResult(false, packFeedback.textContent);
    } else {
      // fallback: still show result overlay with error
      showResult(false, (err && err.message) ? err.message : 'Erreur lors de la commande');
    }
  }
}

// attach handler or a delegated fallback if the button element is not present
if (packSubmit) {
  try { packSubmit.addEventListener('click', handlePackSubmit); } catch (e) { console.error('Failed to attach packSubmit listener', e); }
} else {
  // delegated click: catches clicks on dynamically-created button or mismatched DOM
  document.addEventListener('click', (ev) => {
    const target = ev.target;
    if (!target) return;
    if (target.id === 'pack-submit' || (target.getAttribute && target.getAttribute('data-action') === 'pack-submit')) {
      handlePackSubmit(ev);
    }
  });
}


// validate quantity vs stock and show red message if invalid
function validateQuantityAndShowMessage() {
  if (!currentProductData) return true;
  const qty = Number(orderQuantity.value) || 0;
  const variantLabel = pmVariant.value;
  let available = Number(currentProductData.stock) || 0;
  if (variantLabel) {
    const variants = currentProductData.variants || [];
    const found = variants.find(v => String(v.label) === String(variantLabel));
    available = found ? Number(found.stock) || 0 : 0;
  }
  // if no variant selected ("Aucune"), do not show inline error here
  if (!variantLabel) {
    if (orderQuantityFeedback) { orderQuantityFeedback.textContent = ''; orderQuantityFeedback.style.color = ''; }
    if (orderFeedback) { orderFeedback.textContent = ''; orderFeedback.style.color = ''; }
    if (orderSubmit) orderSubmit.disabled = false;
    return true;
  }
  if (qty > available) {
    const msg = `Quantité demandée supérieure au stock (disponible: ${available}).`;
    if (orderQuantityFeedback) {
      orderQuantityFeedback.textContent = msg;
      orderQuantityFeedback.style.color = 'red';
    } else if (orderFeedback) {
      orderFeedback.textContent = msg; orderFeedback.style.color = 'red';
    }
    if (orderSubmit) orderSubmit.disabled = true;
    return false;
  }
  // clear inline feedback
  if (orderQuantityFeedback) { orderQuantityFeedback.textContent = ''; orderQuantityFeedback.style.color = ''; }
  if (orderFeedback) { orderFeedback.textContent = ''; orderFeedback.style.color = ''; }
  if (orderSubmit) orderSubmit.disabled = false;
  return true;
}

function getVariantPrice(label) {
  if (!label) return null;
  const variants = currentProductData.variants || [];
  const found = variants.find(v => String(v.label) === String(label));
  if (!found) return null;
  return (found.price != null) ? Number(found.price) : null;
}

function updateDisplayedPrices() {
  if (!currentProductData) return;
  const variantLabel = pmVariant.value;
  const qty = Number(orderQuantity.value) || 1;

  // determine base unit price (variant price priority)
  const vPrice = getVariantPrice(variantLabel);
  const baseUnit = (vPrice != null) ? vPrice : Number(currentProductData.price) || 0;
  // apply promo if exists
  const discounted = computeDiscountedPrice(baseUnit, currentProductData.promo || { type: 'none' });
  const unitToUse = discounted.value;

  // delivery price by city
  let delivery = 0;
  try {
    const dp = currentProductData.deliveryPrices || {};
    const city = orderCity.value;
    if (city && dp && typeof dp === 'object' && dp[city] != null) delivery = Number(dp[city]) || 0;
  } catch (e) { delivery = 0; }

  // update pmPrice (show unit and promo)
  if (discounted.active && discounted.value < baseUnit) {
    pmPrice.innerHTML = `<span class="text-sm line-through text-gray-400 mr-2">${baseUnit} DH</span><span class="text-lg font-bold text-red-600">${discounted.value} DH</span>`;
  } else {
    pmPrice.textContent = `${baseUnit} DH`;
  }

  pmDelivery.textContent = delivery ? `Frais livraison (${orderCity.value || 'ville'}): ${delivery} DH` : 'Frais livraison: non défini';
  const total = (Number(unitToUse) || 0) * qty + Number(delivery || 0);
  pmTotal.textContent = `Total: ${total.toFixed(2)} DH`;
  // update submit button to include total (user-friendly)
  try {
    const totalText = isFinite(total) ? `${total.toFixed(2)} DH` : '—';
    orderSubmit.textContent = `Valider la commande${totalText ? ' — Total: ' + totalText : ''}`;
  } catch (e) { /* ignore */ }
}

// Order submit
orderSubmit.addEventListener('click', async () => {
  orderFeedback.textContent = '';
  const name = orderName.value.trim();
  const city = orderCity.value.trim();
  const phone = orderPhone.value.trim();
  const qty = Number(orderQuantity.value) || 0;
  const variantLabel = pmVariant.value;

  if (!name || !city || !phone) { orderFeedback.textContent = 'Remplissez tous les champs du client.'; showResult(false, 'Remplissez tous les champs.'); return; }
  if (!/^0[0-9]{9}$/.test(phone)) { orderFeedback.textContent = 'Le numéro doit contenir 10 chiffres et commencer par 0.'; showResult(false, 'Numéro invalide.'); return; }
  if (qty <= 0) { orderFeedback.textContent = 'Quantité invalide.'; showResult(false, 'Quantité invalide.'); return; }
  
  if (variantLabel) {
    const variants = (currentProductData.variants || []);
    const found = variants.find(v => String(v.label) === String(variantLabel));
    const vstock = found ? Number(found.stock) || 0 : 0;
    if (qty > vstock) { orderFeedback.textContent = 'Quantité demandée supérieure au stock de la variante.'; showResult(false, 'Stock insuffisant pour la variante.'); return; }
  } else {
    const available = Number(currentProductData.stock) || 0;
    if (qty > available) { orderFeedback.textContent = 'Quantité demandée supérieure au stock disponible.'; showResult(false, 'Stock insuffisant.'); return; }
  }

  try {
    showLoader();
    
    const vPriceSelected = getVariantPrice(variantLabel);
    const baseUnit = (vPriceSelected != null) ? vPriceSelected : Number(currentProductData.price) || 0;
    const discountedUnit = computeDiscountedPrice(baseUnit, currentProductData.promo || { type: 'none' }).value;
    const deliveryPrice = (currentProductData.deliveryPrices && orderCity.value && currentProductData.deliveryPrices[orderCity.value]) ? Number(currentProductData.deliveryPrices[orderCity.value]) : 0;
    const totalPrice = (Number(discountedUnit) || 0) * qty + Number(deliveryPrice || 0);

    const order = {
      clientName: name,
      city,
      phone,
      quantity: qty,
      variant: variantLabel || null,
      productId: currentProductId,
      productName: currentProductData.name || '',
      pricePerUnit: discountedUnit,
      deliveryPrice: deliveryPrice,
      totalPrice: totalPrice,
      status: 'en attente'
    };
    
    // Envoyer la commande à Firebase
    await saveOrderToFirebase(order);
    
    hideLoader();
    orderFeedback.textContent = 'Commande enregistrée.';
    showResult(true, 'Commande enregistrée');
    setTimeout(() => { modal.classList.add('hidden'); }, 1000);
  } catch (err) {
    hideLoader();
    orderFeedback.textContent = 'Erreur: ' + (err.message || err.toString());
    showResult(false, orderFeedback.textContent);
  }
});

function renderProducts(list) {
  productsEl.innerHTML = '';
  list.forEach(({ id, data }) => {
    const card = renderCard(id, data);
    productsEl.appendChild(card);
  });
    // set current year in footer
    try { document.getElementById('year').textContent = new Date().getFullYear(); } catch(e){}
}

// apply client-side filters (search + filter select)
function applyFilters() {
  let q = '';
  try { q = (searchInput && searchInput.value || '').trim().toLowerCase(); } catch(e){}
  const filter = (filterSelect && filterSelect.value) || 'all';

  let list = allProducts.slice();
  if (q) {
    list = list.filter(({ id, data }) => {
      const name = (data.name||'').toString().toLowerCase();
      const desc = (data.description||'').toString().toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }

  if (filter === 'promo') {
    list = list.filter(({ id, data }) => computeDiscountedPrice(data.price, data.promo || { type: 'none' }).active );
  }

  if (filter === 'price_asc' || filter === 'price_desc') {
    list.sort((a,b) => {
      const pa = computeDiscountedPrice(Number(a.data.price)||0, a.data.promo||{type:'none'}).value || 0;
      const pb = computeDiscountedPrice(Number(b.data.price)||0, b.data.promo||{type:'none'}).value || 0;
      return filter === 'price_asc' ? pa - pb : pb - pa;
    });
  }

  renderProducts(list);
}

// wire search and filter events if present
try {
  if (searchInput) searchInput.addEventListener('input', () => applyFilters());
  if (filterSelect) filterSelect.addEventListener('change', () => applyFilters());
} catch(e) { console.warn('Failed to wire filters', e); }

// Load products on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadProductsFromJSON);
} else {
  loadProductsFromJSON();
}

// Reload products every 10 seconds
setInterval(loadProductsFromJSON, 10000);
