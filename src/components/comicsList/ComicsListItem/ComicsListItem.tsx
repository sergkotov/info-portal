import React, { FC } from "react";
import { Comic } from "../../../types/types";
import { Link } from "react-router-dom";

const ComicsListItem: FC<{comics: Comic[] | null}> = ({comics}) => {
    if(comics) {
        return (
            <ul className="comics__grid">
                {comics.map((item) => (
                    <li key={item.id} 
                        tabIndex={0}
                        className="comics__item">
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    } else {
        return null;
    }
}

export default ComicsListItem;