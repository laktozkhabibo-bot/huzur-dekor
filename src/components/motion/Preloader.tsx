/**
 * Intro screen: the house emblem rises in above a drawn gold line, then the dark curtain
 * lifts away — pure CSS, ~1.1s in total, shown only on the first page view of a browser session.
 * It never blocks the page: the site renders underneath and the overlay ignores clicks.
 */

// Runs before paint: hides the intro if it was already shown in this session
const script = `try{if(sessionStorage.getItem("hd-intro")){document.documentElement.classList.add("hd-intro-seen")}else{sessionStorage.setItem("hd-intro","1")}}catch(e){}`;

export function Preloader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div aria-hidden className="hd-preloader fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/emblem-light.webp" alt="" width={333} height={320} className="hd-preloader-mark h-24 w-auto" />
        <span className="hd-preloader-line block h-px w-40 bg-gold-400" />
        <span className="hd-preloader-mark font-serif text-lg tracking-[0.5em] text-cream/90" style={{ animationDelay: "0.1s" }}>
          HUZUR <span className="text-gold-400">DEKOR</span>
        </span>
      </div>
    </>
  );
}
