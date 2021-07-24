import Head from "../Components/Head";
import styles from "../styles/Login.module.scss";
import CommonStyles from "../styles/CommonLayout.module.scss";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { joinClasses } from "../utils/lib/joinClasses";

export default function Home() {
  const [session, setSession] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/dashboard");
  }, [session]);

  return (
    <div className={CommonStyles.body}>
      <Head title="Login KShots"></Head>

      <div className={joinClasses(CommonStyles.main, styles.loginMain)}>
        <span>
          <h1 className="title">
            KSHOTS
            <span></span>
          </h1>

          <small>Save screenshots on the Go!</small>
        </span>

        <button className={styles.signInBtn} onClick={() => signIn()}>
          <FontAwesomeIcon icon={faGithub} className={styles.icon} />
          <p>Sign In via Github</p>
        </button>
      </div>
    </div>
  );
}
