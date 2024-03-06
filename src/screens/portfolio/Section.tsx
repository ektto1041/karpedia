import { Fragment, useMemo } from 'react';
import styles from './Section.module.css';

type Tag = 'h2' | 'p';

interface H2Content {
  tag: 'h2';
  content: string;
}

interface ParagraphContent {
  tag: 'p' | 'li';
  content: string;
}

interface H3Content {
  tag: 'h3';
  content: string;
  children: ParagraphContent[];
}

interface SectionProps {
  sectionKey: string;
  content: (H2Content | ParagraphContent | H3Content)[];
}

export default function Section({
  sectionKey,
  content,
}: SectionProps) {

  return (
    <div className={styles.container} >
      {content.map((c, i) => (
        <Fragment key={`${sectionKey}-${i}`}>
          <div className={styles.line}>
            <div className={styles['bg-code']}>{`<${c.tag}>`}</div>
            {c.tag === 'h2' ? (<h2>{c.content}</h2>) : (
              c.tag === 'p' ? (<p>{c.content}</p>) : (
                c.tag === 'h3' ? (<h3>{c.content}</h3>) : (
                  c.tag === 'li' ? (<p style={{ marginLeft: '0' }}>- {c.content}</p>) : (<></>)
                )
              )
            )}
            <div className={styles['bg-code']}>{`</${c.tag}>`}</div>
          </div>
          {c.tag === 'h3' && c.children.map((child, j) => (
            <div key={`${sectionKey}-${i}-${j}`} className={styles.line} style={{ marginLeft: '2rem' }}>
              <div className={styles['bg-code']}>{`<p>`}</div>
              <p>{child.content}</p>
              <div className={styles['bg-code']}>{`</p>`}</div>
            </div>
          ))}
        </Fragment>
      ))}
      <div className={styles.line} />
    </div>
  )
}