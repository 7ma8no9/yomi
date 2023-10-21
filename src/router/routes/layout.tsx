import {RouteObject} from "react-router-dom";

import * as EPaths from '@shared/enums/paths.ts'
import Layout from "@pages/Layout";
import Library from "@pages/Library";

const layoutRoute: RouteObject = {
  path: EPaths.Primary.Layout,
  element: (
    <Layout />
  ),
  children: [
    {
      index: true,
      element: (
        <Library />
      ),
    },
    {
      path: EPaths.Library.Manga,
      lazy: async () => {
        const {default: Component } = await import('@pages/Manga')
        return { Component }
      },
    }
  ]
}

export default layoutRoute
