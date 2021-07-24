import Head from "next/head";

interface IHeadProps {
  title: string;
}

const Header = (props: IHeadProps) => {
  return (
    <Head>
      <title>{props.title}</title>
      {/* <link rel="icon" href="/RKD_logo.svg" /> */}
      <meta name="description" content="KShots - Save screenshots on the Go!" />
      <link href="https://fonts.googleapis.com/css?family=Fjalla+One&display=swap" rel="stylesheet" />
    </Head>
  );
};

export default Header;
