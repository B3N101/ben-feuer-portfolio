// Runs in <head> before first paint. Shows the intro only on a fresh arrival:
// not on reload, not on back/forward, and once per browser tab session.
// In-site navigation never re-runs it because the root layout stays mounted.
export const INTRO_SCRIPT = `(function(){try{
var n=performance.getEntriesByType('navigation')[0];
if(n&&(n.type==='reload'||n.type==='back_forward'))return;
if(sessionStorage.getItem('bf-intro'))return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
sessionStorage.setItem('bf-intro','1');
var d=document.documentElement;d.classList.add('intro');
setTimeout(function(){d.classList.remove('intro')},1900);
}catch(e){}})();`;

export function IntroLoader() {
  return (
    <div className="intro-loader" aria-hidden="true">
      <div className="intro-inner">
        <div className="intro-name">Ben Feuer</div>
        <div className="intro-bar" />
        <div className="intro-sub">Mechanical Engineering</div>
      </div>
    </div>
  );
}
