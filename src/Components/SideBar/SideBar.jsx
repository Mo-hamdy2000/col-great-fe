import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Units } from "./SideBarData";
import "./Sidebar.css";

export default function Sidebar() {
  const { id } = useParams()
  const { pathname: path } = useLocation()
  
  const isActiveItem = (unitId) => id === unitId
  const isActiveSubItem = (subitem) => path.includes(subitem.path)

  return (
    <div className="sidebar">
      {Object.keys(Units).map((unitId) => {
        const unit = Units[unitId]
        return (
          <div key={unitId} className="sidebar-item">
            <div className={`sidbar-item-title ${isActiveItem(unitId) ? 'active' : ''}`}>{unit.title}</div>
            <div className="sidebar-sub-items">
              {unit.items.map((item) => {
                return (
                  <div key={unit.title + item.title} className={`sidebar-sub-item ${isActiveItem(unitId) && isActiveSubItem(item) ? 'active' : ''}`}>
                    <Link to={`/modules/${unitId}${item.path}`}>
                      <div>{item.title}</div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
