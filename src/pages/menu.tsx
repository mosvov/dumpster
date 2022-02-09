import * as React from "react";
import { createElement } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import { MenuItemLink, getResources, RouteWithoutLayout } from "react-admin";
import { withRouter, Route } from "react-router-dom";
import TodayIcon from "@material-ui/icons/Today";
import MapIcon from "@material-ui/icons/Map";
import { Calendar } from "./calendar";
import Drop from "../Drop";
import { Map } from "./map";

export const Menu = withRouter(({ onMenuClick, logout }: any) => {
  // @ts-ignore
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  // @ts-ignore
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources);
  return (
    <div>
      {resources.map((resource) => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={
            (resource.options && resource.options.label) || resource.name
          }
          leftIcon={createElement(resource.icon)}
          onClick={onMenuClick}
          sidebarIsOpen={open}
        />
      ))}
      <MenuItemLink
        to="/calendar"
        primaryText="Calendar"
        leftIcon={<TodayIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        to="/map"
        primaryText="Map"
        leftIcon={<MapIcon />}
        onClick={onMenuClick}
        sidebarIsOpen={open}
      />
      {isXSmall && logout}
    </div>
  );
});

export const customRoutes = [
  <Route exact path="/calendar" component={Calendar} />,
  <Route exact path="/map" component={Map} />,
  <RouteWithoutLayout exact path="/drop/:id" noLayout component={Drop} />,
];
