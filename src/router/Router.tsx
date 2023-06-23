import React from "react";
import {Box, CircularProgress} from "@mui/material";
import {createBrowserRouter, RouterProvider, useRouteError} from "react-router-dom";
import {Paths} from "../shared/enums/paths";

const lazy = (name: string) => async () => {
  // globalStore.set(loadingAtom, true);
  const { default: Component } = await import(`../pages/${name}/index.ts`);
  // globalStore.set(loadingAtom, false);
  return { Component };
}

const Fallback: React.FC = () => {
  return (
    <Box mt={8} display={'flex'} justifyContent={'center'}>
      <CircularProgress />
    </Box>
  )
}

const RouterErrorBoundary: React.FC = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <>Error...</>
  )
}


const router = createBrowserRouter([
  {
    path: Paths.Layout.LIBRARY,
    lazy: lazy('Library'),
    errorElement: <RouterErrorBoundary />
  }
])

const Router: React.FC = () => {
  return (
    <React.Suspense fallback={<Fallback />}>
      <RouterProvider
        router={router}
      />
    </React.Suspense>
  )
}

export default Router
