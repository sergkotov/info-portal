import React, { FC } from "react";
import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';

const ComicsPage: FC = () => {
    return (
        <>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage