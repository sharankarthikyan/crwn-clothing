import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectDirectorySelections } from "../../redux/directory/directory.selectors";

import MenuItem from "../menu-item/menu-item.component";
// import  from '../../redux/directory/directory.reducer';

import "./directory.styles.scss";
const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => {
        return <MenuItem key={id} {...otherSectionProps} />;
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySelections,
});

// const mapStateToProps = (state) => ({
//   sections: state.directory.sections,
// });

export default connect(mapStateToProps)(Directory);
