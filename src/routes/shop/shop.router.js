import { Route, Routes, useParams } from "react-router-dom";
import ShopPage from "../../pages/shop/shop.component";
import CollectionPage from "../../pages/collection/collection.component";

const ShopRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ShopPage />} />
      <Route path="/:collectionName" element={<CollectionPageHOC />} />
    </Routes>
  );
};

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  return <WrappedComponent {...props} params={params} />;
};

const CollectionPageHOC = withRouter(CollectionPage);

export default ShopRouter;
