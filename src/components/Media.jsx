// Image/video slot. Reference behaviour: poster <img> underneath, muted looping autoplay <video>
// on top, object-fit: cover. Without sources it renders a neutral placeholder of the same box.
export default function Media({ poster, video, tint, className = '', style }) {
  const bg = !poster && !video && tint ? { background: `linear-gradient(160deg, ${tint.replace('rgb', 'rgba').replace(')', ', 0.35)')} 0%, rgb(34, 34, 34) 70%)` } : null;
  return (
    <div className={`media ${className}`} style={{ ...bg, ...style }}>
      {poster && <img src={poster} alt="" decoding="async" />}
      {video && <video src={video} poster={poster || undefined} autoPlay muted loop playsInline preload="auto" />}
    </div>
  );
}
