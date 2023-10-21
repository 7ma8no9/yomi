import {RouteObject} from "react-router-dom";

import * as EPaths from '@shared/enums/paths.ts'
import Notfound from "@pages/Notfound";

const notfoundRoute: RouteObject = {
  path: EPaths.Primary.Notfound,
  element: (
    <Notfound />
  ),
}

export default notfoundRoute
