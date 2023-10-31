import React from "react";
import NotAuthorised from "../../components/NotAuthorised";

const ReviewsPage = ({error}) => {
  if(error){
    return <div>
        <NotAuthorised message={error}/>
    </div>
}
  return <div>ReviewsPage</div>;
};

export default ReviewsPage;
