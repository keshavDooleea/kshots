import CommonStyles from "../styles/CommonLayout.module.scss";
import { signOut, useSession } from "next-auth/client";
import Head from "../Components/Head";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ICommonProps {
  children: React.ReactNode;
  title: string;
}

const CommonLayout = ({ children, title }: ICommonProps) => {
  const [session, setSession] = useSession();

  return (
    <div className={CommonStyles.body}>
      <Head title={title}></Head>

      <nav className={CommonStyles.nav}>
        <span className={CommonStyles.navLeft}>
          <h4 className="single-line-title">
            {session?.user?.name ? session?.user?.name : session?.user?.email}
            <span></span>
          </h4>
          {session?.user?.image && (
            <div className={CommonStyles.img}>
              <img src={session?.user?.image as string} alt="Picture of the author" loading="lazy" />
            </div>
          )}
        </span>
        <button className={CommonStyles.signOutBtn} onClick={() => signOut({ callbackUrl: "/" })}>
          Sign Out
          <FontAwesomeIcon icon={faSignOutAlt} className={CommonStyles.icon} />
        </button>
      </nav>

      <div className={CommonStyles.main}>{children}</div>
    </div>
  );
};

export default CommonLayout;
