import React, { FC, useState } from 'react';
import { CharacterShort } from '../../../types/types';

const CharListItem: FC<{chars: CharacterShort[] | null}> = ({chars}) => {
    const [selected, setSelected] = useState("");

    const onSelectItem = (newActive: string) => {
        setSelected(newActive);
    }

    if(!chars) {
        return null;
    } else {
        return(
            <ul className="char__grid">
                {chars.map(item => (
                    <li key={item.name} className={(item.name === selected) ? "char__item char__item_selected" : "char__item"} 
                        onClick={() => onSelectItem(item.name)}>
                        <img src={item.thumbnail} alt={item.name}
                            className={(item.thumbnail.indexOf('image_not_available') === -1) ? "" : "char__item_nf"}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                ))}
            </ul>
        )
    }
}

export default CharListItem;