import styles from './Portfolio.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import css from '@/utils/css';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiChevronRight, mdiUnfoldMoreVertical } from '@mdi/js';
import LineNumList from './LineNumList';
import AboutMeContent from './AboutMeContent';
import WPlannerContent from './WPlannerContent';
import NotReady from './NotReady';
import KarpediaContent from './KarpediaContent';
import GigsContent from './GigsContent';
import ChimtooviewContent from './ChimtooviewContent';

export type FileName = 'about_me.html' | 'w_planner.html' | 'karpedia.html' | 'gigs.html' | 'chimtooview.html'

const lineNums: Record<FileName, number> = {
  'about_me.html': 30,
  'w_planner.html': 80,
  'karpedia.html': 85,
  'gigs.html': 60,
  'chimtooview.html': 50,
};

function PortfolioScreen() {
  const [currentFile, setCurrentFile] = useState<FileName>('about_me.html');
  const [isSrcOpen, setSrcOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSrcClick = useCallback(() => {
    setSrcOpen(!isSrcOpen);
  }, [isSrcOpen]);

  const handleFileClick = useCallback((file: FileName) => {
    setCurrentFile(file);
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.explorer}>
        <div className={styles.title}>EXPLORER</div>
        <div className={css(styles['file-line'], styles['list-title']) }>KARPEDIA</div>
        <div className={css(styles['file-line'], styles.ignored)} style={{ paddingLeft: '19px'}}>
          <div className={styles.icon}>
            <Icon path={mdiChevronRight} />
          </div>
          .next
        </div>
        <div className={css(styles['file-line'], styles.ignored)} style={{ paddingLeft: '19px'}}>
          <div className={styles.icon}>
            <Icon path={mdiChevronRight} />
          </div>
          node_modules
        </div>
        <div className={styles['file-line']} style={{ paddingLeft: '19px'}} onClick={handleSrcClick}>
          <div className={styles.icon}>
            <Icon path={isSrcOpen ? mdiChevronDown : mdiChevronRight} />
          </div>
          src
        </div>
        {isSrcOpen && (
          <>
            <div className={styles['file-line']} style={{ paddingLeft: '28.5px'}}>
              <div className={styles.icon}>
                <Icon path={mdiChevronDown} />
              </div>
              portfolio
            </div>
            <div
              className={css(styles['file-line'], currentFile === 'about_me.html' ? styles.opened : '')}
              style={{ paddingLeft: '38px'}}
              onClick={() => handleFileClick('about_me.html')}
            >
              <div className={styles.icon}>
                <Icon path={mdiUnfoldMoreVertical} />
              </div>
              about_me.html
            </div>
            <div
              className={css(styles['file-line'], currentFile === 'w_planner.html' ? styles.opened : '')}
              style={{ paddingLeft: '38px'}}
              onClick={() => handleFileClick('w_planner.html')}
            >
              <div className={styles.icon}>
                <Icon path={mdiUnfoldMoreVertical} />
              </div>
              w_planner.html
            </div>
            <div
              className={css(styles['file-line'], currentFile === 'karpedia.html' ? styles.opened : '')}
              style={{ paddingLeft: '38px'}}
              onClick={() => handleFileClick('karpedia.html')}
            >
              <div className={styles.icon}>
                <Icon path={mdiUnfoldMoreVertical} />
              </div>
              karpedia.html
            </div>
            <div
              className={css(styles['file-line'], currentFile === 'gigs.html' ? styles.opened : '')}
              style={{ paddingLeft: '38px'}}
              onClick={() => handleFileClick('gigs.html')}
            >
              <div className={styles.icon}>
                <Icon path={mdiUnfoldMoreVertical} />
              </div>
              gigs.html
            </div>
            <div
              className={css(styles['file-line'], currentFile === 'chimtooview.html' ? styles.opened : '')}
              style={{ paddingLeft: '38px'}}
              onClick={() => handleFileClick('chimtooview.html')}
            >
              <div className={styles.icon}>
                <Icon path={mdiUnfoldMoreVertical} />
              </div>
              chimtooview.html
            </div>
          </>  
        )}
      </div>
      <div className={styles['content']}>
        <div className={styles['file-tab-list']}>
          <div className={css(styles['file-tab'], currentFile === 'about_me.html' ? styles.selected : '')} onClick={() => handleFileClick('about_me.html')}>
            <div className={styles.icon}>
              <Icon path={mdiUnfoldMoreVertical} />
            </div>
            about_me.html
          </div>
          <div className={css(styles['file-tab'], currentFile === 'w_planner.html' ? styles.selected : '')} onClick={() => handleFileClick('w_planner.html')}>
            <div className={styles.icon}>
              <Icon path={mdiUnfoldMoreVertical} />
            </div>
            w_planner.html
          </div>
          <div className={css(styles['file-tab'], currentFile === 'karpedia.html' ? styles.selected : '')} onClick={() => handleFileClick('karpedia.html')}>
            <div className={styles.icon}>
              <Icon path={mdiUnfoldMoreVertical} />
            </div>
            karpedia.html
          </div>
          <div className={css(styles['file-tab'], currentFile === 'gigs.html' ? styles.selected : '')} onClick={() => handleFileClick('gigs.html')}>
            <div className={styles.icon}>
              <Icon path={mdiUnfoldMoreVertical} />
            </div>
            gigs.html
          </div>
          <div className={css(styles['file-tab'], currentFile === 'chimtooview.html' ? styles.selected : '')} onClick={() => handleFileClick('chimtooview.html')}>
            <div className={styles.icon}>
              <Icon path={mdiUnfoldMoreVertical} />
            </div>
            chimtooview.html
          </div>
        </div>
        <div className={styles.path}>
          {`src > portfolio >`}
          &nbsp;
          <div className={styles.icon}>
            <Icon path={mdiUnfoldMoreVertical} />
          </div>
          {currentFile}
        </div>
        <div className={styles['editor-wrapper']}>
          <div key={`pf-${currentFile}`} className={styles.editor}>
            <LineNumList maxNum={lineNums[currentFile]} />
            <div className={styles.code}>
              <div className={styles.line}>
                {'<!DOCTYPE html>'}
              </div>
              <div className={styles.line}>
                {'<html lang="ko">'}
              </div>
              <div className={styles.line}>
                {'<head>'}
              </div>
              <div className={styles.line}>
                &nbsp;&nbsp;{'<title>About Me</title>'}
              </div>
              <div className={styles.line}>
                {'</head>'}
              </div>
              <div className={styles.line}>
                {'<body>'}
              </div>
              {currentFile === 'about_me.html' && <AboutMeContent onFileClick={handleFileClick} />}
              {currentFile === 'w_planner.html' && <WPlannerContent />}
              {currentFile === 'karpedia.html' && <KarpediaContent />}
              {currentFile === 'gigs.html' && <GigsContent />}
              {currentFile === 'chimtooview.html' && <ChimtooviewContent />}
              <div className={styles.line}>
                {'</body>'}
              </div>
              <div className={styles.line}>
                {'</html>'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotReady />
    </main>
  )
};

export default React.memo(PortfolioScreen);