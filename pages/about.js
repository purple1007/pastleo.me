import { useState, useEffect, useCallback } from 'react';

import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

import withLayout from '../layouts/index.js';
import EmptyLayout from '../layouts/EmptyLayout.js';

import BackToIndexLink from '../components/BackToIndex.js';
import Logo from '../components/Logo.js';
import LocaleSwitch from '../components/about/LocaleSwitch.js';
import CodeTyper from '../components/about/CodeTyper.js';
import Contacts from '../components/about/Contacts.js';
import ResumeContent from '../components/about/ResumeContent.js';

import styles from '../styles/pages/about.scss';

import taiwanSvgSrc from '../assets/taiwan.svg';

const i18n = {
  taiwanese: {
    zh: '台灣人',
    en: 'Taiwanese',
  },
  softwareEngineer: {
    zh: '軟體工程師',
    en: 'Software Engineer',
  },
  quotes: {
    zh: [
      '興趣使然的軟體工程師，對電腦的一切事物有興趣，從電腦硬體、作業系統以及網路到程式、網站前後端',
      '有朝一日會弄個遊戲平台讓大家一起遊玩創造力',
    ],
    en: [
      'Loving exploring things about computer, from hardware, operating system, the web, to programming',
      'Will create game where people explore creativities',
    ],
  },
  back: {
    zh: '回首頁',
    en: 'Back to index',
  },
};
const locales = [
  { localeName: 'zh', displayName: '中' },
  { localeName: 'en', displayName: 'EN' },
];

const About = () => {
  const [locale, setLocale] = useState('zh');
  const [resumeMode, setResumeMode] = useState(false);

  const toggleResumeMode = useCallback(() => setResumeMode(r => !r), []);
  useEffect(() => {
    document.addEventListener('keypress', toggleResumeMode);
    return () => document.removeEventListener('keypress', toggleResumeMode);
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      <section id={styles.intro} className='p-6'>
        <div id={styles.controls} className='print:hidden flex justify-between p-2'>
          <BackToIndexLink className='p-3' />
          <div className='p-3 text-right'>
            <LocaleSwitch locales={locales} locale={locale} setLocale={setLocale} />
          </div>
        </div>
        { resumeMode || <h1 className='text-center font-bold text-2xl pt-4'>PastLeo | 西瓜</h1> }
        <div className='max-w-2xl mx-auto py-5 flex justify-center items-center'>
          <Logo className={styles.logo} forcerRvealed={resumeMode} />
          { resumeMode && (
            <div className='flex-1 flex flex-col content-center justify-center p-4 hidden md:block print:block'>
              <h1 className='font-bold text-2xl pb-4'>PastLeo | 西瓜</h1>
              <Contacts block />
            </div>
          ) }
        </div>
        <div className='max-w-lg mx-auto flex text-center print:hidden'>
          <div className='flex-1'>
            <a target='_blank' href='https://en.wikipedia.org/wiki/Taiwan' rel='noopener noreferrer'>
              <img alt='taiwan' className={classnames(styles.taiwan, 'mx-auto')} src={taiwanSvgSrc} />
              <h3>{ i18n.taiwanese[locale] }</h3>
            </a>
          </div>
          <div className='flex-1'>
            <div className='py-2'>
              <FontAwesomeIcon icon={faLaptopCode} size='2x' />
            </div>
            <h3>{ i18n.softwareEngineer[locale] }</h3>
          </div>
        </div>
      </section>
      <section className='p-6 flex-1'>
        <div className='max-w-lg mx-auto'>
          <CodeTyper lines={i18n.quotes[locale]} />
        </div>
      </section>
      { resumeMode && <ResumeContent locale={locale} /> }
      <section className='p-4'>
        { resumeMode || <Contacts className='max-w-md mx-auto p-4' /> }
        <div className='print:hidden text-center'>
          <BackToIndexLink className='p-2'>
            { i18n.back[locale] }
          </BackToIndexLink>
        </div>
      </section>
    </div>
  );
};

export default withLayout({
  Layout: EmptyLayout,
})(About);
