import SiteScroller from './SiteScroller';

const LINK_PROPS = { target: '_blank', rel: 'noopener noreferrer' };

// Home "Featured Video Card" variant for real client sites: a minimal frame —
// just the live scrolling capture of the site and a border (black at rest,
// brand orange on hover/touch). No label, no caption, no reserved space below
// the media. The scroll-on-hover behavior lives entirely in SiteScroller and
// is untouched by this component.
export default function PortfolioCard({ project, className = '' }) {
  const { title, url, image, w, h } = project;

  return (
    <a href={url} className={`card card--portfolio ${className}`} {...LINK_PROPS}>
      <div className="card-bg">
        <SiteScroller src={image} w={w} h={h} alt={title} />
      </div>
    </a>
  );
}
