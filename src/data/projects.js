// Project data. Media fields are empty on purpose: the reference demo photos/videos are not
// bundled. Drop your own files into /public/media and set `poster` / `video` / `gallery` / `film`.
// `color` = per-project hover background (home cards) and title color (project page).

const credits = (client, year) => [
  ['Director', 'Name Surname'],
  ['Cinematographer', 'Name Surname'],
  ['Sound', 'Name Surname'],
  ['Client', client],
  ['Year', year],
];

const LOREM_A =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur sint occaecat, cupidatat non proident sunt in culpa qui officia.';
const LOREM_B =
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim, ipsam voluptatem quia voluptas sit aspernatur aut odit.';
const LOREM_C =
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.';

const make = (slug, title, category, color, year) => ({
  slug,
  title,
  category,
  color,
  poster: null,
  video: null,
  film: null,
  gallery: [null, null, null, null, null, null],
  credits: credits(title, year),
  description: [
    ['Overview', LOREM_A],
    ['Challenges & Approach', LOREM_B],
    ['The result', LOREM_C],
  ],
});

export const projects = [
  make('haylou', 'Haylou', 'Advertisement', 'rgb(160, 186, 199)', '2019'),
  make('spyder-ss23', 'Spyder 23', 'Advertisement', 'rgb(219, 220, 171)', '2023'),
  make('georgia', 'Georgia', 'Music', 'rgb(219, 160, 160)', '2022'),
  make('crisp', 'Crisp', 'Music', 'rgb(211, 143, 105)', '2022'),
  make('rakhi-peppe', 'Rakhi & Peppe', 'Music', 'rgb(214, 167, 188)', '2021'),
  make('office', 'Office', 'Short Film', 'rgb(182, 221, 157)', '2021'),
  make('chaance', 'Chaance', 'Advertisement', 'rgb(184, 175, 212)', '2020'),
  make('33-percent', '33 Percent', 'Short Film', 'rgb(178, 206, 199)', '2020'),
  make('sounder', 'sounder', 'Short Film', 'rgb(209, 177, 121)', '2019'),
];

export const categories = [
  { label: 'All Works', path: '/all-works' },
  { label: 'advertisement', path: '/all-works/advertisement', match: 'Advertisement' },
  { label: 'Music', path: '/all-works/music', match: 'Music' },
  { label: 'Short Film', path: '/all-works/short-film', match: 'Short Film' },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
