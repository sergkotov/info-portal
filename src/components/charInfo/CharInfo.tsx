import React, { FC, useEffect, useState } from "react";
import "./CharInfo.scss";
import { CharacterInfo } from "../../types/types";
import Skeleton from "../skeleton/Skeleton";
import CharInfoView from "./CharInfoView/CharInfoView";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../app/errorMessage/ErrorMessage";
import { getCharacterInfo } from "../../services/MarvelService";

const CharInfo: FC<{charId: number | null}> = ({charId}) => {
    const [character, setCharacter] = useState<CharacterInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onCharLoaded = (char: CharacterInfo) => {
        setCharacter(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    function updateInfoChar(id: number) {
        getCharacterInfo(id).then(res => {
            if(res) {
                onCharLoaded(res);
            }
        }).catch(onError);
    }

    const onUpdateInfoChar = (id: number | null) => {
        if(id) {
            setLoading(true);
            updateInfoChar(id);
        }
    }

    useEffect(() => {
        onUpdateInfoChar(charId);
    }, [charId]);

    return (
        <div className="char__info">
            {!character && <Skeleton />}
            {error && <ErrorMessage/>}
            {loading && <Spinner/>}
            {!(error || loading || !character) && <CharInfoView char={character}/>}
        </div>
    )
}

export default CharInfo;