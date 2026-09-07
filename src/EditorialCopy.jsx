// Author-specified breaks only; never guess paragraph boundaries from spaces.
export function Paragraphs({ text, className }) {
  return text.split('\n\n').map((paragraph, index) => <p className={className} key={index}>{paragraph}</p>);
}

export function HeadingLines({ lines }) {
  return lines.map((line, index) => <span className="heading-line" key={index}>{line.split('\n').map((phrase, part) => <span className="title-phrase" key={part}>{phrase}</span>)}</span>);
}
