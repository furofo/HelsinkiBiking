import { JourneyList } from "./components/JourneyList";
import { StationList } from "./components/StationList";
import { Home } from "./components/Home";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/JourneyList',
    element: <JourneyList />
  },
  {
    path: '/StationList',
    element: <StationList />
    }
];

export default AppRoutes;
