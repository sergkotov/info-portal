import React, { FC } from "react";
import { CharacterInfo } from "../../../types/types";

const CharInfoView: FC<{char: CharacterInfo}> = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const imgClasses = (thumbnail.indexOf('image_not_available') === -1) ? "" : "char__img_nf";
    return (
    <>
        <div className="char__basics">
            <img className={imgClasses} src={thumbnail} alt={name}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">{description}</div>
        <div className="char__comics">Comics:</div>
        {comics && comics.length > 0 ? 
        <ul className="char__comics-list">
            {
                comics.slice(0, 10).map((item, index) => (
                    <li key={index} className="char__comics-item">
                        {item.name}
                    </li>
                ))
            }
        </ul> :
        <div>There are no comics with this character</div>
        }
    </>
    )
}

export default CharInfoView;