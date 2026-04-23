import { useState, useEffect, useRef } from "react";

const C = { black: "#000000", white: "#ffffff", cream: "#e1cbaa", brown: "#231d15", gold: "#dcb253" };

/* ── IMAGES ── */
const IMG = {
  hero: [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&h=900&fit=crop&q=80",
  ],
  women: [
    "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop&q=80",
  ],
  men: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1480429370612-2cd700936ab0?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&q=80",
  ],
  acc: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop&q=80",
  ],
  designers: [
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&q=80",
  ],
  foundation: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop&q=80",
  about: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop&q=80",
  ],
};

/* ── PRODUCTS ── */
const PRODUCTS = [
  { id:1, name:"NYOTA Jacket",price:1250,cat:"women",tag:"new",sizes:["XS","S","M","L","XL"],colors:["Noir","Anthracite"],img:IMG.women[0],mat:{fr:"Gabardine 100% laine, doublure satin",en:"100% wool gabardine, satin lining"},care:{fr:"Nettoyage à sec",en:"Dry clean only"},desc:{fr:"Veste structurée de la collection AW25. Broderies étoilées signature, fermetures par nœuds en satin.",en:"Structured jacket from the AW25 collection. Signature star embroidery, satin bow closures."} },
  { id:2, name:"MELANCHOLIA Coat",price:2800,cat:"women",tag:"excl",sizes:["XS","S","M","L"],colors:["Noir","Brun profond"],img:IMG.women[1],mat:{fr:"Gabardine 100% laine, doublure satin Kuba",en:"100% wool gabardine, Kuba satin lining"},care:{fr:"Nettoyage à sec",en:"Dry clean only"},desc:{fr:"Manteau oversize signature. Col châle surdimensionné, doublure imprimée Kuba.",en:"Signature oversized coat. Oversized shawl collar, Kuba print lining."} },
  { id:3, name:"LUMIÈRE Dress",price:1680,cat:"women",tag:null,sizes:["XS","S","M","L"],colors:["Noir","Ivoire"],img:IMG.women[2],mat:{fr:"Soie et crêpe, finitions dorées",en:"Silk and crepe, gold finishes"},care:{fr:"Nettoyage à sec",en:"Dry clean"},desc:{fr:"Robe longue fluide en soie-crêpe. Découpes architecturales, fermoir doré signature.",en:"Flowing full-length silk-crepe dress. Architectural cutouts, signature gold clasp."} },
  { id:4, name:"AURORE Blouse",price:720,cat:"women",tag:"new",sizes:["XS","S","M","L","XL"],colors:["Noir","Crème"],img:IMG.women[3],mat:{fr:"Soie naturelle, boutons nacre",en:"Natural silk, mother-of-pearl buttons"},care:{fr:"Lavage délicat",en:"Delicate wash"},desc:{fr:"Blouse en soie naturelle. Col mao, manches bouffantes, boutons en nacre véritable.",en:"Natural silk blouse. Mandarin collar, puff sleeves, genuine mother-of-pearl buttons."} },
  { id:5, name:"KONGO Blazer",price:1650,cat:"men",tag:"excl",sizes:["S","M","L","XL"],colors:["Noir","Anthracite"],img:IMG.men[0],mat:{fr:"Laine vierge, doublure soie",en:"Virgin wool, silk lining"},care:{fr:"Nettoyage à sec",en:"Dry clean"},desc:{fr:"Blazer croisé structuré. Boutonnage asymétrique en or brossé, doublure soie imprimée.",en:"Structured double-breasted blazer. Asymmetric brushed gold buttons, printed silk lining."} },
  { id:6, name:"OBSIDIAN Trousers",price:890,cat:"men",tag:null,sizes:["S","M","L","XL"],colors:["Noir"],img:IMG.men[1],mat:{fr:"Laine mélangée, finitions satin",en:"Wool blend, satin finishes"},care:{fr:"Nettoyage à sec",en:"Dry clean"},desc:{fr:"Pantalon coupe droite fluide. Taille haute, plis marqués, finitions satin latérales.",en:"Fluid straight-cut trousers. High waist, pressed pleats, satin side seams."} },
  { id:7, name:"TITAN Overcoat",price:2200,cat:"men",tag:"new",sizes:["S","M","L","XL"],colors:["Noir","Gris charbon"],img:IMG.men[2],mat:{fr:"Cachemire mélangé, col architecturé",en:"Cashmere blend, architectural collar"},care:{fr:"Nettoyage à sec",en:"Dry clean only"},desc:{fr:"Pardessus en cachemire mélangé. Silhouette ample, col architecturé, boutons cachés.",en:"Cashmere blend overcoat. Loose silhouette, architectural collar, hidden buttons."} },
  { id:8, name:"NUIT Shirt",price:580,cat:"men",tag:null,sizes:["S","M","L","XL","XXL"],colors:["Noir","Blanc"],img:IMG.men[3],mat:{fr:"Coton égyptien, col officier",en:"Egyptian cotton, officer collar"},care:{fr:"Lavage 30°",en:"Wash 30°"},desc:{fr:"Chemise en coton égyptien. Col officier, coupe ajustée, broderie GC discrète.",en:"Egyptian cotton shirt. Officer collar, fitted cut, discreet GC embroidery."} },
  { id:9, name:"LUX CAP",price:320,cat:"accessories",tag:"best",sizes:["S/M","M/L"],colors:["Noir"],img:IMG.acc[0],mat:{fr:"Laine premium, broderie or",en:"Premium wool, gold embroidery"},care:{fr:"Nettoyage à sec",en:"Dry clean"},desc:{fr:"Casquette en laine premium avec logo GC brodé en fil d'or.",en:"Premium wool cap with GC logo in gold thread."} },
  { id:10, name:"LUNA Bag",price:1100,cat:"accessories",tag:"new",sizes:["Unique"],colors:["Noir","Brun"],img:IMG.acc[1],mat:{fr:"Cuir pleine fleur, or brossé",en:"Full-grain leather, brushed gold"},care:{fr:"Lait pour cuir",en:"Leather conditioner"},desc:{fr:"Sac bandoulière sculptural. Fermoir logo GC en or brossé.",en:"Sculptural crossbody bag. Brushed gold GC logo clasp."} },
  { id:11, name:"ÉTOILE Ring",price:450,cat:"accessories",tag:"new",sizes:["48","50","52","54","56"],colors:["Or","Argent"],img:IMG.acc[2],mat:{fr:"Argent 925 plaqué or 18 carats",en:"925 silver, 18k gold plated"},care:{fr:"Éviter contact eau",en:"Avoid water contact"},desc:{fr:"Bague signature étoile GC. Design sculptural.",en:"GC signature star ring. Sculptural design."} },
  { id:12, name:"OMBRA Scarf",price:380,cat:"accessories",tag:null,sizes:["Unique"],colors:["Noir/Or","Brun/Crème"],img:IMG.acc[3],mat:{fr:"Cachemire et soie",en:"Cashmere and silk"},care:{fr:"Nettoyage à sec",en:"Dry clean only"},desc:{fr:"Écharpe oversize cachemire-soie. Imprimé Kuba, franges nouées main.",en:"Oversized cashmere-silk scarf. Kuba print, hand-knotted fringes."} },
];

const COUNTRIES = ["France","Belgique","Allemagne","Royaume-Uni","États-Unis","Canada","Maroc","RD Congo","Suisse","Pays-Bas","Italie","Espagne","Japon","Australie"];

const DESIGNERS = [
  { name:"Amara Osei", role:{fr:"Directrice Artistique",en:"Artistic Director"}, bio:{fr:"Née à Accra, formée à l'École de la Chambre Syndicale de la Couture Parisienne. Amara a passé dix ans chez Balenciaga avant de rejoindre la Maison en 2019. Sa vision fusionne les volumes sculpturaux ouest-africains avec la rigueur du tailoring parisien. Elle supervise l'ensemble des collections Femme.",en:"Born in Accra, trained at the École de la Chambre Syndicale de la Couture Parisienne. Amara spent ten years at Balenciaga before joining the House in 2019. Her vision fuses West African sculptural volumes with Parisian tailoring rigor. She oversees all Women's collections."}, img:IMG.designers[1] },
  { name:"Léon Mukendi", role:{fr:"Directeur du Design Homme",en:"Men's Design Director"}, bio:{fr:"Originaire de Lubumbashi, diplômé de La Cambre à Bruxelles. Léon a collaboré avec Dries Van Noten et Ann Demeulemeester avant de devenir le pilier du vestiaire masculin de la Maison. Son approche : une élégance silencieuse, des coupes impeccables, des matières qui parlent d'elles-mêmes.",en:"From Lubumbashi, graduated from La Cambre in Brussels. Léon collaborated with Dries Van Noten and Ann Demeulemeester before becoming the pillar of the House's menswear. His approach: silent elegance, impeccable cuts, materials that speak for themselves."}, img:IMG.designers[0] },
  { name:"Naïma Benali", role:{fr:"Créatrice Accessoires & Bijoux",en:"Accessories & Jewelry Creator"}, bio:{fr:"Née à Marrakech, formée en joaillerie à Anvers. Naïma transforme les symboles ancestraux en pièces contemporaines. Chaque bijou GC est pensé comme une sculpture portable — entre héritage berbère et minimalisme japonais. Elle dirige l'atelier accessoires depuis 2020.",en:"Born in Marrakech, trained in jewelry in Antwerp. Naïma transforms ancestral symbols into contemporary pieces. Each GC jewel is designed as a wearable sculpture — between Berber heritage and Japanese minimalism. She has led the accessories atelier since 2020."}, img:IMG.designers[3] },
  { name:"Théo Kabila", role:{fr:"Directeur Textile & Matières",en:"Textile & Materials Director"}, bio:{fr:"Ingénieur textile de formation (ENSAIT Roubaix), Théo a révolutionné l'approvisionnement de la Maison en tissant des partenariats directs avec des artisans tisserands du Kasaï. Il supervise la chaîne matières, garantissant l'excellence et la traçabilité de chaque fibre utilisée par la Maison.",en:"Trained as a textile engineer (ENSAIT Roubaix), Théo revolutionized the House's sourcing by forging direct partnerships with weaving artisans from Kasai. He oversees the materials chain, ensuring excellence and traceability of every fiber used by the House."}, img:IMG.designers[2] },
];

const FAQ = [
  {q:{fr:"Quels sont les délais de livraison ?",en:"What are the delivery times?"},a:{fr:"Standard : 5-7 jours ouvrés. Express : 2-3 jours. Livraison gratuite dès 500€.",en:"Standard: 5-7 business days. Express: 2-3 days. Free shipping from €500."}},
  {q:{fr:"Quelle est votre politique de retour ?",en:"What is your return policy?"},a:{fr:"14 jours après réception pour retourner un article non porté dans son emballage d'origine.",en:"14 days after receipt to return an unworn item in its original packaging."}},
  {q:{fr:"Comment trouver ma taille ?",en:"How do I find my size?"},a:{fr:"Consultez notre guide des tailles sur chaque fiche produit. En cas de doute, contactez-nous via WhatsApp.",en:"Check our size guide on each product page. If in doubt, contact us via WhatsApp."}},
  {q:{fr:"Proposez-vous des créations sur mesure ?",en:"Do you offer custom creations?"},a:{fr:"Oui, contactez-nous via le formulaire de demande spéciale.",en:"Yes, contact us via the special request form."}},
  {q:{fr:"Quels moyens de paiement acceptez-vous ?",en:"What payment methods do you accept?"},a:{fr:"Carte bancaire (Visa, Mastercard), PayPal, Apple Pay et Google Pay.",en:"Credit card (Visa, Mastercard), PayPal, Apple Pay and Google Pay."}},
];

const CAREERS = [
  { title:{fr:"Designer Textile Senior",en:"Senior Textile Designer"}, type:{fr:"CDI — Lubumbashi",en:"Full-time — Lubumbashi"}, desc:{fr:"Rejoignez notre atelier et participez à la conception des collections. Minimum 5 ans d'expérience en design textile luxe.",en:"Join our atelier and participate in collection design. Minimum 5 years luxury textile design experience."} },
  { title:{fr:"Community Manager",en:"Community Manager"}, type:{fr:"CDI — Paris / Remote",en:"Full-time — Paris / Remote"}, desc:{fr:"Gérez la présence digitale de la Maison sur Instagram, TikTok et LinkedIn. Sensibilité mode et luxe indispensable.",en:"Manage the House's digital presence on Instagram, TikTok and LinkedIn. Fashion and luxury sensitivity essential."} },
  { title:{fr:"Responsable E-commerce",en:"E-commerce Manager"}, type:{fr:"CDI — Paris",en:"Full-time — Paris"}, desc:{fr:"Pilotez la stratégie e-commerce, l'optimisation des conversions et l'expérience client en ligne.",en:"Lead e-commerce strategy, conversion optimization and online customer experience."} },
  { title:{fr:"Stagiaire — Direction Artistique",en:"Intern — Artistic Direction"}, type:{fr:"Stage 6 mois — Lubumbashi",en:"6-month internship — Lubumbashi"}, desc:{fr:"Assistez la Directrice Artistique dans la préparation des collections. Étudiant(e) en mode/design.",en:"Assist the Artistic Director in collection preparation. Fashion/design student."} },
];

/* ── ICONS ── */
const I=({type,s=20,c="currentColor"})=>{
  const d={menu:<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,close:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,search:<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,bag:<><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></>,user:<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,heart:<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,arrow:<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,arrowL:<><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,chevD:<polyline points="6 9 12 15 18 9"/>,check:<polyline points="20 6 9 17 4 12"/>,minus:<line x1="5" y1="12" x2="19" y2="12"/>,plus:<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,trash:<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></>,lock:<><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,truck:<><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,mail:<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,phone:<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.09.6.27 1.2.46 1.79"/>,cc:<><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,pkg:<><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,ig:<><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></>,briefcase:<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>,globe:<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>};
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{d[type]}</svg>;
};

const Logo=({s=40,c=C.black})=>(
  <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
    <path d="M50 5 C25 5 5 25 5 50 C5 75 25 95 50 95" stroke={c} strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M50 5 C75 5 95 25 95 50 C95 75 75 95 50 95" stroke={c} strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M50 25 C38 25 28 35 28 47 C28 59 38 69 50 69" stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M50 25 C62 25 72 35 72 47 C72 59 62 69 50 69" stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <line x1="50" y1="69" x2="50" y2="85" stroke={c} strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
);

/* ── UTILS ── */
const Btn=({children,v="primary",onClick,style:st={},full})=>{const [h,setH]=useState(false);const base={fontFamily:"Raleway",fontSize:11,letterSpacing:2.5,textTransform:"uppercase",padding:"14px 32px",border:"none",cursor:"pointer",transition:"all 0.35s",fontWeight:600,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,width:full?"100%":"auto"};const vs={primary:{background:h?C.gold:C.black,color:C.white},outline:{background:h?C.black:"transparent",color:h?C.white:C.black,border:`1px solid ${C.black}`},gold:{background:h?C.cream:C.gold,color:C.brown},ghost:{background:"transparent",color:h?C.gold:C.black,padding:"8px 0"},white:{background:h?C.cream:C.white,color:C.black}};return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{...base,...vs[v],...st}}>{children}</button>;};
const Inp=({label,...p})=>(<div style={{display:"flex",flexDirection:"column",gap:6}}>{label&&<label style={{fontFamily:"Raleway",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.brown,fontWeight:500}}>{label}</label>}<input {...p} style={{padding:"13px 16px",border:"1px solid rgba(0,0,0,0.15)",fontFamily:"Poppins",fontSize:13,outline:"none",background:C.white,color:C.black,...(p.style||{})}} onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor="rgba(0,0,0,0.15)"}/></div>);
const ST=({label,title,center=true})=>(<div style={{textAlign:center?"center":"left",marginBottom:50}}>{label&&<span style={{fontFamily:"Raleway",fontSize:12,letterSpacing:6,textTransform:"uppercase",color:C.gold,display:"block"}}>{label}</span>}<h2 style={{fontFamily:"Raleway",fontSize:"clamp(26px,3.5vw,42px)",fontWeight:300,color:C.black,marginTop:label?14:0}}>{title}</h2>{center&&<div style={{width:60,height:1,background:C.gold,margin:"18px auto 0"}}/>}</div>);
const PImg=({src,h=400,overlay})=>(<div style={{width:"100%",height:h,backgroundImage:`url(${src})`,backgroundSize:"cover",backgroundPosition:"center",position:"relative",overflow:"hidden",backgroundColor:C.brown}}>{overlay&&<div style={{position:"absolute",inset:0,background:overlay}}/>}</div>);

/* Toast notification */
const Toast=({msg,onClose})=>(
  <div style={{position:"fixed",top:20,right:20,zIndex:9999,background:C.black,color:C.white,padding:"20px 28px",maxWidth:420,boxShadow:"0 20px 60px rgba(0,0,0,0.3)",animation:"slideDown 0.3s ease",fontFamily:"Poppins"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16}}>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><div style={{width:20,height:20,borderRadius:"50%",background:C.gold,display:"flex",alignItems:"center",justifyContent:"center"}}><I type="check" s={12} c={C.white}/></div><span style={{fontFamily:"Raleway",fontSize:11,letterSpacing:2,textTransform:"uppercase",fontWeight:600}}>GENERATION COLLEXTION</span></div>
        <p style={{fontSize:13,lineHeight:1.6,fontWeight:300}}>{msg}</p>
      </div>
      <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:C.white,flexShrink:0}}><I type="close" s={16}/></button>
    </div>
  </div>
);

/* ══════════ MAIN APP ══════════ */
export default function App(){
  const [lang,setLang]=useState("fr");
  const [page,setPage]=useState("home");
  const [pd,setPd]=useState(null);
  const [cart,setCart]=useState([]);
  const [user,setUser]=useState(null);
  const [scrolled,setSc]=useState(false);
  const [activeNav,setAN]=useState(null);
  const [searchOpen,setSO]=useState(false);
  const [toast,setToast]=useState(null);
  const [heroIdx,setHeroIdx]=useState(0);

  useEffect(()=>{const h=()=>setSc(window.scrollY>50);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  useEffect(()=>{window.scrollTo({top:0});setAN(null);setSO(false);},[page]);
  useEffect(()=>{const iv=setInterval(()=>setHeroIdx(p=>(p+1)%IMG.hero.length),5000);return()=>clearInterval(iv);},[]);

  const go=(pg,data=null)=>{setPage(pg);setPd(data);};
  const showToast=(msg)=>{setToast(msg);setTimeout(()=>setToast(null),5000);};
  const addC=(p,sz,q=1)=>{setCart(prev=>{const ex=prev.find(i=>i.id===p.id&&i.size===sz);if(ex)return prev.map(i=>i.id===p.id&&i.size===sz?{...i,qty:i.qty+q}:i);return[...prev,{...p,size:sz,qty:q}];});showToast(lang==="fr"?`${p.name} ajouté au panier`:`${p.name} added to cart`);};
  const rmC=(id,sz)=>setCart(p=>p.filter(i=>!(i.id===id&&i.size===sz)));
  const upQ=(id,sz,q)=>{if(q<1)return rmC(id,sz);setCart(p=>p.map(i=>i.id===id&&i.size===sz?{...i,qty:q}:i));};
  const cTotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const cCount=cart.reduce((s,i)=>s+i.qty,0);
  const tl=(tag)=>tag==="new"?(lang==="fr"?"Nouveau":"New"):tag==="excl"?(lang==="fr"?"Exclusif":"Exclusive"):tag==="best"?"Bestseller":"";

  const t=lang==="fr";
  const navItems=[{k:"women",l:t?"Femme":"Women",sub:t?["Manteaux","Vestes","Robes","Tout voir"]:["Coats","Jackets","Dresses","View all"]},{k:"men",l:t?"Homme":"Men",sub:t?["Manteaux","Vestes","Pantalons","Tout voir"]:["Coats","Jackets","Trousers","View all"]},{k:"accessories",l:t?"Accessoires":"Accessories",sub:t?["Casquettes","Écharpes","Sacs","Bijoux"]:["Caps","Scarves","Bags","Jewelry"]},{k:"collections",l:"Collections",sub:["Autumn Winter 2025","Capsule Nyota","Archives"]},{k:"house",l:t?"La Maison":"The House",sub:t?["Notre histoire","Nos créateurs","Fondation","Carrières"]:["Our story","Our designers","Foundation","Careers"]}];

  const subPageMap={"Notre histoire":"about","Our story":"about","Nos créateurs":"designers","Our designers":"designers","Fondation":"foundation","Foundation":"foundation","Carrières":"careers","Careers":"careers"};

  /* ── NAV ── */
  const Nav=()=>(
    <>
    <div style={{background:C.black,color:C.white,textAlign:"center",padding:"9px 20px",fontFamily:"Raleway",fontSize:10,letterSpacing:3,textTransform:"uppercase",overflow:"hidden"}}>
      <div style={{display:"inline-flex",animation:"marquee 30s linear infinite",whiteSpace:"nowrap"}}>
        {[...(t?["Livraison offerte dès 500€","✦","AW 2025 — Disponible maintenant","✦","Édition limitée"]:["Free shipping from €500","✦","AW 2025 — Available now","✦","Limited edition"]),...(t?["Livraison offerte dès 500€","✦","AW 2025 — Disponible maintenant","✦","Édition limitée"]:["Free shipping from €500","✦","AW 2025 — Available now","✦","Limited edition"])].map((b,i)=><span key={i} style={{marginRight:50,color:b==="✦"?C.gold:C.white}}>{b}</span>)}
      </div>
    </div>
    <nav style={{position:"sticky",top:0,zIndex:1000,background:scrolled?"rgba(255,255,255,0.97)":C.white,backdropFilter:scrolled?"blur(12px)":"none",borderBottom:`1px solid ${scrolled?"rgba(0,0,0,0.06)":"transparent"}`,transition:"all 0.4s"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div style={{display:"flex",alignItems:"center",gap:24,flex:1}}>
          {navItems.slice(0,3).map(n=>(
            <div key={n.k} style={{position:"relative"}} onMouseEnter={()=>setAN(n.k)} onMouseLeave={()=>setAN(null)}>
              <button onClick={()=>go("shop",n.k)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"Raleway",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",color:C.black,padding:"8px 0",fontWeight:activeNav===n.k?600:400,display:"flex",alignItems:"center",gap:3}}>{n.l}<I type="chevD" s={12}/></button>
              {activeNav===n.k&&<div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",background:C.white,border:"1px solid rgba(0,0,0,0.06)",padding:"16px 26px",minWidth:180,boxShadow:"0 20px 60px rgba(0,0,0,0.07)",animation:"slideDown 0.25s ease",zIndex:100}}>
                {n.sub.map((s,j)=><a key={j} href="#" onClick={e=>{e.preventDefault();go("shop",n.k);setAN(null);}} style={{display:"block",fontFamily:"Poppins",fontSize:12.5,color:C.brown,textDecoration:"none",padding:"6px 0",transition:"color 0.2s"}} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.brown}>{s}</a>)}
              </div>}
            </div>
          ))}
        </div>
        <button onClick={()=>go("home")} style={{background:"none",border:"none",cursor:"pointer"}}><Logo s={34} c={C.black}/></button>
        <div style={{display:"flex",alignItems:"center",gap:16,flex:1,justifyContent:"flex-end"}}>
          {navItems.slice(3).map(n=>(
            <div key={n.k} style={{position:"relative"}} onMouseEnter={()=>setAN(n.k)} onMouseLeave={()=>setAN(null)}>
              <button onClick={()=>go(n.k==="house"?"about":"shop")} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"Raleway",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",color:C.black,padding:"8px 0",fontWeight:activeNav===n.k?600:400,display:"flex",alignItems:"center",gap:3}}>{n.l}<I type="chevD" s={12}/></button>
              {activeNav===n.k&&<div style={{position:"absolute",top:"100%",right:0,background:C.white,border:"1px solid rgba(0,0,0,0.06)",padding:"16px 26px",minWidth:190,boxShadow:"0 20px 60px rgba(0,0,0,0.07)",animation:"slideDown 0.25s ease",zIndex:100}}>
                {n.sub.map((s,j)=><a key={j} href="#" onClick={e=>{e.preventDefault();const pg=subPageMap[s];go(pg||"shop");setAN(null);}} style={{display:"block",fontFamily:"Poppins",fontSize:12.5,color:C.brown,textDecoration:"none",padding:"6px 0",transition:"color 0.2s"}} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.brown}>{s}</a>)}
              </div>}
            </div>
          ))}
          <div style={{width:1,height:18,background:"rgba(0,0,0,0.1)"}}/>
          <button onClick={()=>setLang(lang==="fr"?"en":"fr")} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"Raleway",fontSize:10,letterSpacing:1,color:C.brown,fontWeight:600}}>{t?"EN":"FR"}</button>
          <button onClick={()=>setSO(!searchOpen)} style={{background:"none",border:"none",cursor:"pointer",color:C.black}}><I type="search"/></button>
          <button onClick={()=>go(user?"profile":"login")} style={{background:"none",border:"none",cursor:"pointer",color:C.black}}><I type="user"/></button>
          <button onClick={()=>go("cart")} style={{background:"none",border:"none",cursor:"pointer",color:C.black,position:"relative"}}><I type="bag"/>{cCount>0&&<span style={{position:"absolute",top:-5,right:-7,background:C.gold,color:C.white,width:17,height:17,borderRadius:"50%",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{cCount}</span>}</button>
        </div>
      </div>
      {searchOpen&&<div style={{borderTop:"1px solid rgba(0,0,0,0.05)",padding:"14px 32px",maxWidth:1400,margin:"0 auto",animation:"slideDown 0.25s ease"}}><input type="text" placeholder={t?"Rechercher un produit, une collection...":"Search a product, a collection..."} style={{width:"100%",border:"none",borderBottom:`2px solid ${C.black}`,padding:"10px 0",fontSize:15,fontFamily:"Poppins",fontWeight:300,outline:"none",background:"transparent"}} autoFocus/></div>}
    </nav>
    </>
  );

  /* ── FOOTER ── */
  const Foot=()=>{
    const fLinks=t?{help:["Service client","FAQ","Livraison & retours","Guide des tailles"],about:["Notre histoire","Nos créateurs","Fondation","Carrières"],social:["Instagram","Facebook","TikTok","Pinterest"],legal:["Mentions légales","CGV","Confidentialité","Cookies"]}:{help:["Customer service","FAQ","Shipping & returns","Size guide"],about:["Our story","Our designers","Foundation","Careers"],social:["Instagram","Facebook","TikTok","Pinterest"],legal:["Legal notice","Terms","Privacy","Cookies"]};
    const aboutPages=["about","designers","foundation","careers"];
    return(
    <footer style={{background:C.black,padding:"70px 32px 36px",color:C.white}}>
      <div style={{maxWidth:1400,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:36,marginBottom:50}}>
          <div><h4 style={{fontFamily:"Raleway",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,marginBottom:18}}>{t?"Aide":"Help"}</h4>{fLinks.help.map((l,i)=><a key={i} href="#" onClick={e=>{e.preventDefault();go("faq");}} style={{display:"block",fontFamily:"Poppins",fontSize:12,color:"rgba(255,255,255,0.55)",textDecoration:"none",marginBottom:9,transition:"color 0.2s"}} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.55)"}>{l}</a>)}</div>
          <div><h4 style={{fontFamily:"Raleway",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,marginBottom:18}}>{t?"La Maison":"The House"}</h4>{fLinks.about.map((l,i)=><a key={i} href="#" onClick={e=>{e.preventDefault();go(aboutPages[i]);}} style={{display:"block",fontFamily:"Poppins",fontSize:12,color:"rgba(255,255,255,0.55)",textDecoration:"none",marginBottom:9,transition:"color 0.2s"}} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.55)"}>{l}</a>)}</div>
          <div><h4 style={{fontFamily:"Raleway",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,marginBottom:18}}>{t?"Suivez-nous":"Follow us"}</h4>{fLinks.social.map((l,i)=><a key={i} href="#" style={{display:"block",fontFamily:"Poppins",fontSize:12,color:"rgba(255,255,255,0.55)",textDecoration:"none",marginBottom:9}}>{l}</a>)}</div>
          <div><h4 style={{fontFamily:"Raleway",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,marginBottom:18}}>Contact</h4><p style={{fontFamily:"Poppins",fontSize:12,color:"rgba(255,255,255,0.55)",lineHeight:1.8}}>WhatsApp / Mail<br/>contact@generationcollextion.com</p><div style={{display:"flex",gap:10,marginTop:14}}>{["Visa","MC","PayPal","Apple Pay"].map(p=><span key={p} style={{fontFamily:"Raleway",fontSize:8,color:"rgba(255,255,255,0.3)",border:"1px solid rgba(255,255,255,0.12)",padding:"3px 8px",textTransform:"uppercase"}}>{p}</span>)}</div></div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}><Logo s={24} c={C.gold}/><span style={{fontFamily:"Raleway",fontSize:12,fontWeight:700,letterSpacing:3}}>GENERATION COLLEXTION <sup style={{fontSize:7}}>™</sup></span></div>
          <div style={{display:"flex",gap:20}}>{fLinks.legal.map((l,i)=><a key={i} href="#" onClick={e=>{e.preventDefault();go(["legal","cgv","privacy","legal"][i]);}} style={{fontFamily:"Poppins",fontSize:10,color:"rgba(255,255,255,0.3)",textDecoration:"none"}}>{l}</a>)}</div>
        </div>
        <p style={{fontFamily:"Poppins",fontSize:10,color:"rgba(255,255,255,0.18)",textAlign:"center",marginTop:24}}>© 2025 Generation Collextion. {t?"Tous droits réservés.":"All rights reserved."}</p>
      </div>
    </footer>);
  };

  /* ── PRODUCT CARD ── */
  const PC=({p,onV,onA})=>{const [h,setH]=useState(false);return(<div style={{cursor:"pointer"}} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}><div style={{position:"relative",overflow:"hidden"}} onClick={onV}><PImg src={p.img} h={400}/>{p.tag&&<span style={{position:"absolute",top:14,left:14,background:p.tag==="new"?C.gold:p.tag==="excl"?C.brown:C.black,color:C.white,fontFamily:"Raleway",fontSize:8.5,letterSpacing:2,textTransform:"uppercase",padding:"4px 10px",fontWeight:600}}>{tl(p.tag)}</span>}{h&&<div style={{position:"absolute",bottom:0,left:0,right:0,display:"flex",gap:6,padding:10,background:"rgba(255,255,255,0.95)",animation:"slideDown 0.25s ease"}}><button onClick={e=>{e.stopPropagation();onV();}} style={{flex:1,fontFamily:"Raleway",fontSize:9.5,letterSpacing:2,textTransform:"uppercase",padding:"9px",background:C.black,color:C.white,border:"none",cursor:"pointer"}}>{t?"Aperçu rapide":"Quick view"}</button><button onClick={e=>{e.stopPropagation();onA(p.sizes[Math.min(2,p.sizes.length-1)]);}} style={{padding:"9px 12px",background:"transparent",border:`1px solid ${C.black}`,cursor:"pointer"}}><I type="bag" s={16}/></button></div>}</div><div style={{padding:"14px 2px 0"}} onClick={onV}><h4 style={{fontFamily:"Raleway",fontSize:13,fontWeight:600,letterSpacing:1,color:C.black}}>{p.name}</h4><p style={{fontFamily:"Poppins",fontSize:12.5,color:C.brown,marginTop:3,fontWeight:300}}>{p.price.toLocaleString()} €</p></div></div>);};

  /* ══════════ HOME ══════════ */
  const Home=()=>(
    <>
    {/* HERO CAROUSEL */}
    <section style={{position:"relative",height:"92vh",overflow:"hidden"}}>
      {IMG.hero.map((img,i)=><div key={i} style={{position:"absolute",inset:0,backgroundImage:`url(${img})`,backgroundSize:"cover",backgroundPosition:"center",opacity:heroIdx===i?1:0,transition:"opacity 1.5s ease",transform:heroIdx===i?"scale(1)":"scale(1.05)"}}/>)}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.55))"}}/>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:26}}>
        <span style={{fontFamily:"Raleway",fontSize:12,letterSpacing:8,textTransform:"uppercase",color:C.gold,fontWeight:300}}>Autumn Winter 2025</span>
        <h1 style={{fontFamily:"Raleway",fontSize:"clamp(36px,7vw,78px)",fontWeight:200,color:C.white,textAlign:"center",lineHeight:1.1}}>{t?"L'Élégance":"Elegance"}<br/><span style={{fontWeight:700}}>{t?"Redéfinie":"Redefined"}</span></h1>
        <p style={{fontFamily:"Poppins",fontSize:14.5,color:C.cream,fontWeight:300,maxWidth:460,textAlign:"center",lineHeight:1.7,opacity:0.9}}>{t?"Des pièces d'exception nées de la rencontre entre héritage africain et audace contemporaine.":"Exceptional pieces born from the encounter between African heritage and contemporary boldness."}</p>
        <div style={{display:"flex",gap:14,marginTop:8}}>
          <Btn v="outline" onClick={()=>go("shop")} style={{color:C.white,borderColor:C.white}}>{t?"Découvrir la collection":"Discover the collection"}</Btn>
          <Btn v="gold" onClick={()=>go("shop")}>Shop Now</Btn>
        </div>
        {/* Carousel dots */}
        <div style={{display:"flex",gap:10,marginTop:12}}>{IMG.hero.map((_,i)=><button key={i} onClick={()=>setHeroIdx(i)} style={{width:heroIdx===i?24:8,height:8,borderRadius:4,background:heroIdx===i?C.gold:"rgba(255,255,255,0.4)",border:"none",cursor:"pointer",transition:"all 0.4s"}}/>)}</div>
      </div>
      <div style={{position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
        <span style={{fontFamily:"Raleway",fontSize:9,letterSpacing:4,color:C.cream,opacity:0.4,textTransform:"uppercase"}}>Scroll</span>
        <div style={{width:1,height:36,background:`linear-gradient(to bottom,${C.cream},transparent)`,opacity:0.3}}/>
      </div>
    </section>

    {/* COLLECTIONS */}
    <section style={{maxWidth:1400,margin:"0 auto",padding:"90px 32px"}}>
      <ST label={t?"Nouveautés":"New arrivals"} title={t?"Découvrez nos dernières créations":"Discover our latest creations"}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
        {[{name:"NYOTA",sub:t?"L'éclat dans l'obscurité":"Radiance in darkness",img:IMG.women[0]},{name:"TITAN",sub:t?"La force tranquille":"Quiet strength",img:IMG.men[2]},{name:"MELANCHOLIA",sub:t?"L'élégance du silence":"The elegance of silence",img:IMG.women[1]}].map((col,i)=>(
          <div key={i} style={{position:"relative",cursor:"pointer",overflow:"hidden",height:480}} onClick={()=>go("shop")}
            onMouseEnter={e=>{e.currentTarget.querySelector(".ov").style.opacity=1;}} onMouseLeave={e=>{e.currentTarget.querySelector(".ov").style.opacity=0;}}>
            <PImg src={col.img} h={480}/>
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"28px 22px",background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent)",zIndex:2}}>
              <h3 style={{fontFamily:"Raleway",fontSize:20,fontWeight:700,color:C.white,letterSpacing:3}}>{col.name}</h3>
              <p style={{fontFamily:"Poppins",fontSize:11.5,color:C.cream,marginTop:3,fontWeight:300}}>{col.sub}</p>
            </div>
            <div className="ov" style={{position:"absolute",inset:0,background:"rgba(35,29,21,0.75)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity 0.45s ease",zIndex:3}}>
              <span style={{fontFamily:"Raleway",fontSize:11,letterSpacing:3,color:C.gold,textTransform:"uppercase",borderBottom:`1px solid ${C.gold}`,paddingBottom:4}}>{t?"Explorer":"Explore"} →</span>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* MARQUEE */}
    <div style={{background:C.cream,padding:"50px 0",overflow:"hidden"}}><div style={{display:"flex",animation:"marquee 28s linear infinite",whiteSpace:"nowrap"}}>{[...Array(6)].map((_,i)=><span key={i} style={{fontFamily:"Raleway",fontSize:"clamp(40px,6vw,68px)",fontWeight:800,color:C.brown,opacity:0.07,marginRight:55,letterSpacing:8,textTransform:"uppercase"}}>GENERATION COLLEXTION</span>)}</div></div>

    {/* PRODUCTS PREVIEW */}
    <section style={{maxWidth:1400,margin:"0 auto",padding:"90px 32px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:44}}>
        <div><span style={{fontFamily:"Raleway",fontSize:12,letterSpacing:6,textTransform:"uppercase",color:C.gold}}>{t?"Boutique":"Shop"}</span><h2 style={{fontFamily:"Raleway",fontSize:"clamp(26px,3.5vw,42px)",fontWeight:300,color:C.black,marginTop:10}}>{t?"La Sélection":"The Selection"}</h2></div>
        <Btn v="ghost" onClick={()=>go("shop")}>{t?"Voir tout":"View all"} →</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
        {PRODUCTS.slice(0,8).map(p=><PC key={p.id} p={p} onV={()=>go("product",p.id)} onA={s=>addC(p,s)}/>)}
      </div>
    </section>

    {/* CATEGORIES */}
    <section style={{maxWidth:1400,margin:"0 auto",padding:"20px 32px 90px"}}>
      <ST title={<>{t?"Nos catégories : ":"Our categories: "}<span style={{fontWeight:600}}>{t?"Du luxe pensé pour vous":"Luxury designed for you"}</span></>}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
        {[{n:t?"Femme":"Women",img:IMG.women[4],k:"women"},{n:t?"Homme":"Men",img:IMG.men[3],k:"men"},{n:t?"Accessoires":"Accessories",img:IMG.acc[0],k:"accessories"}].map((cat,i)=>(
          <div key={i} onClick={()=>go("shop",cat.k)} style={{position:"relative",overflow:"hidden",cursor:"pointer",height:340}}>
            <PImg src={cat.img} h={340} overlay="linear-gradient(to top,rgba(0,0,0,0.65),rgba(0,0,0,0.15))"/>
            <div style={{position:"absolute",bottom:30,left:30,zIndex:2}}>
              <h3 style={{fontFamily:"Raleway",fontSize:26,fontWeight:700,color:C.white,letterSpacing:4}}>{cat.n}</h3>
              <div style={{marginTop:8,display:"flex",alignItems:"center",gap:6}}><span style={{fontFamily:"Raleway",fontSize:10,letterSpacing:3,color:C.gold,textTransform:"uppercase"}}>{t?"Explorer":"Explore"}</span><I type="arrow" s={16} c={C.gold}/></div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* STORY */}
    <section style={{background:C.brown,padding:"100px 32px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 20% 50%,rgba(220,178,83,0.05) 0%,transparent 60%)"}}/>
      <div style={{maxWidth:840,margin:"0 auto",textAlign:"center",position:"relative"}}>
        <Logo s={44} c={C.gold}/>
        <span style={{display:"block",fontFamily:"Raleway",fontSize:11,letterSpacing:6,textTransform:"uppercase",color:C.gold,marginTop:26,marginBottom:18}}>{t?"La Maison":"The House"}</span>
        <h2 style={{fontFamily:"Raleway",fontSize:"clamp(24px,3.5vw,40px)",fontWeight:200,color:C.white,lineHeight:1.5,marginBottom:20}}>{t?"Une vision née de la passion pour la mode et la culture, portée par l'exigence du luxe contemporain.":"A vision born from a passion for fashion and culture, driven by the standards of contemporary luxury."}</h2>
        <p style={{fontFamily:"Poppins",fontSize:14,color:C.cream,fontWeight:300,lineHeight:1.8,opacity:0.75,maxWidth:620,margin:"0 auto"}}>{t?"GENERATION COLLEXTION est plus qu'une marque — c'est un mouvement. Chaque pièce raconte une histoire, entre héritage et modernité.":"GENERATION COLLEXTION is more than a brand — it's a movement. Each piece tells a story, between heritage and modernity."}</p>
        <div style={{marginTop:36}}><Btn v="ghost" onClick={()=>go("about")} style={{color:C.gold,borderBottom:`1px solid ${C.gold}`,paddingBottom:6}}>{t?"Découvrir notre histoire":"Discover our story"} →</Btn></div>
      </div>
    </section>

    {/* NEWSLETTER */}
    <section style={{background:C.cream,padding:"70px 32px"}}>
      <div style={{maxWidth:560,margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontFamily:"Raleway",fontSize:26,fontWeight:300,color:C.brown}}>{t?"Restez connecté à la Maison":"Stay connected to the House"}</h2>
        <p style={{fontFamily:"Poppins",fontSize:12.5,color:C.brown,opacity:0.7,marginTop:10,fontWeight:300,lineHeight:1.7}}>{t?"Recevez en exclusivité les dernières actualités et les nouvelles collections.":"Receive exclusive updates and new collections."}</p>
        <div style={{display:"flex",gap:0,marginTop:28}}>
          <input type="email" placeholder={t?"Votre adresse e-mail":"Your email address"} style={{flex:1,padding:"14px 18px",border:"1px solid rgba(35,29,21,0.18)",borderRight:"none",fontFamily:"Poppins",fontSize:12.5,fontWeight:300,outline:"none",background:C.white}}/>
          <Btn onClick={()=>showToast(t?"Bienvenue dans l'univers de la Maison ! Vous recevrez prochainement nos actualités exclusives.":"Welcome to the House! You'll soon receive our exclusive updates.")}>{t?"S'inscrire":"Subscribe"}</Btn>
        </div>
      </div>
    </section>
    </>
  );

  /* ══════════ SHOP ══════════ */
  const Shop=()=>{
    const initFilter=pd||"all";
    const [f,setF]=useState(initFilter);
    const fd=f==="all"?PRODUCTS:PRODUCTS.filter(p=>p.cat===f);
    return(<div style={{maxWidth:1400,margin:"0 auto",padding:"60px 32px 100px"}}>
      <ST label={t?"Boutique":"Shop"} title={t?"La Sélection":"The Selection"}/>
      <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:44,flexWrap:"wrap"}}>
        {[["all",t?"Tout":"All"],["women",t?"Femme":"Women"],["men",t?"Homme":"Men"],["accessories",t?"Accessoires":"Accessories"]].map(([k,l])=><Btn key={k} v={f===k?"primary":"outline"} onClick={()=>setF(k)} style={{fontSize:10,padding:"10px 22px"}}>{l}</Btn>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>{fd.map(p=><PC key={p.id} p={p} onV={()=>go("product",p.id)} onA={s=>addC(p,s)}/>)}</div>
    </div>);
  };

  /* ══════════ PRODUCT ══════════ */
  const Prod=()=>{
    const p=PRODUCTS.find(x=>x.id===pd)||PRODUCTS[0];
    const [sz,setSz]=useState(p.sizes[Math.min(2,p.sizes.length-1)]);
    const [cl,setCl]=useState(0);
    const [tab,setTab]=useState("desc");
    const [added,setAdded]=useState(false);
    const doAdd=()=>{addC(p,sz);setAdded(true);setTimeout(()=>setAdded(false),2000);};
    const similar=PRODUCTS.filter(x=>x.id!==p.id&&x.cat===p.cat).slice(0,4);
    if(similar.length<4) similar.push(...PRODUCTS.filter(x=>x.id!==p.id&&!similar.includes(x)).slice(0,4-similar.length));
    return(<div style={{maxWidth:1400,margin:"0 auto",padding:"40px 32px 100px"}}>
      <button onClick={()=>go("shop")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"Poppins",fontSize:12,color:C.brown,marginBottom:30}}><I type="arrowL" s={16}/> {t?"Retour":"Back"}</button>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:50}}>
        <div><PImg src={p.img} h={600}/></div>
        <div style={{paddingTop:20}}>
          {p.tag&&<span style={{fontFamily:"Raleway",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.gold,marginBottom:6,display:"block"}}>{tl(p.tag)}</span>}
          <h1 style={{fontFamily:"Raleway",fontSize:32,fontWeight:600,letterSpacing:2,color:C.black}}>{p.name}</h1>
          <p style={{fontFamily:"Poppins",fontSize:22,color:C.brown,marginTop:8,fontWeight:300}}>{p.price.toLocaleString()} €</p>
          <div style={{marginTop:28}}><span style={{fontFamily:"Raleway",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.black,fontWeight:500}}>{t?"Couleur":"Color"}</span><div style={{display:"flex",gap:8,marginTop:10}}>{p.colors.map((c,i)=><button key={i} onClick={()=>setCl(i)} style={{padding:"8px 16px",border:`1px solid ${cl===i?C.black:"rgba(0,0,0,0.12)"}`,background:cl===i?C.black:"transparent",color:cl===i?C.white:C.black,fontFamily:"Poppins",fontSize:12,cursor:"pointer"}}>{c}</button>)}</div></div>
          <div style={{marginTop:22}}><span style={{fontFamily:"Raleway",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.black,fontWeight:500}}>{t?"Taille":"Size"}</span><div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>{p.sizes.map(s=><button key={s} onClick={()=>setSz(s)} style={{minWidth:44,height:44,padding:"0 10px",border:`1px solid ${sz===s?C.black:"rgba(0,0,0,0.12)"}`,background:sz===s?C.black:"transparent",color:sz===s?C.white:C.black,fontFamily:"Raleway",fontSize:11,cursor:"pointer"}}>{s}</button>)}</div></div>
          <div style={{display:"flex",gap:10,marginTop:30}}><Btn v={added?"gold":"primary"} full onClick={doAdd}>{added?<><I type="check" s={16} c={C.brown}/> ✓</>:(t?"Ajouter au panier":"Add to cart")}</Btn><button style={{padding:"14px 16px",border:`1px solid ${C.black}`,background:"transparent",cursor:"pointer"}}><I type="heart" s={18}/></button></div>
          <div style={{marginTop:36,borderTop:"1px solid rgba(0,0,0,0.08)",paddingTop:24}}>
            <div style={{display:"flex",gap:20,marginBottom:16}}>{[["desc",t?"Description":"Description"],["details",t?"Détails":"Details"],["shipping",t?"Livraison":"Shipping"]].map(([k,l])=><button key={k} onClick={()=>setTab(k)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"Raleway",fontSize:11,letterSpacing:1.5,textTransform:"uppercase",color:tab===k?C.black:"rgba(0,0,0,0.35)",fontWeight:tab===k?600:400,borderBottom:tab===k?`2px solid ${C.gold}`:"2px solid transparent",paddingBottom:6}}>{l}</button>)}</div>
            {tab==="desc"&&<p style={{fontFamily:"Poppins",fontSize:13,color:C.brown,lineHeight:1.8,fontWeight:300}}>{p.desc[lang]}</p>}
            {tab==="details"&&<div style={{fontFamily:"Poppins",fontSize:13,color:C.brown,lineHeight:2,fontWeight:300}}><p><strong>{t?"Matière":"Material"} :</strong> {p.mat[lang]}</p><p><strong>{t?"Entretien":"Care"} :</strong> {p.care[lang]}</p></div>}
            {tab==="shipping"&&<p style={{fontFamily:"Poppins",fontSize:13,color:C.brown,lineHeight:1.8,fontWeight:300}}>{t?"Livraison standard : 5-7 jours. Express : 2-3 jours. Gratuite dès 500€. Retours sous 14 jours.":"Standard: 5-7 days. Express: 2-3 days. Free from €500. Returns within 14 days."}</p>}
          </div>
        </div>
      </div>
      <div style={{marginTop:80}}><ST title={t?"Vous aimerez aussi":"You may also like"}/><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>{similar.map(pr=><PC key={pr.id} p={pr} onV={()=>go("product",pr.id)} onA={s=>addC(pr,s)}/>)}</div></div>
    </div>);
  };

  /* ══════════ CART ══════════ */
  const Cart=()=>(<div style={{maxWidth:1000,margin:"0 auto",padding:"60px 32px 100px"}}>
    <ST title={t?"Votre panier":"Your cart"}/>
    {cart.length===0?<div style={{textAlign:"center",padding:"60px 0"}}><I type="bag" s={48} c="rgba(0,0,0,0.15)"/><p style={{fontFamily:"Poppins",fontSize:15,color:C.brown,marginTop:16,fontWeight:300}}>{t?"Votre panier est vide":"Your cart is empty"}</p><div style={{marginTop:24}}><Btn onClick={()=>go("shop")}>{t?"Continuer les achats":"Continue shopping"}</Btn></div></div>:
    <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:50}}>
      <div>{cart.map(item=><div key={`${item.id}-${item.size}`} style={{display:"flex",gap:20,padding:"24px 0",borderBottom:"1px solid rgba(0,0,0,0.06)"}}><div style={{width:100,height:130,cursor:"pointer"}} onClick={()=>go("product",item.id)}><PImg src={item.img} h={130}/></div><div style={{flex:1}}><h4 style={{fontFamily:"Raleway",fontSize:14,fontWeight:600,letterSpacing:1,cursor:"pointer"}} onClick={()=>go("product",item.id)}>{item.name}</h4><p style={{fontFamily:"Poppins",fontSize:12,color:C.brown,marginTop:4,fontWeight:300}}>{t?"Taille":"Size"}: {item.size}</p><p style={{fontFamily:"Poppins",fontSize:14,color:C.brown,marginTop:8,fontWeight:500}}>{item.price.toLocaleString()} €</p><div style={{display:"flex",alignItems:"center",gap:12,marginTop:12}}><div style={{display:"flex",alignItems:"center",border:"1px solid rgba(0,0,0,0.12)"}}><button onClick={()=>upQ(item.id,item.size,item.qty-1)} style={{width:32,height:32,background:"none",border:"none",cursor:"pointer"}}><I type="minus" s={14}/></button><span style={{width:32,textAlign:"center",fontFamily:"Poppins",fontSize:12}}>{item.qty}</span><button onClick={()=>upQ(item.id,item.size,item.qty+1)} style={{width:32,height:32,background:"none",border:"none",cursor:"pointer"}}><I type="plus" s={14}/></button></div><button onClick={()=>rmC(item.id,item.size)} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(0,0,0,0.35)"}}><I type="trash" s={16}/></button></div></div></div>)}<button onClick={()=>go("shop")} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"Poppins",fontSize:12,color:C.brown,marginTop:20,display:"flex",alignItems:"center",gap:6}}><I type="arrowL" s={14}/> {t?"Continuer les achats":"Continue shopping"}</button></div>
      <div style={{background:"rgba(225,203,170,0.15)",padding:28,height:"fit-content",position:"sticky",top:100}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontFamily:"Poppins",fontSize:13,color:C.brown}}>{t?"Sous-total":"Subtotal"}</span><span style={{fontFamily:"Poppins",fontSize:13,fontWeight:500}}>{cTotal.toLocaleString()} €</span></div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}><span style={{fontFamily:"Poppins",fontSize:13,color:C.brown}}>{t?"Livraison":"Shipping"}</span><span style={{fontFamily:"Poppins",fontSize:12,color:C.brown,opacity:0.6}}>{t?"Calculé à l'étape suivante":"Calculated at next step"}</span></div>
        <div style={{borderTop:"1px solid rgba(0,0,0,0.1)",paddingTop:16,display:"flex",justifyContent:"space-between",marginBottom:24}}><span style={{fontFamily:"Raleway",fontSize:14,fontWeight:600}}>Total</span><span style={{fontFamily:"Raleway",fontSize:18,fontWeight:700}}>{cTotal.toLocaleString()} €</span></div>
        <Btn full onClick={()=>go("checkout")}><I type="lock" s={14} c={C.white}/> {t?"Passer la commande":"Proceed to checkout"}</Btn>
      </div>
    </div>}
  </div>);

  /* ══════════ CHECKOUT ══════════ */
  const Checkout=()=>{
    const [step,setStep]=useState(1);const [info,setInfo]=useState({email:"",fn:"",ln:"",addr:"",city:"",zip:"",country:"France",phone:""});const [ship,setShip]=useState("standard");const [pay,setPay]=useState("card");const [oNum]=useState(`GC-${Date.now().toString(36).toUpperCase()}`);const sCost=ship==="express"?25:(cTotal>=500?0:15);const tot=cTotal+sCost;
    if(cart.length===0&&step<4)return<div style={{maxWidth:700,margin:"0 auto",padding:"100px 32px",textAlign:"center"}}><p style={{fontFamily:"Poppins",fontSize:15,color:C.brown}}>{t?"Panier vide":"Cart empty"}</p><Btn onClick={()=>go("shop")}>{t?"Voir la boutique":"Browse shop"}</Btn></div>;
    const Steps=()=><div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:50,flexWrap:"wrap"}}>{[t?"Informations":"Information",t?"Livraison":"Shipping",t?"Paiement":"Payment","Confirmation"].map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:28,height:28,borderRadius:"50%",background:step>i+1?C.gold:step===i+1?C.black:"transparent",border:`1.5px solid ${step>=i+1?C.black:"rgba(0,0,0,0.15)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{step>i+1?<I type="check" s={14} c={C.white}/>:<span style={{fontFamily:"Raleway",fontSize:10,color:step===i+1?C.white:"rgba(0,0,0,0.3)"}}>{i+1}</span>}</div><span style={{fontFamily:"Raleway",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:step>=i+1?C.black:"rgba(0,0,0,0.3)",fontWeight:step===i+1?600:400}}>{s}</span>{i<3&&<div style={{width:20,height:1,background:step>i+1?C.gold:"rgba(0,0,0,0.1)"}}/>}</div>)}</div>;
    const Sum=()=><div style={{background:"rgba(225,203,170,0.12)",padding:24,height:"fit-content",position:"sticky",top:100}}><h3 style={{fontFamily:"Raleway",fontSize:13,fontWeight:600,letterSpacing:2,marginBottom:18}}>{t?"Résumé":"Summary"}</h3>{cart.map(item=><div key={`${item.id}-${item.size}`} style={{display:"flex",gap:10,marginBottom:12}}><div style={{width:50,height:60}}><PImg src={item.img} h={60}/></div><div style={{flex:1}}><p style={{fontFamily:"Raleway",fontSize:11,fontWeight:600}}>{item.name}</p><p style={{fontFamily:"Poppins",fontSize:10,color:C.brown,opacity:0.6}}>{item.size} × {item.qty}</p></div><span style={{fontFamily:"Poppins",fontSize:12,fontWeight:500}}>{(item.price*item.qty).toLocaleString()} €</span></div>)}<div style={{borderTop:"1px solid rgba(0,0,0,0.08)",paddingTop:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontFamily:"Poppins",fontSize:12,color:C.brown}}>{t?"Sous-total":"Subtotal"}</span><span style={{fontFamily:"Poppins",fontSize:12}}>{cTotal.toLocaleString()} €</span></div><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><span style={{fontFamily:"Poppins",fontSize:12,color:C.brown}}>{t?"Livraison":"Shipping"}</span><span style={{fontFamily:"Poppins",fontSize:12}}>{sCost===0?(t?"Gratuit":"Free"):`${sCost} €`}</span></div><div style={{borderTop:"1px solid rgba(0,0,0,0.08)",paddingTop:10,display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"Raleway",fontSize:14,fontWeight:700}}>Total</span><span style={{fontFamily:"Raleway",fontSize:18,fontWeight:700}}>{tot.toLocaleString()} €</span></div></div></div>;
    return(<div style={{maxWidth:1100,margin:"0 auto",padding:"50px 32px 100px"}}><ST title={t?"Commande":"Checkout"}/><Steps/>
      {step===4?<div style={{textAlign:"center",padding:"40px 0"}}><div style={{width:64,height:64,borderRadius:"50%",background:C.gold,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}><I type="check" s={32} c={C.white}/></div><h2 style={{fontFamily:"Raleway",fontSize:28,fontWeight:600}}>{t?"Commande confirmée !":"Order confirmed!"}</h2><p style={{fontFamily:"Poppins",fontSize:14,color:C.brown,marginTop:10,fontWeight:300}}>{t?"Merci pour votre achat. Un e-mail de confirmation vous a été envoyé.":"Thank you for your purchase. A confirmation email has been sent."}</p><p style={{fontFamily:"Raleway",fontSize:13,letterSpacing:2,color:C.gold,marginTop:16}}>{t?"Nº de commande":"Order no."}: {oNum}</p><div style={{marginTop:30}}><Btn onClick={()=>{setCart([]);go("home");}}>{t?"Retour à l'accueil":"Back to home"}</Btn></div></div>:
      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:40}}>
        <div>
          {step===1&&<div style={{display:"flex",flexDirection:"column",gap:16}}><Inp label={t?"E-mail":"Email"} type="email" value={info.email} onChange={e=>setInfo({...info,email:e.target.value})}/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><Inp label={t?"Prénom":"First name"} value={info.fn} onChange={e=>setInfo({...info,fn:e.target.value})}/><Inp label={t?"Nom":"Last name"} value={info.ln} onChange={e=>setInfo({...info,ln:e.target.value})}/></div><Inp label={t?"Adresse":"Address"} value={info.addr} onChange={e=>setInfo({...info,addr:e.target.value})}/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><Inp label={t?"Ville":"City"} value={info.city} onChange={e=>setInfo({...info,city:e.target.value})}/><Inp label={t?"Code postal":"Postal code"} value={info.zip} onChange={e=>setInfo({...info,zip:e.target.value})}/></div><div style={{display:"flex",flexDirection:"column",gap:6}}><label style={{fontFamily:"Raleway",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.brown,fontWeight:500}}>{t?"Pays":"Country"}</label><select value={info.country} onChange={e=>setInfo({...info,country:e.target.value})} style={{padding:"13px 16px",border:"1px solid rgba(0,0,0,0.15)",fontFamily:"Poppins",fontSize:13,outline:"none",background:C.white}}>{COUNTRIES.map(c=><option key={c}>{c}</option>)}</select></div><Inp label={t?"Téléphone":"Phone"} type="tel" value={info.phone} onChange={e=>setInfo({...info,phone:e.target.value})}/><Btn full onClick={()=>setStep(2)}>{t?"Continuer vers livraison":"Continue to shipping"} <I type="arrow" s={14} c={C.white}/></Btn></div>}
          {step===2&&<div style={{display:"flex",flexDirection:"column",gap:12}}>{[["standard",t?"Standard (5-7 jours)":"Standard (5-7 days)",cTotal>=500?(t?"Gratuit":"Free"):"15 €"],["express",t?"Express (2-3 jours)":"Express (2-3 days)","25 €"]].map(([k,label,price])=><div key={k} onClick={()=>setShip(k)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 20px",border:`1.5px solid ${ship===k?C.gold:"rgba(0,0,0,0.1)"}`,cursor:"pointer"}}><div style={{display:"flex",alignItems:"center",gap:14}}><div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${ship===k?C.gold:"rgba(0,0,0,0.2)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{ship===k&&<div style={{width:8,height:8,borderRadius:"50%",background:C.gold}}/>}</div><span style={{fontFamily:"Raleway",fontSize:13,fontWeight:500}}>{label}</span></div><span style={{fontFamily:"Poppins",fontSize:13,fontWeight:500,color:price.includes("Gratuit")||price.includes("Free")?C.gold:C.black}}>{price}</span></div>)}<div style={{display:"flex",gap:12,marginTop:16}}><Btn v="outline" onClick={()=>setStep(1)}><I type="arrowL" s={14}/></Btn><Btn full onClick={()=>setStep(3)}>{t?"Continuer vers paiement":"Continue to payment"} <I type="arrow" s={14} c={C.white}/></Btn></div></div>}
          {step===3&&<div style={{display:"flex",flexDirection:"column",gap:14}}>{[["card",t?"Carte bancaire":"Credit card","cc"],["paypal","PayPal","pkg"],["applepay","Apple Pay / Google Pay","phone"]].map(([k,label,icon])=><div key={k} onClick={()=>setPay(k)} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 20px",border:`1.5px solid ${pay===k?C.gold:"rgba(0,0,0,0.1)"}`,cursor:"pointer"}}><div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${pay===k?C.gold:"rgba(0,0,0,0.2)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{pay===k&&<div style={{width:8,height:8,borderRadius:"50%",background:C.gold}}/>}</div><I type={icon} s={18} c={C.brown}/><span style={{fontFamily:"Raleway",fontSize:13,fontWeight:500}}>{label}</span></div>)}{pay==="card"&&<div style={{marginTop:8,display:"flex",flexDirection:"column",gap:14,padding:20,background:"rgba(225,203,170,0.08)",border:"1px solid rgba(0,0,0,0.06)"}}><Inp label={t?"Nom sur la carte":"Name on card"}/><Inp label={t?"Numéro de carte":"Card number"} placeholder="4242 4242 4242 4242"/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><Inp label="MM/AA" placeholder="12/28"/><Inp label="CVV" placeholder="123"/></div></div>}<div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}><I type="lock" s={14} c={C.gold}/><span style={{fontFamily:"Poppins",fontSize:11,color:"rgba(0,0,0,0.4)"}}>{t?"Paiement sécurisé et chiffré":"Secure encrypted payment"}</span></div><div style={{display:"flex",gap:12,marginTop:12}}><Btn v="outline" onClick={()=>setStep(2)}><I type="arrowL" s={14}/></Btn><Btn v="gold" full onClick={()=>{setStep(4);showToast(t?`Commande ${oNum} confirmée ! Un e-mail de confirmation a été envoyé à ${info.email||"votre adresse"}.`:`Order ${oNum} confirmed! A confirmation email has been sent to ${info.email||"your address"}.`);}}><I type="lock" s={14} c={C.brown}/> {t?"Confirmer la commande":"Place order"}</Btn></div></div>}
        </div><Sum/>
      </div>}
    </div>);
  };

  /* ══════════ AUTH ══════════ */
  const Login=()=>{const [m,setM]=useState("login");return<div style={{maxWidth:440,margin:"0 auto",padding:"80px 32px 120px"}}><div style={{textAlign:"center",marginBottom:40}}><Logo s={44} c={C.black}/><h2 style={{fontFamily:"Raleway",fontSize:26,fontWeight:400,marginTop:16}}>{m==="login"?(t?"Connexion":"Sign in"):(t?"Créer un compte":"Create account")}</h2></div><div style={{display:"flex",flexDirection:"column",gap:16}}>{m==="register"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}><Inp label={t?"Prénom":"First name"}/><Inp label={t?"Nom":"Last name"}/></div>}<Inp label="E-mail" type="email"/><Inp label={t?"Mot de passe":"Password"} type="password"/>{m==="register"&&<Inp label={t?"Confirmer":"Confirm"} type="password"/>}<Btn full onClick={()=>{setUser({name:"Client"});go("profile");showToast(t?"Bienvenue ! Votre compte a été créé avec succès. Un e-mail de confirmation vous a été envoyé.":"Welcome! Your account has been created successfully. A confirmation email has been sent.");}}>{m==="login"?(t?"Se connecter":"Sign in"):(t?"S'inscrire":"Sign up")}</Btn><p style={{textAlign:"center",fontFamily:"Poppins",fontSize:12,color:C.brown}}>{m==="login"?(t?"Pas encore de compte ?":"No account?"):(t?"Déjà un compte ?":"Already have an account?")}{" "}<button onClick={()=>setM(m==="login"?"register":"login")} style={{background:"none",border:"none",cursor:"pointer",color:C.gold,fontFamily:"Poppins",fontSize:12,fontWeight:600,textDecoration:"underline"}}>{m==="login"?(t?"S'inscrire":"Sign up"):(t?"Se connecter":"Sign in")}</button></p></div></div>;};

  const Profile=()=><div style={{maxWidth:700,margin:"0 auto",padding:"60px 32px 100px"}}><ST title={`${t?"Bienvenue":"Welcome"}, ${user?.name||"Client"}`}/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:20}}>{[[t?"Mon profil":"My profile","user",()=>{}],[t?"Mes commandes":"My orders","pkg",()=>{}],[t?"Continuer les achats":"Continue shopping","bag",()=>go("shop")],[t?"Déconnexion":"Sign out","arrowL",()=>{setUser(null);go("home");}]].map(([l,ic,a],i)=><div key={i} onClick={a} style={{padding:28,border:"1px solid rgba(0,0,0,0.08)",cursor:"pointer",display:"flex",alignItems:"center",gap:16,transition:"border-color 0.3s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(0,0,0,0.08)"}><I type={ic} s={22} c={C.gold}/><span style={{fontFamily:"Raleway",fontSize:13,fontWeight:500,letterSpacing:1}}>{l}</span></div>)}</div></div>;

  /* ══════════ INSTITUTIONAL PAGES ══════════ */
  const About=()=><div>
    <div style={{position:"relative",height:400}}><PImg src={IMG.about[0]} h={400} overlay="linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(35,29,21,0.8))"/><div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16}}><Logo s={50} c={C.gold}/><h1 style={{fontFamily:"Raleway",fontSize:"clamp(28px,5vw,50px)",fontWeight:200,color:C.white}}>{t?"Notre Histoire":"Our Story"}</h1></div></div>
    <div style={{maxWidth:750,margin:"0 auto",padding:"70px 32px 100px"}}>
      {(t?[
        "GENERATION COLLEXTION naît en 2017 de la vision d'Axel, passionné de mode et de culture. Loin des sentiers battus, la Maison s'est construite sur une conviction : le luxe peut naître partout, et particulièrement là où la richesse culturelle est la plus dense. Chaque pièce est conçue comme un manifeste — structurée, audacieuse, intemporelle.",
        "La Maison puise dans la richesse des textiles Kuba, la puissance des silhouettes architecturales et l'élégance des matières nobles pour créer un vocabulaire vestimentaire unique. Le dialogue entre Lubumbashi et Paris, entre savoir-faire ancestral et techniques contemporaines, est au cœur de chaque collection.",
        "Autodidacte devenu créateur, Axel a bâti la Maison pièce par pièce, avec la rigueur d'un artisan et l'ambition d'un visionnaire. Aujourd'hui, GENERATION COLLEXTION s'impose comme une voix singulière dans le paysage du luxe — un pont entre héritage et avant-garde, entre l'Afrique et le monde."
      ]:[
        "GENERATION COLLEXTION was born in 2017 from the vision of Axel, a passionate fashion and culture enthusiast. Off the beaten path, the House was built on a conviction: luxury can be born anywhere, especially where cultural richness is at its densest. Each piece is designed as a manifesto — structured, bold, timeless.",
        "The House draws from the richness of Kuba textiles, the power of architectural silhouettes and the elegance of noble materials to create a unique sartorial vocabulary. The dialogue between Lubumbashi and Paris, between ancestral craftsmanship and contemporary techniques, is at the heart of every collection.",
        "Self-taught turned creator, Axel built the House piece by piece, with the rigor of a craftsman and the ambition of a visionary. Today, GENERATION COLLEXTION stands as a singular voice in the luxury landscape — a bridge between heritage and avant-garde, between Africa and the world."
      ]).map((p,i)=><p key={i} style={{fontFamily:"Poppins",fontSize:15,color:C.brown,lineHeight:1.9,fontWeight:300,marginBottom:24,textAlign:"justify"}}>{p}</p>)}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:40}}><PImg src={IMG.about[0]} h={300}/><PImg src={IMG.about[1]} h={300}/></div>
    </div>
  </div>;

  const Designers=()=><div style={{maxWidth:1200,margin:"0 auto",padding:"60px 32px 100px"}}>
    <ST label={t?"L'équipe créative":"The creative team"} title={t?"Nos Créateurs":"Our Designers"}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:40,marginTop:20}}>
      {DESIGNERS.map((d,i)=><div key={i} style={{display:"flex",gap:28}}>
        <div style={{width:200,flexShrink:0}}><PImg src={d.img} h={260}/></div>
        <div>
          <h3 style={{fontFamily:"Raleway",fontSize:20,fontWeight:700,letterSpacing:1,color:C.black}}>{d.name}</h3>
          <p style={{fontFamily:"Raleway",fontSize:11,letterSpacing:2,textTransform:"uppercase",color:C.gold,marginTop:4,fontWeight:500}}>{d.role[lang]}</p>
          <p style={{fontFamily:"Poppins",fontSize:13,color:C.brown,lineHeight:1.8,fontWeight:300,marginTop:14,textAlign:"justify"}}>{d.bio[lang]}</p>
          <div style={{display:"flex",gap:12,marginTop:16}}>
            {["Instagram","LinkedIn"].map(s=><a key={s} href="#" style={{fontFamily:"Raleway",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.gold,textDecoration:"none",borderBottom:`1px solid ${C.gold}`,paddingBottom:2}}>{s}</a>)}
          </div>
        </div>
      </div>)}
    </div>
  </div>;

  const Foundation=()=><div>
    <div style={{position:"relative",height:380}}><PImg src={IMG.foundation} h={380} overlay="linear-gradient(to bottom,rgba(0,0,0,0.2),rgba(35,29,21,0.85))"/><div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:12}}><h1 style={{fontFamily:"Raleway",fontSize:"clamp(26px,4vw,46px)",fontWeight:200,color:C.white}}>Fondation <span style={{fontWeight:700,color:C.gold}}>Bana RDC</span></h1><p style={{fontFamily:"Poppins",fontSize:14,color:C.cream,fontWeight:300,opacity:0.9}}>{t?"Bana — \"Enfants\" en lingala":"Bana — \"Children\" in Lingala"}</p></div></div>
    <div style={{maxWidth:750,margin:"0 auto",padding:"70px 32px 100px"}}>
      {(t?[
        "La Fondation Bana RDC est née d'une conviction profonde : le luxe n'a de sens que s'il contribue à élever ceux qui en ont le plus besoin. Créée par GENERATION COLLEXTION, cette association caritative œuvre pour l'éducation et la santé des enfants en République Démocratique du Congo.",
        "Chaque pièce vendue par la Maison contribue directement au financement de programmes éducatifs — construction d'écoles, fournitures scolaires, bourses d'études — et de projets de santé — accès aux soins primaires, campagnes de vaccination, nutrition infantile — dans les communautés les plus vulnérables du pays.",
        "Pour nous, la mode est un vecteur de changement. En portant GENERATION COLLEXTION, vous ne portez pas seulement un vêtement — vous participez à construire un avenir meilleur pour les enfants du Congo. C'est cette conviction qui guide chaque décision de la Maison : l'excellence au service de l'impact.",
        "La Fondation Bana RDC intervient principalement dans les provinces du Haut-Katanga et du Lualaba, avec l'ambition de s'étendre progressivement à l'ensemble du territoire national. Parce que chaque enfant mérite une chance."
      ]:[
        "The Bana RDC Foundation was born from a deep conviction: luxury only has meaning if it helps elevate those who need it most. Created by GENERATION COLLEXTION, this charitable association works for the education and health of children in the Democratic Republic of Congo.",
        "Each piece sold by the House directly contributes to funding educational programs — school construction, supplies, scholarships — and health projects — access to primary care, vaccination campaigns, child nutrition — in the country's most vulnerable communities.",
        "For us, fashion is a vehicle for change. When you wear GENERATION COLLEXTION, you don't just wear a garment — you help build a better future for the children of Congo. This conviction guides every decision of the House: excellence in service of impact.",
        "The Bana RDC Foundation primarily operates in the Haut-Katanga and Lualaba provinces, with the ambition to gradually expand across the entire national territory. Because every child deserves a chance."
      ]).map((p,i)=><p key={i} style={{fontFamily:"Poppins",fontSize:15,color:C.brown,lineHeight:1.9,fontWeight:300,marginBottom:24,textAlign:"justify"}}>{p}</p>)}
      <div style={{background:C.cream,padding:32,marginTop:20,textAlign:"center"}}>
        <h3 style={{fontFamily:"Raleway",fontSize:18,fontWeight:600,color:C.brown}}>{t?"Comment contribuer ?":"How to contribute?"}</h3>
        <p style={{fontFamily:"Poppins",fontSize:13,color:C.brown,opacity:0.7,marginTop:10,fontWeight:300,lineHeight:1.7}}>{t?"5% de chaque vente sont reversés à la Fondation. Vous pouvez également faire un don direct ou devenir partenaire.":"5% of every sale is donated to the Foundation. You can also make a direct donation or become a partner."}</p>
        <div style={{marginTop:20}}><Btn onClick={()=>go("contact")}>{t?"Nous contacter":"Contact us"}</Btn></div>
      </div>
    </div>
  </div>;

  const Careers=()=><div style={{maxWidth:900,margin:"0 auto",padding:"60px 32px 100px"}}>
    <ST label={t?"Rejoignez-nous":"Join us"} title={t?"Carrières":"Careers"}/>
    <p style={{fontFamily:"Poppins",fontSize:15,color:C.brown,textAlign:"center",marginBottom:50,fontWeight:300,marginTop:-30,maxWidth:600,margin:"-30px auto 50px",lineHeight:1.7}}>{t?"La Maison cherche des talents passionnés qui partagent notre vision : l'excellence, l'audace et l'engagement culturel.":"The House is looking for passionate talents who share our vision: excellence, boldness and cultural commitment."}</p>
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {CAREERS.map((c,i)=><div key={i} style={{padding:"28px 32px",border:"1px solid rgba(0,0,0,0.08)",transition:"border-color 0.3s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(0,0,0,0.08)"}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16}}>
          <div>
            <h3 style={{fontFamily:"Raleway",fontSize:18,fontWeight:600,letterSpacing:1,color:C.black}}>{c.title[lang]}</h3>
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
              <I type="briefcase" s={14} c={C.gold}/>
              <span style={{fontFamily:"Poppins",fontSize:12,color:C.gold,fontWeight:500}}>{c.type[lang]}</span>
            </div>
            <p style={{fontFamily:"Poppins",fontSize:13,color:C.brown,lineHeight:1.7,fontWeight:300,marginTop:12}}>{c.desc[lang]}</p>
          </div>
          <Btn v="outline" onClick={()=>{go("contact");showToast(t?`Candidature pour "${c.title[lang]}" — envoyez votre CV et lettre de motivation via le formulaire de contact.`:`Application for "${c.title[lang]}" — send your CV and cover letter via the contact form.`);}} style={{flexShrink:0}}>{t?"Postuler":"Apply"}</Btn>
        </div>
      </div>)}
    </div>
  </div>;

  /* ══════════ STATIC PAGES ══════════ */
  const FaqPage=()=>{const [o,setO]=useState(null);return<div style={{maxWidth:750,margin:"0 auto",padding:"60px 32px 100px"}}><ST title={t?"Questions fréquentes":"Frequently asked questions"}/>{FAQ.map((f,i)=><div key={i} style={{borderBottom:"1px solid rgba(0,0,0,0.06)"}}><button onClick={()=>setO(o===i?null:i)} style={{width:"100%",padding:"20px 0",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:"Raleway",fontSize:14,fontWeight:500,textAlign:"left"}}>{f.q[lang]}</span><I type={o===i?"minus":"plus"} s={18} c={C.gold}/></button>{o===i&&<p style={{fontFamily:"Poppins",fontSize:13,color:C.brown,lineHeight:1.8,fontWeight:300,paddingBottom:20}}>{f.a[lang]}</p>}</div>)}</div>;};

  const Contact=()=><div style={{maxWidth:600,margin:"0 auto",padding:"60px 32px 100px"}}><ST title={t?"Contactez-nous":"Contact us"}/><p style={{fontFamily:"Poppins",fontSize:14,color:C.brown,textAlign:"center",marginBottom:36,fontWeight:300,marginTop:-30}}>{t?"Notre équipe est à votre disposition.":"Our team is at your service."}</p><div style={{display:"flex",justifyContent:"center",gap:32,marginBottom:40}}>{[["mail","contact@generationcollextion.com"],["phone","WhatsApp"]].map(([ic,l])=><div key={ic} style={{display:"flex",alignItems:"center",gap:10}}><I type={ic} s={18} c={C.gold}/><span style={{fontFamily:"Poppins",fontSize:13,color:C.brown}}>{l}</span></div>)}</div><div style={{display:"flex",flexDirection:"column",gap:16}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}><Inp label={t?"Prénom":"First name"}/><Inp label={t?"Nom":"Last name"}/></div><Inp label="E-mail" type="email"/><div style={{display:"flex",flexDirection:"column",gap:6}}><label style={{fontFamily:"Raleway",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.brown,fontWeight:500}}>Message</label><textarea rows={5} style={{padding:"13px 16px",border:"1px solid rgba(0,0,0,0.15)",fontFamily:"Poppins",fontSize:13,outline:"none",background:C.white,resize:"vertical"}}/></div><Btn full onClick={()=>showToast(t?"Message envoyé avec succès ! Notre équipe vous répondra dans les plus brefs délais.":"Message sent successfully! Our team will respond as soon as possible.")}>{t?"Envoyer":"Send"}</Btn></div></div>;

  const Legal=({title,content})=><div style={{maxWidth:750,margin:"0 auto",padding:"60px 32px 100px"}}><ST title={title}/><div style={{fontFamily:"Poppins",fontSize:13.5,color:C.brown,lineHeight:1.9,fontWeight:300}}>{content.map((p,i)=><p key={i} style={{marginBottom:18,textAlign:"justify"}}>{p}</p>)}</div></div>;

  const lc={
    legal:t?["GENERATION COLLEXTION ™ est une marque déposée. Éditeur : Generation Collextion SAS.","Siège social : [À compléter]. RCS : [À compléter]. Directeur de la publication : Axel.","Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression. Contact : contact@generationcollextion.com."]:["GENERATION COLLEXTION ™ is a registered trademark. Publisher: Generation Collextion SAS.","Registered office: [TBC]. Publication director: Axel.","Under GDPR, you have the right to access, rectify and delete your data. Contact: contact@generationcollextion.com."],
    cgv:t?["Les présentes CGV régissent les transactions sur generationcollextion.com.","PRODUITS : décrits avec exactitude. Photos non contractuelles.","PRIX : en euros TTC. Modifiables à tout moment.","COMMANDE : vaut acceptation des CGV. Confirmation par e-mail.","LIVRAISON : Standard 5-7 jours, Express 2-3 jours. Gratuite dès 500€. Mondiale.","RETOURS : 14 jours, article non porté, emballage d'origine.","PAIEMENT : CB (Visa, MC), PayPal, Apple Pay, Google Pay. Sécurisé."]:["These T&Cs govern transactions on generationcollextion.com.","PRODUCTS: described accurately. Photos not contractual.","PRICES: in euros incl. VAT. Subject to change.","ORDERS: constitute acceptance of T&Cs. Email confirmation.","SHIPPING: Standard 5-7 days, Express 2-3 days. Free from €500. Worldwide.","RETURNS: 14 days, unworn, original packaging.","PAYMENT: Credit card (Visa, MC), PayPal, Apple Pay, Google Pay. Secure."],
    privacy:t?["GENERATION COLLEXTION protège vos données conformément au RGPD.","DONNÉES : nom, e-mail, adresse, téléphone, commandes, navigation.","FINALITÉS : commandes, livraison, service client, newsletter.","CONSERVATION : max 3 ans après dernier achat.","DROITS : accès, rectification, suppression. Contact : contact@generationcollextion.com."]:["GENERATION COLLEXTION protects your data under GDPR.","DATA: name, email, address, phone, orders, browsing.","PURPOSES: orders, delivery, customer service, newsletter.","RETENTION: max 3 years after last purchase.","RIGHTS: access, rectification, deletion. Contact: contact@generationcollextion.com."],
  };

  /* ══════════ RENDER ══════════ */
  const pages={home:<Home/>,shop:<Shop/>,product:<Prod/>,cart:<Cart/>,checkout:<Checkout/>,login:<Login/>,profile:<Profile/>,about:<About/>,designers:<Designers/>,foundation:<Foundation/>,careers:<Careers/>,faq:<FaqPage/>,contact:<Contact/>,legal:<Legal title={t?"Mentions légales":"Legal notice"} content={lc.legal}/>,cgv:<Legal title={t?"CGV":"Terms"} content={lc.cgv}/>,privacy:<Legal title={t?"Confidentialité":"Privacy"} content={lc.privacy}/>};

  return(
    <div style={{minHeight:"100vh",background:C.white,fontFamily:"Poppins,sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&family=Raleway:wght@200;300;400;500;600;700;800&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
        ::selection{background:${C.gold};color:${C.white};}
        ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:${C.cream};}::-webkit-scrollbar-thumb{background:${C.brown};border-radius:3px;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(35px);}to{opacity:1;transform:translateY(0);}}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
        @keyframes marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        img{display:block;max-width:100%;}
      `}</style>
      <Nav/>
      {pages[page]||<Home/>}
      <Foot/>
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}
    </div>
  );
}
