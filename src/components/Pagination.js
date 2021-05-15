import { useState } from "react";
import chevronLeft from "../assets/img/chevron-left.svg";
import chevronRight from "../assets/img/chevron-right.svg";

const Pagination = ({ offset, pagination }) => {
  const [page, setPage] = useState(1);
  return (
    <div id="pagination">
      <img
        src={chevronLeft}
        alt="left"
        onClick={(e) => {
          if (offset > 1) {
            pagination((offset -= 1));
            setPage(page - 1);
          }
        }}
      />
      <p>page {page}</p> {/*Affichage numéro de la page*/}
      <img
        src={chevronRight}
        alt="right"
        onClick={(e) => {
          if (offset > 0) {
            pagination((offset += 1));
            setPage(page + 1);
          }
        }}
      />
    </div>
  );
};

export default Pagination;
