import React from "react";
import { selectCollections } from "../../redux/shop/shop.selector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

const ShopPage = () =>  (
    <div className="shop-page">
      <CollectionsOverview />
    </div>
);
    

const mapStateToProps = createStructuredSelector({
    collections: selectCollections,
});

export default connect(mapStateToProps)(ShopPage);