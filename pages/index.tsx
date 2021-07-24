import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.scss";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const [session, setSession] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/dashboard");
  }, [session]);

  return (
    <div className={styles.body}>
      <Head>
        <title>Login KShots</title>
        <meta name="description" content="Kshots" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Fjalla+One&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.main}>
        <h1 className={styles.title}>
          KSHOTS
          <span></span>
        </h1>
        <button className={styles.signInBtn} onClick={() => signIn()}>
          <p>Sign In via Github</p>
        </button>
      </div>
    </div>
  );
}
