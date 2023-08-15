import { Test1 } from "./components/Test1";
import { Test2 } from "./components/Test2";
import { Home } from "./components/Home";
import RankItemsContainer from "./components/RankItemsContainer"
import MovieImageArr from "./components/MovieImages.js";
import AlbumImageArr from "./components/AlbumImages.js";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/Test1',
    element: <Test1 />
  },
  {
    path: '/Test2',
    element: <Test2 />
    },
    {
        path: '/rank-movies',
        element: <RankItemsContainer dataType={1} imgArr={MovieImageArr}  />
    },
    {
        path: '/rank-albums',
        element: <RankItemsContainer dataType={2} imgArr={AlbumImageArr} />
    }
];

export default AppRoutes;