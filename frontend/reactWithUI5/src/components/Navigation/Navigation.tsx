import "./Navigation.css";

import { SideNavigation, SideNavigationItem } from "@ui5/webcomponents-react";

import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { login } from "../../api/authService";
import { useAppContext } from "../../contexts/AppContexts";

export const Navigation = () => {
  const {
    value: { user },
    setValue,
  } = useAppContext();

  const loginUser = async () => {
    try {
      const user = await login();
      setValue((curr) => ({ ...curr, user, token: "YWxpY2U6" }));
      sessionStorage.setItem("tokenSAP", "YWxpY2U6");
    } catch (error) {}
  };

  const handleLogOut = async () => {
    try {
      setValue((curr) => ({
        ...curr,
        user: { locale: "", id: "", tenant: "" },
        token: "",
      }));
    } catch (error) {}
  };

  return (
    <>
      <SideNavigation className="side-navigation">
        {user.id === "anonymous" || !user.id ? (
          <SideNavigationItem
            text="Login"
            itemType="button"
            onClick={loginUser}
          />
        ) : (
          <>
            <SideNavigationItem
              text={`Name: ${user.id}`}
              itemType="text"
              disabled
            />
            <SideNavigationItem
              text={`Tenant: ${user.tenant}`}
              itemType="text"
              disabled
            />
            <SideNavigationItem
              text={`Locale: ${user.locale}`}
              itemType="text"
              disabled
            />
            <SideNavigationItem
              text="Log out"
              itemType="text"
              onClick={handleLogOut}
            />
          </>
        )}

        <SideNavigationItem icon="add-coursebook" text="Books">
          <Link to="/" className="navigation-link-item">
            Book List
          </Link>
        </SideNavigationItem>
        <SideNavigationItem icon="activity-2" text="Authors">
          <Link to="/authors" className="navigation-link-item">
            Authors List
          </Link>
        </SideNavigationItem>
        <SideNavigationItem icon="account" text="Admin" href="/admin" />
      </SideNavigation>
      <Outlet />
    </>
  );
};
