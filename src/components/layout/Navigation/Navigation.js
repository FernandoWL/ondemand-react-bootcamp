import React from "react";
import "./navigation.css";
import { useProductCategories } from "../../../utils/hooks/useProductCategories";
import Button from "../../Button";
import ToggleSwitch from "../../ToggleSwitch";
import PropTypes from "prop-types";

const Navigation = ({ handlerEvent, checkedItems }) => {
  const { data, isLoading } = useProductCategories();
  const handlerToggleSwitch = (e) => {
    return handlerEvent(e);
  };
  const handlerOnclickButton = (e) => {
    return handlerEvent(e);
  };
  return (
    <>
      <div className="navigation">
        {isLoading && <div>Loading...</div>}
        {data.results && (
          <div data-testid="navigation-items" className="navigation-items">
            <div>
              <h2>Categories</h2>
            </div>
            <div className="navigation-content">
              {data.results.map((row) => {
                let checked = checkedItems.includes(row.id);
                return (
                  <ToggleSwitch
                    key={row.id}
                    value={row.id}
                    label={row.data.name}
                    handlerEvent={handlerToggleSwitch}
                    checked={checked}
                  />
                );
              })}
            </div>
            <div className="navigation-button-container">
              {checkedItems.length > 0 && (
                <Button
                  classname="navigation-button"
                  onclick={handlerOnclickButton}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="navigation-sep"></div>
    </>
  );
};

Navigation.propTypes = {
  handlerEvent: PropTypes.func.isRequired,
  checkedItems: PropTypes.array.isRequired,
};
export default Navigation;
