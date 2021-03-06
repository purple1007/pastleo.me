import classnames from 'classnames';
import Link from 'next/link';

import withLayout from '../layouts/index.js';
import HomeLayout, { styles as layoutStyles } from '../layouts/HomeLayout.js';

import PostBanner from '../components/PostBanner.js';
import Pagination from '../components/Pagination.js';

const currentPage = 0;

const Index = ({ posts, totalPages }) => (
  <>
    { posts.map(post => (
      <Link key={post.slug} href={`/post/${post.slug}`}>
        <a className={classnames('block max-w-screen-lg mx-auto', layoutStyles.noHoverEffect)}>
          <PostBanner {...post.options} className='my-5' contentClassName='p-5' titleClassName='text-3xl' />
        </a>
      </Link>
    )) }
    <Pagination currentPage={currentPage} totalPages={totalPages} />
  </>
);

export default withLayout({
  Layout: HomeLayout,
})(Index);

export const getStaticProps = async() => {
  const posts = await import('../lib/node/posts.js');
  return {
    props: {
      posts: await posts.page(currentPage),
      totalPages: await posts.totalPages(),
    },
  };
};
