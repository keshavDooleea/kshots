import CommonStyles from "../styles/CommonLayout.module.scss";
import { signOut, useSession } from "next-auth/client";
import Head from "../Components/Head";
import { faSignOutAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ICommonProps {
  children: React.ReactNode;
  title: string;
}

interface INavItem {
  name: string;
  icon: any;
  onClick?: () => void;
}

const CommonLayout = ({ children, title }: ICommonProps) => {
  const [session, setSession] = useSession();

  const NavItem = ({ name, icon, onClick }: INavItem) => {
    return (
      <button className={CommonStyles.signOutBtn} onClick={onClick}>
        {name}
        <FontAwesomeIcon icon={icon} className={CommonStyles.icon} />
      </button>
    );
  };

  const createFolder = async () => {};

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
              <img src={session?.user?.image as string} alt="User's profile picture" loading="lazy" />
            </div>
          )}
        </span>
        <span className={CommonStyles.navRight}>
          <NavItem name="Create Folder" icon={faPlus} onClick={createFolder} />
          <NavItem name="Sign Out" icon={faSignOutAlt} onClick={() => signOut({ callbackUrl: "/" })} />
        </span>
      </nav>

      <div className={CommonStyles.main}>{children}</div>
    </div>
  );
};

export default CommonLayout;
