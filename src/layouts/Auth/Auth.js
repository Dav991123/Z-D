import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Footer from "components/Footer/Footer.js";

import routes from "routes.js";

class Pages extends React.Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  
  getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };

  getFullPageName = routes => {
    let pageName = this.getActiveRoute(routes);
    switch (pageName) {
      case "Pricing":
        return "pricing-page";
      case "Login":
        return "login-page";
      case "Register":
        return "register-page";
      case "Lock Screen":
        return "lock-page";
      default:
        return "";
    }
  };

  componentDidMount() {
    document.documentElement.classList.remove("nav-open");
  }
  
  render() {
    return (
      <>
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className={"full-page " + this.getFullPageName(routes)}>
            <Switch>
              {this.getRoutes(routes)}
            </Switch>
            <Footer fluid />
          </div>
        </div>
      </>
    );
  }
}

export default Pages;
