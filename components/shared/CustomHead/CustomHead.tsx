// CustomHead.js
import Head from 'next/head';

const CustomHead = ({ title, description, image }:any) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
  </Head>
);

export default CustomHead;
